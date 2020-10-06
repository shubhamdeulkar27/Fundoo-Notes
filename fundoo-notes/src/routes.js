import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Notes from "./components/Notes.vue";
import ArchivedNotes from "./components/ArchivedNotes.vue";
import TrashedNotes from "./components/TrashedNotes.vue";
export default [
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", component: Notes },
      { path: "/notes", component: Notes },
      { path: "/archived", component: ArchivedNotes },
      { path: "/trashed", component: TrashedNotes }
    ]
  }
];
