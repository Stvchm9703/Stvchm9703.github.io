<template lang="pug">
div
  ImageBackground.container(src="trialScene4.png")
    transition
      h1.title Hey Steven
      h2.subtitle Steven / AO Develop Logging
  .index_links
    nuxt-link.linkListBtn(
      v-for="k in link_list",
      :to="k.path",
      :key="k.display_name"
    ) {{ k.display_name }}
</template>

<script scope>
// import Logo from '~/components/Logo.vue'
import ImageBackground from "~/components/ImageBackground.vue";
export default {
  components: {
    ImageBackground,
  },
  transition: "page",
  data: () => ({
    link_list: [
      {
        display_name: "Home Page",
        path: "/home",
      },
      {
        display_name: "Technique Blog",
        path: "/tech_log",
      },
      {
        display_name: "Topic",
        path: "/topic",
      },
      {
        display_name: "Git Repo",
        path: "/repo",
      },
      {
        display_name: "about me",
        path: "/about_me",
      },
    ],
  }),
};
</script>

<style lang="scss" scope >
.container {
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
