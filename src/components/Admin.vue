<template>
  <v-app>
    <Navbar v-on:increment="renderNews"/>
    <v-content>
      <News :key="total"/>
      <Students :key="total+99"/>
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
    return { total: 0 };
  },
  methods: {
    renderNews: function() {
      this.total += 1;
    }
  },
  created() {
    this.$store.dispatch("onCreatedData");
  }
};
</script>
