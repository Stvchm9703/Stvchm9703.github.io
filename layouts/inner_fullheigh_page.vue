<template lang="pug">
.sv-layout.sv-full-height-layout
  navigationHeader
  nuxt 
  footerTemp.short-footer
  // colorDebug
</template>
<script>
import navigationHeader from "~/components/navlink/IndexMobile.vue";
import footerTemp from "~/components/common/footer.vue";
// import colorDebug from "~/components/test/colorBlock.vue";
export default {
  components: {
    navigationHeader,
    footerTemp,
    // colorDebug: process.env.NODE_ENV === "development" ? colorDebug : null,
  },
  created() {
    // console.log('layout hook craeatd');
    this.$store.commit("open_menu", false);
  },
};
</script>
