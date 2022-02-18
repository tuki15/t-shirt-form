<template>
    <div class="bg-no-repeat bg-contain bg-center max-w-full w-96 h-96 mx-auto flex justify-center items-center md:mt-12" :class="checkSide" >
        <div class="transform -translate-y-8 relative w-2/6">
            <img class="rounded w-full" :src="src" :alt="alt" :class=' loading === true ? ["bg-gray-400","opacity-50"] : ""'>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading === true">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle class="opacity-50" cx="12" cy="12" r="10" fill="#fff" stroke="#999" stroke-width="4"></circle>
                    <path class="opacity-75" fill="#3b82f6" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "Preview",
    props: {
        src: String,
        alt: String,
        loading: Boolean
    },
    computed: {
        checkSide() {
            if(this.alt === "Przód") {
                return "bg-front"
            }else {
                return "bg-back"
            }
        }
    }
}
</script>
