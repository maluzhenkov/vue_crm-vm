<template>
  <div class="mb-1">
    <div class="page-subtitle">
      <h4>{{ "Create" | localize }}</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="title"
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        />
        <label for="name">{{ "Title" | localize }}</label>
        <span
          v-if="$v.title.$dirty && !$v.title.required"
          class="helper-text invalid"
        >{{"EnterName" | localize}}</span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
        />
        <label for="limit">{{ "Limit" | localize }}</label>
        <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid"
        >{{"minValue" | localize}} {{ $v.limit.$params.minValue.min }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Create" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "",
    limit: 100
  }),
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
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit
        });

        this.$emit("created", category);
        this.$message(`Категория "${this.title}" успешно создана!`);
        this.title = "";
        this.limit = 100;
        this.$v.$reset();
      } catch (error) {}
    }
  },
  mounted() {
    M.updateTextFields();
  }
};
</script>
