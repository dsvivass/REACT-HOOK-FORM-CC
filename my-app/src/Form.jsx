import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './form.css'

// Define schema
const schema = yup.object({

    firstName: yup.string()
        .required(),

    age: yup.number()
        .positive()
        .integer('My custom integer message')
        .required()
        .typeError('A number is required'),

    birthDate: yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),

}).required();

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            {errors.firstName && <p>{errors.firstName?.message}</p>}

            <input {...register("age")} />
            {errors.age && <p>{errors.age?.message}</p>}

            <input {...register("birthDate")} />
            {errors.birthDate && <p>{errors.birthDate?.message}</p>}

            <input type="submit" />
        </form>
    );
}