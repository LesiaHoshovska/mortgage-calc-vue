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
        min
        >0 ></v-text-field
      >

      <v-text-field
        label=" Bank"
        type="text"
        v-model="targetBank"
      ></v-text-field>
    </div>

    <div>
      <v-btn rounded color="primary" dark @click="calculate()">
        CALCULATE
      </v-btn>
    </div>

    <div v-if="result">
      result -
      {{ result }}
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MortgageCalc",
  data() {
    return {
      items: [],
      initLoan: null,
      downPayment: null,
      targetBank: null,
      bankName: null,
      interestRate: null,
      maxLoan: null,
      minDownPayment: null,
      loanTerm: null,
      result: null,
      //
      error: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBanksList", "getBankByName"]),
  },
  watch: {
    targetBank(newValue) {
      if (newValue)
        this.loadBanks({
          filter_property: "bankName",
          filter_value: newValue,
        });
      console.log(this.targetBank);
    },
  },
  methods: {
    ...mapActions("banks", ["loadBanks"]),

    calculate() {
      const bank = this.getBankByName(this.targetBank);
      console.log(bank);

      this.bankName = bank.bankName;
      this.interestRate = parseInt(bank.interestRate);
      this.maxLoan = parseInt(bank.maxLoan);
      this.minDownPayment = parseInt(bank.minDownPayment);
      this.loanTerm = parseInt(bank.loanTerm);

      if (this.initLoan && this.downPayment) {
        if (
          this.initialLoan < this.maxLoan &&
          this.downPayment > this.minDownPayment
        ) {
          let rate = this.interestRate / 100 / 12;
          this.result = (
            (this.initialLoan * rate * Math.pow(1 + rate, this.loanTerm)) /
            (Math.pow(1 + rate, this.loanTerm) - 1)
          ).toFixed(2);
          console.log(this.result);
          return this.result;
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
