<template lang="pug">
.container
  .containerBlock
    ImageBackground(:src="title_list")
  NavLink.is-hidden-touch
  // NavLinkMob.is-hidden-desktop
  // NavLinkMob
</template>

<script>
import ImageBackground from "~/components/ImageBackground.vue";
import NavLink from "~/components/navlink/IndexPage.vue";
import NavLinkMob from "~/components/navlink/IndexMobile.vue";
export default {
  name: "index-page",
  components: { ImageBackground ,NavLink,NavLinkMob},
  transition: "page",
  layout: "default",
  computed: {
    link_list: (self) => {
      return self.$router.options.routes
        .filter((e) => !e.path.includes("/:"))
        .map((e) => {
          return {
            path: e.path,
            display_name: e.name,
          };
        });
    },
  },
  data: () => ({
    // it will change as default-layout image
    title_list: [
      { title: "Blender - test for render !", color: "2,0,36,0.7", image: "trialScene4.png", },
      { title: "Icon image", color: "63,81,181,0.7", image: "03.jpg" },
    ],
    // post: {},
  }),
  methods: {
    async fetchPost() {
      let y = await this.$axios.get(
        "https://raw.githubusercontent.com/Stvchm9703/Stvchm9703.github.io.page/master/page/index.config.json"
      );
      this.title_list = y.data.title_list;
      console.log(y.data.title_list);
    },
  },
  async fetch() {
    await this.fetchPost();
  },
  activated() {},
  mounted() {},
};

</script>

<style lang="scss" >
.containerBlock {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(100, 100, 121, 0.5);
}
body {
  position: relative;
  max-height: 100vh;
}
</style>
