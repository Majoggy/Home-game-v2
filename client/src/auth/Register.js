import React from 'react'
import { registerUser } from '../lib/api'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { ContentWrapRegister } from '../components/ContentWrap.style'

function Register() {
  const navigate = useNavigate()

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      navigate('/')
    } catch (err) {
      // console.log(e.response.data)
      setFormErrors(err.response.data.errors)
      console.log(formErrors)
      setIsError(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
    setIsError(false)
  }

  return (
    <ContentWrapRegister>
      <Wrapper>
        <Title>Home Game Tracker</Title>
        <Subtitle>Create a new account</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              onChange={handleChange}
              validationFailed={formErrors.firstName}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              onChange={handleChange}
              validationFailed={formErrors.lastName}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={handleChange}
              validationFailed={formErrors.email}
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </Div>
          <Div>
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={handleChange}
              validationFailed={formErrors.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <Label htmlFor="passwordConfirmation">Password</Label>
            <Input
              onChange={handleChange}
              validationFailed={formErrors.passwordConfirmation}
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
            />
            <Submit type="submit" value="Submit" />
          </Div>
        </Form>
      </Wrapper>
    </ContentWrapRegister>
  )
}

export default Register

const Wrapper = styled.div``

const Subtitle = styled.h2`
  font-size: 14px;
  margin: 8px;
  margin-top: 10px;
  margin-bottom: 15px;
`

const Title = styled.h1`
  font-size: 38px;
  font-weight: 500;
  margin: 8px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 7px;
  font-size: 12px;
`

const Input = styled.input`
  font-size: 12px;
  margin: 8px;
  margin-left: 7px;
  padding: 8px;
  padding-left: 15px;
  height: 20px;
  width: 200px;
  background-color: #fcd9d9;
  border: ${(props) =>
    props.validationFailed ? '2px red solid' : '2px solid transparent'};
  border-bottom: ${(props) =>
    props.validationFailed ? '2px red solid' : '2px solid transparent'};
  border-radius: 2px;
  transition: 0.5s;
  x &:focus,
  &:focus {
    color: white;
    background-color: #dd746c;
    outline: none;
    border-bottom: black 2px solid;

    ::placeholder {
      color: white;
      opacity: 1;
    }
  }
`

const Submit = styled.input`
  margin: 8px;
  margin-top: 30px;
  padding: 8px;
  height: 40px;
  width: 110px;
  background-color: #dd746c;
  color: white;
  border: none;
  border-bottom: 2px solid;
  border-radius: 2px;
  transition: 0.5s;

  &:active {
    border-bottom: black 2px solid;
    transition: 0.3;
    background-color: #dd746c;
  }
`
