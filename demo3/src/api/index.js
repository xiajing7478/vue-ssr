const axios = require('axios')
export function fetchItem(key) {
    return new Promise((resolve, reject) => {
            axios.get('http://106.14.184.49:19001/api/Enum/LoadAll').then(res => {
                if (res.data.success) {
                    const list = res.data.result.enums[key] || []
                    resolve(list)
                } else {
                    reject(res)
                }
            })
        })
        // 测试数据
        // return Promise.resolve({
        //     text: 'kongzhi'
        // })
}