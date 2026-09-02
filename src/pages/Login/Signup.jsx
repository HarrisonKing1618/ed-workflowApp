import SignupForm from "../../components/auth/SignupForm"
import Logo from "../../components/common/Logo"
import AuthLayout from "../../components/Layout/AuthLayout"
import "./Signup.css"
export default function Signup () {
    return (
        <AuthLayout>
            <main className="auth-page">
                <section className="auth-brand sign-up">
                    <div className="brand-title">

                        <Logo />
                        <h1>ED.APP</h1>

                    </div>
                </section>

                <section className="auth-form-section">
                    <div className="auth-form-container">
                        <h2>Create your account</h2>
                        <p>
                            Enter your details below. You'll receive a role assignment after admin approval
                        </p>
                        <SignupForm />
                    </div>
                </section>
            </main>
        </AuthLayout>
    )
}