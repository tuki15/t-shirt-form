<template>
    <div class="text-center">
        <h1 class="text-2xl font-bold mb-8">Wybierz miejsce nadruku</h1>
        <select name="side" @change="sideChange" class="
            px-3
            py-1.5
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <option>przód</option>
            <option>tył</option>
            <option>obustronnie</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SidePicker",
    methods: {
        sideChange(event) {
            this.eventBus.emit("side", event.target.value);
        }
    }
}
</script>