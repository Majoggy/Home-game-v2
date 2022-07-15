import React from 'react'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
// import { isAuthenticated } from '../../lib/auth'

function Login() {
  const navigate = useNavigate()

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  // const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      console.log(data.message)
      navigate('/dashboard')
    } catch (err) {
      setIsError(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsError(false)
  }

  // React.useEffect(() => {
  //   const redirect = () => {
  //     if (loggedIn) {
  //       navigate('/dashboard')
  //     }
  //   }
  //   redirect()
  // })

  return (
    <>
      <h1>Home Game Tracker</h1>
      <form onSubmit={handleSubmit} className="form-wrap">
        <label htmlFor="email">Email Address</label>
        <input
          onChange={handleChange}
          className="form-field-spacing input"
          type="email"
          name="email"
          placeholder="Email Address"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          className="form-field-spacing input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className="form-field-spacing" type="submit" value="Submit" />
        <div className="link-text">
          <p>Not registered? Sign up here</p>
          <p>I&apos;m just looking, thanks</p>
          {isError ? <p className="err">Either email or password were incorrect</p> : <p className="err"></p>}
        </div>
      </form>
    </>
  )
}

export default Login