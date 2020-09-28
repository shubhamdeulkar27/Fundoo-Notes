import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import AddNote from "./components/AddNote.vue";
export default [
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [{ path: "/", component: AddNote }]
  }
];
