<template lang="pug">
Nuxt 
</template>
<script>
export default {
  created(){
    // console.log('layout hook craeatd');
    this.$store.commit('open_menu' , false);
  }
};
</script>
