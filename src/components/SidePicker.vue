<template>
    <div class="text-center">
        <h1 class="text-2xl font-bold mb-8">Wybierz miejsce nadruku</h1>
        <select name="side" @change="sideChange">
            <option>Przód</option>
            <option>Tył</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SidePicker",
    methods: {
        sideChange(event) {
            this.$eventBus.emit("side", event.target.value);
        }
    }
}
</script>