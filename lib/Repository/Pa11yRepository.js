"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pa11y = _interopRequireDefault(require("pa11y"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Option = _interopRequireDefault(require("../Model/Option"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _Progress = _interopRequireDefault(require("../Model/Progress"));

var _HtmlRepository = _interopRequireDefault(require("../Repository/HtmlRepository"));

var _Url = _interopRequireDefault(require("../Model/Url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Pa11yRepository {
  constructor(option, args) {
    this.option = option;
    this.args = args;
  }
  /**
   * Test a bunch of urls.
   */


  test(urlsToGet, started, updated) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.createFolder();

      let htmlRepository = new _HtmlRepository.default(_this.args.getProjectPath());
      let urls = urlsToGet.filter(url => {
        return !_fs.default.existsSync(_path.default.join(_this.folder, url.name + '.json'));
      }).filter(url => {
        return !url.url.endsWith('.pdf');
      }).filter(url => {
        return url.errorCount < 3;
      });
      let progress = new _Progress.default(null, urls.length);
      started(progress);

      for (let url of urls) {
        let scanLocation = htmlRepository.file(url);

        if (_this.args.remote) {
          let fragment = url.fragment;
          scanLocation = url.url + (fragment ? fragment : '');
        }

        _this.currentUrl = url;
        const results = yield (0, _pa11y.default)(scanLocation, _this.option.a11y);

        const jsonFile = _path.default.join(_this.folder, url.name + '.json');

        yield _fs.default.writeFileSync(jsonFile, JSON.stringify(results));
        url.tested = true;
        progress.update(url);
        updated(progress);
      }

      return new _Progress.default(null, urls.length);
    })();
  }
  /**
   * Create project folder.
   */


  createFolder() {
    this.folder = _path.default.join(this.args.output.filename, this.args.getSiteName(), 'a11y');

    if (!_fs.default.existsSync(this.folder)) {
      _fs.default.mkdirSync(this.folder);
    }
  }

}

exports.default = Pa11yRepository;
//# sourceMappingURL=Pa11yRepository.js.map