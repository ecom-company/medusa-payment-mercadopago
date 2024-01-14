"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(
    require("@babel/runtime/regenerator")
);

var _asyncToGenerator2 = _interopRequireDefault(
    require("@babel/runtime/helpers/asyncToGenerator")
);

var _classCallCheck2 = _interopRequireDefault(
    require("@babel/runtime/helpers/classCallCheck")
);

var _createClass2 = _interopRequireDefault(
    require("@babel/runtime/helpers/createClass")
);

var _inherits2 = _interopRequireDefault(
    require("@babel/runtime/helpers/inherits")
);

var _possibleConstructorReturn2 = _interopRequireDefault(
    require("@babel/runtime/helpers/possibleConstructorReturn")
);

var _getPrototypeOf2 = _interopRequireDefault(
    require("@babel/runtime/helpers/getPrototypeOf")
);

var _defineProperty2 = _interopRequireDefault(
    require("@babel/runtime/helpers/defineProperty")
);

var _medusa = require("@medusajs/medusa");

var _mercadopago = _interopRequireDefault(require("mercadopago"));

var _medusaCoreUtils = require("medusa-core-utils");

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })),
            keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2
            ? ownKeys(Object(source), !0).forEach(function (key) {
                  (0, _defineProperty2["default"])(target, key, source[key]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(
                  target,
                  Object.getOwnPropertyDescriptors(source)
              )
            : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(
                      target,
                      key,
                      Object.getOwnPropertyDescriptor(source, key)
                  );
              });
    }
    return target;
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
    };
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
        );
        return true;
    } catch (e) {
        return false;
    }
}

