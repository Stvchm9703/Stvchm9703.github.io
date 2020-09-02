<template lang="pug">
.container
  ImageBackground(:src="title_list")
  .index_links
    nuxt-link.linkListBtn(
      v-for="k in link_list",
      prefetch,
      :to="k.path",
      :key="k.display_name"
    ) {{ k.display_name }}
</template>

<script>
// import Logo from '~/components/Logo.vue'
import ImageBackground from "~/components/ImageBackground.vue";
// import ImageBackground from "~/pages/test/carousel.vue";
export default {
  name: "index-page",
  components: { ImageBackground },
  transition: "page",
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
    // image_list : ['trialScene4.png' , 'logo-128x128.png']
    image_list: "trialScene4.png",
    // image_list : 'logo-128x128.png'
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
  async fetch() {
    let y = await this.$axios.get("https://jsonplaceholder.typicode.com/posts");
    this.post = y.data;
    console.log(post);
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$root.$loading.start();
      //  this.$fetch();
      setTimeout(() => this.$root.$loading.finish(), 500);
    });
  },
};
</script>

<style lang="scss" >
.container {
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

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #eee;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #ddd;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.index_links {
  justify-content: space-around;
  align-items: space-around;
  text-align: space-around;
  justify-content: space-around;
  display: flex;

  position: fixed;
  bottom: 0px;
  height: 120px;
  width: 100%;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(9, 19, 121, 0.1) 0%,
    rgba(2, 0, 36, 0.7) 100%
  );
}

.linkListBtn {
  width: 100%;
  font-size: 20pt;
  color: #fff;
  height: 50px;
  min-width: 120px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-family: "Copr";
  text-align: center;

  &:hover {
    color: rgba(2, 0, 36, 1);
    background-color: rgba($color: #fefefe, $alpha: 0.7);
    background: linear-gradient(
      0deg,
      rgba(9, 19, 121, 0.1) 0%,
      rgba($color: #fefefe, $alpha: 0.7) 100%
    );
    // animation: linkListBtn-in 3s;
  }

  // transition: opacity 0.5s;
}

@keyframes linkListBtn-in {
  0% {
    transform: scale(0);
    background: rgb(2, 0, 36);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
    color: rgba(2, 0, 36, 1);
    background-color: rgba($color: #fefefe, $alpha: 0.7);
  }
}

@keyframes linkListBtn-out {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(0);
  }
}
</style>
