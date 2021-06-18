<template>
  <div id="ViewPort">
    <NavPanel 
      :layertree="layertree"
      :layervisibles="layervisible" 
      :layerexpanded="layerexpanded" 
      @input="inputdone"
      @adjast="adjastdone"
      @fileinput="fileinputdone"
      id="sidebar"/>

    <div ref="stage" id="viewmain"></div>
  </div>
</template>

<script>
import NavPanel from './NavPanel';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
export default {
  components: {
    NavPanel,
  },
  name: 'ViewPort',
  data () {
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true})
    const camera = new THREE.PerspectiveCamera( 45, 1, 1, 200000 );
    camera.up.set(0, 0, 1);

    const light = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );

    const dirlight = new THREE.DirectionalLight(0xffffff, 3);
    dirlight.position.set(1, -2, 2);
    dirlight.castShadow = true;

    const loader = new Rhino3dmLoader();
    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      controls: null,
      light: light,
      dirlight: dirlight,
      loader: loader,
      loadObj: null,
      loadObjEdges: {},
      reader: new FileReader(),
      layertree: [],
      layervisible: [],
      layerexpanded: [],
    } 
  },
  created () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.dirlight)
    this.scene.background = new THREE.Color( 0xa0a0a0 );
  },
  mounted () {
    this.$refs.stage.appendChild(this.renderer.domElement)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener('resize', this.onWindowResize)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.position.set( 3, 3, 6.0 );
    this.camera.updateProjectionMatrix()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set( 0, 0, 0 );
    this.controls.update();

    this.reader.addEventListener('load', this.fileLoad, false);

    // Load 3dm
    // THREE.3DMLoader: ObjectType_Brep has no associated mesh geometry.
    // というエラーが頻発してBrepを読み込めない。
    // https://discourse.mcneel.com/t/3dmloader-for-three-js/107702/13
    // -> Rhinoのファイル内でBrepに対応するRenderMeshを生成しておく必要がある。
    // RenderMeshは明示的にコマンドで作れないが、Brepをシェーダーが必要な表示モードで一度でも表示すると、
    // 生成されるみたい。2021/3月くらいに議論に上がっているが、対応予定はよくわからない。
    this.loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/');
    this.load3dm('sample.3dm');
    this.animate()
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    load3dm(path) {
      this.loader.load(path, function (object) {

        // Remove preloaded 3dm objects from scene
        if (this.loadObj) {
          this.scene.remove(this.loadObj)
          while (this.loadObjEdges.length > 0){
            this.scene.remove(this.loadObjEdges.pop())
          }
        }

        // Set newloaded 3dm object to scene
        this.loadObj = object;
        this.scene.add(this.loadObj);

        // Construct Layer Tree
        this.layertree = []
        this.layervisible = []
        this.layerexpanded = []
        // Set Root
        let layerTable = {
          "00000000-0000-0000-0000-000000000000" : {
            id: -1, 
            parents: null, 
            child:[], 
            data: {}
          }
        }
        // Collect Node
        for (const key in object.userData.layers) {
          if (Object.hasOwnProperty.call(object.userData.layers, key)) {
            const layer = object.userData.layers[key];
            layerTable[layer.id] = {
              id: key, 
              parents: layer.parentLayerId, 
              child:[], 
              data: {
                name: layer.name, 
                color: layer.color, 
                expanded: layer.expanded,
                visible: layer.visible
              }
            }
            if (layer.visible) { this.layervisible.push(key) }
            if (layer.expanded) { this.layerexpanded.push(key) }
          }
        }
        // Collect Children
        for (const key in object.userData.layers) {
          if (Object.hasOwnProperty.call(object.userData.layers, key)) {
            const layer = object.userData.layers[key];
            layerTable[layer.parentLayerId].child.push(layer.id)
          }
        }
        // Create formatted tree for vuetify treeview
        this.layertree = this.bakeTree(layerTable, "00000000-0000-0000-0000-000000000000").children

        // Visual setting for all objects
        object.traverse( function(child) {
          if ( Object.prototype.hasOwnProperty.call(child.userData, 'attributes')){
            let id = child.userData.attributes.layerIndex;
            // Create Mesh Edge
            if (child.type == "Mesh") {
              const edges = new THREE.EdgesGeometry(child.geometry, 60);
              const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
              this.loadObjEdges[child.uuid] = line
              line.visible = object.userData.layers[id].visible;
              this.scene.add(line);
            }
            // apply object visible
            child.visible = object.userData.layers[id].visible;
          }
        }.bind(this))

        this.adjustCamera(object);

      }.bind(this));
    },
    bakeTree(table, key){
      const item = table[key]
      const childs = []
      for (const i in item.child) {
        const node = table[item.child[i]];
        if (node.child.length == 0) {
          childs.push({id:node.id, name:node.data.name})
        }
        else {
          childs.push(this.bakeTree(table, item.child[i]))
        }
      }
      return {
        id: item.id,
        name: item.data.name,
        children: childs
      }
    },
    adjustCamera (object) {

      // BoundingBox
      const bbox = new THREE.Box3();
      bbox.setFromObject(object);
      // BoundingSphere
      const bsphere = bbox.getBoundingSphere(new THREE.Sphere())

      let vFoV = this.camera.getEffectiveFOV();
      let hFoV = this.camera.fov * this.camera.aspect;
      let FoV = Math.min(vFoV, hFoV);

      let cameraDir = new THREE.Vector3();
      this.camera.getWorldDirection(cameraDir);

      let sina = Math.sin(FoV * Math.PI / 360.0);
      let cameraOffs = cameraDir.clone();
      let cameradistance = bsphere.radius / sina
      cameraOffs.multiplyScalar(-cameradistance);
      let newCameraPos = bsphere.center.clone().add(cameraOffs);

      this.camera.position.copy(newCameraPos);
      this.camera.far = cameradistance*5
      this.camera.lookAt(bsphere.center);
      this.camera.updateProjectionMatrix()
      this.controls.target.copy(bsphere.center);

      this.controls.update();
    },
    inputdone(arr) { // Event
      // Update Visivility
      this.scene.traverse( function ( child ) {
        if (Object.hasOwnProperty.call(child.userData, 'attributes')) {
          if ( 'layerIndex' in child.userData.attributes ) {
            child.visible = arr.includes(child.userData.attributes.layerIndex.toString())
            if (child.type == "Mesh") {
              this.loadObjEdges[child.uuid].visible = child.visible
            }
          }
        }
      }.bind(this) );
    },
    adjastdone() { // Event
      this.adjustCamera(this.loadObj)
    },
    fileinputdone(file) { // Event
      this.reader.readAsDataURL(file);
      this.load3dm(this.reader.result);
      console.log("file changed")
    },
    fileLoad() {
      this.load3dm(this.reader.result);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#sidebar {
    position: absolute;
    margin: 0;
    width: 50px;
    height: 100%;
    background-color: rgb(105, 105, 105);
    z-index: 2;
}

#viewmain {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  /* width: 50%; */
}
  
label {
  color: white;  
}

.sidebar-icon{
  display: inline-block;
  transition: 0.8s;
  border-radius: 3px;
	padding: 8px;
  color: white;
}

.sidebar-icon:hover{
	background-color: rgba(255, 255, 255, 0.5);
}
</style>
