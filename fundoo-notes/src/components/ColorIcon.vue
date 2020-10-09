<template>
  <div id="color">
    <md-icon @click.native="paletteClicked = !paletteClicked">palette</md-icon>
    <div v-if="paletteClicked" class="palette-content">
      <div
        v-for="color in colors"
        :key="color.index"
        @click="changeNoteColor(note, color.value)"
        class="circle"
        v-bind:style="{ background: color.value }"
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
      position: "left",
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
</style>
