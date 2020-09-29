<template>
  <div id="container">
    <AddNote />
    <DisplayNotes />
  </div>
</template>
<script>
import AddNote from "./AddNote";
import DisplayNotes from "./DisplayNotes.vue";

export default {
  name: "Notes",
  components: {
    AddNote,
    DisplayNotes,
  },
};
</script>
<style lang="scss" scoped>
</style>