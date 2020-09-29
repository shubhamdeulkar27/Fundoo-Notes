<template>
  <div id="container">
    <div id="empty" v-if="isListEmpty">Notes Will Appear here</div>
    <div id="note-list" v-if="!isListEmpty">
      <md-card md-with-hover v-for="note in notes" :key="note.title">
        <md-card-header class="md-title">{{ note.title }}</md-card-header>
        <md-card-content>
          {{ note.description }}
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import noteServices from "../services/noteServices.js";
import { EventBus } from "../event-bus.js";
export default {
  name: "DisplayNotes",
  created() {
    this.fetchNotes();
  },
  data() {
    return {
      isListEmpty: true,
      notes: [],
    };
  },
  methods: {
    checkNoteList() {
      console.log("Check called");
      if (this.notes.length > 0) {
        this.isListEmpty = false;
      }
    },
    fetchNotes() {
      noteServices
        .getNotes()
        .then((result) => {
          this.notes = result.data.data.data;
          console.log("Ar", this.notes);
          this.checkNoteList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    EventBus.$on("FetchNotes", (fetchNotes) => {
      this.fetchNotes();
    });
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 65vw;
  left: 15vw;
  position: relative;
  top: 10vh;

  height: auto;
}
#empty {
  font-size: 40px;
  line-height: 40px;
  height: 50vh;
  padding-top: 22vh;
  opacity: 0.4;
}
#note-list {
  display: grid;
  grid-template-columns: auto auto auto auto;
  row-gap: 1vw;
  column-gap: 1vh;
}
.md-card {
  border-radius: 5px;
  height: fit-content;
}
.md-title {
  font-size: 17px;
  text-align: left;
  color: black;
}
.md-card-content {
  text-align: left;
  opacity: 0.8;
}
</style>