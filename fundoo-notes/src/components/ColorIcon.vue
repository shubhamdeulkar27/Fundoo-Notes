<template>
  <div id="color">
    <md-icon @click.native="paletteClicked = !paletteClicked">palette</md-icon>
    <div v-if="paletteClicked" class="palette-content">
      <div
        id="white"
        @click="changeNoteColor(note, '#ffffff')"
        class="circle"
      ></div>
      <div
        id="red"
        class="circle"
        @click="changeNoteColor(note, '#f28b82')"
      ></div>
      <div
        id="orange"
        class="circle"
        @click="changeNoteColor(note, '#fbbc04')"
      ></div>
      <div
        id="green"
        class="circle"
        @click="changeNoteColor(note, '#ccff90')"
      ></div>
      <div
        id="purple"
        class="circle"
        @click="changeNoteColor(note, '#d7aefb')"
      ></div>
      <div
        id="teal"
        class="circle"
        @click="changeNoteColor(note, '#a7ffeb')"
      ></div>
    </div>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isError"
      md-persistent
    >
      <span>Error Occured!</span>
      <md-button class="md-primary" @click="isError = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import noteServices from "../services/noteServices.js";
export default {
  name: "ColorIcon",
  data() {
    return {
      paletteClicked: false,
      color: "",
      isError: false,
      position: "left"
    };
  },
  props: {
    note: Object
  },
  methods: {
    changeNoteColor(note, newColor) {
      let colorData = {
        color: newColor,
        noteIdList: [note.id]
      };
      noteServices.changeNoteColor(colorData).then(result => {
        if (result.status == "200") {
          this.$emit("fetchNotes");
          this.paletteClicked = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$red: #f28b82;
$orange: #fbbc04;
$white: #ffffff;
$green: #ccff90;
$purple: #d7aefb;
$teal: #a7ffeb;
.md-icon {
  cursor: pointer;
}
.circle {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  border: solid rgba($color: gray, $alpha: 0.4) 0.5px;
}
.palette-content {
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 1vh;
  column-gap: 1vw;
  padding: 1vh;
  position: absolute;
  bottom: 1vh;
  background-color: white;
  box-shadow: 0px 0px 5px 2px rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
}
#red {
  background-color: $red;
}
#orange {
  background-color: $orange;
}
#white {
  background-color: $white;
}
#green {
  background-color: $green;
}
#purple {
  background-color: $purple;
}
#teal {
  background-color: $teal;
}
</style>
