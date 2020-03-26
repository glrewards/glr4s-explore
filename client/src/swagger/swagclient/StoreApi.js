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


import ApiClient from "./ApiClient";
import InlineResponse200 from './InlineResponse200';
import Menu from './Menu';
import Order from './Order';
import Product from './Product';
import ProductCollection from './ProductCollection';

/**
* Store service.
* @module //StoreApi
* @version 1.0.1-oas3
*/
export default class StoreApi {

    /**
    * Constructs a new StoreApi.
    * @alias module://StoreApi
    * @class
    * @param {module:/ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:/ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getCollections operation.
     * @callback module://StoreApi~getCollectionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:ProductCollection>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns list of collections provided
     * returns an array of product collections actually sourced from shopify. Referense the shopify API docs for info on attributes. This is sourced directly from shopify and uses shopify GID values for IDs. You cannot use these from the client but need to be passed to the server so it has the right reference
     * @param {module://StoreApi~getCollectionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:ProductCollection>}
     */
    getCollections(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [ProductCollection];
      return this.apiClient.callApi(
        '/store/collection/getCollections', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCurrentForSchool operation.
     * @callback module://StoreApi~getCurrentForSchoolCallback
     * @param {String} error Error message, if any.
     * @param {module:Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get the Current Open Order for a school if one exists
     * @param {String} schoolId the school we want the orders for. Example 5ce3c2d80e67a54e8fbefe74
     * @param {module://StoreApi~getCurrentForSchoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:Order}
     */
    getCurrentForSchool(schoolId, callback) {
      let postBody = null;
      // verify the required parameter 'schoolId' is set
      if (schoolId === undefined || schoolId === null) {
        throw new Error("Missing the required parameter 'schoolId' when calling getCurrentForSchool");
      }

      let pathParams = {
      };
      let queryParams = {
        'schoolId': schoolId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Order;
      return this.apiClient.callApi(
        '/store/order/getCurrentForSchool', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNavigation operation.
     * @callback module://StoreApi~getNavigationCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:Menu>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a 2 level menu definition
     * returns a menu object that defines how we expect collections to be displayed
     * @param {module://StoreApi~getNavigationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:Menu>}
     */
    getNavigation(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Menu];
      return this.apiClient.callApi(
        '/store/collection/getNavigation', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getOrderById operation.
     * @callback module://StoreApi~getOrderByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find order by ID.
     * **Get a single Order** Returns a single order.
     * @param {String} orderId ID of order to return. Example 5cfe314591ae1d279a6961a1
     * @param {module://StoreApi~getOrderByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:Order}
     */
    getOrderById(orderId, callback) {
      let postBody = null;
      // verify the required parameter 'orderId' is set
      if (orderId === undefined || orderId === null) {
        throw new Error("Missing the required parameter 'orderId' when calling getOrderById");
      }

      let pathParams = {
        'orderId': orderId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Order;
      return this.apiClient.callApi(
        '/store/order/{orderId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductById operation.
     * @callback module://StoreApi~getProductByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a product by its Id
     * get a product by its Id
     * @param {String} productId ID of product to to return. Example gid://shopify/Product/2066193383491
     * @param {module://StoreApi~getProductByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:Product}
     */
    getProductById(productId, callback) {
      let postBody = null;
      // verify the required parameter 'productId' is set
      if (productId === undefined || productId === null) {
        throw new Error("Missing the required parameter 'productId' when calling getProductById");
      }

      let pathParams = {
        'productId': productId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Product;
      return this.apiClient.callApi(
        '/store/product/{productId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProducts operation.
     * @callback module://StoreApi~getProductsCallback
     * @param {String} error Error message, if any.
     * @param {module:InlineResponse200} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns product inventory
     * returns an array of products actually sourced from shopify. Referense the shopify API docs for info on attributes. This is sourced directly from shopify and uses shopify GID values for IDs. You cannot use these from the client but need to be passed to the server so it has the right reference
     * @param {Object} opts Optional parameters
     * @param {String} opts.searchString pass a string that is used to search the title and description
     * @param {module://StoreApi~getProductsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:InlineResponse200}
     */
    getProducts(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'searchString': opts['searchString']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse200;
      return this.apiClient.callApi(
        '/store/product', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsForCollection operation.
     * @callback module://StoreApi~getProductsForCollectionCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:Product>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get an array of products by a collection Id
     * get an array of products by a collection Id
     * @param {String} collectionId ID of collection to search by gid://shopify/Collection/128622083
     * @param {module://StoreApi~getProductsForCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:Product>}
     */
    getProductsForCollection(collectionId, callback) {
      let postBody = null;
      // verify the required parameter 'collectionId' is set
      if (collectionId === undefined || collectionId === null) {
        throw new Error("Missing the required parameter 'collectionId' when calling getProductsForCollection");
      }

      let pathParams = {
      };
      let queryParams = {
        'collectionId': collectionId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Product];
      return this.apiClient.callApi(
        '/store/product/getProductsForCollection', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the placeOrder operation.
     * @callback module://StoreApi~placeOrderCallback
     * @param {String} error Error message, if any.
     * @param {module:Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * add a new order
     * Add a new order. We need to think about how this is called. an order only needs to be created if one does not already exist but there is a chance that two students could call this in some sort of race condition.
     * @param {module:Order} order create a new order
     * @param {module://StoreApi~placeOrderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:Order}
     */
    placeOrder(order, callback) {
      let postBody = order;
      // verify the required parameter 'order' is set
      if (order === undefined || order === null) {
        throw new Error("Missing the required parameter 'order' when calling placeOrder");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json', 'application/xml'];
      let returnType = Order;
      return this.apiClient.callApi(
        '/store/order', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the storeOrderGet operation.
     * @callback module://StoreApi~storeOrderGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:Order>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a list of all orders - only usable by GLR Admin
     * returns an array of all orders that meet the parameters THAT NEED TO BE DEFINED!
     * @param {String} schoolId the school we want the orders for.
     * @param {Object} opts Optional parameters
     * @param {Date} opts.fromDate the from which we want to retrieve forward a particular schools orders. example 2019-10-01
     * @param {module://StoreApi~storeOrderGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:Order>}
     */
    storeOrderGet(schoolId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'schoolId' is set
      if (schoolId === undefined || schoolId === null) {
        throw new Error("Missing the required parameter 'schoolId' when calling storeOrderGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'schoolId': schoolId,
        'fromDate': opts['fromDate']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Order];
      return this.apiClient.callApi(
        '/store/order', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateOrder operation.
     * @callback module://StoreApi~updateOrderCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing Order (assuming the order is held in mongo and not in shopify)
     * @param {module:Order} order Order object that needs to be added to the store
     * @param {module://StoreApi~updateOrderCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateOrder(order, callback) {
      let postBody = order;
      // verify the required parameter 'order' is set
      if (order === undefined || order === null) {
        throw new Error("Missing the required parameter 'order' when calling updateOrder");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['ApiKeyAuth', 'basicAuth'];
      let contentTypes = ['application/json', 'application/xml'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/store/order', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
