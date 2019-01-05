<template>
  <v-dialog max-width="600px">
    <v-btn slot="activator" round small class="white--text my-2 caption success">TASMIQ</v-btn>
    <v-card>
      <v-card-title>
        <h2>{{student.name}}</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="text-xs-right">
          <v-layout row><h2 class="font-weight-regular pt-1">Fasohah</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Hafazan</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Tajwid</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Fiqh Ayat</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-text-field
            prepend-icon="group_add"
            label="ulasan"
            v-model="ulasan"
            maxlength="200"
          ></v-text-field>
          <v-btn @click="addMark" :loading="performingRequest ? true : false">Hantar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["student"],
  data(){
    return{
      ulasan: '',
      performingRequest: false,
    }
  },
  methods:{
    addMark(){

    }
  }
};
</script>
