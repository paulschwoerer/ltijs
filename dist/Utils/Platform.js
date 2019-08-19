"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

// Utis
const Database = require('./Database');

const Auth = require('./Auth');

const provPlatformDebug = require('debug')('provider:platform');
/**
 * @description Class representing a registered platform.
 */


class Platform {
  /**
     * @param {string} name - Platform name.
     * @param {string} platformUrl - Platform url.
     * @param {string} clientId - Client Id generated by the platform.
     * @param {string} authenticationEndpoint - Authentication endpoint that the tool will use to authenticate within the platform.
     * @param {string} accesstokenEndpoint - Access token endpoint for the platform.
     * @param {string} kid - Key id for local keypair used to sign messages to this platform.
     * @param {string} _ENCRYPTIONKEY - Encryption key used
     * @param {Object} _authConfig - Authentication configurations for the platform.
     */
  constructor(name, platformUrl, clientId, authenticationEndpoint, accesstokenEndpoint, kid, _ENCRYPTIONKEY, _authConfig, logger) {
    _platformName.set(this, {
      writable: true,
      value: void 0
    });

    _platformUrl.set(this, {
      writable: true,
      value: void 0
    });

    _clientId.set(this, {
      writable: true,
      value: void 0
    });

    _authEndpoint.set(this, {
      writable: true,
      value: void 0
    });

    _authConfig2.set(this, {
      writable: true,
      value: void 0
    });

    _ENCRYPTIONKEY2.set(this, {
      writable: true,
      value: void 0
    });

    _accesstokenEndpoint.set(this, {
      writable: true,
      value: void 0
    });

    _kid.set(this, {
      writable: true,
      value: void 0
    });

    _logger.set(this, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2.default)(this, _authConfig2, _authConfig);
    (0, _classPrivateFieldSet2.default)(this, _ENCRYPTIONKEY2, _ENCRYPTIONKEY);
    (0, _classPrivateFieldSet2.default)(this, _platformName, name);
    (0, _classPrivateFieldSet2.default)(this, _platformUrl, platformUrl);
    (0, _classPrivateFieldSet2.default)(this, _clientId, clientId);
    (0, _classPrivateFieldSet2.default)(this, _authEndpoint, authenticationEndpoint);
    (0, _classPrivateFieldSet2.default)(this, _accesstokenEndpoint, accesstokenEndpoint);
    (0, _classPrivateFieldSet2.default)(this, _kid, kid);
    (0, _classPrivateFieldSet2.default)(this, _logger, logger);
  }
  /**
     * @description Sets/Gets the platform name.
     * @param {string} [name] - Platform name.
     */


