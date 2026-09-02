import LoginForm from "../../components/auth/loginForm";
import Logo from "../../components/common/Logo";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Link } from "react-router-dom";
import "./LoginPage.css"

export default function Login() {
  return (
    <AuthLayout>
      <main className="auth-page">
        <section className="auth-brand">
          <div className="brand-content">
            <div className="brand-title">

              <Logo />
              <h1>ED.APP</h1>

            </div>
            <p>
              Digital workflow platform for the Emergency
              Department. Faster registration, live triage
              queues, and real-time visibility for nurses,
              doctors, and administrators.
            </p>

          </div>

        </section>  

        <section className="auth-form-section">
          <div className="login-form-container">
            <h2>Welcome back</h2>

            <p className="auth-subtitle">
              Sign in with your staff credentials to continue
            </p>

            <LoginForm />

            <ul className="login-links">
              <li>
                <Link to="/forgot-password">
                  Forgot password
                </Link>
              </li>

              <li>

                <Link to="/signup">
                  New staff member? <span>Create an account</span>
                </Link>

              </li>
            </ul>
                         
          </div>
          
        </section>    
        
    </main>

    </AuthLayout>
    
  )
}