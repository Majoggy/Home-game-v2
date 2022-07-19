import React from 'react'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
// import { isAuthenticated } from '../../lib/auth'
import styled from 'styled-components'
import { ContentWrapLogin } from '../components/ContentWrap.style'

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
    <ContentWrapLogin>
      <Wrapper>
        <Title>Home Game Tracker</Title>
        <Form onSubmit={handleSubmit}>
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
          <Submit type="submit" value="Submit" />
          <TextWrapper>
            <p>Not registered? Sign up here</p>
            <p>I&apos;m just looking, thanks</p>
            {isError ? (
              <ErrorText className="err">
                Either email or password were incorrect
              </ErrorText>
            ) : (
              <ErrorText className="err"></ErrorText>
            )}
          </TextWrapper>
        </Form>
      </Wrapper>
    </ContentWrapLogin>
  )
}

export default Login

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

const Label = styled.label`
  margin: 7px;
  font-size: 13px;
`

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  padding-left: 25px;
  height: 30px;
  width: 250px;
  background-color: #fcd9d9;
  border: none;
  /* border: 2px solid black; */
  border-radius: 2px;
  transition: 0.5s;
`

const Submit = styled.input`
  margin: 10px;
  margin-top: 30px;
  /* margin-left: auto;
  margin-right: auto; */
  padding: 10px;
  height: 50px;
  width: 150px;
  background-color: #dd746c;
  color: white;
  border: none;
  border-radius: 2px;
  transition: 0.5s;
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
