import Body_parts_all from './get/body_parts_all';
import Home_best_hospital from './get/home_best_hospital';
import Disease_footer_recommend from './footer/disease_footer_recommend';

function cleanObjectData (data){
    return data.data;
}
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
            NewJoinHospital: {},
            Body_parts_all: {},
            Home_best_hospital:{},
            Disease_footer_recommend:{},
            isCollapse: true
        }
    },
    methods: {
        renderData() {
            let _self = this;

            function* gen() {
                yield Body_parts_all.methods(function (data) {
                    _self.Body_parts_all = cleanObjectData(data);
                });
                yield Home_best_hospital.methods(function (data) {
                    _self.Home_best_hospital = cleanObjectData(data);
                });
                yield Disease_footer_recommend.methods(function (data) {
                    _self.Disease_footer_recommend = cleanObjectData(data);
                });
                yield axios.all([
                    getAuthoritativeGeneralHospital(),
                    getCancerHospital(),
                    getCardiovascularHospital(),
                    getChildrensHospital(),
                    getCuttingedgeinformation(),
                    getCuttingedgeinformation2(),
                    getFriendLinks(),
                    getNewJoinDoctor(),
                    getNewJoinHospital(),
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
                ) {
                    function JSONPS(data) {
                        return JSON.parse(JSON.stringify(data));
                    }

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
                return console.log('get data end');
            }


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
            var g = gen();
            g.next();
            g.next();
            g.next();
            g.next()

        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    /*components: {
        body_parts_all: {
            template: Body_parts_all
        }
    }*/
});
pageContent.renderData();
