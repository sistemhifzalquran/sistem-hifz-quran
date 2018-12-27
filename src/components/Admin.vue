<template>
  <v-app>
    <Navbar v-on:increment="renderNews"/>
    <v-content>
      <News :key="total"/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import News from "@/components/News";
export default {
  components: { Navbar, News },
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
