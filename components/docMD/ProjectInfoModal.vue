<template lang="pug">
.modal-card.sv-theme-modal
  header.modal-card-head.github-header
    p.modal-card-title.title.is-3
      githubIcon
      | {{project.name}}
    
  section.modal-card-body
    .columns
      .column.is-two-third
        // --------------------------------------------------------------
        // project-info : success-case
        article.media(v-if="!is_loading&&!fail_load")
          figure.media-left.image.is-64x64
            img.is-rounded(:src="project.owner.avatar_url")
          .media-content
            .content
              p
                strong {{project.owner.login}}
                |  
                a(:href="project.owner.html_url") 
                  small  @{{project.owner.login}}
            .content
              .field.is-grouped.is-grouped-multiline
                .control
                  .tags.has-addons
                    span.tag.is-dark from forked project:
                    span.tag.is-warning(v-if="project.fork") yes
                    span.tag.is-success(v-if="!project.fork") no
                .control
                  .tags.has-addons
                    span.tag.is-dark self-owned :
                    span.tag.is-success(v-if="isSelfHosted") yes
                    span.tag.is-warning(v-if="!isSelfHosted") no
                .control
                  .tags.has-addons
                    span.tag.is-dark star :
                    span.tag.is-info {{ project.stargazers_count }}
                .control
                  .tags.has-addons
                    span.tag.is-dark forked count:
                    span.tag.is-primary {{ project.forks_count }}
        // project-info : in-fetch
        article.media(v-if="is_loading&&!fail_load")
          figure.media-left.image.is-64x64
            b-skeleton(circle, width="64px", height="64px")
          .media-content
            .content
              p
                b-skeleton(active)
                b-skeleton(height="80px")
            
        // project-info : fail-loaded


      // --------------------------------------------------------------

      // --------------------------------------------------------------
      // language-block : success
      .column.is-one-third.lang-set(v-if="!is_loading&&!fail_load")
        span Language 
        span.lang-progess
          span.Progress-item(
            v-for="v in lang_style"
            :style="v.style"
          )
        .columns.desp-set.is-multiline
          span.block(v-for="v in lang_style") 
            i.spot.step-marker(:style="{'background-color':v.style['background-color']}")
            span {{v.key}} {{v.style.width}}
      // language-block : fetching
      .column.is-one-third.lang-set(v-if="is_loading&&!fail_load")
        span Language 
        b-skeleton
        b-skeleton( height="40px")
      // language-block : fail

      // --------------------------------------------------------------
    .columns 
      .column
        // description : success 
        p.description(v-if="!is_loading&&!fail_load") {{project.description}}
        // description : fetch
        b-skeleton(v-if="is_loading&&!fail_load") 
        // description : fail
    hr
    //tab-header 
    section
      b-tabs(type="is-boxed", :expanded="true", v-model="tagPage")
        b-tab-item(value="info")
          // information : success  
          template( slot="header")
            infoOutlineIcon
            span Preview/Capture
          .tab-content(v-if="!is_loading&&!fail_load")
            .block.content.is-1.docMD(v-if="readme_md!=''", v-html="$md.render(readme_md)")
            .block.content.is-1(v-if="project.license != null")
              p license : {{project.license.name}}
          // information : fetching
          .tab-content(v-if="is_loading&&!fail_load")
            b-skeleton.block.content.is-1(height="80px" ,:active="is_loading&&!fail_load")
            b-skeleton.block.content.is-1(:active="is_loading&&!fail_load")
          // ------------------
        b-tab-item(value="file")
          template(slot="header")
            libraryIcon
            span File
          div(v-if="!is_loading&&!fail_load")
            h3.is-6 Default Branch: {{project.default_branch}}
            article.panel.is-primary
              a.panel-block(
                v-for="fileSet in file_list",
              )
                span.panel-icon 
                  fileIcon(v-if="fileSet.type==='file'")
                  folderIcon(v-if="fileSet.type==='dir'")
                | {{fileSet.name}}
          div(v-if="is_loading&&!fail_load")
            b-skeleton(:active="is_loading&&!fail_load" )
            b-skeleton(size="is-large", :active="is_loading&&!fail_load" )
        b-tab-item(value="branch")
          template(slot="header")
            sourceForkIcon
            span Branch
          article.panel.is-primary
            // .panel-block
              p.control.has-icons-left
                input.input.is-primary(type="text", placeholder="Search")
                span.icon.is-left
                  i.mdi.mdi-magnify(aria-hidden="true")
            a.panel-block(
              v-if="!is_loading&&!fail_load"
              v-for="refSet in release_tags",
              :href="project.html_url+'/tree/'+refSet.name"
              target="_blank"
            )
              span.panel-icon 
                i.mdi.mdi-24px()
              | {{refSet.name}}
            b-skeleton.panel-block(
              v-if="is_loading&&!fail_load"
              height="80px"
            )
        b-tab-item( value="tag")
          template(slot="header")
            tagIcon
            span Release Tag
          article.panel.is-primary
            // .panel-block
              p.control.has-icons-left
                input.input.is-primary(type="text", placeholder="Search")
                span.icon.is-left
                  i.mdi.mdi-magnify(aria-hidden="true")
            
            a.panel-block(
              v-for="refSet in tags_list",
              :href="project.html_url+'/releases/tag/'+refSet.name"
              target="_blank"
            )
              span.panel-icon 
                tagIcon
              | {{refSet.name}}
          
    
  footer.modal-card-foot
    button.button.close-btn(type="button", @click="$emit(\'close\')") Close
    a.button.is-primary(:href="project.html_url" target="blank") 
      githubIcon
      | Go to git reposity
