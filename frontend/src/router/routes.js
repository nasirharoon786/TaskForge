import TaskPage from "@/pages/TaskPage.vue";
import LoginPage from "@/pages/TaskPage.vue";
import RegisterPage from "@/pages/TaskPage.vue";

const routes = [
    {
        path: "/tasks",
        name: "tasks",
        component: TaskPage,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },
];


export default routes;