<template>
  <div>
    <div class="page-title">
      <h3>{{ "NewRecord" | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ "NoCatYet" | localize }}.
      <router-link to="/categories">{{
        "AddNewCategory" | localize
      }}</router-link>
    </p>

    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>{{ "SelectCategory" | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ "income" | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ "outcome" | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{ "Amount" | localize }}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >{{ "minValue" | localize }}
          {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">{{ "Description" | localize }}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >{{ "EnterDescr" | localize }}</span
        >
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
  name: "record",
  metaInfo() {
    return {
      title: this.$title("NewRecord")
    };
  },
  data: () => ({
    loading: true,
    select: null,
    category: null,
    categories: [],
    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.$store.getters.info.bill >= this.amount;
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          const categoryData = {
            idCategory: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          };

          await this.$store.dispatch("createRecord", categoryData);

          const bill =
            this.type === "income"
              ? this.$store.getters.info.bill + this.amount
              : this.$store.getters.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });

          this.$message(`Запись успешно создана!`);
          this.$v.reset();
          this.amount = 1;
          this.description = "";
        } catch (error) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount -
            this.$store.getters.info.bill})`
        );
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
