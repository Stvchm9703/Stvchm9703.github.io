<template lang="pug">
.sv-layout
  navigationHeader
  nuxt 
  footerTemp
</template>
<script>
import navigationHeader from "~/components/navlink/IndexMobile.vue";
import footerTemp from "~/components/common/footer.vue";
// import colorDebug from "~/components/test/colorBlock.vue";
export default {
  data: () => ({
    inLoading: false,
  }),
  watch: {
    inLoading(d) {
      if (d) this.$root.$loading.start();
      else this.$root.$loading.finish();
    },
  },
  components: {
    navigationHeader,
    footerTemp,
    // colorDebug: process.env.NODE_ENV === "development" ? colorDebug : null,
  },
  created() {
    this.$store.commit("open_menu", false);
  },

};
</script>
