<template>
  <div>
    <div class="header">
      <h1>Our Banks</h1>

      <div v-if="isLoading">Loading...</div>
      <div v-if="hasError">Error!!!</div>
      <div v-if="!isLoading && !hasError" class="content">
        <div>
          <label>
            Search bank:
            <input type="text" v-model.lazy="searchBank" />
          </label>
        </div>
        <div class="banksContainer">
          <BankCard
            v-for="bank in getBanksList"
            :key="bank._id"
            :bankId="bank._id"
            :bankName="bank.bankName"
            :interestRate="bank.interestRate"
            :maxLoan="bank.maxLoan"
            :minDownPayment="bank.minDownPayment"
            :loanTerm="bank.loanTerm"
            class="bankCard"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BankCard from "../../components/BankCard/index.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    BankCard,
  },
  data() {
    return {
      searchBank: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBanksList", "isLoading", "hasError"]),
  },
  watch: {
    searchBank(newValue) {
      if (newValue)
        this.loadBanks({
          filter_property: "bankName",
          filter_value: newValue,
        });
      else this.loadBanks();
    },
  },
  methods: {
    ...mapActions("banks", ["loadBanks"]),
  },
  mounted() {
    this.loadBanks();
  },
};
</script>

<style>
.banksContainer {
  display: flex;
  flex-wrap: wrap;
  justify-self: center;
  justify-content: center;
}
.bankCard {
  padding: 10px;
}
.header {
  text-align: center;
}
</style>
