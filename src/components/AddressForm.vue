<template>
    <div>
        <h1 class="text-2xl font-bold text-center mb-8">{{ heading }}</h1>
        <Form @submit="submitForm" @invalid-submit="onInvalidSubmit" class="flex flex-col items-center">
            <div
                v-for="(field, index) in schema.fields"
                :key="field.name"
            >
                <label :for="field.name">{{ field.label }}</label>
                <br>
                <div class="flex mb-2">
                    <Field 
                        :as="field.as" 
                        :id="field.name" 
                        :name="field.name"
                        :label="field.label" 
                        :type="field.type" 
                        :placeholder="field.placeholder" 
                        :rules="field.rules" 
                        class="border rounded py-1 px-2" 
                        :class=' field.active === false ? ["bg-gray-200","pointer-events-none"] : ""'
                    />
                    <button v-if="this.enableEdit" class="bg-blue-500 p-2 rounded hover:bg-blue-600 ml-2" @click.prevent='this.eventBus.emit("fieldIndex", index)'>
                        <PencilIcon v-if="field.active === false" class="h-5 w-5 text-white"/>
                        <CheckIcon v-if="field.active === true" class="h-5 w-5 text-white"/>
                    </button>
                </div>
                <br>
                <ErrorMessage :name="field.name" />
                <br>

            </div>
                <div v-if="this.enableEdit">
                    <h2>Dodatkowe opcje</h2>
                    <span>Zadruk: {{ this.order.side }}</span><br>
                    <span>Skala szarości: {{ grayscale }}</span><br>
                    <span>Rozmycie: {{ blurVal }}</span><br>
                </div>
            <button ref="send" hidden></button>
        </Form>
    </div>
</template>

<script>
import { Field, Form , ErrorMessage, defineRule, configure} from 'vee-validate'
import { alpha_num, alpha_spaces, digits, email, integer, regex, required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { setLocale } from '@vee-validate/i18n';
import pl from '@vee-validate/i18n/dist/locale/pl.json';
import { PencilIcon } from '@heroicons/vue/solid';
import { CheckIcon } from '@heroicons/vue/solid';

configure({
  generateMessage: localize({
    pl
  }),
});

setLocale('pl');

defineRule('alpha_num', alpha_num);
defineRule('alpha_spaces', alpha_spaces);
defineRule('digits', digits);
defineRule('email', email);
defineRule('integer', integer);
defineRule('regex', regex);
defineRule('required', required);

export default {
    name: "ImagePicker",
    data() {
        return {
            heading: "Dane zamawiającego",
            send: "",
            enableEdit: false,
            grayscale: "",
            blurVal: 0,
        };
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        order: {
            type: Object
        }
    },
    components: {
        Field,
        Form,
        ErrorMessage,
        PencilIcon,
        CheckIcon,
    },
    methods: {
        submitForm(values) {
            let data = values;
            this.eventBus.emit("validForm");
            this.eventBus.emit("formData", data)
        },
        validateForm() {
            this.send.click();
        },
        onInvalidSubmit({ results }) {
            let fields = []; 
            for(const val in results){
                fields.push(results[val].valid)
            }
            let invalid = [];
            invalid = fields.filter(function(val){ return val === false });
            console.log("invalid: " + invalid.length);
            if(invalid.length > 0){
                this.eventBus.emit("invalidForm");
                console.log("emitted");
            }
        },
        enableEditFields(bool) {
            bool = !bool
            this.enableEdit = bool;
            bool ? this.heading = "Podsumowanie zamówienia" : this.heading = "Dane zamawiającego";
            this.order.effect1.length > 0 ? this.grayscale = "tak" : this.grayscale = "nie";
            this.order.effect2.length > 0 ? this.blurVal = this.order.effect2 : this.blurVal = "nie";
        },
    },
    mounted(){
        this.send = this.$refs.send;
        this.eventBus.on("submit", this.validateForm);
        this.eventBus.on("isFormActive", this.enableEditFields);
    },
}   
</script>