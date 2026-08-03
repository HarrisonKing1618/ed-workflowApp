import LoginForm from "../../components/auth/loginForm";
import Logo from "../../components/common/Logo";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Link } from "react-router-dom";
import "./LoginPage.css"

export default function Login() {
  return (
    <AuthLayout>
      <main className="login-page">
        <header>
          <Logo />
          <h1>ED.APP</h1>
          <p>Staff Sign-in</p>
        </header>
        
        <LoginForm />
        <ul>
          <li><Link to="/forgot-password"> Forgot Password</Link></li>
          <li><a href="#">Trouble signing in? Contact Admin</a></li>
        </ul>
    </main>

    </AuthLayout>
    
  )
}