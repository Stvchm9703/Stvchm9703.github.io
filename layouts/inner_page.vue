<template lang="pug">
div 
  navigationHeader
  nuxt 
  footerTemp
</template>
<script>
import navigationHeader from "~/components/navlink/InnerPage.vue";
import footerTemp from "~/components/common/footer.vue";
export default {
  components: { navigationHeader, footerTemp },
  created(){
    console.log('layout hook craeatd');
    this.$store.commit('open_menu' , false);
  }
};
</script>
