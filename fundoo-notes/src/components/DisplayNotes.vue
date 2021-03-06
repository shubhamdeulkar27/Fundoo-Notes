<template>
  <div id="display-note-container">
    <div id="empty" v-if="isListEmpty">
      <Spinner id="custom-spinner" v-if="notesLoadding" /> Notes Will Appear
      here
    </div>

    <div class="list-title" v-if="!isListEmpty">Pinned</div>
    <div id="note-list" v-if="!isListEmpty">
      <div
        v-bind:style="{ background: note.color }"
        class="card"
        v-for="note in filteredNotes.slice().reverse()"
        :key="note.index"
        v-if="!note.isDeleted && !note.isArchived && note.isPined"
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
            noteType="Display"
            @fetchNotes="fetchNotes()"
          />
          <DeleteIcon v-bind:note="note" @fetchNotes="fetchNotes()" />
        </div>
      </div>
    </div>
    <br />

    <div class="list-title" v-if="!isListEmpty">Others</div>
    <div id="note-list" v-if="!isListEmpty">
      <div
        v-bind:style="{ background: note.color }"
        class="card"
        v-for="note in filteredNotes.slice().reverse()"
        :key="note.index"
        v-if="!note.isDeleted && !note.isArchived && !note.isPined"
      >
        <md-card-header @click.native="callUpdateNote(note)" class="md-title">{{
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
            noteType="Display"
            @fetchNotes="fetchNotes()"
          />
          <DeleteIcon v-bind:note="note" @fetchNotes="fetchNotes()" />
        </div>
      </div>
      <md-dialog :md-active.sync="showDialog">
        <UpdateNote
          v-bind:note="updateNote"
          @fetchNotes="fetchNotes()"
          @closeUpdate="closeUpdate()"
        />
      </md-dialog>
    </div>
  </div>
</template>
<script>
import noteServices from "../services/noteServices.js";
import { EventBus } from "../event-bus.js";
import Spinner from "vue-simple-spinner";
import ArchiveIcon from "./ArchiveIcon.vue";
import DeleteIcon from "./DeleteIcon.vue";
import ColorIcon from "./ColorIcon.vue";
import ReminderIcon from "./ReminderIcon.vue";
import PinIcon from "./PinIcon.vue";
import UpdateNote from "./UpdateNote.vue";

export default {
  name: "DisplayNotes",
  components: {
    ArchiveIcon,
    DeleteIcon,
    Spinner,
    ColorIcon,
    ReminderIcon,
    PinIcon,
    UpdateNote
  },
  created() {
    this.fetchNotes();
  },

  data() {
    return {
      isCardAction: false,
      isListEmpty: true,
      notes: [],
      title: null,
      description: null,
      isPined: false,
      color: "#FFFFFF",
      isArchived: false,
      labelledList: [],
      reminder: TimeRanges,
      collaborators: [],
      notesLoadding: false,
      showDialog: false,
      updateNote: null,
      search: ""
    };
  },
  methods: {
    checkNoteList() {
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
          this.checkNoteList();
          this.notesLoadding = false;
        })
        .catch(error => {
          console.log(error);
          this.notesLoadding = false;
        });
    },
    callUpdateNote(note) {
      this.updateNote = note;
      this.showDialog = true;
    },
    closeUpdate() {
      this.showDialog = false;
    }
  },
  mounted() {
    EventBus.$on("FetchNotes", fetchNotes => {
      this.fetchNotes();
    });
    EventBus.$on("Serached", search => {
      this.search = search;
    });
  },
  computed: {
    filteredNotes: function() {
      return this.notes.filter(note => {
        return note.title.match(this.search);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#display-note-container {
  width: 65vw;
  left: 15vw;
  position: relative;
  top: 10vh;
  height: auto;
}
#push-pin {
  position: absolute;
  top: 2vh;
  right: 1vw;
}
#empty {
  font-size: 40px;
  line-height: 40px;
  height: 50vh;
  padding-top: 22vh;
  opacity: 0.4;
  position: relative;
  left: 2vw;
}
#note-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1vw;
  column-gap: 1vh;
}
.list-title {
  text-align: left;
  margin-top: 2vh;
  margin-bottom: 2vh;
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
.cardActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1vw;
  padding-bottom: 1vh;
  opacity: 0%;
}
#custom-spinner {
  position: relative;
  top: -10vh;
}

//Moto G4
@media (min-width: 320px) and (max-width: 360px) {
  #display-note-container {
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
  #display-note-container {
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
