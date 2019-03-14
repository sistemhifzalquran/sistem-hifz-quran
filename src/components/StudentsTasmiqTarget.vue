<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>Target Tasmiq {{targetTasmiq}} {{selectedMonth}}</v-card-title>
      selectedmonthtasmiq:{{selectedMonthTasmiq}}
      <v-menu>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>{{getMonth(selectedMonth)}}</span>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(monthList, index) in monthList"
            :key="index + monthList.bulan"
            @click="changeSelectedMonth(index)"
          >
            <v-list-tile-title>{{monthList.bulan}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-card-text>
        <v-form class="text-xs-right">minggu 1:
          <v-layout>
            <v-select :items="verses" v-model="selectedSurahStart1" label="Surah Mula"></v-select>
            <v-select
              :items="selectedSurahStartTotalAyat1"
              v-model="selectedNumberAyatStart1"
              label="no ayat Mula"
            ></v-select>
            <v-select :items="verses" v-model="selectedSurahEnd1" label="Surah Akhir"></v-select>
            <v-select
              :items="selectedSurahEndTotalAyat1"
              v-model="selectedNumberAyatEnd1"
              label="no Ayat Tamat"
            ></v-select>
          </v-layout>minggu 2:
          <v-layout>
            <v-select :items="verses" v-model="selectedSurahStart2" label="Surah Mula"></v-select>
            <v-select
              :items="selectedSurahStartTotalAyat2"
              v-model="selectedNumberAyatStart2"
              label="no ayat Mula"
            ></v-select>
            <v-select :items="verses" v-model="selectedSurahEnd2" label="Surah Akhir"></v-select>
            <v-select
              :items="selectedSurahEndTotalAyat2"
              v-model="selectedNumberAyatEnd2"
              label="no Ayat Tamat"
            ></v-select>
          </v-layout>minggu 3:
          <v-layout>
            <v-select :items="verses" v-model="selectedSurahStart3" label="Surah Mula"></v-select>
            <v-select
              :items="selectedSurahStartTotalAyat3"
              v-model="selectedNumberAyatStart3"
              label="no ayat Mula"
            ></v-select>
            <v-select :items="verses" v-model="selectedSurahEnd3" label="Surah Akhir"></v-select>
            <v-select
              :items="selectedSurahEndTotalAyat3"
              v-model="selectedNumberAyatEnd3"
              label="no Ayat Tamat"
            ></v-select>
          </v-layout>minggu 4:
          <v-layout>
            <v-select :items="verses" v-model="selectedSurahStart4" label="Surah Mula"></v-select>
            <v-select
              :items="selectedSurahStartTotalAyat4"
              v-model="selectedNumberAyatStart4"
              label="no ayat Mula"
            ></v-select>
            <v-select :items="verses" v-model="selectedSurahEnd4" label="Surah Akhir"></v-select>
            <v-select
              :items="selectedSurahEndTotalAyat4"
              v-model="selectedNumberAyatEnd4"
              label="no Ayat Tamat"
            ></v-select>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: true,
      selectedMonth: 0,
      monthList: [
        { bulan: "januari" },
        { bulan: "februari" },
        { bulan: "mac" },
        { bulan: "april" },
        { bulan: "mei" },
        { bulan: "jun" },
        { bulan: "julai" },
        { bulan: "ogos" },
        { bulan: "september" },
        { bulan: "oktober" },
        { bulan: "november" },
        { bulan: "disember" }
      ],
      verses: [
        { text: "1.Al-Fatihah", totalVerses: 7, value: 1 },
        { text: "2.Al-Baqarah", totalVerses: 286, value: 2 },
        { text: "3.Ali Imran", totalVerses: 200, value: 3 },
        { text: "4.An-Nisa'", totalVerses: 176, value: 4 },
        { text: "5.Al-Ma'ida", totalVerses: 120, value: 5 },
        { text: "6.Al-An'am", totalVerses: 165, value: 6 },
        { text: "7.Al-A'raf", totalVerses: 206, value: 7 },
        { text: "8.Al-Anfal", totalVerses: 75, value: 8 },
        { text: "9.At-Tawba", totalVerses: 129, value: 9 },
        { text: "10.Yunus", totalVerses: 109, value: 10 },
        { text: "11.Hud", totalVerses: 123, value: 11 },
        { text: "12.Yusuf", totalVerses: 111, value: 12 },
        { text: "13.Ar-Ra'd", totalVerses: 43, value: 13 },
        { text: "14.Ibrahim", totalVerses: 52, value: 14 },
        { text: "15.Al-Hijr", totalVerses: 99, value: 15 },
        { text: "16.An-Nahl", totalVerses: 128, value: 16 },
        { text: "17.Al-Isra'", totalVerses: 111, value: 17 },
        { text: "18.Al-Kahf", totalVerses: 110, value: 18 },
        { text: "19.Maryam", totalVerses: 98, value: 19 },
        { text: "20.Ta-Ha", totalVerses: 135, value: 20 },
        { text: "21.Al-Anbiya'", totalVerses: 112, value: 21 },
        { text: "22.Al-Hajj", totalVerses: 78, value: 22 },
        { text: "23.Al-Mu'minoon", totalVerses: 118, value: 23 },
        { text: "24.An-Nur", totalVerses: 64, value: 24 },
        { text: "25.Al-Furqan", totalVerses: 77, value: 25 },
        { text: "26.Ash-Shu'ara", totalVerses: 227, value: 26 },
        { text: "27.An-Naml	", totalVerses: 93, value: 27 },
        { text: "28.Al-Qasas", totalVerses: 88, value: 28 },
        { text: "29.Al-Ankabut", totalVerses: 69, value: 29 },
        { text: "30.Ar-Rum", totalVerses: 60, value: 30 },
        { text: "31.Luqman", totalVerses: 34, value: 31 },
        { text: "32.As-Sajda", totalVerses: 30, value: 32 },
        { text: "33.Al-Ahzab", totalVerses: 73, value: 33 },
        { text: "34.Saba'", totalVerses: 54, value: 34 },
        { text: "35.Fatir", totalVerses: 45, value: 35 },
        { text: "36.Ya Seen", totalVerses: 83, value: 36 },
        { text: "37.As-Saffat", totalVerses: 182, value: 37 },
        { text: "38.Sad", totalVerses: 88, value: 38 },
        { text: "39.Az-Zumar", totalVerses: 75, value: 39 },
        { text: "40.Ghafir", totalVerses: 85, value: 40 },
        { text: "41.Fussilat", totalVerses: 54, value: 41 },
        { text: "42.Ash-Shura", totalVerses: 53, value: 42 },
        { text: "43.Az-Zukhruf", totalVerses: 89, value: 43 },
        { text: "44.Ad-Dukhan", totalVerses: 59, value: 44 },
        { text: "45.Al-Jathiya", totalVerses: 37, value: 45 },
        { text: "46.Al-Ahqaf", totalVerses: 35, value: 46 },
        { text: "47.Muhammad", totalVerses: 38, value: 47 },
        { text: "48.Al-Fath", totalVerses: 29, value: 48 },
        { text: "49.Al-Hujurat", totalVerses: 18, value: 49 },
        { text: "50.Qaf", totalVerses: 45, value: 50 },
        { text: "51.Adh-Dhariyat", totalVerses: 60, value: 51 },
        { text: "52.At-Tur", totalVerses: 49, value: 52 },
        { text: "53.An-Najm", totalVerses: 62, value: 53 },
        { text: "54.Al-Qamar", totalVerses: 55, value: 54 },
        { text: "55.Ar-Rahman", totalVerses: 78, value: 55 },
        { text: "56.Al-Waqi'a", totalVerses: 96, value: 56 },
        { text: "57.Al-Hadid", totalVerses: 29, value: 57 },
        { text: "58.Al-Mujadila", totalVerses: 22, value: 58 },
        { text: "59.Al-Hashr", totalVerses: 24, value: 59 },
        { text: "60.Al-Mumtahina", totalVerses: 13, value: 60 },
        { text: "61.As-Saff", totalVerses: 14, value: 61 },
        { text: "62.Al-Jumu'a", totalVerses: 11, value: 62 },
        { text: "63.Al-Munafiqun", totalVerses: 11, value: 63 },
        { text: "64.At-Taghabun", totalVerses: 18, value: 64 },
        { text: "65.At-Talaq", totalVerses: 12, value: 65 },
        { text: "66.At-Tahrim", totalVerses: 12, value: 66 },
        { text: "67.Al-Mulk", totalVerses: 30, value: 67 },
        { text: "68.Al-Qalam", totalVerses: 52, value: 68 },
        { text: "69.Al-Haqqa", totalVerses: 52, value: 69 },
        { text: "70.Al-Ma'arij", totalVerses: 44, value: 70 },
        { text: "71.Nuh", totalVerses: 28, value: 71 },
        { text: "72.Al-Jinn", totalVerses: 28, value: 72 },
        { text: "73.Al-Muzzammil", totalVerses: 20, value: 73 },
        { text: "74.Al-Muddathir", totalVerses: 56, value: 74 },
        { text: "75.Al-Qiyama", totalVerses: 40, value: 75 },
        { text: "76.Al-Insan", totalVerses: 31, value: 76 },
        { text: "77.Al-Mursalat", totalVerses: 50, value: 77 },
        { text: "78.An-Naba'", totalVerses: 40, value: 78 },
        { text: "79.An-Nazi'at", totalVerses: 46, value: 79 },
        { text: "80.Abasa", totalVerses: 42, value: 80 },
        { text: "81.At-Takwir", totalVerses: 29, value: 81 },
        { text: "82.Al-Infitar", totalVerses: 19, value: 82 },
        { text: "83.Al-Mutaffifeen", totalVerses: 36, value: 83 },
        { text: "84.Al-Inshiqaq", totalVerses: 25, value: 84 },
        { text: "85.Al-Burooj", totalVerses: 22, value: 85 },
        { text: "86.At-Tariq", totalVerses: 17, value: 86 },
        { text: "87.Al-A'la", totalVerses: 19, value: 87 },
        { text: "88.Al-Ghashiya", totalVerses: 26, value: 88 },
        { text: "89.Al-Fajr", totalVerses: 30, value: 89 },
        { text: "90.Al-Balad", totalVerses: 20, value: 90 },
        { text: "91.Ash-Shams", totalVerses: 15, value: 91 },
        { text: "92.Al-Lail", totalVerses: 21, value: 92 },
        { text: "93.Ad-Dhuha", totalVerses: 11, value: 93 },
        { text: "94.Ash-Sharh", totalVerses: 8, value: 94 },
        { text: "95.At-Teen", totalVerses: 8, value: 95 },
        { text: "96.Al-Alaq", totalVerses: 19, value: 96 },
        { text: "97.Al-Qadr", totalVerses: 5, value: 97 },
        { text: "98.Al-Bayyina", totalVerses: 8, value: 98 },
        { text: "99.Az-Zalzala", totalVerses: 8, value: 99 },
        { text: "100.Al-'Adiyat", totalVerses: 11, value: 100 },
        { text: "101.Al-Qari'a", totalVerses: 11, value: 101 },
        { text: "102.At-Takathur", totalVerses: 8, value: 102 },
        { text: "103.Al-'Asr", totalVerses: 3, value: 103 },
        { text: "104.Al-Humaza", totalVerses: 9, value: 104 },
        { text: "105.Al-Feel", totalVerses: 5, value: 105 },
        { text: "106.Quraysh", totalVerses: 4, value: 106 },
        { text: "107.Al-Ma'oon", totalVerses: 7, value: 107 },
        { text: "108.Al-Kawthar", totalVerses: 3, value: 108 },
        { text: "109.Al-Kafiroon", totalVerses: 6, value: 109 },
        { text: "110.An-Nasr", totalVerses: 3, value: 110 },
        { text: "111.Al-Masad", totalVerses: 5, value: 111 },
        { text: "112.Al-Ikhlas", totalVerses: 4, value: 112 },
        { text: "113.Al-Falaq", totalVerses: 5, value: 113 },
        { text: "114.An-Nas", totalVerses: 6, value: 114 }
      ]
    };
  },
  computed: {
    ...mapState(["currentGroup", "targetTasmiq"]),
    selectedSurahStart1: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu1.slice(0, 3));
    },
    selectedNumberAyatStart1: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu1.slice(3, 6));
    },
    selectedSurahEnd1:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu1.slice(6, 9));
    },
    selectedNumberAyatEnd1:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu1.slice(9, 12));
    },
    selectedSurahStart2: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu2.slice(0, 3));
    },
    selectedNumberAyatStart2: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu2.slice(3, 6));
    },
    selectedSurahEnd2:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu2.slice(6, 9));
    },
    selectedNumberAyatEnd2:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu2.slice(9, 12));
    },
    selectedSurahStart3: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu3.slice(0, 3));
    },
    selectedNumberAyatStart3: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu3.slice(3, 6));
    },
    selectedSurahEnd3:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu3.slice(6, 9));
    },
    selectedNumberAyatEnd3:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu3.slice(9, 12));
    },
    selectedSurahStart4: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu4.slice(0, 3));
    },
    selectedNumberAyatStart4: function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu4.slice(3, 6));
    },
    selectedSurahEnd4:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu4.slice(6, 9));
    },
    selectedNumberAyatEnd4:function() {
      return parseInt(this.selectedMonthTasmiq.month[this.selectedMonth].minggu4.slice(9, 12));
    },



    selectedMonthTasmiq: function() {
      if (
        this.targetTasmiq.filter(
          snapshot =>
            snapshot.year ===
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 4)
        )[0]
      ) {
        return this.targetTasmiq.filter(
          snapshot =>
            snapshot.year ===
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 4)
        )[0];
      } else {
        //jika tiada data,tambah data baru ikut tahun ke dalam targettasmiq
        return {
        };
      }
    },
    selectedSurahStartTotalAyat1: function() {
      //code bawah ni utk generate array mengikut nilai yang ditetapkan
      return Array.from(
        new Array(this.verses[this.selectedSurahStart1 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahEndTotalAyat1: function() {
      return Array.from(
        new Array(this.verses[this.selectedSurahEnd1 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahStartTotalAyat2: function() {
      //code bawah ni utk generate array mengikut nilai yang ditetapkan
      return Array.from(
        new Array(this.verses[this.selectedSurahStart2 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahEndTotalAyat2: function() {
      return Array.from(
        new Array(this.verses[this.selectedSurahEnd2 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahStartTotalAyat3: function() {
      //code bawah ni utk generate array mengikut nilai yang ditetapkan
      return Array.from(
        new Array(this.verses[this.selectedSurahStart3 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahEndTotalAyat3: function() {
      return Array.from(
        new Array(this.verses[this.selectedSurahEnd3 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahStartTotalAyat4: function() {
      //code bawah ni utk generate array mengikut nilai yang ditetapkan
      return Array.from(
        new Array(this.verses[this.selectedSurahStart4 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    selectedSurahEndTotalAyat4: function() {
      return Array.from(
        new Array(this.verses[this.selectedSurahEnd4 - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    }
  },

  methods: {
    getMonth(index) {
      return this.monthList[index].bulan;
    },
    changeSelectedMonth(index) {
      this.selectedMonth = index;
    }
  }
};
</script>