var MercadopagoProviderService = /*#__PURE__*/ (function (
    _AbstractPaymentServi
) {
    (0, _inherits2["default"])(
        MercadopagoProviderService,
        _AbstractPaymentServi
    );

    var _super = _createSuper(MercadopagoProviderService);

    function MercadopagoProviderService(_ref, options) {
        var _this;

        var regionService = _ref.regionService,
            manager = _ref.manager;
        (0, _classCallCheck2["default"])(this, MercadopagoProviderService);
        _this = _super.call(
            this,
            {
                regionService: regionService,
            },
            options
        );
        /**
         * Required PayPal options:
         *  {
         *    access_token: "MERCADOPAGO_ACCESS_TOKEN", REQUIRED
         *    store_url: "STORE_PLATFORM_URL", REQUIRED
         *    webhook_url: "MERCADOPAGO_WEBHOOK_URL", REQUIRED
         *  }
         */

        _this.options_ = options;
        /** @private @const {MercadoPago} */

        _this.mercadopago_ = _mercadopago["default"];

        _this.mercadopago_.configure({
            access_token: options.access_token,
        });
        /** @private @const {RegionService} */

        _this.regionService_ = regionService;
        /** @private @const {EntityManager} */

        _this.manager_ = manager;
        return _this;
    }
    /**
     * Obtain payment details from the updated
     * paymentSession data after payment authorization
     * @param {object} paymentSession - payment session
     * @returns {Promise<object>} Mercadopago payment
     */

    (0, _createClass2["default"])(MercadopagoProviderService, [
        {
            key: "getPaymentData",
            value: (function () {
                var _getPaymentData = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(function _callee(
                        paymentSession
                    ) {
                        var payment;
                        return _regenerator["default"].wrap(
                            function _callee$(_context) {
                                while (1) {
                                    switch ((_context.prev = _context.next)) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return this.retrievePayment(
                                                paymentSession.data
                                            );

                                        case 3:
                                            payment = _context.sent;
                                            return _context.abrupt(
                                                "return",
                                                payment
                                            );

                                        case 7:
                                            _context.prev = 7;
                                            _context.t0 = _context["catch"](0);
                                            throw _context.t0;

                                        case 10:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            },
                            _callee,
                            this,
                            [[0, 7]]
                        );
                    })
                );

                function getPaymentData(_x) {
                    return _getPaymentData.apply(this, arguments);
                }

                return getPaymentData;
            })(),
            /**
             * Updates the data field of the PaymentSession.
             * @param {object} paymentSessionData - current data.
             * @param {object} updateData - updated data to save.
             * @returns {object} updated data composed of the two parameters.
             */
        },
        {
            key: "updatePaymentData",
            value: (function () {
                var _updatePaymentData = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee2(paymentSessionData, data) {
                            return _regenerator["default"].wrap(
                                function _callee2$(_context2) {
                                    while (1) {
                                        switch (
                                            (_context2.prev = _context2.next)
                                        ) {
                                            case 0:
                                                _context2.prev = 0;
                                                return _context2.abrupt(
                                                    "return",
                                                    _objectSpread(
                                                        _objectSpread(
                                                            {},
                                                            paymentSessionData
                                                        ),
                                                        data
                                                    )
                                                );

                                            case 4:
                                                _context2.prev = 4;
                                                _context2.t0 =
                                                    _context2["catch"](0);
                                                throw _context2.t0;

                                            case 7:
                                            case "end":
                                                return _context2.stop();
                                        }
                                    }
                                },
                                _callee2,
                                null,
                                [[0, 4]]
                            );
                        }
                    )
                );

                function updatePaymentData(_x2, _x3) {
                    return _updatePaymentData.apply(this, arguments);
                }

                return updatePaymentData;
            })(),
            /**
             * Create a preference from MercadoPago.
             * Reference docs: https://www.mercadopago.com.pe/developers/es/reference/preferences/_checkout_preferences/post
             * @param {object} cart
             * @returns {object} object that is stored in the data field of the created PaymentSession.
             */
        },
        {
            key: "createPayment",
            value: (function () {
                var _createPayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee3(cart) {
                            var _cart$billing_address, _cart$billing_address2;

                            var region_id,
                                _yield$this$regionSer,
                                currency_code,
                                items,
                                preference,
                                paymentIntent;

                            return _regenerator["default"].wrap(
                                function _callee3$(_context3) {
                                    while (1) {
                                        switch (
                                            (_context3.prev = _context3.next)
                                        ) {
                                            case 0:
                                                region_id = cart.region_id;
                                                _context3.next = 3;
                                                return this.regionService_.retrieve(
                                                    region_id
                                                );

                                            case 3:
                                                _yield$this$regionSer =
                                                    _context3.sent;
                                                currency_code =
                                                    _yield$this$regionSer.currency_code;

                                                items = cart.items.map(
                                                    function (item) {
                                                        const humanizePrice =
                                                            (0,
                                                            _medusaCoreUtils.humanizeAmount)(
                                                                item.unit_price,
                                                                currency_code
                                                            );
                                                        let finalPrice =
                                                            humanizePrice;

                                                        if (
                                                            cart.discounts &&
                                                            cart.discounts
                                                                .length > 0 &&
                                                            item.discountable ===
                                                                true
                                                        ) {
                                                            cart.discounts.forEach(
                                                                (discount) => {
                                                                    if (
                                                                        discount
                                                                            .rule
                                                                            .type ===
                                                                        "fixed"
                                                                    ) {
                                                                        finalPrice -=
                                                                            (0,
                                                                            _medusaCoreUtils.humanizeAmount)(
                                                                                discount
                                                                                    .rule
                                                                                    .value,
                                                                                currency_code
                                                                            );
                                                                    } else if (
                                                                        discount
                                                                            .rule
                                                                            .type ===
                                                                        "percentage"
                                                                    ) {
                                                                        finalPrice -=
                                                                            (0,
                                                                            _medusaCoreUtils.humanizeAmount)(
                                                                                item.unit_price *
                                                                                    (discount
                                                                                        .rule
                                                                                        .value /
                                                                                        100),
                                                                                currency_code
                                                                            );
                                                                    }
                                                                }
                                                            );
                                                        }

                                                        return {
                                                            id: item.id,
                                                            title: item.title,
                                                            quantity:
                                                                item.quantity,
                                                            unit_price:
                                                                finalPrice,
                                                            currency_id:
                                                                currency_code.toUpperCase(),
                                                            description:
                                                                item.description,
                                                        };
                                                    }
                                                );

                                                preference = {
                                                    items: items,
                                                    /**REQUIRED */
                                                    payer: {
                                                        name:
                                                            (_cart$billing_address =
                                                                cart.billing_address) ===
                                                                null ||
                                                            _cart$billing_address ===
                                                                void 0
                                                                ? void 0
                                                                : _cart$billing_address.first_name,
                                                        surname:
                                                            (_cart$billing_address2 =
                                                                cart.billing_address) ===
                                                                null ||
                                                            _cart$billing_address2 ===
                                                                void 0
                                                                ? void 0
                                                                : _cart$billing_address2.last_name,
                                                        email: cart?.email,
                                                    },
                                                    notification_url:
                                                        "https://martins-nutrition-backend-production.up.railway.app/mercadopago",
                                                    external_reference: cart.id,
                                                    //This field will allow you to relate the payment with the cartid
                                                    back_urls: {
                                                        //Return the cardId in the url to get the order from the client side
                                                        success:
                                                            "https://martinsnutrition.com/order/success",
                                                        failure:
                                                            "https://martinsnutrition.com",
                                                        pending:
                                                            "https://martinsnutrition.com",
                                                    },
                                                };
                                                _context3.next = 9;
                                                return this.mercadopago_.preferences.create(
                                                    preference
                                                );

                                            case 9:
                                                paymentIntent = _context3.sent;
                                                return _context3.abrupt(
                                                    "return",
                                                    {
                                                        preferenceId:
                                                            paymentIntent.body
                                                                .id,
                                                        url: paymentIntent.body
                                                            .init_point,
                                                        urlSandbox:
                                                            paymentIntent.body
                                                                .sandbox_init_point,
                                                    }
                                                );

                                            case 11:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                },
                                _callee3,
                                this
                            );
                        }
                    )
                );

                function createPayment(_x4) {
                    return _createPayment.apply(this, arguments);
                }

                return createPayment;
            })(),
            /**
             * Obtain the detail of the MercadoPago Payment.
             * @param {object} paymentData - data containing the payment id
             * @returns {Promise<object>} object with payment detail
             */
        },
        {
            key: "retrievePayment",
            value: (function () {
                var _retrievePayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee4(paymentData) {
                            var res;
                            return _regenerator["default"].wrap(
                                function _callee4$(_context4) {
                                    while (1) {
                                        switch (
                                            (_context4.prev = _context4.next)
                                        ) {
                                            case 0:
                                                _context4.prev = 0;
                                                _context4.next = 3;
                                                return this.mercadopago_.payment.get(
                                                    paymentData.id
                                                );

                                            case 3:
                                                res = _context4.sent;
                                                return _context4.abrupt(
                                                    "return",
                                                    res.body
                                                );

                                            case 7:
                                                _context4.prev = 7;
                                                _context4.t0 =
                                                    _context4["catch"](0);
                                                throw _context4.t0;

                                            case 10:
                                            case "end":
                                                return _context4.stop();
                                        }
                                    }
                                },
                                _callee4,
                                this,
                                [[0, 7]]
                            );
                        }
                    )
                );

                function retrievePayment(_x5) {
                    return _retrievePayment.apply(this, arguments);
                }

                return retrievePayment;
            })(),
            /**
             * Update MercadoPago preference.
             * @param {object} paymentSessionData - payment session data.
             * @param {object} cart - updated cart.
             * @returns {object} paymentSessionData.
             */
        },
        {
            key: "updatePayment",
            value: (function () {
                var _updatePayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee5(paymentSessionData, cart) {
                            var region_id,
                                _yield$this$regionSer2,
                                currency_code,
                                items,
                                preference,
                                paymentIntent;

                            return _regenerator["default"].wrap(
                                function _callee5$(_context5) {
                                    while (1) {
                                        switch (
                                            (_context5.prev = _context5.next)
                                        ) {
                                            case 0:
                                                _context5.prev = 0;
                                                region_id = cart.region_id;
                                                _context5.next = 4;
                                                return this.regionService_.retrieve(
                                                    region_id
                                                );

                                            case 4:
                                                _yield$this$regionSer2 =
                                                    _context5.sent;
                                                currency_code =
                                                    _yield$this$regionSer2.currency_code;

                                                items = cart.items.map(
                                                    function (item) {
                                                        const humanizePrice =
                                                            (0,
                                                            _medusaCoreUtils.humanizeAmount)(
                                                                item.unit_price,
                                                                currency_code
                                                            );
                                                        let finalPrice =
                                                            humanizePrice;

                                                        if (
                                                            cart.discounts &&
                                                            cart.discounts
                                                                .length > 0 &&
                                                            item.discountable ===
                                                                true
                                                        ) {
                                                            cart.discounts.forEach(
                                                                (discount) => {
                                                                    if (
                                                                        discount
                                                                            .rule
                                                                            .type ===
                                                                        "fixed"
                                                                    ) {
                                                                        finalPrice -=
                                                                            (0,
                                                                            _medusaCoreUtils.humanizeAmount)(
                                                                                discount
                                                                                    .rule
                                                                                    .value,
                                                                                currency_code
                                                                            );
                                                                    } else if (
                                                                        discount
                                                                            .rule
                                                                            .type ===
                                                                        "percentage"
                                                                    ) {
                                                                        finalPrice -=
                                                                            (0,
                                                                            _medusaCoreUtils.humanizeAmount)(
                                                                                item.unit_price *
                                                                                    (discount
                                                                                        .rule
                                                                                        .value /
                                                                                        100),
                                                                                currency_code
                                                                            );
                                                                    }
                                                                }
                                                            );
                                                        }

                                                        return {
                                                            id: item.id,
                                                            title: item.title,
                                                            quantity:
                                                                item.quantity,
                                                            unit_price:
                                                                finalPrice,
                                                            currency_id:
                                                                currency_code.toUpperCase(),
                                                            description:
                                                                item.description,
                                                        };
                                                    }
                                                );
                                                preference = {
                                                    items: items,
                                                    payer: {
                                                        name: cart
                                                            ?.billing_address
                                                            ?.first_name,
                                                        surname:
                                                            cart
                                                                ?.billing_address
                                                                ?.last_name,
                                                        email: cart?.email,
                                                    },
                                                    external_reference: cart.id,
                                                    back_urls: {
                                                        success: ""
                                                            .concat(
                                                                this.options_
                                                                    .success_backurl,
                                                                "/"
                                                            )
                                                            .concat(
                                                                cart.id,
                                                                "/"
                                                            ),
                                                    },
                                                };
                                                _context5.next = 10;
                                                return this.mercadopago_.preferences.update(
                                                    {
                                                        id: paymentSessionData.preferenceId,
                                                        items: items,
                                                        payer: {
                                                            name: cart
                                                                .billing_address
                                                                .first_name,
                                                            surname:
                                                                cart
                                                                    .billing_address
                                                                    .last_name,
                                                            email: cart.email,
                                                        },
                                                        external_reference:
                                                            cart.id,
                                                        back_urls: {
                                                            //Return the cardId in the url to get the order from the client side
                                                            success:
                                                                "https://martinsnutrition.com/order/success",
                                                            failure:
                                                                "https://martinsnutrition.com",
                                                            pending:
                                                                "https://martinsnutrition.com",
                                                        },
                                                    }
                                                );

                                            case 10:
                                                paymentIntent = _context5.sent;
                                                return _context5.abrupt(
                                                    "return",
                                                    {
                                                        preferenceId:
                                                            paymentIntent.body
                                                                .id,
                                                        url: paymentIntent.body
                                                            .init_point,
                                                    }
                                                );

                                            case 14:
                                                _context5.prev = 14;
                                                _context5.t0 =
                                                    _context5["catch"](0);
                                                throw _context5.t0;

                                            case 17:
                                            case "end":
                                                return _context5.stop();
                                        }
                                    }
                                },
                                _callee5,
                                this,
                                [[0, 14]]
                            );
                        }
                    )
                );

                function updatePayment(_x6, _x7) {
                    return _updatePayment.apply(this, arguments);
                }

                return updatePayment;
            })(),
            /**
             * Authorize the MercadoPago payment attempt
             * @param {object} paymentSession - payment session data
             * @param {object} context - object with relevant data indicating the status of the payment
             * @returns {Promise<{ status: string, data: object }>} result with data and status
             */
        },
        {
            key: "authorizePayment",
            value: (function () {
                var _authorizePayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee6(paymentSession, context) {
                            var status;
                            return _regenerator["default"].wrap(
                                function _callee6$(_context6) {
                                    while (1) {
                                        switch (
                                            (_context6.prev = _context6.next)
                                        ) {
                                            case 0:
                                                _context6.next = 2;
                                                return this.getStatus(context);

                                            case 2:
                                                status = _context6.sent;
                                                _context6.prev = 3;
                                                return _context6.abrupt(
                                                    "return",
                                                    {
                                                        data: _objectSpread(
                                                            _objectSpread(
                                                                {},
                                                                paymentSession.data
                                                            ),
                                                            {},
                                                            {
                                                                id: context.id, //payment id
                                                            }
                                                        ),
                                                        status: status,
                                                    }
                                                );

                                            case 7:
                                                _context6.prev = 7;
                                                _context6.t0 =
                                                    _context6["catch"](3);
                                                throw _context6.t0;

                                            case 10:
                                            case "end":
                                                return _context6.stop();
                                        }
                                    }
                                },
                                _callee6,
                                this,
                                [[3, 7]]
                            );
                        }
                    )
                );

                function authorizePayment(_x8, _x9) {
                    return _authorizePayment.apply(this, arguments);
                }

                return authorizePayment;
            })(),
            /**
             * Capture payment for a previously authorized order
             * @param {object} payment - payment of the order to capture
             * @returns {object} MercadoPago payment
             */
        },
        {
            key: "capturePayment",
            value: (function () {
                var _capturePayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee7(payment) {
                            return _regenerator["default"].wrap(
                                function _callee7$(_context7) {
                                    while (1) {
                                        switch (
                                            (_context7.prev = _context7.next)
                                        ) {
                                            case 0:
                                                _context7.prev = 0;

                                                if (
                                                    !(
                                                        payment.data
                                                            .captured === true
                                                    )
                                                ) {
                                                    _context7.next = 3;
                                                    break;
                                                }

                                                return _context7.abrupt(
                                                    "return",
                                                    payment.data
                                                );

                                            case 3:
                                                _context7.next = 8;
                                                break;

                                            case 5:
                                                _context7.prev = 5;
                                                _context7.t0 =
                                                    _context7["catch"](0);
                                                throw _context7.t0;

                                            case 8:
                                            case "end":
                                                return _context7.stop();
                                        }
                                    }
                                },
                                _callee7,
                                null,
                                [[0, 5]]
                            );
                        }
                    )
                );

                function capturePayment(_x10) {
                    return _capturePayment.apply(this, arguments);
                }

                return capturePayment;
            })(),
            /**
             * Refund an amount.
             * @param {object} payment - payment to be reimbursed
             * @param {number} refundAmount - amount to be reimbursed
             * @returns {Promise<Object>} MercadoPago payment
             */
        },
        {
            key: "refundPayment",
            value: (function () {
                var _refundPayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee8(payment, refundAmount) {
                            var paymentData;
                            return _regenerator["default"].wrap(
                                function _callee8$(_context8) {
                                    while (1) {
                                        switch (
                                            (_context8.prev = _context8.next)
                                        ) {
                                            case 0:
                                                _context8.prev = 0;
                                                _context8.next = 3;
                                                return this.mercadopago_.refund.create(
                                                    {
                                                        payment_id:
                                                            payment.data.id,
                                                        amount: Math.round(
                                                            (0,
                                                            _medusaCoreUtils.humanizeAmount)(
                                                                refundAmount,
                                                                payment.currency_code
                                                            )
                                                        ),
                                                    }
                                                );

                                            case 3:
                                                _context8.next = 5;
                                                return this.retrievePayment(
                                                    payment.data
                                                );

                                            case 5:
                                                paymentData = _context8.sent;
                                                return _context8.abrupt(
                                                    "return",
                                                    paymentData
                                                );

                                            case 9:
                                                _context8.prev = 9;
                                                _context8.t0 =
                                                    _context8["catch"](0);
                                                throw _context8.t0;

                                            case 12:
                                            case "end":
                                                return _context8.stop();
                                        }
                                    }
                                },
                                _callee8,
                                this,
                                [[0, 9]]
                            );
                        }
                    )
                );

                function refundPayment(_x11, _x12) {
                    return _refundPayment.apply(this, arguments);
                }

                return refundPayment;
            })(),
            /**
             * Cancel payment
             * @param {Payment} payment - payment to cancel
             * @returns {Promise<object>} payment canceled from MercadoPago
             */
        },
        {
            key: "cancelPayment",
            value: (function () {
                var _cancelPayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee9(payment) {
                            var paymentData, isCancelled, isFullyRefund;
                            return _regenerator["default"].wrap(
                                function _callee9$(_context9) {
                                    while (1) {
                                        switch (
                                            (_context9.prev = _context9.next)
                                        ) {
                                            case 0:
                                                _context9.next = 2;
                                                return this.retrievePayment(
                                                    payment.data
                                                );

                                            case 2:
                                                paymentData = _context9.sent;
                                                isCancelled =
                                                    paymentData.status ===
                                                    "cancelled";
                                                isFullyRefund =
                                                    paymentData.status ===
                                                        "refunded" &&
                                                    paymentData.transaction_amount ===
                                                        paymentData.transaction_amount_refunded;
                                                /** If the payment was already canceled or fully refunded,
                                                 * it can no longer be canceled or refunded*/

                                                if (
                                                    !(
                                                        isCancelled ||
                                                        isFullyRefund
                                                    )
                                                ) {
                                                    _context9.next = 7;
                                                    break;
                                                }

                                                return _context9.abrupt(
                                                    "return",
                                                    paymentData
                                                );

                                            case 7:
                                                _context9.prev = 7;

                                                if (
                                                    !(
                                                        payment.data
                                                            .captured === true
                                                    )
                                                ) {
                                                    _context9.next = 11;
                                                    break;
                                                }

                                                _context9.next = 11;
                                                return this.mercadopago_.refund.create(
                                                    {
                                                        payment_id:
                                                            payment.data.id,
                                                    }
                                                );

                                            case 11:
                                                if (
                                                    !(
                                                        paymentData.status ===
                                                            "pending" ||
                                                        paymentData.status ===
                                                            "in_process"
                                                    )
                                                ) {
                                                    _context9.next = 14;
                                                    break;
                                                }

                                                _context9.next = 14;
                                                return this.mercadopago_.payment.cancel(
                                                    payment.data.id
                                                );

                                            case 14:
                                                _context9.next = 16;
                                                return this.retrievePayment(
                                                    payment.data
                                                );

                                            case 16:
                                                return _context9.abrupt(
                                                    "return",
                                                    _context9.sent
                                                );

                                            case 19:
                                                _context9.prev = 19;
                                                _context9.t0 =
                                                    _context9["catch"](7);
                                                throw _context9.t0;

                                            case 22:
                                            case "end":
                                                return _context9.stop();
                                        }
                                    }
                                },
                                _callee9,
                                this,
                                [[7, 19]]
                            );
                        }
                    )
                );

                function cancelPayment(_x13) {
                    return _cancelPayment.apply(this, arguments);
                }

                return cancelPayment;
            })(),
        },
        {
            key: "deletePayment",
            value: (function () {
                var _deletePayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee10(paymentSession) {
                            return _regenerator["default"].wrap(
                                function _callee10$(_context10) {
                                    while (1) {
                                        switch (
                                            (_context10.prev = _context10.next)
                                        ) {
                                            case 0:
                                                return _context10.abrupt(
                                                    "return"
                                                );

                                            case 1:
                                            case "end":
                                                return _context10.stop();
                                        }
                                    }
                                },
                                _callee10
                            );
                        }
                    )
                );

                function deletePayment(_x14) {
                    return _deletePayment.apply(this, arguments);
                }

                return deletePayment;
            })(),
            /**
             * Obtain the MercadoPago payment status
             * and return the valid status for Medusa.
             * @param {object} payment data or paymentSession
             * @returns {string} payment status
             */
        },
        {
            key: "getStatus",
            value: (function () {
                var _getStatus = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee11(data) {
                            var paymentIntent;
                            return _regenerator["default"].wrap(
                                function _callee11$(_context11) {
                                    while (1) {
                                        switch (
                                            (_context11.prev = _context11.next)
                                        ) {
                                            case 0:
                                                _context11.next = 2;
                                                return this.retrievePayment(
                                                    data
                                                );

                                            case 2:
                                                paymentIntent = _context11.sent;
                                                _context11.t0 =
                                                    paymentIntent.status;
                                                _context11.next =
                                                    _context11.t0 === "approved"
                                                        ? 6
                                                        : _context11.t0 ===
                                                          "authorized"
                                                        ? 6
                                                        : _context11.t0 ===
                                                          "refunded"
                                                        ? 7
                                                        : _context11.t0 ===
                                                          "charged_back"
                                                        ? 7
                                                        : _context11.t0 ===
                                                          "cancelled"
                                                        ? 7
                                                        : _context11.t0 ===
                                                          "rejected"
                                                        ? 8
                                                        : _context11.t0 ===
                                                          "pending"
                                                        ? 9
                                                        : _context11.t0 ===
                                                          "in_process"
                                                        ? 9
                                                        : _context11.t0 ===
                                                          "in_mediation"
                                                        ? 9
                                                        : 10;
                                                break;

                                            case 6:
                                                return _context11.abrupt(
                                                    "return",
                                                    _medusa.PaymentSessionStatus
                                                        .AUTHORIZED
                                                );

                                            case 7:
                                                return _context11.abrupt(
                                                    "return",
                                                    _medusa.PaymentSessionStatus
                                                        .CANCELED
                                                );

                                            case 8:
                                                return _context11.abrupt(
                                                    "return",
                                                    _medusa.PaymentSessionStatus
                                                        .ERROR
                                                );

                                            case 9:
                                                return _context11.abrupt(
                                                    "return",
                                                    _medusa.PaymentSessionStatus
                                                        .PENDING
                                                );

                                            case 10:
                                                return _context11.abrupt(
                                                    "return",
                                                    _medusa.PaymentSessionStatus
                                                        .PENDING
                                                );

                                            case 11:
                                            case "end":
                                                return _context11.stop();
                                        }
                                    }
                                },
                                _callee11,
                                this
                            );
                        }
                    )
                );

                function getStatus(_x15) {
                    return _getStatus.apply(this, arguments);
                }

                return getStatus;
            })(),
            /**
             * Obtain payment information from the notification received
             * @param {object} body from webhook request: req.body
             * @returns {object} MercadoPago req.body and payment detail
             */
        },
        {
            key: "notificationPayment",
            value: (function () {
                var _notificationPayment = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee12(body) {
                            var paymentId, payment;
                            return _regenerator["default"].wrap(
                                function _callee12$(_context12) {
                                    while (1) {
                                        switch (
                                            (_context12.prev = _context12.next)
                                        ) {
                                            case 0:
                                                paymentId = body.data.id;
                                                _context12.next = 3;
                                                return this.retrievePayment(
                                                    body.data
                                                );

                                            case 3:
                                                payment = _context12.sent;
                                                return _context12.abrupt(
                                                    "return",
                                                    _objectSpread(
                                                        _objectSpread({}, body),
                                                        {},
                                                        {
                                                            payment: payment,
                                                        }
                                                    )
                                                );

                                            case 5:
                                            case "end":
                                                return _context12.stop();
                                        }
                                    }
                                },
                                _callee12,
                                this
                            );
                        }
                    )
                );

                function notificationPayment(_x16) {
                    return _notificationPayment.apply(this, arguments);
                }

                return notificationPayment;
            })(),
        },
        {
            key: "createPaymentNew",
            value: (function () {
                var _createPaymentNew = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee13(paymentInput) {
                            return _regenerator["default"].wrap(
                                function _callee13$(_context13) {
                                    while (1) {
                                        switch (
                                            (_context13.prev = _context13.next)
                                        ) {
                                            case 0:
                                                throw new Error(
                                                    "createPaymentNew Method"
                                                );

                                            case 1:
                                            case "end":
                                                return _context13.stop();
                                        }
                                    }
                                },
                                _callee13
                            );
                        }
                    )
                );

                function createPaymentNew(_x17) {
                    return _createPaymentNew.apply(this, arguments);
                }

                return createPaymentNew;
            })(),
        },
        {
            key: "updatePaymentNew",
            value: (function () {
                var _updatePaymentNew = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/ _regenerator["default"].mark(
                        function _callee14(paymentSessionData, paymentInput) {
                            return _regenerator["default"].wrap(
                                function _callee14$(_context14) {
                                    while (1) {
                                        switch (
                                            (_context14.prev = _context14.next)
                                        ) {
                                            case 0:
                                                throw new Error(
                                                    "updatePaymentNew Method"
                                                );

                                            case 1:
                                            case "end":
                                                return _context14.stop();
                                        }
                                    }
                                },
                                _callee14
                            );
                        }
                    )
                );

                function updatePaymentNew(_x18, _x19) {
                    return _updatePaymentNew.apply(this, arguments);
                }

                return updatePaymentNew;
            })(),
        },
    ]);
    return MercadopagoProviderService;
})(_medusa.AbstractPaymentService);

(0, _defineProperty2["default"])(
    MercadopagoProviderService,
    "identifier",
    "mercadopago"
);
var _default = MercadopagoProviderService;
exports["default"] = _default;
