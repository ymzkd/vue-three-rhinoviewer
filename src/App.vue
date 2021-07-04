<template>
  <v-app>
    <ViewPort ref="viewcomp"/>    
  </v-app>
</template>

<script>
import ViewPort from './components/ViewPort';

export default {
  name: 'App',

  components: {
    ViewPort,
  },

  data: () => ({
    drag: Boolean,
    file: null
  }),
  methods: {
    onWDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      this.drag = false

      if (!e) {
        return
      }

      if (!e.dataTransfer) {
        return
      }

      if (e.dataTransfer.files.length === 0) {
        return
      }

      this.file = e.dataTransfer.files[0]
      this.$refs.viewcomp.fileinputdone(this.file)
    },
    onWEnter(e){
      e.stopPropagation()
      e.preventDefault();
      this.drag = true;
    },
    onWLeave(e) {
      e.stopPropagation()
      e.preventDefault()
      this.drag = false;
    },
    onWDragOver(e){
      e.preventDefault()
    }
    
  },
  mounted: function() {
    document.addEventListener('touchmove', function(event){
      event.preventDefault();
      }, { passive: false }
    );

    window.addEventListener('dragenter', this.onWEnter, false);
    window.addEventListener('drop', this.onWDrop, false);
    window.addEventListener('dragleave', this.onWLeave, false);
    window.addEventListener('dragover', this.onWDragOver, false);
  }
};
</script>

<style scoped>
</style>
