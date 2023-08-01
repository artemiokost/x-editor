"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var i18nConfig = {
  "en-US": {
    "Block list": "Block list",
    "Enter a URL": "Enter a URL",
    "Enter a Tweet ID": "Enter a Tweet ID",
    "Invalid link": "Invalid link",
    "Type the link and press enter": "Type the link and press enter"
  },
  "ru-RU": {
    "Block list": "Список блоков",
    "Enter a URL": "Введите URL",
    "Enter a Tweet ID": "Введите Tweet ID",
    "Invalid link": "Ссылка не действительна",
    "Type the link and press enter": "Введите адресс ссылки и нажмите ввод"
  }
};

var replaceData = exports.replaceData = function replaceData(str, data) {
  var rgx = /{{\s?(\w+)\s?}}/gm;
  var msg = str;
  msg = msg.replace(rgx, function (_, key) {
    return data[key];
  });
  return msg;
};

exports.default = i18nConfig;