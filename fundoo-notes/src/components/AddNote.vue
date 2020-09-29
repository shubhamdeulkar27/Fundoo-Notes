<template>
  <div id="container">
    <div class="add-note" v-if="!isAddNoteClicked" @click="AddNoteClicked">
      <div id="add-note-title">Take a note...</div>
      <div id="add-note-logo">
        <div><md-icon>check_box</md-icon></div>
        <div><md-icon>brush</md-icon></div>
        <div><md-icon>insert_photo</md-icon></div>
      </div>
    </div>
    <div class="add-note note-clicked" v-if="isAddNoteClicked">
      <div>
        <input
          type="text"
          name="NoteTitle"
          placeholder="Title"
          class="input title"
          v-model="title"
        />
      </div>
      <div>
        <textarea
          type="text"
          name="NoteContent"
          placeholder="Take a note..."
          class="input note-text"
          v-model="description"
        ></textarea>
      </div>
      <div id="add-note-bottom">
        <div id="add-note-b-left">
          <div><md-icon>add_alert</md-icon></div>
          <div><md-icon>person_add_alt_1</md-icon></div>
          <div><md-icon>palette</md-icon></div>
          <div><md-icon>insert_photo</md-icon></div>
          <div><md-icon>archive</md-icon></div>
          <div><md-icon>more_vert</md-icon></div>
        </div>
        <div id="add-note-b-right">
          <md-button @click="AddNewNote()">Close </md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noteServices from "../services/noteServices.js";
import { EventBus } from "../event-bus.js";
export default {
  name: "AddNote",
  data() {
    return {
      isAddNoteClicked: false,
      title: null,
      description: null,
      isPinned: false,
      color: "#FFFFFF",
      isArchived: false,
      labelledList: [],
      reminder: TimeRanges,
      collaborators: [],
      fetchNotes: false,
    };
  },

  methods: {
    AddNoteClicked() {
      this.isAddNoteClicked = !this.isAddNoteClicked;
    },
    AddNewNote() {
      if (this.title == null && this.description == null) {
        this.AddNoteClicked();
        return;
      }
      let note = {
        title: this.title,
        description: this.description,
        isPined: this.isPinned,
        color: this.color,
        isArchived: this.isArchived,
        labelIdList: this.labelledList,
        reminder: this.reminder,
        collaberators: this.collaborators,
      };
      noteServices
        .addNote(note)
        .then((result) => {
          console.log(result);
          this.AddNoteClicked();
          this.fetchNotes = true;
          EventBus.$emit("FetchNotes", this.fetchNotes);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-note {
  box-shadow: 1px 1px 5px rgba($color: gray, $alpha: 0.7);
  border-radius: 5px;
  height: 7vh;
  width: 45vw;
  position: relative;
  left: 27vw;
  top: 5vh;
  font-size: 17px;
  line-height: 7vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1vw;
  padding-right: 1vw;
  color: rgba($color: gray, $alpha: 0.9);
}
.note-clicked {
  flex-direction: column;
  height: auto;
}
#add-note-logo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.md-icon {
  margin-right: 1vw;
  margin-left: 1vw;
  font-size: 10px;
}
.input {
  outline: none;
  border: none;

  font-size: 15px;
  line-height: 15px;
  width: 100%;
}
.title {
  font-size: 18px;
}
.note-text {
  height: auto;
  overflow: hidden;
  resize: none;
}
#add-note-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#add-note-b-left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>