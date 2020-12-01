import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexSprints = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sprints',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showSprint = (user, sprintId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sprints/' + sprintId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteSprint = (user, sprintId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/sprints/' + sprintId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createSprint = (user, sprint) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sprints',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { sprint }
  })
}

export const updateSprint = (user, sprint, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/sprints/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { sprint: sprint }
  })
}
