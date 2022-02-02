<template>
    <div class="bg-no-repeat bg-contain bg-center w-96 h-96 mx-auto flex justify-center items-center" :class="checkSide" >
        <img class="rounded w-24 h-24 transform -translate-y-8" :src="src" :alt="alt">
    </div>
</template>

<script>
//require('./assets/logo.png');
export default {
    name: "Preview",
    props: {
        src: String,
        alt: String
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
