<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ "Message_EnterName" | localize }}</span
        >
      </div>

      <div class="switch">
        <label>
          Русский
          <input type="checkbox" v-model="isEngLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  metaInfo() {
    return {
      title: this.$title("ProfileTitle")
    };
  },
  data: () => ({
    name: "",
    isEngLocale: false
  }),
  validations: {
    name: { required }
  },
  computed: {
    info() {
      return this.$store.getters.info;
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch("updateInfo", {
          name: this.name,
          locale: this.isEngLocale ? "en-US" : "ru-RU"
        });

        this.$message(`Профиль обновлен!`);
      } catch (error) {}
    }
  },
  mounted() {
    this.name = this.info.name;
    this.isEngLocale = this.info.locale === "en-US" ? true : false;
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  }
};
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
