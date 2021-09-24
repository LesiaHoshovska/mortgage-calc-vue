<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="hasError">{{ errMsg }}</div>
    <div><h1>Add bank</h1></div>
    <div>
      <v-text-field
        label="Bank name:"
        type="text"
        :rules="rules"
        v-model="bankName"
      ></v-text-field>
      <v-text-field
        label="Interest Rate:"
        type="number"
        :rules="rules1"
        v-model.number="interestRate"
        min
        >0 ></v-text-field
      >
      <v-text-field
        label=" Maximum Loan:"
        type="number"
        :rules="rules1"
        v-model.number="maxLoan"
        min
        >0></v-text-field
      >
      <v-text-field
        label=" Minimum Down Payment:"
        type="number"
        v-model.number="minDownPayment"
        :rules="rules1"
      ></v-text-field>
      <v-text-field
        label="Loan Term:"
        type="number"
        v-model.number="loanTerm"
        :rules="rules1"
      ></v-text-field>

      <div>
        <v-btn
          rounded
          color="primary"
          dark
          @click="onSave"
          :disabled="!isDataValid"
        >
          {{ btnTitle }}
        </v-btn>
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Edit",
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      rules1: [(value) => value >= 1 || "Must be under 0"],
      bankName: null,
      interestRate: null,
      maxLoan: null,
      minDownPayment: null,
      loanTerm: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.bankName &&
        this.interestRate > 0 &&
        this.maxLoan > 0 &&
        this.minDownPayment > 0 &&
        this.loanTerm > 0
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    btnTitle() {
      return this.isEditing ? "Save" : "Create";
    },
    errMsg() {
      if (Array.isArray(this.hasError))
        return this.hasError.map((item) => item.msg);
      else return "Error";
    },
  },
  methods: {
    ...mapActions("banks", ["createBank", "getBankById", "updateBank"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isediting) {
          await this.updateBank({
            bankName: this.bankName,
            interestRate: this.interestRate,
            maxLoan: this.maxLoan,
            minDownPayment: this.minDownPayment,
            loanTerm: this.loanTerm,
          });
        } else {
          await this.createBank({
            bankName: this.bankName,
            interestRate: this.interestRate,
            maxLoan: this.maxLoan,
            minDownPayment: this.minDownPayment,
            loanTerm: this.loanTerm,
          });
        }
        this.$router.push({ name: "home" });
      } catch {
        this.errorMessage = "Saving error!";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getBankById(this.$route.params.id);
        this.bankName = editedObj.bankName;
        this.interestRate = editedObj.interestRate;
        this.maxLoan = editedObj.maxLoan;
        this.minDownPayment = editedObj.minDownPayment;
        this.loanTerm = editedObj.loanTerm;
      } catch {
        this.errorMessage = "fetching edited obj!";
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
