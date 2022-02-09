<template>
    <div class="container mx-auto">
        <div class="bg-white flex flex-wrap mx-auto p-12 border-1 rounded-lg shadow-md w-4/5">
            <div class="w-1/2">
                <preview :src='src !="" ? src + filters : src = src = ""' :alt="alt" @previmg="prevImg()" :loading="loading"/>
            </div>
            <div class="w-1/2">
                <form>
                    <keep-alive>
                        <component :is="view" :step="step" :preview="src + filters" :loading="loading"/>
                    </keep-alive>
                </form>  
            </div>
            <div class="flex justify-between pt-8 w-full">
                <button class="bg-blue-500 p-2 rounded text-white w-20 hover:bg-blue-600 disabled:bg-blue-100" @click.prevent="changeStep(-1); this.disableNext = false;" :disabled="this.step === 0">Wstecz</button>
                <h3>Cena: {{ price = sidesPrice + grayscalePrice + blurPrice }}</h3>
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
            filters: "",
            grayscale: "",
            blur: "",
            blurVal: "=1",
            price: 10,
            sidesPrice: 10,
            grayscalePrice: 0,
            blurPrice: 0,

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
            side === "Obustronnie" ? this.sidesPrice = 20 : this.sidesPrice = 10; 
            this.alt = side;
        },

        drawImage() {
            let rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);

            let img = "https://picsum.photos/seed/"+ rand +"/400";
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
        },
        addFilters() {

            let prefix;
            let prefix2;
            this.grayscale === "" ? prefix = "" : prefix = "?";
            if(prefix === ""){
                prefix2 = "?";
            } else {
                prefix2 = "&";
            }

            let filter = prefix + this.grayscale + prefix2 + this.blur + this.blurVal;
            this.preload(this.src + filter).then(() => {
                this.loading = false;
            });

            this.filters = filter;
        },
        toggleGrayscale() {
            if(this.grayscale === "") {
                this.grayscale = "grayscale";
                this.grayscalePrice = 2;
                console.log(this.src);
            } else {
                this.grayscale = "";
                this.grayscalePrice = 0 ;
                console.log(this.src);
            }
            this.addFilters();
        },
        toggleBlur() {
            if (this.blur === "") {
                this.blur = "blur";
                this.blurPrice = 3;
            } else {
                this.blur = "";
                this.blurPrice = 0;
                this.changeBlur();
            }
            console.log(this.grayscale);
            console.log(this.blur);
            this.addFilters();
        },
        changeBlur(val) {
            if (this.blur === ""){
                this.blurVal = "";
            } else {
                this.blurVal = "=" + val;
                console.log(this.blurVal);
                this.addFilters();
            }
        },
        orderData(obj) {
            obj.price = this.price;
            console.log(obj);
        },

    },
    mounted() {
        this.eventBus.on("side", this.changeSide);
        this.src = this.drawImage();
        this.eventBus.on("prev-img", this.prevImg);
        this.eventBus.on("draw-next-img", this.drawNextImg)
        this.eventBus.on("next-img", this.nextImg)
        this.eventBus.on("toggle-grayscale", this.toggleGrayscale);
        this.eventBus.on("toggle-blur", this.toggleBlur);
        this.eventBus.on("blur", this.changeBlur);
        this.eventBus.on("invalidForm", this.formInvalid);
        this.eventBus.on("validForm", this.formValid);
        this.eventBus.on("formData", this.orderData);
    }
}
</script>
