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
import School from './School';

/**
* School service.
* @module //SchoolApi
* @version 1.0.1-oas3
*/
export default class SchoolApi {

    /**
    * Constructs a new SchoolApi.
    * @alias module://SchoolApi
    * @class
    * @param {module:/ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:/ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getSchoolById operation.
     * @callback module://SchoolApi~getSchoolByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:School} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * returns simple school data based on a school Id
     * @param {String} schoolId ID of school to return
     * @param {module://SchoolApi~getSchoolByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:School}
     */
    getSchoolById(schoolId, callback) {
      let postBody = null;
      // verify the required parameter 'schoolId' is set
      if (schoolId === undefined || schoolId === null) {
        throw new Error("Missing the required parameter 'schoolId' when calling getSchoolById");
      }

      let pathParams = {
        'schoolId': schoolId
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
      let returnType = School;
      return this.apiClient.callApi(
        '/school/{schoolId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
