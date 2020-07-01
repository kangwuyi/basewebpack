let uuid = require('node-uuid');
module.exports = {
    "identification": "allCountry",
    "des": "所有国家",
    "data": [
        {
            "_id": uuid.v4(),
            "countryName": "美国",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "countryName": "英国",
            "allow":true
        },
        {
            "_id": uuid.v4(),
            "countryName": "韩国",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "countryName": "日国",
            "allow":false
        }
    ]

}