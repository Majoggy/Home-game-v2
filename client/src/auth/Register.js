import React from 'react'
import { registerUser } from '../lib/api'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { ContentWrapLogin } from '../components/ContentWrap.style'

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
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      navigate('/login')
    } catch (err) {
      setIsError(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsError(false)
  }

  return (
    <ContentWrapLogin>
      <Wrapper>
        <Title>Home Game Tracker</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <Label htmlFor="email">Email Address</Label>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <Label htmlFor="passwordConfirmation">Password</Label>
          <Input
            onChange={handleChange}
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
          />
          <Submit type="submit" value="Submit" />
          <TextWrapper>
            {isError && (
              <ErrorText>Either email or password were incorrect</ErrorText>
            )}
          </TextWrapper>
        </Form>
      </Wrapper>
    </ContentWrapLogin>
  )
}

export default Register

const Wrapper = styled.div``

const Title = styled.h1`
  font-size: 38px;
  font-weight: 500;
  margin: 7px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const TextLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-style: italic;
`

const Label = styled.label`
  margin: 7px;
  font-size: 13px;
`

const Input = styled.input`
  margin: 10px;
  margin-left: 7px;
  padding: 10px;
  padding-left: 25px;
  height: 30px;
  width: 250px;
  background-color: #fcd9d9;
  border: none;
  border-bottom: 2px;
  border-radius: 2px;
  transition: 0.5s;

  &:focus,
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
  margin: 10px;
  margin-top: 30px;
  padding: 10px;
  height: 50px;
  width: 150px;
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

const ErrorText = styled.p`
  margin-top: 10px;
`

const TextWrapper = styled.div`
  margin: 13px;
  line-height: 14px;
  font-size: 10px;
  height: 100px;
`
