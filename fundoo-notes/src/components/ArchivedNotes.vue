<template>
  <div id="archived-container">
    <div id="empty">
      <Spinner id="custom-spinner" v-if="notesLoadding" />Archived Notes Will
      Apper Here
    </div>
  </div>
</template>
<script>
import Spinner from "vue-simple-spinner";
export default {
  name: "ArchivedNotes",
  data() {
    return {
      notesLoadding: true
    };
  },
  components: {
    Spinner
  }
};
</script>
<style lang="scss" scoped></style>
