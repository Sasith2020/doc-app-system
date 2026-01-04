import LoginForm from './LoginForm'

type LoginCardProps = {
  onSuccess: () => void
}

function LoginCard({ onSuccess }: LoginCardProps) {
  return (
    <div className="login-card">
      <div>
        <p className="login-eyebrow">Document App System</p>
        <h1>Log in</h1>
        <p className="login-subtitle">
          Use your assigned credentials to access the workflow dashboard.
        </p>
      </div>
      <LoginForm onSuccess={onSuccess} />
      <div className="login-footer">
        <span>Need access?</span>
        <button type="button" className="link-btn">
          Request support
        </button>
      </div>
    </div>
  )
}

export default LoginCard
