<template>
    <div class="flex flex-wrap justify-center">
        <h1 class="text-2xl font-bold text-center mb-8 w-full">Wybierz sposób dostawy</h1>
        <div>
            <input type="radio" id="personal" name="delivery" value="personal" @change="deliveryMethod">
            <label for="personal" class="ml-2">Odbiór osobisty</label>
            <br>
            <input type="radio" id="courier" name="delivery" value="courier" @change="deliveryMethod">
            <label for="courier" class="ml-2">Kurier</label>
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