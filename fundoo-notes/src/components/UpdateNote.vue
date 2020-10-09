<template>
  <div id="update-container">
    <div
      class="add-note note-clicked"
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
          <md-icon @click.native="pinNote()">push_pin</md-icon></md-button
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
            ><md-icon @click.native="archiveNote()">archive</md-icon></md-button
          >
          <md-button class="md-icon-button"
            ><md-icon @click.native="clearData()">delete</md-icon></md-button
          >
        </div>
        <div id="add-note-b-right">
          <md-button @click="updateNote()">Close </md-button>
        </div>
      </div>
      <md-snackbar
        :md-position="position"
        :md-active.sync="isPined"
        :md-duration="duration"
        md-persitant
      >
        <span>Note Pinned</span>
      </md-snackbar>
      <md-snackbar
        :md-position="position"
        :md-active.sync="isArchived"
        md-persitant
      >
        <span>Note Archived</span>
      </md-snackbar>
      <md-snackbar
        :md-position="position"
        :md-active.sync="isError"
        md-persitant
      >
        <span>Error Occured!</span>
      </md-snackbar>
    </div>
  </div>
</template>
<script>
import mixinAutoResize from "../autoResize.js";
import noteServices from "../services/noteServices.js";
export default {
  name: "UpdateNote",
  props: {
    note: Object
  },
  mixins: [mixinAutoResize],
  data() {
    return {
      title: this.note["title"],
      description: this.note["description"],
      isPined: this.note["isPined"],
      color: this.note["color"],
      isArchived: this.note["isArchived"],
      labelledList: [],
      reminder: TimeRanges,
      collaborators: [],
      position: "left",
      paletteClicked: false,
      colors: [
        { name: "white", value: "#ffffff" },
        { name: "red", value: "#f28b82" },
        { name: "orange", value: "#fbbc04" },
        { name: "green", value: "#ccff90" },
        { name: "purple", value: "#d7aefb" },
        { name: "teal", value: "#a7ffeb" }
      ],
      isError: false,
      duration: 1000,
      showSnackbar: true
    };
  },
  methods: {
    updateNote() {
      if (
        this.title == this.note["title"] &&
        this.description == this.note["description"] &&
        this.color == this.note["color"] &&
        this.isArchived == this.note["isArchived"] &&
        this.isPined == this.note["isPined"]
      ) {
        this.$emit("closeUpdate");
        return;
      }
      let updateData = {
        description: this.description,
        noteId: this.note.id,
        title: this.title,
        isArchived: this.isArchived,
        isPined: this.isPined,
        color: this.color
      };
      noteServices
        .updateNote(updateData)
        .then(result => {
          if (result.status == "200") {
            this.$emit("closeUpdate");
            this.$emit("fetchNotes");
          }
        })
        .catch(error => {
          this.isError = true;
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
    },
    archiveNote() {
      this.isArchived = !this.isArchived;
    },
    pinNote() {
      this.isPined = !this.isArchived;
    }
  }
};
</script>
<style lang="scss" scoped>
#update-container {
  width: auto;
  height: auto;
}
.add-note {
  box-shadow: 1px 1px 5px rgba($color: gray, $alpha: 0.7);
  border-radius: 5px;
  height: 7vh;
  width: 45vw;

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
  z-index: 4;
}
</style>
