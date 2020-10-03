<template lang="pug">
.hero
  span.title.is-center hero
</template>

<script>
export default {
  name: "post-list",
  layout: "inner_page",
  data: () => ({
    post_list : [],
  }),
  fetchData: () => ({}),
};
</script>
