<template>
  <v-container>
    <v-snackbar v-model="snack" :timeout="2500" top color="success">
      <span>{{snackMsg}}</span>
    </v-snackbar>
    <v-btn style="min-width: 0" flat @click="sortStudentDataListBy = 'name'">
      <v-icon left>sort_by_alpha</v-icon>
    </v-btn>
    <v-btn style="min-width: 0" flat @click="sortStudentDataListBy = 'markLowest'">
      <v-icon left>trending_up</v-icon>
    </v-btn>
    <v-btn style="min-width: 0" flat @click="sortStudentDataListBy = 'markHighest'">
      <v-icon left>trending_down</v-icon>
    </v-btn>
    <v-menu offset-y>
      <v-btn flat slot="activator">
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

    <v-menu offset-y>
      <v-btn slot="activator" flat>
        <v-icon left>expand_more</v-icon>
        <span>Urus Tasmiq</span>
      </v-btn>
      <v-list>
        <v-list-tile @click="showStudentsTasmiqTarget = !showStudentsTasmiqTarget">
          <v-list-tile-title>Urus Silibus</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <div v-if="showStudentsTasmiqTarget == true">
      <StudentsTasmiqTarget />
    </div>
    <v-card flat v-for="student in studentDataListSorted" :key="student.ic">
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
          <div>
            <v-btn
              @click="resolveShowPrestasi(student.ic)"
              round
              small
              :color="`${student.status}`"
              class="white--text my-2 caption"
            >{{student.mark}}%</v-btn>
            <div v-if="showPrestasi == student.ic">
              <Prestasi v-bind:student="student" />
            </div>
          </div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div>
            <v-btn
              @click="resolveShowTasmiq(student.ic)"
              round
              small
              class="white--text my-2 caption success"
            >TASMIQ</v-btn>
            <div v-if="showTasmiq == student.ic">
              <Tasmiq v-bind:student="student" />
            </div>
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
const fb = require("../firebaseConfig.js");

export default {
  components: {
    Prestasi: () => import("./Prestasi"),
    Tasmiq: () => import("./Tasmiq"),
    StudentsTasmiqTarget: () => import("./StudentsTasmiqTarget")
  },
  data() {
    return {
      sortStudentDataListBy: "markHighest",
      showStudentsTasmiqTarget: false,
      showTasmiq: false,
      showPrestasi: false,
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
    ...mapState([
      "studentDataList",
      "currentGroup",
      "noStudent",
      "studentList",
      "targetTasmiq"
    ]),
    studentDataListSorted: function() {
      let x = this.studentDataList;
      if (this.sortStudentDataListBy == "markLowest") {
        return x.sort(function(a, b) {
          return a.mark - b.mark;
        });
      } else if (this.sortStudentDataListBy == "markHighest") {
        return x.sort(function(a, b) {
          return b.mark - a.mark;
        });
      } else if (this.sortStudentDataListBy == "name") {
        return x.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
      } else {
        return x;
      }
    }
  },
  methods: {
    resolveShowTasmiq(x) {
      if (this.showTasmiq == x) {
        this.showTasmiq = null;
        //kena klik 2 kali baru keluar dialog,sebab data showtasmiq = student.ic,v-dialog dh off,tpi showtasmiq still sama nilai,kena cari jalan untuk trigger blik
        //kena cari cara untuk showTasmiq jd null bila v-dialog/dialog = false
      } else {
        this.showTasmiq = x;
      }
    },
    resolveShowPrestasi(x) {
      if (this.showPrestasi == x) {
        this.showPrestasi = null;
        //kena klik 2 kali baru keluar dialog,sebab data showtasmiq = student.ic,v-dialog dh off,tpi showtasmiq still sama nilai,kena cari jalan untuk trigger blik
        //kena cari cara untuk showTasmiq jd null bila v-dialog/dialog = false
      } else {
        this.showPrestasi = x;
      }
    },
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
                fb.usersCollection
                  .doc(credential.user.uid)
                  .collection("mark")
                  .doc(new Date().toISOString().slice(0, 4))
                  .set({
                    totalDay: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    totalAyat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                  });
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