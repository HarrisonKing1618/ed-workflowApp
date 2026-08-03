import { Link } from "react-router-dom";
import ForgotPassword from "../../components/auth/ForgotPassword";
import Logo from "../../components/common/Logo";
import AuthLayout from "../../components/Layout/AuthLayout";
import "./ForgotPasswordPage.css"

export default function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <main className="forgotPasswordPage">
                <header>
                    <Logo />
                    <h1>Forgot Password</h1>
                    <p>Enter your staff email to reset access</p>
                </header>
                <ForgotPassword />
                <div className="link-container">
                    <Link to="/" className="link">Back to login</Link>
                </div>
                
            </main>
        </AuthLayout>
    )
}
