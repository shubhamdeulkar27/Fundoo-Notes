import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Notes from "./components/Notes.vue";
import ArchivedNotes from "./components/ArchivedNotes.vue";
import TrashedNotes from "./components/TrashedNotes.vue";
import AddNote from "./components/AddNote.vue";
import DisplayNotes from "./components/DisplayNotes.vue";
function guardRoute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("fundoo-token")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

export default [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: guardRoute,
    children: [
      { path: "/", component: Notes, beforeEnter: guardRoute },
      {
        path: "/notes",
        component: Notes,
        beforeEnter: guardRoute,
        children: [
          { path: "/add", component: AddNote },
          { path: "/display", component: DisplayNotes }
        ]
      },
      { path: "/archived", component: ArchivedNotes, beforeEnter: guardRoute },
      { path: "/trashed", component: TrashedNotes, beforeEnter: guardRoute }
    ]
  }
];
