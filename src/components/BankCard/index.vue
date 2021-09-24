<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>{{ bankName }}</v-card-title>
      <v-card-subtitle class="pb-0">
        Interest Rate: {{ interestRate }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Maximum Loan: {{ maxLoan }}</div>
        <div>Minimum Down Payment: {{ minDownPayment }}</div>
        <div>Loan Term: {{ loanTerm }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text @click="onEdit(bank._id)"> Edit </v-btn>

        <v-btn color="orange" text @click="onDelete(bank._id)"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BankCard",
  props: {
    bankId: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    maxLoan: {
      type: Number,
      required: true,
    },
    minDownPayment: {
      type: Number,
      required: true,
    },
    loanTerm: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions("banks", ["deleteBank"]),
    onDelete(id) {
      this.deleteBank(id);
    },
    onEdit(id) {
      this.$router.push({ name: "edit", params: { id } });
    },
  },
};
</script>

<style lang="css" scoped></style>
