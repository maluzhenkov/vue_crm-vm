<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          "History" | localize
        }}</router-link>
        <a class="breadcrumb" @click.prevent>{{ record.type | localize }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>{{ "Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Amount" | localize }}: {{ record.amount | currency }}</p>
              <p>{{ "Category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ new Date(record.date) | date("date-time") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="center">
      Запись с id=
      <strong>{{ $route.params.id }}</strong> не найдена
    </p>
  </div>
</template>

<script>
export default {
  name: "detail",
  metaInfo() {
    return {
      title: this.$title("History")
    };
  },
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.idCategory
    );

    this.record = {
      ...record,
      categoryName: category.title
    };
    this.loading = false;
  }
};
</script>
