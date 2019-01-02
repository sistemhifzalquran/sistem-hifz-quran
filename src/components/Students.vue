<template>
  <v-container align-content-center>
    <v-menu offset-y>
      <v-btn flat slot="activator" color="grey">
        <v-icon left>expand_more</v-icon>
        <span>Urus Pelajar</span>
      </v-btn>
      <v-list>
        <v-dialog max-width="600px" v-model="dialog">
          <v-list-tile slot="activator">
            <v-list-tile-title prepend-icon="person_add">Daftar Pelajar Baru</v-list-tile-title>
          </v-list-tile>
          <v-card>
            <v-card-title>
              <h2>Daftar Pelajar Baru</h2>
            </v-card-title>
            <v-card-text>
              <v-form class="text-xs-right" ref="formNewStudent">
                <v-text-field
                  @keypress="onlyLetter"
                  :rules="inputRulesNewStudent"
                  label="Nama Pelajar"
                  v-model="signupForm.name"
                  maxlength="100"
                ></v-text-field>
                <v-text-field
                  @keypress="onlyNumber"
                  :rules="inputRulesIC"
                  label="No Kad Pengenalan Pelajar"
                  v-model="signupForm.iC"
                  maxlength="12"
                ></v-text-field>
                <v-btn
                  @click="registerNewStudent()"
                  :loading="performingRequest ? true : false"
                >Hantar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>
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
    return {
      signupForm: {
        name: "",
        iC: ""
      },
      performingRequest: false,
      dialog: false,
      inputRulesNewStudent: [
        v =>
          (v.length >= 8 && v.length <= 100) ||
          "Masukkan Nama termasuk bin atau binti",
        v => /^([a-zA-Z]+\s)*['. a-zA-Z]+$/.test(v) || "Pastikan huruf Sahaja"
      ],
      inputRulesIC: [
        v => v.length == 12 || "Pastikan Kad Pengenalan mencukupi",
        v => /^\d+$/.test(v) || "Pastikan Nombor Sahaja"
      ]
    };
  },
  computed: {
    ...mapState(["studentDataList", "currentGroup", "noStudent"])
  },
  methods: {
    registerNewStudent() {},
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    onlyLetter($event) {
      let charCode = $event.keyCode ? $event.keyCode : $event.which;
      if (
        !(
          (charCode > 64 && charCode < 91) ||
          (charCode > 96 && charCode < 123) ||
          charCode == 32 || charCode == 46 || charCode ==39
        )
      ) {
        $event.preventDefault();
      }
    }
  }
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