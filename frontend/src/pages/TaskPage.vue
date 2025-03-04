<template>
    <div class="container mt-5 d-flex flex-column align-items-center">
        <NewTask />
        <Tasks :tasks="uncompletedTasks" />
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
import { useTaskStore } from '@/stores/task';
import Tasks from '@/components/tasks/Tasks.vue';
import NewTask from '@/components/tasks/NewTask.vue';
import { storeToRefs } from 'pinia';


const store = useTaskStore();

const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

onMounted(async () => {
    await fetchAllTasks();
});

const showToggleCompletedBtn = computed(() =>
    uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const completedTasksIsVisible = computed(() =>
    uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);

const showCompletedTasks = ref(false);

</script>


<style scoped>
/* You can add additional styling here if needed */
</style>