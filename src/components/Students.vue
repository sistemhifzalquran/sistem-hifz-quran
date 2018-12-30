<template>
  <v-container align-content-center>
    <v-expansion-panel popout>
      <v-expansion-panel-content flat v-for="student in studentDataList" :key="student.ic">
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
            <div class="caption grey--text">Purata Markah</div>
            <div>{{student.mark}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${student.status} white--text my-2 caption`">{{student.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-card
      v-if="noStudent"
      flat
      class="warning pa-1 text-xs-center"
    >Kumpulan ini tidak memiliki pelajar</v-card>
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
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
.v-chip.excel {
  background: #3cd1c2;
}
.v-chip.normal {
  background: #ffaa2c;
}
.v-chip.critical {
  background: #f83e70;
}
.v-chip.good {
  background: #3e70f8;
}
</style>