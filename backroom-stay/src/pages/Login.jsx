import '../styles/Login.css'
function Login() {
  return (
    <>
      <div className="login-container">
        <h1 className="brand-title">Kaya Stay</h1>
        <article className="card">
          <h2>Sign In</h2>
          <p>Let's pick up where you left off</p>
          <section className="form-section">
            <button className="google-btn" type="submit">
              Sign in with your Google Account
            </button>
            <div className="form-fields">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
              <button className="submit-btn" type="submit">Submit</button>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

export default Login;
