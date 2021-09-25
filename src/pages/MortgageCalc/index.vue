<template>
  <div>
    <div>
      <h1>Calculate you mortgage</h1>
    </div>

    <div>
      <v-text-field
        label="Initial loan:"
        type="number"
        v-model.number="initLoan"
      ></v-text-field>
      <v-text-field
        label="Down payment :"
        type="number"
        v-model.number="downPayment"
      ></v-text-field>

      <v-select
        :items="getBanksList"
        v-model="targetBank"
        label="Select Bank"
        dense
      ></v-select>
    </div>

    <div>
      <v-btn rounded color="primary" dark @click="calculate()">
        CALCULATE
      </v-btn>
    </div>
    <v-text-field v-model="result" label="You must pay"></v-text-field>
    <!-- <div v-if="result">
      result -
      {{ result }}
    </div>
    <div v-if="error">{{ error }}</div>
  </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MortgageCalc",
  data() {
    return {
      initLoan: null,
      downPayment: null,
      targetBank: null,
      bankName: null,
      interestRate: null,
      maxLoan: null,
      minDownPayment: null,
      loanTerm: null,
      result: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBanksList"]),
  },
  methods: {
    ...mapActions("banks", ["getBankById", "loadBanks"]),
    async calculate() {
      if (this.targetBank) {
        const resData = await this.getBankById(this.targetBank._id);
        this.bankName = resData.bankName;
        this.interestRate = parseFloat(resData.interestRate);
        this.maxLoan = parseFloat(resData.maxLoan);
        this.minDownPayment = parseFloat(resData.minDownPayment);
        this.loanTerm = parseFloat(resData.loanTerm);
      }
      if (this.initLoan && this.downPayment) {
        if (
          this.initLoan < this.maxLoan &&
          this.downPayment > this.minDownPayment
        ) {
          let rate = this.interestRate / 100 / 12;
          this.result = (
            (this.initLoan * rate * Math.pow(1 + rate, this.loanTerm)) /
            (Math.pow(1 + rate, this.loanTerm) - 1)
          ).toFixed(2);
        }
      } else {
        this.error = "Please enter values";
      }
    },
  },

  mounted() {
    this.loadBanks();
  },
};
</script>

<style lang="scss" scoped></style>
