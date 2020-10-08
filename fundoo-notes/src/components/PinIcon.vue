<template>
  <div id="pin">
    <md-icon v-if="!note.isPined" @click.native="PinUnpinNotes(note)"
      >push_pin</md-icon
    >
    <md-icon id="pinned" v-if="note.isPined" @click.native="PinUnpinNotes(note)"
      >push_pin</md-icon
    >
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
  name: "PinIcon",
  data() {
    return {
      isError: false,
      position: "left"
    };
  },
  props: {
    note: Object
  },
  methods: {
    PinUnpinNotes(note) {
      let pinData = {
        isPined: !note.isPined,
        noteIdList: [note.id]
      };
      noteServices
        .pinUnpinNotes(pinData)
        .then(result => {
          if (result.status == "200") {
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
#pinned {
  color: orange;
}
</style>
