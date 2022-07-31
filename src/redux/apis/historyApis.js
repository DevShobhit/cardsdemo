import base from './base'

const getAll = () => {
  return base.get('/history')
}
const create = (name, link, time) => {
  return base.post('/history', { cardname: name, link: link, time: time })
}

const historyApis = {
  getAll,
  create,
}

export default historyApis
