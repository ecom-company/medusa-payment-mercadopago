"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _default = function _default(rootDirectory, pluginOptions) {
  var router = (0, _express.Router)();
  router.use(_bodyParser["default"].json());
  router.get("/mercadopago", function (req, res) {
    res.json({
      message: "Welcome to Totemiq Mercadopago!"
    });
  });
  router.post("/mercadopago", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var mercadoPagoProviderService, paymentDetail, handleCartPayments, _handleCartPayments, _paymentDetail, _paymentDetail2, event, paymentIntent, cartId;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _handleCartPayments = function _handleCartPayments3() {
                _handleCartPayments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event, req, res, paymentIntent, cartId) {
                  var manager, cartService, orderService, order;
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          manager = req.scope.resolve("manager");
                          cartService = req.scope.resolve("cartService");
                          orderService = req.scope.resolve("orderService");
                          _context2.next = 5;
                          return orderService.retrieveByCartId(cartId)["catch"](function () {
                            return undefined;
                          });

                        case 5:
                          order = _context2.sent;
                          _context2.next = 8;
                          return manager.transaction( /*#__PURE__*/function () {
                            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(m) {
                              var cartServiceTx;
                              return _regenerator["default"].wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.t0 = event;
                                      _context.next = _context.t0 === "payment.created" ? 3 : 12;
                                      break;

                                    case 3:
                                      if (order) {
                                        _context.next = 11;
                                        break;
                                      }

                                      cartServiceTx = cartService.withTransaction(manager);
                                      _context.next = 7;
                                      return cartServiceTx.setPaymentSession(cartId, "mercadopago");

                                    case 7:
                                      _context.next = 9;
                                      return cartServiceTx.authorizePayment(cartId, {
                                        id: paymentIntent.id
                                      });

                                    case 9:
                                      _context.next = 11;
                                      return orderService.withTransaction(manager).createFromCart(cartId);

                                    case 11:
                                      return _context.abrupt("break", 14);

                                    case 12:
                                      res.sendStatus(204);
                                      return _context.abrupt("return");

                                    case 14:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            return function (_x8) {
                              return _ref2.apply(this, arguments);
                            };
                          }());

                        case 8:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _handleCartPayments.apply(this, arguments);
              };

              handleCartPayments = function _handleCartPayments2(_x3, _x4, _x5, _x6, _x7) {
                return _handleCartPayments.apply(this, arguments);
              };

              mercadoPagoProviderService = req.scope.resolve("mercadopagoService");
              _context3.prev = 3;

              if (!(req.body.type === "payment")) {
                _context3.next = 8;
                break;
              }

              _context3.next = 7;
              return mercadoPagoProviderService.notificationPayment(req.body);

            case 7:
              paymentDetail = _context3.sent;

            case 8:
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              res.sendStatus(402);
              return _context3.abrupt("return");

            case 14:
              _context3.prev = 14;
              // Notification action type
              event = (_paymentDetail = paymentDetail) === null || _paymentDetail === void 0 ? void 0 : _paymentDetail.action; // Payment details MercadoPago

              paymentIntent = (_paymentDetail2 = paymentDetail) === null || _paymentDetail2 === void 0 ? void 0 : _paymentDetail2.payment; // cartId that comes in the detail of the MercadoPago payment

              cartId = paymentIntent === null || paymentIntent === void 0 ? void 0 : paymentIntent.external_reference;

              if (!cartId) {
                _context3.next = 21;
                break;
              }

              _context3.next = 21;
              return handleCartPayments(event, req, res, paymentIntent, cartId);

            case 21:
              res.sendStatus(200);
              _context3.next = 27;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t1 = _context3["catch"](14);
              res.sendStatus(409);

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 10], [14, 24]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  return router;
};

exports["default"] = _default;