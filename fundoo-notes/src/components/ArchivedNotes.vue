<template>
  <div id="archived-container">
    <div id="empty" v-if="isNoteListEmpty">
      <Spinner id="custom-spinner" v-if="notesLoadding" />Archived Notes Will
      Appear Here
    </div>

    <div id="note-list" v-if="!isNoteListEmpty">
      <div
        v-bind:style="{ background: note.color }"
        class="card"
        v-for="note in notes.slice().reverse()"
        :key="note.index"
        v-if="!note.isDeleted"
      >
        <md-card-header class="md-title" @click.native="callUpdateNote(note)">{{
          note.title
        }}</md-card-header>
        <md-card-content @click.native="callUpdateNote(note)">
          {{ note.description }}
        </md-card-content>

        <div class="cardActions">
          <PinIcon
            id="push-pin"
            v-bind:note="note"
            @fetchNotes="fetchNotes()"
          />
          <ReminderIcon />
          <ColorIcon v-bind:note="note" @fetchNotes="fetchNotes()" />
          <ArchiveIcon
            v-bind:note="note"
            noteType="Archived"
            @fetchNotes="fetchNotes()"
          />
          <DeleteIcon v-bind:note="note" @fetchNotes="fetchNotes()" />
        </div>
      </div>
    </div>

    <md-snackbar
      :md-position="position"
      :md-active.sync="isError"
      md-persistent
    >
      <span>Error Occured!</span>
      <md-button class="md-primary" @click="isError = false">Ok</md-button>
    </md-snackbar>
    <md-dialog :md-active.sync="showDialog">
      <UpdateNote
        v-bind:note="updateNote"
        @fetchNotes="fetchNotes()"
        @closeUpdate="closeUpdate()"
      />
    </md-dialog>
  </div>
</template>

<script>
import noteServices from "../services/noteServices.js";
import Spinner from "vue-simple-spinner";
import ArchiveIcon from "./ArchiveIcon.vue";
import DeleteIcon from "./DeleteIcon.vue";
import ColorIcon from "./ColorIcon.vue";
import ReminderIcon from "./ReminderIcon.vue";
import PinIcon from "./PinIcon.vue";
import UpdateNote from "./UpdateNote.vue";

export default {
  name: "notes",
  data() {
    return {
      notesLoadding: false,
      isNoteListEmpty: true,
      notes: [],
      isError: false,
      position: "left",
      showDialog: false,
      updateNote: Object
    };
  },
  components: {
    Spinner,
    ArchiveIcon,
    DeleteIcon,
    ColorIcon,
    ReminderIcon,
    PinIcon,
    UpdateNote
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      this.notesLoadding = true;
      noteServices
        .getArchivedNotes()
        .then(result => {
          if (result.status == "200") {
            this.notesLoadding = false;
            this.notes = result.data.data.data;
            this.isNoteListEmpty = false;
          }
        })
        .catch(error => {
          this.isError = true;
        });
    },
    callUpdateNote(note) {
      this.updateNote = note;
      this.showDialog = true;
    },
    closeUpdate() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#archived-container {
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
  position: relative;
  left: 2vw;
  top: 10vh;
}
#custom-spinner {
  position: relative;
  top: -10vh;
}
#note-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1vw;
  column-gap: 1vh;
}
.card {
  position: relative;
  box-shadow: 0px 0px 5px 1px rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
  height: fit-content;
  border: 1px solid white;
}
.card:hover {
  border: 1px solid rgba($color: gray, $alpha: 0.8);
  .cardActions {
    opacity: 100%;
  }
}
.md-title {
  font-size: 17px;
  text-align: left;
  color: black;
}
.md-card-content {
  text-align: left;
  opacity: 0.8;
  padding-bottom: 0px;
}
.md-icon {
  cursor: pointer;
}
#push-pin {
  position: absolute;
  top: 2vh;
  right: 1vw;
}
.cardActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1vw;
  padding-bottom: 1vh;
  opacity: 0%;
}
@media (min-width: 320px) and (max-width: 360px) {
  #archived-container {
    width: 65vw;
    left: 22vw;
    position: relative;
    top: 10vh;
    height: auto;
  }
  #note-list {
    grid-template-columns: 1fr;
    row-gap: 3vh;
  }
  .cardActions {
    opacity: 100%;
  }
  .md-card-content {
    margin-bottom: 2vh;
  }
}
//Media query For Moto G4 Horizontal.
@media (min-width: 570px) and (max-width: 640px) {
  #archived-container {
    width: 70vw;
    left: 15vw;
  }
  .cardActions {
    opacity: 100%;
  }
  #note-list {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 5vh;
    column-gap: 2vw;
  }
}
</style>
