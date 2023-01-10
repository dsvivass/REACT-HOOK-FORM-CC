# Table of Contents

- [Table of Contents](#table-of-contents)
- [REACT-HOOK-FORM-CC](#react-hook-form-cc)
  - [Installation](#installation)
  - [Concepts](#concepts)
    - [Register](#register)
    - [Validation Rules](#validation-rules)
    - [Handling Errors](#handling-errors)
- [YUP](#yup)
  - [Schema Validation](#schema-validation)
    - [Installation](#installation-1)
    - [Usage](#usage)

# REACT-HOOK-FORM-CC

React Hook Form is a library that helps you to build forms in React.

## Installation

```bash
    npm install react-hook-form
```

## Concepts

### Register

This will make its value available for both the form validation and submission.

> ⚠️ Note: Each field is required to have a name as a key for the registration process.

```jsx
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            <select {...register("gender")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select>
            <input type="submit" />
        </form>
    );
    }
```

### Validation Rules

> ⚠️ We can use **Yup** as well, check [this](#schema-validation) section.

React Hook Form makes form validation easy by aligning with the existing HTML standard for form validation.

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

> Check the detailed options in the following link: [react-hook-form options](https://react-hook-form.com/api/useform/register)

```jsx
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true, maxLength: 20 })} />
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
        </form>
    );
    }
```

### Handling Errors

React Hook Form provides an errors object to show you the errors in the form. errors' type will return given validation constraints. The following example showcases a required validation rule.

```jsx
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input 
            {...register("firstName", { required: true })} 
            aria-invalid={errors.firstName ? "true" : "false"} 
        />
        {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}

        <input 
            {...register("mail", { required: "Email Address is required" })} 
            aria-invalid={errors.mail ? "true" : "false"} 
        />
        {errors.mail && <p role="alert">{errors.mail?.message}</p>}
        
        <input type="submit" />
        </form>
    );
    }
```

# YUP

## Schema Validation

We can use **Yup** in our forms.

### Installation

```bash
    npm install @hookform/resolvers yup
```

### Usage

```jsx
    import { useForm } from "react-hook-form";
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from "yup";

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
```

