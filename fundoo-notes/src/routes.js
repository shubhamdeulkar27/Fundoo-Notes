import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Notes from "./components/Notes.vue";
import ArchivedNotes from "./components/ArchivedNotes.vue";
import TrashedNotes from "./components/TrashedNotes.vue";
import AddNote from "./components/AddNote.vue";
import DisplayNotes from "./components/DisplayNotes.vue";
export default [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", component: Notes },
      {
        path: "/notes",
        component: Notes,
        children: [
          { path: "/add", component: AddNote },
          { path: "/display", component: DisplayNotes }
        ]
      },
      { path: "/archived", component: ArchivedNotes },
      { path: "/trashed", component: TrashedNotes }
    ]
  }
];
