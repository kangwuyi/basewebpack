;(function () {
    let app4 = new Vue({
        el: '#listPage',
        data: function () {
            return {
                currentPage4: 4,
                inputSearch: '',
                activeIndex: '1',
                AllCountry: {},
                AllDepartment: {},
                ArticleList:{},
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

                function getAllCountry() {
                    return axios.post('http://localhost:3000/allCountry');
                }
                function getAllDepartment() {
                    return axios.post('http://localhost:3000/allDepartment');
                }
                function getArticleList() {
                    return axios.post('http://localhost:3000/articleList');
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
                axios.all([
                    getAllCountry(),
                    getAllDepartment(),
                    getArticleList(),
                    getCuttingedgeinformation(),
                    getCuttingedgeinformation2(),
                    getFriendLinks(),
                    getNewJoinDoctor(),
                    getNewJoinHospital()
                ]).then(axios.spread(function (
                    AllCountry,
                    AllDepartment,
                    ArticleList,
                    Cuttingedgeinformation,
                    Cuttingedgeinformation2,
                    FriendLinks,
                    NewJoinDoctor,
                    NewJoinHospital
                ) {
                    function JSONPS(data){
                        return JSON.parse(JSON.stringify(data));
                    }
                    _self.ArticleList = JSONPS(ArticleList.data)
                    _self.AllCountry = JSONPS(AllCountry.data);
                    _self.AllDepartment = JSONPS(AllDepartment.data);
                    _self.Cuttingedgeinformation = JSONPS(Cuttingedgeinformation.data);
                    _self.Cuttingedgeinformation2 = JSONPS(Cuttingedgeinformation2.data);
                    _self.FriendLinks = JSONPS(FriendLinks.data);
                    _self.NewJoinDoctor = JSONPS(NewJoinDoctor.data);
                    _self.NewJoinHospital = JSONPS(NewJoinHospital.data);
                }));
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    });
    app4.renderData();
})()