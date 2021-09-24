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

      <v-select :items="getBanksList" label="Choose the bank"></v-select>
    </div>

    <div>
      <v-btn rounded color="primary" dark @click="calculate">
        CALCULATE
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MortgageCalc",
  data() {
    return {
      initLoan: null,
      downPayment: null,
      bank: null,
      mortgage: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBanksList"]),
  },
  methods: {
    calculate() {
      return (this.mortgage =
        (this.p *
          (this.bank.interestRate / 12) *
          Math.pow(1 + this.bank.interestRate / 12, this.bank.loanTerm)) /
        (Math.pow(1 + this.bank.interestRate / 12, this.bank.loanTerm) - 1));
    },
  },
};
</script>

<style lang="scss" scoped></style>
