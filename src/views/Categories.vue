<template>
  <div>
    <div class="page-title">
      <h3>{{ "Categories" | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <div class="col s12 m6">
          <Create @created="addNewCategory" />
        </div>

        <div class="col s12 m6">
          <Edit
            v-if="categories.length"
            :categories="categories"
            @update="updateCategories"
            :key="categories.length + updateCount"
          />
          <p v-else class="center">{{ "NoCatYet" | localize }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Create from "@/components/CategoryCreate";
import Edit from "@/components/CategoryEdit";

export default {
  name: "categories",
  metaInfo() {
    return {
      title: this.$title("Categories")
    };
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    Create,
    Edit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  }
};
</script>
