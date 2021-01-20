const Async = require('async')

const getItens = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['ITEM 1', 'ITEM 2', 'ITEM 3'])
        }, 5000)
    })
}

const getNames = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['NAME 1', 'NAME 2', 'NAME 3'])
        }, 5000)
    })
}

const countTime = async (callback) => {
    const startedAt = new Date()
    const response = await callback()
    return {
        time: new Date() - startedAt,
        response
    }
}

(async () => {
    console.log('Test 1:', await countTime(async () => {
        return {
            itens: await getItens(),
            names: await getNames(),
        }
    }))

    console.log('Test 2:', await countTime(async () => {
        return await new Promise((resolve, reject) => {
            Async.parallel({
                itens: (callback) => {
                    getItens().then((result) => {
                        callback(null, result)
                    })
                },
                names: (callback) => {
                    getNames().then((result) => {
                        callback(null, result)
                    })
                }
            }, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }))
})()