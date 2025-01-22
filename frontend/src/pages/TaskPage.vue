<template>
    <div class="container mt-5 d-flex flex-column align-items-center">
        <NewTask @added="handleAddedTask" />

        <!-- Todo List Table -->
        <!-- <table class="table table-bordered w-75">
            <thead>
                <tr>
                    <th>Task Number</th>
                    <th>Task</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" :key="task.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ task.name }}</td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="completeTask(task.id)">Complete</button>
                        <button class="btn btn-warning btn-sm" @click="editTask(task.id)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <Tasks :tasks="uncompletedTasks" @updated="handleUpdatedTask" />
        <div>
            <div class="text-center my-3" v-show="showToggleCompletedBtn">
                <button class="btn btn-sm btn-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                    <span v-if="!showCompletedTasks">Show completed</span>
                    <span v-else>Hide completed</span>
                </button>
            </div>
        </div>
        <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks" />


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { allTasks, createTask, updateTask } from '@/http/task-api';
import Tasks from '@/components/tasks/Tasks.vue';
import NewTask from '@/components/tasks/NewTask.vue';

// Reactive variable to store tasks
const tasks = ref([]);

// Function to fetch tasks from the API
const fetchTasks = async () => {
    try {
        const response = await allTasks(); // Fetch tasks from the API
        const fetchedTasks = response.data.data; // Access tasks array

        // Map the tasks to a structured format
        tasks.value = fetchedTasks.map(task => ({
            id: task.id,
            name: task.name,
            is_completed: task.is_completed,
        }));
    } catch (error) {
        console.error('Error fetching tasks:', error); // Log any errors
    }
};

// Fetch tasks when the component is mounted
onMounted(fetchTasks);

const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))

const showToggleCompletedBtn = computed(() =>
    uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const completedTasksIsVisible = computed(() =>
    uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);

const showCompletedTasks = ref(false);

const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
}

const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    })

    const currentTask = tasks.value.find(item => item.id === task.id)

    currentTask.name = updatedTask.data.name
}
</script>


<style scoped>
/* You can add additional styling here if needed */
</style>