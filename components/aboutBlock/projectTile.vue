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
              article.tile.is-child.box.has-background-white-force.hvr-grow(
                :class="`tile-ani-delay-${index}`",
                v-if="listTileCollapseIsOpen",
                @click="openProjectInfo(index)"
              )
                .content
                  p.is-size-3-desktop.is-size-5-touch.has-text-dark-force {{ project.title }}
                  p.is-size-5-desktop.is-size-6-touch.has-text-dark-force {{ project.description }}
                  .field
                    .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}
        .tile.is-ancestor(v-if="star_project.length > 3")
          .tile.is-vertical(:class="star_project.length > 7 ? 'is-9' : ''")
            .tile.is-parent(
              v-for="(project, index) in star_project.slice(3, 5)"
            )
              transition(name="slide-fade")
                article.tile.is-child.box.has-background-white-force.hvr-grow(
                  :key="index + 3",
                  :class="`tile-ani-delay-${index + 3}`",
                  v-if="listTileCollapseIsOpen",
                  @click="openProjectInfo(index + 3)"
                ) 
                  .content
                    p.is-size-3-desktop.is-size-5-touch.has-text-dark-force {{ project.title }}
                    p.is-size-5-desktop.is-size-6-touch.has-text-dark-force {{ project.description }}
                    .field
                      .tag(
                        :class="project.self_own ? 'is-info' : 'is-warning'"
                      ) {{ project.self_own ? 'Personal' : 'Properties' }}

            .tile.is-ancestor.is-parent
              .tile.is-parent(
                v-for="(project, index) in star_project.slice(5, 7)",
                :key="index + 5"
              )
                transition(name="slide-fade")
                  article.tile.is-child.box.has-background-white-force.hvr-grow(
                    :class="`tile-ani-delay-${index + 5}`",
                    v-if="listTileCollapseIsOpen",
                    @click="openProjectInfo(index + 5)"
                  )
                    .content
                      p.is-size-3-desktop.is-size-5-touch.has-text-dark-force {{ project.title }}
                      p.is-size-5-desktop.is-size-6-touch.has-text-dark-force {{ project.description }}
                      .field
                        .tag(
                          :class="project.self_own ? 'is-info' : 'is-warning'"
                        ) {{ project.self_own ? 'Personal' : 'Properties' }}

          .tile.is-parent(
            v-if="star_project.length > 7",
            v-for="(project, index) in star_project.slice(7, 8)",
            :key="index + 7"
          )
            transition(name="slide-fade")
              article.tile.is-child.box.has-background-white-force.hvr-grow(
                :class="`tile-ani-delay-${index + 7}`",
                v-if="listTileCollapseIsOpen",
                @click="openProjectInfo(index + 7)"
              )
                .content
                  p.is-size-3-desktop.is-size-5-touch.has-text-dark-force {{ project.title }}
                  p.is-size-5-desktop.is-size-6-touch.has-text-dark-force {{ project.description }}
                  .field
                    .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}
      transition(name="slide-fade")
        .box.sv-project-box(v-if="!listTileBlockOpen")
          .level.is-mobile
            .level-left
              .level-item
                button.button.icon-btn.has-text-white-force(
                  @click="backToProjectList()"
                ) 
                  ArrowLeftIcon.is-size-2-desktop.is-size-4-touch
            .level-right
              .level-item
                a.button.icon-btn.has-text-white-force.is-pulled-right(
                  v-if="in_read_project.self_own",
                  :href="in_read_project.project_info.html_url"
                  target="blank"
                ) 
                  sourceForkIcon.is-size-2-desktop.is-size-4-touch
          .level.is-mobile
            span.column.has-text-white-force.is-size-2-desktop.is-size-4-touch.
              {{in_read_project.title}}

          .tile.box.is-ancestor.has-background-white-force
            .tile.is-parent
              .tile.is-child
                .columns
                  .column
                    span.has-text-dark-force {{ in_read_project.description }}
                .columns(v-for="tag in in_read_project.tag")
                  .column.is-3
                    span.is-bold.has-text-dark-force {{ tag.key }}
                  .column
                    span.has-text-dark-force {{ tag.desp }}
            .tile.is-parent
              .tile.is-child
                b-carousel(
                  v-if="in_read_project.image_list.length > 0",
                  :indicator-inside="true",
                  :indicator-background="true",
                  indicator-mode="click",
                  indicator-position="is-top",
                  :pause-hover="false",
                  :pause-info="false",
                  :arrow="false",
                  :arrow-hover="false"
                )
                  b-carousel-item(
                    v-for="(carousel, i) in in_read_project.image_list",
                    :key="i"
                  )
                    figure.proj-info.image.is-2by1
                      img.has-ratioless(:src="carousel")
</template>

<script>
import ArrowLeftIcon from "mdi-vue/ArrowLeft.vue";
import sourceForkIcon from "mdi-vue/SourceFork.vue";
import star_project_data from "./starProject";
export default {
  name: "project-title",
  components: {
    ArrowLeftIcon,
    sourceForkIcon,
  },
  data: () => ({
    star_project: star_project_data,
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
      }, 450);
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
