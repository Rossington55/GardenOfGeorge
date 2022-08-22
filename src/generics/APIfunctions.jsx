const liveAPI = "https://gateofgeorge.herokuapp.com/api/"
const testAPI = "http://localhost:59569/api/"

const apiURL = liveAPI

/*
Add arrDetails if response is an array
arrDetails = {
  dataKey - name of the field in the data which is an array
  idKey - name of the field in the array which is the id
}
*/
function apiGET(url, callback, arrDetails) {
  url = apiURL + url

  fetch(url,
    {
      method: "GET",
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {

      //Add an id to each row if this is an array
      if (arrDetails) {
        for (let i in data[arrDetails.dataKey]) {
          data[arrDetails.dataKey][i].id = data[arrDetails.dataKey][i][arrDetails.idKey]
        }
      }

      return callback(data)
    })
}

function apiPOST(url, body, callback) {
  url = apiURL + url
  const apiBody = JSON.stringify(body)

  fetch(url,
    {
      method: "POST",
      body: apiBody,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      return callback(data)
    })
}

export { apiGET, apiPOST }