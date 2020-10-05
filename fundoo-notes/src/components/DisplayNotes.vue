<template>
  <div id="container">
    <Spinner id="custom-spinner" v-if="notesLoadding" />
    <div id="empty" v-if="isListEmpty">Notes Will Appear here</div>

    <div id="note-list" v-if="!isListEmpty">
      <md-card
        md-with-hover
        v-for="note in notes"
        :key="note.index"
        v-if="!note.isDeleted"
        @mouseover.native="cardAction = true"
        @mouseleave.native="cardAction = false"
      >
        <md-card-header class="md-title">{{ note.title }}</md-card-header>
        <md-card-content>
          {{ note.description }}
        </md-card-content>
        <md-card-actions v-if="cardAction">
          <md-icon id="push-pin">push_pin</md-icon>
          <md-icon>add_alert</md-icon>
          <md-icon>person_add_alt_1</md-icon>
          <md-icon>palette</md-icon>
          <md-icon>insert_photo</md-icon>
          <md-icon>archive</md-icon>
          <md-icon>more_vert</md-icon></md-card-actions
        >
      </md-card>
    </div>
  </div>
</template>
<script>
import noteServices from "../services/noteServices.js";
import { EventBus } from "../event-bus.js";
import Spinner from "vue-simple-spinner";
export default {
  name: "DisplayNotes",
  created() {
    this.fetchNotes();
  },
  data() {
    return {
      isListEmpty: true,
      notes: [],
      cardAction: false,
      notesLoadding: false
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
      this.notesLoadding = true;
      noteServices
        .getNotes()
        .then(result => {
          this.notes = result.data.data.data;
          console.log("Ar", this.notes);
          this.checkNoteList();
          this.notesLoadding = false;
        })
        .catch(error => {
          console.log(error);
          this.notesLoadding = false;
        });
    }
  },
  mounted() {
    EventBus.$on("FetchNotes", fetchNotes => {
      this.fetchNotes();
    });
  },
  components: {
    Spinner
  }
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
#push-pin {
  position: absolute;
  top: 1vh;
  right: 0.5vw;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
.md-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#custom-spinner {
  position: relative;
  top: 15vh;
}
</style>