</template>
<script>
import { mapState } from "vuex";
import _isEmpty from "lodash/isEmpty";
import debugUrl from "~/plugins/debugRequest";
import githubIcon from "mdi-vue/Github.vue";
import infoOutlineIcon from "mdi-vue/InformationOutline.vue";
import libraryIcon from "mdi-vue/Library.vue";
import sourceForkIcon from "mdi-vue/SourceFork.vue";
import tagIcon from "mdi-vue/Tag.vue";
import fileIcon from "mdi-vue/FileCodeOutline.vue";
import folderIcon from "mdi-vue/FolderOutline.vue";
export default {
  name: "Project-info-modal",
  components: {
    githubIcon,
    infoOutlineIcon,
    libraryIcon,
    sourceForkIcon,
    tagIcon,
    fileIcon,
    folderIcon,
  },
  computed: {
    ...mapState({
      project: (state) => state.project_list.on_showing_project,
      isSelfHosted: (state) =>
        state.project_list.on_showing_project["owner"]["login"] ===
        "Stvchm9703",
      provider_host: (state) =>
        state.project_list.on_showing_project.html_url.includes("github")
          ? "github"
          : "",
    }),
  },
  data: () => ({
    is_loading: false,
    fail_load: false,
    lang_detail: {},
    sample_page: {},
    doc_md_content: {},
    tags_list: [],
    event_list: [],
    file_list: [],
    release_tags: [],
    lang_style: [],
    readme_md: "",
    tagPage: "info",
  }),

  methods: {
    // === --------------------------------
    filter_git_ref() {},
    async fetchFullContent() {
      if (_isEmpty(this.project)) {
        throw "null project object";
      }
      // lang_detail
      const [
        langData,
        tagListData,
        fileListData,
        releaseTag,
      ] = await Promise.all([
        this.$axios.$get(this.project["languages_url"]),
        this.$axios.$get(this.project["tags_url"]),
        this.$axios.$get(this.project["contents_url"].replace("{+path}", "")),
        this.$axios.$get(this.project["git_refs_url"].replace("{/sha}", "/")),
      ]);
      this.lang_detail = langData;
      let total = (obj) => Object.values(obj).reduce((a, b) => a + b);
      let colorIndex = this.$store.state.project_list.colorIndex;
      for (var tmp in langData) {
        this.lang_style.push({
          key: tmp,
          style: {
            "background-color":
              colorIndex[tmp] != undefined ? colorIndex[tmp].color : "#dddddd",
            width:
              (100 * parseFloat(langData[tmp] / total(langData))).toFixed(2) +
              "%",
          },
        });
      }
      //
      this.tags_list = tagListData;
      this.file_list = fileListData;
      console.log("fileListData:", fileListData);
      this.release_tags = releaseTag
        .filter((e) => e.ref.includes("refs/heads"))
        .map((e) => ({
          name: e.ref.split("/")[2],
          ref: e.ref,
          node_id: e.node_id,
          url: e.url,
          object: e.object,
        }));
    },
    async fetchInfoContent() {
      if (_isEmpty(this.file_list)) throw "empty file list";
      let readme_url = this.file_list.filter(
        (e) =>
          e.name.toLowerCase() === "readme.md" ||
          e.name.toLowerCase() === "read_me.md"
      );
      console.log(readme_url);
      if (readme_url.length > 0) {
        this.readme_md = await this.$axios.$get(readme_url[0].download_url);
      }
    },
    async fetchLicience() {
      let licInfo = this.$axios.$get("");

      // let;
    },
  },
  async mounted() {
    this.is_loading = true;
    try {
      await this.fetchFullContent();
      await this.fetchInfoContent();
    } catch (e) {
      console.warn(e);
      this.fail_load = true;
    }
    this.is_loading = false;
  },
};
// TODO :
// 1. fill up more content !
// 2. show the file content list!
// 3. tab page
// 4. commit tree
</script>
