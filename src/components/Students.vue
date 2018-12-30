<template>
  <v-container align-content-center>
    <v-expansion-panel flat v-for="student in studentDataList" popout :key="student.ic">
      <v-expansion-panel-content>
        <v-layout slot="header" row wrap class="pa-1">
          <v-flex xs12 md6>
            <div class="caption grey--text">Nama Pelajar</div>
            <div>{{student.name}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">No.Kad Pengenalan</div>
            <div>{{student.ic}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Nama Pelajar</div>
            <div>{{student.mark}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div>{{student.mark}}</div>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-card v-if="noStudent" flat class="warning">Kumpulan ini tidak memiliki pelajar</v-card>
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
    ...mapState(["studentDataList", "currentGroup", "noStudent"])
  },
  methods: {}
};
</script>
