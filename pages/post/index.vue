<template lang="pug">
.container.is-fluid.empty-contain
  .section.fix-top
    .columns
      .column
        span.is-size-1.has-text-light.
          Post list 
      .column.has-text-right
        span.has-text-light Last update :
          time(:datetime="last_updated") {{ last_updated }}
  .section
</template>

<script>
export default {
  name: "post-list",
  layout: "inner_fullheigh_page",
  data: () => ({
    post_list : [],
    last_updated : "2020-10-12 12:35:22"
  }),
};
</script>
