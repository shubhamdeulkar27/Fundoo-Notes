import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Notes from "./components/Notes.vue";
export default [
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [{ path: "/", component: Notes }]
  }
];
