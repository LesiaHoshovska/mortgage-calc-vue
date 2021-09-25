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
        return-object
        label="Select Bank"
      ></v-select>

      <!-- <select v-model="targetBank">
        <option v-for="bank in getBanksList" :key="bank.id" :value="bank._id">
          {{ bank.bankName }}
        </option>
      </select> -->
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
      arr: () => ({
        items: this.getBanksByName,
      }),

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
    ...mapGetters("banks", ["getBanksList", "getBanksByName"]),
  },
  methods: {
    ...mapActions("banks", ["findBankById"]),
    async calculate() {
      if (this.targetBank) {
        const resData = await this.findBankById(this.targetBank);
        this.bankName = resData.bankName;
        this.interestRate = resData.interestRate;
        this.maxLoan = resData.maxLoan;
        this.minDownPayment = resData.minDownPayment;
        this.loanTerm = resData.loanTerm;
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
    this.getBanksList;
  },
};
</script>

<style lang="scss" scoped></style>
