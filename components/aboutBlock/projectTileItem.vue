<template lang="pug">
transition(name="slide-fade")
  article.tile.is-child.box.has-info-background(
    :class="`tile-ani-delay-${box_index}`",
    v-if="info_open",
    @click="on_click_trig"
  )
    .content
      p.is-size-3-desktop.is-size-5-touch {{ project.title }}
      p.is-size-5-desktop.is-size-6-touch {{ project.description }}
      .field
        .tag(:class="project.self_own ? 'is-info' : 'is-warning'") {{ project.self_own ? 'Personal' : 'Properties' }}
</template>

<script>
export default {
  props: ["project", "box_index", "info_open" , "on_click_trig"],
};
</script>
