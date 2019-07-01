/* eslint-disable */

import superagent from 'superagent';
import { APIConfig } from '@constants';
import merge from 'lodash/merge';
const methods = ['get', 'post', 'put', 'patch', 'del'];
const HOSTNAME = APIConfig.hostname;
const ENDPOINTS = APIConfig.endpoints;
let DEFAULT_PARAMS = {};

function Intercept() {
  let callbacks = Array.prototype.slice.call(arguments);
  return function(req) {
    let callback = req.callback;
    req.callback = (err, res) => {
      callbacks.forEach(function(e) {
        e.call(req, err, res);
      });
      callback.call(req, err, res);
    };
  };
}

function formatUrl(path) {
  let apiPath = path;
  let apiPathArray = [];

  if(apiPath.indexOf('?') != -1) {
    apiPathArray = apiPath.split('?');
    apiPath = apiPathArray[0];
    apiPathArray.shift();
  }

  let mappedEndpoint = ENDPOINTS[apiPath];

  if(apiPath.indexOf('/') !== -1) {
    mappedEndpoint = "";
    let splitPathArray = apiPath.split('/');
    mappedEndpoint += ENDPOINTS[splitPathArray[0]]+'/';
    splitPathArray.shift();
    mappedEndpoint += splitPathArray.join('/')
  }
  const adjustedPath = mappedEndpoint[0] !== '/' ? HOSTNAME + '/' + mappedEndpoint : HOSTNAME + mappedEndpoint + (apiPathArray.length != 0 ? `?${apiPathArray.join('')}` : '');
  return adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers = {}, files, fields } = {}) => new Promise((resolve, reject) => {
        headers['Content-Type'] = "application/json";
        let request = superagent[method](formatUrl(path))
          .withCredentials()
          .set(headers);

        if (params) {
          params = merge(DEFAULT_PARAMS, params);
          request.query(params);
        }
        else{
          request.query(DEFAULT_PARAMS);
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          console.log('in files');
          request.send(files);
          //files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          console.log('data ', data);
          request.send(data);
        }

        request.end( (err, response = {}) => {
          if (err) {
            reject(response.body || err);
          }
          else {
            resolve(JSON.parse(decodeURIComponent(response.text)));
          }
        });
      });
    });
  }

  empty() {}
}
