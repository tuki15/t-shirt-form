<template>
    <div class="container mx-auto">
        <div class="bg-white flex flex-wrap mx-auto p-12 border-1 rounded-lg shadow-md w-4/5">
            <div class="w-full bg-gray-300 rounded-md mb-8">
                <div class="bg-blue-400 h-2 rounded-md" :style="{ 'width': 'calc('+ (step + 1) +' * 100% / 6 )' }"></div>
            </div>
            <div class="w-1/2">
                <preview :src='src !="" ? src + filters : src = src = ""' :alt="side" @previmg="prevImg()" :loading="loading"/>
            </div>
            <div class="w-1/2">
                <form>
                    <keep-alive>
                        <component :is="view" :step="step" :preview="src + filters" :loading="loading" :schema="formSchema" :order="order"/>
                    </keep-alive>
                </form>  
            </div>
            <div class="flex justify-between pt-8 w-full">
                <button class="bg-blue-500 p-2 rounded text-white w-20 hover:bg-blue-600 disabled:bg-blue-100" @click.prevent="changeStep(-1); this.disableNext = false;" :disabled="this.step === 0">Wstecz</button>
                <h3>Cena: {{ price = sidesPrice + grayscalePrice + blurPrice + deliveryPrice}}</h3>
                <button class="bg-blue-500 p-2 rounded text-white w-20 hover:bg-blue-600 disabled:bg-blue-100" @click.prevent="changeStep(1)" :disabled="this.step === 5">Dalej</button>
            </div>
        </div>
    </div>
</template>

<script>

import Preview from './Preview.vue';
import SidePicker from './SidePicker.vue';
import ImagePicker from './ImagePicker.vue';
import AddressForm from './AddressForm.vue';
import ThankYou from './ThankYou.vue';
import Delivery from './Delivery.vue';

export default {
    name: 'Order',
    data() {
        let formSchema = {
            fields: [
                {
                    label: 'Imię',
                    name: 'name',
                    placeholder: 'Imię', 
                    as: 'input',
                    type: 'text',
                    rules: 'required|alpha_spaces',
                    active: 'false'
                },
                {
                    label: 'Nazwisko',
                    name: 'surname',
                    placeholder: 'Nazwisko',
                    as: 'input',
                    type: 'text',
                    rules: 'required|alpha_spaces',
                    active: "true"
                },
                {
                    label: 'Ulica',
                    name: 'street',
                    placeholder: 'Ulica',
                    as: 'input',
                    type: 'text',
                    rules: 'required|alpha_spaces',
                    active: "true"
                },
                {
                    label: 'Nr budynku',
                    name: 'streetNo',
                    placeholder: 'Nr budynku',
                    as: 'input',
                    type: 'text',
                    rules: 'required|alpha_num',
                    active: "true"
                },
                {
                    label: 'Nr mieszkania',
                    name: 'flatNo',
                    placeholder: 'Nr mieszkania',
                    as: 'input',
                    type: 'text',
                    rules: 'required|integer',
                    active: "true"
                },
                {
                    label: 'Kod pocztowy',
                    name: 'postalCode',
                    placeholder: 'Kod pocztowy',
                    as: 'input',
                    type: 'text',
                    rules: 'required|regex:[0-9]{2}-[0-9]{3}',
                    active: "true"
                },
                {
                    label: 'Miasto',
                    name: 'city',
                    placeholder: 'Miasto',
                    as: 'input',
                    type: 'text',
                    rules: 'required|alpha_spaces',
                    active: "true"
                },
                {
                    label: 'Telefon',
                    name: 'phone',
                    placeholder: 'Telefon',
                    as: 'input',
                    type: 'text',
                    rules: 'required|digits:9',
                    active: "true"
                },
                {
                    label: 'Adres e-mail',
                    name: 'email',
                    placeholder: 'Adres e-mail',
                    as: 'input',
                    type: 'email',
                    rules: 'required|email',
                    active: "true"
                },
            ],
        };
        return {
            view: "side-picker",
            step: 0,
            src: "",
            src1: "",
            src2: "",
            side: "Przód",
            isFormValid: false,
            loading: false,
            filters: "",
            grayscale: "",
            blur: "",
            blurVal: 1,
            price: 10,
            sidesPrice: 10,
            grayscalePrice: 0,
            blurPrice: 0,
            delivery: "",
            deliveryPrice: 0,
            formSchema,
            order: {},
        }
    },
    components: {
        "preview": Preview,
        "side-picker": SidePicker,
        "image-picker": ImagePicker,
        "address-form": AddressForm,
        "delivery": Delivery,
        "thank-you": ThankYou
    },
    methods: {
        changeView() {
            if(this.step === 0) {
                this.view = "side-picker"
            } else if(this.step === 1) {
                this.view = "image-picker"
            } else if(this.step === 2) {
                this.toggleFormActive(true);
                this.view = "address-form";
            } else if(this.step === 3) {
                this.toggleFormActive(false);
                this.view = "address-form"; 
            } else if(this.step === 4) {
                this.view = "delivery";
            } else if(this.step === 5) {
                this.view = "thank-you";
            } 
        },
        changeStep(dir) {
            if(this.step === 2 && dir > 0 || this.step === 3 && dir > 0) {
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
            side === "obustronnie" ? this.sidesPrice = 20 : this.sidesPrice = 10; 
            this.side = side;
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

            let filtersUrl= prefix + this.grayscale + prefix2 + this.blur + this.blurVal;
            this.preload(this.src + filtersUrl).then(() => {
                this.loading = false;
            });

            this.filters = filtersUrl;
        },
        toggleGrayscale() {
            if(this.grayscale === "") {
                this.grayscale = "grayscale";
                this.grayscalePrice = 2;
            } else {
                this.grayscale = "";
                this.grayscalePrice = 0 ;
            }
            this.addFilters();
        },
        toggleBlur() {
            if (this.blur === "") {
                this.blur = "blur=";
                this.blurPrice = 3;
            } else {
                this.blur = "";
                this.blurPrice = 0;
                this.changeBlur();
            }
            this.addFilters();
        },
        changeBlur(val) {
            if (this.blur === ""){
                this.blurVal = "";
            } else {
                this.blurVal = val;
                this.addFilters();
            }
        },
        orderData(obj) {
            obj.price = this.price;
            obj.side = this.side;
            obj.effect1 = this.grayscale;
            obj.effect2 = this.blurVal;
            obj.delivery = this.delivery;
            this.order = obj;
            console.log(this.order);
        },
        toggleFormActive(bool) {
            this.eventBus.emit("isFormActive", bool)

            for(let i = 0; i < this.formSchema.fields.length; i++){
                this.formSchema.fields[i].active = bool;
            }
        },
        toggleFieldActive(index) {
            this.formSchema.fields[index].active = !this.formSchema.fields[index].active;
            console.log(index);
            console.log(this.formSchema.fields[index].active);
        },
        deliveryData(obj) {
            this.delivery = obj;
            this.delivery === "courier" ? this.deliveryPrice = 15 : this.deliveryPrice = 0;
        }

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
        this.eventBus.on("fieldIndex", this.toggleFieldActive);
        this.eventBus.on("delivery", this.deliveryData)
    }
}
</script>
