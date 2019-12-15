<template>
  <div>
    <div class="page-title">
      <h3>{{ "Planning" | localize }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ "NoCatYet" | localize }}.
      <router-link to="/categories">{{
        "AddNewCategory" | localize
      }}</router-link>
    </p>

    <section v-else>
      <div v-for="c in categories" :key="c.id" v-tooltip="c.tooltip">
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spend | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
import currencyFilter from "@/filters/currency.filter";

export default {
  name: "planning",
  metaInfo() {
    return {
      title: this.$title("Planning")
    };
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    info() {
      return this.$store.getters.info;
    }
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(c => {
      const spend = records
        .filter(r => r.idCategory === c.id)
        .filter(r => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / c.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = c.limit - spend;
      const tooltip = `${
        tooltipValue < 0
          ? localizeFilter("ExcessOn") + " "
          : localizeFilter("Left") + " "
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...c,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>
