const axios = require('axios')
axios.get('http://106.14.184.49:19001/api/Enum/LoadAll').then(res => {
    if (res.data.success) {
        console.log('res.result', res.data.result)
    } else {
        console.log('res.fail', res)
    }
})