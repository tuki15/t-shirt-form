<template>
    <div>
        <h1 class="text-2xl font-bold text-center mb-8">{{ heading }}</h1>
        <Form @submit="submitForm" @invalid-submit="onInvalidSubmit" :validation-schema="schema" class="flex flex-col items-center">

            <Field 
                name="name" 
                label ="Imię" 
                placeholder="Imię" 
                class="border rounded py-1 px-2 mb-2" 
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="name" />

            <Field 
                name="surname" 
                label="Nazwisko" 
                placeholder="Nazwisko" 
                class="border rounded py-1 px-2 mb-2" 
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'    
            />
            <ErrorMessage name="surname" />

            <Field 
                name="street" 
                label="Ulica" 
                placeholder="Ulica" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="street" />

            <Field 
                name="streetNo" 
                label="Nr budynku" 
                placeholder="Nr budynku" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="streetNo" />

            <Field 
                name="flatNo" 
                label="Nr mieszkania" 
                placeholder="Nr mieszkania" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="flatNo" />

            <Field 
                name="postalCode" 
                label="Kod pocztowy" 
                placeholder="Kod pocztowy" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="postalCode" />

            <Field 
                name="city" 
                label="Miasto" 
                placeholder="Miasto" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="city" />

            <Field 
                name="phone" 
                label="Telefon" 
                placeholder="Telefon" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="phone" />

            <Field 
                name="email" 
                label="Adres e-mail" 
                placeholder="Adres e-mail" 
                class="border rounded py-1 px-2 mb-2"
                :class='{ 
                    "pointer-events-none": this.isFieldDisabled === true, 
                    "text-gray-400": this.isFieldDisabled === true 
                }'
            />
            <ErrorMessage name="email" /> 

            <button ref="send" hidden></button>
        </Form>
    </div>
</template>

<script>
import { Field, Form , ErrorMessage, defineRule, configure} from 'vee-validate'
import { alpha_spaces, digits, email, integer, regex, required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { setLocale } from '@vee-validate/i18n';
import pl from '@vee-validate/i18n/dist/locale/pl.json';

configure({
  generateMessage: localize({
    pl
  }),
});

setLocale('pl');

defineRule('alpha_spaces', alpha_spaces);

defineRule('digits', digits);

defineRule('email', email);

defineRule('integer', integer);

defineRule('regex', regex);

defineRule('required', required);


export default {
    name: "ImagePicker",
    data() {
        const schema = {
            name: 'required|alpha_spaces',
            surname: 'required|alpha_spaces',
            street: 'required|alpha_spaces',
            streetNo: 'required|integer',
            flatNo: 'required|integer',
            postalCode: 'required|regex:[0-9]{2}-[0-9]{3}',
            city: 'required|alpha_spaces',
            phone: 'required|digits:9',
            email: 'required|email',
        };

        return {
            heading: "Dane zamawiającego",
            send: "",
            schema,
            isFieldDisabled: "",
        };
    },
    components: {
        Field,
        Form,
        ErrorMessage
    },
    methods: {
        submitForm(values) {
            alert(JSON.stringify(values, null, 2));
            this.eventBus.emit("validForm");
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
        disableForm() {
            this.isFieldDisabled = true;
        },
        enableForm() {
            this.isFieldDisabled = false;
            console.log(this.isFieldDisabled);
        }
    },
    mounted(){
        this.send = this.$refs.send;
        this.eventBus.on("submit", this.validateForm);
        this.eventBus.on("disableForm", this.disableForm);
        this.eventBus.on("enableForm", this.enableForm);
    },
}   
</script>