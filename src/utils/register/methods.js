import React from 'react'
//import {stringify} from 'qs'

import DismissableMessage from '../../components/messages/DismissableMessage'

import API from '../../api/config'

export function displayMessage (response) {
  console.log( response)
  if (response.status && (response.code !== 0)) return (
    <DismissableMessage error={response.msg.includes('Authentication failed')} header='Registration Failed' content="Failed to register with facebook" />
  )
  if (response.status && (response.status === 'OK')) return (
    <DismissableMessage success={response.status === 'OK'} header="Registration Success" content="Your data has been submitted" />
  )
  if (response.message && (response.message.includes('Authentication failed'))) return (
    <DismissableMessage error={response.message.includes('Authentication failed')} header='Registration Failed' content="Failed to register with facebook" />
  )
  if (response.message && (response.message.includes('Network Error'))) return (
    <DismissableMessage error={response.message.includes('Network Error')} header='Registration Failed' content="Failed to submit your data, please try again" />
  )
}

export function submitRegisterData (data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return new Promise((resolve, reject) => {
    API.post('/event/registration', (formData))
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}
