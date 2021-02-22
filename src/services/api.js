const makeRequest = (method, body) => {
  const tableList = JSON.parse(localStorage.getItem('tableList') || '[]')
  let indexForUpdate

  switch (method) {
    case 'GET':
      break
    case 'POST':
      // eslint-disable-next-line
      body.item.id = Math.random() * 100000
      tableList.push(body.item)
      break
    case 'PUT':
      indexForUpdate = tableList.findIndex(({ id }) => id === body.id)
      tableList[indexForUpdate] = body.item
      break
    case 'DELETE':
      indexForUpdate = tableList.findIndex(({ id }) => id === body.id)
      tableList.splice(indexForUpdate, 1)
      break
    default:
      console.error('Wrong method request')
  }

  localStorage.setItem('tableList', JSON.stringify(tableList))

  return tableList
}

export default class ApiService {
  static getList() {
    return makeRequest('GET')
  }

  static addItem(item) {
    return makeRequest('POST', { item })
  }

  static updateItem(id, item) {
    return makeRequest('PUT', { id, item })
  }

  static removeItem(id) {
    return makeRequest('DELETE', { id })
  }
}
