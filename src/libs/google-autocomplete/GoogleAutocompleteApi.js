import qs from 'qs';
import axios from 'axios';
import config from '../../../config';
import { detailsResponse } from './mock';
// import { UserDataService } from '../../../services';

class GoogleAutocompleteApi {
  constructor(key) {
    this._key = key;
    this._requests = [];
  }

  // Predictions response example
  // {
  //   "predictions": [
  //       {
  //           "description": "Angeles, Pampanga, Philippines",
  //           "id": "f738ddfad6a846115335c3408d7b196b72908da9",
  //           "matched_substrings": [
  //               {
  //                   "length": 7,
  //                   "offset": 0
  //               }
  //           ],
  //           "place_id": "ChIJH-bS7obyljMRNrTZiiSC7T0",
  //           "reference": "CkQ2AAAAC97cPM1sQQpIz4SYnnY-7s9nvlXVqzmyuOqx0RrDSAHuBLWw40KVhHeFdb-j9GJBUv63Zz-vpHOoLy0q79x-bxIQEmLIHJwtNoPQMXg9s88okBoUocB7Hfm9nmOiGmWyBvr3fwCeLTE",
  //           "structured_formatting": {
  //               "main_text": "Angeles",
  //               "main_text_matched_substrings": [
  //                   {
  //                       "length": 7,
  //                       "offset": 0
  //                   }
  //               ],
  //               "secondary_text": "Pampanga, Philippines"
  //           },
  //           "terms": [
  //               {
  //                   "offset": 0,
  //                   "value": "Angeles"
  //               },
  //               {
  //                   "offset": 9,
  //                   "value": "Pampanga"
  //               },
  //               {
  //                   "offset": 19,
  //                   "value": "Philippines"
  //               }
  //           ],
  //           "types": [
  //               "locality",
  //               "political",
  //               "geocode"
  //           ]
  //       },
  //     ]
  //   }
  getPredictions({ text, types }, options) {
    const encodeText = encodeURIComponent(text);
    const parsedQuery = this._stringifyQuery({ types });

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeText}&${parsedQuery}`;

    return this._request(
      {
        url,
        method: 'GET',
      },
      options,
    );
  }

  // Example of place detail
  // {
  //   "html_attributions": [],
  //   "result": {
  //       "address_components": [
  //           {
  //               "long_name": "6550",
  //               "short_name": "6550",
  //               "types": [
  //                   "street_number"
  //               ]
  //           },
  //           {
  //               "long_name": "Homewood Avenue",
  //               "short_name": "Homewood Ave",
  //               "types": [
  //                   "route"
  //               ]
  //           },
  //           {
  //               "long_name": "Central LA",
  //               "short_name": "Central LA",
  //               "types": [
  //                   "neighborhood",
  //                   "political"
  //               ]
  //           },
  //           {
  //               "long_name": "Los Angeles",
  //               "short_name": "Los Angeles",
  //               "types": [
  //                   "locality",
  //                   "political"
  //               ]
  //           },
  //           {
  //               "long_name": "Los Angeles County",
  //               "short_name": "Los Angeles County",
  //               "types": [
  //                   "administrative_area_level_2",
  //                   "political"
  //               ]
  //           },
  //           {
  //               "long_name": "California",
  //               "short_name": "CA",
  //               "types": [
  //                   "administrative_area_level_1",
  //                   "political"
  //               ]
  //           },
  //           {
  //               "long_name": "United States",
  //               "short_name": "US",
  //               "types": [
  //                   "country",
  //                   "political"
  //               ]
  //           },
  //           {
  //               "long_name": "90028",
  //               "short_name": "90028",
  //               "types": [
  //                   "postal_code"
  //               ]
  //           }
  //       ],
  //       "adr_address": "<span class=\"street-address\">6550 Homewood Ave</span>, <span class=\"locality\">Los Angeles</span>, <span class=\"region\">CA</span> <span class=\"postal-code\">90028</span>, <span class=\"country-name\">USA</span>",
  //       "formatted_address": "6550 Homewood Ave, Los Angeles, CA 90028, USA",
  //       "geometry": {
  //           "location": {
  //               "lat": 34.0949928,
  //               "lng": -118.3322455
  //           },
  //           "viewport": {
  //               "northeast": {
  //                   "lat": 34.0964701302915,
  //                   "lng": -118.3308974697085
  //               },
  //               "southwest": {
  //                   "lat": 34.0937721697085,
  //                   "lng": -118.3335954302915
  //               }
  //           }
  //       },
  //       "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
  //       "id": "2aa82730a758fc659b0f90d570e9680f7c49500a",
  //       "name": "6550 Homewood Ave",
  //       "place_id": "Ei02NTUwIEhvbWV3b29kIEF2ZSwgTG9zIEFuZ2VsZXMsIENBIDkwMDI4LCBVU0EiGxIZChQKEglJtl1aML_CgBHvjG0QbCA6rBCWMw",
  //       "reference": "CpQBiwAAACFdC0e5rKNuwsCenEKQB5EWQYpq3VBqs0AqOG22UWKbN2RNPKY6AC72w9buTBDE6FnNOdgmQJcuTcQqeFXepXDiS3lW3YgH613xAOpkDOMcfDIYFEDwQJs9X5hBdPlBYaZY7o2nZwr7luYj13FdnxCNBqFSmylz1Pr2cFLFaeIs1et--VtLYlfn1WvjdBsrwxIQEMWMT23W4HxyUuwnlHd4JhoUUBQhznGSdV8bD7WaMAo-L2rk-2k",
  //       "scope": "GOOGLE",
  //       "types": [
  //           "street_address"
  //       ],
  //       "url": "https://maps.google.com/?q=6550+Homewood+Ave,+Los+Angeles,+CA+90028,+USA&ftid=0x80c2bf305a5db649:0x7dba5e146f23a056",
  //       "utc_offset": -420,
  //       "vicinity": "Los Angeles"
  //   },
  //   "status": "OK"
  // }
  async getPlaceDetails({ placeid, language }, options) {
    const parsedQuery = this._stringifyQuery({ placeid, language });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?${parsedQuery}`;

    // This is a huge workaround in order to fetch place details
    // since we are using free places api key

    return new Promise((res) => {
      this._request(
        {
          url,
          method: 'GET',
        },
        options,
      )
        .then((response) => {
          if (response.data.error_message) {
            return res(detailsResponse);
          }
          res(response);
        })
        .catch(() => res(detailsResponse));
    });
  }

  getCurrentLocation({ enableHighAccuracyLocation = false } = {}) {
    /* return UserDataService.getCurrentLocation({
      enableHighAccuracyLocation,
    }); */
  }

  abortAllRequests() {
    this._requests.forEach((request) => request.abort());
  }

  _request({ url, method }, options = { timeout: 30000 }) {
    return axios({
      method,
      url,
      ...options,
    });
  }

  _stringifyQuery(query) {
    return qs.stringify(
      Object.assign(
        {
          key: this._key,
        },
        query,
      ),
    );
  }

  _createError(stack = 'uncached error') {
    // eslint-disable-line
    return new Error(`google places autocomplete: ${stack}`);
  }
}

const googleAutocompleteApi = new GoogleAutocompleteApi(
  config.GOOGLE_API_KEY,
);

export default googleAutocompleteApi;
