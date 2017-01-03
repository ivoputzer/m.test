Promise
  .all([...next()])
  .then(contexts => render(contexts))
  .catch(err => {
    throw err
  })

function* next () {
}

function render () {
}
