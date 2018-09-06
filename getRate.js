const requestify = require('requestify');

const getRate = itemObj => new Promise((resolve, reject) => {
    if (itemObj.currency === "HUF") {
        resolve(itemObj);
    } else {
        requestify.get(`https://api.exchangeratesapi.io/latest?base=${itemObj.currency}&symbols=HUF`, {
            cache: true,
            expires: 28800000 // 8 hrs
        })
            .then(response => {
                const hufRate = response.getBody().rates.HUF;
                itemObj.amount = Math.round(itemObj.amount * hufRate);
                resolve(itemObj);
            })
            .catch(reject)
    }
});

module.exports = getRate;