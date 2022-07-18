import React from 'react'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
// import { isAuthenticated } from '../../lib/auth'
import styled from 'styled-components'

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
    <Wrapper>
      <Title>Home Game Tracker</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email Address</Label>
        <Input onChange={handleChange} type="email" name="email" placeholder="Email Address" />
        <Label htmlFor="password">Password</Label>
        <Input onChange={handleChange} type="password" name="password" placeholder="Password" />
        <Input type="submit" value="Submit" />
        <TextWrapper>
          <p>Not registered? Sign up here</p>
          <p>I&apos;m just looking, thanks</p>
          {isError ? (
            <ErrorText className="err">Either email or password were incorrect</ErrorText>
          ) : (
            <ErrorText className="err"></ErrorText>
          )}
        </TextWrapper>
      </Form>
    </Wrapper>
  )
}

export default Login

const Wrapper = styled.div``

const Title = styled.h1`
  font-size: 50px;
  margin: 10px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 10px;
  font-size: 25px;
`

const Input = styled.input`
  margin: 10px;
  padding: 15px;
  padding-left: 25px;
  height: 50px;
  background-color: #fcd9d9;
  border: none;
  transition: 0.5s;
`

const ErrorText = styled.p`
  margin-top: 10px;
`

const TextWrapper = styled.div`
  margin: 10px;
  height: 100px;
`