  async platformName(name) {
    if (!name) return (0, _classPrivateFieldGet2.default)(this, _platformName);

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        platformName: name
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _platformName, name);
    return this;
  }
  /**
     * @description Sets/Gets the platform url.
     * @param {string} [url] - Platform url.
     */


  async platformUrl(url) {
    if (!url) return (0, _classPrivateFieldGet2.default)(this, _platformUrl);

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        platformUrl: url
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _platformUrl, url);
    return this;
  }
  /**
     * @description Sets/Gets the platform client id.
     * @param {string} [clientId] - Platform client id.
     */


  async platformClientId(clientId) {
    if (!clientId) return (0, _classPrivateFieldGet2.default)(this, _clientId);

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        clientId: clientId
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _clientId, clientId);
    return this;
  }
  /**
     * @description Gets the platform key_id.
     */


  platformKid() {
    return (0, _classPrivateFieldGet2.default)(this, _kid);
  }
  /**
     * @description Gets the RSA public key assigned to the platform.
     *
     */


  async platformPublicKey() {
    try {
      const key = await Database.Get((0, _classPrivateFieldGet2.default)(this, _ENCRYPTIONKEY2), 'publickey', {
        kid: (0, _classPrivateFieldGet2.default)(this, _kid)
      });
      return key[0].key;
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }
  }
  /**
     * @description Gets the RSA private key assigned to the platform.
     *
     */


  async platformPrivateKey() {
    try {
      const key = await Database.Get((0, _classPrivateFieldGet2.default)(this, _ENCRYPTIONKEY2), 'privatekey', {
        kid: (0, _classPrivateFieldGet2.default)(this, _kid)
      });
      return key[0].key;
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }
  }
  /**
     * @description Sets/Gets the platform authorization configurations used to validate it's messages.
     * @param {string} method - Method of authorization "RSA_KEY" or "JWK_KEY" or "JWK_SET".
     * @param {string} key - Either the RSA public key provided by the platform, or the JWK key, or the JWK keyset address.
     */


  async platformAuthConfig(method, key) {
    if (!method && !key) return (0, _classPrivateFieldGet2.default)(this, _authConfig2);
    if (method !== 'RSA_KEY' && method !== 'JWK_KEY' && method !== 'JWK_SET') throw new Error('Invalid message validation method. Valid methods are "RSA_KEY", "JWK_KEY", "JWK_SET"');
    if (!key) throw new Error('Missing secong argument key or keyset_url.');
    const authConfig = {
      method: method,
      key: key
    };

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        authConfig: authConfig
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _authConfig2, authConfig);
    return this;
  }
  /**
     * @description Sets/Gets the platform authorization endpoint used to perform the OIDC login.
     * @param {string} [authEndpoint] - Platform authorization endpoint.
     */


  async platformAuthEndpoint(authEndpoint) {
    if (!authEndpoint) return (0, _classPrivateFieldGet2.default)(this, _authEndpoint);

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        authEndpoint: authEndpoint
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _authEndpoint, authEndpoint);
    return this;
  }
  /**
     * @description Sets/Gets the platform access token endpoint used to authenticate messages to the platform.
     * @param {string} [accesstokenEndpoint] - Platform access token endpoint.
     */


  async platformAccessTokenEndpoint(accesstokenEndpoint) {
    if (!accesstokenEndpoint) return (0, _classPrivateFieldGet2.default)(this, _accesstokenEndpoint);

    try {
      await Database.Modify(false, 'platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }, {
        accesstokenEndpoint: accesstokenEndpoint
      });
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }

    (0, _classPrivateFieldSet2.default)(this, _accesstokenEndpoint, accesstokenEndpoint);
    return this;
  }
  /**
     * @description Gets the platform access token or attempts to generate a new one.
     */


  async platformAccessToken() {
    const token = await Database.Get((0, _classPrivateFieldGet2.default)(this, _ENCRYPTIONKEY2), 'accesstoken', {
      platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
    });

    if (!token) {
      provPlatformDebug('Access_token for ' + (0, _classPrivateFieldGet2.default)(this, _platformUrl) + ' not found');
      provPlatformDebug('Attempting to generate new access_token for ' + (0, _classPrivateFieldGet2.default)(this, _platformUrl));
      const res = await Auth.getAccessToken(this, (0, _classPrivateFieldGet2.default)(this, _ENCRYPTIONKEY2));
      return res;
    } else {
      provPlatformDebug('Access_token found');

      if ((Date.now() - token[0].createdAt) / 1000 > token[0].expires_in) {
        provPlatformDebug('Token expired');
        provPlatformDebug('Access_token for ' + (0, _classPrivateFieldGet2.default)(this, _platformUrl) + ' not found');
        provPlatformDebug('Attempting to generate new access_token for ' + (0, _classPrivateFieldGet2.default)(this, _platformUrl));
        const res = await Auth.getAccessToken(this, (0, _classPrivateFieldGet2.default)(this, _ENCRYPTIONKEY2));
        return res;
      }

      return token[0].token;
    }
  }
  /**
   * @description Deletes a registered platform.
   */


  async remove() {
    try {
      return Promise.all([Database.Delete('platform', {
        platformUrl: (0, _classPrivateFieldGet2.default)(this, _platformUrl)
      }), Database.Delete('publickey', {
        kid: (0, _classPrivateFieldGet2.default)(this, _kid)
      }), Database.Delete('privatekey', {
        kid: (0, _classPrivateFieldGet2.default)(this, _kid)
      })]);
    } catch (err) {
      provPlatformDebug(err.message);
      if ((0, _classPrivateFieldGet2.default)(this, _logger)) (0, _classPrivateFieldGet2.default)(this, _logger).log({
        level: 'error',
        message: 'Message: ' + err.message + '\nStack: ' + err.stack
      });
      return false;
    }
  }

}

var _platformName = new WeakMap();

var _platformUrl = new WeakMap();

var _clientId = new WeakMap();

var _authEndpoint = new WeakMap();

var _authConfig2 = new WeakMap();

var _ENCRYPTIONKEY2 = new WeakMap();

var _accesstokenEndpoint = new WeakMap();

var _kid = new WeakMap();

var _logger = new WeakMap();

module.exports = Platform;