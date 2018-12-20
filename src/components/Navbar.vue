<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hifz AlQuran</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>{{currentGroup}}</span>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="group in groupList"
            :key="group.name"
            @click="setCurrentGroup(group.name)"
          >
            <v-list-tile-title>{{group.name}}</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
            <v-list-tile @click="addNewGroup()">
              <v-list-tile-title>
                Add New Group
              </v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: mapState(["groupList", "currentGroup"]),
  methods: {
    setCurrentGroup: function(groupChoosed) {
      this.$store.dispatch("setCurrentGroup", groupChoosed);
    }
  }
};
</script>
