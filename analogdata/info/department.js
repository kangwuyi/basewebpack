let uuid = require('node-uuid');
module.exports = {
    "identification": "allDepartment",
    "des": "所有科室",
    "data": [
        {
            "_id": uuid.v4(),
            "departmentName": "综合医院",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "departmentName": "儿科",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "departmentName": "骨科",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "departmentName": "脑科",
            "allow":false
        },
        {
            "_id": uuid.v4(),
            "departmentName": "牙科",
            "allow":true
        }
    ]

}