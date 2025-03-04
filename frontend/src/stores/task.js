import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks } from "@/http/task-api";

// const tmp = {
//   state: () => ({}),
//   getters: {},
//   actions: {
//     async fetchAllTasks() {
//       const { data } = await allTasks();
//       this.tasks = data.data;
//     },
//     addTask(task) {
//       this.tasks.push(task);
//     },
//     removeTask(task) {
//       const index = this.tasks.indexOf(task);
//       this.tasks.splice(index, 1);
//     },
//   },
// };
export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.is_completed)
  );
  const uncompletedTasks = computed(() =>
    tasks.value.filter((task) => !task.is_completed)
  );

  const fetchAllTasks = async () => {
    const { data } = await allTasks();
    tasks.value = data.data;
  };

  return {
    tasks,
    completedTasks,
    uncompletedTasks,
    fetchAllTasks,
  };
});
