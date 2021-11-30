/*
 * @Author: wuchen
 * @Date: 2021-11-29 14:08:25
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-30 10:52:16
 * @Description: 
 * @Email: rangowu@163.com
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/table";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about/")
  }
];

/* const router = new VueRouter({
  mode: "history",
  routes
}); */

export default routes;
