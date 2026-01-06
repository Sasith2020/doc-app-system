import type { FormEvent } from 'react'

type LoginFormProps = {
  onSuccess: () => void
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSuccess()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>User ID</span>
        <input type="text" placeholder="Enter your user ID" />
      </label>
      <label className="field">
        <span>Password</span>
        <input type="password" placeholder="Enter your password" />
      </label>
      <button type="submit" className="primary-btn">
        Log in
      </button>
    </form>
  )
}

export default LoginForm
