import { useForm } from 'react-hook-form'
import { useEffect } from 'react';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export interface RegisterForm {
  email: string,
  password: string,
  passwordRepeat: string
}

export function Register() {

  const { register, handleSubmit, formState: { errors, isSubmitted, isValid, isValidating }, getValues, trigger, watch } = useForm<RegisterForm>({
    mode: 'onChange'
  });

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  }

  // function that, given an email, will return true if it's a new email, or false if it's already taken.
  // In a real scenario, you won't receive all the usernames: you'll have a separate endpoint 
  // (for example /isTaken?username=foo) which tells you if it's taken or not.
  const validateEmail = (email: string) => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((users: Array<{ email: string }>) => {
        const emails = users.map(u => u.email);
        return !emails.includes(email);
      })
  }


  // The first paramater (that we called _) is the value of the entire form: 
  // we don't need that! The underscore is a convention for unused parameters.
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      // Inside watch, we must check if the change comes from the password field, 
      // and in that case we must trigger the validation for the passwordRepeat
      if (name === 'password') trigger('passwordRepeat')
    })
    return () => subscription.unsubscribe();
  }, [watch]);

  return <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className="form-floating m-2">
      <input
        id="email-ctrl"
        type="email"
        className="form-control"
        {...register('email', {
          required: true,
          pattern: EMAIL_REGEXP,
          validate: validateEmail
        })}
      />
      <label htmlFor="email-ctrl">Email address</label>
      {isSubmitted && errors.email && errors.email.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {isSubmitted && errors.email && errors.email.type === "pattern" && (
        <span role="alert">This is not an email</span>
      )}
      {isSubmitted && errors.email && errors.email.type === "validate" && (
        <span role="alert">This email already exists</span>
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
    <div className="form-floating m-2">
      <input
        id="password-repeat-ctrl"
        type="password"
        className="form-control"
        {...register('passwordRepeat', {
          required: true,
          validate: () => getValues('password') === getValues('passwordRepeat')
        })}
      />
      <label htmlFor="password-repeat-ctrl">Repeat password</label>
      {isSubmitted && errors.passwordRepeat?.type === 'required' && (
        <span role="alert">This is required</span>
      )}
      {isSubmitted && errors.passwordRepeat?.type === 'validate' && (
        <span role="alert">Passwords don't match</span>
      )}
    </div>
    <button
      className="btn btn-primary"
      disabled={isSubmitted && (!isValid || isValidating)}
    >Register</button>  
  </form>
}