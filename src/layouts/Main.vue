<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" @click="isOpen = !isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          data-position="left"
          v-tooltip="'Create_New_Record'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
import messages from "@/utils/messages";
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: "main-layout",
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так!");
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  }
};
</script>
