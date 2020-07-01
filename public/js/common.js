;(function () {

    pageContent.data
    let pageContent = new Vue({
        el: '#indexPage',
        data: function () {
            return {
                inputSearch: '',
                activeIndex: '1',
                AuthoritativeGeneralHospital: {},
                CancerHospital: {},
                CardiovascularHospital: {},
                ChildrensHospital: {},
                Cuttingedgeinformation: {},
                Cuttingedgeinformation2: {},
                FriendLinks: {},
                NewJoinDoctor: {},
                NewJoinHospital: {}
            }
        },
        methods: {
            renderData() {
                let _self = this;

                function getAuthoritativeGeneralHospital() {
                    return axios.post('http://localhost:3000/AuthoritativeGeneralHospital');
                }

                function getCancerHospital() {
                    return axios.post('http://localhost:3000/CancerHospital');
                }

                function getCardiovascularHospital() {
                    return axios.post('http://localhost:3000/CardiovascularHospital');
                }

                function getChildrensHospital() {
                    return axios.post('http://localhost:3000/ChildrensHospital');
                }

                function getCuttingedgeinformation() {
                    return axios.post('http://localhost:3000/Cuttingedgeinformation');
                }

                function getCuttingedgeinformation2() {
                    return axios.post('http://localhost:3000/Cuttingedgeinformation2');
                }
                function getFriendLinks() {
                    return axios.post('http://localhost:3000/FriendLinks');
                }
                function getNewJoinDoctor() {
                    return axios.post('http://localhost:3000/NewJoinDoctor');
                }
                function getNewJoinHospital() {
                    return axios.post('http://localhost:3000/NewJoinHospital');
                }
                function getText() {
                    return axios.get('http://apiv2.chujingyi.cn/v2/body_parts/all');
                }
                axios.all([
                    getAuthoritativeGeneralHospital(),
                    getCancerHospital(),
                    getCardiovascularHospital(),
                    getChildrensHospital(),
                    getCuttingedgeinformation(),
                    getCuttingedgeinformation2(),
                    getFriendLinks(),
                    getNewJoinDoctor(),
                    getNewJoinHospital(),
                    getText()
                ]).then(axios.spread(function (
                    AuthoritativeGeneralHospital,
                    CancerHospital,
                    CardiovascularHospital,
                    ChildrensHospital,
                    Cuttingedgeinformation,
                    Cuttingedgeinformation2,
                    FriendLinks,
                    NewJoinDoctor,
                    NewJoinHospital,
                    getText
                ) {
                    function JSONPS(data){
                        return JSON.parse(JSON.stringify(data));
                    }
                    console.log(getText);
                    _self.AuthoritativeGeneralHospital = JSONPS(AuthoritativeGeneralHospital.data)
                    _self.CancerHospital = JSONPS(CancerHospital.data);
                    _self.CardiovascularHospital = JSONPS(CardiovascularHospital.data);
                    _self.ChildrensHospital = JSONPS(ChildrensHospital.data);
                    _self.Cuttingedgeinformation = JSONPS(Cuttingedgeinformation.data);
                    _self.Cuttingedgeinformation2 = JSONPS(Cuttingedgeinformation2.data);
                    _self.FriendLinks = JSONPS(FriendLinks.data);
                    _self.NewJoinDoctor = JSONPS(NewJoinDoctor.data);
                    _self.NewJoinHospital = JSONPS(NewJoinHospital.data);
                }));
            }
        }
    });
    app4.renderData();
})()