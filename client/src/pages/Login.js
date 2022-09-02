import React from 'react'
import { useMutation, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`;

export default function Login(props){
  const loginUser = useMutation(LOGIN_USER)
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({
    email: '',
    password: ''
  });

  const handleLoginUser = async (event) => {
    event.preventDefault()
    let user, token
    const userData = await loginUser()

    user = userData.user
    token = userData.token

    localStorage.setItem('token', token)
    props.setUser(user)

    navigate('/dash')
  }

  const handleInput = (event) => {
    setFormInput(event.target.value)
  }

  return (
    <div>
        <h2>This is the login page</h2>
            <form>
            <input onChange={handleInput} value={formInput.email} type="text" placeholder="Email" />
            <input onChange={handleInput} value={formInput.password} type="password" placeholder="Password" />
            <button onClick={handleLoginUser}>Submit</button>
            </form>
    </div>
  )
}