<template>
  <div class="mb-1">
    <div class="page-subtitle">
      <h4>{{ "Edit" | localize }}</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{
            c.title
            }}
          </option>
        </select>
        <label>{{ "SelectCategory" | localize }}</label>
      </div>

      <div class="input-field">
        <input
          id="title"
          type="text"
          v-model="title"
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        />
        <label for="title">{{ "Title" | localize }}</label>
        <span
          v-if="$v.title.$dirty && !$v.title.required"
          class="helper-text invalid"
        >{{"EnterName" | localize}}</span>
      </div>

      <div class="input-field">
        <input
          id="limit2"
          type="number"
          v-model.number="limit"
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
        />
        <label for="limit2">{{ "Limit" | localize }}</label>
        <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid"
        >{{"minValue" | localize}} {{ $v.limit.$params.minValue.min }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: "",
    limit: 100,
    select: null,
    current: null
  }),
  watch: {
    current(categoryId) {
      const { title, limit } = this.categories.find(c => c.id === categoryId);
      this.title = title;
      this.limit = limit;
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$emit("update", categoryData);
        this.$message(`Категория успешно обновлена!`);
      } catch (error) {}
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
