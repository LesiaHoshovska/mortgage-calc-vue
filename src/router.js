import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MortgageCalc from "./pages/MortgageCalc";
Vue.use(VueRouter);

const routes = [
  { path: "/edit/:id?", name: "edit", component: Edit },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/", name: "home", component: Home },
  { path: "/mortgage", name: "mortgage", component: MortgageCalc },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
