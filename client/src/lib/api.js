import axios from 'axios'
import { getToken } from './auth'

import baseUrl from '../config'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * User Requests

// Login User
export function loginUser(formData) {
  return axios.post(`${baseUrl}/login`, formData)
}

// Register User
export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

// Profile View
export function profileUser() {
  return axios.get(`${baseUrl}/users/:userId`, headers())
}

// Get all users
export function getAllUsers() {
  return axios.get(`${baseUrl}/users`)
}
