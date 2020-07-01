let uuid = require('node-uuid');
module.exports = {
    "identification": "Recommendedhospitallymphomatreatment",
    "des": "淋巴瘤治疗推荐医院",
    "data": [
        {
            "_id": uuid.v4(),
            "hospitalName": "美国-约翰霍普金斯医院",
            "hospitalImageSrc": "../analogdataImgs/banner.jpg",
            "department": [
                {
                    "identification": "oncologyDepartment",
                    "_id": uuid.v4(),
                    "name": "肿瘤科",
                    "rank": "第1名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                }
            ]
        },
        {
            "_id": uuid.v4(),
            "tumorsRank": "第1名",
            "hospitalName": "MD安德森癌症中心",
            "hospitalImageSrc": "../analogdataImgs/banner.jpg",
            "department": [
                {
                    "identification": "oncologyDepartment",
                    "_id": uuid.v4(),
                    "name": "肿瘤科",
                    "rank": "第1名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                }
            ]
        },
        {
            "_id": uuid.v4(),
            "tumorsRank": "第1名",
            "hospitalName": "MD安德森癌症中心",
            "hospitalImageSrc": "../analogdataImgs/banner.jpg",
            "department": [
                {
                    "identification": "oncologyDepartment",
                    "_id": uuid.v4(),
                    "name": "肿瘤科",
                    "rank": "第1名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                },
                {
                    "identification": "breastDepartment",
                    "_id": uuid.v4(),
                    "name": "乳腺外科",
                    "rank": "第2名"
                }
            ]
        }
    ]
}