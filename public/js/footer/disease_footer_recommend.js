export default {
    data: {},
    methods: function (cb) {
        let _self = this;
        axios.get('http://apiv2.chujingyi.cn/v2/disease/footer_recommend').then((req) => {
            _self.data = req.data.data;
            cb(_self);
        });
    }
};