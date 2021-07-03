<template>
  <v-app>
    <!-- <v-overlay 
      absolute="true"
      value="false"
      opacity="0">
    </v-overlay> -->
    <ViewPort/>    
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
    //
  }),
  mounted: function() {
    document.addEventListener('touchmove', function(event){
        event.preventDefault();
      }, { passive: false });
  }
};
</script>

<style scoped>
</style>
