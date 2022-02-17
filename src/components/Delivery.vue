<template>
    <div>
        <h1 class="text-2xl font-bold text-center mb-8">Wybierz sposób dostawy</h1>
        <div>
            <input type="radio" id="personal" name="delivery" value="personal" @change="deliveryMethod">
            <label for="grayscale">Odbiór osobisty</label>
            <br>
            <input type="radio" id="courier" name="delivery" value="courier" @change="deliveryMethod">
            <label for="blur">Kurier</label>
        </div>
    </div>
</template>
<script>
export default {
    name: "Delivery",
    methods: {
        deliveryMethod(event) {
            this.eventBus.emit("delivery", event.target.value);
            console.log(event.target.value);
        }
    }
}
</script>