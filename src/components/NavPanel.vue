<template>
  <v-card
    class="d-flex"
    id="navmenu"
    flat
    tile
    height="100vh"
    :width="openLayer ? navwidth + layerwidth : navwidth"
  >
      <v-navigation-drawer 
        mini-variant
        permanent
        ref="navdrawer">

        <v-list
          dense
          nav
        >
          <!-- Toggle Layer Panel -->
          <v-list-item
            link
            @click="openLayer = !openLayer">
            <v-list-item-icon>
                <v-icon color="black">mdi-layers-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Layer
            </v-list-item-content>
          </v-list-item>

          <!-- File Open -->
          <v-list-item
            link>
            <v-list-item-icon>
              <label class="navicon" for="fileinput">
                <v-icon color="black">mdi-folder-open-outline</v-icon>
                <input type="file" id="fileinput" name="fileinput" accept=".3dm" style="display: none;">
              </label>
            </v-list-item-icon>
            <v-list-item-content>
              File
            </v-list-item-content>
          </v-list-item>

          <!-- Fit Camera -->
          <v-list-item
            link>
            <v-list-item-icon>
              <v-icon color="black" @click="adjustdone">mdi-fit-to-page-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Adjust Object
            </v-list-item-content>
          </v-list-item>

          <!-- AR Button -->
          <v-list-item
            v-if="isIOS"
            link>
            <v-list-item-icon>
              <div>
                <a rel="ar" :href="bloburl" download="model.usdz">
                  <img class="naviconimg" src="cube-scan.svg">
                </a>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              AR View
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

    <v-card
      height="100%"
      v-show="openLayer"
      flat
      tile
    >
      <v-navigation-drawer 
        ref="layerdrawer"
        :width="layerwidth"
        permanent
        >
        <v-treeview
          selectable
          dense
          on-icon="mdi-eye"
          off-icon="mdi-eye-off-outline"
          :items="layertree"
          :value="layervisibles"
          :open="layerexpanded"
          @input="inputdone"
        ></v-treeview>
      </v-navigation-drawer>
    </v-card> <!-- Layer View -->
  </v-card>
</template>
<script>
  export default {
    name: 'NavPanel',
    props: ["layertree", "layervisibles", "layerexpanded", "bloburl"],
    data () {
      return {
        openLayer: false,
        minnavwidth: 200,
        navwidth: 56,
        layerwidth: 200
      }
    },
    methods: {
      resize(e) {
        document.body.style.cursor = "ew-resize";
        this.layerwidth = Math.max(e.clientX - this.navwidth, this.minnavwidth)
      },
      setEvents() {
        const el = this.$refs.layerdrawer.$el;
        const drawerBorder = el.querySelector(".v-navigation-drawer__border");

        drawerBorder.addEventListener(
          "mousedown",
          (e) => {
            e.stopPropagation()
            e.preventDefault()
            el.style.transition ='initial';
            document.addEventListener(
              "mousemove", 
              this.resize,
              false);
          },
          false
        );

        drawerBorder.addEventListener(
          "mouseenter",
          () => {
            document.body.style.cursor = "ew-resize";
          },
          false
        )

        drawerBorder.addEventListener(
          "mouseleave",
          () => {
            document.body.style.cursor = "";
          },
          false
        )

        document.addEventListener(
          "mouseup",
          () => {
            el.style.transition ='';
            document.body.style.cursor = "";
            document.removeEventListener("mousemove", this.resize, false);
          },
          false
        );
      },
      inputdone(arr) {
        this.$emit('input', arr)
      },
      adjustdone() {
        this.$emit('adjust')
      },
      emitsavefile() {
        this.$emit('savefile')
      },
      fileinputdone(file) {
        this.$emit('fileinput', file)
      },
      fileChange(e) {
        var target = e.target;
        var file = target.files[0];
        this.fileinputdone(file)
      }
    },
    computed:{
      isIOS: function(){
        return /iP(hone|(o|a)d)|Mac/.test(navigator.userAgent);
      }
    },
    mounted: function() {
      this.setEvents()

      var inputFile = document.getElementById('fileinput');
      inputFile.addEventListener('change', this.fileChange, false);
      console.log(this.bloburl)
    }
  }
</script>
<style scoped>
.navicon {
  cursor : pointer;
}
.naviconimg {
  fill: orange;
  color: aqua;
}
</style>
