<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <mainForm/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import mainForm from './components/mainForm.vue';

export default {
  name: 'App',

  components: {
    mainForm,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
  html, body, #app {
    width:100%;
    height:100%;
    overflow: hidden;
  }
  
</style>