<template lang="pug">
.column
  .card.is-offset-1.sv-theme-card
    header.card-header
      p.card-header-title(
        :class="{ 'github-header': provider_host === 'github' }"
      )
        githubIcon
        | {{ project_name }}
    slot(name="content")
      .card-content
        .content
          .field.is-grouped.is-grouped-multiline
            .control
              .tags.has-addons
                span.tag.is-dark from forked project:
                span.tag.is-warning(v-if="fork") yes
                span.tag.is-success(v-if="!fork") no
            .control
              .tags.has-addons
                span.tag.is-dark self-owned :
                span.tag.is-success(v-if="is_self_hosted") yes
                span.tag.is-warning(v-if="!is_self_hosted") no
          .field.is-grouped.is-grouped-multiline
            .control
              .tags.has-addons
                span.tag.is-dark star :
                span.tag.is-info {{ star_counted }}
            .control
              .tags.has-addons
                span.tag.is-dark forked count:
                span.tag.is-primary {{ forked_counted }}
          p language : {{ language }}
          p created :
            time(:datetime="created_at") {{ created_at }}
          p last updated :
            time(:datetime="updated_at") {{ updated_at }}
    slot(name="footer")
      footer.card-footer
        a.card-footer-item.prim-dark-btn(@click="open_info_modal()") Project Detail
        nuxt-link.card-footer-item.sec-dark-btn(
          :to="'/doc/project?u=' + owner + '&proj=' + project_name",
          no-prefetch
        ) Show Document
</template>
<script>
import ProjectInfoModal from "~/components/docMD/ProjectInfoModal.vue";
import githubIcon from "mdi-vue/Github.vue";

export default {
  name: "Project-Card",
  props: {
    project_id: { type: Number, default: 0 },
    project_name: { type: String, default: "" },
    project_full_name: { type: String, default: "" },
    fork: { type: Boolean, default: false },
    is_self_hosted: { type: Boolean, default: true },
    owner: { type: String, default: "" },
    star_counted: { type: Number, default: 0 },
    forked_counted: { type: Number, default: 0 },
    language: { type: String, default: "" },
    created_at: { type: String, default: "" },
    updated_at: { type: String, default: "" },
    footer_override: { type: Boolean, deafult: false },
  },
  components: { githubIcon },
  computed: {
    provider_host() {
      return "github";
    },
  },
  methods: {
    open_info_modal() {
      this.$store.commit("project_list/set_showed_project", this.project_id);
      // this.$router.push({ hash: this.project_id });
      this.$buefy.modal.open({
        parent: this.$parent,
        component: ProjectInfoModal,
        hasModalCard: true,
        trapFocus: true,
        fullScreen: true,
      });
    },
  },
};
// TODO:
// 1. check up the card content beatify ?
</script>
