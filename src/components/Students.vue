<template>
  <v-container align-content-center>
    <v-expansion-panel popout>
      <v-expansion-panel-content>
        <div slot="header">
          <h2>Pelajar</h2>
        </div>
        <v-expansion-panel v-for="student in studentDataList" popout :key="student.ic">
          <v-expansion-panel-content>
            <div slot="header">
              <h2>{{student.name}}</h2>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
//const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["studentDataList", "currentGroup"])
  },
  methods: {}
};
</script>
