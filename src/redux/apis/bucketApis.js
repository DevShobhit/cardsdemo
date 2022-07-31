import base from './base'

const getAll = () => {
  return base.get('/buckets')
}
const create = (name) => {
  return base.post('/buckets', { name: name })
}

const cardApis = {
  getAll,
  create,
}

export default cardApis
