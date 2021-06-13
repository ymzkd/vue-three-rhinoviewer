<template>
  <div id="ViewPort">
    <div id="sidebar">
      <label class="sidebar-icon" for="fileinput">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-folder2-open"
          viewBox="0 0 16 16">
          <path
            d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
        </svg>
        <input type="file" id="fileinput" name="fileinput" accept=".3dm" style="display: none;">
      </label>

      <div class="sidebar-icon" id="fitscale">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrows-angle-contract"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z" />
        </svg>
      </div>
    </div>

    <div ref="stage" id="main"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
export default {
  name: 'ViewPort',
  data () {
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true})
    const camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 200000 );
    camera.up.set(0, 0, 1);

    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshNormalMaterial()
    // const material = new THREE.MeshLambertMaterial({color: 0xb0bfdf});
    const cube = new THREE.Mesh(geometry, material)

    const light = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );

    const dirlight = new THREE.DirectionalLight(0xffffff, 3);
    dirlight.position.set(1, -2, 2);
    dirlight.castShadow = true;

    const loader = new Rhino3dmLoader();
    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      cube: cube,
      controls: null,
      light: light,
      dirlight: dirlight,
      loader: loader,
      loadObj: null,
      loadObjEdges: [],
      reader: new FileReader()
    } 
  },
  created () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.dirlight)
    // this.scene.add(this.cube)
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

    // Load 3dm
    // サーバーにRhino本体不要？npmのrhino3dmがあれば動く？
    // THREE.3DMLoader: ObjectType_Brep has no associated mesh geometry.
    // というエラーが頻発してBrepを読み込めない。
    // https://discourse.mcneel.com/t/3dmloader-for-three-js/107702/13
    // -> Rhinoのファイル内でBrepに対応するRenderMeshを生成しておく必要がある。
    // RenderMeshは明示的にコマンドで作れないが、Brepをシェーダーが必要な表示モードで一度でも表示すると、
    // 生成されるみたい。2021/3月くらいに議論に上がっているが、対応予定はよくわからない。
    this.loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/');
    this.load3dm('sample.3dm');

    // Events
    let inputFile = document.getElementById('fileinput');
    inputFile.addEventListener('change', this.fileChange, false);
    this.reader.addEventListener('load', this.fileLoad, false);

    let fitButton = document.getElementById('fitscale')
    fitButton.addEventListener('click', () => {
      this.adjustCamera(this.loadObj)
    })

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
        if (this.loadObj) {
          this.scene.remove(this.loadObj)
          while (this.loadObjEdges.length > 0){
            this.scene.remove(this.loadObjEdges.pop())
          }
        }
        this.loadObj = object;
        this.scene.add(this.loadObj);

        object.traverse( function(child) {
          // Meshのマテリアルを変更する。
          // if (child.material) {
          //   const childmat = new THREE.MeshNormalMaterial();
          //   childmat.side = THREE.DoubleSide;
          //   child.material = childmat;
          // }
          
          // エッジを表示・レイヤーのオンオフの反映
          if ( Object.prototype.hasOwnProperty.call(child.userData, 'attributes')){
          // if (child.userData.hasOwnProperty('attributes')){
            let id = child.userData.attributes.layerIndex;
            if (object.userData.layers[id].visible){
              if (child.type == "Mesh") {
                const edges = new THREE.EdgesGeometry(child.geometry, 60);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
                this.loadObjEdges.push(line)
                this.scene.add(line);
              }
            }
            else {
              child.visible = object.userData.layers[id].visible;
            }
          }
        }.bind(this))

        this.adjustCamera(object);
      }.bind(this));
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
      cameraOffs.multiplyScalar(-bsphere.radius / sina);
      let newCameraPos = bsphere.center.clone().add(cameraOffs);

      this.camera.position.copy(newCameraPos);
      this.camera.lookAt(bsphere.center);
      this.controls.target.copy(bsphere.center);

      this.controls.update();
    },
    // var inputFile = document.getElementById('fileinput');
    // var reader = new FileReader();

    fileChange(ev) {
      // var target = ev.target;
      // var file = target.files[0];
      // var type = file.type;
      // var size = file.size;

      // if (type !== 'image/jpeg') {
      //   alert('選択できるファイルはJPEG画像だけです。');
      //   inputFile.value = '';
      //   return;
      // }

      this.reader.readAsDataURL(ev.target.files[0]);
    },
    fileLoad() {
      this.load3dm(this.reader.result);
    }

    // inputFile.addEventListener('change', fileChange, false);
    // reader.addEventListener('load', fileLoad, false);
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

#main {
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
