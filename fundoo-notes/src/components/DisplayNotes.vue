<template>
  <div id="container">
    <div id="empty" v-if="isListEmpty">Notes Will Appear here</div>
    <div id="note-list">
      <md-card md-with-hover v-for="note in noteList" :key="note.title">
        <md-card-header class="md-title">{{ note.title }}</md-card-header>
        <md-card-content>
          {{ note.description }}
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "DisplayNotes",
  props: {
    notes: Array,
  },
  beforeMount() {
    this.checkNoteList();
  },
  data() {
    return {
      isListEmpty: true,
      noteList: this.notes,
    };
  },
  methods: {
    checkNoteList() {
      console.log("Check called");
      if (this.notes.length > 0) {
        this.isListEmpty = false;
      }
    },
  },
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
</style>