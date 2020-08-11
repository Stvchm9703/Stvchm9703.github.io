<template lang="pug">
div 
  .icon(@click="tabToggle")
  .linkList
    nuxt-link.linkListItem(
      v-for="k in linkList",
      :to="k.path",
      :key="k.display_name"
    ) {{ k.display_name }}
</template>
<script>
import Vue from "vue";
export default {
  props: {
    linkList: { type: Array },
  },
  data: (self) => ({
    menu_is_open: false,
    menu_pointer: null,
  }),
  methods: {
    tabOpen() {
      
    },
    tabClose() {},
    tabToggle(e) {
      console.log("i m toggle");
      console.log(e);
      if (this.menu_is_open) 
        this.tabClose();
      else 
        this.tabOpen();
      this.menu_is_open = !this.menu_is_open;
    },
  },
  beforeMount() {
    window.addEventListener("keypress", this.tabToggle);
  },
  beforeDistroy() {
    window.removeEventListener("keypress", this.tabToggle);
  },
};
</script>

<style lang="sass" scoped>
</style>