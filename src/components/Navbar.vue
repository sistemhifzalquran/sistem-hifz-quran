<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hifz AlQuran</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-model="menu">
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
          <v-dialog max-width="600px" v-model="dialog">
            <v-list-tile  slot="activator">
              <v-list-tile-title>Tambah Group</v-list-tile-title>
            </v-list-tile>
            <v-card>
              <v-card-title>
                <h2>Group Baru</h2>
              </v-card-title>
              <v-card-text>
                <v-form class="text-xs-right" ref="formNewGroup">
                  <v-text-field
                    :rules="inputRulesNewGroup"
                    prepend-icon="group_add"
                    label="Group Name"
                    v-model="newGroupName"
                    maxlength="24"
                  ></v-text-field>
                  
                  <v-btn @click="createNewGroup" :loading="performingRequest ? true : false">Hantar</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
      <v-btn @click="logout()" flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
  </nav>
</template>
<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {
      menu: false,
      dialog: false,
      drawer: false,
      newGroupName: "",
      performingRequest: false,
      inputRulesNewGroup:[
        v => (v.length >= 2 && v.length <= 24)|| "Masukkan Nama Group Baru,minima 2 huruf"
      ]
    };
  },
  computed: mapState(["groupList", "currentGroup"]),
  methods: {
    setCurrentGroup: function(groupChoosed) {
      this.$store.dispatch("setCurrentGroup", groupChoosed);
    },
    createNewGroup() {
      if (this.$refs.formNewGroup.validate()) {
      this.performingRequest = true;
      fb.db
        .collection("group")
        .doc(this.newGroupName)
        .set({})
        .then(() => {
          this.setCurrentGroup(this.newGroupName),
          this.performingRequest = false,
          (this.newGroupName = ""),
          this.dialog = false,
          this.menu = false,
            console.log("Document successfully written!");
        })
        .catch(function(error) {
          this.performingRequest = false;
          alert("Error writing document: ", error);
        });
    }},
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.commit("resetState");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

//todo:pastikan add new group validate dulu group yang ada,cuba guna code yg update supaya x delete file
</script>
