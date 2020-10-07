<template>
  <div id="display-note-container">
    <div id="empty" v-if="isListEmpty">
      <Spinner id="custom-spinner" v-if="notesLoadding" /> Notes Will Appear
      here
    </div>
    <div class="list-title" v-if="!isListEmpty">Pinned</div>
    <div id="note-list" v-if="!isListEmpty">
      <div
        class="card"
        v-for="note in notes.slice().reverse()"
        :key="note.index"
        v-if="!note.isDeleted && !note.isArchived && note.isPined"
      >
        <md-card-header class="md-title">{{ note.title }}</md-card-header>
        <md-card-content>
          {{ note.description }}
        </md-card-content>

        <div class="cardActions">
          <md-icon @click.native="PinUnpinNotes(note)" id="push-pin"
            >push_pin</md-icon
          >
          <ReminderIcon />
          <ColorIcon />
          <ArchiveIcon />
          <DeleteIcon />
        </div>
      </div>
    </div>
    <br />
    <div class="list-title" v-if="!isListEmpty">Other</div>
    <div id="note-list" v-if="!isListEmpty">
      <div
        class="card"
        v-for="note in notes.slice().reverse()"
        :key="note.index"
        v-if="!note.isDeleted && !note.isArchived && !note.isPined"
        @mouseover="isCardAction = true"
        @mouseleave="isCardAction = false"
      >
        <md-card-header class="md-title">{{ note.title }}</md-card-header>
        <md-card-content>
          {{ note.description }}
        </md-card-content>

        <div class="cardActions" v-if="isCardAction">
          <md-icon @click.native="PinUnpinNotes(note)" id="push-pin"
            >push_pin</md-icon
          >
          <ReminderIcon />
          <ColorIcon />
          <ArchiveIcon />
          <DeleteIcon />
        </div>
      </div>
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

export default {
  name: "DisplayNotes",
  components: {
    ArchiveIcon,
    DeleteIcon,
    Spinner,
    ColorIcon,
    ReminderIcon
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
    },

    PinUnpinNotes(note) {
      let pinData = {
        isPined: !note.isPined,
        noteIdList: [note.id]
      };
      noteServices
        .pinUnpinNotes(pinData)
        .then(result => {
          console.log(result);
          this.fetchNotes();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    EventBus.$on("FetchNotes", fetchNotes => {
      this.fetchNotes();
    });
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
  left: 5vw;
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
.md-icon {
  cursor: pointer;
}
.hidden {
  display: none;
}
.cardActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1vw;
  padding-bottom: 1vh;
}

#custom-spinner {
  position: relative;
  top: -10vh;
}
</style>
