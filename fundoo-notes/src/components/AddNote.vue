<template>
  <div id="container">
    <div class="add-note" v-if="!isAddNoteClicked">
      <div id="add-note-title">Take a note...</div>
      <div id="add-note-logo">
        <div><md-icon id="logo">check_box</md-icon></div>
        <div><md-icon id="logo">brush</md-icon></div>
        <div><md-icon id="logo">insert_photo</md-icon></div>
      </div>
    </div>
    <div class="add-note note-clicked">
      <div><input type="text" name="NoteTitle" placeholder="Title" /></div>
      <div>
        <input type="text" name="NoteContent" placeholder="Take a note..." />
      </div>
      <div>Logos</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNote",
  data() {
    return {
      isAddNoteClicked: false,
    };
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
#logo {
  margin-right: 1vw;
  margin-left: 1vw;
}
</style>