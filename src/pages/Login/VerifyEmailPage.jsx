import AuthLayout from "../../components/Layout/AuthLayout";
import VerifyEmailForm from "../../components/auth/verifyEmailForm";
import Logo from "../../components/common/Logo";
import { Link } from "react-router-dom";
import "./VerifyEmailPage.css"

export default function VerifyEmailPage() {
    return (
        <AuthLayout>
            <main className="auth-page">
                <section className="auth-brand">
                    <div className="brand-content">
                        <div className="brand-title">

                            <Logo />
                            <h1>ED.APP</h1>
                        </div>
                    </div>
                </section>

                <section className="auth-form-section">
                    <div className="verifyEmail-container">
                        <h2>Verify your account</h2>

                        <p className="auth-subtitle">
                            We sent a 6-digit verification code to your email. Enter it below to activate your account
                        </p>

                        <VerifyEmailForm />

                        <p>Didn't get a code? <Link to="/verify-email">Resend Code</Link></p>

                    </div>

                </section>
            </main>
        </AuthLayout>
    )
}