<template lang="pug">
.sv-layout
  navigationHeader
  nuxt 
  footerTemp
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
    // colorDebug: isDev ? colorDebug : null,
  },
  created() {
    // console.log('layout hook craeatd');
    this.$store.commit("open_menu", false);
  },
};
</script>
