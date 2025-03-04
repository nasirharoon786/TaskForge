<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <!-- Checkbox -->
        <input type="checkbox" class="form-check-input mt-0 completed" :checked="task.is_completed"
            @change="markTastAsCompleted" />

        <!-- Task Name with conditional class -->
        <div class="ms-2 flex-grow-1" :class="completedClass" @dblclick="$event => isEdit = true">
            <div class="relative" v-if="isEdit">
                <input class="form-control editable-task" type="text" :value="task.name"
                    @keyup.esc="$event => isEdit = false" v-focus="vFocus" @keyup.enter="updateTask" />
            </div>
            <span v-else>{{ task.name }}</span>
        </div>
        <!-- Action Buttons -->
        <TaskActions @edit="$event => isEdit = true" v-show="!isEdit" @remove="removeTask" />
    </li>

</template>

<script setup>
import { computed, ref } from 'vue';
import TaskActions from './TaskActions.vue';
// import { removeTask } from '@/http/task-api';
// import { updateTask } from '@/http/task-api';
const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

const completedClass = computed(() => props.task.is_completed ? "completed" : "")

const emit = defineEmits(['updated', 'removed', 'completed']);
const isEdit = ref(false);

const vFocus = {
    mounted: (el) => el.focus()
}
const updateTask = event => {
    const updatedTask = { ...props.task, name: event.target.value }
    isEdit.value = false
    emit('updated', updatedTask)
}

const markTastAsCompleted = event => {
    const updatedTask = { ...props.task, is_completed: !props.task.is_completed }
    emit('completed', updatedTask)
}

const removeTask = () => {
    if (confirm('Are you sure you want to delete this task?')) {
        emit('removed', props.task)
    }
}
</script>