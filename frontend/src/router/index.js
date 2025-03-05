import { createRouter, createWebHistory } from "vue-router";
import route from "./routes";

export default createRouter({
    history: createWebHistory(),
    routes: route,
});