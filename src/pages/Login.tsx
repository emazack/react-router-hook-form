// First import the react hook form useform
import { useForm } from 'react-hook-form'

// second create the inteface
interface LoginForm {
    email: string;
    password: string;
}

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function Login() {

    // third use the functions handlesubmit and register
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<LoginForm>({
        mode: 'onChange'
    });

    const onSubmit = (data: LoginForm) => {
        console.log(data);
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating m-2">
                <input
                    id="email-ctrl"
                    type="email"
                    className="form-control"
                    {...register('email', { required: true, pattern: EMAIL_REGEXP })}
                />
                <label htmlFor="email-ctrl">Email address</label>
                {isSubmitted && errors.email && errors.email.type === "required" && (
                    <span role="alert">This is required</span>
                )}
                {isSubmitted && errors.email && errors.email.type === "pattern" && (
                    <span role="alert">This is not an email</span>
                )}
            </div>
            <div className="form-floating m-2">
                <input
                    id="password-ctrl"
                    type="password"
                    className="form-control"
                    {...register('password', { required: true })}
                />
                <label htmlFor="password-ctrl">Password</label>
                {isSubmitted && errors.password && (
                    <span role="alert">This is required</span>
                )}
            </div>
            <button className="btn btn-primary">Login</button>
        </form>
    )
}