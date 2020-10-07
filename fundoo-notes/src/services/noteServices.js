import httpServices from "./httpServices";

export default {
  addNote(data) {
    return httpServices.post("notes/addNotes", data);
  },
  getNotes() {
    return httpServices.get("notes/getNotesList");
  },
  pinUnpinNotes(data) {
    return httpServices.post("notes/pinUnpinNotes", data);
  },
  archiveNote(data) {
    return httpServices.post("notes/archiveNotes", data);
  }
};
