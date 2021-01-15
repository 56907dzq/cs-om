
export default async (req, res) => {
  res.statusCode = 200
  fetch(process.env.BASE_URL + '/s_mgm_server/search').then(function (response) {
      return response.json()
  }).then(function (returnedValue) {
    res.json(returnedValue)
  }).catch(function (err) {
    res.json({})
  }).finally(function(){
    res.end(); 
  })
}
