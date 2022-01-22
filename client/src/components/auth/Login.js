import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() 
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      console.log('You are logged in!')
      console.log('Token is', data.token )
    } catch (err) {
      setIsError(true)
    }

  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="login-wrap">
        <div className="login-content-wrap">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="form-wrap">
            <label htmlFor="email">Email Address</label>
            <input 
              onChange={handleChange}
              className="form-field-spacing input" 
              type="text" 
              name="email" 
              placeholder='Email Address'/>
            <label htmlFor="password">Password</label>
            <input 
              onChange={handleChange}
              className="form-field-spacing input" 
              type="password" 
              name="password" 
              placeholder='Password'/>
            <input 
              className="form-field-spacing" 
              type="submit" 
              value="Submit"/>
          </form>
          {isError ? <p>Either email or password were incorrect</p> : <p></p>}
        </div>
      </div>
    </>

  )
}

export default Login