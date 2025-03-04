<template>
    <!-- Action Buttons -->
    <div>
        <!-- Edit button disabled for completed tasks -->
        <button class="btn btn-warning btn-sm" @click="$event => emit('edit')">
            Edit
        </button>

        <!-- Delete button -->
        <button class="btn btn-danger btn-sm" @click="$event => emit('remove')">
            Delete
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['edit', 'remove'])
</script>