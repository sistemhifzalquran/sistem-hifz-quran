<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <v-layout justify-space-between>
          <h2>{{student.name}}</h2>
          <v-spacer></v-spacer>
          <v-dialog max-width="800">
            <v-btn slot="activator" flat icon color="blue">
              <v-icon>list</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <h2>Senarai Tasmiq lepas Tahun {{selectedYear}}</h2>
                <v-menu>
                  <v-btn flat slot="activator" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>{{getMonth(parseInt(selectedMonth)-1)}}[{{totalDay[parseInt(selectedMonth)-1]}}]</span>
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(totalDayInMonth, index) in totalDay"
                      :key="index"
                      @click="changeSelectedMonth(index)"
                    >
                      <v-list-tile-title>{{getMonth(index)}}[{{totalDayInMonth}}]</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-layout justify-space-between row class="py-0">
                  <v-flex xs5>
                    <v-layout row>
                      <v-flex xs2>HB</v-flex>
                      <v-flex>Ulasan</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs1>Mula</v-flex>
                  <v-flex xs1>Tamat</v-flex>
                  <v-flex xs1>Jumlah</v-flex>
                  <v-flex xs2>
                    <v-layout row>
                      <v-flex xs3>F</v-flex>
                      <v-flex xs3>H</v-flex>
                      <v-flex xs3>T</v-flex>
                      <v-flex xs3>FA</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs2></v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text v-for="item in totalMarkList" :key="item.tarikh" class="py-0">
                <v-layout justify-space-between row class="py-0">
                  <v-flex xs5>
                    <v-layout row>
                      <v-flex xs2>{{item.tarikh}}</v-flex>
                      <v-flex>{{item.ulasan}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs1
                  >{{parseInt(item.tasmiq.slice(0,3))}}.{{parseInt(item.tasmiq.slice(3,6))}}</v-flex>
                  <v-flex
                    xs1
                  >{{parseInt(item.tasmiq.slice(6,9))}}.{{parseInt(item.tasmiq.slice(9,12))}}</v-flex>
                  <v-flex
                    xs1
                  >{{getTotalAyatTasmiq(parseInt(item.tasmiq.slice(0,3)),parseInt(item.tasmiq.slice(6,9)),parseInt(item.tasmiq.slice(3,6)),parseInt(item.tasmiq.slice(9,12)))}}</v-flex>
                  <v-flex xs2>
                    <v-layout row>
                      <v-flex xs3>{{parseInt(item.mark.slice(0,1))}}</v-flex>
                      <v-flex xs3>{{parseInt(item.mark.slice(1,2))}}</v-flex>
                      <v-flex xs3>{{parseInt(item.mark.slice(2,3))}}</v-flex>
                      <v-flex xs3>{{parseInt(item.mark.slice(3,4))}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs2>
                    <v-speed-dial right direction="left">
                      <v-btn
                        slot="activator"
                        round
                        small
                        class="white--text py-0 my-0 caption error"
                      >X</v-btn>
                      <v-btn
                        round
                        small
                        class="white--text pa-0 ma-0 caption error"
                        @click="deleteMark(item.tarikh)"
                      >Ya</v-btn>
                    </v-speed-dial>
                  </v-flex>
                </v-layout>

                <v-divider></v-divider>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-menu>
            <v-text-field solo readonly prepend-icon="date_range" :value="date" slot="activator"></v-text-field>
            <v-date-picker :max="today" v-model="date"></v-date-picker>
          </v-menu>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-form class="text-xs-right">
          <v-layout>
            <v-select
              :disabled="edit"
              :items="verses"
              v-model="selectedSurahStart"
              label="Surah Mula"
            ></v-select>
            <v-select
              :disabled="edit"
              :items="selectedSurahStartTotalAyat"
              v-model="selectedNumberAyatStart"
              label="no ayat Mula"
            ></v-select>
            <v-select
              :disabled="edit"
              :items="versesEnd"
              v-model="selectedSurahEnd"
              label="Surah Akhir"
            ></v-select>
            <v-select
              :disabled="edit"
              :items="selectedSurahEndTotalAyat"
              v-model="selectedNumberAyatEnd"
              label="no Ayat Tamat"
            ></v-select>
          </v-layout>
          Jumlah Ayat : {{totalAyatTasmiq}}
          <v-layout row>
            <h2 class="font-weight-regular pt-1">Fasohah</h2>
            <v-spacer></v-spacer>
            <v-rating :readonly="edit" length="6" hover v-model="fasohah"></v-rating>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <h2 class="font-weight-regular pt-1">Hafazan</h2>
            <v-spacer></v-spacer>
            <v-rating :readonly="edit" length="6" hover v-model="hafazan"></v-rating>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <h2 class="font-weight-regular pt-1">Tajwid</h2>
            <v-spacer></v-spacer>
            <v-rating :readonly="edit" length="6" hover v-model="tajwid"></v-rating>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <h2 class="font-weight-regular pt-1">Fiqh Ayat</h2>
            <v-spacer></v-spacer>
            <v-rating :readonly="edit" length="6" hover v-model="fiqhAyat"></v-rating>
          </v-layout>
          <v-divider></v-divider>
          <v-text-field
            :disabled="edit"
            prepend-icon="note_add"
            label="ulasan"
            v-model="ulasan"
            maxlength="200"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn v-show="edit" @click="edit = false">Ubah</v-btn>
            <h3 class="red--text">{{warningStatus}}</h3>
            <v-btn :disabled="edit" @click="addMark" :loading="loading" class="success">Hantar</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");
export default {
  created() {
    this.getTotalMarkList();
  },
  props: ["student"],
  data() {
    return {
      warningStatus: "",
      loading: false,
      dialog: true,
      edit: false,
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10), //calculation tu untuk bg timezone xlari sebab offset
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
      selectedSurahStart: 1,
      selectedNumberAyatStart: 1,
      selectedSurahEnd: 1,
      selectedNumberAyatEnd: 1,
      totalMarkList: [],
      totalTasmiq: 0,
      fasohah: 0,
      hafazan: 0,
      tajwid: 0,
      fiqhAyat: 0,
      ulasan: "",
      totalDay: [],
      totalAyat: [],
      performingRequest: false,
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
  methods: {
    changeSelectedMonth(month) {
      this.totalMarkList = [];
      function replaceRange(s, start, end, substitute) {
        return s.substring(0, start) + substitute + s.substring(end);
      }
      let x = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
      this.date = replaceRange(this.date, 5, 7, x[month]);
    },
    getMonth(index) {
      let x = [
        "Januari",
        "Febuari",
        "Mac",
        "April",
        "Mei",
        "Jun",
        "Julai",
        "Ogos",
        "September",
        "Oktober",
        "November",
        "Disember"
      ];
      return x[index];
    },
    getTotalAyatTasmiq(surahStart, surahEnd, ayatStart, ayatEnd) {
      if (surahStart == surahEnd) {
        return ayatEnd - ayatStart + 1;
      } else {
        let totalAyatOfAllSurah = 0;
        let x = surahStart;
        while (x < surahEnd) {
          totalAyatOfAllSurah += this.verses[x - 1].totalVerses;
          x++;
        }
        return (
          this.verses[surahStart - 1].totalVerses -
          ayatStart +
          1 +
          ayatEnd +
          totalAyatOfAllSurah -
          this.verses[surahStart - 1].totalVerses
        );
      }
    },
    getTotalMarkList() {
      let dbMarkYear = fb.db
        .collection("users")
        .doc(this.student.key)
        .collection("mark")
        .doc(this.selectedYear);
      dbMarkYear.get().then(doc => {
        if (!doc.exists) {
          console.log("year not exist");
          this.totalMarkList = [];
          this.totalTasmiq = 0;
          this.totalDay = [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
          ];
          this.totalAyat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        } else {
          this.totalDay = doc.data().totalDay;
          this.totalAyat = doc.data().totalAyat;
          dbMarkYear
            .collection("bulan")
            .doc(this.selectedMonth)
            .get()
            .then(snapshot => {
              if (!snapshot.exists) {
                console.log("month not exist");
                this.totalMarkList = [];
                this.totalTasmiq = 0;
              } else {
                if (snapshot.data().mark) {
                  this.totalMarkList = snapshot.data().mark;
                  let c = 0;
                  for (var i = 0; i <= this.totalMarkList.length - 1; i++) {
                    let v = this.totalMarkList[i];
                    let x = this.getTotalAyatTasmiq(
                      parseInt(v.tasmiq.slice(0, 3)),
                      parseInt(v.tasmiq.slice(6, 9)),
                      parseInt(v.tasmiq.slice(3, 6)),
                      parseInt(v.tasmiq.slice(9, 12))
                    );
                    c = c + x;
                  }
                  this.totalTasmiq = c;
                  
                  this.fasohah = parseInt(
                    this.selectedDateMark.mark.slice(0, 1)
                  );
                  this.hafazan = parseInt(
                    this.selectedDateMark.mark.slice(1, 2)
                  );
                  this.tajwid = parseInt(
                    this.selectedDateMark.mark.slice(2, 3)
                  );
                  this.fiqhAyat = parseInt(
                    this.selectedDateMark.mark.slice(3, 4)
                  );
                  this.ulasan = this.selectedDateMark.ulasan;
                  this.selectedSurahStart = parseInt(
                    this.selectedDateMark.tasmiq.slice(0, 3)
                  );
                  this.selectedNumberAyatStart = parseInt(
                    this.selectedDateMark.tasmiq.slice(3, 6)
                  );
                  this.selectedSurahEnd = parseInt(
                    this.selectedDateMark.tasmiq.slice(6, 9)
                  );
                  this.selectedNumberAyatEnd = parseInt(
                    this.selectedDateMark.tasmiq.slice(9, 12)
                  );
                }
              }
            });
        }
      });
    },
    deleteMark(hari) {
      for (var i = 0; i <= this.totalMarkList.length - 1; i++) {
        if (this.totalMarkList[i].tarikh == hari) {
          let x = this.totalMarkList[i];
          let totalTasmiqLama = this.getTotalAyatTasmiq(
            parseInt(x.tasmiq.slice(0, 3)),
            parseInt(x.tasmiq.slice(6, 9)),
            parseInt(x.tasmiq.slice(3, 6)),
            parseInt(x.tasmiq.slice(9, 12))
          );
          this.totalTasmiq = this.totalTasmiq - totalTasmiqLama;
          this.totalMarkList.splice(i, 1);
          this.totalDay[
            parseInt(this.selectedMonth) - 1
          ] = this.totalMarkList.length;
          this.totalAyat[parseInt(this.selectedMonth) - 1] = this.totalTasmiq;
            //y n for ni untuk kira % total markah prestasi
          let y = 0;
          let z = 0;
          for(var u=0;u<=this.TargetTasmiqCurrentYear.length-1; u++){
            
            y = y + this.TargetTasmiqCurrentYear[u];
            z = z +this.totalAyat[u];
          }
          let zy = Math.round((z/y)*100)
        fb.db
          .collection("users")
          .doc(this.student.key)
          .set(
            { mark:zy },
            { merge: true }
          );
          fb.db
            .collection("users")
            .doc(this.student.key)
            .collection("mark")
            .doc(this.selectedYear)
            .set(
              { totalDay: this.totalDay, totalAyat: this.totalAyat },
              { merge: true }
            );
          fb.db
            .collection("users")
            .doc(this.student.key)
            .collection("mark")
            .doc(this.selectedYear)
            .collection("bulan")
            .doc(this.selectedMonth)
            .set(
              { mark: this.totalMarkList, totalTasmiq: this.totalTasmiq },
              { merge: true }
            );
          if (this.date.slice(8, 10) == hari) {
            this.fasohah = 0;
            this.hafazan = 0;
            this.tajwid = 0;
            this.fiqhAyat = 0;
            this.ulasan = "";
            this.selectedSurahStart = 1;
            this.selectedNumberAyatStart = 1;
            this.selectedSurahEnd = 1;
            this.selectedNumberAyatEnd = 1;
            this.edit = true;
          }
        }
      }
    },
    addMark() {
      function kira(value) {
        if (value < 100) {
          if (value < 10) {
            return "00" + value.toString();
          } else {
            return "0" + value.toString();
          }
        } else {
          return value.toString();
        }
      }
      if (
        this.fasohah < 1 ||
        this.hafazan < 1 ||
        this.tajwid < 1 ||
        this.fiqhAyat < 1
      ) {
        this.warningStatus = "pastikan markah di isi lengkap";
      } else {
        this.warningStatus = "";
        this.loading = true;
        let convertTasmiq =
          kira(this.selectedSurahStart) +
          kira(this.selectedNumberAyatStart) +
          kira(this.selectedSurahEnd) +
          kira(this.selectedNumberAyatEnd);
        let convertMark =
          this.fasohah.toString() +
          this.hafazan.toString() +
          this.tajwid.toString() +
          this.fiqhAyat.toString();

        if (
          this.totalMarkList.filter(
            date => date.tarikh === this.date.slice(8, 10)
          )[0]
        ) {
          let x = this.totalMarkList[
            this.totalMarkList.findIndex(
              x => x.tarikh == this.date.slice(8, 10)
            )
          ];
          let totalTasmiqLama = this.getTotalAyatTasmiq(
            parseInt(x.tasmiq.slice(0, 3)),
            parseInt(x.tasmiq.slice(6, 9)),
            parseInt(x.tasmiq.slice(3, 6)),
            parseInt(x.tasmiq.slice(9, 12))
          );
          this.totalTasmiq =
            this.totalTasmiq - totalTasmiqLama + this.totalAyatTasmiq;
          this.totalAyat[parseInt(this.selectedMonth) - 1] = this.totalTasmiq;
          this.totalMarkList[
            this.totalMarkList.findIndex(
              x => x.tarikh == this.date.slice(8, 10)
            )
          ] = {
            tarikh: this.date.slice(8, 10),
            ulasan: this.ulasan,
            mark: convertMark,
            tasmiq: convertTasmiq
          };
        } else {
          this.totalTasmiq = this.totalTasmiq + this.totalAyatTasmiq;
          this.totalMarkList.unshift({
            tarikh: this.date.slice(8, 10),
            ulasan: this.ulasan,
            mark: convertMark,
            tasmiq: convertTasmiq
          });
          this.totalMarkList.sort((a, b) => a.tarikh - b.tarikh);
          this.totalDay[
            parseInt(this.selectedMonth) - 1
          ] = this.totalMarkList.length;
          this.totalAyat[parseInt(this.selectedMonth) - 1] = this.totalTasmiq;
        }
          //y n for ni untuk kira % total markah prestasi
          let y = 0;
          let z = 0;
          for(var ii=0;ii<=this.TargetTasmiqCurrentYear.length-1; ii++){
            
            y = y + this.TargetTasmiqCurrentYear[ii];
            z = z +this.totalAyat[ii];
          }
          let zy = Math.round((z/y)*100)
        fb.db
          .collection("users")
          .doc(this.student.key)
          .set(
            { mark:zy },
            { merge: true }
          );
        fb.db
          .collection("users")
          .doc(this.student.key)
          .collection("mark")
          .doc(this.selectedYear)
          .set(
            { totalDay: this.totalDay, totalAyat: this.totalAyat },
            { merge: true }
          );

        fb.db
          .collection("users")
          .doc(this.student.key)
          .collection("mark")
          .doc(this.selectedYear)
          .collection("bulan")
          .doc(this.selectedMonth)
          .set(
            { mark: this.totalMarkList, totalTasmiq: this.totalTasmiq },
            { merge: true }
          )
          .then(() => {
            this.loading = false;
            this.edit = true;
          });
      }
    }
  },
  watch: {
    watchMonthYear: function() {
      this.getTotalMarkList();
    },
    date: function() {
      this.warningStatus = "";
      this.fasohah = parseInt(this.selectedDateMark.mark.slice(0, 1));
      this.hafazan = parseInt(this.selectedDateMark.mark.slice(1, 2));
      this.tajwid = parseInt(this.selectedDateMark.mark.slice(2, 3));
      this.fiqhAyat = parseInt(this.selectedDateMark.mark.slice(3, 4));
      this.ulasan = this.selectedDateMark.ulasan;
      this.selectedSurahStart = parseInt(
        this.selectedDateMark.tasmiq.slice(0, 3)
      );
      this.selectedNumberAyatStart = parseInt(
        this.selectedDateMark.tasmiq.slice(3, 6)
      );
      this.selectedSurahEnd = parseInt(
        this.selectedDateMark.tasmiq.slice(6, 9)
      );
      this.selectedNumberAyatEnd = parseInt(
        this.selectedDateMark.tasmiq.slice(9, 12)
      );
      if (this.date < this.today) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    }
  },
  computed: {
    ...mapState(["targetTasmiq"]),
     TargetTasmiqCurrentYear: function() {
      function getTotalAyatTasmiq(surahStart, surahEnd, ayatStart, ayatEnd) {
        let verses = [
          7,
          286,
          200,
          176,
          120,
          165,
          206,
          75,
          129,
          109,
          123,
          111,
          43,
          52,
          99,
          128,
          111,
          110,
          98,
          135,
          112,
          78,
          118,
          64,
          77,
          227,
          93,
          88,
          69,
          60,
          34,
          30,
          73,
          54,
          45,
          83,
          182,
          88,
          75,
          85,
          54,
          53,
          89,
          59,
          37,
          35,
          38,
          29,
          18,
          45,
          60,
          49,
          62,
          55,
          78,
          96,
          29,
          22,
          24,
          13,
          14,
          11,
          11,
          18,
          12,
          12,
          30,
          52,
          52,
          44,
          28,
          28,
          20,
          56,
          40,
          31,
          50,
          40,
          46,
          42,
          29,
          19,
          36,
          25,
          22,
          17,
          19,
          26,
          30,
          20,
          15,
          21,
          11,
          8,
          8,
          19,
          5,
          8,
          8,
          11,
          11,
          8,
          3,
          9,
          5,
          4,
          7,
          3,
          6,
          3,
          5,
          4,
          5,
          6
        ];
        if (surahStart == surahEnd) {
          return ayatEnd - ayatStart + 1;
        } else {
          let totalAyatOfAllSurah = 0;
          let x = surahStart;
          while (x < surahEnd) {
            totalAyatOfAllSurah += verses[x - 1];
            x++;
          }
          return (
            verses[surahStart - 1] -
            ayatStart +
            1 +
            ayatEnd +
            totalAyatOfAllSurah -
            verses[surahStart - 1]
          );
        }
      }
      if (
        this.targetTasmiq.filter(
          snapshot =>
            snapshot.year ===
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 4)
        )[0]
      ) {
        let x = [];
        let y = this.targetTasmiq.filter(
          snapshot =>
            snapshot.year ===
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 4)
        )[0];
        let z = y.month;
        let currentMonth = parseInt(
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(5, 7)
        );
        let currentDay = parseInt(
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(8, 10)
        );
        //for dibawah adalah untuk calculate total target tasmiq dan dimasukkan ke dalam array sehingga bulan latest,
        //bulan terakhir tu akan ditapis ikut minggu dan hanya tambah ikut minggu semasa.
        for (var i = 0; i <= currentMonth - 1; i++) {
          let totalAyat1 = 0;
          let totalAyat2 = 0;
          let totalAyat3 = 0;
          let totalAyat4 = 0;
          if (i < currentMonth-1) {
            let surahStart1 = parseInt(z[i].minggu1.slice(0, 3));
            let ayatStart1 = parseInt(z[i].minggu1.slice(3, 6));
            let surahEnd1 = parseInt(z[i].minggu1.slice(6, 9));
            let ayatEnd1 = parseInt(z[i].minggu1.slice(9, 12));
            totalAyat1 = getTotalAyatTasmiq(
              surahStart1,
              surahEnd1,
              ayatStart1,
              ayatEnd1
            );
            let surahStart2 = parseInt(z[i].minggu2.slice(0, 3));
            let ayatStart2 = parseInt(z[i].minggu2.slice(3, 6));
            let surahEnd2 = parseInt(z[i].minggu2.slice(6, 9));
            let ayatEnd2 = parseInt(z[i].minggu2.slice(9, 12));
            totalAyat2 = getTotalAyatTasmiq(
              surahStart2,
              surahEnd2,
              ayatStart2,
              ayatEnd2
            );
            let surahStart3 = parseInt(z[i].minggu3.slice(0, 3));
            let ayatStart3 = parseInt(z[i].minggu3.slice(3, 6));
            let surahEnd3 = parseInt(z[i].minggu3.slice(6, 9));
            let ayatEnd3 = parseInt(z[i].minggu3.slice(9, 12));
            totalAyat3 = getTotalAyatTasmiq(
              surahStart3,
              surahEnd3,
              ayatStart3,
              ayatEnd3
            );
            let surahStart4 = parseInt(z[i].minggu4.slice(0, 3));
            let ayatStart4 = parseInt(z[i].minggu4.slice(3, 6));
            let surahEnd4 = parseInt(z[i].minggu4.slice(6, 9));
            let ayatEnd4 = parseInt(z[i].minggu4.slice(9, 12));
            totalAyat4 = getTotalAyatTasmiq(
              surahStart4,
              surahEnd4,
              ayatStart4,
              ayatEnd4
            );
          } else if ((i = currentMonth - 1)) {
            let surahStart1 = parseInt(z[i].minggu1.slice(0, 3));
            let ayatStart1 = parseInt(z[i].minggu1.slice(3, 6));
            let surahEnd1 = parseInt(z[i].minggu1.slice(6, 9));
            let ayatEnd1 = parseInt(z[i].minggu1.slice(9, 12));
            totalAyat1 = getTotalAyatTasmiq(
              surahStart1,
              surahEnd1,
              ayatStart1,
              ayatEnd1
            );

            if (currentDay > 7) {
              let surahStart2 = parseInt(z[i].minggu2.slice(0, 3));
              let ayatStart2 = parseInt(z[i].minggu2.slice(3, 6));
              let surahEnd2 = parseInt(z[i].minggu2.slice(6, 9));
              let ayatEnd2 = parseInt(z[i].minggu2.slice(9, 12));
              totalAyat2 = getTotalAyatTasmiq(
                surahStart2,
                surahEnd2,
                ayatStart2,
                ayatEnd2
              );
              if (currentDay > 14) {
                let surahStart3 = parseInt(z[i].minggu3.slice(0, 3));
                let ayatStart3 = parseInt(z[i].minggu3.slice(3, 6));
                let surahEnd3 = parseInt(z[i].minggu3.slice(6, 9));
                let ayatEnd3 = parseInt(z[i].minggu3.slice(9, 12));
                totalAyat3 = getTotalAyatTasmiq(
                  surahStart3,
                  surahEnd3,
                  ayatStart3,
                  ayatEnd3
                );
                if (currentDay > 21) {
                  let surahStart4 = parseInt(z[i].minggu4.slice(0, 3));
                  let ayatStart4 = parseInt(z[i].minggu4.slice(3, 6));
                  let surahEnd4 = parseInt(z[i].minggu4.slice(6, 9));
                  let ayatEnd4 = parseInt(z[i].minggu4.slice(9, 12));
                  totalAyat4 = getTotalAyatTasmiq(
                    surahStart4,
                    surahEnd4,
                    ayatStart4,
                    ayatEnd4
                  );
                }
              }
            }
          }
          x[i] = totalAyat1 + totalAyat2 + totalAyat3 + totalAyat4;
        }
        return x;
      } else {
        return [];
      }
    },
    selectedDateMark: function() {
      if (
        this.totalMarkList.filter(
          date => date.tarikh === this.date.slice(8, 10)
        )[0]
      ) {
        return this.totalMarkList.filter(
          date => date.tarikh === this.date.slice(8, 10)
        )[0];
      } else {
        return {
          tasmiq: "001001001001",
          tarikh: this.date.slice(8, 10),
          mark: "0000",
          ulasan: ""
        };
      }
    },
    watchMonthYear: function() {
      return this.date.slice(0, 7);
    },
    selectedYear: function() {
      return this.date.slice(0, 4);
    },
    selectedMonth: function() {
      return this.date.slice(5, 7);
    },
    totalAyatTasmiq: function() {
      return this.getTotalAyatTasmiq(
        this.selectedSurahStart,
        this.selectedSurahEnd,
        this.selectedNumberAyatStart,
        this.selectedNumberAyatEnd
      );
    },
    selectedSurahStartTotalAyat: function() {
      //code bawah ni utk generate array mengikut nilai yang ditetapkan
      return Array.from(
        new Array(this.verses[this.selectedSurahStart - 1].totalVerses),
        (val, index) => ({ text: `${index + 1}`, value: index + 1 })
      );
    },
    versesEnd: function() {
      return this.verses.slice(this.selectedSurahStart - 1, 114);
    },
    selectedSurahEndTotalAyat: function() {
      if (this.selectedSurahStart == this.selectedSurahEnd) {
        return Array.from(
          new Array(
            this.verses[this.selectedSurahStart - 1].totalVerses -
              this.selectedNumberAyatStart +
              1
          ),
          (val, index) => ({
            text: `${index + this.selectedNumberAyatStart}`,
            value: index + this.selectedNumberAyatStart
          })
        );
      } else {
        return Array.from(
          new Array(this.verses[this.selectedSurahEnd - 1].totalVerses),
          (val, index) => ({ text: `${index + 1}`, value: index + 1 })
        );
      }
    }
  }
};
</script>
