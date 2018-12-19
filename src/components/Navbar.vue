<template>
  <nav>
    <v-toolbar app>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hifz AlQuran</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      drawer: false
    }
  }
};
</script>
