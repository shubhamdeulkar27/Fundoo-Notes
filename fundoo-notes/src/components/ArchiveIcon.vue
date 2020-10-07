<template>
  <div id="archive">
    <md-icon @click.native="isArchived = !isArchived">archive</md-icon>
  </div>
</template>
<script>
import noteServices from "../services/noteServices";
export default {
  name: "ArchiveIcon",
  data() {
    return {
      isArchived: false
    };
  }
};
</script>
<style lang="scss" scoped></style>
