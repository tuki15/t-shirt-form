<template>
    <div>
        <div>
            <preview :src='src !="" ? src : src = src = ""' :alt="alt" @previmg="prevImg()"/>
        </div>
        <div>
            <form>
                <keep-alive>
                    <component :is="view" :step="step" :preview="src"/>
                </keep-alive>
            </form>  
        </div>
        <button @click.prevent="changeStep(-1)" :disabled="this.step === 0">Wstecz</button>
        <button @click.prevent="changeStep(1)" :disabled="this.step === 4">Dalej</button>
    </div>
</template>

<script>

import SidePicker from './SidePicker.vue';
import ImagePicker from './ImagePicker.vue';
import AddressForm from './AddressForm.vue';
import Preview from './Preview.vue';

export default {
    name: 'Order',
    data() {
        return {
            view: "side-picker",
            step: 0,
            src: "",
            src1: "",
            src2: "",
            alt: "Przód"
        }
    },
    components: {
        "side-picker": SidePicker,
        "image-picker": ImagePicker,
        "address-form": AddressForm,
        "preview": Preview,
    },
    methods: {
        changeView() {
            if(this.step === 0){
                this.view = "side-picker"
            }else if(this.step === 1){
                this.view = "image-picker"
            }else if(this.step === 2){
                this.view = "address-form"
            }
        },
        changeStep(dir) {
            this.step += dir;
            console.log(this.step);
            this.changeView();
        },
        changeSide(side) {
            this.alt = side;
        },
        getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        drawImage() {
            let img = "https://picsum.photos/id/"+ this.getRandomIntInclusive(1,1000) +"/200";
            this.$root.$emit("src", img);
            return img;
        },
        prevImg() {
            this.src = this.src1;
        },
        drawNextImg() {
            this.src2 = this.drawImage();
            this.src1 = this.src;
            this.src = this.src2;
        },
        nextImg() {
            this.src = this.src2;
        }
    },
    mounted() {
        this.eventBus.on("side", this.changeSide);
        this.src = this.drawImage(this.src);
        this.eventBus.on("prev-img", this.prevImg);
        this.eventBus.on("draw-next-img", this.drawNextImg)
        this.eventBus.on("next-img", this.nextImg)
    }
}
</script>
