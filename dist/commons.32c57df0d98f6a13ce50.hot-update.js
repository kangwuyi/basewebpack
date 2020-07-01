webpackHotUpdate("commons",{

/***/ "./public/js/get/home_best_hospital.js":
/*!*********************************************!*\
  !*** ./public/js/get/home_best_hospital.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: {},
  methods: function methods(cb) {
    var _self = this;

    axios.get('http://apiv2.chujingyi.cn/v2/home/best_hospital').then(function (req) {
      var BPA = [{
        mark: 'AGH',
        child: [],
        name: "权威综合医院",
        nameen: "Authoritative General Hospital"
      }, {
        mark: 'CCH',
        child: [],
        name: "肿瘤癌症专科医院",
        nameen: "Cancer Hospital"
      }, {
        mark: 'CRH',
        child: [],
        name: "儿童医院",
        nameen: "Children's Hospital"
      }, {
        mark: 'CVH',
        child: [],
        name: "心血管专科医院",
        nameen: "Cardiovascular hospital"
      }];
      var reqdata = req.data.data;

      for (var i = 0; i < reqdata.length; i++) {
        switch (reqdata[i].type_name) {
          case reqdata[i].type_name = "综合医院":
            BPA[0].child.push(reqdata[i]);
            break;

          case reqdata[i].type_name = "癌症专科":
            BPA[1].child.push.push(reqdata[i]);
            break;

          case reqdata[i].type_name = "儿科":
            BPA[2].child.push.push(reqdata[i]);
            break;

          case reqdata[i].type_name = "心血管专科医院":
            BPA[3].child.push.push(reqdata[i]);
            break;

          default:
        }
      }

      _self.data = BPA;
      console.log(BPA);
      cb(_self);
    });
  }
});

/***/ })

})
//# sourceMappingURL=commons.32c57df0d98f6a13ce50.hot-update.js.map