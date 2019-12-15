<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer" @click="$emit('click')">{{ link.name }}</a>
    </router-link>
    <div class="sidenav-footer show-on-small">
      <li @click="$emit('click')">
        <router-link to="/profile" class="black-text">
          <i class="material-icons">account_circle</i>
          {{ "ProfileTitle" | localize }}
        </router-link>
      </li>
      <li @click="$emit('click')">
        <a href="#" class="black-text" @click.prevent="logout">
          <i class="material-icons">assignment_return</i>
          {{ "Logout" | localize }}
        </a>
      </li>
    </div>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  props: ["value"],
  data: () => ({
    links: [
      { name: localizeFilter("Account"), url: "/", exact: true },
      { name: localizeFilter("History"), url: "/history" },
      { name: localizeFilter("Planning"), url: "/planning" },
      { name: localizeFilter("NewRecord"), url: "/record" },
      { name: localizeFilter("Categories"), url: "/categories" }
      // { name: localizeFilter("Kanban"), url: "/kanban" }
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    }
  }
};
</script>
