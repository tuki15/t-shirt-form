<template>
    <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold mb-8">Wybierz zdjęcie</h1>
        <div class="relative"> 
            <img class="mb-4 rounded w-96" :src="preview" :class=' loading === true ? ["bg-gray-400","opacity-50"] : ""'>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading === true">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle class="opacity-50" cx="12" cy="12" r="10" fill="#fff" stroke="#999" stroke-width="4"></circle>
                    <path class="opacity-75" fill="#3b82f6" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
        <div class="mb-8 flex flex-col items-center xl:block">
            <button class="bg-blue-500 m-1 p-2 rounded text-white w-24 hover:bg-blue-600" @click.prevent="prevImg()">Poprzedni</button>
            <button class="bg-blue-500 m-1 p-2 rounded text-white w-30 hover:bg-blue-600" @click.prevent="drawNextImg()">Losuj kolejny</button>
            <button class="bg-blue-500 m-1 p-2 rounded text-white w-24 hover:bg-blue-600" @click.prevent="nextImg()">Kolejny</button>
        </div>
        <div>
            <h2 class="text-center text-xl mb-2">Dodaj efekt:</h2>
            <input type="checkbox" id="grayscale" @change="toggleGrayscale()">
            <label for="grayscale" class="ml-2">Skala szarości</label>
            <br>
            <input type="checkbox" id="blur" @change="toggleBlur()">
            <label for="blur" class="ml-2">Rozmycie</label>
            <br>
            <input type="range" id="blurVal" v-if="blur === true" v-model="blurVal" min="1" max="10" step="1" @change="changeBlur()">
            <br>
            <label for="blurVal" v-if="blur === true">Poziom: {{ blurVal }}</label>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImagePicker",
    data() {
        return {
            blur: false,
            blurVal: "1"
        }
    },
    props: {
        preview: String,
        loading: Boolean
    },
    methods: {
        drawNextImg() {
            this.eventBus.emit("draw-next-img")
        },
        nextImg() {
            this.eventBus.emit("next-img")
        },
        prevImg() {
            this.eventBus.emit("prev-img");
        },
        toggleGrayscale() {
            this.eventBus.emit("toggle-grayscale");
        },
        toggleBlur() {
            this.blur = !this.blur;
            this.eventBus.emit("toggle-blur");
        },
        changeBlur() {
            this.eventBus.emit("blur", this.blurVal)
        },

    }
}
</script>