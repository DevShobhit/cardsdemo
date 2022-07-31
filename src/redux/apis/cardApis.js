import base from './base'

const getAll = () => {
  return base.get('/cards')
}
const get = (id) => {
  return base.get(`/cards/${id}`)
}
const create = (data) => {
  return base.post('/cards', data)
}
const update = (id, data) => {
  return base.put(`/cards/${id}`, data)
}
const remove = (id) => {
  return base.delete(`/cards/${id}`)
}

// const findByNameAndBucket = (name, bucket) => {
//   return base.get(`/cards?name=${name}&bucket=${bucket}`)
// }

const cardApis = {
  getAll,
  get,
  create,
  update,
  remove,
  // findByNameAndBucket,
}
export default cardApis
