<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/Empty";
import MainLayout from "@/layouts/Main";

export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";

label {
  user-select: none;
}
</style>
