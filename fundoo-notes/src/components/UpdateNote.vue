<template>
  <div id="update-container">
    <div
      class="add-note note-clicked"
      v-bind:style="{ background: note.color }"
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
            <div id="white" @click="color = '#ffffff'" class="circle"></div>
            <div id="red" class="circle" @click="color = '#f28b82'"></div>
            <div id="orange" class="circle" @click="color = '#fbbc04'"></div>
            <div id="green" class="circle" @click="color = '#ccff90'"></div>
            <div id="purple" class="circle" @click="color = '#d7aefb'"></div>
            <div id="teal" class="circle" @click="color = '#a7ffeb'"></div>
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
import mixinAutoResize from "../autoResize.js";
export default {
  name: "UpdateNote",
  props: {
    note: Object
  },
  mixins: [mixinAutoResize],
  data() {
    return {
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
      color: ""
    };
  }
};
</script>
<style lang="scss" scoped>
#update-container {
  width: 40vw;
  height: auto;
}
</style>
