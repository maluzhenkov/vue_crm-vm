<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ "Acc_Currency" | localize }}</span>
        <p v-for="cur in currencies" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur.slice(0, 3)) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    currencies: ["RUBRUB", "USDRUB", "EURRUB"]
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill;
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.bill / +this.rates[currency]);
    }
  }
};
</script>
