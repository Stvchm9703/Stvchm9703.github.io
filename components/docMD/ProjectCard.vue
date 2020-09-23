<template lang="pug">
.column.is-half-tablet.is-full-mobile.is-one-half-desktop.is-one-third-widescreen.is-one-third-fullhd
  .card.is-offset-1
    header.card-header
      p.card-header-title(
        :class="{ 'github-header': provider_host === 'github' }"
      )
        i.mdi(:class="{ 'mdi-github': provider_host === 'github' }")
        | {{ project_name }}
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
    footer.card-footer
      a.card-footer-item.has-background-primary.has-text-light(
        href="javascript:void(0)",
        @click="open_info_modal()"
      ) Project Detail
      nuxt-link.card-footer-item.has-text-info(
        :to="'/doc/' + project_full_name"
      ) Show Document
</template>
<script>
import ProjectInfoModal from "~/components/docMD/ProjectInfoModal.vue";
export default {
  name: "Project-Card",
  props: {
    project_id: { type: Number, default: 0 },
    project_name: { type: String, default: "" },
    project_full_name: { type: String, default: "" },
    fork: { type: Boolean, default: false },
    is_self_hosted: { type: Boolean, default: true },
    star_counted: { type: Number, default: 0 },
    forked_counted: { type: Number, default: 0 },
    language: { type: String, default: "" },
    created_at: { type: String, default: "" },
    updated_at: { type: String, default: "" },
  },
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
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        fullScreen: true,
      });
    },
  },
};
// TODO:
// 1. check up the card content beatify ?
</script>

<style lang="scss" scoped>
button.card-footer-item {
  font-size: 16px;
}
.card-header-title .mdi {
  margin-right: 12px;
}
</style>