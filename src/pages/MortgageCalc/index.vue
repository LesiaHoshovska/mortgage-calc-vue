<template>
  <div>
    <div>
      <h1>Calculate you mortgage</h1>
    </div>

    <div>
      <v-text-field
        label="Initial loan:"
        type="number"
        :rules="rules"
        v-model.number="initLoan"
      ></v-text-field>
      <v-text-field
        label="Down payment :"
        type="number"
        :rules="rules"
        v-model.number="downPayment"
      ></v-text-field>

      <v-select
        v-model="targetBank"
        :items="getBanksList"
        item-text="bankName"
        item-value="_id"
        label="Select Bank"
        persistent-hint
        return-object
        single-line
      ></v-select>
    </div>

    <div>
      <v-btn rounded color="primary" dark @click="calculate()">
        CALCULATE
      </v-btn>
    </div>
    <v-text-field v-model="result" label="You must pay"></v-text-field>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MortgageCalc",
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value >= 0) || "Must be under 0",
      ],
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
    // getBanksByName() {
    //   return this.getBanksList.map((item) => item.bankName);
    // },
    async calculate() {
      const resData = await this.getBankById(this.targetBank._id);
      this.bankName = resData.bankName;
      this.interestRate = parseFloat(resData.interestRate);
      this.maxLoan = parseFloat(resData.maxLoan);
      this.minDownPayment = parseFloat(resData.minDownPayment);
      this.loanTerm = parseFloat(resData.loanTerm);
      let rate = this.interestRate / 100 / 12;
      console.log(rate);

      if (
        this.initLoan <= this.maxLoan &&
        this.downPayment >= this.minDownPayment
      )
        this.result = (
          (this.initLoan * rate * Math.pow(1 + rate, this.loanTerm)) /
          (Math.pow(1 + rate, this.loanTerm) - 1)
        ).toFixed(2);
      else this.result = "Enter valid data";

      console.log(this.result);
    },
  },

  mounted() {
    this.loadBanks();
  },
};
</script>

<style lang="scss" scoped></style>
