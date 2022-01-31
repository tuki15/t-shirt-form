<template>
    <div>
        <h1>ImagePicker</h1>
        <img :src="preview">
        <div>
            <button @click.prevent="PrevImg()">Poprzedni</button>
            <button @click.prevent="DrawNextImg()">Losuj kolejny</button>
            <button @click.prevent="NextImg()">Kolejny</button>
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