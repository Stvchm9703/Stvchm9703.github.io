<template lang="pug">
.hero.aboutBlockMod.background_layer.has-border-line.is-turquoise(
  index="4",
  container_class="is-fluid"
)
  div(ref="projectTileAnchor")
  .hero-body
    .container.project-tile-cont
      h1.title.is-size-1-desktop.is-size-3-touch.has-text-centered.
        Project / Work 
      div(ref="listTileBlock", v-if="listTileBlockOpen")
        .tile.is-ancestor
          .tile.is-parent(
            v-for="(project, index) in star_project.slice(0, 3)",
            :key="index"
          )
            transition(name="slide-fade")
              article.tile.is-child.box.has-info-background(
                :class="`tile-ani-delay-${index}`",
                v-if="listTileCollapseIsOpen",
                @click="openProjectInfo(index)"
              )
                p.is-size-3-desktop.is-size-5-touch {{ project.title }}
                p.is-size-5-desktop.is-size-6-touch {{ project.description }}
                .content
                  .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}
        .tile.is-ancestor(v-if="star_project.length > 3")
          .tile.is-vertical.is-9
            .tile.is-parent(
              v-for="(project, index) in star_project.slice(3, 5)"
            )
              transition(name="slide-fade")
                article.tile.is-child.box(
                  :key="index + 3",
                  :class="`tile-ani-delay-${index + 3}`",
                  v-if="listTileCollapseIsOpen",
                  @click="openProjectInfo(index + 3)"
                ) 
                  p.is-size-3-desktop.is-size-5-touch {{ project.title }}
                  p.is-size-5-desktop.is-size-6-touch {{ project.description }}
                  .content
                    .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}

            .tile.is-ancestor.is-parent
              .tile.is-parent(
                v-for="(project, index) in star_project.slice(5, 7)",
                :key="index + 5"
              )
                transition(name="slide-fade")
                  article.tile.is-child.box(
                    :class="`tile-ani-delay-${index + 5}`",
                    v-if="listTileCollapseIsOpen",
                    @click="openProjectInfo(index + 5)"
                  )
                    p.is-size-3-desktop.is-size-5-touch {{ project.title }}
                    p.is-size-5-desktop.is-size-6-touch {{ project.description }}
                    .content
                      .tag(
                        :class="project.self_own ? 'is-info' : 'is-warning'"
                      ) {{ project.self_own ? 'Personal' : 'Properties' }}

          .tile.is-parent(
            v-for="(project, index) in star_project.slice(7, 8)",
            :key="index + 7"
          )
            transition(name="slide-fade")
              article.tile.is-child.box(
                :class="`tile-ani-delay-${index + 7}`",
                v-if="listTileCollapseIsOpen",
                @click="openProjectInfo(index + 7)"
              )
                p.is-size-3-desktop.is-size-5-touch {{ project.title }}
                p.is-size-5-desktop.is-size-6-touch {{ project.description }}
                .content
                  .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}
      transition(name="slide-fade")
        .box.has-background-info-force(v-if="!listTileBlockOpen")
          .columns
            .column.is-2
              button.button.has-text-white-force(@click="backToProjectList()") 
                ArrowLeftIcon.is-size-2-desktop.is-size-4-touch
            .column
              span.has-text-white-force.is-size-2-desktop.is-size-4-touch.
                {{in_read_project.title}}
            .column.is-2.is-align-right
              button.button.has-text-white-force(@click="backToProjectList()") 
                ArrowLeftIcon.is-size-2-desktop.is-size-4-touch
          .tile.box.is-ancestor
            .tile.is-child
              span {{ in_read_project.description }}
            .tile.is-parent
              .tile.is-child
                span {{ in_read_project.tag }}
              .tile.is-child
                span {{ in_read_project.tag }}
</template>

