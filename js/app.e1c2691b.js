(function(e){function t(t){for(var i,s,o=t[0],d=t[1],l=t[2],h=0,u=[];h<o.length;h++)s=o[h],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&u.push(r[s][0]),r[s]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(e[i]=d[i]);c&&c(t);while(u.length)u.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,o=1;o<n.length;o++){var d=n[o];0!==r[d]&&(i=!1)}i&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={app:0},a=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var c=d;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"4fb3":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ViewPort")],1)},a=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"ViewPort"}},[n("div",{attrs:{id:"sidebar"}},[n("label",{staticClass:"sidebar-icon",attrs:{for:"fileinput"}},[n("svg",{staticClass:"bi bi-folder2-open",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",viewBox:"0 0 16 16"}},[n("path",{attrs:{d:"M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"}})]),n("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"fileinput",name:"fileinput",accept:".3dm"}})]),n("div",{staticClass:"sidebar-icon",attrs:{id:"fitscale"}},[n("svg",{staticClass:"bi bi-arrows-angle-contract",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",viewBox:"0 0 16 16"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"}})])])]),n("div",{ref:"stage",attrs:{id:"main"}})])},o=[],d=n("5a89"),l=n("4721"),c=n("b07c"),h={name:"ViewPort",data:function(){var e=new d["D"],t=new d["N"],n=new d["x"](45,1,.1,2e5);n.up.set(0,0,1);var i=new d["b"](2,2,2),r=new d["t"],a=new d["s"](i,r),s=new d["k"](16777215,4473924,1),o=new d["g"](16777215,3);o.position.set(1,-2,2),o.castShadow=!0;var l=new c["a"];return{scene:e,renderer:t,camera:n,cube:a,controls:null,light:s,dirlight:o,loader:l,loadObj:null,loadObjEdges:[],reader:new FileReader}},created:function(){this.scene.add(this.camera),this.scene.add(this.light),this.scene.add(this.dirlight),this.scene.background=new d["f"](10526880)},mounted:function(){var e=this;this.$refs.stage.appendChild(this.renderer.domElement),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputEncoding=d["O"],this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=d["w"],window.addEventListener("resize",this.onWindowResize),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.position.set(3,3,6),this.camera.updateProjectionMatrix(),this.controls=new l["a"](this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.update(),this.loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/"),this.load3dm("sample.3dm");var t=document.getElementById("fileinput");t.addEventListener("change",this.fileChange,!1),this.reader.addEventListener("load",this.fileLoad,!1);var n=document.getElementById("fitscale");n.addEventListener("click",(function(){e.adjustCamera(e.loadObj)})),this.animate()},methods:{animate:function(){requestAnimationFrame(this.animate),this.renderer.render(this.scene,this.camera)},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},load3dm:function(e){this.loader.load(e,function(e){if(this.loadObj){this.scene.remove(this.loadObj);while(this.loadObjEdges.length>0)this.scene.remove(this.loadObjEdges.pop())}this.loadObj=e,this.scene.add(this.loadObj),e.traverse(function(t){if(Object.prototype.hasOwnProperty.call(t.userData,"attributes")){var n=t.userData.attributes.layerIndex;if(e.userData.layers[n].visible){if("Mesh"==t.type){var i=new d["h"](t.geometry,60),r=new d["n"](i,new d["m"]({color:0}));this.loadObjEdges.push(r),this.scene.add(r)}}else t.visible=e.userData.layers[n].visible}}.bind(this)),this.adjustCamera(e)}.bind(this))},adjustCamera:function(e){var t=new d["a"];t.setFromObject(e);var n=t.getBoundingSphere(new d["E"]),i=this.camera.getEffectiveFOV(),r=this.camera.fov*this.camera.aspect,a=Math.min(i,r),s=new d["M"];this.camera.getWorldDirection(s);var o=Math.sin(a*Math.PI/360),l=s.clone();l.multiplyScalar(-n.radius/o);var c=n.center.clone().add(l);this.camera.position.copy(c),this.camera.lookAt(n.center),this.controls.target.copy(n.center),this.controls.update()},fileChange:function(e){this.reader.readAsDataURL(e.target.files[0])},fileLoad:function(){this.load3dm(this.reader.result)}}},u=h,p=(n("d4d0"),n("2877")),f=Object(p["a"])(u,s,o,!1,null,"7bbbf502",null),w=f.exports,m={name:"App",components:{ViewPort:w}},v=m,b=(n("034f"),Object(p["a"])(v,r,a,!1,null,null,null)),g=b.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(g)}}).$mount("#app")},"85ec":function(e,t,n){},d4d0:function(e,t,n){"use strict";n("4fb3")}});
//# sourceMappingURL=app.e1c2691b.js.map