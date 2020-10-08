<template>
  <div class="completeDelete">
    <md-icon @click.native="deleteForever(note)">delete_forever</md-icon>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isDeleted"
      md-persistent
    >
      <span>Note Deleted Forever!</span>
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
  name: "CompleteDeleteIcon",
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
    deleteForever(note) {
      let deleteData = {
        noteIdList: [note.id]
      };
      noteServices
        .deleteNoteForever(deleteData)
        .then(result => {
          if (result.status == "200") {
            this.isDeleted = true;
            this.$emit("fetchNotes");
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
