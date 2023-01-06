# Table of Contents

- [Table of Contents](#table-of-contents)
- [REACT-HOOK-FORM-CC](#react-hook-form-cc)
  - [Installation](#installation)
  - [Concepts](#concepts)
    - [Register](#register)

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