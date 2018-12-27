<template>
  <v-container align-content-center>
    <v-expansion-panel popout>
      <v-expansion-panel-content>
        <div slot="header">Pengumuman</div>
        <v-card>
          <v-card-text>
            <v-form ref="addNewsForm" class="text-xs-right">
              <v-textarea
                solo
                v-model="addNewsContent"
                label="Enter Post Here"
                :rules="inputRulesAddNews"
                maxlength="100"
              ></v-textarea>
              <v-btn @click="addNews" :loading="performingRequest ? true : false">Hantar</v-btn>
            </v-form>
            <v-card flat v-for="news in currentNews" :key="news.key">
              {{news.content}}
              {{news.dateCreated}}
            </v-card>
            <v-btn
              :disabled="noMoreNews"
              @click="viewNews()"
              :loading="performingRequestNews ? true : false"
            >{{pengumuman}}</v-btn>
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
      pengumuman: "Lihat Pengumuman Lepas",
      loadedNews: 1,
      currentNews: [],
      addNewsContent: "",
      performingRequest: false,
      performingRequestNews: false,
      noMoreNews: false,
      inputRulesAddNews: [
        v => (v.length >= 2 && v.length <= 100) || "minima 2 huruf"
      ]
    };
  },
  computed: {
    ...mapState(["newsList", "currentGroup"])
  },
  methods: {
    viewNews() {
      var xy = this.newsList.length - this.loadedNews;
      var x = this.newsList[xy];

      if (xy >= 0) {
        this.performingRequestNews = true;
        fb.db
          .collection("news")
          .doc(x)
          .get()
          .then(doc => {
            console.log(x);
            var xx = doc.data().dateCreated.toDate();
            var yy = doc.data().content;
            this.currentNews.push({
              dateCreated: xx.toLocaleString(),
              content: yy,
              key: doc.id
            });
            this.performingRequestNews = false;
            this.loadedNews += 1;
          });
      } else {
        console.log("no more news");
        this.noMoreNews = true;
        this.pengumuman = "Tiada Lagi Pengumuman";
      }
    },
    addNews() {
      if (this.$refs.addNewsForm.validate()) {
        this.performingRequest = true;
        fb.db
          .collection("news")
          .add({ content: this.addNewsContent, dateCreated: new Date() })
          .then(doc => {
            this.$store.state.newsList.push(doc.id);
            fb.db
              .collection("setting")
              .doc("news")
              .collection("group")
              .doc(this.$store.state.currentGroup)
              .update({ timeline: this.$store.state.newsList });
          })
          .then(() => {
            this.performingRequest = false;
            this.addNewsContent = "";
          })
          .catch(function(error) {
            console.log("Error writing document: ", error);
          });
      }
    }
  }
};
</script>
