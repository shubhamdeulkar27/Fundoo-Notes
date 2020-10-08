<template>
  <div id="delete">
    <md-icon @click.native="deleteNote(note)">delete</md-icon>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isDeleted"
      md-persistent
    >
      <span>Note Trashed!</span>
      <md-button class="md-primary" @click="isDeleted = false">Ok</md-button>
    </md-snackbar>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isError"
      md-persistent
    >
      <span>Error Occured!</span>
      <md-button class="md-primary" @click="isError = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import noteServices from "../services/noteServices.js";
export default {
  name: "DeleteIcon",
  props: {
    note: Object
  },
  data() {
    return {
      isDeleted: false,
      isError: false,
      position: "left"
    };
  },
  methods: {
    deleteNote(note) {
      let deleteData = {
        isDeleted: !note.isDeleted,
        noteIdList: [note.id]
      };
      noteServices
        .deleteNote(deleteData)
        .then(result => {
          if (result.status == "200") {
            this.$emit("fetchNotes");
            this.isDeleted = true;
          }
        })
        .catch(error => {
          this.isError = true;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.md-icon {
  cursor: pointer;
}
</style>
