import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true },
    component: Home
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History.vue")
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "planning" */ "../views/Planning.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "record" */ "../views/Record.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "categories" */ "../views/Categories.vue")
  },
  {
    path: "/kanban",
    name: "kanban",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "kanban" */ "../views/Kanban.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some(record => record.meta.auth);

  if (requiredAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
