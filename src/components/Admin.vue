<template>
  <Navbar />
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
components:{Navbar},
data(){
  return{
    
  }
},
created() {
    this.$store.dispatch("onCreatedData");
  }
};
</script>
