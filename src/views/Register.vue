<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.email.$dirty && !$v.email.required }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Введите ваше Имя</small
        >
      </div>
      <div class="input-field">
        <input
          id="email"
          type="email"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Поле Email не должно быть пустым</small
        >
        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Введите корректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Пароль должен быть {{ $v.password.$params.minLength.min }} символов.
          Сейчас он {{ password.length }}</small
        >
      </div>
      <div>
        <div>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>С <a href="#">правилами</a> согласен</span>
          </label>
        </div>
        <small
          v-if="$v.agree.$dirty && !$v.agree.checked"
          class="helper-text invalid"
          >Необходимо согласие на обработку данных</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  metaInfo() {
    return {
      title: this.$title("Register")
    };
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(2) },
    agree: { checked: v => v }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (error) {}
    }
  }
};
</script>
