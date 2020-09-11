<template lang="pug">
.container
  Nuxt 
  NavLink
</template>
<script>
import NavLink from "~/components/navlink.vue";

export default {
  name : 'default-page-layout',
  components: { NavLink },
};
</script>