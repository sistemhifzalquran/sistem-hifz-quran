<template>
  <v-app>
    <Navbar/>
    <v-content >
      <News/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import News from "@/components/News";
export default {
  components: { Navbar, News },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("onCreatedData");
  }
};
</script>
