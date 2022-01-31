<template>
    <div>
        <h1>Preview</h1>
        <img :src="src" :alt="alt">
    </div>
</template>

<script>
export default {
    name: "Preview",
    props: {
        src: String,
        alt: String
    }
}
</script>