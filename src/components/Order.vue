<template>
    <div class="container mx-auto">
        <div class="bg-white flex flex-wrap mx-auto p-12 border-1 rounded-lg shadow-md w-4/5">
            <div class="w-1/2">
                <preview :src='src !="" ? src : src = src = ""' :alt="alt" @previmg="prevImg()" :loading="loading"/>
            </div>
            <div class="w-1/2">
                <form>
                    <keep-alive>
                        <component :is="view" :step="step" :preview="src" :loading="loading"/>
                    </keep-alive>
                </form>  
            </div>
            <div class="flex justify-between pt-8 w-full">
                <button class="bg-blue-500 p-2 rounded text-white w-20 hover:bg-blue-600 disabled:bg-blue-100" @click.prevent="changeStep(-1); this.disableNext = false;" :disabled="this.step === 0">Wstecz</button>
                <button class="bg-blue-500 p-2 rounded text-white w-20 hover:bg-blue-600 disabled:bg-blue-100" @click.prevent="changeStep(1)" :disabled="this.step === 4">Dalej</button>
            </div>
        </div>
    </div>
</template>

<script>

import SidePicker from './SidePicker.vue';
import ImagePicker from './ImagePicker.vue';
import AddressForm from './AddressForm.vue';
import Preview from './Preview.vue';
import ThankYou from './ThankYou.vue';

export default {
    name: 'Order',
    data() {
        return {
            view: "side-picker",
            step: 0,
            src: "",
            src1: "",
            src2: "",
            alt: "Przód",
            isFormValid: false,
            loading: false,
        }
    },
    components: {
        "side-picker": SidePicker,
        "image-picker": ImagePicker,
        "address-form": AddressForm,
        "preview": Preview,
        "thank-you": ThankYou
    },
    methods: {
        changeView() {
            if(this.step === 0) {
                this.view = "side-picker"
            } else if(this.step === 1) {
                this.view = "image-picker"
            } else if(this.step === 2) {
                this.view = "address-form";
                this.eventBus.emit("enableForm");
            } else if(this.step === 3) {
                this.eventBus.emit("disableForm");  
            } else if(this.step === 4) {
                this.view = "thank-you";
            }
        },
        changeStep(dir) {
            if(this.step === 2 && dir > 0){
                this.eventBus.emit("submit");

                setTimeout(() => {
                    if(this.isFormValid === false){
                        console.log("disabled");
                    } else {
                        this.step += dir;
                        console.log(this.step);
                        this.changeView();
                    }
                }, 100);
            } else {
                this.step += dir;
                this.changeView();
                console.log(this.step);
            }           
        },
        changeSide(side) {
            this.alt = side;
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        drawImage() {
            let img = "https://picsum.photos/id/"+ this.getRandomInt(1,1000) +"/400";
            this.preload(img).then(() => {
                this.loading = false;
            });
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
        },
        formInvalid() {
            this.isFormValid = false;
        },
        formValid() {
            this.isFormValid = true;
        },
        preload(url) {

            const img = document.createElement("img");

            this.loading = true;
            const p = new Promise(function(resolve, reject){
                img.onload = () => resolve(url);
                img.onerror = () => reject(() => { 
                        console.log("reject");
                        //this.drawImage(this.src);
                });
            });
            img.src = url;
            console.log("src: " + img.src);
            return p;
        }
    },
    mounted() {
        this.eventBus.on("side", this.changeSide);
        this.src = this.drawImage();                    //ale drawImage nie przyjmuje parametrów o.O
        this.eventBus.on("prev-img", this.prevImg);
        this.eventBus.on("draw-next-img", this.drawNextImg)
        this.eventBus.on("next-img", this.nextImg)
        this.eventBus.on("invalidForm", this.formInvalid);
        this.eventBus.on("validForm", this.formValid);
    }
}
</script>
