import AuthLayout from "../../components/Layout/AuthLayout";
import Logo from "../../components/common/Logo";
import ResetPassword from "../../components/auth/ResetPassword";
export default function ResetPasswordPage() {
    return (
        <AuthLayout>
            <main className="resetPasswordPage">
                <header>
                    <Logo />
                    <h1>Reset Password</h1>
                    <p>Choose a new password</p>
                </header>
                
                <ResetPassword />
            </main>
        </AuthLayout>
    )
}