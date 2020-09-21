<template lang="pug">
.modal-card(style="width: auto")
  header.modal-card-head.has-background-primary

    p.modal-card-title.title.is-3
      i.mdi(:class="{'mdi-github' : provider_host ==='github'}")
      | {{project.name}}
    
  section.modal-card-body
    .columns
      .column.is-two-third
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
      .column.is-one-third.lang-set
        h4.is-bolded Language 
        span.lang-progess
          span.Progress-item(
            v-for="v in lang_style"
            :style="v.style"
          )
        .columns.desp-set.is-multiline
          span.block(v-for="v in lang_style") 
            i.spot.step-marker(:style="{'background-color':v.style['background-color']}")
            span {{v.key}} {{v.style.width}}
        
    .columns 
      .column
        p.description {{project.description}}
    hr
    //tab-header 
    section
      b-tabs(type="is-boxed")
        b-tab-item(label="Preview/Capture",  icon="information-outline")
          .tab-content(v-if="project.license != null")
            .block.content.is-1(v-html="$md.render(readme_md)")
            .block 
             p license : 
              a {{project.license.name}}
              b-collapse(
                aria-id="contentIdForA11y2"
                class="panel"
                animation="slide"
              )
                .panel-block
          // ------------------
        b-tab-item(label="File", icon="library")
          h3 Default Branch: {{project.default_branch}}
          article.panel.is-primary
            .panel-block
              p.control.has-icons-left
                input.input.is-primary(type="text", placeholder="Search")
                span.icon.is-left
                  i.mdi.mdi-magnify(aria-hidden="true")
            
            a.panel-block(
              v-for="fileSet in file_list",
            )
              span.panel-icon 
                i.mdi.mdi-24px(:class="{'mdi-file-code-outline' : fileSet.type==='file', 'mdi-folder': fileSet.type==='dir'}")
              | {{fileSet.name}}

        b-tab-item(label="Branch", icon="source-fork")
          article.panel.is-primary
            .panel-block
              p.control.has-icons-left
                input.input.is-primary(type="text", placeholder="Search")
                span.icon.is-left
                  i.mdi.mdi-magnify(aria-hidden="true")
          
          a.panel-block(
            v-for="refSet in release_tags",
            :href="project.html_url+'/tree/'+refSet.name"
            target="_blank"
          )
            span.panel-icon 
              i.mdi.mdi-24px()
            | {{refSet.name}}

        b-tab-item(label="Release Tag", icon="tag")
          article.panel.is-primary
            .panel-block
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
              i.mdi.mdi-24px()
            | {{refSet.name}}
        
    
  footer.modal-card-foot
    button.button(type="button", @click="$emit(\'close\')") Close
    a.button.is-info(:href="project.html_url" target="blank") 
      i.mdi(:class="{'mdi-github' : provider_host ==='github'}")
      | Go to git reposity
</template>
<script>
import { mapState } from "vuex";
import _isEmpty from "lodash/isEmpty";
export default {
  name: "Project-info-modal",
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
  }),

  methods: {
    // === --------------------------------
    filter_git_ref() {},
    async fetchFullContent() {
      this.is_loading = true;
      try {
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
              "background-color": colorIndex[tmp].color,
              width:
                (100 * parseFloat(langData[tmp] / total(langData))).toFixed(2) +
                "%",
            },
          });
        }
        // console.log(langData.forEach)
        //
        // this.event_list = eventListData;
        //
        this.tags_list = tagListData;
        this.file_list = fileListData;
        this.release_tags = releaseTag
          .filter((e) => e.ref.includes("refs/heads"))
          .map((e) => ({
            name: e.ref.split("/")[2],
            ref: e.ref,
            node_id: e.node_id,
            url: e.url,
            object: e.object,
          }));
      } catch (e) {
        this.fail_load = true;
      } finally {
        this.is_loading = false;
      }
    },
    async fetchInfoContent() {
      let readme_url = this.file_list.filter(
        (e) =>
          e.name.toLowerCase() === "readme.md" ||
          e.name.toLowerCase() === "read_me.md"
      )[0];
      console.log(readme_url.download_url);
      this.readme_md = await this.$axios.$get(readme_url.download_url);
    },
  },
  async mounted() {
    await this.fetchFullContent();
    await this.fetchInfoContent();
  },
};
// TODO :
// 1. fill up more content !
// 2. show the file content list!
// 3. tab page
// 4. commit tree
</script>
<style lang="scss" scoped>
@import "highlight.js/scss/atom-one-dark.scss";
.modal-card-foot .button {
  padding: 5px 45px;
}
.lang-progess {
  display: flex;
  height: 8px;
  overflow: hidden;
  background-color: #e1e4e8;
  border-radius: 6px;
  outline: 1px solid transparent;
  span {
    outline: 2px solid transparent;
  }
}
.lang-set .desp-set {
  margin-top: 0;
  // display:flex;
  .block{
    margin : 7px;
  }
  .spot {
    border-radius: 50%;
    display: inline-block;
    height: 1rem !important;
    width: 1rem !important;
    // box-shadow: 0 0 0.3rem #555;
    background-color: #dddddd;
  }
  .spot + span {
    font-size: 10pt;
    margin-bottom: 2px;
    margin-left: 3px;
  }
}
</style>