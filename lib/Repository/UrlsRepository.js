"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _Url = _interopRequireDefault(require("../Model/Url"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _Option = _interopRequireDefault(require("../Model/Option"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UrlsRepository {
  constructor(option, args) {
    this.option = option;
    this.args = args;
  } // noinspection JSUnusedGlobalSymbols

  /**
   * Find urls for range specified in the Pa11yLogin
   */


  findForRange() {
    let urlsFile = _path.default.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');

    let startUrl = 0;
    let endUrl = -1;

    if (this.option.hasOwnProperty('a11y') && this.option.a11y.hasOwnProperty('pa11yLogin')) {
      if (this.option.a11y.pa11yLogin.hasOwnProperty('startUrl')) {
        startUrl = this.option.a11y.pa11yLogin.startUrl;
      }

      if (this.option.a11y.pa11yLogin.hasOwnProperty('endUrl')) {
        endUrl = this.option.a11y.pa11yLogin.endUrl;
      }
    }

    return JSON.parse(_fs.default.readFileSync(urlsFile).toString()).slice(startUrl, endUrl).map(entry => {
      return new _Url.default(entry.name, entry.url, entry.fragment);
    });
  }
  /**
   * Find urls for range specified in the Pa11yLogin
   */


  findAll() {
    let urlsFile = _path.default.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');

    return JSON.parse(_fs.default.readFileSync(urlsFile).toString()).map(entry => {
      return new _Url.default(entry.name, entry.url, entry.fragment);
    });
  }

}

exports.default = UrlsRepository;
//# sourceMappingURL=UrlsRepository.js.map