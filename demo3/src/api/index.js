// import axios from 'axios'
// const axios = require('axios')
export function fetchItem(id) {
    // return new Promise((resolve, reject) => {
    //         axios.get('http://106.14.184.49:19001/api/Enum/LoadAll').then(res => {
    //             if (res.data.success) {
    //                 console.log('res.result', res.data.result)
    //                     // return resolve(res.result)
    //                 resolve({ text: res.result })
    //             } else {
    //                 reject(res)
    //             }
    //         })
    //     })
    return Promise.resolve({
        text: 'kongzhi'
    })
}