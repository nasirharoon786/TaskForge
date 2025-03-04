<template>
    <div class="container mt-5 d-flex flex-column align-items-center">
        <NewTask @added="handleAddedTask" />
        <Tasks :tasks="uncompletedTasks" 
            @updated="handleUpdatedTask" 
            @completed="handleCompletedTask" 
            @removed="handleRemovedTask" 
        />
        <div>
            <div class="text-center my-3" v-show="showToggleCompletedBtn">
                <button class="btn btn-sm btn-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                    <span v-if="!showCompletedTasks">Show completed</span>
                    <span v-else>Hide completed</span>
                </button>
            </div>
        </div>
        <Tasks :tasks="completedTasks" 
            :show="completedTasksIsVisible && showCompletedTasks"
            @updated="handleUpdatedTask" 
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
        />


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/task';
import { allTasks, createTask, updateTask, completeTask, removeTask} from '@/http/task-api';
import Tasks from '@/components/tasks/Tasks.vue';
import NewTask from '@/components/tasks/NewTask.vue';
import { storeToRefs } from 'pinia';


const store = useTaskStore();
// store.task.name = "First Task";
// store.task.is_completed = true;

// store.$patch({ 
//     task: {
//         name: "First Task Updated using $patch",
//         is_completed: true 
//     }
// });

const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

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

    // console.log('without refs',store.task);
    // console.log('with refs', task.value);

};

// Fetch tasks when the component is mounted
// onMounted(fetchTasks);
onMounted(async () => {
    await fetchAllTasks();
});

// const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
// const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))

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

const handleCompletedTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    })

    const currentTask = tasks.value.find(item => item.id === task.id)

    currentTask.is_completed = updatedTask.data.is_completed
}

const handleRemovedTask = async (task) => {
    await removeTask(task.id)
    const index = tasks.value.findIndex(item => item.id === task.id)
    tasks.value.splice(index, 1)
}
</script>


<style scoped>
/* You can add additional styling here if needed */
</style>