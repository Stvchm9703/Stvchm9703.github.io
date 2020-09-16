<template lang="pug">
div.container
  .containerBlock
    ImageBackground(:src="title_list")
  NavLink.is-hidden-touch
  // NavLinkMob.is-hidden-desktop
  // NavLinkMob
</template>

<script>
import ImageBackground from "~/components/ImageBackground.vue";
import NavLink from "~/components/navlink.vue";
import NavLinkMob from "~/components/navlink_mobile.vue";
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
    image_list: "trialScene4.png",
    title_list: [
      {
        title: "Blender - test for render !",
        color: "2,0,36,0.7",
        image: "trialScene4.png",
      },
      { title: "Icon image", color: "63,81,181,0.7", image: "03.jpg" },
    ],
    post: {},
  }),
  methods: {
    async fetchPost() {
      let y = await this.$axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(y.data);
      this.post = y.data;
    },
  },
  async fetch() {},
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
