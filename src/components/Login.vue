<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Hifz AlQuran</v-toolbar-title>
              </v-toolbar>
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
        v => v.length == 12 || 'Pastikan No Kad Pengenalan Mencukupi',

      ],
      inputRulesPassword: [
        v => v.length >= 6 && v.length <= 32 || 'Pastikan Kata Laluan Mencukupi',

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
      if(this.$refs.form.validate()) {
        this.performingRequest = true;
        fb.auth
          .signInWithEmailAndPassword(
            this.loginForm.email + "@hifzalquran.com",
            this.loginForm.password
          )
          .then(user => {
            this.$store.commit("setCurrentUser", user.user);
            this.$store.dispatch("fetchUserProfile");
            this.performingRequest = false;
            this.$router.push("/dashboard");
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