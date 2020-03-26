/**
 * GLR 4 Schools
 * **NUMBER ONE TOPIC IS HOW BEST TO IMPLEMENT THESE API so that only data is segregated by school.**  Need to implement a form of authentication check PER SCHOOL. Is there a way to leverage the authorisation process implement by Group Call Xporter? This is the full set of API for GLR 4 Schools. Security definitions and exqmples need to be added.
 *
 * The version of the OpenAPI document: 1.0.1-oas3
 * Contact: john@greatlittlerewards.co.uk
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from './ApiClient';
import LineItem from './LineItem';

/**
 * The Order model module.
 * @module //Order
 * @version 1.0.1-oas3
 */
class Order {
    /**
     * Constructs a new <code>Order</code>.
     * @alias module://Order
     */
    constructor() {

        Order.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) {
    }

    /**
     * Constructs a <code>Order</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module://Order} obj Optional instance to populate.
     * @return {module://Order} The populated <code>Order</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Order();

            if (data.hasOwnProperty('Id')) {
                obj['Id'] = ApiClient.convertToType(data['Id'], 'String');
            }
            if (data.hasOwnProperty('finStatus')) {
                obj['finStatus'] = ApiClient.convertToType(data['finStatus'], 'String');
            }
            if (data.hasOwnProperty('fulfillStatus')) {
                obj['fulfillStatus'] = ApiClient.convertToType(data['fulfillStatus'], 'String');
            }
            if (data.hasOwnProperty('schoolId')) {
                obj['schoolId'] = ApiClient.convertToType(data['schoolId'], 'String');
            }
            if (data.hasOwnProperty('lineItems')) {
                obj['lineItems'] = ApiClient.convertToType(data['lineItems'], [LineItem]);
            }
            if (data.hasOwnProperty('orderTotal')) {
                obj['orderTotal'] = ApiClient.convertToType(data['orderTotal'], 'Number');
            }
            if (data.hasOwnProperty('taxTotal')) {
                obj['taxTotal'] = ApiClient.convertToType(data['taxTotal'], 'Number');
            }
            if (data.hasOwnProperty('shopifyOrderId')) {
                obj['shopifyOrderId'] = ApiClient.convertToType(data['shopifyOrderId'], 'String');
            }
            if (data.hasOwnProperty('shopifyDraftOrderId')) {
                obj['shopifyDraftOrderId'] = ApiClient.convertToType(data['shopifyDraftOrderId'], 'String');
            }
            if (data.hasOwnProperty('dateOpened')) {
                obj['dateOpened'] = ApiClient.convertToType(data['dateOpened'], 'Date');
            }
            if (data.hasOwnProperty('dateFulfilled')) {
                obj['dateFulfilled'] = ApiClient.convertToType(data['dateFulfilled'], 'Date');
            }
        }
        return obj;
    }


}

/**
 * @member {String} Id
 */
Order.prototype['Id'] = undefined;

/**
 * @member {module:Order.FinStatusEnum} finStatus
 */
Order.prototype['finStatus'] = undefined;

/**
 * @member {module:Order.FulfillStatusEnum} fulfillStatus
 */
Order.prototype['fulfillStatus'] = undefined;

/**
 * @member {String} schoolId
 */
Order.prototype['schoolId'] = undefined;

/**
 * @member {Array.<module:LineItem>} lineItems
 */
Order.prototype['lineItems'] = undefined;

/**
 * @member {Number} orderTotal
 */
Order.prototype['orderTotal'] = undefined;

/**
 * @member {Number} taxTotal
 */
Order.prototype['taxTotal'] = undefined;

/**
 * If this order has been sent to shopify the order Id will be stored here
 * @member {String} shopifyOrderId
 */
Order.prototype['shopifyOrderId'] = undefined;

/**
 * If this order is linked to a draft order in shopify the order Id will be stored here
 * @member {String} shopifyDraftOrderId
 */
Order.prototype['shopifyDraftOrderId'] = undefined;

/**
 * @member {Date} dateOpened
 */
Order.prototype['dateOpened'] = undefined;

/**
 * @member {Date} dateFulfilled
 */
Order.prototype['dateFulfilled'] = undefined;





/**
 * Allowed values for the <code>finStatus</code> property.
 * @enum {String}
 * @readonly
 */
Order['FinStatusEnum'] = {

    /**
     * value: "paid"
     * @const
     */
    "paid": "paid",

    /**
     * value: "unpaid"
     * @const
     */
    "unpaid": "unpaid"
};


/**
 * Allowed values for the <code>fulfillStatus</code> property.
 * @enum {String}
 * @readonly
 */
Order['FulfillStatusEnum'] = {

    /**
     * value: "fulfilled"
     * @const
     */
    "fulfilled": "fulfilled",

    /**
     * value: "unfulfilled"
     * @const
     */
    "unfulfilled": "unfulfilled"
};



export default Order;

