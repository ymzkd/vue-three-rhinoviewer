(function(e){function t(t){for(var a,s,o=t[0],d=t[1],l=t[2],u=0,h=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);c&&c(t);while(h.length)h.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var d=n[o];0!==i[d]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={app:0},r=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/vue-three-rhinoviewer/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var c=d;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"24ca":function(e,t,n){},"500d":function(e,t,n){"use strict";n("bd0e")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("ViewPort",{ref:"viewcomp"})],1)},r=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"ViewPort"}},[n("NavPanel",{attrs:{layertree:e.layertree,layervisibles:e.layervisible,layerexpanded:e.layerexpanded,bloburl:e.bloburl,id:"sidebar"},on:{input:e.inputdone,adjust:e.adjustdone,savefile:e.saveFile,fileinput:e.fileinputdone}}),n("div",{ref:"stage",attrs:{id:"viewmain"}})],1)},o=[],d=n("1da1"),l=(n("96cf"),n("b0c0"),n("caad"),n("2532"),n("d3b7"),n("25f0"),n("ac1f"),n("466d"),n("3ca3"),n("ddb0"),n("2b3d"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"d-flex",attrs:{id:"navmenu",flat:"",tile:"",height:"100vh",width:e.openLayer?e.navwidth+e.layerwidth:e.navwidth}},[n("v-navigation-drawer",{ref:"navdrawer",attrs:{"mini-variant":"",permanent:""}},[n("v-list",{attrs:{dense:"",nav:""}},[n("v-list-item",{attrs:{link:""},on:{click:function(t){e.openLayer=!e.openLayer}}},[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"}},[e._v("mdi-layers-outline")])],1),n("v-list-item-content",[e._v(" Layer ")])],1),n("v-list-item",{attrs:{link:""}},[n("v-list-item-icon",[n("label",{staticClass:"navicon",attrs:{for:"fileinput"}},[n("v-icon",{attrs:{color:"black"}},[e._v("mdi-folder-open-outline")]),n("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"fileinput",name:"fileinput",accept:".3dm"}})],1)]),n("v-list-item-content",[e._v(" File ")])],1),n("v-list-item",{attrs:{link:""}},[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"},on:{click:e.adjustdone}},[e._v("mdi-fit-to-page-outline")])],1),n("v-list-item-content",[e._v(" Adjust Object ")])],1),e.isIOS?n("v-list-item",{attrs:{link:""}},[n("v-list-item-icon",[n("div",[n("a",{attrs:{rel:"ar",href:e.bloburl,download:"model.usdz"}},[n("img",{staticClass:"naviconimg",attrs:{src:"cube-scan.svg"}})])])]),n("v-list-item-content",[e._v(" AR View ")])],1):e._e()],1)],1),n("v-card",{directives:[{name:"show",rawName:"v-show",value:e.openLayer,expression:"openLayer"}],attrs:{height:"100%",flat:"",tile:""}},[n("v-navigation-drawer",{ref:"layerdrawer",attrs:{width:e.layerwidth,permanent:""}},[n("v-treeview",{attrs:{selectable:"",dense:"","on-icon":"mdi-eye","off-icon":"mdi-eye-off-outline",items:e.layertree,value:e.layervisibles,open:e.layerexpanded},on:{input:e.inputdone}})],1)],1)],1)}),c=[],u={name:"NavPanel",props:["layertree","layervisibles","layerexpanded","bloburl"],data:function(){return{openLayer:!1,minnavwidth:200,navwidth:56,layerwidth:200}},methods:{resize:function(e){document.body.style.cursor="ew-resize",this.layerwidth=Math.max(e.clientX-this.navwidth,this.minnavwidth)},setEvents:function(){var e=this,t=this.$refs.layerdrawer.$el,n=t.querySelector(".v-navigation-drawer__border");n.addEventListener("mousedown",(function(n){n.stopPropagation(),n.preventDefault(),t.style.transition="initial",document.addEventListener("mousemove",e.resize,!1)}),!1),n.addEventListener("mouseenter",(function(){document.body.style.cursor="ew-resize"}),!1),n.addEventListener("mouseleave",(function(){document.body.style.cursor=""}),!1),document.addEventListener("mouseup",(function(){t.style.transition="",document.body.style.cursor="",document.removeEventListener("mousemove",e.resize,!1)}),!1)},inputdone:function(e){this.$emit("input",e)},adjustdone:function(){this.$emit("adjust")},emitsavefile:function(){this.$emit("savefile")},fileinputdone:function(e){this.$emit("fileinput",e)},fileChange:function(e){var t=e.target,n=t.files[0];this.fileinputdone(n)}},computed:{isIOS:function(){return/iP(hone|(o|a)d)|Mac/.test(navigator.userAgent)}},mounted:function(){this.setEvents();var e=document.getElementById("fileinput");e.addEventListener("change",this.fileChange,!1),console.log(this.bloburl)}},h=u,p=(n("fe6d"),n("2877")),v=n("6544"),f=n.n(v),m=n("b0af"),b=n("132d"),w=n("8860"),y=n("da13"),g=n("5d23"),O=n("34c3"),j=n("f774"),x=n("eb2a"),L=Object(p["a"])(h,l,c,!1,null,"1b7a0807",null),E=L.exports;f()(L,{VCard:m["a"],VIcon:b["a"],VList:w["a"],VListItem:y["a"],VListItemContent:g["a"],VListItemIcon:O["a"],VNavigationDrawer:j["a"],VTreeview:x["a"]});var P=n("5a89"),D=n("4721"),M=n("b07c"),_=n("9a3e"),k={components:{NavPanel:E},name:"ViewPort",data:function(){var e=new P["B"],t=new P["L"]({antialias:!0}),n=new P["v"](45,1,1,2e5),a=new P["j"](16777215,4473924,1),i=new P["f"](16777215,3);i.position.set(1,2,-2),i.castShadow=!0;var r=new M["a"];return{scene:e,renderer:t,camera:n,controls:null,light:a,dirlight:i,loader:r,loadObj:null,loadObjEdges:{},reader:new FileReader,layertree:[],layervisible:[],layerexpanded:[],bloburl:null}},created:function(){this.scene.add(this.camera),this.scene.add(this.light),this.scene.add(this.dirlight),this.scene.background=new P["e"](10526880)},mounted:function(){this.$refs.stage.appendChild(this.renderer.domElement),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputEncoding=P["M"],this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=P["u"],window.addEventListener("resize",this.onWindowResize),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.position.set(3,3,6),this.camera.updateProjectionMatrix(),this.controls=new D["a"](this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.update(),this.reader.addEventListener("load",this.fileLoad,!1),this.loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/"),this.load3dm("sample.3dm"),this.animate()},methods:{animate:function(){requestAnimationFrame(this.animate),this.renderer.render(this.scene,this.camera)},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},load3dm:function(e){this.loader.load(e,function(e){if(this.loadObj)for(var t in this.scene.remove(this.loadObj),this.loadObjEdges)this.scene.remove(this.loadObjEdges[t]),delete this.loadObjEdges[t];e.rotation.set(-Math.PI/2,0,0),e.updateMatrix(),this.layertree=[],this.layervisible=[],this.layerexpanded=[];var n={"00000000-0000-0000-0000-000000000000":{id:-1,parents:null,child:[],data:{}}};for(var a in e.userData.layers)if(Object.hasOwnProperty.call(e.userData.layers,a)){var i=e.userData.layers[a];n[i.id]={id:a,parents:i.parentLayerId,child:[],data:{name:i.name,color:i.color,expanded:i.expanded,visible:i.visible}},i.visible&&this.layervisible.push(a),i.expanded&&this.layerexpanded.push(a)}for(var r in e.userData.layers)if(Object.hasOwnProperty.call(e.userData.layers,r)){var s=e.userData.layers[r];n[s.parentLayerId].child.push(s.id)}this.layertree=this.bakeTree(n,"00000000-0000-0000-0000-000000000000").children;var o=new P["l"]({color:0});o.polygonOffset=!0,o.polygonOffsetFactor=-4,o.polygonOffsetUnits=1,e.traverse(function(t){if(Object.prototype.hasOwnProperty.call(t.userData,"attributes")){var n=t.userData.attributes.layerIndex;if(t.material.polygonOffset=!0,t.material.polygonOffsetFactor=4,t.material.polygonOffsetUnits=1,"Mesh"==t.type){var a=new P["g"](t.geometry,60),i=new P["m"](a,o);i.rotation.set(-Math.PI/2,0,0),i.updateMatrix(),this.loadObjEdges[t.uuid]=i,this.loadObjEdges[t.uuid].visible=e.userData.layers[n].visible,this.scene.add(this.loadObjEdges[t.uuid])}t.visible=e.userData.layers[n].visible}}.bind(this)),this.loadObj=e,this.scene.add(e),this.adjustCamera(e),this.createBlob()}.bind(this))},bakeTree:function(e,t){var n=e[t],a=[];for(var i in n.child){var r=e[n.child[i]];0==r.child.length?a.push({id:r.id,name:r.data.name}):a.push(this.bakeTree(e,n.child[i]))}return{id:n.id,name:n.data.name,children:a}},adjustCamera:function(e){var t=new P["a"];t.setFromObject(e);var n=t.getBoundingSphere(new P["C"]),a=this.camera.getEffectiveFOV(),i=this.camera.fov*this.camera.aspect,r=Math.min(a,i),s=new P["K"];this.camera.getWorldDirection(s);var o=Math.sin(r*Math.PI/360),d=s.clone(),l=n.radius/o;d.multiplyScalar(-l);var c=n.center.clone().add(d);this.camera.position.copy(c),this.camera.far=50*l,this.camera.lookAt(n.center),this.camera.updateProjectionMatrix(),this.controls.target.copy(n.center),this.controls.update()},inputdone:function(e){this.scene.traverse(function(t){Object.hasOwnProperty.call(t.userData,"attributes")&&"layerIndex"in t.userData.attributes&&(t.visible=e.includes(t.userData.attributes.layerIndex.toString()),"Mesh"==t.type&&(this.loadObjEdges[t.uuid].visible=t.visible))}.bind(this))},adjustdone:function(){this.adjustCamera(this.loadObj)},fileinputdone:function(e){e.name.match(/.+\.3dm/)?(this.reader.readAsDataURL(e),this.load3dm(this.reader.result),console.log("file changed")):alert("3dmファイルのみ対応")},fileLoad:function(){this.load3dm(this.reader.result)},createBlob:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var n,a,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new _["a"],a=e.scene.clone(),a.scale.set(.001,.001,.001),a.updateMatrixWorld(!0),t.next=6,n.parse(a);case 6:i=t.sent,r=new Blob([i],{type:"application/octet-stream"}),e.bloburl=URL.createObjectURL(r);case 9:case"end":return t.stop()}}),t)})))()},saveFile:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var n,a,i,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new _["a"],a=e.scene.clone(),a.scale.set(.001,.001,.001),a.updateMatrixWorld(!0),t.next=6,n.parse(a);case 6:i=t.sent,r=new Blob([i],{type:"application/octet-stream"}),e.bloburl=URL.createObjectURL(r),console.log(e.bloburl),s=Object.assign(document.createElement("a"),{download:"model.usdz",rel:"ar",href:e.bloburl}),s.click();case 12:case"end":return t.stop()}}),t)})))()}}},W=k,I=(n("500d"),Object(p["a"])(W,s,o,!1,null,"7ca1e0d3",null)),R=I.exports,S={name:"App",components:{ViewPort:R},data:function(){return{drag:Boolean,file:null}},methods:{onWDrop:function(e){e.stopPropagation(),e.preventDefault(),this.drag=!1,e&&e.dataTransfer&&0!==e.dataTransfer.files.length&&(this.file=e.dataTransfer.files[0],this.$refs.viewcomp.fileinputdone(this.file))},onWEnter:function(e){e.stopPropagation(),e.preventDefault(),this.drag=!0},onWLeave:function(e){e.stopPropagation(),e.preventDefault(),this.drag=!1},onWDragOver:function(e){e.preventDefault()}},mounted:function(){document.addEventListener("touchmove",(function(e){e.preventDefault()}),{passive:!1}),window.addEventListener("dragenter",this.onWEnter,!1),window.addEventListener("drop",this.onWDrop,!1),window.addEventListener("dragleave",this.onWLeave,!1),window.addEventListener("dragover",this.onWDragOver,!1)}},V=S,z=n("7496"),C=Object(p["a"])(V,i,r,!1,null,"f48a3318",null),$=C.exports;f()(C,{VApp:z["a"]});var T=n("f309");a["a"].use(T["a"]);var F=new T["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:F,render:function(e){return e($)}}).$mount("#app")},bd0e:function(e,t,n){},fe6d:function(e,t,n){"use strict";n("24ca")}});
//# sourceMappingURL=app.a8c468fc.js.map