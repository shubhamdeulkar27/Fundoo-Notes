<template>
  <div id="container">
    <AddNote />
    <DisplayNotes v-bind:notes="notes" />
  </div>
</template>
<script>
import AddNote from "./AddNote";
import DisplayNotes from "./DisplayNotes.vue";
import noteServices from "../services/noteServices.js";
export default {
  name: "Notes",
  data() {
    return {
      notes: [],
    };
  },
  components: {
    AddNote,
    DisplayNotes,
  },
  beforeMount() {
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      noteServices
        .getNotes()
        .then((result) => {
          this.notes = result.data.data.data;
          console.log(this.notes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>