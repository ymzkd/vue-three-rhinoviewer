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
};
</script>

<style scoped>
</style>
