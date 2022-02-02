<template>
    <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold mb-8">Wybierz zdjęcie</h1>
        <img class="mb-4 rounded w-96" :src="preview">
        <div>
            <button class="bg-blue-500 mx-1 p-2 rounded text-white w-24 hover:bg-blue-600" @click.prevent="PrevImg()">Poprzedni</button>
            <button class="bg-blue-500 mx-1 p-2 rounded text-white w-30 hover:bg-blue-600" @click.prevent="DrawNextImg()">Losuj kolejny</button>
            <button class="bg-blue-500 mx-1 p-2 rounded text-white w-24 hover:bg-blue-600" @click.prevent="NextImg()">Kolejny</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImagePicker",
    props: {
        preview: String
    },
    methods: {
        DrawNextImg() {
            this.eventBus.emit("draw-next-img")
        },
        NextImg() {
            this.eventBus.emit("next-img")
        },
        PrevImg() {
            this.eventBus.emit("prev-img");
        }
    }
}
</script>