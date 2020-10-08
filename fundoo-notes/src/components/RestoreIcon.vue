<template>
  <div class="restore">
    <md-icon @click.native="removeFromTrash(note)">restore_from_trash</md-icon>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isRemoved"
      md-persistent
    >
      <span>Note Removed From Trashed!</span>
      <md-button class="md-primary" @click="isRemoved = false">Ok</md-button>
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
  name: "RestoreIcon",
  props: {
    note: Object
  },
  data() {
    return {
      isRemoved: false,
      isError: false,
      position: "left"
    };
  },
  methods: {
    removeFromTrash(note) {
      let deleteData = {
        isDeleted: !note.isDeleted,
        noteIdList: [note.id]
      };
      noteServices
        .deleteNote(deleteData)
        .then(result => {
          if (result.status == "200") {
            this.$emit("fetchNotes");
            this.isRemoved = true;
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
