export function Register() {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const password2 = formData.get('password-repeat');
      console.log(email, password, password2);
    }
  
    return <form noValidate onSubmit={onSubmit}>
      <div className="form-floating m-2">
        <input
          id="email-ctrl"
          type="email"
          name="email"
          className="form-control"
        />
        <label htmlFor="email-ctrl">Email address</label>
      </div>
      <div className="form-floating m-2">
        <input
          id="password-ctrl"
          type="password"
          name="password"
          className="form-control"
        />
        <label htmlFor="password-ctrl">Password</label>
      </div>
      <div className="form-floating m-2">
        <input
          id="password-repeat-ctrl"
          type="password"
          name="password-repeat"
          className="form-control"
        />
        <label htmlFor="password-repeat-ctrl">Repeat password</label>
      </div>
      <button className="btn btn-primary">Register</button>
    </form>
  }