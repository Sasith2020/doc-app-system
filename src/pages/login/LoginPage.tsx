import LoginCard from '../../components/login/LoginCard'

type LoginPageProps = {
  onSuccess: () => void
}

function LoginPage({ onSuccess }: LoginPageProps) {
  return (
    <section className="login-page">
      <LoginCard onSuccess={onSuccess} />
    </section>
  )
}

export default LoginPage
