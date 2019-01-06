<template>
  <v-dialog max-width="800px">
    <v-btn slot="activator" round small class="white--text my-2 caption success">TASMIQ</v-btn>
    <v-card>
      <v-card-title>
        <h2>{{student.name}}</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="text-xs-right">
          <v-layout>
            <v-select :items="verses" item-value="totalVerses" v-model="selectedSurahStart" label="Surah" solo></v-select>
            <v-select :items="selectedSurahStartTotalAyat" label="no ayat Mula" solo></v-select>
            <v-select label="Surah" solo></v-select>
            <v-select label="no Ayat Tamat" solo></v-select>
          </v-layout>
          <v-layout row><h2 class="font-weight-regular pt-1">Fasohah</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Hafazan</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Tajwid</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-layout row><h2 class="font-weight-regular pt-1">Fiqh Ayat</h2><v-spacer></v-spacer><v-rating length="6" hover></v-rating></v-layout>
          <v-divider></v-divider>
          <v-text-field prepend-icon="group_add" label="ulasan" v-model="ulasan" maxlength="200"></v-text-field>
          <v-btn @click="addMark" :loading="performingRequest ? true : false">Hantar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["student"],
  data() {
    return {
      selectedSurahStart:'',
      ulasan: "",
      performingRequest: false,
      verses: [
        { text: "1.Al-Fatihah", totalVerses: 7},
        { text: "2.Al-Baqarah", totalVerses: 286},
        { text: "3.Ali Imran", totalVerses: 200},
        { text: "4.An-Nisa'", totalVerses: 176},
        { text: "5.Al-Ma'ida", totalVerses: 120},
        { text: "6.Al-An'am", totalVerses: 165},
        { text: "7.Al-A'raf", totalVerses: 206},
        { text: "8.Al-Anfal", totalVerses: 75},
        { text: "9.At-Tawba", totalVerses:129},
        { text: "10.Yunus", totalVerses: 109},
        { text: "11.Hud", totalVerses: 123},
        { text: "12.Yusuf", totalVerses: 111},
        { text: "13.Ar-Ra'd", totalVerses:43 },
        { text: "14.Ibrahim", totalVerses: 	52},
        { text: "15.Al-Hijr", totalVerses: 99},
        { text: "16.An-Nahl", totalVerses: 128},
        { text: "17.Al-Isra'", totalVerses: 111},
        { text: "18.Al-Kahf", totalVerses: 	110},
        { text: "19.Maryam", totalVerses: 98},
        { text: "20.Ta-Ha", totalVerses: 135},
        { text: "21.Al-Anbiya'", totalVerses: 112},
        { text: "22.Al-Hajj", totalVerses: 78},
        { text: "23.Al-Mu'minoon", totalVerses: 118},
        { text: "24.An-Nur", totalVerses: 	64},
        { text: "25.Al-Furqan", totalVerses: 77},
        { text: "26.Ash-Shu'ara", totalVerses: 	227},
        { text: "27.An-Naml	", totalVerses: 93},
        { text: "28.Al-Qasas", totalVerses: 88},
        { text: "29.Al-Ankabut", totalVerses: 69},
        { text: "30.Ar-Rum", totalVerses: 60},
        { text: "31.Luqman", totalVerses: 34},
        { text: "32.As-Sajda", totalVerses: 30},
        { text: "33.Al-Ahzab", totalVerses: 73},
        { text: "34.Saba'", totalVerses: 54},
        { text: "35.Fatir", totalVerses: 45},
        { text: "36.Ya Seen", totalVerses: 83 },
        { text: "37.As-Saffat", totalVerses: 182},
        { text: "38.Sad", totalVerses: 88},
        { text: "39.Az-Zumar", totalVerses:75 },
        { text: "40.Ghafir", totalVerses: 85},
        { text: "41.Fussilat", totalVerses: 54},
        { text: "42.Ash-Shura", totalVerses: 53},
        { text: "43.Az-Zukhruf", totalVerses: 89},
        { text: "44.Ad-Dukhan", totalVerses: 	59},
        { text: "45.Al-Jathiya", totalVerses: 37},
        { text: "46.Al-Ahqaf", totalVerses: 35},
        { text: "47.Muhammad", totalVerses: 38},
        { text: "48.Al-Fath", totalVerses: 29},
        { text: "49.Al-Hujurat", totalVerses: 18},
        { text: "50.Qaf", totalVerses: 45},
        { text: "51.Adh-Dhariyat", totalVerses: 60},
        { text: "52.At-Tur", totalVerses: 49},
        { text: "53.An-Najm", totalVerses: 62},
        { text: "54.Al-Qamar", totalVerses: 55},
        { text: "55.Ar-Rahman", totalVerses: 78},
        { text: "56.Al-Waqi'a", totalVerses: 96},
        { text: "57.Al-Hadid", totalVerses: 29},
        { text: "58.Al-Mujadila", totalVerses: 22},
        { text: "59.Al-Hashr", totalVerses: 24},
        { text: "60.Al-Mumtahina", totalVerses: 13},
        { text: "61.As-Saff", totalVerses: 14},
        { text: "62.Al-Jumu'a", totalVerses: 11},
        { text: "63.Al-Munafiqun", totalVerses:11 },
        { text: "64.At-Taghabun", totalVerses: 18},
        { text: "65.At-Talaq", totalVerses: 12},
        { text: "66.At-Tahrim", totalVerses: 12},
        { text: "67.Al-Mulk", totalVerses: 30},
        { text: "68.Al-Qalam", totalVerses: 52},
        { text: "69.Al-Haqqa", totalVerses: 52},
        { text: "70.Al-Ma'arij", totalVerses: 44},
        { text: "71.Nuh", totalVerses: 28},
        { text: "72.Al-Jinn", totalVerses: 28},
        { text: "73.Al-Muzzammil", totalVerses: 20},
        { text: "74.Al-Muddathir", totalVerses: 56},
        { text: "75.Al-Qiyama", totalVerses: 40},
        { text: "76.Al-Insan", totalVerses: 31},
        { text: "77.Al-Mursalat", totalVerses: 50},
        { text: "78.An-Naba'", totalVerses: 40},
        { text: "79.An-Nazi'at", totalVerses: 46},
        { text: "80.Abasa", totalVerses: 42},
        { text: "81.At-Takwir", totalVerses: 29},
        { text: "82.Al-Infitar", totalVerses: 19},
        { text: "83.Al-Mutaffifeen", totalVerses: 36},
        { text: "84.Al-Inshiqaq", totalVerses: 25},
        { text: "85.Al-Burooj", totalVerses: 22},
        { text: "86.At-Tariq", totalVerses: 17},
        { text: "87.Al-A'la", totalVerses: 19},
        { text: "88.Al-Ghashiya", totalVerses: 26},
        { text: "89.Al-Fajr", totalVerses: 	30},
        { text: "90.Al-Balad", totalVerses: 20},
        { text: "91.Ash-Shams", totalVerses: 15 },
        { text: "92.Al-Lail", totalVerses: 21},
        { text: "93.Ad-Dhuha", totalVerses:11 },
        { text: "94.Ash-Sharh", totalVerses: 8},
        { text: "95.At-Teen", totalVerses: 8},
        { text: "96.Al-Alaq", totalVerses: 19},
        { text: "97.Al-Qadr", totalVerses: 5},
        { text: "98.Al-Bayyina", totalVerses: 8},
        { text: "99.Az-Zalzala", totalVerses: 8},
        { text: "100.Al-'Adiyat", totalVerses: 11},
        { text: "101.Al-Qari'a", totalVerses: 11},
        { text: "102.At-Takathur", totalVerses: 8},
        { text: "103.Al-'Asr", totalVerses: 3},
        { text: "104.Al-Humaza", totalVerses: 9},
        { text: "105.Al-Feel", totalVerses: 5},
        { text: "106.Quraysh", totalVerses: 4},
        { text: "107.Al-Ma'oon", totalVerses: 7},
        { text: "108.Al-Kawthar", totalVerses: 3},
        { text: "109.Al-Kafiroon", totalVerses: 6},
        { text: "110.An-Nasr", totalVerses: 3},
        { text: "111.Al-Masad", totalVerses:5 },
        { text: "112.Al-Ikhlas", totalVerses: 4},
        { text: "113.Al-Falaq", totalVerses:5 },
        { text: "114.An-Nas", totalVerses: 6},
        ]
    };
  },
  methods: {
    addMark() {}
  },
  computed:{
    selectedSurahStartTotalAyat(){
      
      return this.selectedSurahStart
    },
  }
};
</script>
