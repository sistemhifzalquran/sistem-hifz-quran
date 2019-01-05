<template>
  <v-container>
    <v-snackbar v-model="snack" :timeout="2500" top color="success">
      <span>{{snackMsg}}</span>
    </v-snackbar>
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

    <v-card flat v-for="student in studentDataList" :key="student.ic">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md6>
          <div class="caption grey--text">Nama Pelajar</div>
          <div>{{student.name}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">No.Kad Pengenalan</div>
          <div>{{student.ic}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Prestasi</div>
          <div>
            <v-chip small :class="`${student.status} white--text caption`">{{student.mark}}</v-chip>
          </div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div>
            <Tasmiq v-bind:student="student"/>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>

    <v-card
      v-if="noStudent"
      flat
      class="warning pa-1 text-xs-center"
    >Kumpulan ini tidak memiliki pelajar</v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import Tasmiq from "./Tasmiq";
const fb = require("../firebaseConfig.js");

export default {
  components: { Tasmiq },
  data() {
    return {
      snack: false,
      snackMsg: "",
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
    ...mapState(["studentDataList", "currentGroup", "noStudent", "studentList"])
  },
  methods: {
    registerNewStudent() {
      if (this.$refs.formNewStudent.validate()) {
        this.performingRequest = true;
        fb.secondaryApp
          .auth()
          .createUserWithEmailAndPassword(
            this.signupForm.iC + "@hifzalquran.com",
            this.signupForm.iC
          )
          .then(credential => {
            this.studentList.push(credential.user.uid);
            fb.db
              .collection("group")
              .doc(this.currentGroup)
              .update({ students: this.studentList });
            fb.usersCollection
              .doc(credential.user.uid)
              .set({
                name: this.signupForm.name,
                admin: false,
                ic: this.signupForm.iC,
                mark: 0
              })
              .then(() => {
                this.studentDataList.push({
                  status: 0,
                  mark: 0,
                  ic: this.signupForm.iC,
                  name: this.signupForm.name,
                  key: credential.user.uid
                });
                fb.secondaryApp.auth().signOut();
                this.snackMsg = "Berjaya Mendaftar " + this.signupForm.name;
                this.snack = true;
                this.performingRequest = false;
                this.signupForm.name = "";
                this.signupForm.iC = "";
                this.dialog = false;
              })
              .catch(err => {
                console.log(err);
                this.performingRequest = false;
                this.errorMsg = err.message;
              });
          });
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    onlyLetter($event) {
      //validate for letter as start,can contain space ' and .
      let charCode = $event.keyCode ? $event.keyCode : $event.which;
      if (
        !(
          (charCode > 64 && charCode < 91) ||
          (charCode > 96 && charCode < 123) ||
          charCode == 32 ||
          charCode == 46 ||
          charCode == 39
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