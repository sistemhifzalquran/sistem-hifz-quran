<template>
  <v-container align-content-center>
    <v-expansion-panel popout>
      <v-expansion-panel-content>
        <div slot="header">
          <h2>Pengumuman</h2>
        </div>
        <v-card>
          <v-card-text>
            <v-form ref="addNewsForm" class="text-xs-right">
              <v-textarea
                :key="newscontentText"
                solo
                v-model="addNewsContent"
                label="Enter Post Here"
                :rules="inputRulesAddNews"
                maxlength="1000"
              ></v-textarea>
              <v-btn @click="addNews" :loading="performingRequestAddNews ? true : false">Hantar</v-btn>
            </v-form>
            <v-card flat v-for="news in currentNews" :key="news.key">
              <v-card-title class="lighten-2 grey--text text--darken-1 py-0">{{news.dateCreated}}</v-card-title>
              <v-card-text class="py-1">{{news.content}}</v-card-text>
              <v-divider class="pa-2"></v-divider>
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
      newscontentText: 0,
      pengumuman: "Lihat Pengumuman Lepas",
      loadedNews: 0,
      currentNews: [],
      addNewsContent: "",
      performingRequestAddNews: false,
      performingRequestNews: false,
      noMoreNews: false,
      inputRulesAddNews: [
        v => (v.length >= 2 && v.length <= 1000) || "minima 2 huruf"
      ]
    };
  },
  computed: {
    ...mapState(["newsList", "currentGroup"])
  },
  methods: {
    viewNews() {
      this.performingRequestNews = true;
      var xy = this.newsList.length - (this.loadedNews + 5);
      if (xy < 0) {
        xy = 0;
      }
      var x = this.newsList.slice(xy, this.newsList.length - this.loadedNews);
      x.slice()
        .reverse()
        .forEach(id => {
          fb.db
            .collection("news")
            .doc(id)
            .get()
            .then(doc => {
              var xx = doc.data().dateCreated.toDate();
              var yy = doc.data().content;
              this.currentNews.push({
                dateCreated: xx.toLocaleString(),
                content: yy,
                key: doc.id
              });
              this.loadedNews += 1;
              this.performingRequestNews = false;
              if (this.newsList.length - this.loadedNews <= 0) {
                this.noMoreNews = true;
                this.pengumuman = "Tiada Lagi Pengumuman";
              }
            });
        });
    },
    addNews() {
      if (this.$refs.addNewsForm.validate()) {
        this.performingRequestAddNews = true;
        var date = new Date();
        fb.db
          .collection("news")
          .add({ content: this.addNewsContent, dateCreated: date })
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
            this.currentNews.unshift({
              dateCreated: date.toLocaleString(),
              content: this.addNewsContent,
              key: this.$store.state.newsList[
                this.$store.state.newsList.length - 1
              ]
            });
            this.loadedNews += 1;
            this.performingRequestAddNews = false;
            this.addNewsContent = "";
            this.newscontentText += 1;
          })
          .catch(function(error) {
            console.log("Error writing document: ", error);
          });
      }
    }
  }
};
</script>
