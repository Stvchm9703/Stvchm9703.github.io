<template lang="pug">
.container
  .containerBlock
    ImageBackground(v-if="!in_loading", :src="title_list")
  NavLink.is-hidden-touch
  NavLinkMob.is-hidden-desktop
</template>

<script>
import ImageBackground from "~/components/ImageBackground.vue";
import NavLink from "~/components/navlink/IndexPage.vue";
import NavLinkMob from "~/components/navlink/IndexMobile.vue";
export default {
  name: "index-page",
  components: { ImageBackground, NavLink, NavLinkMob },

  transition: "page",
  layout: "default",
  computed: {
    link_list: (self) => {
      return self.$router.options.routes
        .filter((e) => !e.path.includes("/:") && !e.path.includes("404") )
        .map((e) => {
          return {
            path: e.path,
            display_name: e.name,
          };
        });
    },
  },
  head: (self) => ({
    title: `Steven Chm - Github Page and Tech-Blog`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Steven Chm home page", },
      { hid: "og:title", property: "og:title", content: "Steven Chm - Github Page", },
      { hid: "og:description", property: "og:description", content: "Steven Chm - Github Page and Tech-Blog", },
      { hid: "og:url", property: "og:url", content: "https://stvchm9703.github.io/", },
      { hid: "og:image", property: "og:image", content: "https://avatars2.githubusercontent.com/u/15327054?s=400&u=167a64d9000e6ea245b6807fb4a7a1dab537d35a&v=4", },
      { hid: "og:type", property: "og:type", content: "website" },
    ],
  }),
  data: () => ({
    // it will change as default-layout image
    in_loading: true,
    title_list: [
      {
        title: "Blender v2.8",
        subtitle: "test for render !",
        color: "2,0,36,0.7",
        image: "/images/trialScene4.png",
      },
      {
        title: "Icon image",
        subtitle: "Icon image",
        color: "2,0,36,0.7",
        image: "/images/03.jpg",
      },
    ],
    // post: {},
  }),
  methods: {
    async fetchPost() {
      let url = "/page_io/page/index.config.json";
      let y = await this.$axios.get(url);
      this.title_list = y.data.title_list;
      // console.log(y.data.title_list);
    },
  },
  async created() {
    try {
      await this.fetchPost();
      this.in_loading = false;
    } catch (e) {}
  },
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
  // background: rgba(100, 100, 121, 0.5);
}
body {
  position: relative;
  max-height: 100vh;
}
</style>
