webpackHotUpdate("commons",{

/***/ "./public/js/footer/disease_footer_recommend.js":
/*!******************************************************!*\
  !*** ./public/js/footer/disease_footer_recommend.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
disease_footer_recommend.js;
/* harmony default export */ __webpack_exports__["default"] = ({
  data: {},
  methods: function methods(cb) {
    var _self = this;

    axios.get('http://apiv2.chujingyi.cn/v2/disease/footer_recommend').then(function (req) {
      var reqdata = req.data.data;
      _self.data = BPA;
      cb(_self);
    });
  }
});

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _get_body_parts_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get/body_parts_all */ "./public/js/get/body_parts_all.js");
/* harmony import */ var _get_home_best_hospital__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get/home_best_hospital */ "./public/js/get/home_best_hospital.js");
/* harmony import */ var _footer_disease_footer_recommend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/disease_footer_recommend */ "./public/js/footer/disease_footer_recommend.js");





function cleanObjectData(data) {
  return data.data;
}

var pageContent = new Vue({
  el: '#indexPage',
  data: function data() {
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
      Home_best_hospital: {},
      Disease_footer_recommend: {}
    };
  },
  methods: {
    renderData: function renderData() {
      var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(gen);

      var _self = this;

      function gen() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function gen$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get_body_parts_all__WEBPACK_IMPORTED_MODULE_1__["default"].methods(function (data) {
                  _self.Body_parts_all = cleanObjectData(data);
                });

              case 2:
                _context.next = 4;
                return _get_home_best_hospital__WEBPACK_IMPORTED_MODULE_2__["default"].methods(function (data) {
                  _self.Home_best_hospital = cleanObjectData(data);
                });

              case 4:
                _context.next = 6;
                return _footer_disease_footer_recommend__WEBPACK_IMPORTED_MODULE_3__["default"].methods(function (data) {
                  _self.Disease_footer_recommend = cleanObjectData(data);
                });

              case 6:
                _context.next = 8;
                return axios.all([getAuthoritativeGeneralHospital(), getCancerHospital(), getCardiovascularHospital(), getChildrensHospital(), getCuttingedgeinformation(), getCuttingedgeinformation2(), getFriendLinks(), getNewJoinDoctor(), getNewJoinHospital()]).then(axios.spread(function (AuthoritativeGeneralHospital, CancerHospital, CardiovascularHospital, ChildrensHospital, Cuttingedgeinformation, Cuttingedgeinformation2, FriendLinks, NewJoinDoctor, NewJoinHospital) {
                  function JSONPS(data) {
                    return JSON.parse(JSON.stringify(data));
                  }

                  _self.AuthoritativeGeneralHospital = JSONPS(AuthoritativeGeneralHospital.data);
                  _self.CancerHospital = JSONPS(CancerHospital.data);
                  _self.CardiovascularHospital = JSONPS(CardiovascularHospital.data);
                  _self.ChildrensHospital = JSONPS(ChildrensHospital.data);
                  _self.Cuttingedgeinformation = JSONPS(Cuttingedgeinformation.data);
                  _self.Cuttingedgeinformation2 = JSONPS(Cuttingedgeinformation2.data);
                  _self.FriendLinks = JSONPS(FriendLinks.data);
                  _self.NewJoinDoctor = JSONPS(NewJoinDoctor.data);
                  _self.NewJoinHospital = JSONPS(NewJoinHospital.data);
                }));

              case 8:
                return _context.abrupt("return", console.log('get data end'));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _marked);
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
      g.next();
    }
  }
  /*components: {
      body_parts_all: {
          template: Body_parts_all
      }
  }*/

});
pageContent.renderData();

/***/ })

})
//# sourceMappingURL=commons.bc45af39d8df928d491e.hot-update.js.map