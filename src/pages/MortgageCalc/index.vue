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

    <div>{{}}</div>
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
      mortgage: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBanksList"]),
  },
  watch: {
    targetBank(newValue) {
      if (newValue)
        this.loadBanks({
          filter_property: "bankName",
          filter_value: newValue,
        });
    },
  },
  methods: {
    ...mapActions("banks", ["loadBanks"]),

    calculate() {
      const loan = this.initLoan - this.downPayment;
      console.log(loan);
      const loanterm = parseInt(this.targetBank.loanTerm);
      console.log(loanterm);
      const interestrate = parseInt(this.targetBank.interestRate);
      this.mortgage =
        (loan *
          (interestrate / 12) *
          Math.pow(1 + interestrate / 12, loanterm)) /
        (Math.pow(1 + interestrate / 12, loanterm) - 1);
      console.log(this.mortgage);
      console.log(loanterm);
    },
  },
};
</script>

<style lang="scss" scoped></style>
