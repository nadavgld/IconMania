import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    metadata: {
      title: "Icon Mania"
    },
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Profile.vue")
  },
  {
    path: "/add",
    name: "AddAsset",
    component: () => import("@/views/Add.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/NotFound404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const user = Store.state.user;

  if (to.name == "NotFound") {
    next();
    return;
  }

  if (to.path !== "/")
    if (!user || !user.email) {
      next("/");

      return;
    }

  next();
});

export default router;
