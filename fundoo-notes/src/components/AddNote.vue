<template>
  <div id="add-note-container">
    <div class="add-note" v-if="!isAddNoteClicked" @click="AddNoteClicked">
      <div id="add-note-title">Take a note...</div>
      <div id="add-note-logo">
        <div><md-icon>check_box</md-icon></div>
        <div><md-icon>brush</md-icon></div>
        <div><md-icon>insert_photo</md-icon></div>
      </div>
    </div>
    <div
      class="add-note note-clicked"
      v-if="isAddNoteClicked"
      v-bind:style="{ background: this.color }"
    >
      <div id="add-note-top">
        <div>
          <input
            v-bind:style="{ background: this.color }"
            type="text"
            name="NoteTitle"
            placeholder="Title"
            class="input title"
            v-model="title"
          />
        </div>

        <md-button class="md-icon-button">
          <md-icon @click.native="isPined = !isPined"
            >push_pin</md-icon
          ></md-button
        >
      </div>
      <div>
        <textarea
          v-bind:style="{ background: this.color }"
          type="text"
          name="NoteContent"
          placeholder="Take a note..."
          class="input note-text"
          v-model="description"
          @input="mixin_autoResize_resize"
        ></textarea>
      </div>
      <div id="add-note-bottom">
        <div id="add-note-b-left">
          <md-button class="md-icon-button"
            ><md-icon>add_alert</md-icon></md-button
          >

          <md-button class="md-icon-button"
            ><md-icon @click.native="paletteClicked = !paletteClicked"
              >palette</md-icon
            ></md-button
          >
          <div v-if="paletteClicked" class="palette-content">
            <div
              v-for="color in colors"
              :key="color.index"
              @click="setColor(color.value)"
              class="circle"
              v-bind:style="{ background: color.value }"
            ></div>
          </div>
          <md-button class="md-icon-button"
            ><md-icon @click.native="isArchived = !isArchived"
              >archive</md-icon
            ></md-button
          >
          <md-button class="md-icon-button"
            ><md-icon @click.native="clearData()">delete</md-icon></md-button
          >
        </div>
        <div id="add-note-b-right">
          <md-button @click="AddNewNote()">Close </md-button>
        </div>
      </div>
      <md-snackbar
        :md-position="position"
        :md-active.sync="isPined"
        md-persitant
      >
        <span>New Note Pinned</span>
      </md-snackbar>
      <md-snackbar
        :md-position="position"
        :md-active.sync="isArchived"
        md-persitant
      >
        <span>New Note Archived</span>
      </md-snackbar>
    </div>
  </div>
</template>

<script>
import noteServices from "../services/noteServices.js";
import { EventBus } from "../event-bus.js";
import mixinAutoResize from "../autoResize.js";
export default {
  name: "AddNote",
  mixins: [mixinAutoResize],
  data() {
    return {
      isAddNoteClicked: false,
      title: null,
      description: null,
      isPined: false,
      color: "#FFFFFF",
      isArchived: false,
      labelledList: [],
      reminder: TimeRanges,
      collaborators: [],
      fetchNotes: false,
      position: "left",
      paletteClicked: false,
      color: "",
      colors: [
        { name: "white", value: "#ffffff" },
        { name: "red", value: "#f28b82" },
        { name: "orange", value: "#fbbc04" },
        { name: "green", value: "#ccff90" },
        { name: "purple", value: "#d7aefb" },
        { name: "teal", value: "#a7ffeb" }
      ]
    };
  },

  methods: {
    AddNoteClicked() {
      this.isAddNoteClicked = !this.isAddNoteClicked;
    },
    AddNewNote() {
      if (this.title == null || this.description == null) {
        this.AddNoteClicked();
        this.clearData();
        return;
      }
      let note = {
        title: this.title,
        description: this.description,
        isPined: this.isPined,
        color: this.color,
        isArchived: this.isArchived,
        labelIdList: this.labelledList,
        reminder: this.reminder,
        collaberators: this.collaborators
      };
      noteServices
        .addNote(note)
        .then(result => {
          console.log(result);
          this.AddNoteClicked();
          this.fetchNotes = true;
          EventBus.$emit("FetchNotes", this.fetchNotes);
          this.clearData();
        })
        .catch(error => {
          console.log("Error", error);
        });
    },
    clearData() {
      this.title = null;
      this.description = null;
      this.isPined = false;
      this.isArchived = false;
      this.color = "#ffffff";
    },
    setColor(color) {
      this.color = color;
      this.paletteClicked = false;
    }
  }
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
#add-note-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
#pinned {
  background-color: gray;
}
.circle {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  border: solid rgba($color: gray, $alpha: 0.4) 1px;
}
.palette-content {
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 1vh;
  column-gap: 1vw;
  padding: 1vh;
  position: absolute;
  bottom: 8vh;
  left: 8vw;
  background-color: white;
  box-shadow: 0px 0px 5px 2px rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
}
</style>
