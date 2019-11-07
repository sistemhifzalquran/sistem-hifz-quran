<template>
  <v-app>
    <Navbar v-on:increment="renderNews"/>
    <v-content class="deep-purple lighten-2">
      <News :key="total"/>
      <Students :key="total2"/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import News from "@/components/News";
import Students from "@/components/Students";
export default {
  components: { Navbar, News, Students },
  data() {
    return { total: 0 ,total2: 99};
  },
  methods: {
    renderNews: function() {
      this.total += 1;
      this.total2 += 1;
    }
  },
  created() {
    this.$store.dispatch("onCreatedData");
  }
};
</script>
