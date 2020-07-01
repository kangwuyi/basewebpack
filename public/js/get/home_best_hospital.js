/*!
 * 推荐医院 /home/best_hospital
 * @url http://apiv2.chujingyi.cn/v2/home/best_hospital
 */
export default {
    data: {},
    methods: function (cb) {
        let _self = this;
        axios.get('http://apiv2.chujingyi.cn/v2/home/best_hospital').then((req) => {
            let BPA = [
                {mark: 'AGH', child: [], name: "权威综合医院", nameen: "Authoritative General Hospital"},
                {mark: 'CCH', child: [], name: "肿瘤癌症专科医院", nameen: "Cancer Hospital"},
                {mark: 'CRH', child: [], name: "儿童医院", nameen: "Children's Hospital"},
                {mark: 'CVH', child: [], name: "心血管专科医院", nameen: "Cardiovascular hospital"},
            ];
            let reqdata = req.data.data;
            for (let i = 0; i < reqdata.length; i++) {
                switch (reqdata[i].type_name) {
                    case reqdata[i].type_name = "综合医院":
                        BPA[0].child.push(reqdata[i]);
                        break;
                    case reqdata[i].type_name = "癌症专科":
                        BPA[1].child.push(reqdata[i]);
                        break;
                    case reqdata[i].type_name = "儿科":
                        BPA[2].child.push(reqdata[i]);
                        break;
                    case reqdata[i].type_name = "心血管专科医院":
                        BPA[3].child.push(reqdata[i]);
                        break;
                    default:
                }
            }
            _self.data = BPA;
            cb(_self);
        });
    }
};