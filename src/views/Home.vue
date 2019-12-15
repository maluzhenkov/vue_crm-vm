<template>
  <div>
    <div class="page-title">
      <h3>{{ "Account" | localize }}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        data-position="left"
        v-tooltip="'Refresh'"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <Bill :rates="currency.rates" />

      <Currency :rates="currency.rates" :date="new Date(currency.date)" />
    </div>
  </div>
</template>

<script>
import Bill from "@/components/HomeBill.vue";
import Currency from "@/components/HomeCurrency.vue";

export default {
  name: "home",
  components: {
    Bill,
    Currency
  },
  metaInfo() {
    return {
      title: this.$title("Account")
    };
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  }
};
</script>
