<template lang="pug">
  div 
    navigation
    nuxt 
    footerTemp

</template>
<script>
import navigation from '~/components/navlink/InnerPage.vue';
import footerTemp from '~/components/common/footer.vue';
export default {
  components : { navigation, footerTemp }
}
</script>
