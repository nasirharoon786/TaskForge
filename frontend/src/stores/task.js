import { defineStore } from "pinia";
import { allTasks } from "@/http/task-api";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    task: {
      id: 1,
      name: "Task 1",
      is_completed: false,
    },
  }),
  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.is_completed);
    },
  },
  actions: {
    async fetchAllTasks() {
        const { data } = await allTasks();
        this.tasks = data.data;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    },
  },
});
