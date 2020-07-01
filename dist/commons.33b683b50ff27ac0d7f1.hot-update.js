webpackHotUpdate("commons",{

/***/ "./public/js/footer/disease_footer_recommend.js":
/*!******************************************************!*\
  !*** ./public/js/footer/disease_footer_recommend.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: {},
  methods: function methods(cb) {
    var _self = this;

    axios.get('http://apiv2.chujingyi.cn/v2/disease/footer_recommend').then(function (req) {
      _self.data = req.data.data;
      cb(_self);
    });
  }
});

/***/ })

})
//# sourceMappingURL=commons.33b683b50ff27ac0d7f1.hot-update.js.map