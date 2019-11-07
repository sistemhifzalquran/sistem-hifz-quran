<template>
  <v-app id="login">
    <v-content class="deep-purple lighten-2">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-img
                src="https://firebasestorage.googleapis.com/v0/b/sistem-hifz-quran.appspot.com/o/WhatsApp%20Image%202019-01-02%20at%2020.50.24.jpeg?alt=media&token=59027e6d-8d6d-4a72-8736-634a695cbd3e"
                aspect-ratio="1"
                class="grey lighten-2"
              ></v-img>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    @paste.prevent
                    prepend-icon="person"
                    maxlength="12"
                    label="No Kad Pengenalan"
                    v-model.trim="loginForm.email"
                    ref="email"
                    :rules="inputRules"
                    @keypress="onlyNumber"
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="loginForm.password"
                    prepend-icon="lock"
                    type="password"
                    label="Kata Laluan"
                    ref="password"
                    maxlength="32"
                    :rules="inputRulesPassword"
                  ></v-text-field>
                  <v-layout align-center justify-end>
                    <v-btn @click="login" :loading="performingRequest ? true : false">Log Masuk</v-btn>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-alert :value="errorMsg !== '' ? true : false" type="error">{{ errorMsg }}</v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      performingRequest: false,
      errorMsg: "",
      inputRules: [
        v => v.length == 12 || "Pastikan No Kad Pengenalan Mencukupi"
      ],
      inputRulesPassword: [
        v =>
          (v.length >= 6 && v.length <= 32) || "Pastikan Kata Laluan Mencukupi"
      ]
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    login() {
      this.errorMsg = "";
      if (this.$refs.form.validate()) {
        this.performingRequest = true;
        fb.auth
          .signInWithEmailAndPassword(
            this.loginForm.email + "@hifzalquran.com",
            this.loginForm.password
          )
          .then(user => {
            this.$store.commit("setCurrentUser", user.user);
            this.$store.dispatch("fetchUserProfile");
            fb.usersCollection
              .doc(user.user.uid)
              .get()
              .then(function(doc) {
                if (doc.data().admin == true) {
                  console.log("go to admin");
                  return true;
                } else {
                  console.log("go to gogogogo");
                  return false;
                }
              })
              .then(x => {
                if (x == true) {
                  this.$router.push({ name: "Admin" });
                } else {
                  this.$router.push({ name: "Dashboard" });
                }
              });
          })
          .catch(err => {
            console.log(err);
            this.performingRequest = false;
            if (err.code == "auth/invalid-email") {
              this.errorMsg =
                "Sila masukkan No Kad Pengenalan dengan Format yang betul";
            } else {
              this.errorMsg = err.message;
            }
          });
      }
    }
  }
};
</script>