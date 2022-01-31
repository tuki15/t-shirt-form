<template>
    <div>
        <h1>Address</h1>
        <Form @submit="submit" :validation-schema="schema">
            <Field name="name" label ="Imię" placeholder="Imię"/>
            <ErrorMessage name="name" />

            <Field name="surname" label="Nazwisko" placeholder="Nazwisko"/>
            <ErrorMessage name="surname" />

            <Field name="street" label="Ulica" placeholder="Ulica"/>
            <ErrorMessage name="street" />

            <Field name="streetNo" label="Nr budynku" placeholder="Nr budynku"/>
            <ErrorMessage name="streetNo" />

            <Field name="flatNo" label="Nr mieszkania" placeholder="Nr mieszkania"/>
            <ErrorMessage name="flatNo" />

            <Field name="postalCode" label="Kod pocztowy" placeholder="Kod pocztowy"/>
            <ErrorMessage name="postalCode" />

            <Field name="city" label="Miasto" placeholder="Miasto"/>
            <ErrorMessage name="city" />

            <Field name="phone" label="Telefon" placeholder="Telefon"/>
            <ErrorMessage name="phone" />

            <Field name="email" label="Adres e-mail" placeholder="Adres e-mail"/>
            <ErrorMessage name="email" />
            
            <button>Wyślij</button>
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
            email: 'required|email'
        };

        return {
            schema,
        };
    },
    components: {
        Field,
        Form,
        ErrorMessage
    },
    methods: {
        // Validator function
        isRequired(value) {
        return value ? true : 'To pole jest wymagane';
        },
    }
}
</script>
<style>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input{
        width: 200px;
    }
</style>