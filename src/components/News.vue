<template>
<v-container align-content-center>
    <v-expansion-panel popout>
      <v-expansion-panel-content>
        <h2 slot="header">Pengumuman</h2>
        <v-card>
          <v-card-text>
            <v-form ref="addNews" class="text-xs-right">
              <v-textarea
                solo
                prepend-icon="group_add"
                v-model="addNewsContent"
                label="Enter Post Here"
                :rules="inputRulesAddNews"
                maxlength="100"
              ></v-textarea>
              <v-btn @click="addNews()" :loading="performingRequest ? true : false">Hantar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-container>
</template>
<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {
      addNewsContent: "",
      performingRequest: false,
      inputRulesAddNews: [
        v => (v.length >= 2 && v.length <= 100) || "minima 2 huruf"
      ]
    };
  },
  computed: {
    ...mapState([])
  },
  method: {
    addNews() {}
  }
};
</script>
