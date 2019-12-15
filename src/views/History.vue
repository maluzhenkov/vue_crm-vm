<template>
  <div>
    <div class="page-title">
      <h3>{{ "Record_History" | localize }}</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      {{ "NoRecYet" | localize }}.
      <router-link to="/record">{{ "AddFirst" | localize }}</router-link>
    </p>

    <section v-else>
      <Table :records="items" :className="'history'" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChange"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></Paginate>
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import Table from "@/components/HistoryTable";
import { Pie } from "vue-chartjs";

export default {
  name: "history",
  components: {
    Table
  },
  extends: Pie,
  mixins: [paginationMixin],
  metaInfo() {
    return {
      title: this.$title("History")
    };
  },
  data: () => ({
    loading: true,
    records: []
  }),
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map(r => {
          return {
            ...r,
            categoryName: categories.find(c => c.id === r.idCategory).title,
            typeText: r.type,
            typeClass: r.type === "income" ? "green" : "red"
          };
        })
      );

      //Установка графика
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.idCategory === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    if (categories) {
      this.setup(categories);
    }

    this.loading = false;
  }
};
</script>

<style lang="scss">
.pagination {
  user-select: none;
}
</style>