<script>
import ArrowLeftIcon from "mdi-vue/ArrowLeft.vue";
export default {
  name: "project-title",
  components: {
    ArrowLeftIcon,
  },
  data: () => ({
    star_project: [
      {
        title: "MongoDB Application for Student Admin Management App",
        description:
          "School Project, a web application that using MongoDB as database to manage data",
        tag: [
          {
            key: "Golang",
            desp: "Front-end Backend/API Server, with Gin framework",
          },
          {
            key: "NuxtJs",
            desp: "Front-end SPA/prebuild web application framework",
          },
          {
            key: "MongoDB",
            desp: "Backend Database storage server",
          },
        ],
        project_info: {
          id: 199086045,
          node_id: "MDEwOlJlcG9zaXRvcnkxOTkwODYwNDU=",
          name: "ADS-web-api-server",
          full_name: "Stvchm9703/ADS-web-api-server",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/ADS-web-api-server",
          description: "backend support api server",
          created_at: "2019-07-26T22:13:18Z",
          updated_at: "2020-06-16T05:28:16Z",
          pushed_at: "2020-09-12T07:10:26Z",
          git_url: "git://github.com/Stvchm9703/ADS-web-api-server.git",
          ssh_url: "git@github.com:Stvchm9703/ADS-web-api-server.git",
          clone_url: "https://github.com/Stvchm9703/ADS-web-api-server.git",
          svn_url: "https://github.com/Stvchm9703/ADS-web-api-server",

          language: "Go",

          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 5,
          watchers: 0,
          default_branch: "v2",
        },
        self_own: true,
        image_list: [],
      },
      {
        title: "TikTicToe - the Unity App and Service worker",
        description:
          "School Project, a Unity Application that using NATS and ProtoBuffer to build online game system",
        tag: [
          {
            key: "Golang",
            desp: "Backend Server to manage the game room",
          },
          {
            key: "NATS",
            desp:
              "Message queueing server, to pass message to server-side service worker",
          },
          {
            key: "Unity Engine",
            desp: "Frontend Application for player play the game",
          },
          {
            key: "Redis",
            desp: "For backend server's data sharing and temporary storage",
          },
        ],
        project_info: {
          id: 216969222,
          node_id: "MDEwOlJlcG9zaXRvcnkyMTY5NjkyMjI=",
          name: "IDCT",
          full_name: "Stvchm9703/IDCT",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/IDCT",
          description: "the IDCT whole project summary, setting ",

          created_at: "2019-10-23T04:40:00Z",
          updated_at: "2020-05-25T08:38:06Z",
          pushed_at: "2020-04-03T04:49:32Z",
          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 0,
          watchers: 0,
          default_branch: "master",
        },
        self_own: true,
        image_list: [],
      },
      {
        title: "UNO Web UI, for displaying data",
        description:
          "Company Project, a Single Page Application that using Vue and Flask to view online data",
        tag: [
          {
            key: "Python",
            desp: "Backend API Server for providing data",
          },
          {
            key: "Vue",
            desp: "Client side Web App for displaying",
          },
        ],
        project_info: {},
        self_own: false,
        image_list: [],
      },
      {
        title: "Pepper App(Graphic User Interface part)",
        description: "Company Project, all about the humanriod - Pepper",
        tag: [
          {
            key: "Vue (v2)",
            desp: "Front-end Web app",
          },
          {
            key: "Angular (v1)",
            desp: "Front-end SPA/prebuild web application framework",
          },
          {
            key: "Python",
            desp: "backend robot service",
          },
        ],
        project_info: {
          id: 199086045,
          node_id: "MDEwOlJlcG9zaXRvcnkxOTkwODYwNDU=",
          name: "ADS-web-api-server",
          full_name: "Stvchm9703/ADS-web-api-server",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/ADS-web-api-server",
          description: "backend support api server",
          created_at: "2019-07-26T22:13:18Z",
          updated_at: "2020-06-16T05:28:16Z",
          pushed_at: "2020-09-12T07:10:26Z",
          git_url: "git://github.com/Stvchm9703/ADS-web-api-server.git",
          ssh_url: "git@github.com:Stvchm9703/ADS-web-api-server.git",
          clone_url: "https://github.com/Stvchm9703/ADS-web-api-server.git",
          svn_url: "https://github.com/Stvchm9703/ADS-web-api-server",

          language: "Go",

          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 5,
          watchers: 0,
          default_branch: "v2",
        },
        self_own: false,
        image_list: [],
      },

      {
        title: "Z- Unity App and Service worker",
        description:
          "School Project, a Unity Application that using NATS and ProtoBuffer to build online game system",
        tag: [
          {
            key: "Golang",
            desp: "Backend Server to manage the game room",
          },
          {
            key: "NATS",
            desp:
              "Message queueing server, to pass message to server-side service worker",
          },
          {
            key: "Unity Engine",
            desp: "Frontend Application for player play the game",
          },
          {
            key: "Redis",
            desp: "For backend server's data sharing and temporary storage",
          },
        ],
        project_info: {
          id: 216969222,
          node_id: "MDEwOlJlcG9zaXRvcnkyMTY5NjkyMjI=",
          name: "IDCT",
          full_name: "Stvchm9703/IDCT",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/IDCT",
          description: "the IDCT whole project summary, setting ",

          created_at: "2019-10-23T04:40:00Z",
          updated_at: "2020-05-25T08:38:06Z",
          pushed_at: "2020-04-03T04:49:32Z",
          git_url: "git://github.com/Stvchm9703/IDCT.git",
          ssh_url: "git@github.com:Stvchm9703/IDCT.git",
          clone_url: "https://github.com/Stvchm9703/IDCT.git",
          svn_url: "https://github.com/Stvchm9703/IDCT",
          homepage: null,

          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 0,
          watchers: 0,
          default_branch: "master",
        },
        self_own: true,
        image_list: [],
      },
      {
        title: "MongoDB Application for Student Admin Management App",
        description:
          "School Project, a web application that using MongoDB as database to manage data",
        tag: [
          {
            key: "Golang",
            desp: "Front-end Backend/API Server, with Gin framework",
          },
          {
            key: "NuxtJs",
            desp: "Front-end SPA/prebuild web application framework",
          },
          {
            key: "MongoDB",
            desp: "Backend Database storage server",
          },
        ],
        project_info: {
          id: 199086045,
          node_id: "MDEwOlJlcG9zaXRvcnkxOTkwODYwNDU=",
          name: "ADS-web-api-server",
          full_name: "Stvchm9703/ADS-web-api-server",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/ADS-web-api-server",
          description: "backend support api server",
          created_at: "2019-07-26T22:13:18Z",
          updated_at: "2020-06-16T05:28:16Z",
          pushed_at: "2020-09-12T07:10:26Z",
          git_url: "git://github.com/Stvchm9703/ADS-web-api-server.git",
          ssh_url: "git@github.com:Stvchm9703/ADS-web-api-server.git",
          clone_url: "https://github.com/Stvchm9703/ADS-web-api-server.git",
          svn_url: "https://github.com/Stvchm9703/ADS-web-api-server",

          language: "Go",

          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 5,
          watchers: 0,
          default_branch: "v2",
        },
        self_own: true,
        image_list: [],
      },
      {
        title: "TikTicToe - the Service worker",
        description:
          "School Project, a Unity Application that using NATS and ProtoBuffer to build online game system",
        tag: [
          {
            key: "Golang",
            desp: "Backend Server to manage the game room",
          },
          {
            key: "NATS",
            desp:
              "Message queueing server, to pass message to server-side service worker",
          },
          {
            key: "Unity Engine",
            desp: "Frontend Application for player play the game",
          },
          {
            key: "Redis",
            desp: "For backend server's data sharing and temporary storage",
          },
        ],
        project_info: {
          id: 216969222,
          node_id: "MDEwOlJlcG9zaXRvcnkyMTY5NjkyMjI=",
          name: "IDCT",
          full_name: "Stvchm9703/IDCT",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/IDCT",
          description: "the IDCT whole project summary, setting ",

          created_at: "2019-10-23T04:40:00Z",
          updated_at: "2020-05-25T08:38:06Z",
          pushed_at: "2020-04-03T04:49:32Z",
          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 0,
          watchers: 0,
          default_branch: "master",
        },
        self_own: true,
        image_list: [],
      },
      {
        title: "Final Year Project, Online game system with distrible design",
        description:
          "School Project, a Unity Application that using NATS and ProtoBuffer to build online game system",
        tag: [
          {
            key: "Golang",
            desp: "Backend Server to manage the game room",
          },
          {
            key: "NATS",
            desp:
              "Message queueing server, to pass message to server-side service worker",
          },
          {
            key: "Unity Engine",
            desp: "Frontend Application for player play the game",
          },
          {
            key: "Redis",
            desp: "For backend server's data sharing and temporary storage",
          },
        ],
        project_info: {
          id: 216969222,
          node_id: "MDEwOlJlcG9zaXRvcnkyMTY5NjkyMjI=",
          name: "IDCT",
          full_name: "Stvchm9703/IDCT",
          private: false,
          owner: {
            login: "Stvchm9703",
          },
          html_url: "https://github.com/Stvchm9703/IDCT",
          description: "the IDCT whole project summary, setting ",

          created_at: "2019-10-23T04:40:00Z",
          updated_at: "2020-05-25T08:38:06Z",
          pushed_at: "2020-04-03T04:49:32Z",
          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
          },
          forks: 0,
          open_issues: 0,
          watchers: 0,
          default_branch: "master",
        },
        self_own: true,
        image_list: [],
      },
    ],
    listTileCollapseIsOpen: true,
    listTileBlockOpen: true,
    in_reading: 0,
  }),
  computed: {
    in_read_project: (self) => self.star_project[self.in_reading] || null,
  },
  methods: {
    async openProjectInfo(index) {
      this.listTileCollapseIsOpen = false;
      this.in_reading = index;
      setTimeout(() => {
        this.listTileBlockOpen = false;
      }, 700);
      setTimeout(() => {
        this.$smoothScroll({
          scrollTo: this.$refs.projectTileAnchor,
          duration: 750,
          offset: -10,
        });
      }, 710);
    },
    async backToProjectList() {
      this.listTileBlockOpen = true;
      setTimeout(() => {
        this.listTileCollapseIsOpen = true;
        this.in_reading = -1;
      }, 10);
      setTimeout(() => {
        this.$smoothScroll({
          scrollTo: this.$refs.projectTileAnchor,
          duration: 750,
          offset: -10,
        });
      }, 210);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.project-tile-cont {
  min-height: 30em;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@for $i from 1 through 9 {
  .tile-ani-delay-#{($i - 1)} {
    &.slide-fade-enter-active {
      transition-delay: ($i - 1) * 70ms;
    }
    &.slide-fade-leave-active {
      transition-delay: (9 - $i) * 70ms;
    }
  }
}
</style>