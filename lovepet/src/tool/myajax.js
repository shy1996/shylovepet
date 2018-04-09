import fetchJsonp from 'fetch-jsonp'

export default {
  fetch(config){
    fetch(config.url, config.options)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          config.success(data)
        })
        .catch((error) => {
          console.log(error)
        })
    
  },
  fetch2(config){
		fetch(config.url+'?userID='+config.options.body.phone+'&&password='+config.options.body.password)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      config.success(data)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  fetch3(config){
		fetch(config.url+'?userID='+config.options.body.phone+'&&password='+config.options.body.password)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      config.success(data)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  fetchJsonp(config){
    fetchJsonp(config.url, config.options)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          config.success(data)
        })
        .catch((error) => {
          console.log(error)
        })
    
  }
}
