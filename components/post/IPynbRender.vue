<template lang="pug">
div(v-on="$listeners")
  .nb-notebook
    .nb-worksheet
      .nb-cell(
        v-for="(cell, index) in nb_data.cells",
        :class="`nb-${cell.cell_type}-cell`"
      )
        div(
          v-if="cell.cell_type === 'markdown'",
          v-html="renderMDCell(cell.source)"
        )
        div(v-if="cell.cell_type === 'code'")
          .nb-input(
            :data-prompt-number="cell.execution_count",
            v-html="renderCodeCell(cell.source)"
          )
          .nb-output(
            v-for="out_data in cell.outputs",
            :data-prompt-number="cell.execution_count"
          )
            .nb-text-output(
              v-if="out_data.output_type === 'execute_result'",
              v-html="renderResultHTML(out_data.data)"
            )
            
            img.nb-image-output.has-background-light-force(
              v-if="out_data.output_type === 'display_data'",
              :src="'data:image/png;base64,' + out_data.data['image/png'].slice(0, -2) + '='"
            )

</template>

<script>
export default {
  name: "IPynbRender",
  props: {
    worksheet_paging_node: Number,
    nb_data: Object,
  },
  data: () => ({
    current_paging: 0,
  }),
  computed: {
    render_cell() {
      if (this.worksheet_paging_node > 0) {
        return this.nb_data.cells.slice(
          this.current_paging * worksheet_paging_node,
          (this.current_paging + 1) * worksheet_paging_node
        );
      } else {
        // return all cells
        return this.nb_data.cells;
      }
    },
  },
  methods: {
    renderCodeCell(codeString) {
      return `<pre>
<code class="hljs language-${
        this.nb_data.metadata.language_info.name
      }">${codeString.join("")}</code
</pre>`;
    },

    renderMDCell(source) {
      return this.$md.render(source.join("\n"));
    },
    renderResultHTML(data) {
      if (data["text/html"] != undefined) return data["text/html"].join("");
    },
  },
};
</script>
