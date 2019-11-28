require = function a(s, c, r) {
function u(t, e) {
if (!c[t]) {
if (!s[t]) {
var n = "function" == typeof require && require;
if (!e && n) return n(t, !0);
if (l) return l(t, !0);
var i = new Error("Cannot find module '" + t + "'");
throw i.code = "MODULE_NOT_FOUND", i;
}
var o = c[t] = {
exports: {}
};
s[t][0].call(o.exports, function(e) {
return u(s[t][1][e] || e);
}, o, o.exports, a, s, c, r);
}
return c[t].exports;
}
for (var l = "function" == typeof require && require, e = 0; e < r.length; e++) u(r[e]);
return u;
}({
AdMob: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "def9btnQFNIvasGJrnZjxoV", "AdMob");
var i = e("Ad"), a = (cc.Enum({
ERROR_CODE_INTERNAL_ERROR: 0,
ERROR_CODE_INVALID_REQUEST: 1,
ERROR_CODE_NETWORK_ERROR: 2,
ERROR_CODE_NO_FILL: 3
}), "admob"), s = "type", c = "name", o = "adType", r = "adName", u = "adInfo", l = null;
cc.Class({
extends: cc.Component,
properties: {},
statics: {
getInstance: function() {
if (null === l) {
var e = new cc.Node();
e.name = "AdMob";
cc.game.addPersistRootNode(e);
(l = e.addComponent("AdMob")).firstInit();
}
return l;
}
},
onLoad: function() {
this.firstInit();
},
onDestroy: function() {},
initAd: function(e) {
this.firstInit();
var t = {
cmdType: 0
};
t.adAppId = e;
t.adCallback = "msgAdCallback";
cc.GameApplication.JavascriptBridgeNative.sendMessage(a, t);
},
setBannerStatus: function(e, t) {
var n = this.getAdMob(e);
if (null !== n) {
var i = {
cmdType: 3
};
i[s] = n.getAdType();
i[c] = n.getAdName();
i.status = t;
cc.GameApplication.JavascriptBridgeNative.sendMessage(a, i);
} else cc.log("setBannerStatus: not find ad");
},
addMob: function(e) {
e.forEach(function(e) {
var t = e[1];
this.adHashMap[t] ? cc.log("error: %s had exist", t) : this.adHashMap[t] = this.production(e);
}, this);
},
nativeInit: function() {
var e = [];
for (var t in this.adHashMap) if (this.adHashMap.hasOwnProperty(t)) {
var n = this.adHashMap[t];
if (n.isAvailable()) {
var i = {};
i[s] = n.getAdType();
i[c] = n.getAdName();
i.unitId = n.getAdUnitId();
e.push(i);
}
}
if (0 !== e.length) {
var o = {
cmdType: 1
};
o.adArray = e;
cc.GameApplication.JavascriptBridgeNative.sendMessage(a, o);
}
},
openMob: function(e, t, n) {
var i = this.getAdMob(e);
if (null !== i) {
t && i.setOnceCallWhenOpenPage(t, n);
var o = {
cmdType: 2
};
o[s] = i.getAdType();
o[c] = i.getAdName();
cc.GameApplication.JavascriptBridgeNative.sendMessage(a, o);
} else cc.log("openMob: not find ad");
},
loadMob: function(e) {
var t = this.getAdMob(e);
if (null !== t) {
var n = {
cmdType: 5
};
n[s] = t.getAdType();
n[c] = t.getAdName();
cc.GameApplication.JavascriptBridgeNative.sendMessage(a, n);
} else cc.log("loadMob: not find ad");
},
getAdMob: function(e) {
return this.getAd(e);
},
getAd: function(e) {
if (!this.adHashMap) return null;
var t = this.adHashMap[e];
return t || null;
},
msgAdCallback: function(e) {
if (e) {
cc.log("adCallback, type:%s, name:%s, func:%s, info:%s", e[o], e[r], e.adFunction, e[u] ? JSON.stringify(e[u]) : "");
var t = this.getAdMob(e[r]);
if (!t) return;
var n = e[o];
if (t.getAdType() !== n) return;
var i = t.msgAdCallback;
i && i.call(t, e);
}
},
firstInit: function() {
if (!this.firstInitEnable) {
this.firstInitEnable = !0;
cc.GameApplication.Init();
cc.GameApplication.JavascriptBridgeReceive.subscribe("msgAdCallback", this.msgAdCallback, this);
this.adHashMap = {};
}
},
production: function(e) {
if (0 === e[0]) return new i.Banner(e[0], e[1], e[2]);
if (1 === e[0]) return new i.Interstitial(e[0], e[1], e[2]);
if (2 === e[0]) return new i.RewardVideo(e[0], e[1], e[2]);
cc.error("production");
},
getBannerBottomAtGameScene: function(e) {
var t = cc.Canvas.instance;
if (!t) return 0;
var n = t.fitWidth, i = t.fitHeight;
if (n && i) {
var o = cc.view.getFrameSize().width / cc.view.getFrameSize().height, a = t.designResolution.width / t.designResolution.height;
if (o < a) {
var s = cc.view.getFrameSize().width / a, c = parseInt(.5 * (cc.view.getFrameSize().height - s));
return e < c ? 0 : (e - c) / s * cc.director.getVisibleSize().height;
}
}
return e / cc.view.getFrameSize().height * cc.director.getVisibleSize().height;
}
});
cc._RF.pop();
}, {
Ad: "Ad"
} ],
AdsPlugin: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d7939GXlSpCgaeDb9HPtIU/", "AdsPlugin");
var o = e("Proxy"), i = e("scHelper"), a = !0;
cc.Class({
extends: cc.Component,
properties: {
appStore: cc.Prefab,
pushView: cc.Prefab,
pushBigView: cc.Prefab,
appInfo: cc.Prefab,
appStoreButton: cc.Button,
appInfoButton: cc.Button,
appLeaderBoardButton: cc.Button
},
onLoad: function() {
if (a) {
a = !1;
this.onFirstEvent();
}
this.onLoadEvent();
},
onFirstEvent: function() {
if (o.getProxy("push")) {
var e = cc.instantiate(this.pushView);
e.position = cc.p(360, 640);
cc.game.addPersistRootNode(e);
var t = cc.instantiate(this.pushBigView);
t.position = cc.p(360, 640);
cc.game.addPersistRootNode(t);
if (this.appInfo) {
var n = cc.instantiate(this.appInfo);
n.position = cc.p(360, 640);
cc.game.addPersistRootNode(n);
}
}
if (!sc.PushModule.isUnlock()) {
var i = cc.instantiate(this.appStore);
i.position = cc.p(360, 640);
cc.game.addPersistRootNode(i);
}
},
onLoadEvent: function() {
sc.PushModule.doRequestBanner();
sc.PushModule.doRequestReward(function() {}, this);
var e = !!o.getProxy("push"), t = sc.PushModule.isUnlock();
this.appStoreButton && (this.appStoreButton.node.active = !t);
this.appInfoButton && (this.appInfoButton.node.active = e);
this.appLeaderBoardButton && (this.appLeaderBoardButton.node.active = e);
this.appStoreButton && i.addButtonEvent(this.appStoreButton, this, "onClickAppStore");
this.appInfoButton && i.addButtonEvent(this.appInfoButton, this, "onClickAppInfo");
},
onClickAppStore: function(e) {
if (!(null === e.getID() || 0 < e.getID())) {
var t = o.getProxy("appstore");
t && t.showView();
}
},
onClickAppInfo: function(e) {
if (!(null === e.getID() || 0 < e.getID())) {
var t = o.getProxy("appinfo");
t && t.showView();
}
}
});
cc._RF.pop();
}, {
Proxy: "Proxy",
scHelper: "scHelper"
} ],
AdsSplash: [ function(n, e, t) {
"use strict";
cc._RF.push(e, "c88bfXGizBMRLteunB6/IQj", "AdsSplash");
var i = n("Proxy"), o = n("GameInitImp"), a = n("PushModule"), s = "oneline.no_more_ads";
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this._initI18n();
this._babyCenterPreHandle();
this._initDataRecord();
this._initAdmob();
this._initIap();
if (!o.getInstance().isTwoBabyCenter()) {
this._initInternalPush();
this._initLeaderBoard();
}
},
_initI18n: function() {
var e = n("LanguageData");
if (window.i18n.languages[cc.sys.language]) e.init(cc.sys.language); else {
cc.log("i18n not find:%s changed:%s", cc.sys.language, cc.sys.LANGUAGE_ENGLISH);
e.init(cc.sys.LANGUAGE_ENGLISH);
}
},
_babyCenterPreHandle: function() {
if (o.getInstance().isTwoBabyCenter()) {
a.getInstance().changedLock(!1);
var e = {};
e.ProductId = s;
var t = cc.GameApplication.JavascriptBridgeNative.sendMessage("GetRecord", e);
if (0 === t.result) {
t.Unlock && a.getInstance().unLockEvent();
t.Likes && a.getInstance().likesEvent();
cc.log("询问游戏解锁结果：成功, lock:%s, likes:%s", !!t.Unlock, !!t.Likes);
} else cc.log("询问游戏解锁结果: 失败");
}
},
_initDataRecord: function() {
a.getInstance().isLikes();
},
_initAdmob: function() {
var e = !a.getInstance().isUnlock(), t = n("AdMob").getInstance();
i.addProxy("admob", t);
t.initAd("ca-app-pub-4491728783248239~9657097431");
t.addMob([ [ 0, "banner", "ca-app-pub-4491728783248239/5334709044" ], [ 1, "page", "ca-app-pub-4491728783248239/5034066960" ], [ 2, "reward", "ca-app-pub-4491728783248239/2325402325" ] ]);
t.getAdMob("banner").setAvailable(e);
t.getAdMob("page").setAvailable(e);
t.getAdMob("reward").setAvailable(!0);
t.nativeInit();
},
_initIap: function() {
var e = n("Iap").getInstance();
i.addProxy("iap", e);
e.initIap("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhY9ZK+TgpGK+I8n/lwp1Dv8r+kvByGPiMfO09dHslc4jmvTv8ewnBkZdDtPsTw/ChitUxHtLRGjWcFnbf9euM1o9eC6y6OwKUlL9jGHBsJwrlxXoYHsEhZ+w2TRmp1mn/wqeBg0r27KfvAsd/U2RfuOG/Kuo10+hBwxKG/fRhdzo6ORKvIP5bJEb8qTBoj+74TvAaqZaYTDInMcu/lBpHUOPWDJREtdnBKJjOFu6WOAfiscptWrHzNX/uyRgjO73MgN0qphkwa07xbDyvhAa0vrWS3GxZ/a97ArB6zBjZ0I2BY1XFXVZxgfgEGbzTbOzyUK4gzofpqrwEOEla2wYlQIDAQAB", [ s ], !0);
a.getInstance().isUnlock() || e.nativeInit();
},
_initInternalPush: function() {
var e = n("InternalPush").getInstance();
i.addProxy("push", e);
e.setLandscapeOrPortrait(!1);
e.initialize();
},
_initLeaderBoard: function() {
var e = {
cmd: "init"
};
cc.GameApplication.JavascriptBridgeNative.sendMessage("leaderboard", e);
}
});
cc._RF.pop();
}, {
AdMob: "AdMob",
GameInitImp: "GameInitImp",
Iap: "Iap",
InternalPush: "InternalPush",
LanguageData: "LanguageData",
Proxy: "Proxy",
PushModule: "PushModule"
} ],
AdsTop: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5668ejrmVxC9ZyOw80jLDK1", "AdsTop");
cc.Class({
extends: cc.Component,
editor: {
menu: "baby2/AdsTop"
},
properties: {},
onLoad: function() {
var e = t("UITopAdmobEvent");
e && this.node.addComponent(e);
}
});
cc._RF.pop();
}, {
UITopAdmobEvent: "UITopAdmobEvent"
} ],
Ad: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e6bdRNBeNA1Iejuk0YjoSo", "Ad");
var i = {
CONSTANT: {}
}, o = cc.Enum({
ERROR_CODE_INTERNAL_ERROR: 0,
ERROR_CODE_INVALID_REQUEST: 1,
ERROR_CODE_NETWORK_ERROR: 2,
ERROR_CODE_NO_FILL: 3
});
i.AdBase = cc.Class({
properties: {
adType: -1,
adName: "",
adUnitId: "",
onceCallbackWhenOpenPage: null,
availableAd: !1
},
ctor: function() {
this.adType = arguments[0];
this.adName = arguments[1];
this.adUnitId = arguments[2];
},
getAdInfoArray: function() {
return [ this.getAdType(), this.getAdName(), this.getAdUnitId() ];
},
getAdType: function() {
return this.adType;
},
getAdName: function() {
return this.adName;
},
getAdUnitId: function() {
return this.adUnitId;
},
onOpenPage: function(e) {
this.callOpenPage(e);
},
setOnceCallWhenOpenPage: function(e, t) {
this.onceCallbackWhenOpenPage = t ? e.bind(t) : e;
},
msgAdCallback: function(e) {
var t = this[e.adFunction];
t && t.call(this, e.adInfo);
},
callOpenPage: function(e) {
if (null !== this.onceCallbackWhenOpenPage) {
this.onceCallbackWhenOpenPage(e);
this.onceCallbackWhenOpenPage = null;
}
},
setAvailable: function(e) {
this.availableAd = e;
},
isAvailable: function() {
return this.availableAd;
},
onStartLoad: function(e) {}
});
i.Banner = cc.Class({
extends: i.AdBase,
properties: {
loadEnable: !1,
bannerWidth: 0,
bannerHeight: 0,
listCallback: [],
viewVisible: !1
},
onAdLoaded: function(e) {
this.loadEnable = !0;
},
onAdFailedToLoad: function(e) {},
onAdOpened: function() {},
onAdLeftApplication: function() {},
onAdClosed: function() {},
onAdViewVisible: function(e) {
e && e.width && (this.bannerWidth = e.width);
e && e.height && (this.bannerHeight = e.height);
e && "undefined" != typeof e.visible && this.setViewVisible(0 === e.visible);
},
msgAdCallback: function(t) {
this._super(t);
cc.js.array.copy(this.listCallback).forEach(function(e) {
e(t);
});
},
addEventListener: function(e, t) {
var n = t ? e.bind(t) : e;
this.listCallback.push(n);
return n;
},
removeEventListener: function(t) {
this.listCallback = this.listCallback.filter(function(e) {
return e !== t;
});
},
getBannerSize: function() {
return cc.size(this.bannerWidth, this.bannerHeight);
},
getScreenSize: function() {
return cc.view.getFrameSize();
},
isLoaded: function() {
return this.loadEnable;
},
isViewVisible: function() {
return this.viewVisible;
},
setViewVisible: function(e) {
this.viewVisible = e;
}
});
i.Interstitial = cc.Class({
extends: i.AdBase,
properties: {
judgeOpenResult: !1,
loadEnable: !1
},
onAdLoaded: function() {
this.loadEnable = !0;
},
onAdFailedToLoad: function(e) {
this.loadEnable = !1;
},
onAdOpened: function() {},
onAdLeftApplication: function() {},
onAdClosed: function() {
this.loadEnable = !1;
if (this.judgeOpenResult) {
this.judgeOpenResult = !1;
this.callOpenPage({
result: 0
});
}
},
setOnceCallWhenOpenPage: function(e, t) {
this._super(e, t);
this.judgeOpenResult = !0;
},
onOpenPage: function(e) {
if (-1 === e.result) {
this._super(e);
this.judgeOpenResult = !1;
}
},
isLoaded: function() {
return this.loadEnable;
}
});
var a = "rewardType", s = "rewardAmount";
i.RewardVideo = cc.Class({
extends: i.AdBase,
properties: {
judgeOpenResult: !1,
rewardType: null,
rewardAmount: 0,
loadEnable: !1
},
onRewardedVideoAdLoaded: function() {
this.setLoadEnable(!0);
},
onRewardedVideoAdOpened: function() {},
onRewardedVideoStarted: function() {
this.setLoadEnable(!1);
},
onRewardedVideoAdClosed: function() {
this.setLoadEnable(!1);
if (this.judgeOpenResult) {
this.judgeOpenResult = !1;
this.callOpenPage({
result: 0
});
}
},
onRewarded: function(e) {
if (this.judgeOpenResult) {
this.rewardType = e[a];
this.rewardAmount = e[s];
}
},
onRewardedVideoAdLeftApplication: function() {},
onRewardedVideoAdFailedToLoad: function(e) {
this.setLoadEnable(!1);
},
setOnceCallWhenOpenPage: function(e, t) {
this._super(e, t);
this.judgeOpenResult = !0;
this.rewardType = null;
this.rewardAmount = 0;
},
onOpenPage: function(e) {
if (-1 === e.result) {
this._super(e);
this.judgeOpenResult = !1;
}
},
getRewardType: function() {
return this.rewardType;
},
getRewardAmount: function() {
return this.rewardAmount;
},
isLoaded: function() {
return this.loadEnable;
},
onStartLoad: function(e) {
this._super(e);
this.setLoadEnable(!1);
},
setLoadEnable: function(e) {
this.loadEnable = e;
}
});
i.CONSTANT.ERROR_CODE_TYPE = "errorCode";
i.CONSTANT.ERROR_CODE = o;
i.CONSTANT.REWARD_TYPE = a;
i.CONSTANT.REWARD_AMOUNT = s;
i.ADTYPE = cc.Enum({
BANNER: 0,
INTERSTITIAL: 1,
REWARDEDVIDEO: 2
});
t.exports = i;
cc._RF.pop();
}, {} ],
AppData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c63d4Y87jpNo609uCri2jU9", "AppData");
var i = e("AppStorage"), o = cc.Class({
properties: {
gamePackageName: "packageName",
storageHashMap: {
default: null,
serializable: !1,
visible: !1
}
},
ctor: function() {
this.setGamePackageName(arguments[0]);
this.storageHashMap = {};
},
setGamePackageName: function(e) {
this.gamePackageName = e;
},
getGamePackageName: function() {
return this.gamePackageName;
},
getNumber: function(e) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.NumberValue(this.getGamePackageName() + e));
return this.storageHashMap[e].getNumber();
},
setNumber: function(e, t) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.NumberValue(this.getGamePackageName() + e));
this.storageHashMap[e].setNumber(t);
},
isBoolean: function(e) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.BooleanValue(this.getGamePackageName() + e));
return this.storageHashMap[e].isBoolean();
},
setBoolean: function(e, t) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.BooleanValue(this.getGamePackageName() + e));
this.storageHashMap[e].setBoolean(t);
},
getString: function(e) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.StorageValue(this.getGamePackageName() + e));
return this.storageHashMap[e].getMessage();
},
setString: function(e, t) {
this.storageHashMap[e] || (this.storageHashMap[e] = new i.StorageValue(this.getGamePackageName() + e));
this.storageHashMap[e].setMessage(t);
}
});
t.exports = o;
cc._RF.pop();
}, {
AppStorage: "AppStorage"
} ],
AppInfo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9250fpDdmVJPYicdWLCPC37", "AppInfo");
var i = e("Proxy"), o = cc.Enum({
HIDE: 0,
ACTION: 1,
SHOW: 2
});
cc.Class({
extends: cc.Component,
properties: {
backgroundMaskNode: cc.Node,
boardNode: cc.Node,
closeNode: cc.Node,
contactUsNode: cc.Node,
followUsNode: cc.Node,
likeUsNode: cc.Node,
_closeEvent: {
default: null,
serializable: !1
}
},
onLoad: function() {
i.addProxy("appinfo", this);
this.viewStatus = o.HIDE;
},
start: function() {
this.setButtonNodeClickEvent(this.closeNode, "onClickClose");
this.setButtonNodeClickEvent(this.contactUsNode, "onClickContactUs");
this.setButtonNodeClickEvent(this.followUsNode, "onClickFollowUs");
this.setButtonNodeClickEvent(this.likeUsNode, "onClickLikeUs");
},
onEnable: function() {},
onDisable: function() {},
onClickClose: function() {
null !== this._closeEvent && this._closeEvent();
this.hideView();
},
onClickContactUs: function() {
this.nativeNotice("contact");
},
onClickFollowUs: function() {
this.nativeNotice("share");
},
onClickLikeUs: function() {
this.nativeNotice("like");
},
setButtonNodeClickEvent: function(e, t) {
if (e) {
var n = new cc.Component.EventHandler();
n.target = this.node;
n.component = "AppInfo";
n.handler = t;
n.customEventData = "";
e.getComponent(cc.Button).clickEvents.push(n);
}
},
clearButtonNodeClickEvent: function(e) {
e.getComponent(cc.Button).clickEvents = [];
},
showView: function() {
if (this.viewStatus === o.HIDE) {
this.viewStatus = o.ACTION;
this.backgroundMaskNode.active = !0;
this.boardNode.active = !0;
this.boardNode.opacity = 0;
this.boardNode.scale = 0;
this.boardNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(.25, 1).easing(cc.easeBackOut()), cc.fadeIn(.2)), cc.callFunc(function() {
this.viewStatus = o.SHOW;
}, this)));
}
},
hideView: function() {
this.viewStatus === o.SHOW && this.boardNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(.25, 0).easing(cc.easeBackIn()), cc.fadeOut(.25)), cc.callFunc(function() {
this.viewStatus = o.HIDE;
this.backgroundMaskNode.active = !1;
this.boardNode.active = !1;
}, this)));
},
nativeNotice: function(e) {
cc.log("appinfo click: %s", e);
var t = {};
t.command = e;
cc.GameApplication.JavascriptBridgeNative.sendMessage("appinfo", t);
},
setCloseEvent: function(e) {
this._closeEvent = e;
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
AppReviewsPanelView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ffa00kzLqhKsJpzx+IKreik", "AppReviewsPanelView");
var i = cc.Enum({
HIDE: 0,
HIDE_TO_SHOW: 1,
SHOW: 2,
SHOW_TO_HIDE: 3
});
cc.Class({
extends: cc.Component,
properties: {
background: cc.Node,
panel: cc.Node,
firstInit: {
default: !0,
serializable: !1,
visible: !1
}
},
onLoad: function() {},
start: function() {
this.initialize();
},
showView: function(e, t) {
this.initialize();
if (this.viewStatus === i.HIDE) {
this.viewStatus = i.HIDE_TO_SHOW;
this.background.active = !0;
this.background.opacity = 0;
this.background.runAction(cc.fadeTo(.2, this.backgroundOpacity));
this.panel.active = !0;
this.panel.opacity = 0;
this.panel.scale = 0;
this.panel.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.3, 1).easing(cc.easeBackOut())), cc.callFunc(function() {
this.viewStatus = i.SHOW;
e && (t ? e.call(t) : e());
}, this)));
}
},
hideView: function(e, t) {
this.initialize();
if (this.viewStatus === i.SHOW) {
this.viewStatus = i.SHOW_TO_HIDE;
this.background.runAction(cc.sequence(cc.fadeOut(.2), cc.callFunc(function() {
this.background.active = !1;
}, this)));
this.panel.runAction(cc.sequence(cc.spawn(cc.fadeOut(.2), cc.scaleTo(.3, 0).easing(cc.easeBackIn())), cc.callFunc(function() {
this.viewStatus = i.HIDE;
this.panel.active = !1;
e && (t ? e.call(t) : e());
}, this)));
}
},
initialize: function() {
if (this.firstInit) {
this.firstInit = !1;
this.backgroundOpacity = this.background.opacity;
this.background.active = !1;
this.panel.active = !1;
this.viewStatus = i.HIDE;
}
},
showImmediate: function() {
if (this.background && !this.background.active) {
this.background.stopAllActions();
this.background.active = !0;
this.background.opacity = 255;
}
if (this.panel && !this.panel.active) {
this.panel.stopAllActions();
this.panel.active = !0;
this.panel.scale = 1;
this.panel.opacity = 255;
}
this.viewStatus = i.SHOW;
},
hideImmediate: function() {
if (this.background && this.background.active) {
this.background.stopAllActions();
this.background.active = !1;
}
if (this.panel && this.panel.active) {
this.panel.stopAllActions();
this.panel.active = !1;
}
this.viewStatus = i.HIDE;
},
setBackgroundAndPanel: function(e, t) {
this.background = e;
this.panel = t;
}
});
cc._RF.pop();
}, {} ],
AppReviews: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ff5efSQ7BhERbx6P6RZDHHl", "AppReviews");
var i = e("AppReviewsPanelView"), o = e("Proxy"), a = e("PushModule");
cc.Class({
extends: cc.Component,
properties: {
panelView: i,
_clickCallback: null,
_clickCallbackTarget: null
},
onLoad: function() {
o.addProxy("app-reviews", this);
this.panelView.hideImmediate();
},
showView: function(e, t) {
this.panelView.showView();
this._clickCallback = e || null;
this._clickCallbackTarget = t || null;
},
onClickClose: function() {
this.panelView.hideView();
},
onClickReviews: function() {
this.panelView.hideImmediate();
this.nativeMarket(a.getInstance().getPackageName(), a.getInstance().getBundleID());
this._clickCallback && (this._clickCallbackTarget ? this._clickCallback.call(this._clickCallbackTarget) : this._clickCallback());
},
nativeMarket: function(e, t) {
if (e) {
var n = {
cmdType: "reviews",
packageName: e,
bundleID: t
};
cc.GameApplication.JavascriptBridgeNative.sendMessage("market", n);
} else cc.error("packageName is null OR bundleID is null");
}
});
cc._RF.pop();
}, {
AppReviewsPanelView: "AppReviewsPanelView",
Proxy: "Proxy",
PushModule: "PushModule"
} ],
AppStorage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "298b8VFDNhIDZ60nbcLNgUT", "AppStorage");
var i = cc.Class({
name: "StorageValue",
properties: {
key: "key",
message: ""
},
ctor: function() {
1 <= arguments.length && (this.key = arguments[0]);
this._getStorage();
},
getKey: function() {
return this.key;
},
setMessage: function(e) {
this.message = e;
this._setStorage();
},
getMessage: function() {
return this.message;
},
_getStorage: function() {
var e = cc.sys.localStorage.getItem(this.key);
this.message = e || "";
},
_setStorage: function() {
cc.sys.localStorage.setItem(this.key, this.getMessage());
}
}), o = cc.Class({
extends: i,
properties: {
numberValue: 0
},
getNumber: function() {
return this.numberValue;
},
setNumber: function(e) {
this.numberValue = e;
this.setMessage("" + e);
},
_getStorage: function() {
this._super();
var e = parseInt(this.getMessage());
isNaN(e) ? this.numberValue = 0 : this.numberValue = e;
}
}), a = cc.Class({
extends: i,
properties: {
booleanValue: !1
},
_getStorage: function() {
this._super();
this.booleanValue = "true" == this.getMessage();
},
isBoolean: function() {
return this.booleanValue;
},
setBoolean: function(e) {
(this.booleanValue = e) ? this.setMessage("true") : this.setMessage("false");
}
});
t.exports = {
StorageValue: i,
NumberValue: o,
BooleanValue: a
};
cc._RF.pop();
}, {} ],
AppStore: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "89d48e578NIiYg4VXs5ghPg", "AppStore");
var i = e("Proxy"), o = e("PushModule"), a = "";
cc.Class({
extends: cc.Component,
properties: {
priceLabel: cc.Label,
restoreErrorPanel: cc.Node,
buyErrorPanel: cc.Node,
loadingAnimation: cc.Animation,
_closeEvent: {
default: null,
serializable: !1
}
},
onLoad: function() {
i.addProxy("appstore", this);
this.background = this.node.getChildByName("background");
this.backgroundSrcOpacity = this.background.opacity;
this.view = this.node.getChildByName("shop_board");
this.mask = this.node.getChildByName("mask");
},
start: function() {
this.iap = i.getProxy("iap");
var e = this.iap.getSkus();
null !== e && 0 < e.length ? a = e[0] : cc.error("error: x96795623");
this.hideOpenButton();
},
onDestroy: function() {
i.removeProxy("appstore");
this.iap.setQueryComponentCallback(null);
this.iap.setBuyComponentCallback(null);
this.iap.setRecoveryComponentCallback(null);
},
showView: function() {
this.background.active = !0;
var e = this.backgroundSrcOpacity;
this.background.opacity = 0;
this.background.runAction(cc.fadeTo(.3, e));
this.view.active = !0;
this.view.scale = 0;
this.view.runAction(cc.sequence(cc.scaleTo(.5, 1).easing(cc.easeBackOut()), cc.callFunc(function() {
this.queryPrice();
}, this)));
},
hideView: function() {
this.background.runAction(cc.sequence(cc.fadeOut(.2), cc.callFunc(function() {}, this)));
this.view.runAction(cc.sequence(cc.scaleTo(.3, 0).easing(cc.easeBackIn()), cc.callFunc(function() {
this.view.active = !1;
this.background.active = !1;
}, this)));
},
queryPrice: function() {
this.iap.isQuerySuccess() ? this.updatePriceLabel() : this.queryOnce();
},
onClickExit: function() {
null !== this._closeEvent && this._closeEvent();
this.hideView();
},
onClickBuy: function() {
if (this.iap.isQuerySuccess()) {
if (this.iap.isExistInventory(a)) this.buyErrorPanel.active = !0; else {
this.setMaskActive(!0);
this.iap.setBuyComponentCallback(function(e) {
this.iap.setBuyComponentCallback(null);
0 === e.result && this.onUnlockEvent();
this.setMaskActive(!1);
}, this);
this.iap.buyProduct(a);
}
} else this.queryOnce();
},
onClickRestore: function() {
if (this.iap.isQuerySuccess()) {
if (this.iap.isExistInventory(a)) {
this.setMaskActive(!0);
this.iap.setRecoveryComponentCallback(function(e) {
this.iap.setRecoveryComponentCallback(null);
this.setMaskActive(!1);
0 === e.result && this.onUnlockEvent();
}, this);
this.iap.recoveryPurchase(a);
} else this.restoreErrorPanel.active = !0;
} else this.queryOnce();
},
queryOnce: function() {
this.setMaskActive(!0);
this.iap.setQueryComponentCallback(function(e) {
this.iap.setQueryComponentCallback(null);
this.setMaskActive(!1);
0 === e.result && this.updatePriceLabel();
}, this);
this.iap.queryInventory();
},
updatePriceLabel: function() {
this.priceLabel.string = "" + this.iap.getSkuDetailPrice(a);
},
hideOpenButton: function() {},
onUnlockEvent: function() {
this.onWriteUnLock();
this.hideOpenButton();
this.hideView();
var e = i.getProxy("admob");
e.setBannerStatus("banner", 0);
e.getAd("banner").setAvailable(!1);
e.getAd("page").setAvailable(!1);
},
onWriteUnLock: function() {
o.getInstance().unLock();
this.getEvent().emit("unlock", {
script: this,
unlock: !0
});
},
getEvent: function() {
return this.node;
},
setCloseEvent: function(e) {
this._closeEvent = e;
},
setMaskActive: function(e) {
this.mask.active = e;
null !== this.loadingAnimation && e && this.loadingAnimation.play("loading");
}
});
cc._RF.pop();
}, {
Proxy: "Proxy",
PushModule: "PushModule"
} ],
ApplicationBehavior: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a9bf33rB35KIYPo67vy03z6", "ApplicationBehavior");
var i = {
QuitGame: function() {
cc.game.end();
},
Init: function() {},
Dispose: function() {}
};
t.exports = i;
cc._RF.pop();
}, {} ],
Autorotation: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4bafbKKFMBIgrzj3e6YOiyu", "Autorotation");
cc.Class({
extends: cc.Component,
properties: {
speed: 100
},
update: function(e) {
this.node.rotation += this.speed * e;
}
});
cc._RF.pop();
}, {} ],
Baby2AdaptationStrategy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "41339ExFvFCSqOZm6ComW1h", "Baby2AdaptationStrategy");
cc.Class({
extends: cc.Component,
editor: {
menu: "baby2/屏幕适配"
},
properties: {
landscape: !0,
minTrend: 1.6666,
maxTrend: 2
},
onLoad: function() {
this.leftTrend = cc.size(this.minTrend, 1);
this.rightTrend = cc.size(this.maxTrend, 1);
0 === this.leftTrend.height && (this.leftTrend = cc.size(1280, 720));
0 === this.rightTrend.height && (this.rightTrend = cc.size(2436, 1125));
this.adaptationStrategy();
},
adaptationStrategy: function() {
var e = this.node.getComponent(cc.Canvas);
if (e) {
var t = cc.view.getFrameSize(), n = t.width, i = t.height;
this.landscape ? this.landscapeAdaptationStrategy(e, n, i) : this.portraitAdaptationStrategy(e, i, n);
}
},
landscapeAdaptationStrategy: function(e, t, n) {
if (0 !== n) {
var i = t / n;
if (i < this.leftTrend.width / this.leftTrend.height) {
e.fitWidth = !0;
e.fitHeight = !0;
} else if (i > this.rightTrend.width / this.rightTrend.height) {
e.fitWidth = !0;
e.fitHeight = !0;
} else {
e.fitWidth = !1;
e.fitHeight = !1;
}
} else cc.error("> height : 0");
},
portraitAdaptationStrategy: function(e, t, n) {
this.landscapeAdaptationStrategy(e, t, n);
}
});
cc._RF.pop();
}, {} ],
BackKeyExit: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b89f5Pw625MKJVDxH6Texcy", "BackKeyExit");
cc.Class({
extends: cc.Component,
properties: {},
onEnable: function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
},
onDisable: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
},
onKeyDown: function(e) {
var t = e.keyCode;
t !== cc.KEY.escape && t !== cc.KEY.back || cc.director.end();
}
});
cc._RF.pop();
}, {} ],
BaseCommand: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fcda6/RozhEarrMfdo6EyP7", "BaseCommand");
var i = e("CCSimpleCommand");
cc.Class({
extends: i,
properties: {},
execute: function(e) {}
});
cc._RF.pop();
}, {
CCSimpleCommand: "CCSimpleCommand"
} ],
BaseMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "372cfzGHehM+bfXoN6BubXG", "BaseMediator");
cc.Class({
extends: e("CCMediator"),
properties: {},
listNotificationInterests: function() {
return [];
},
handleNotification: function(e) {
var t = this[e.getName()];
t && t.call(this, e.getBody());
}
});
cc._RF.pop();
}, {
CCMediator: "CCMediator"
} ],
BaseView: [ function(o, e, t) {
"use strict";
cc._RF.push(e, "11c6atifzNMLYG/2G3Nh5ix", "BaseView");
var a = cc.Class({
extends: cc.Component,
statics: {
GetFacadeInstance: function() {
return null;
}
},
properties: {},
registerMediator: function(e, t) {
this.mediator = null;
var n = this.getComponentName() + "Mediator", i = t || o(n);
if (i && null !== a.GetFacadeInstance()) {
this.mediator = new i(e || n, this);
a.GetFacadeInstance().registerMediator(this.mediator);
}
},
removeMediator: function() {
if (null !== this.mediator) {
a.GetFacadeInstance().removeMediator(this.mediator.getMediatorName());
this.mediator = null;
}
},
getComponentName: function() {
return cc.js.getClassName(this);
},
getMediator: function() {
return this.mediator;
}
});
cc._RF.pop();
}, {} ],
BlockResColor: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "45068t1W4dMd4RK2KX8clJY", "BlockResColor");
cc.Class({
extends: cc.Component,
properties: {
blockSprite: cc.Sprite,
blockLineSprite: cc.Sprite,
blockPromptSprite: cc.Sprite,
blockHitPointSprite: cc.Sprite,
blockFrames: [ cc.SpriteFrame ],
blockLineFrames: [ cc.SpriteFrame ],
blockPromptFrames: [ cc.SpriteFrame ],
blockHtiFrames: [ cc.SpriteFrame ]
},
onLoad: function() {
var e = Math.floor(9999 * cc.random0To1()) % 7;
this.blockSprite.spriteFrame = this.blockFrames[e];
this.blockHitPointSprite.spriteFrame = this.blockHtiFrames[e];
this.blockPromptSprite.spriteFrame = this.blockPromptFrames[e];
}
});
cc._RF.pop();
}, {} ],
ButtonExit: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d158dGcAm9Kt7JxnFs6cS4w", "ButtonExit");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
if (cc.sys.os !== cc.sys.OS_IOS) {
var e = this.node.getComponent(cc.Button);
e || (e = this.node.addComponent(cc.Button));
this.addButtonEvent(e, this, "onClickExit");
} else this.node.active = !1;
},
addButtonEvent: function(e, t, n, i) {
if (e) {
var o = new cc.Component.EventHandler();
o.target = t.node;
o.component = cc.js.getClassName(t);
o.handler = n;
o.customEventData = "undefined" == typeof i ? "" : i;
e.clickEvents.push(o);
}
},
onClickExit: function() {
cc.director.end();
}
});
cc._RF.pop();
}, {} ],
ButtonSound: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dc44fGN+RpJu4mfaU2ewqZc", "ButtonSound");
var i = e("scHelper");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.button = this.node.getComponent(cc.Button);
this.button && i.addButtonEvent(this.button, this, "onClickButton");
},
onClickButton: function(e) {
0 < e.getID() || sc.GameSound.buttonClick();
}
});
cc._RF.pop();
}, {
scHelper: "scHelper"
} ],
CCFacade: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5d4f6qOZxZJtIIJzYGrgUSw", "CCFacade");
e("puremvc-1.0.1");
var i = window.puremvc, o = i.define({
parent: i.Facade,
constructor: function(e) {
i.Facade.call(this, e);
}
}, {
initializeController: function() {
i.Facade.prototype.initializeController.call(this);
},
initializeModel: function() {
i.Facade.prototype.initializeModel.call(this);
},
initializeView: function() {
i.Facade.prototype.initializeView.call(this);
}
}, {});
t.exports = o;
cc._RF.pop();
}, {
"puremvc-1.0.1": "puremvc-1.0.1"
} ],
CCMacroCommand: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d61b7tXlelMAplDiE5tfa7F", "CCMacroCommand");
e("puremvc-1.0.1");
var i = window.puremvc, o = i.define({
parent: i.MacroCommand
}, {
execute: function(e) {}
}, {
NAME: "MacroCommand"
}), a = cc.Class({
extends: o,
properties: {},
initializeMacroCommand: function() {}
});
t.exports = a;
cc._RF.pop();
}, {
"puremvc-1.0.1": "puremvc-1.0.1"
} ],
CCMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee064TyliBJWJEjbgVNxOFW", "CCMediator");
e("puremvc-1.0.1");
var i = window.puremvc, o = i.define({
parent: i.Mediator,
constructor: function(e, t) {
i.Mediator.call(this, e, t);
}
}, {
listNotificationInterests: function() {
return [];
},
handleNotification: function(e) {}
}, {});
t.exports = o;
cc._RF.pop();
}, {
"puremvc-1.0.1": "puremvc-1.0.1"
} ],
CCProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c5295gpzCFDSLRdyWAPyPGL", "CCProxy");
e("puremvc-1.0.1");
var i = window.puremvc, o = i.define({
parent: i.Proxy,
constructor: function(e, t) {
i.Proxy.call(this, e, t);
}
}, {
onRegister: function() {},
onRemove: function() {}
}, {});
t.exports = o;
cc._RF.pop();
}, {
"puremvc-1.0.1": "puremvc-1.0.1"
} ],
CCSimpleCommand: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "19c3499TS9I1IPiyAdDRom2", "CCSimpleCommand");
e("puremvc-1.0.1");
var i = window.puremvc, o = i.define({
parent: i.SimpleCommand
}, {
execute: function(e) {}
}, {
NAME: "SimpleCommand"
}), a = cc.Class({
extends: o,
properties: {},
execute: function(e) {}
});
t.exports = a;
cc._RF.pop();
}, {
"puremvc-1.0.1": "puremvc-1.0.1"
} ],
Cell: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3a390DG+d5OFb7vOGKS+9zq", "Cell");
cc.Class({
extends: cc.Object,
properties: {
backgroundNode: cc.Node,
shadowNode: cc.Node,
blockNode: cc.Node,
lineNode: cc.Node,
index: null,
mapScript: null,
srcValue: 0,
cellValue: 0,
preCell: null,
nextCell: null
},
ctor: function() {
this.index = arguments[0];
this.srcValue = arguments[1];
this.mapScript = arguments[2];
this.cellValue = 0;
},
initBackGroundNode: function() {
if (0 < this.srcValue) {
this.backgroundNode = this.getMapScript().getBackgroundNode();
this.backgroundNode.position = this.getPosition();
}
},
getBackGroundNode: function() {
return this.backgroundNode;
},
getBlockNode: function() {
return this.blockNode;
},
getMapScript: function() {
return this.mapScript;
},
setCellValue: function(e) {
this.cellValue = e;
if (null !== this.blockNode) {
this.getMapScript().recoverCellNode(this.blockNode);
this.blockNode = null;
}
if (1 === e) {
this.blockNode = this.getMapScript().newCellNode();
this.blockNode.position = this.getPosition();
}
},
getPosition: function() {
return this.getMapScript().getCellPosition(this.index.x, this.index.y);
},
getCellValue: function() {
return this.cellValue;
},
getSrcValue: function() {
return this.srcValue;
},
markBeginPoint: function() {
this.setCellValue(1);
},
setPrePoint: function(e) {
this.preCell = e;
return this;
},
getPrePoint: function() {
return this.preCell;
},
setNextPoint: function(e) {
this.nextCell;
if (null !== (this.nextCell = e)) {
if (null == this.lineNode) {
this.lineNode = this.getMapScript().newLineNode();
this.lineNode.position = this.getPosition();
this.lineNode.rotation = this.getDirAngle(e);
}
} else this.clearLine();
return this;
},
getNexPoint: function() {
return this.nextCell;
},
leftOne: function() {
return this._getCellInIndexOffset(0, -1);
},
rightOne: function() {
return this._getCellInIndexOffset(0, 1);
},
upOne: function() {
return this._getCellInIndexOffset(-1, 0);
},
downOne: function() {
return this._getCellInIndexOffset(1, 0);
},
_getCellInIndexOffset: function(e, t) {
var n = this.getIndex().x + e, i = this.getIndex().y + t;
return this.getMapScript().insideRect(n, i) ? this.getMapScript().getCell(n, i) : null;
},
hasDrawEnable: function() {
return 0 !== this.getCellValue();
},
isEmpty: function() {
return 0 === this.getSrcValue();
},
clearTail: function() {
for (var e = [], t = this.getNexPoint(); null !== t; ) {
e.push(t);
t = t.getNexPoint();
}
e.forEach(function(e) {
e.clearPoint();
});
this.setNextPoint(null);
},
clearPoint: function() {
this.setCellValue(0);
this.setPrePoint(null);
this.setNextPoint(null);
},
splitTail: function(e) {
e.setCellValue(1);
this.setNextPoint(e);
e.setPrePoint(this);
},
getIndex: function() {
return this.index;
},
getDirAngle: function(e) {
return this.rightOne() === e ? 0 : this.leftOne() === e ? 180 : this.upOne() === e ? -90 : 90;
},
getDirAngleFromPre: function(e) {
return this.leftOne() === e ? 0 : this.rightOne() === e ? 180 : this.upOne() === e ? 90 : -90;
},
isMarkShadow: function() {
return null !== this.shadowNode;
},
markShadow: function(e) {
if (null === this.shadowNode) {
this.shadowNode = this.getMapScript().newCellShadowNode();
this.shadowNode.position = this.getPosition();
this.shadowNode.rotation = this.getDirAngleFromPre(e);
}
},
clearShadow: function() {
if (null !== this.shadowNode) {
this.getMapScript().recoverShadowNode(this.shadowNode);
this.shadowNode = null;
}
},
clearLine: function() {
if (null !== this.lineNode) {
this.getMapScript().recoverLineNode(this.lineNode);
this.lineNode = null;
}
},
isCorrectDraw: function() {
return !!this.isEmpty() || this.hasDrawEnable();
}
});
cc._RF.pop();
}, {} ],
ChallengeFailed: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ddadan3HL1NRrlACDtAB1aZ", "ChallengeFailed");
var i = e("GamePanel");
cc.Class({
extends: i,
properties: {},
onLoad: function() {
this.initPanel();
},
onBeforeShow: function() {
this._super();
sc.GameSound.chFailedViewEnter();
},
onClickHome: function() {
sc.GameSound.chFailedViewOK();
this._resetChallengeTime();
cc.director.loadScene("title");
},
_resetChallengeTime: function() {
sc.Facade.retrieveProxy(sc.GameConst.GameProxy).markGameChallenge();
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel"
} ],
ChallengeManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1cf14wYmL5M1a5MxEQEjTqs", "ChallengeManager");
cc.Class({
extends: cc.Component,
properties: {
timeLabel: cc.Label
},
onLoad: function() {
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.currentLabelGameTime = 0;
this.updateGameTime();
},
update: function(e) {
if (this.data.getGameState() === sc.GameConst.GAME_STATE.RUN) {
this.data.costChallengeGameTime(e);
this.updateGameTime();
this.data.getChallengeGameTime() <= 0 && this.gameOver();
}
},
updateGameTime: function() {
var e = this.data.getChallengeGameTime();
if (this.currentLabelGameTime !== Math.floor(e)) {
this.currentLabelGameTime = Math.floor(e);
var t = Math.floor(e / 60), n = Math.floor(e % 60);
this.timeLabel.string = (10 <= t ? "" + t : "0" + t) + ":" + (10 <= n ? "" + n : "0" + n);
this.currentLabelGameTime < 10 && sc.GameSound.chTimeFallDown();
}
},
gameOver: function() {
this.data.setGameState(sc.GameConst.GAME_STATE.OVER);
this.scheduleOnce(function() {
cc.find("Canvas/challengeFailed").getComponent("ChallengeFailed").showView();
}, .5);
}
});
cc._RF.pop();
}, {} ],
ChallengeSuccess: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "49ae5U6eFJKxKN5x6oQKITJ", "ChallengeSuccess");
var i = e("GamePanel"), o = e("ToastUtil");
cc.Class({
extends: i,
properties: {
coinLabel: cc.Label,
noAdsToast: cc.Node
},
onLoad: function() {
this.initPanel();
this.coinLabel.string = "+" + sc.GameConst.Configure.CHALLENGE_GAME_ADD_COIN;
},
onBeforeShow: function() {
this._super();
sc.GameSound.chSuccessViewEnter();
},
onClickHome: function() {
sc.GameSound.chSuccessViewOK();
this._handleGameData(1);
this._resetChallengeTime();
cc.director.loadScene("title");
},
onClickAds: function() {
sc.GameSound.chSuccessViewDouble();
sc.PushModule.doRequestReward(function(e) {
e ? sc.PushModule.doOpenReward(function(e, t) {
var n = e && 0 < t ? 2 : 1;
this._handleGameData(n);
this._resetChallengeTime();
cc.director.loadScene("title");
}, this) : o.makeNode(cc.instantiate(this.noAdsToast));
}, this);
},
_handleGameData: function(e) {
var t = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
t.addGameCoin(sc.GameConst.Configure.CHALLENGE_GAME_ADD_COIN * e);
t.completeOnceChallenge(sc.GameConst.Configure.CHALLENGE_GAME_ADD_REWARD);
},
_resetChallengeTime: function() {
sc.Facade.retrieveProxy(sc.GameConst.GameProxy).markGameChallenge();
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel",
ToastUtil: "ToastUtil"
} ],
ChallengeView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c206ePpYLVAYbCW0WjHkckw", "ChallengeView");
var i = e("GamePanel"), o = e("ToastUtil"), a = null;
cc.Class({
extends: i,
properties: {
timeAddLabel: cc.Label,
coinAddLabel: cc.Label,
rewardAddLabel: cc.Label,
costLabel: cc.Label,
noCoinToast: cc.Node,
noAdsToast: cc.Node
},
onLoad: function() {
this.initPanel();
a = sc.GameConst.Configure;
this.timeAddLabel.string = a.CHALLENGE_GAME_TIME.toString() + "s";
this.coinAddLabel.string = "+" + a.CHALLENGE_GAME_ADD_COIN.toString();
this.rewardAddLabel.string = "+" + a.CHALLENGE_GAME_ADD_REWARD.toString();
this.costLabel.string = a.CHALLENGE_GAME_NEED_COST.toString();
},
onBeforeShow: function() {
this._super();
sc.GameSound.chReadmeViewEnter();
},
onClickClose: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.chReadmeViewClose();
this.hideView();
}
},
onClickFree: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.chReadmeViewFree();
sc.PushModule.doRequestReward(function(e) {
e ? sc.PushModule.doOpenReward(function(e, t) {
e && 0 < t && this.transformChallenge();
}, this) : o.makeNode(cc.instantiate(this.noAdsToast));
}, this);
}
},
onClickCost: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.chReadmeViewCost();
var t = sc.Facade.retrieveProxy(sc.GameConst.GameProxy), n = a.CHALLENGE_GAME_NEED_COST;
if (t.getGameCoin() < n) o.makeNode(cc.instantiate(this.noCoinToast)); else {
t.costGameCoin(n);
this.transformChallenge();
}
}
},
transformChallenge: function() {
var e = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
e.markGameChallenge();
e.setGameMode(sc.GameConst.CHALLENGE);
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel",
ToastUtil: "ToastUtil"
} ],
CoinGetView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "75d88yfdCpPUrA0MP9c4Ks6", "CoinGetView");
var i = e("GamePanel");
cc.Class({
extends: i,
properties: {
coinLabel: cc.Label
},
onLoad: function() {
this.coinNumber = -1;
this.initPanel();
},
onBeforeShow: function() {
this._super();
sc.GameSound.titleTodayRewardButton();
},
onClickOK: function() {
sc.GameSound.buttonClick();
sc.Facade.retrieveProxy(sc.GameConst.GameProxy).addGameCoin(this.coinNumber);
this.hideView();
},
setCoinNumber: function(e) {
this.coinNumber = e;
this.coinLabel.string = "+" + this.coinNumber;
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel"
} ],
CollisionProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "01ef1P8rWlIOrrgtVvIDxcD", "CollisionProxy");
cc.Class({
extends: cc.Component,
properties: {
realListener: {
set: function(e) {
this._validityRealComponent();
this._realComponents[0] = e;
},
get: function() {
this._validityRealComponent();
return this._realComponents[0];
}
},
_realComponents: {
default: [],
type: cc.Component.EventHandler
}
},
_validityRealComponent: function() {
0 === this._realComponents.length && this._realComponents.push(new cc.Component.EventHandler());
},
onLoad: function() {
cc.director.getCollisionManager().enabled = !0;
},
onCollisionEnter: function(e, t) {
this._publishEvent("onCollisionEnter", e, t);
},
onCollisionStay: function(e, t) {
this._publishEvent("onCollisionStay", e, t);
},
onCollisionExit: function(e, t) {
this._publishEvent("onCollisionExit", e, t);
},
_publishEvent: function(e, t, n) {
if (this.realListener) {
var i = this.realListener;
if (cc.isValid(i.target)) {
var o = i.target.getComponent(i.component);
if (cc.isValid(o)) {
var a = o[e];
a && a.call(o, t, n);
} else cc.error("collision 246478421:%s", e);
} else cc.error("collision 246478420:%s", e);
}
}
});
cc._RF.pop();
}, {} ],
CommandAppLanaguageEn: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d03235Yp7xHiYbk7AkaUNBX", "CommandAppLanaguageEn");
e("en").load({
appstore: {
title: "Shop",
restore_button: "Restore",
remove_ads_button: "Remove Ads",
restore_click_error: "Please buy it first",
buy_click_error: "You've already bought it!"
},
appinfo: {
title: "Info",
contact_button: "Contact Us",
share_button: "Share It",
likes_button: "Likes"
},
evaluate: {
title: "Reward for reviews",
describe: "Simply leave us a five-star review and get reward for free",
yes_button_text: "Go Head",
no_button_text: "No"
},
AdWaiting: {
title: "Warm Tips",
describe: "Ads and rewards are coming upon, please be patient..."
},
appReviews: {
title: "Reward for reviews",
content: "Simply leave us a five-star review\nand get reward for free",
btn_text: "Go head"
}
});
cc._RF.pop();
}, {
en: "en"
} ],
CommandAppLanaguageZh: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "284bfp7tOVArbRWkFQ/xX4P", "CommandAppLanaguageZh");
e("zh").load({
appstore: {
title: "商店",
restore_button: "恢复购买",
remove_ads_button: "去除广告",
restore_click_error: "请先购买该商品",
buy_click_error: "该商品已购买"
},
appinfo: {
title: "信息",
contact_button: "联系我们",
share_button: "分享推荐",
likes_button: "评论点赞"
},
evaluate: {
title: "好评奖励",
describe: "五星好评即可免费获取奖励",
yes_button_text: "前往评论",
no_button_text: "残忍拒绝"
},
AdWaiting: {
title: "温馨提示",
describe: "广告及奖励即将送达，请稍候…"
},
appReviews: {
title: "好评奖励",
content: "五星好评即可免费获取奖励",
btn_text: "前往评论"
}
});
cc._RF.pop();
}, {
zh: "zh"
} ],
1: [ function(e, t, n) {
var i, o, a = t.exports = {};
function s() {
throw new Error("setTimeout has not been defined");
}
function c() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
i = "function" == typeof setTimeout ? setTimeout : s;
} catch (e) {
i = s;
}
try {
o = "function" == typeof clearTimeout ? clearTimeout : c;
} catch (e) {
o = c;
}
})();
function r(t) {
if (i === setTimeout) return setTimeout(t, 0);
if ((i === s || !i) && setTimeout) {
i = setTimeout;
return setTimeout(t, 0);
}
try {
return i(t, 0);
} catch (e) {
try {
return i.call(null, t, 0);
} catch (e) {
return i.call(this, t, 0);
}
}
}
var u, l = [], h = !1, d = -1;
function p() {
if (h && u) {
h = !1;
u.length ? l = u.concat(l) : d = -1;
l.length && f();
}
}
function f() {
if (!h) {
var e = r(p);
h = !0;
for (var t = l.length; t; ) {
u = l;
l = [];
for (;++d < t; ) u && u[d].run();
d = -1;
t = l.length;
}
u = null;
h = !1;
(function(t) {
if (o === clearTimeout) return clearTimeout(t);
if ((o === c || !o) && clearTimeout) {
o = clearTimeout;
return clearTimeout(t);
}
try {
o(t);
} catch (e) {
try {
return o.call(null, t);
} catch (e) {
return o.call(this, t);
}
}
})(e);
}
}
a.nextTick = function(e) {
var t = new Array(arguments.length - 1);
if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
l.push(new m(e, t));
1 !== l.length || h || r(f);
};
function m(e, t) {
this.fun = e;
this.array = t;
}
m.prototype.run = function() {
this.fun.apply(null, this.array);
};
a.title = "browser";
a.browser = !0;
a.env = {};
a.argv = [];
a.version = "";
a.versions = {};
function g() {}
a.on = g;
a.addListener = g;
a.once = g;
a.off = g;
a.removeListener = g;
a.removeAllListeners = g;
a.emit = g;
a.prependListener = g;
a.prependOnceListener = g;
a.listeners = function(e) {
return [];
};
a.binding = function(e) {
throw new Error("process.binding is not supported");
};
a.cwd = function() {
return "/";
};
a.chdir = function(e) {
throw new Error("process.chdir is not supported");
};
a.umask = function() {
return 0;
};
}, {} ],
DebugView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5ab2cEvlh5AMrcHSCnvsFQt", "DebugView");
e("Proxy");
var i = e("GameInitImp"), o = e("TouchComponent");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
if (i.getInstance().isDebug()) {
this.debugButton = cc.find("debugButton", this.node);
if (this.debugButton) {
this.debugButtonTouchScript = this.debugButton.addComponent(o);
this.debugButtonTouchScript.listenerTargetAndCallback(this, this.onDebugButtonTouchStart, this.onDebugButtonTouchMove, this.onDebugButtonTouchEnd, this.onDebugButtonTouchEnd);
}
this.panelViewScript = this.node.getComponent("PanelView");
this.panelViewScript || (this.panelViewScript = this.node.addComponent("PanelView"));
this.panelViewScript.hideImmediate();
} else this.node.destroy();
},
onDebugButtonTouchStart: function(e) {
this.clickStartTime = Date.now();
this.debugButton.position = this.node.parent.convertTouchToNodeSpaceAR(e);
},
onDebugButtonTouchMove: function(e) {
this.debugButton.position = this.node.parent.convertTouchToNodeSpaceAR(e);
},
onDebugButtonTouchEnd: function(e) {},
onClickDebugButton: function() {
Date.now() - this.clickStartTime < 200 && this.panelViewScript.showView();
},
onClickClose: function() {
this.panelViewScript.hideView();
},
onClickLayout: function(e) {
null === e.getID() || 0 < e.getID() || cc.director.loadScene("layout");
},
onClickAddPrompt: function(e) {
null === e.getID() || e.getID();
},
onClickAddGradeProcess: function(e, t) {
if (!(null === e.getID() || 0 < e.getID())) {
t = parseInt(t);
if (!isNaN(t)) {
var n = this.getData();
n.setGradeProcess(t, n.getGradeProcess(t) + 10);
cc.director.loadScene("title");
}
}
},
onClickCleanUnlock: function() {
var e = this.getData();
e.setGradeProcess(0, 0);
e.setGradeProcess(1, 0);
e.setGradeProcess(2, 0);
e.setGradeProcess(3, 0);
e.setGradeProcess(4, 0);
cc.director.loadScene("title");
},
onClickCleanChallenge: function() {
this.getData().clearChallenge();
cc.director.loadScene("title");
},
onClickClearReward: function() {
this.getData().completeOnceChallenge(-9999);
cc.director.loadScene("title");
},
onClickAddCoin: function() {
this.getData().addGameCoin(100);
cc.director.loadScene("title");
},
getData: function() {
return sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
}
});
cc._RF.pop();
}, {
GameInitImp: "GameInitImp",
Proxy: "Proxy",
TouchComponent: "TouchComponent"
} ],
DragonBonesAnimationEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3a6e8McV0ZGCYWxawwSbt6W", "DragonBonesAnimationEvent");
var i = {
addAnimationEvent: function(e) {
this.addAnimationEventTarget(e, this);
},
removeAnimationEvent: function(e) {
this.removeAnimationEventTarget(e, this);
},
addAnimationEventTarget: function(e, t) {
t.AnimationFadeInComplete && e.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, t.AnimationFadeInComplete, t);
t.AnimationFadeOutComplete && e.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, t.AnimationFadeOutComplete, t);
t.AnimationStart && e.addEventListener(dragonBones.EventObject.START, t.AnimationStart, t);
t.AnimationComplete && e.addEventListener(dragonBones.EventObject.COMPLETE, t.AnimationComplete, t);
t.AnimationLoopComplete && e.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, t.AnimationLoopComplete, t);
t.AnimationFadeIn && e.addEventListener(dragonBones.EventObject.FADE_IN, t.AnimationFadeIn, t);
t.AnimationFadeOut && e.addEventListener(dragonBones.EventObject.FADE_OUT, t.AnimationFadeOut, t);
t.AnimationFrameEvent && e.addEventListener(dragonBones.EventObject.FRAME_EVENT, t.AnimationFrameEvent, t);
t.AnimationSoundEvent && e.addEventListener(dragonBones.EventObject.SOUND_EVENT, t.AnimationSoundEvent, t);
},
removeAnimationEventTarget: function(e, t) {
t.AnimationFadeInComplete && e.removeEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, t.AnimationFadeInComplete, t);
t.AnimationFadeOutComplete && e.removeEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, t.AnimationFadeOutComplete, t);
t.AnimationStart && e.removeEventListener(dragonBones.EventObject.START, t.AnimationStart, t);
t.AnimationComplete && e.removeEventListener(dragonBones.EventObject.COMPLETE, t.AnimationComplete, t);
t.AnimationLoopComplete && e.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, t.AnimationLoopComplete, t);
t.AnimationFadeIn && e.removeEventListener(dragonBones.EventObject.FADE_IN, t.AnimationFadeIn, t);
t.AnimationFadeOut && e.removeEventListener(dragonBones.EventObject.FADE_OUT, t.AnimationFadeOut, t);
t.AnimationFrameEvent && e.removeEventListener(dragonBones.EventObject.FRAME_EVENT, t.AnimationFrameEvent, t);
t.AnimationSoundEvent && e.removeEventListener(dragonBones.EventObject.SOUND_EVENT, t.AnimationSoundEvent, t);
},
AnimationFadeInComplete: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationFadeOutComplete: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationStart: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationComplete: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationLoopComplete: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationFrameEvent: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationSoundEvent: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationFadeIn: function(e) {
cc.log("DragonBone event: %s", e.type);
},
AnimationFadeOut: function(e) {
cc.log("DragonBone event: %s", e.type);
},
getAnimationNameFromEvent: function(e) {
return e.detail.animationState.name;
}
};
t.exports = i;
cc._RF.pop();
}, {} ],
GameApplication: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cf169DjkM9J5oC0MpXWr4SL", "GameApplication");
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = e("JavascriptBridgeNative"), o = e("JavascriptBridgeReceive"), s = {
Script: {},
Billboard: {},
initActiveSelf: !1,
debug: !1,
setDebugEnable: function(e) {
this.debug = e;
},
isDebugEnable: function() {
return this.debug;
},
Init: function() {
if (!this.initActiveSelf) {
this.initActiveSelf = !0;
this.JavascriptBridgeNative = i.getInstance();
this.JavascriptBridgeReceive = o.getInstance();
this.JavascriptBridgeNative.setDebugEnable(this.isDebugEnable());
this.ApplicationBehavior = e("ApplicationBehavior");
this.ApplicationBehavior.Init();
}
},
Dispose: function() {
if (this.initActiveSelf) {
this.initActiveSelf = !1;
if (null !== this.JavascriptBridgeNative) {
this.JavascriptBridgeNative.dispose();
this.JavascriptBridgeNative = null;
}
if (null !== this.JavascriptBridgeReceive) {
this.JavascriptBridgeReceive.dispose();
this.JavascriptBridgeReceive = null;
}
if (null !== this.ApplicationBehavior) {
this.ApplicationBehavior.Dispose();
this.ApplicationBehavior = null;
}
}
},
NativeToJavascript: function(e, t) {
this.isDebugEnable() && cc.log("{%s} >= %s", e, t);
try {
this.JavascriptBridgeReceive.broadcast(e, t);
} catch (e) {
cc.log("NativeToJavascript Receive Error: %s", e.message);
}
},
Implement: function(e, t) {
var n;
if (t) n = t; else {
var i = "parentClass";
if (!e.hasOwnProperty(i)) return e;
if (!e[i]) return e;
n = e[i];
}
if ("object" === ("undefined" == typeof n ? "undefined" : a(n))) for (var o in n) n.hasOwnProperty(o) && (e[o] || (e[o] = n[o]));
return e;
},
setParent: function(e, t) {
var n = e.convertToWorldSpaceAR(cc.p(0, 0));
e.parent = t;
e.position = t.convertToNodeSpaceAR(n);
},
setPosition: function(e, t) {
var n = t.convertToWorldSpaceAR(cc.p(0, 0));
e.position = e.parent.convertToNodeSpaceAR(n);
},
convertNodePosition: function(e, t) {
return e.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.p(0, 0)));
}
};
cc && !cc.GameApplication && (cc.GameApplication = s);
t.exports = s;
cc._RF.pop();
}, {
ApplicationBehavior: "ApplicationBehavior",
JavascriptBridgeNative: "JavascriptBridgeNative",
JavascriptBridgeReceive: "JavascriptBridgeReceive"
} ],
GameConst: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7de7er4nnBF27s5aFqNao9X", "GameConst");
t.exports = {
Configure: window.GameConfigure,
GameLevelInfo: null,
convertLevelInfo: function(e) {
for (var t = e.layout, n = e.path, i = t.length, o = t[0].length, a = new Array(i), s = 0; s < i; ++s) a[s] = new Array(o);
for (var c = 0; c < i; ++c) for (var r = t[c].split(""), u = 0; u < o; ++u) a[c][u] = parseInt(r[u]);
return {
map: a,
path: n,
maxV: i,
maxH: o
};
},
challengeLevels: [ 114, 214, 139, 195, 396, 121, 143, 165, 269, 189, 251, 153, 204, 207, 206, 217, 200, 377, 171, 201, 125, 230, 277, 325, 162, 219, 304, 359, 184, 110, 141, 262, 182, 390, 353, 242, 101, 241, 311, 218, 286, 221, 222, 169, 393, 140, 351, 346, 154, 149, 234, 159, 318, 173, 373, 402, 102, 375, 181, 265, 297, 322, 188, 252, 105, 249, 324, 128, 223, 400, 240, 271, 287, 133, 124, 386, 336, 278, 374, 164, 391, 314, 212, 156, 371, 264, 174, 355, 357, 366, 123, 342, 147, 362, 144, 243, 193, 225, 180, 203 ],
GRADE_MAX: 5,
APP_MODE: cc.Enum({
GAME: 0,
DEBUG: 1
}),
GAME_MODE: cc.Enum({
NORMAL: 0,
CHALLENGE: 1
}),
GAME_GRADE: cc.Enum({
BEGINNER: 0,
REGULAR: 1,
ADVANCED: 2,
EXPERT: 3,
MASTER: 4
}),
GAME_STATE: cc.Enum({
BEGIN: 0,
RUN: 1,
PAUSE: 2,
OVER: 3
}),
GameProxy: "GameProxy",
GameManagerMediator: "GameManagerMediator",
ON_ENTER_GAME: "ON_ENTER_GAME",
ON_INPUT_INDEX: "ON_INPUT_INDEX",
UP_GAME_COIN: "UP_GAME_COIN"
};
cc._RF.pop();
}, {} ],
GameFacade: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5b858kD3/VA/ZrIHtEbUyIe", "GameFacade");
var i = e("OnEnterGame");
cc.Class({
extends: e("CCFacade"),
properties: {},
startup: function() {
this.registerProxy(new (e("GameProxy"))(sc.GameConst.GameProxy));
this.registerCommand(sc.GameConst.ON_ENTER_GAME, i);
}
});
cc._RF.pop();
}, {
CCFacade: "CCFacade",
GameProxy: "GameProxy",
OnEnterGame: "OnEnterGame"
} ],
GameInitImp: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7743epLD5dMbozVEWNRSNUd", "GameInitImp");
var i = cc.Class({
extends: cc.Object,
statics: {
getInstance: function() {
i.instance || (i.instance = new i().init());
return i.instance;
}
},
properties: {
_gameInitInfo: null
},
init: function() {
this.initWindowSimulator();
this.initNative();
return this;
},
initWindowSimulator: function() {},
initNative: function() {
cc.GameApplication.Init();
var e = cc.GameApplication.JavascriptBridgeNative.sendMessage("game-init", {});
0 === e.result && (this._gameInitInfo = e);
},
isDebug: function() {
return null === this._gameInitInfo || this._gameInitInfo.debug;
},
getVersionCode: function() {
return null === this._gameInitInfo ? 1 : this._gameInitInfo.versionCode;
},
getVersionName: function() {
return null === this._gameInitInfo ? "1.0" : this._gameInitInfo.versionName;
},
getPackageName: function() {
return null === this._gameInitInfo ? "com.sencatech.game.xxx" : this._gameInitInfo.packageName;
},
getBundleId: function() {
return null === this._gameInitInfo ? "com.sencatech.game.xxx" : this._gameInitInfo.bundleId;
},
isTwoBabyCenter: function() {
return null !== this._gameInitInfo && !!this._gameInitInfo.twoBabyCenter;
},
isEmptyInfo: function() {
return null === this._gameInitInfo;
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
GameInitProtocol: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0b1b6n3i49OZZKCpMnXYIY/", "GameInitProtocol");
var i = {
extends: null,
properties: {},
ctor: function() {
cc.log("GameProtocol init");
},
onGameInit: function(e) {
cc.log("onGameInit: %s", e.name);
e.callback && this.WaitToReceive(.2, e.callback, {
data: "wuzhi,receive"
});
return {
result: 0
};
}
};
e("WinSimulation").setTypeClass(i);
t.exports = i;
cc._RF.pop();
}, {
WinSimulation: "WinSimulation"
} ],
GameLevelInfo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "51084cNZzZMRaPElm7CObk0", "GameLevelInfo");
t.exports = [ {
index: 1,
layout: [ "211" ],
path: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 2,
layout: [ "110", "211" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ] ]
}, {
index: 3,
layout: [ "012", "011", "111" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ] ]
}, {
index: 4,
layout: [ "1110", "2110", "0111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
}, {
index: 5,
layout: [ "1111", "1111", "1002" ],
path: [ [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 6,
layout: [ "1201", "1111", "1111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ] ]
}, {
index: 7,
layout: [ "0100", "1111", "1121", "0111" ],
path: [ [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 8,
layout: [ "1110", "0110", "2111", "1111" ],
path: [ [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 9,
layout: [ "1112", "1111", "1111", "0010" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ] ]
}, {
index: 10,
layout: [ "1111", "1110", "1021", "1111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ] ]
}, {
index: 11,
layout: [ "2110", "1111", "0111", "1111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 12,
layout: [ "1011", "1111", "1111", "1211" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 13,
layout: [ "2111", "0111", "1111", "1110", "1000" ],
path: [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 14,
layout: [ "0011", "1121", "1111", "1111", "0100" ],
path: [ [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 15,
layout: [ "0001", "0011", "1111", "1111", "1211" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ] ]
}, {
index: 16,
layout: [ "0010", "1111", "1101", "1121", "1111" ],
path: [ [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ] ]
}, {
index: 17,
layout: [ "0111", "0111", "1111", "1111", "2001" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 18,
layout: [ "1111", "0111", "1111", "2110", "0110" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 19,
layout: [ "0100", "1111", "1121", "1111", "1110" ],
path: [ [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 20,
layout: [ "0110", "1111", "0111", "1111", "1120" ],
path: [ [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 21,
layout: [ "1111", "1111", "0112", "1111", "1011" ],
path: [ [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 22,
layout: [ "2111", "0110", "1111", "1111", "1111" ],
path: [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ] ]
}, {
index: 23,
layout: [ "1111", "1211", "1011", "1110", "1111" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ] ]
}, {
index: 24,
layout: [ "1111", "0011", "1111", "1111", "1112" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 25,
layout: [ "1111", "1111", "1111", "0112", "1111" ],
path: [ [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 26,
layout: [ "20011", "11111", "01101", "11111", "01111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 27,
layout: [ "11110", "11111", "01111", "01112", "11100" ],
path: [ [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 28,
layout: [ "11112", "11110", "11000", "11111", "11110" ],
path: [ [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ] ]
}, {
index: 29,
layout: [ "11001", "21001", "11011", "11111", "11111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 30,
layout: [ "11211", "11111", "11110", "00011", "01111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ] ]
}, {
index: 31,
layout: [ "11110", "11111", "20111", "01111", "01011" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 32,
layout: [ "00110", "11111", "01102", "11111", "11111" ],
path: [ [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 33,
layout: [ "00111", "11111", "01011", "01111", "21111" ],
path: [ [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 34,
layout: [ "11001", "11101", "11111", "11011", "11120" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 35,
layout: [ "11110", "10112", "11111", "11011", "11100" ],
path: [ [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ]
}, {
index: 36,
layout: [ "11100", "11111", "11011", "21111", "01101" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 37,
layout: [ "11011", "11111", "11111", "01101", "02101" ],
path: [ [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 38,
layout: [ "00010", "11111", "11111", "12011", "11111" ],
path: [ [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ] ]
}, {
index: 39,
layout: [ "11000", "01111", "11021", "11111", "11111" ],
path: [ [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 40,
layout: [ "11110", "11111", "12111", "01111", "11000" ],
path: [ [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 41,
layout: [ "11111", "12101", "11111", "01111", "11100" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 42,
layout: [ "11101", "11111", "11111", "10121", "11100" ],
path: [ [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 43,
layout: [ "11111", "10011", "11111", "21111", "01011" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 44,
layout: [ "11112", "11111", "01100", "11110", "11111" ],
path: [ [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ] ]
}, {
index: 45,
layout: [ "01111", "20111", "10011", "11111", "11111" ],
path: [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ] ]
}, {
index: 46,
layout: [ "10111", "11111", "11111", "12111", "00110" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 47,
layout: [ "01111", "11201", "01111", "11011", "11111" ],
path: [ [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 48,
layout: [ "11111", "01111", "11010", "11011", "21111" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 49,
layout: [ "11111", "11011", "11110", "11111", "01120" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ] ]
}, {
index: 50,
layout: [ "01111", "11011", "11111", "11101", "12011" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ] ]
}, {
index: 51,
layout: [ "11121", "11111", "01111", "11110", "01110" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 52,
layout: [ "11110", "01111", "01112", "11011", "11111" ],
path: [ [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 53,
layout: [ "11111", "11111", "21011", "11011", "11100" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ]
}, {
index: 54,
layout: [ "11111", "00011", "01211", "11111", "11111" ],
path: [ [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 55,
layout: [ "21111", "11111", "11011", "11011", "11100" ],
path: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ]
}, {
index: 56,
layout: [ "01011", "11112", "11111", "11111", "11100" ],
path: [ [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 57,
layout: [ "11111", "11110", "01011", "11111", "11102" ],
path: [ [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ] ]
}, {
index: 58,
layout: [ "01011", "01111", "11111", "11201", "11111" ],
path: [ [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 59,
layout: [ "11011", "01121", "11111", "11111", "00111" ],
path: [ [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 60,
layout: [ "01111", "01101", "12110", "11111", "11111" ],
path: [ [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ] ]
}, {
index: 61,
layout: [ "11101", "11111", "11011", "12110", "11110" ],
path: [ [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 62,
layout: [ "11110", "11211", "01111", "11011", "01111" ],
path: [ [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 63,
layout: [ "11011", "11111", "11111", "11011", "20110" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ] ]
}, {
index: 64,
layout: [ "11110", "10110", "01111", "11111", "11121" ],
path: [ [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 65,
layout: [ "11000", "10111", "11111", "11111", "12111" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 66,
layout: [ "11120", "10110", "01111", "11111", "11111" ],
path: [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 67,
layout: [ "10111", "11111", "11112", "01111", "01110" ],
path: [ [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 68,
layout: [ "00111", "11011", "21111", "11111", "11110" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ] ]
}, {
index: 69,
layout: [ "11111", "11111", "10210", "01111", "01111" ],
path: [ [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 70,
layout: [ "20011", "11111", "11011", "11111", "11101" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 71,
layout: [ "11111", "10111", "11111", "20110", "11111" ],
path: [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ] ]
}, {
index: 72,
layout: [ "01111", "11011", "01211", "11111", "11111" ],
path: [ [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 73,
layout: [ "11011", "21111", "11111", "11101", "10111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 74,
layout: [ "11110", "11111", "01111", "11112", "10111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 75,
layout: [ "11111", "11101", "10110", "11111", "11211" ],
path: [ [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ] ]
}, {
index: 76,
layout: [ "11211", "11011", "11111", "11101", "11011" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ] ]
}, {
index: 77,
layout: [ "11011", "11111", "12111", "11101", "11101" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 78,
layout: [ "11101", "11111", "11011", "11211", "11110" ],
path: [ [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 79,
layout: [ "21111", "11111", "11101", "11101", "11011" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ] ]
}, {
index: 80,
layout: [ "11011", "01211", "11111", "11111", "11110" ],
path: [ [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 81,
layout: [ "11111", "21101", "11111", "11111", "10011" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 82,
layout: [ "11111", "10111", "11011", "11112", "10111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 83,
layout: [ "11111", "11111", "02011", "11111", "11101" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 84,
layout: [ "11011", "11111", "11111", "11201", "11101" ],
path: [ [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 85,
layout: [ "11111", "11211", "11010", "11111", "11101" ],
path: [ [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 86,
layout: [ "11111", "01111", "11011", "11111", "12110" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 87,
layout: [ "11111", "11111", "11021", "01111", "11110" ],
path: [ [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 88,
layout: [ "10111", "11111", "02111", "11111", "11110" ],
path: [ [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 89,
layout: [ "11111", "11110", "11011", "10111", "11121" ],
path: [ [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ] ]
}, {
index: 90,
layout: [ "11111", "11112", "11011", "11111", "01101" ],
path: [ [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 91,
layout: [ "12111", "10111", "11111", "11111", "11001" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 92,
layout: [ "11121", "11101", "01111", "11111", "11101" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 93,
layout: [ "11111", "11111", "11011", "20111", "11101" ],
path: [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 94,
layout: [ "11111", "10111", "01211", "11011", "11111" ],
path: [ [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 95,
layout: [ "11111", "21111", "11011", "11111", "10011" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 96,
layout: [ "11111", "01111", "01111", "11102", "11111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 97,
layout: [ "11011", "01111", "12111", "11111", "11110" ],
path: [ [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 98,
layout: [ "11111", "10111", "11110", "11211", "11101" ],
path: [ [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ] ]
}, {
index: 99,
layout: [ "11111", "11201", "11111", "01111", "11011" ],
path: [ [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 100,
layout: [ "11101", "11111", "11011", "11111", "12110" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 101,
layout: [ "111111", "110011", "111110", "121111", "110110" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 102,
layout: [ "001110", "111111", "111111", "111111", "010112" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 103,
layout: [ "112100", "111111", "111010", "111111", "011111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 104,
layout: [ "000111", "111011", "101111", "111111", "111211" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 105,
layout: [ "010111", "111121", "111111", "111111", "001110" ],
path: [ [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 106,
layout: [ "001011", "111111", "110111", "111111", "112110" ],
path: [ [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ] ]
}, {
index: 107,
layout: [ "001111", "111111", "111011", "101111", "101121" ],
path: [ [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 108,
layout: [ "110112", "111111", "101110", "111111", "010111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 109,
layout: [ "110100", "111111", "111111", "112101", "011111" ],
path: [ [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ] ]
}, {
index: 110,
layout: [ "111110", "111111", "011111", "111120", "011110" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 111,
layout: [ "201111", "111101", "111100", "111111", "011111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ] ]
}, {
index: 112,
layout: [ "011111", "011211", "110110", "111101", "111111" ],
path: [ [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ] ]
}, {
index: 113,
layout: [ "111011", "011111", "112101", "111101", "110111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 114,
layout: [ "111111", "111011", "101112", "101111", "110110" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ] ]
}, {
index: 115,
layout: [ "111011", "110111", "111101", "111001", "211111" ],
path: [ [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 116,
layout: [ "110010", "111110", "211011", "111111", "111111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 117,
layout: [ "111211", "111111", "101111", "111110", "110100" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 118,
layout: [ "111011", "121111", "110101", "011111", "111110" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 119,
layout: [ "011111", "011111", "111101", "111201", "101111" ],
path: [ [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 120,
layout: [ "011100", "011111", "101111", "111112", "111111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ] ]
}, {
index: 121,
layout: [ "111111", "110111", "011110", "121111", "111100" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 122,
layout: [ "110111", "101111", "101111", "111111", "110012" ],
path: [ [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 123,
layout: [ "112100", "011111", "111011", "111111", "110111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 124,
layout: [ "111100", "110111", "110111", "111110", "111211" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 125,
layout: [ "111111", "110121", "011101", "110111", "011111" ],
path: [ [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 126,
layout: [ "111110", "000110", "111111", "111111", "112111" ],
path: [ [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 127,
layout: [ "110111", "111101", "111111", "001111", "111120" ],
path: [ [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 128,
layout: [ "001112", "111111", "111110", "101111", "110111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ] ]
}, {
index: 129,
layout: [ "011011", "001111", "111101", "112111", "111111" ],
path: [ [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ] ]
}, {
index: 130,
layout: [ "111011", "111111", "111111", "111120", "010110" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 131,
layout: [ "200111", "101111", "111111", "011101", "111111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 132,
layout: [ "011110", "011211", "111101", "111111", "101111" ],
path: [ [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 133,
layout: [ "001111", "111111", "112101", "110111", "111011" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ]
}, {
index: 134,
layout: [ "011110", "111111", "011112", "011111", "011111" ],
path: [ [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 135,
layout: [ "111111", "110111", "011100", "111101", "211111" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ] ]
}, {
index: 136,
layout: [ "111100", "111111", "210011", "011111", "111111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 137,
layout: [ "111211", "101111", "111011", "111111", "110100" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 138,
layout: [ "101111", "121101", "110111", "111110", "111110" ],
path: [ [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 139,
layout: [ "011111", "111101", "111111", "111211", "001011" ],
path: [ [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ] ]
}, {
index: 140,
layout: [ "110111", "010101", "111111", "111112", "110111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 141,
layout: [ "111111", "111111", "011110", "021111", "011110" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 142,
layout: [ "110011", "110111", "111111", "111111", "110102" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 143,
layout: [ "112110", "111111", "011101", "110111", "111011" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ]
}, {
index: 144,
layout: [ "111111", "111101", "110111", "012110", "011111" ],
path: [ [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 145,
layout: [ "111110", "101111", "100111", "111120", "111111" ],
path: [ [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 146,
layout: [ "111111", "111201", "011011", "001111", "111111" ],
path: [ [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 147,
layout: [ "110111", "101111", "111112", "111111", "001110" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 148,
layout: [ "011111", "111111", "111011", "111100", "211110" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ] ]
}, {
index: 149,
layout: [ "001110", "111111", "211101", "111111", "101111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 150,
layout: [ "110111", "111111", "112111", "011111", "111000" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 151,
layout: [ "110111", "111111", "211111", "011111", "111000" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 152,
layout: [ "111011", "211111", "110101", "111001", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ] ]
}, {
index: 153,
layout: [ "100111", "111211", "111111", "111111", "001110" ],
path: [ [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 154,
layout: [ "111100", "111102", "111101", "011111", "111111" ],
path: [ [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 155,
layout: [ "111111", "101110", "111111", "110121", "111100" ],
path: [ [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 156,
layout: [ "111120", "111111", "110011", "011011", "111111" ],
path: [ [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 157,
layout: [ "012111", "111111", "111111", "111101", "111000" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 158,
layout: [ "010111", "111101", "111011", "111111", "120111" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 159,
layout: [ "111100", "111111", "110010", "111211", "111111" ],
path: [ [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 160,
layout: [ "111110", "110110", "011111", "011111", "111121" ],
path: [ [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 161,
layout: [ "111101", "101111", "121111", "111111", "111000" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 162,
layout: [ "011111", "010121", "111111", "111111", "011101" ],
path: [ [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ] ]
}, {
index: 163,
layout: [ "111111", "101101", "101101", "011111", "211111" ],
path: [ [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 164,
layout: [ "111111", "001111", "001111", "111102", "111111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 165,
layout: [ "101110", "111111", "111111", "111110", "112100" ],
path: [ [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 166,
layout: [ "111111", "110111", "010110", "211111", "111101" ],
path: [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ] ]
}, {
index: 167,
layout: [ "121111", "111111", "111111", "110110", "010110" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ] ]
}, {
index: 168,
layout: [ "111002", "111111", "111110", "111111", "011101" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ] ]
}, {
index: 169,
layout: [ "011001", "111111", "111111", "111101", "110211" ],
path: [ [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 170,
layout: [ "111211", "111111", "110011", "100110", "111111" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 171,
layout: [ "100110", "121111", "110011", "111111", "111111" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 172,
layout: [ "110111", "101111", "111111", "111121", "111000" ],
path: [ [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 173,
layout: [ "101110", "111110", "111111", "121111", "110011" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 174,
layout: [ "011111", "010110", "111211", "111111", "011111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 175,
layout: [ "211111", "110011", "110011", "011111", "111111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 176,
layout: [ "111111", "111111", "112111", "011110", "111000" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 177,
layout: [ "111111", "111001", "110101", "111111", "111012" ],
path: [ [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ] ]
}, {
index: 178,
layout: [ "001111", "111111", "111012", "111110", "011111" ],
path: [ [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 179,
layout: [ "110100", "111111", "111111", "112101", "110111" ],
path: [ [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ] ]
}, {
index: 180,
layout: [ "111111", "102111", "111011", "111111", "110100" ],
path: [ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 181,
layout: [ "001111", "111101", "211111", "011111", "110111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 182,
layout: [ "111111", "211110", "111100", "111111", "001111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 183,
layout: [ "111010", "101211", "111111", "110011", "111111" ],
path: [ [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 184,
layout: [ "111111", "111112", "110111", "011111", "111000" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 185,
layout: [ "111111", "101111", "111111", "011120", "001111" ],
path: [ [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 186,
layout: [ "111121", "111111", "101110", "011011", "011111" ],
path: [ [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 187,
layout: [ "012110", "011111", "101101", "111111", "111111" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ] ]
}, {
index: 188,
layout: [ "111011", "111111", "111111", "111110", "120100" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 189,
layout: [ "011111", "011111", "101111", "111210", "111110" ],
path: [ [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ] ]
}, {
index: 190,
layout: [ "111111", "110001", "111111", "101111", "101121" ],
path: [ [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 191,
layout: [ "010110", "111110", "121111", "111101", "111111" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 192,
layout: [ "111111", "111121", "101111", "111110", "110100" ],
path: [ [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 193,
layout: [ "100110", "111111", "111111", "111111", "210011" ],
path: [ [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 194,
layout: [ "100011", "110111", "110111", "111112", "111111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 195,
layout: [ "111011", "011111", "111111", "111110", "112100" ],
path: [ [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 196,
layout: [ "120111", "111111", "011011", "101111", "111011" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ] ]
}, {
index: 197,
layout: [ "011112", "011110", "111101", "111111", "111110" ],
path: [ [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ] ]
}, {
index: 198,
layout: [ "111111", "101101", "100111", "111110", "111211" ],
path: [ [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ] ]
}, {
index: 199,
layout: [ "111211", "111111", "111110", "111110", "110100" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ] ]
}, {
index: 200,
layout: [ "111110", "111111", "110111", "111121", "110001" ],
path: [ [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ] ]
}, {
index: 201,
layout: [ "010111", "111111", "111111", "211111", "111111", "000111" ],
path: [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 202,
layout: [ "111011", "111111", "011101", "110111", "111112", "101111" ],
path: [ [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 203,
layout: [ "011111", "201111", "111111", "110100", "111111", "111111" ],
path: [ [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ] ]
}, {
index: 204,
layout: [ "111111", "121111", "110011", "110100", "111111", "111111" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ] ]
}, {
index: 205,
layout: [ "111111", "100111", "011100", "111111", "111111", "111121" ],
path: [ [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 206,
layout: [ "101111", "111111", "111100", "111111", "110021", "111111" ],
path: [ [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 207,
layout: [ "101110", "111112", "111111", "100110", "111111", "111111" ],
path: [ [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 208,
layout: [ "111111", "110111", "011011", "102110", "111111", "111111" ],
path: [ [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ] ]
}, {
index: 209,
layout: [ "111111", "011111", "111101", "111101", "110111", "110112" ],
path: [ [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 210,
layout: [ "111111", "011111", "011110", "121011", "101111", "111111" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 211,
layout: [ "111111", "111111", "111111", "011110", "111002", "101111" ],
path: [ [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 212,
layout: [ "111111", "200111", "111110", "111011", "011111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 213,
layout: [ "111211", "111110", "110111", "110011", "101111", "111111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 214,
layout: [ "111111", "121111", "110110", "011101", "110111", "111111" ],
path: [ [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ] ]
}, {
index: 215,
layout: [ "111101", "101111", "111111", "011111", "111011", "111120" ],
path: [ [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 216,
layout: [ "111111", "110111", "111111", "111110", "110120", "110111" ],
path: [ [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ] ]
}, {
index: 217,
layout: [ "101110", "111112", "001111", "111111", "111101", "111111" ],
path: [ [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 218,
layout: [ "111111", "011011", "111110", "111111", "111111", "011012" ],
path: [ [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 219,
layout: [ "111110", "111111", "011111", "121111", "111100", "110111" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ] ]
}, {
index: 220,
layout: [ "111110", "111111", "111111", "001011", "112111", "011111" ],
path: [ [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 221,
layout: [ "110111", "111101", "101112", "111111", "111111", "101110" ],
path: [ [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 222,
layout: [ "110110", "011210", "111111", "111111", "111111", "110111" ],
path: [ [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 223,
layout: [ "111011", "111111", "121111", "111110", "110111", "001111" ],
path: [ [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ] ]
}, {
index: 224,
layout: [ "011101", "011111", "111111", "110120", "111111", "111111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 225,
layout: [ "112110", "111111", "101111", "011010", "111111", "111111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 226,
layout: [ "111111", "111101", "011011", "111011", "121111", "101111" ],
path: [ [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 227,
layout: [ "111111", "111101", "111111", "001111", "011112", "111110" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 228,
layout: [ "111101", "211101", "111101", "111011", "101111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 229,
layout: [ "111111", "101111", "011112", "111111", "111011", "001111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 230,
layout: [ "110110", "111111", "110110", "111112", "111111", "110111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 231,
layout: [ "111111", "111101", "111111", "021011", "111111", "101111" ],
path: [ [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 232,
layout: [ "111110", "111111", "111111", "001211", "111111", "101111" ],
path: [ [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 233,
layout: [ "111102", "011111", "111111", "110110", "111111", "111111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 234,
layout: [ "111101", "101111", "111111", "011101", "112111", "111111" ],
path: [ [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 235,
layout: [ "111110", "111111", "011110", "111111", "111111", "201111" ],
path: [ [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 236,
layout: [ "111101", "111111", "100111", "111112", "111111", "110111" ],
path: [ [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 237,
layout: [ "101111", "111111", "111111", "011110", "111102", "111111" ],
path: [ [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 238,
layout: [ "111111", "011111", "111111", "111110", "121111", "001111" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 239,
layout: [ "010111", "111111", "101111", "111111", "211111", "110111" ],
path: [ [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 240,
layout: [ "111110", "011111", "111101", "211111", "111111", "111011" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 241,
layout: [ "101111", "111111", "110112", "111011", "111111", "110111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 242,
layout: [ "111111", "110110", "111110", "111111", "111101", "121111" ],
path: [ [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 243,
layout: [ "111111", "011101", "021111", "111111", "111111", "111110" ],
path: [ [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 244,
layout: [ "111011", "101112", "011111", "111111", "111011", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 245,
layout: [ "111101", "111211", "111110", "011011", "111111", "111111" ],
path: [ [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 246,
layout: [ "111111", "211111", "111111", "111110", "101111", "001111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 247,
layout: [ "111101", "110111", "111110", "111111", "111101", "111211" ],
path: [ [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 248,
layout: [ "111111", "011111", "111101", "101121", "111111", "110111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 249,
layout: [ "111011", "111111", "111121", "111111", "101101", "101111" ],
path: [ [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 250,
layout: [ "111111", "111111", "101201", "011011", "111111", "111111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 251,
layout: [ "010111", "111111", "111111", "110111", "111121", "011111" ],
path: [ [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 252,
layout: [ "111111", "002111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 253,
layout: [ "111101", "111111", "211011", "110110", "111111", "111111" ],
path: [ [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 254,
layout: [ "111111", "111111", "111111", "011110", "110211", "011111" ],
path: [ [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 255,
layout: [ "111111", "111011", "112111", "111101", "101111", "101111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 256,
layout: [ "121111", "111111", "111111", "011110", "111111", "001111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 257,
layout: [ "110111", "111111", "111111", "121101", "101111", "101111" ],
path: [ [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 258,
layout: [ "111010", "111011", "011111", "111111", "111112", "111111" ],
path: [ [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 259,
layout: [ "101111", "111021", "111111", "111110", "111111", "011111" ],
path: [ [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 260,
layout: [ "100111", "111111", "011111", "111111", "111111", "012111" ],
path: [ [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 261,
layout: [ "201111", "111111", "111110", "111111", "111101", "101111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 262,
layout: [ "011101", "111101", "111111", "111111", "111111", "120111" ],
path: [ [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 263,
layout: [ "111111", "110112", "111111", "111101", "111101", "101111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 264,
layout: [ "111111", "111201", "101111", "111111", "111101", "101111" ],
path: [ [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 265,
layout: [ "111110", "211011", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 266,
layout: [ "111110", "101111", "011011", "111111", "111121", "111111" ],
path: [ [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 267,
layout: [ "111111", "112111", "011110", "111101", "111111", "111110" ],
path: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ] ]
}, {
index: 268,
layout: [ "111111", "111101", "211011", "111111", "011101", "111111" ],
path: [ [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 269,
layout: [ "111010", "111111", "111111", "111111", "110201", "111111" ],
path: [ [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 270,
layout: [ "111111", "111111", "112111", "110110", "111101", "110111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 271,
layout: [ "111111", "011011", "111111", "111211", "111111", "011111" ],
path: [ [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 272,
layout: [ "111011", "111121", "111111", "111111", "111101", "101111" ],
path: [ [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 273,
layout: [ "111111", "110111", "111111", "111110", "111101", "211111" ],
path: [ [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 274,
layout: [ "111121", "111111", "111111", "011110", "101111", "111111" ],
path: [ [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ] ]
}, {
index: 275,
layout: [ "111211", "111111", "101111", "111110", "111111", "101111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 276,
layout: [ "111111", "112111", "111111", "011110", "111101", "111111" ],
path: [ [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 277,
layout: [ "110111", "111111", "111111", "111111", "011211", "110111" ],
path: [ [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 278,
layout: [ "111011", "011111", "111111", "111110", "111111", "121111" ],
path: [ [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 279,
layout: [ "111111", "110111", "111111", "112110", "111101", "111111" ],
path: [ [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 280,
layout: [ "112111", "011111", "111101", "111111", "111111", "110111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 281,
layout: [ "111101", "111111", "110111", "111121", "111111", "110111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 282,
layout: [ "111111", "011211", "111111", "111110", "111111", "110111" ],
path: [ [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 283,
layout: [ "111101", "111111", "111111", "011110", "121111", "111111" ],
path: [ [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 284,
layout: [ "111111", "021011", "111111", "111111", "111111", "110111" ],
path: [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 285,
layout: [ "111111", "011111", "111011", "111111", "111111", "111210" ],
path: [ [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 286,
layout: [ "111111", "110111", "111211", "111111", "111111", "101110" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 287,
layout: [ "010111", "111111", "111111", "211111", "111111", "110111" ],
path: [ [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 288,
layout: [ "111111", "011011", "112111", "111111", "111111", "110111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 289,
layout: [ "111111", "011111", "111111", "111112", "111101", "011111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 290,
layout: [ "111111", "111101", "121111", "111111", "111101", "101111" ],
path: [ [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 291,
layout: [ "121111", "111111", "111111", "110110", "111111", "101111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ] ]
}, {
index: 292,
layout: [ "111111", "111011", "111111", "011111", "111121", "011111" ],
path: [ [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 293,
layout: [ "111011", "211111", "111111", "111111", "011101", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 294,
layout: [ "111101", "111111", "111111", "011011", "111111", "111121" ],
path: [ [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 295,
layout: [ "011101", "111111", "111111", "111121", "111111", "011111" ],
path: [ [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 296,
layout: [ "112111", "011011", "111111", "111111", "111111", "110111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 297,
layout: [ "101110", "111111", "111111", "111111", "211111", "111110" ],
path: [ [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 298,
layout: [ "111111", "011111", "111121", "111111", "101101", "111111" ],
path: [ [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 299,
layout: [ "111101", "101111", "111111", "111111", "111111", "012111" ],
path: [ [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 300,
layout: [ "111211", "110111", "111111", "111111", "011111", "111110" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ] ]
}, {
index: 301,
layout: [ "111111", "111111", "110100", "111111", "112010", "111111", "111111" ],
path: [ [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 302,
layout: [ "111111", "110110", "111111", "211011", "011011", "111111", "111111" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 303,
layout: [ "110111", "111011", "101111", "111111", "110011", "112111", "111111" ],
path: [ [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 304,
layout: [ "111110", "111111", "110110", "011211", "111101", "111111", "111111" ],
path: [ [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ] ]
}, {
index: 305,
layout: [ "111101", "101111", "101111", "101111", "111111", "110111", "111211" ],
path: [ [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 306,
layout: [ "111101", "111101", "120111", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 307,
layout: [ "111011", "111110", "111110", "111111", "011112", "111011", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 308,
layout: [ "111111", "120111", "111011", "111110", "111111", "001111", "111111" ],
path: [ [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 309,
layout: [ "111101", "211111", "111011", "111111", "111100", "101111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 310,
layout: [ "110111", "111011", "111110", "011111", "111101", "111111", "121111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 311,
layout: [ "101111", "111111", "111111", "110110", "011011", "111111", "211111" ],
path: [ [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 312,
layout: [ "110111", "011112", "111111", "111111", "110110", "110111", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 313,
layout: [ "111111", "111111", "011011", "111121", "010110", "111111", "111111" ],
path: [ [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 314,
layout: [ "110111", "111111", "111011", "121101", "111110", "101111", "111111" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 315,
layout: [ "110210", "111111", "111111", "111111", "011110", "101111", "111111" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 316,
layout: [ "111111", "011101", "111111", "111112", "110001", "111111", "111111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 317,
layout: [ "111111", "211111", "110011", "111011", "110110", "111111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ] ]
}, {
index: 318,
layout: [ "121111", "111110", "011011", "111111", "111011", "101111", "111111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 319,
layout: [ "111111", "102111", "001111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ] ]
}, {
index: 320,
layout: [ "111211", "111110", "111100", "011111", "111101", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 321,
layout: [ "111111", "111111", "011011", "111102", "111101", "011111", "111111" ],
path: [ [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 322,
layout: [ "111111", "111101", "111111", "011110", "111101", "102111", "111111" ],
path: [ [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 323,
layout: [ "111011", "111111", "011111", "111201", "111110", "101111", "111111" ],
path: [ [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 324,
layout: [ "111111", "112101", "011111", "101111", "110110", "111111", "111111" ],
path: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ] ]
}, {
index: 325,
layout: [ "111001", "111111", "111111", "101121", "110110", "111111", "111111" ],
path: [ [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 326,
layout: [ "111111", "211110", "111111", "111111", "101100", "101111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 327,
layout: [ "101110", "111111", "111101", "111111", "211011", "101111", "111111" ],
path: [ [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 328,
layout: [ "111111", "111111", "011010", "111111", "112110", "101111", "111111" ],
path: [ [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 329,
layout: [ "111111", "111111", "120011", "111111", "011110", "101111", "111111" ],
path: [ [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 330,
layout: [ "111101", "111111", "101112", "111111", "110110", "101111", "111111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 331,
layout: [ "111111", "111011", "101111", "111111", "110110", "011211", "111111" ],
path: [ [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 332,
layout: [ "111111", "121111", "101011", "110110", "111111", "101111", "111111" ],
path: [ [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ]
}, {
index: 333,
layout: [ "011111", "111111", "111011", "011111", "101101", "121111", "111111" ],
path: [ [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ] ]
}, {
index: 334,
layout: [ "111011", "111121", "111111", "111110", "011011", "101111", "111111" ],
path: [ [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 335,
layout: [ "111111", "111111", "011011", "111101", "111011", "101111", "112111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ] ]
}, {
index: 336,
layout: [ "111011", "111110", "011111", "112111", "101101", "111111", "111111" ],
path: [ [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 337,
layout: [ "111011", "111111", "111111", "111110", "101121", "011111", "011111" ],
path: [ [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ]
}, {
index: 338,
layout: [ "111111", "100111", "111110", "111110", "111101", "211111", "111111" ],
path: [ [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 339,
layout: [ "111111", "100111", "111011", "111111", "110111", "011112", "111111" ],
path: [ [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 340,
layout: [ "111121", "111111", "101111", "111110", "110011", "011111", "111111" ],
path: [ [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 341,
layout: [ "111111", "111101", "211011", "111110", "111111", "001111", "111111" ],
path: [ [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 342,
layout: [ "011111", "111112", "111110", "111111", "011010", "111111", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 343,
layout: [ "121111", "111110", "111111", "011111", "111100", "111111", "011111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 344,
layout: [ "011011", "111111", "110111", "111101", "112110", "111111", "111111" ],
path: [ [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 345,
layout: [ "111111", "111111", "110010", "121111", "111110", "101111", "111111" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 346,
layout: [ "111201", "110111", "111111", "111111", "010110", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 347,
layout: [ "111111", "111111", "110110", "101111", "111011", "011111", "112111" ],
path: [ [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 348,
layout: [ "111111", "111111", "102100", "111111", "111101", "011111", "111111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 349,
layout: [ "101111", "111111", "111101", "110111", "111100", "111111", "211111" ],
path: [ [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 350,
layout: [ "211111", "110111", "111110", "111111", "111100", "101111", "111111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 351,
layout: [ "101110", "111111", "111111", "111211", "110001", "111111", "111111" ],
path: [ [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 352,
layout: [ "111111", "101100", "121111", "111111", "101101", "111111", "111111" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 353,
layout: [ "111101", "111101", "101111", "111111", "111111", "102011", "111111" ],
path: [ [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 354,
layout: [ "111111", "111211", "110010", "111111", "110110", "111111", "111111" ],
path: [ [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 355,
layout: [ "111001", "111121", "111111", "111111", "011110", "111011", "111111" ],
path: [ [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 356,
layout: [ "110111", "111111", "211111", "011111", "101100", "111111", "111111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ] ]
}, {
index: 357,
layout: [ "111111", "111111", "101111", "112110", "011001", "111111", "111111" ],
path: [ [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 358,
layout: [ "111011", "111111", "110111", "111011", "111110", "011111", "111121" ],
path: [ [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ] ]
}, {
index: 359,
layout: [ "121111", "111101", "111111", "111110", "001101", "111111", "111111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 360,
layout: [ "111011", "111111", "011111", "101101", "111101", "111111", "121111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ] ]
}, {
index: 361,
layout: [ "111011", "011111", "111111", "112110", "111111", "111111", "011111" ],
path: [ [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 362,
layout: [ "112111", "111111", "011111", "111111", "011110", "110111", "111111" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 363,
layout: [ "111111", "111110", "111111", "011111", "111011", "101111", "111121" ],
path: [ [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 364,
layout: [ "101211", "111111", "111111", "111111", "010110", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 365,
layout: [ "111101", "101111", "111111", "111101", "111011", "121111", "111111" ],
path: [ [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 366,
layout: [ "010111", "111111", "111111", "111111", "101110", "111211", "111111" ],
path: [ [ 5, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]
}, {
index: 367,
layout: [ "111101", "101111", "111111", "111111", "111010", "111111", "211111" ],
path: [ [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 368,
layout: [ "101111", "101111", "111112", "111111", "011110", "111111", "111111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 369,
layout: [ "111111", "011111", "111111", "211110", "111011", "101111", "111111" ],
path: [ [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 370,
layout: [ "111111", "101111", "101211", "011111", "111101", "111111", "111111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 371,
layout: [ "011111", "211111", "111111", "011110", "101111", "111111", "111111" ],
path: [ [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ] ]
}, {
index: 372,
layout: [ "111111", "121101", "011111", "111111", "011110", "111111", "111111" ],
path: [ [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 373,
layout: [ "111011", "110111", "111111", "111111", "110201", "111111", "111111" ],
path: [ [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 374,
layout: [ "111121", "111101", "111111", "011110", "111101", "111111", "111111" ],
path: [ [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 375,
layout: [ "121111", "111111", "011110", "111111", "111110", "101111", "111111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 376,
layout: [ "111011", "111110", "110111", "111112", "101111", "111111", "111111" ],
path: [ [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 377,
layout: [ "111111", "111111", "111111", "011110", "101111", "101111", "111211" ],
path: [ [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ] ]
}, {
index: 378,
layout: [ "111101", "111101", "111111", "011210", "111111", "111111", "111111" ],
path: [ [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 379,
layout: [ "011111", "111111", "111110", "111111", "011110", "111121", "111111" ],
path: [ [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 380,
layout: [ "101111", "101111", "111111", "112110", "101111", "111111", "111111" ],
path: [ [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 381,
layout: [ "112101", "111111", "111011", "011111", "111101", "111111", "111111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 382,
layout: [ "110111", "111011", "111111", "111111", "111110", "110111", "112111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 383,
layout: [ "111011", "111110", "211111", "011111", "111101", "111111", "111111" ],
path: [ [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 384,
layout: [ "111001", "111101", "111111", "111111", "110111", "111111", "111121" ],
path: [ [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 385,
layout: [ "111211", "111111", "111110", "111111", "011110", "111011", "111111" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 386,
layout: [ "111011", "111110", "111111", "111111", "101101", "121111", "111111" ],
path: [ [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 387,
layout: [ "111110", "111110", "111111", "011110", "111111", "111211", "111111" ],
path: [ [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ] ]
}, {
index: 388,
layout: [ "110111", "111111", "101112", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]
}, {
index: 389,
layout: [ "110111", "111011", "111111", "111101", "111011", "111111", "211111" ],
path: [ [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 390,
layout: [ "110111", "111011", "111111", "111111", "102110", "111111", "111111" ],
path: [ [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ] ]
}, {
index: 391,
layout: [ "111010", "111111", "111111", "111111", "110101", "111111", "111112" ],
path: [ [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ] ]
}, {
index: 392,
layout: [ "101111", "111111", "111011", "111111", "111101", "101111", "121111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 393,
layout: [ "111011", "011111", "111111", "111111", "110102", "111111", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 394,
layout: [ "111111", "110112", "111111", "101111", "011011", "111111", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 395,
layout: [ "101111", "101111", "121111", "111110", "101111", "111111", "111111" ],
path: [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 396,
layout: [ "112110", "111111", "111101", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ] ]
}, {
index: 397,
layout: [ "111111", "110110", "111111", "121111", "011011", "111111", "111111" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 398,
layout: [ "110111", "011121", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 6, 4 ], [ 5, 4 ], [ 5, 3 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 1 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 399,
layout: [ "111011", "111111", "111111", "111110", "111101", "011111", "211111" ],
path: [ [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 6, 2 ], [ 6, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 400,
layout: [ "111111", "011111", "111211", "111110", "101111", "101111", "111111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 401,
layout: [ "111111", "101110", "111111", "111101", "101112", "101111", "111111", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 402,
layout: [ "111111", "110111", "111101", "111111", "011110", "101111", "111111", "211111" ],
path: [ [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 403,
layout: [ "111111", "100111", "111110", "111111", "011120", "111111", "111111", "111111" ],
path: [ [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 404,
layout: [ "011011", "111111", "021111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 405,
layout: [ "111111", "001111", "111111", "111100", "211110", "111111", "111111", "111111" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 406,
layout: [ "011111", "111110", "111111", "111111", "111110", "001111", "121111", "111111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 407,
layout: [ "111111", "101110", "111111", "111111", "111110", "001121", "111111", "111111" ],
path: [ [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 408,
layout: [ "111011", "111011", "011111", "111101", "011111", "111111", "111112", "111111" ],
path: [ [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 409,
layout: [ "211011", "111101", "111111", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ] ]
}, {
index: 410,
layout: [ "111011", "110011", "111111", "111111", "011110", "111111", "112111", "111111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 411,
layout: [ "111110", "111111", "110111", "011110", "111111", "011112", "111111", "111111" ],
path: [ [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 6, 3 ], [ 6, 2 ], [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 412,
layout: [ "111011", "011211", "011111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 413,
layout: [ "110111", "110101", "111011", "111111", "111111", "101111", "111111", "111211" ],
path: [ [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ] ]
}, {
index: 414,
layout: [ "111211", "110110", "011111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 415,
layout: [ "121111", "111001", "111111", "111111", "011110", "101111", "111111", "111111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 416,
layout: [ "111011", "011111", "111111", "121110", "111110", "101111", "111111", "111111" ],
path: [ [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 417,
layout: [ "111011", "110111", "111111", "101110", "111110", "111111", "211111", "111111" ],
path: [ [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 418,
layout: [ "110111", "121111", "111111", "111101", "101110", "101111", "111111", "111111" ],
path: [ [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 419,
layout: [ "101110", "111111", "111101", "111111", "110110", "111111", "111111", "121111" ],
path: [ [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 420,
layout: [ "111011", "111111", "011111", "211111", "011110", "101111", "111111", "111111" ],
path: [ [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 421,
layout: [ "111011", "011011", "111111", "111111", "112110", "101111", "111111", "111111" ],
path: [ [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 422,
layout: [ "111112", "111111", "011011", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 423,
layout: [ "011001", "111111", "111111", "111111", "011210", "111111", "111111", "111111" ],
path: [ [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 424,
layout: [ "110111", "110111", "111110", "111111", "011110", "121111", "111111", "111111" ],
path: [ [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 425,
layout: [ "111111", "111101", "110111", "112111", "011110", "101111", "111111", "111111" ],
path: [ [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 426,
layout: [ "111101", "101111", "101111", "111111", "011110", "111111", "111211", "111111" ],
path: [ [ 6, 3 ], [ 6, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 427,
layout: [ "011111", "111100", "111111", "111101", "111112", "101111", "111111", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 428,
layout: [ "111101", "110121", "011111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 429,
layout: [ "111111", "111111", "011011", "111101", "111110", "101111", "111111", "111112" ],
path: [ [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 430,
layout: [ "011111", "111112", "111111", "111101", "101110", "101111", "111111", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 431,
layout: [ "112111", "011111", "111101", "110111", "111110", "101111", "111111", "111111" ],
path: [ [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 432,
layout: [ "111101", "111111", "110111", "111111", "111110", "001111", "121111", "111111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 433,
layout: [ "111110", "211111", "111101", "101111", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 434,
layout: [ "011101", "111111", "101111", "111101", "011111", "111111", "111112", "111111" ],
path: [ [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 435,
layout: [ "101111", "111101", "111101", "111111", "011110", "111111", "112111", "111111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 436,
layout: [ "111111", "111111", "111100", "011111", "111101", "011112", "111111", "111111" ],
path: [ [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 6, 3 ], [ 6, 2 ], [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 5, 1 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ] ]
}, {
index: 437,
layout: [ "111111", "101211", "101111", "111101", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 438,
layout: [ "011111", "111110", "111111", "011121", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 439,
layout: [ "111111", "111111", "110110", "111101", "011011", "111111", "111111", "111211" ],
path: [ [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ] ]
}, {
index: 440,
layout: [ "101111", "101101", "111111", "111112", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 441,
layout: [ "111210", "111111", "111101", "101111", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 442,
layout: [ "111111", "111111", "011011", "111111", "011110", "201111", "111111", "111111" ],
path: [ [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 443,
layout: [ "121110", "111111", "111101", "111111", "011110", "101111", "111111", "111111" ],
path: [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 444,
layout: [ "011011", "111101", "101111", "111111", "111111", "101211", "111111", "111111" ],
path: [ [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ] ]
}, {
index: 445,
layout: [ "110111", "111111", "111110", "120111", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 446,
layout: [ "111111", "111111", "110112", "011111", "011110", "101111", "111111", "111111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 447,
layout: [ "101110", "111111", "111111", "101110", "111110", "111111", "211111", "111111" ],
path: [ [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 448,
layout: [ "111111", "011111", "110110", "111111", "101111", "101111", "111121", "111111" ],
path: [ [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 449,
layout: [ "001011", "121111", "111111", "111111", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ] ]
}, {
index: 450,
layout: [ "110111", "111101", "111111", "101111", "011110", "112111", "111111", "111111" ],
path: [ [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 451,
layout: [ "001111", "111111", "111110", "111111", "011110", "111111", "111111", "121111" ],
path: [ [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 452,
layout: [ "111111", "111111", "101201", "101111", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 453,
layout: [ "110111", "101101", "111111", "211111", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 454,
layout: [ "111111", "011011", "112111", "110111", "111110", "101111", "111111", "111111" ],
path: [ [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 455,
layout: [ "111011", "110111", "111111", "111110", "112110", "101111", "111111", "111111" ],
path: [ [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 456,
layout: [ "111112", "111111", "110111", "100111", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 457,
layout: [ "111100", "111111", "211111", "111101", "111110", "101111", "111111", "111111" ],
path: [ [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 458,
layout: [ "011111", "111110", "111111", "111101", "111111", "001111", "111111", "112111" ],
path: [ [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 459,
layout: [ "111101", "101111", "111111", "111111", "101210", "101111", "111111", "111111" ],
path: [ [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 460,
layout: [ "011111", "111111", "111110", "111111", "011110", "021111", "111111", "111111" ],
path: [ [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 461,
layout: [ "111110", "111111", "110111", "112111", "011110", "101111", "111111", "111111" ],
path: [ [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 462,
layout: [ "110111", "101111", "111111", "111111", "111110", "001111", "111211", "111111" ],
path: [ [ 6, 3 ], [ 6, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 463,
layout: [ "111101", "111111", "110111", "111101", "101112", "101111", "111111", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 464,
layout: [ "001111", "121111", "111110", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 465,
layout: [ "111111", "111121", "010111", "110111", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 466,
layout: [ "111111", "111111", "101101", "111111", "011110", "101111", "111111", "211111" ],
path: [ [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 6, 2 ], [ 6, 1 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 467,
layout: [ "111011", "111111", "111111", "111111", "011110", "101120", "111111", "111111" ],
path: [ [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 468,
layout: [ "101111", "121001", "111111", "111111", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 469,
layout: [ "111111", "101102", "111111", "111101", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ] ]
}, {
index: 470,
layout: [ "100111", "111111", "111111", "100111", "211110", "111111", "111111", "111111" ],
path: [ [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 471,
layout: [ "001111", "111111", "111110", "111111", "011111", "101111", "111211", "111111" ],
path: [ [ 6, 3 ], [ 6, 4 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ] ]
}, {
index: 472,
layout: [ "101111", "111101", "011121", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 473,
layout: [ "111102", "111111", "011011", "111111", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 474,
layout: [ "110111", "101111", "111111", "111111", "111110", "001111", "121111", "111111" ],
path: [ [ 6, 1 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 6, 4 ], [ 6, 3 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 475,
layout: [ "011110", "111111", "011111", "111111", "111110", "201111", "111111", "111111" ],
path: [ [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
}, {
index: 476,
layout: [ "111011", "011011", "111111", "111111", "011110", "111111", "112111", "111111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 477,
layout: [ "111001", "101011", "111111", "111111", "111111", "110111", "111111", "111121" ],
path: [ [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 478,
layout: [ "111011", "111111", "011111", "111111", "010110", "112111", "111111", "111111" ],
path: [ [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 479,
layout: [ "111111", "111101", "110110", "111112", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ] ]
}, {
index: 480,
layout: [ "101111", "101201", "111111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 481,
layout: [ "111101", "111111", "101211", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ] ]
}, {
index: 482,
layout: [ "111110", "001111", "111011", "111111", "111111", "101111", "111121", "111111" ],
path: [ [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 483,
layout: [ "111011", "111110", "111112", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 484,
layout: [ "110111", "111111", "111011", "110101", "111111", "101111", "111111", "111211" ],
path: [ [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 3 ], [ 3, 3 ] ]
}, {
index: 485,
layout: [ "111210", "111111", "011111", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 486,
layout: [ "001111", "111111", "111110", "101111", "111110", "111111", "211111", "111111" ],
path: [ [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 487,
layout: [ "101111", "111001", "111111", "111111", "011110", "111111", "111111", "121111" ],
path: [ [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ]
}, {
index: 488,
layout: [ "110111", "110111", "111110", "111211", "011110", "111111", "111111", "111111" ],
path: [ [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 489,
layout: [ "111110", "001111", "111111", "111111", "011110", "121111", "111111", "111111" ],
path: [ [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 490,
layout: [ "112111", "110111", "111110", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 6, 2 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ] ]
}, {
index: 491,
layout: [ "110111", "211111", "111111", "100111", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 1, 4 ], [ 2, 4 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ] ]
}, {
index: 492,
layout: [ "111011", "111110", "110111", "111101", "011112", "111111", "111111", "111111" ],
path: [ [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ]
}, {
index: 493,
layout: [ "021110", "101111", "111111", "111111", "111110", "101111", "111111", "111111" ],
path: [ [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 1, 3 ], [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 3, 4 ], [ 2, 4 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ] ]
}, {
index: 494,
layout: [ "110111", "101111", "111111", "111101", "111111", "001111", "111111", "112111" ],
path: [ [ 7, 2 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 4 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 495,
layout: [ "111111", "112101", "011111", "111011", "011110", "111111", "111111", "111111" ],
path: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 0, 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ] ]
}, {
index: 496,
layout: [ "111011", "110111", "111111", "111110", "011110", "111111", "112111", "111111" ],
path: [ [ 6, 2 ], [ 6, 1 ], [ 5, 1 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 6, 3 ], [ 6, 4 ], [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 5, 5 ], [ 5, 4 ], [ 4, 4 ], [ 3, 4 ], [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ], [ 5, 2 ], [ 4, 2 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
}, {
index: 497,
layout: [ "111111", "111111", "111111", "011110", "111001", "101111", "111111", "111121" ],
path: [ [ 7, 4 ], [ 7, 5 ], [ 6, 5 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 4, 1 ], [ 3, 1 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ], [ 2, 4 ], [ 3, 4 ], [ 3, 3 ], [ 2, 3 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 4, 5 ] ]
}, {
index: 498,
layout: [ "110110", "101111", "111111", "111111", "110110", "112111", "111111", "111111" ],
path: [ [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 1, 4 ], [ 0, 4 ], [ 0, 3 ], [ 1, 3 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 1 ] ]
}, {
index: 499,
layout: [ "111011", "011111", "011111", "111112", "111110", "101111", "111111", "111111" ],
path: [ [ 3, 5 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ], [ 1, 2 ], [ 0, 2 ], [ 0, 1 ], [ 0, 0 ] ]
}, {
index: 500,
layout: [ "111111", "011111", "111121", "111100", "011110", "111111", "111111", "111111" ],
path: [ [ 2, 4 ], [ 2, 5 ], [ 1, 5 ], [ 0, 5 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ], [ 0, 3 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ], [ 5, 3 ], [ 4, 3 ], [ 4, 4 ], [ 5, 4 ], [ 5, 5 ], [ 6, 5 ], [ 7, 5 ], [ 7, 4 ], [ 6, 4 ], [ 6, 3 ], [ 7, 3 ], [ 7, 2 ], [ 6, 2 ], [ 6, 1 ], [ 7, 1 ], [ 7, 0 ], [ 6, 0 ], [ 5, 0 ], [ 5, 1 ], [ 4, 1 ], [ 3, 1 ], [ 3, 0 ], [ 2, 0 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ], [ 0, 0 ] ]
} ];
cc._RF.pop();
}, {} ],
GameManagerMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "acce1HnZLBF476u+cQpv8Iv", "GameManagerMediator");
var i = e("BaseMediator");
cc.Class({
extends: i,
properties: {},
listNotificationInterests: function() {
return [ sc.GameConst.ON_INPUT_INDEX, sc.GameConst.UP_GAME_COIN ];
},
ON_INPUT_INDEX: function(e) {
var t = this;
if (e.touchType === cc.Node.EventType.TOUCH_END) {
if (this.getViewComponent().mapNode.getComponent("Map").isMapComplete()) {
cc.log("map complete");
cc.find("Canvas/globalMask").active = !0;
setTimeout(function() {
t.completeGame();
}, 500);
}
}
},
UP_GAME_COIN: function() {
this.getViewComponent().updateCoinView();
},
completeGame: function() {
cc.find("Canvas/globalMask").active = !1;
this.getData().getGameMode() === sc.GameConst.GAME_MODE.NORMAL ? this.completeNormal() : this.completeChallenged();
},
completeNormal: function() {
this.getData().completeGameEvent();
cc.find("Canvas/normalOverView").getComponent("NormalOverView").showView();
},
completeChallenged: function() {
this.getData().setGameState(sc.GameConst.GAME_STATE.OVER);
cc.find("Canvas/challengeSuccess").getComponent("ChallengeSuccess").showView();
},
getData: function() {
return this.data;
},
enterGameScene: function() {
this.data = this.getFacade().retrieveProxy(sc.GameConst.GameProxy);
this.getData().enterGameScene();
this.getData().setGameState(sc.GameConst.GAME_STATE.RUN);
},
getMapScript: function() {
return this.getViewComponent().mapNode.getComponent("Map");
}
});
cc._RF.pop();
}, {
BaseMediator: "BaseMediator"
} ],
GameManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "12c0aC2eENEmpL4mh2YWQvO", "GameManager");
var i = e("BaseView"), s = e("ToastUtil");
cc.Class({
extends: i,
properties: {
uiTopNormal: cc.Node,
uiTopChallenged: cc.Node,
uiDownNormal: cc.Node,
uiDownChallenged: cc.Node,
mapNode: cc.Node,
coinLabel: cc.Label,
noCoinToast: cc.Node,
noAdsToast: cc.Node
},
onLoad: function() {
this.registerMediator();
this.getMediator().enterGameScene();
var e = this.getMediator().getData().getGameMode() === sc.GameConst.GAME_MODE.NORMAL;
this.uiTopNormal.active = e;
this.uiTopChallenged.active = !e;
this.uiDownNormal.active = e;
this.uiDownChallenged.active = !e;
},
start: function() {
this.updateCoinView();
},
onDestroy: function() {
this.removeMediator();
},
onClickExit: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.gameClickBack();
cc.director.loadScene("level");
}
},
onClickExitChallenge: function(e) {
if (!(0 < e.getID())) {
this.getMediator().getData().markGameChallenge();
cc.director.loadScene("title");
}
},
updateCoinView: function() {
this.coinLabel.string = this.getMediator().getData().getGameCoin().toString();
},
onClickReset: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.gameClickReset();
this.mapNode.getComponent("Map").onResetEvent();
}
},
onClickAds: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.gameClickAds();
sc.PushModule.doRequestReward(function(e) {
e ? sc.PushModule.doOpenReward(function(e, t) {
if (e && 0 < t) {
var n = cc.find("Canvas/coinGetView").getComponent("CoinGetView");
n.setCoinNumber(20);
n.showView();
}
}, this) : s.makeNode(cc.instantiate(this.noAdsToast));
}, this);
}
},
onClickPrompt: function(e) {
if (!(0 < e.getID())) {
var t = this.getMediator().getData();
if (t.needGamePrompt()) {
var n = sc.GameConst.Configure.GAME_PROMPT_COIN_COST;
if (t.getGameCoin() < n) {
sc.GameSound.gameNoCoin();
s.makeNode(cc.instantiate(this.noCoinToast));
return;
}
t.costGameCoin(n);
var i = t.getCurrentGameLevelInfo().path.length, o = t.getGamePromptIndex(), a = o + 4;
i <= a && (a = i - 1);
this.mapNode.getComponent("Map").promptAnswer(t.getCurrentGameLevelInfo().path, o, a);
t.setGamePromptIndex(a + 1);
sc.GameSound.gamePromptFill();
}
}
}
});
cc._RF.pop();
}, {
BaseView: "BaseView",
ToastUtil: "ToastUtil"
} ],
GameMultiFinger: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c1eabVZnK1DWbR52BLLtReS", "GameMultiFinger");
var i = cc.Class({
extends: cc.Object,
properties: {
fns: null
},
ctor: function() {
this.fns = {};
},
subscribe: function(e, t, n) {
this.fns[e] || (this.fns[e] = []);
var i = {
callback: t,
target: n = n || this
};
this.fns[e].push(i);
return i;
},
unsubscribe: function(e, t, n) {
var i = this.fns[e];
i && (this.fns[e] = i.filter(function(e) {
return e.callback !== t || e.target !== n;
}));
},
publish: function(e, t) {
var n = this.fns[e];
n && n.forEach(function(e) {
e.callback.call(e.target, t);
});
}
});
cc.Class({
extends: cc.Component,
properties: {},
statics: {},
onLoad: function() {
this.interdiction = !1;
this.touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: this.touchStartHandler.bind(this),
onTouchMoved: this.touchMoveHandler.bind(this),
onTouchEnded: this.touchEndHandler.bind(this),
onTouchCancelled: this.touchEndHandler.bind(this)
});
cc.eventManager.addListener(this.touchListener, this.node);
this.message = new i();
},
onDestroy: function() {
cc.eventManager.removeListeners(this.touchListener, this.node);
},
touchStartHandler: function(e) {
this.getMessageCenter().publish(cc.Node.EventType.TOUCH_START, e);
return !!this.interdiction || 0 < e.getID();
},
touchMoveHandler: function(e) {
this.getMessageCenter().publish(cc.Node.EventType.TOUCH_MOVE, e);
return !!this.interdiction || 0 < e.getID();
},
touchEndHandler: function(e) {
this.getMessageCenter().publish(cc.Node.EventType.TOUCH_END, e);
},
setInterdiction: function(e) {
this.interdiction = e;
},
getInterdiction: function() {
return this.interdiction;
},
getMessageCenter: function() {
return this.message;
}
});
cc._RF.pop();
}, {} ],
GamePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "006ee/t2cxKhL1EUz2rSKgo", "GamePanel");
cc.Class({
extends: e("BaseView"),
properties: {},
initPanel: function() {
this.panelViewScript = this.node.addComponent("PanelView");
this.panelViewScript.hideImmediate();
},
getPanel: function() {
return this.panelViewScript;
},
showView: function(e, t) {
this.onBeforeShow();
this.getPanel().showView(function() {
this.onLateShow();
e && (t ? e.call(t) : e());
}, this);
},
hideView: function(e, t) {
this.getPanel().hideView(e, t);
},
onBeforeShow: function() {},
onLateShow: function() {}
});
cc._RF.pop();
}, {
BaseView: "BaseView"
} ],
GameProxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c32afXq3EtNRpe19iudk6SG", "GameProxy");
var i = e("Proxy"), o = (e("GameConst"), "todayRewardTime"), a = "gradeProcess", s = "gameCoin", c = "challengeRecordTime", r = "challengeRewardCount", u = "challengeLevel";
cc.Class({
extends: e("CCProxy"),
properties: {
_gameCoin: 0,
_gameTodayRewardTime: !1,
_gameGradeProcessArray: null,
_gameCurrentGrade: -1,
_gameCurrentLevel: -1,
_gameMode: null,
_gameState: null,
_gameLevelInfo: null,
_gamePromptIndex: -1,
_gameChallengeRecordTime: 0,
_gameChallengeCount: 0,
_gameChallengeGameTime: 0,
_challengeLevel: 0
},
onRegister: function() {
this._super();
this.setData(i.getProxy("appdata"));
this._gameTodayRewardTime = this.getData().getNumber(o);
this._gameCoin = this.getData().getNumber(s);
this._gameChallengeRecordTime = this.getData().getNumber(c);
this._gameChallengeCount = this.getData().getNumber(r);
this._challengeLevel = this.getData().getNumber(u);
this._gameGradeProcessArray = new Array(sc.GameConst.GRADE_MAX);
for (var e = 0; e < sc.GameConst.GRADE_MAX; ++e) this._gameGradeProcessArray[e] = this.getData().getNumber(a + e);
},
isGameTodayReward: function() {
var e = new Date(this._gameTodayRewardTime), t = new Date();
return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
},
markTodayReward: function() {
this._gameTodayRewardTime = Date.now();
this.getData().setNumber(o, this._gameTodayRewardTime);
},
getGameCoin: function() {
return this._gameCoin;
},
setGameCoin: function(e) {
this._gameCoin = e;
this._gameCoin < 0 && (this._gameCoin = 0);
this.getData().setNumber(s, this._gameCoin);
this.getFacade().sendNotification(sc.GameConst.UP_GAME_COIN);
},
addGameCoin: function(e) {
this.setGameCoin(this.getGameCoin() + Math.abs(e));
},
costGameCoin: function(e) {
this.setGameCoin(this.getGameCoin() - Math.abs(e));
},
getGradeProcess: function(e) {
return e < 0 || e >= this._gameGradeProcessArray.length ? 0 : this._gameGradeProcessArray[e];
},
setGradeProcess: function(e, t) {
if (0 <= e && e < this._gameGradeProcessArray.length) {
t > sc.GameConst.Configure.GRADE_MAX_LEVEL[e] && (t = sc.GameConst.Configure.GRADE_MAX_LEVEL[e]);
this._gameGradeProcessArray[e] = t;
this.getData().setNumber(a + e, t);
}
},
isLastGradeAndLevel: function(e, t) {
return e === sc.GameConst.GRADE_MAX - 1 && t === sc.GameConst.Configure.GRADE_MAX_LEVEL[e] - 1;
},
isAlreadyComplete: function(e, t) {
return !(0 <= e && e < this._gameGradeProcessArray.length) || t < this._gameGradeProcessArray[e];
},
completeGradeAndLevel: function(e, t) {
this.isAlreadyComplete(e, t) || this.setGradeProcess(e, t + 1);
},
nextGameLevel: function() {
var e = this.getCurrentGrade(), t = this.getCurrentLevel() + 1;
if (t === sc.GameConst.Configure.GRADE_MAX_LEVEL[e]) {
e++;
t = 0;
}
e === sc.GameConst.GRADE_MAX && (e = 0);
this.setCurrentGrade(e);
this.setCurrentLevel(t);
},
getCurrentGrade: function() {
return this._gameCurrentGrade;
},
getCurrentLevel: function() {
return this._gameCurrentLevel;
},
setCurrentGrade: function(e) {
this._gameCurrentGrade = e;
},
setCurrentLevel: function(e) {
this._gameCurrentLevel = e;
},
setGameMode: function(e) {
this._gameMode = e;
},
getGameMode: function() {
return this._gameMode;
},
setGameState: function(e) {
this._gameState = e;
},
getGameState: function() {
return this._gameState;
},
enterGameScene: function() {
this.setGameState(sc.GameConst.BEGIN);
this._gameLevelInfo = this.getGameMode() === sc.GameConst.GAME_MODE.NORMAL ? this._initLevelInfo() : this._challengeLevelInfo();
this._gamePromptIndex = 1;
this.setChallengeGameTime(sc.GameConst.Configure.CHALLENGE_GAME_TIME);
},
completeGameEvent: function() {
var e = this.getCurrentGrade(), t = this.getCurrentLevel();
this.completeGradeAndLevel(e, t);
},
getCurrentGameLevelInfo: function() {
return this._gameLevelInfo;
},
_initLevelInfo: function() {
for (var e = sc.GameConst.GameLevelInfo, t = this.getCurrentGrade(), n = this.getCurrentLevel(), i = 0, o = 0; o < t; ++o) i += sc.GameConst.Configure.GRADE_MAX_LEVEL[o];
var a = i + n;
a < 0 && (a = 0);
a > e.length - 1 && (a = e.length - 1);
var s = e[a];
return sc.GameConst.convertLevelInfo(s);
},
_challengeLevelInfo: function() {
var e = sc.GameConst.challengeLevels[this._challengeLevel], t = sc.GameConst.GameLevelInfo, n = 0 <= e && e < t.length ? t[e] : t[t.length - 1];
this.insertChallengedLevel();
return sc.GameConst.convertLevelInfo(n);
},
getGamePromptIndex: function() {
return this._gamePromptIndex;
},
setGamePromptIndex: function(e) {
this._gamePromptIndex = e;
},
needGamePrompt: function() {
return this.getGamePromptIndex() < this.getCurrentGameLevelInfo().path.length;
},
getGameChallengeRecordTime: function() {
return this._gameChallengeRecordTime;
},
markGameChallenge: function() {
this._gameChallengeRecordTime = Date.now();
this.getData().setNumber(c, this._gameChallengeRecordTime);
},
clearChallenge: function() {
this._gameChallengeRecordTime = 0;
this.getData().setNumber(c, 0);
},
completeOnceChallenge: function(e) {
this._gameChallengeCount += e;
this._gameChallengeCount < 0 && (this._gameChallengeCount = 0);
this.getData().setNumber(r, this._gameChallengeCount);
},
getChallengedCount: function() {
return this._gameChallengeCount;
},
insertChallengedLevel: function() {
this._challengeLevel++;
var e = sc.GameConst.challengeLevels;
this._challengeLevel >= e.length && (this._challengeLevel = 0);
this.getData().setNumber(u, this._challengeLevel);
},
setChallengeGameTime: function(e) {
this._gameChallengeGameTime = e;
},
costChallengeGameTime: function(e) {
this._gameChallengeGameTime;
this._gameChallengeGameTime -= e;
this._gameChallengeGameTime < 0 && (this._gameChallengeGameTime = 0);
},
getChallengeGameTime: function() {
return this._gameChallengeGameTime;
}
});
cc._RF.pop();
}, {
CCProxy: "CCProxy",
GameConst: "GameConst",
Proxy: "Proxy"
} ],
GameQuitOnButton: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "508483IrRRLv51/ZMJoLOWL", "GameQuitOnButton");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = this.node.getComponent(cc.Button);
if (e) {
e.clickEvents || (e.clickEvents = []);
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = cc.js.getClassName(this);
t.handler = "OnQuitGame";
t.customEventData = "game-quit";
e.clickEvents.push(t);
}
},
OnQuitGame: function(e) {
t("ApplicationBehavior").QuitGame();
}
});
cc._RF.pop();
}, {
ApplicationBehavior: "ApplicationBehavior"
} ],
GameSound: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e79a3annthG0YrMROPncJl3", "GameSound");
t.exports = {
multipleSoundInFrame: {},
multipleSoundInterval: {},
cache: {},
globalVolume: 1,
play: function(e, t, n) {
t = !!t;
n = (n || (0 === n ? 0 : 1)) * this.globalVolume;
var i = this.cache[e];
if (!i) {
i = cc.url.raw("resources/sound/" + e + ".mp3");
this.cache[e] = i;
}
return cc.audioEngine.play(i, t, n);
},
stop: function(e) {
cc.audioEngine.stop(e);
},
setGlobalVolume: function(e) {
this.globalVolume = e;
},
playSoundNoRepeat: function(e, t) {
var n = this.multipleSoundInFrame[e];
if (!n) {
n = {
key: e,
frame: -1
};
this.multipleSoundInFrame[e] = n;
}
var i = cc.director.getTotalFrames();
if (i !== n.frame) {
n.frame = i;
t.call(this);
}
},
playSoundInterval: function(e, t, n) {
var i = this.multipleSoundInterval[e];
if (!i) {
i = {
key: e,
time: 0
};
this.multipleSoundInterval[e] = i;
}
var o = Date.now();
if (o - i.time > 1e3 * n) {
i.time = o;
t.call(this);
}
},
buttonClick: function() {
return this.play("On_001");
},
titleTodayRewardButton: function() {
return this.play("On_011");
},
titleTodayRewardViewOK: function() {
return this.play("On_001");
},
titleTodayRewardViewDouble: function() {
return this.play("On_001");
},
chReadmeViewEnter: function() {
return this.play("On_002");
},
chReadmeViewClose: function() {
return this.play("On_001");
},
chReadmeViewFree: function() {
return this.play("On_001");
},
chReadmeViewCost: function() {
return this.play("On_001");
},
chSuccessViewEnter: function() {
return this.play("On_003");
},
chSuccessViewOK: function() {
return this.play("On_001");
},
chSuccessViewDouble: function() {
return this.play("On_001");
},
chFailedViewEnter: function() {
return this.play("On_004");
},
chTimeFallDown: function() {
return this.play("On_005");
},
chFailedViewOK: function() {
return this.play("On_001");
},
menuClickBack: function() {
return this.play("On_001");
},
menuClickLevel: function() {
return this.play("On_001");
},
gameClickBack: function() {
return this.play("On_001");
},
gameSuccessEnter: function() {
return this.play("On_006");
},
gameSuccessNext: function() {
return this.play("On_001");
},
gameClickAds: function() {
return this.play("On_001");
},
gameNoCoin: function() {
return this.play("On_007");
},
gameClickReset: function() {
return this.play("On_008");
},
gameFill: function() {
return this.play("On_009");
},
gamePromptFill: function() {
return this.play("On_010");
}
};
cc._RF.pop();
}, {} ],
GameUtil: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "876a857DGtOBpP+K8ymnqNb", "GameUtil");
t.exports = {
isPC: function() {
return cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os === cc.sys.OS_OSX;
},
isMobilePlatform: function() {
return cc.sys.isNative && (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS);
},
deepCopyArray: function(e) {
for (var t = [], n = e.length, i = 0; i < n; i++) e[i] instanceof Array ? t[i] = this.deepCopyArray(e[i]) : t[i] = e[i];
return t;
}
};
cc._RF.pop();
}, {} ],
GradeTitleShow: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0fa5409unxIq6lWJ5q0GeCC", "GradeTitleShow");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onEnable: function() {
this.updateView();
},
updateView: function() {
var n = this;
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.node.children.forEach(function(e, t) {
e.active = t === n.data.getCurrentGrade();
});
}
});
cc._RF.pop();
}, {} ],
Iap: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bc8ffXf8GVGyZ+IQL155mT8", "Iap");
var i = "result", o = "cmdType", a = (cc.Class({
properties: {
productId: "",
type: "",
price: "",
title: "",
description: ""
}
}), cc.Class({
properties: {
orderId: "",
packageName: "",
productId: "",
purchaseTime: 0,
purchaseState: 0,
developerPayload: "",
token: "",
purchaseToken: ""
}
}), null), s = cc.Class({
extends: cc.Component,
statics: {
getInstance: function() {
if (null === a) {
var e = new cc.Node();
e.name = "iap";
cc.game.addPersistRootNode(e);
a = e.addComponent(s);
}
return a;
}
},
properties: {
appPublicKey: "",
debug: !1,
initSuccessFlag: !1,
querySuccessFlag: !1,
skus: [],
skuDetailMap: null,
queryComponentCallback: null,
buyComponentCallback: null,
recoveryComponentCallback: null
},
initIap: function(e, t, n) {
this.skuDetailMap = {};
this.appPublicKey = e;
this.skus = t;
this.debug = n;
this.getSkus().forEach(function(e) {
this.skuDetailMap[e] = {
sku: e,
purchase: null,
skuDetail: null
};
}, this);
cc.GameApplication.Init();
cc.GameApplication.JavascriptBridgeReceive.subscribe("msgPaymentCallback", this.msgPaymentCallback, this);
},
nativeInit: function() {
var e = {
cmdType: 0
};
e.appPublicKey = this.appPublicKey;
e.adCallback = "msgPaymentCallback";
cc.GameApplication.JavascriptBridgeNative.sendMessage("iap", e);
},
queryInventory: function() {
var e = {
cmdType: 1
};
e.skus = this.getSkus();
cc.GameApplication.JavascriptBridgeNative.sendMessage("iap", e);
},
recoveryPurchase: function(e) {
var t = this.isExistInventory(e), n = this.recoveryComponentCallback;
n && n({
result: t ? 0 : -1
});
},
buyProduct: function(e) {
var t = {
cmdType: 2
};
t.sku = e;
cc.GameApplication.JavascriptBridgeNative.sendMessage("iap", t);
},
msgPaymentCallback: function(e) {
0 !== e[o] ? 1 !== e[o] ? 2 === e[o] && this.onBuyResult(e) : this.onQueryInventory(e) : this.onInitPayment(e);
},
onInitPayment: function(e) {
if (0 !== e[i]) {
this.initSuccessFlag = !1;
this.debug && cc.log("init iap failed, %s %s", e[i], e.message);
} else {
this.debug && cc.log("init iap success");
this.initSuccessFlag = !0;
this.queryInventory();
}
},
onQueryInventory: function(e) {
if (0 !== e[i]) {
this.debug && cc.log("onQueryInventory iap failed, %s %s", e[i], e.message);
this.queryComponentCallback && this.queryComponentCallback({
result: e[i],
message: e.message
});
} else {
this.debug && cc.log("onQueryInventory iap success");
this.querySuccessFlag = !0;
e.purchases.forEach(function(e) {
var t = e.productId;
this.debug && cc.log("inventory purchase: %s", t);
var n = this.skuDetailMap[t];
n && (n.purchase = e);
}, this);
e.skuDetails.forEach(function(e) {
var t = e.productId;
this.debug && cc.log("inventory skudetail: %s", t);
var n = this.skuDetailMap[t];
n && (n.skuDetail = e);
}, this);
this.queryComponentCallback && this.queryComponentCallback({
result: 0
});
}
},
onBuyResult: function(e) {
if (0 !== e[i]) {
this.debug && cc.log("buy failed: %s", e[i]);
this.buyComponentCallback && this.buyComponentCallback(e);
} else {
this.debug && cc.log("buy success: %s", e.sku);
var t = e.sku, n = this.skuDetailMap[t];
n && (n.purchase = {
productId: t
});
this.buyComponentCallback && this.buyComponentCallback(e);
}
},
getSkus: function() {
return this.skus;
},
getSkuDetailPrice: function(e) {
var t = this.skuDetailMap[e];
return t && t.skuDetail ? t.skuDetail.price : "$1.00";
},
isInitSuccess: function() {
return this.initSuccessFlag;
},
isQuerySuccess: function() {
return this.querySuccessFlag;
},
isExistInventory: function(e) {
var t = this.skuDetailMap[e];
return !(!t || null === t.purchase);
},
setQueryComponentCallback: function(e, t) {
this.queryComponentCallback = e ? t ? e.bind(t) : e : null;
},
setRecoveryComponentCallback: function(e, t) {
this.recoveryComponentCallback = e ? t ? e.bind(t) : e : null;
},
setBuyComponentCallback: function(e, t) {
this.buyComponentCallback = e ? t ? e.bind(t) : e : null;
}
});
cc._RF.pop();
}, {} ],
InternalPush: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "09f6digDVRKTYIKNJFJNuGD", "InternalPush");
var s = e("md5"), i = e("Observer"), c = "WebMainFrame.json", o = null, a = cc.Class({
extends: cc.Component,
properties: {
localMainframe: {
default: null,
serializable: !1,
visible: !1
},
serverMainframe: {
default: null,
serializable: !1,
visible: !1
},
mainframe: {
default: null,
serializable: !1,
visible: !1
},
imageCacheMapObject: {
default: null,
serializable: !1,
visible: !1
},
imageCacheEvents: {
default: null,
serializable: !1,
visible: !1
},
landscapeOrPortrait: {
default: !0,
serializable: !1,
visible: !1
},
initializeOnly: !1
},
statics: {
getInstance: function() {
if (null === o) {
var e = new cc.Node();
e.name = "InternalPush";
cc.game.addPersistRootNode(e);
o = e.addComponent(a);
}
return o;
}
},
onLoad: function() {
this.initialize();
},
initialize: function() {
if (!this.initializeOnly) {
this.initializeOnly = !0;
this.normalizationDirectory();
this.mainframe = null;
this.imageCacheMapObject = {};
this.imageCacheEvents = new i();
this.loadCache();
}
},
loadCache: function() {
this.readLocationWebMainFrame();
this.readWebServerMainFrameFile("http://api.iwawakids.com/promotion/v0/moregame?lang=" + cc.sys.language, this.onReadWebServerMainFrameFile, this);
},
onReadWebServerMainFrameFile: function() {
this.mainframe = null !== this.serverMainframe ? this.serverMainframe : this.localMainframe;
null !== this.getMainFrame() ? this.readRecommendedApps(function() {
this.readEditorApps(function() {
this.readInterstitialApps(function() {
cc.log("图片载入完成: (不缓存插页推广)");
}, this);
}, this);
}, this) : cc.log("没有mainframe文件，不载入图片");
},
readLocationWebMainFrame: function() {
var e = this.normalizationFilePath(c);
if (this.getFileUtils().isFileExist(e)) try {
this.localMainframe = JSON.parse(this.getFileUtils().getStringFromFile(e));
cc.log("读取本地的 %s 成功", c);
} catch (e) {
cc.log("读取本地的 %s 失败: %s", c, e.message);
} else cc.log("本地 not find file:%s", c);
},
readWebServerMainFrameFile: function(i, o, a) {
this.GetWebServer(i, function(e) {
if (null !== e) try {
var t = e.trim("ï»¿"), n = JSON.parse(t);
if (null !== n.recommendedApps && null !== n.editorApps && null !== n.interstitialApps) {
this.serverMainframe = n;
this.getFileUtils().writeStringToFile(t, this.normalizationFilePath(c));
cc.log("更新到本地的Mainframe");
} else cc.log("readWebServerMainFrameFile Web读取不是有效的Mainframe文件");
} catch (e) {
cc.log("readWebServerMainFrameFile 字符串转js失败: %s", e.message);
} else cc.log("readWebServerMainFrameFile读取WEB失败: %s", i);
a ? o.call(a) : o();
}, this);
},
GetWebServer: function(e, t, n, i, o) {
var a = n ? t.bind(n) : t, s = new XMLHttpRequest();
i && (s.responseType = i);
s.timeout = o || 1e4;
s.onreadystatechange = function() {
4 === s.readyState && (200 === s.status ? a(s.response) : a(null, cc.formatStr("xhr.readyState:%s, xhr.status:%s", s.readyState, s.status)));
}.bind(this);
s.onerror = function() {
a(null, "onerror");
a = function() {};
};
s.ontimeout = function() {
a(null, "ontimeout");
a = function() {};
};
s.open("GET", e, !0);
s.send();
},
getFileUtils: function() {
return jsb.fileUtils;
},
readRecommendedApps: function(e, t) {
if (null !== this.getMainFrame() && this.getMainFrame().recommendedApps) {
var n = [];
this.getMainFrame().recommendedApps.apps.forEach(function(e) {
var t = e.iconUrl;
t && n.push(t);
}, this);
0 !== n.length ? this.loadAllTextures(n, e, t) : t ? e.call(t) : e();
} else t ? e.call(t) : e();
},
readEditorApps: function(e, t) {
if (null !== this.getMainFrame() && this.getMainFrame().editorApps) {
var n = [];
this.getMainFrame().editorApps.apps.forEach(function(e) {
var t = e.iconUrl;
t && n.push(t);
}, this);
0 !== n.length ? this.loadAllTextures(n, e, t) : t ? e.call(t) : e();
} else t ? e.call(t) : e();
},
readInterstitialApps: function(e, t) {
if (null !== this.getMainFrame() && this.getMainFrame().interstitialApps) {
var n = [];
this.getMainFrame().interstitialApps.apps.forEach(function(e) {
this.landscapeOrPortrait ? e.thumbnailUrl && n.push(e.thumbnailUrl) : e.portraitThumbnailUrl && n.push(e.portraitThumbnailUrl);
}, this);
0 !== n.length ? this.downloadAllTextures(n, e, t) : t ? e.call(t) : e();
} else t ? e.call(t) : e();
},
loadAllTextures: function(a, s, c) {
var r = this;
(function n(i) {
var o = a[i];
r.loadTextureFromLocalOrWeb(o, function(e, t) {
e && r.setKeyValueImageCacheMapObject(o, e, t);
++i !== a.length ? n(i) : c ? s.call(c) : s();
}, this);
})(0);
},
downloadAllTextures: function(o, a, s) {
var c = this;
(function e(t) {
if (t >= o.length) s ? a.call(s) : a(); else {
var n = o[t], i = c.convertToLocalPath(n);
c.existLocalTextureFile(i) ? e(++t) : c.downloadFromWebToLocal(n, function() {
e(++t);
}, this);
}
})(0);
},
loadTextureFromLocalOrWeb: function(t, n, i) {
var o = s.hex_md5(t), a = this.convertToLocalPath(t);
this.readTextureFromLocalPath(a, function(e) {
null !== e ? i ? n.call(i, o, e) : n(o, e) : this.downloadFromWebToLocal(t, function(e) {
if (null !== e) this.readTextureFromLocalPath(a, function(e) {
i ? n.call(i, o, e) : n(o, e);
}, this); else {
cc.log("网络读取失败: %s", t);
i ? n.call(i, o, null) : n(o, null);
}
}, this);
}, this);
},
readTextureFromLocal: function(e, t, n) {
this.readTextureFromLocalPath(this.convertToLocalPath(e), t, n);
},
readTextureFromLocalPath: function(e, t, n) {
this.existLocalTextureFile(e) ? this.loadLocationTexture(e, t, n) : n ? t.call(n, null) : t(null);
},
existLocalTextureFile: function(e) {
return this.getFileUtils().isFileExist(e);
},
downloadFromWebToLocal: function(n, i, o) {
this.GetWebServer(n, function(e) {
if (null !== e) {
var t = this.convertToLocalPath(n);
this.saveTextureFileToLocation(e, t);
o ? i.call(o, t) : i(t);
} else {
cc.log("网络读取失败: %s", n);
o ? i.call(o, null) : i(null);
}
}, this, "arraybuffer");
},
convertToLocalPath: function(e) {
var t = this.getFileExtensionName(e), n = s.hex_md5(e);
return this.normalizationFilePath(n + t);
},
getFileExtensionName: function(e) {
var t = e.lastIndexOf(".");
return e.substring(t, e.length);
},
loadLocationTexture: function(i, o, a) {
cc.loader.load(i, function(e, t) {
if (e) cc.log("err: %s %s", i, e.message); else if (t instanceof cc.Texture2D) {
var n = new cc.SpriteFrame(t);
a ? o.call(a, n) : o(n);
return;
}
a ? o.call(a, null) : o(null);
});
},
saveTextureFileToLocation: function(e, t) {
"undefined" != typeof e ? this.getFileUtils().writeDataToFile(new Uint8Array(e), t) ? cc.log("Remote write local file succeed: %s", t) : cc.log("Remote write local file failed: %s", t) : cc.log("Remote download file failed: %s", t);
},
normalizationFilePath: function(e) {
return this.getFileUtils().getWritablePath() + "image/" + e;
},
normalizationDirectory: function() {
var e = this.getFileUtils().getWritablePath() + "image";
this.getFileUtils().isDirectoryExist(e) || this.getFileUtils().createDirectory(e);
},
getMainFrame: function() {
return this.mainframe;
},
getSpriteFrame: function(e) {
var t = s.hex_md5(e), n = this.imageCacheMapObject[t];
return n || null;
},
setKeyValueImageCacheMapObject: function(e, t, n) {
(this.imageCacheMapObject[t] = n) && this.imageCacheEvents && this.imageCacheEvents.publish("textureUpdate", {
textureUrl: e,
textureKey: t,
spriteFrame: n
});
},
addImageCacheEvent: function(e, t) {
this.imageCacheEvents.subscribe("textureUpdate", e, t);
},
removeImageCacheEvent: function(e, t) {
this.imageCacheEvents.unsubscribe("textureUpdate", e, t);
},
nativeDownload: function(e, t) {
if (e) {
var n = {
cmdType: "download",
packageName: e,
bundleID: t
};
cc.GameApplication.JavascriptBridgeNative.sendMessage("market", n);
}
},
setLandscapeOrPortrait: function(e) {
this.landscapeOrPortrait = e;
},
getInterstitialApps: function() {
var e = this.getMainFrame();
if (null === e) return null;
var t = e.interstitialApps;
if (!t) return null;
var n = t.apps;
return n ? 0 === n.length ? null : n : null;
}
});
cc._RF.pop();
}, {
Observer: "Observer",
md5: "md5"
} ],
InternalWebMainFrame: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6d4b8+vYMJDSbBMnEOGt3jk", "InternalWebMainFrame");
cc._RF.pop();
}, {} ],
JavascriptBridgeNative: [ function(o, e, t) {
"use strict";
cc._RF.push(e, "b528ewF7m9MwoUnEVgUeEoR", "JavascriptBridgeNative");
var n = o("Platform"), a = cc.Class({
extends: cc.Object,
properties: {
isdebug: !1
},
isDebugEnable: function() {
return this.isdebug;
},
setDebugEnable: function(e) {
this.isdebug = e;
},
sendMessage: function(e, t) {}
}), i = cc.Class({
extends: a,
properties: {
crossClassName: null,
crossMethodName: null
},
setCrossClassName: function(e) {
this.crossClassName = e;
},
setCrossMethodName: function(e) {
this.crossMethodName = e;
},
getCrossClassName: function() {
return this.crossClassName;
},
getCrossMethodName: function() {
return this.crossMethodName;
},
getParamList: function() {
return n.AndroidParam.ListParams([ n.AndroidParam.String, n.AndroidParam.String ], n.AndroidParam.String);
},
sendProtocolInfo: function(e, t) {
return n.Reflection(this.getCrossClassName(), this.getCrossMethodName(), this.getParamList(), e, t);
},
sendMessage: function(e, t) {
var n = JSON.stringify(t);
this.isDebugEnable() && cc.log("< %s > %s", e, n);
var i = this.sendProtocolInfo(e, n);
this.isDebugEnable() && cc.log("( %s ) %s", e, i);
return JSON.parse(i);
}
}), s = cc.Class({
extends: cc.Object,
properties: {
bridge: null
},
statics: {
single: null,
getInstance: function() {
null !== this.single && this.single || (this.single = new this());
return this.single;
}
},
ctor: function() {
cc.log("JavascriptBridgeNative ctor");
this.init();
},
init: function() {
var e;
e = cc.sys.isNative ? n.isAndroid() ? this._initNativeAndroid() : n.isIOS() ? this._initNativeIOS() : this._initNativeWindows() : this._initNativeWindows();
this.bridge = e;
},
_initNativeAndroid: function() {
var e = new i();
e.setCrossClassName("com/sencatech/bridging/Bridging");
e.setCrossMethodName("Cocos2dxBridge");
return e;
},
_initNativeIOS: function() {
var e = new i();
e.setCrossClassName("Bridging");
e.setCrossMethodName("Cocos2dxBridge");
return e;
},
_initNativeWindows: function() {
var e, t = o("WinSimulation"), n = t.getTypeClass();
t.extends = a;
var i = cc.Class(t);
if (null !== n) {
n.extends = i;
e = new (cc.Class(n))();
} else e = new i();
return e;
},
getBridge: function() {
return this.bridge;
},
sendMessage: function(e, t) {
return this.getBridge().sendMessage(e, t);
},
setDebugEnable: function(e) {
this.getBridge().setDebugEnable(e);
},
dispose: function() {
this.bridge = null;
s.single = null;
}
});
e.exports = s;
cc._RF.pop();
}, {
Platform: "Platform",
WinSimulation: "WinSimulation"
} ],
JavascriptBridgeReceive: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3bc23P+NSlDr7/tPq4+95MW", "JavascriptBridgeReceive");
var a = cc.Class({
extends: cc.Object,
properties: {
EventName: null,
Callback: null,
Target: null
},
ctor: function() {
this.EventName = arguments[0];
this.Callback = arguments[1];
this.Target = arguments[2];
}
}), i = cc.Class({
extend: cc.Object,
properties: {
fns: null
},
statics: {
single: null,
getInstance: function() {
null !== this.single && this.single || (this.single = new this());
return this.single;
}
},
ctor: function() {
cc.log("JavascriptBridgeReceive ctor");
this.init();
},
subscribe: function(e, t, n) {
n = n || this;
var i = this.retrieve(e, t, n);
if (null !== i) return i;
var o = new a(e, t, n);
this.fns.push(o);
return o;
},
unsubscribe: function(t, n, i) {
if (1 === arguments.length) {
var o = t;
this.fns = this.fns.filter(function(e) {
if (e !== o) return !0;
});
return !1;
}
this.fns = this.fns.filter(function(e) {
return e.EventName != t || e.Callback !== n || e.Target !== i;
});
},
broadcast: function(e, t) {
for (var n = cc.js.array.copy(this.fns), i = 0, o = n.length; i < o; ++i) {
var a = n[i];
a && a.EventName == e && a.Callback.call(a.Target, t);
}
},
retrieve: function(e, t, n) {
n = n || this;
for (var i = 0, o = this.fns.length; i < o; ++i) {
var a = this.fns[i];
if (a.EventName == e && a.Callback === t && a.Target === n) return a;
}
return null;
},
init: function() {
this.fns = [];
},
dispose: function() {}
});
t.exports = i;
cc._RF.pop();
}, {} ],
KeyEventComponent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5890e9rN0dO4ZBqZkKO5GV9", "KeyEventComponent");
cc.Class({
extends: cc.Component,
properties: {},
onEnable: function() {
var n = this;
for (var i in cc.SystemEvent.EventType) cc.SystemEvent.EventType.hasOwnProperty(i) && function() {
var t = cc.SystemEvent.EventType[i], e = "ON_" + i;
n[e] || (n[e] = function(e) {
this.node.emit(t, e);
});
cc.systemEvent.on(t, n[e], n);
}();
},
onDisable: function() {
for (var e in cc.SystemEvent.EventType) if (cc.SystemEvent.EventType.hasOwnProperty(e)) {
var t = "ON_" + e, n = cc.SystemEvent.EventType[e];
cc.systemEvent.off(n, this[t], this);
}
}
});
cc._RF.pop();
}, {} ],
LangauageSprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4d706d6oTlOx4Ahq5+Ly1x8", "LangauageSprite");
var i = null, o = null;
cc.Class({
extends: cc.Component,
editor: {
disallowMultiple: !1,
menu: "i18n/OSD Sprite"
},
properties: {
en: cc.SpriteFrame,
zh: cc.SpriteFrame
},
onLoad: function() {
i = e("SpriteFrameSet");
o = e("LocalizedSprite");
this.initConfigLanguage();
},
initConfigLanguage: function() {
if (i && o) {
var e = [];
this.pushLanguage(e, "en", this.en);
this.pushLanguage(e, "zh", this.zh);
var t = this.node.addComponent(o);
t.spriteFrameSet = e;
t.fetchRender();
}
},
buildLanguageConfig: function(e, t) {
var n = new i();
n.language = e;
n.spriteFrame = t;
return n;
},
pushLanguage: function(e, t, n) {
n && e.push(this.buildLanguageConfig(t, n));
}
});
cc._RF.pop();
}, {
LocalizedSprite: "LocalizedSprite",
SpriteFrameSet: "SpriteFrameSet"
} ],
LanguageData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "77a4er+H9pFT7usjxRPo3WR", "LanguageData");
var i = e("polyglot.min"), o = null;
window.i18n || (window.i18n = {
languages: {},
curLang: ""
});
window.i18n.curLang = cc.sys.language;
s(a(window.i18n.curLang) || {});
function a(e) {
return window.i18n.languages[e];
}
function s(e) {
e && (o ? o.replace(e) : o = new i({
phrases: e,
allowMissing: !0
}));
}
t.exports = {
init: function(e) {
if (e !== window.i18n.curLang) {
var t = a(e) || {};
window.i18n.curLang = e;
s(t);
}
},
t: function(e, t) {
if (o) return o.t(e, t);
},
inst: o,
updateSceneRenderers: function() {
for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
var i = e[n].getComponentsInChildren("LocalizedLabel");
Array.prototype.push.apply(t, i);
}
for (var o = 0; o < t.length; ++o) {
t[o].updateLabel();
}
for (var a = [], s = 0; s < e.length; ++s) {
var c = e[s].getComponentsInChildren("LocalizedSprite");
Array.prototype.push.apply(a, c);
}
for (var r = 0; r < a.length; ++r) {
a[r].updateSprite(window.i18n.curLang);
}
}
};
cc._RF.pop();
}, {
"polyglot.min": "polyglot.min"
} ],
LanguageShowFrame: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d277d9pki1HhaydmGsXejIy", "LanguageShowFrame");
var i = cc.Class({
name: "LanguageShowFrame.LanguageConfig",
properties: {
language: "",
textureFrame: cc.SpriteFrame
}
});
cc.Class({
extends: cc.Component,
properties: {
shows: [ i ]
},
onLoad: function() {},
start: function() {
this.i18nLanguage();
},
i18nLanguage: function() {
for (var e = cc.sys.LANGUAGE_ENGLISH, t = null, n = 0, i = this.shows.length; n < i; ++n) {
var o = this.shows[n];
if (o.language === cc.sys.language) {
e = cc.sys.language;
t = o.textureFrame;
break;
}
}
if (null === t) for (var a = 0, s = this.shows.length; a < s; ++a) {
var c = this.shows[a];
if (c.language === e) {
t = c.textureFrame;
break;
}
}
var r = this.node.getComponent(cc.Sprite);
r && (r.spriteFrame = t);
}
});
cc._RF.pop();
}, {} ],
LanguageShowNode: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6bff4K9vrZEL4oVj8GC5MWC", "LanguageShowNode");
var i = cc.Class({
name: "LanguageShowNode.LanguageConfig",
properties: {
language: "",
showNodes: [ cc.Node ]
}
});
cc.Class({
extends: cc.Component,
properties: {
showNodes: [ i ]
},
onLoad: function() {},
start: function() {
this.i18nLanguage();
},
i18nLanguage: function() {
for (var e = cc.sys.LANGUAGE_ENGLISH, t = 0, n = this.showNodes.length; t < n; ++t) {
if (this.showNodes[t].language === cc.sys.language) {
e = cc.sys.language;
break;
}
}
for (var i = 0, o = this.showNodes.length; i < o; ++i) {
var a = this.showNodes[i];
a.language === e ? a.showNodes.forEach(function(e) {
e.active = !0;
}) : a.showNodes.forEach(function(e) {
e.active = !1;
});
}
}
});
cc._RF.pop();
}, {} ],
LayoutManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "31c1ch6h7pL6KJUxcqpKWn9", "LayoutManager");
var o = "OneLineLayoutEditor.json", i = e("GameLevelInfo"), g = e("GameUtil");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var s = this, e = i;
e.forEach(function(e, t) {
var n = s._findPathForLevelInfo(e), i = n.length;
1 < i && cc.log("多余一条路径:%s", t);
0 === i && cc.log("没有路径:%s", t);
if (0 < i) {
var o = n[0];
e.path = [];
for (var a = 0; a < o.length; ++a) e.path.push([ o[a].x, o[a].y ]);
}
});
var t = JSON.stringify(e), n = cc.formatStr("module.exports=%s;", t);
cc.log(n);
},
onClickExit: function() {
cc.director.loadScene("title");
},
_findPathForLevelInfo: function(e) {
var t = sc.GameConst.convertLevelInfo(e), c = g.deepCopyArray(t.map), r = t.maxV, u = t.maxH, n = [], i = function(e) {
for (var t = 0; t < r; ++t) for (var n = 0; n < u; ++n) if (2 === e[t][n]) return {
x: t,
y: n
};
return null;
}(c);
if (null !== i) {
var l = function() {
for (var e = new Array(r), t = 0; t < r; ++t) e[t] = new Array(u);
return e;
}(), h = [ -1, 1, 0, 0 ], d = [ 0, 0, -1, 1 ], p = function(e) {
for (var t = 0, n = 0; n < r; ++n) for (var i = 0; i < u; ++i) 0 < e[n][i] && t++;
return t;
}(c);
n.push(i);
l[i.x][i.y] = 1;
var f = null, m = [];
(f = function(e) {
if (0 !== e.length) {
for (var t, n, i = e[e.length - 1], o = 0; o < 4; ++o) {
var a = i.x + h[o], s = i.y + d[o];
if ((n = s, 0 <= (t = a) && t < r && 0 <= n && n < u) && 1 !== l[a][s] && 0 !== c[a][s]) {
l[a][s] = 1;
e.push({
x: a,
y: s
});
f(e);
}
}
if (e.length === p) {
cc.log("找到一条路径");
m.push(g.deepCopyArray(e));
}
l[i.x][i.y] = 0;
e.pop();
} else cc.log("没有找到路径");
})(n);
return m;
}
cc.log("没有找到起点");
},
readLayoutEditorDataFromFile: function() {
try {
var e = jsb.fileUtils.getStringFromFile(this.normalizationPath(o));
return e ? JSON.parse(e) : [];
} catch (e) {
this.printMessage(e.message);
return [];
}
},
writeLayoutEditorDataToFile: function(e) {
try {
var t = this.normalizationPath(o), n = this.normalizationPath("GameLevelInfo.js"), i = JSON.stringify(e);
jsb.fileUtils.writeStringToFile(i, t);
jsb.fileUtils.writeStringToFile(cc.formatStr("module.exports=%s;", i), n);
} catch (e) {
this.printMessage(e.message);
}
},
normalizationPath: function(e) {
return cc.sys.os === cc.sys.OS_ANDROID ? "/sdcard/" + e : e;
},
printMessage: function() {
var e = cc.formatStr.apply(this, arguments);
cc.log(e);
}
});
cc._RF.pop();
}, {
GameLevelInfo: "GameLevelInfo",
GameUtil: "GameUtil"
} ],
LevelItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3ce4agBJcxJC7mQ/I1i8AEH", "LevelItem");
var i = {
default: null,
visible: !1,
serializable: !1
};
cc.Class({
extends: cc.Component,
properties: {
normalFrame: cc.SpriteFrame,
buttonPressFrame: cc.SpriteFrame,
invalidFrame: cc.SpriteFrame,
levelIndex: i,
selfTouchActive: i
},
onLoad: function() {},
onDestroy: function() {
if (this.selfTouchActive) {
this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
}
},
setSelfTouchActive: function(e) {
this.selfTouchActive = e;
if (this.selfTouchActive) {
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
} else this.getSprite().spriteFrame = this.invalidFrame;
},
getSprite: function() {
this.sprite || (this.sprite = this.node.getComponent(cc.Sprite));
return this.sprite;
},
setLevelIndex: function(e) {
this.levelIndex = e;
},
getLevelIndex: function() {
return this.levelIndex;
},
onTouchStart: function(e) {
0 < e.getID() || (this.getSprite().spriteFrame = this.buttonPressFrame);
},
onTouchMove: function(e) {
e.getID();
},
onTouchEnd: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.menuClickLevel();
this.getSprite().spriteFrame = this.normalFrame;
cc.log("select level:%s", this.getLevelIndex());
sc.Facade.sendNotification(sc.GameConst.ON_ENTER_GAME, {
level: this.getLevelIndex(),
mode: sc.GameConst.GAME_MODE.NORMAL
});
}
},
onTouchCancel: function(e) {
0 < e.getID() || (this.getSprite().spriteFrame = this.normalFrame);
}
});
cc._RF.pop();
}, {} ],
LevelManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6a9a0xBmetMnooyrVS3ug5d", "LevelManager");
cc.Class({
extends: cc.Component,
properties: {
buttonNodeMold: cc.Node,
starNodeMold: cc.Node,
numberLabelNodeMold: cc.Node
},
onLoad: function() {
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.updateLevelView();
},
onClickExit: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.menuClickBack();
cc.director.loadScene("title");
}
},
updateLevelView: function() {
for (var e = this.data.getCurrentGrade(), t = this.data.getGradeProcess(e), n = sc.GameConst.Configure.GRADE_MAX_LEVEL[e], i = this.buttonNodeMold.position.y, o = this.starNodeMold.position.y, a = this.numberLabelNodeMold.position.y, s = 0; s < n; ++s) {
var c = Math.floor(s / 5), r = Math.floor(s % 5), u = cc.instantiate(this.buttonNodeMold);
u.parent = this.buttonNodeMold.parent;
u.position = cc.p(120 * r - 240, i - 120 * c);
u.active = !0;
if (s <= t) {
var l = cc.instantiate(this.starNodeMold);
l.parent = this.starNodeMold.parent;
l.position = cc.p(120 * r - 240, o - 120 * c);
l.active = !0;
var h = cc.instantiate(this.numberLabelNodeMold);
h.parent = this.numberLabelNodeMold.parent;
h.position = cc.p(120 * r - 240, a - 120 * c);
h.active = !0;
var d = s + 1;
h.getComponent(cc.Label).string = 100 <= d ? d.toString() : 10 <= d ? "0" + d : "00" + d;
}
var p = u.getComponent("LevelItem");
p.setSelfTouchActive(s <= t);
p.setLevelIndex(s);
}
this.buttonNodeMold.parent.parent.height = 120 * (Math.floor(n / 5) - 1) + Math.abs(2 * i);
}
});
cc._RF.pop();
}, {} ],
LocalizationTextKey: [ function(n, e, t) {
"use strict";
cc._RF.push(e, "732f5XJfwFNfpkxK7DShLG9", "LocalizationTextKey");
var i = "PushLocalizedLabel";
cc.Class({
extends: cc.Component,
properties: {
textKey: {
default: "",
notify: function(e) {
this.updateLabel(this.textKey);
}
}
},
editor: {
executeInEditMode: !0,
requireComponent: i
},
onLoad: function() {
this.updateLabel(this.textKey);
},
updateLabel: function(e) {
if (n(i)) {
var t = this.node.getComponent(i);
t || (t = this.node.addComponent(i));
t && (t.dataID = e);
} else cc.error("no find LocalizedLabel");
}
});
cc._RF.pop();
}, {} ],
LocalizedLabel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "25d3aKcKABJD6bqtH2A+gkn", "LocalizedLabel");
var i = e("LanguageData");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
menu: "i18n/LocalizedLabel"
},
properties: {
dataID: {
get: function() {
return this._dataID;
},
set: function(e) {
if (this._dataID !== e) {
this._dataID = e;
this.updateLabel();
}
}
},
_dataID: ""
},
onLoad: function() {
0;
i.inst || i.init();
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Label);
if (e) {
this.label = e;
this.updateLabel();
} else ;
},
updateLabel: function() {
if (this.label) {
i.t(this.dataID) && (this.label.string = i.t(this.dataID));
} else cc.error("Failed to update localized label, label component is invalid!");
}
});
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ],
LocalizedSprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d1178+sA8lAJJ8Cak/5dXFx", "LocalizedSprite");
var i = e("SpriteFrameSet");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
menu: "i18n/LocalizedSprite"
},
properties: {
spriteFrameSet: {
default: [],
type: i
}
},
onLoad: function() {
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Sprite);
if (e) {
this.sprite = e;
this.updateSprite(window.i18n.curLang);
} else ;
},
getSpriteFrameByLang: function(e) {
for (var t = 0; t < this.spriteFrameSet.length; ++t) if (this.spriteFrameSet[t].language === e) return this.spriteFrameSet[t].spriteFrame;
},
updateSprite: function(e) {
if (this.sprite) {
var t = this.getSpriteFrameByLang(e);
!t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame);
t && (this.sprite.spriteFrame = t);
} else cc.error("Failed to update localized sprite, sprite component is invalid!");
}
});
cc._RF.pop();
}, {
SpriteFrameSet: "SpriteFrameSet"
} ],
LoginRewardView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7d691w/jAFKsoO3hEiTEr3s", "LoginRewardView");
var i = e("GamePanel"), o = e("ToastUtil");
cc.Class({
extends: i,
properties: {
noAdsToast: cc.Node,
rewardLabel: cc.Label,
giftNode: cc.Node,
showNode: cc.Node
},
onLoad: function() {
this.initPanel();
},
onClickGift: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.titleTodayRewardButton();
var t = sc.GameConst.Configure.TODAY_REWARD_MIN, n = sc.GameConst.Configure.TODAY_REWARD_MAX;
this.currentReward = t + Math.floor(99999 * cc.random0To1()) % (n - t + 1);
this.rewardLabel.string = "+" + this.currentReward;
this.giftNode.active = !1;
this.showNode.active = !0;
}
},
onClickOK: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.titleTodayRewardViewOK();
this.addReward(1);
this.getPanel().hideImmediate();
}
},
onClickDouble: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.titleTodayRewardViewDouble();
sc.PushModule.doRequestReward(function(e) {
e ? sc.PushModule.doOpenReward(function(e, t) {
var n = e && 0 < t ? 2 : 1;
this.addReward(n);
this.getPanel().hideImmediate();
}, this) : o.makeNode(cc.instantiate(this.noAdsToast));
}, this);
}
},
addReward: function(e) {
var t = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
t.markTodayReward();
t.addGameCoin(this.currentReward * e);
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel",
ToastUtil: "ToastUtil"
} ],
LoopSound: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3d3e18QMrdAPoAep4uYVVPX", "LoopSound");
var i = cc.Class({
extends: cc.Object,
properties: {
sleepSoundId: null,
_getAudioId: null
},
ctor: function() {
1 === arguments.length && this.init(arguments[0]);
},
init: function(e) {
this.sleepSoundId = null;
this._getAudioId = e;
return this;
},
playSound: function() {
if (null === this.sleepSoundId) {
this.sleepSoundId = this._getAudioId();
cc.audioEngine.setLoop(this.sleepSoundId, !0);
}
cc.audioEngine.getState(this.sleepSoundId) === cc.audioEngine.AudioState.PAUSED && cc.audioEngine.resume(this.sleepSoundId);
},
pauseSound: function() {
null !== this.sleepSoundId && cc.audioEngine.getState(this.sleepSoundId) === cc.audioEngine.AudioState.PLAYING && cc.audioEngine.pause(this.sleepSoundId);
},
stopSound: function() {
if (null !== this.sleepSoundId) {
cc.audioEngine.stop(this.sleepSoundId);
this.sleepSoundId = null;
}
},
getSoundId: function() {
return this.sleepSoundId;
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
Map: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0894aPLO4ZIPo79unI/d+N4", "Map");
var i = 110, o = e("ResPool"), a = e("Cell");
cc.Class({
extends: cc.Component,
properties: {
cameraNode: cc.Node,
touchRectNode: cc.Node,
backgroundMoldNode: cc.Node,
blockMoldNode: cc.Node,
blockLineMoldNode: cc.Node,
blockPromptMoldNode: cc.Node,
blockHitMoldNode: cc.Node
},
onLoad: function() {
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.backgroundParentNode = cc.find("background", this.node);
this.shadowParentNode = cc.find("shadow", this.node);
this.blockParentNode = cc.find("block", this.node);
this.lineParentNode = cc.find("line", this.node);
this.resParentNode = cc.find("res", this.node);
this.backgroundPool = new o(this.backgroundMoldNode, this.resParentNode);
this.blockPool = new o(this.blockMoldNode, this.resParentNode);
this.blockLinePool = new o(this.blockLineMoldNode, this.resParentNode);
this.blockPromptPool = new o(this.blockPromptMoldNode, this.resParentNode);
},
start: function() {
this.beforeRefresh();
this.initMap();
this.refreshBackground();
this.initBeginPosition();
this.initTouchPoint();
this.pointNode.parent.position = this.leftUpPosition;
},
beforeRefresh: function() {
var e = this.data.getCurrentGameLevelInfo(), t = e.maxH * i - 10, n = e.maxV * i - 10;
this.leftUpPosition = cc.p(.5 * -t, .5 * n);
this.leftUpLayoutOriginal = cc.pAdd(this.leftUpPosition, cc.p(50, -50));
this.maxV = e.maxV;
this.maxH = e.maxH;
this.touchRectNode.anchorX = 0;
this.touchRectNode.anchorY = 1;
this.touchRectNode.position = this.leftUpPosition;
this.touchRectNode.width = t;
this.touchRectNode.height = n;
this.fixCameraZoomRatio(this.maxV <= this.maxH ? this.maxV : this.maxH);
},
initMap: function() {
var e = this.data.getCurrentGameLevelInfo();
this.cellScriptArray = new Array(e.maxV);
for (var t = this.cellScriptArray, n = e.map, i = 0; i < e.maxV; ++i) {
t[i] = new Array(e.maxH);
for (var o = 0; o < e.maxH; ++o) t[i][o] = new a(cc.p(i, o), n[i][o], this);
}
this.mapTailcell = null;
},
initBeginPosition: function() {
var e = this.getBeginIndex();
e.markBeginPoint();
this.mapTailcell = e;
},
onResetEvent: function() {
var e = this.getBeginIndex();
e.clearTail();
this.mapTailcell = e;
},
refreshBackground: function() {
this.loopCellArray(function(e) {
e.initBackGroundNode();
});
},
getCell: function(e, t) {
return this.cellScriptArray[e][t];
},
insideRect: function(e, t) {
return 0 <= e && e < this.maxV && 0 <= t && t < this.maxH;
},
getCellPosition: function(e, t) {
return cc.pAdd(this.leftUpLayoutOriginal, cc.p(t * i, -e * i));
},
convertIndex: function(e) {
return {
x: -Math.floor(e.y / i),
y: Math.floor(e.x / i)
};
},
getBackgroundNode: function() {
var e = this.backgroundPool.getRes();
e.parent = this.backgroundParentNode;
e.active = !0;
return e;
},
fixCameraZoomRatio: function(e) {
if (!(e <= 5)) {
var t = 100 * e + 10 * (e - 1);
this.cameraNode.getComponent(cc.Camera).zoomRatio = 540 / t;
}
},
loopCellArray: function(e) {
for (var t = 0; t < this.maxV; ++t) for (var n = 0; n < this.maxH; ++n) e(this.getCell(t, n));
},
getBeginIndex: function() {
var t = null;
this.loopCellArray(function(e) {
null === t && 2 === e.getSrcValue() && (t = e);
});
return t;
},
newCellNode: function() {
var e = this.blockPool.getRes();
e.parent = this.blockParentNode;
e.active = !0;
return e;
},
newCellShadowNode: function() {
var e = this.blockPromptPool.getRes();
e.parent = this.shadowParentNode;
e.active = !0;
return e;
},
recoverCellNode: function(e) {
this.blockPool.setRes(e);
},
recoverShadowNode: function(e) {
this.blockPromptPool.setRes(e);
},
newLineNode: function() {
var e = this.blockLinePool.getRes();
e.parent = this.lineParentNode;
e.active = !0;
return e;
},
recoverLineNode: function(e) {
this.blockLinePool.setRes(e);
},
drawIndex: function(e, t) {
if (this.insideRect(e, t)) {
var n = this.getCell(e, t);
if (!n.isEmpty()) {
var i = this.mapTailcell;
if (null !== i) {
if (n !== i) if (n.hasDrawEnable()) {
n.clearTail();
this.mapTailcell = n;
sc.GameSound.playSoundInterval("gameFill", sc.GameSound.gameFill, .1);
} else if (this.nearlyJudge(n, i)) {
i.splitTail(n);
this.mapTailcell = n;
sc.GameSound.playSoundInterval("gameFill", sc.GameSound.gameFill, .1);
}
} else cc.log("发生错误了吧");
}
}
},
nearlyJudge: function(e, t) {
var n = t.leftOne();
return e === n || (e === (n = t.rightOne()) || (e === (n = t.upOne()) || e === (n = t.downOne())));
},
isMapComplete: function() {
for (var e = 0; e < this.maxV; ++e) for (var t = 0; t < this.maxH; ++t) if (!this.getCell(e, t).isCorrectDraw()) return !1;
return !0;
},
moveTouchPoint: function(e) {
this.pointNode.active || (this.pointNode.active = !0);
this.pointNode.position = e;
},
hideTouchPoint: function() {
this.pointNode.active = !1;
},
initTouchPoint: function() {
this.pointNode = cc.instantiate(this.blockHitMoldNode);
this.pointNode.parent = cc.find("point", this.node);
this.pointNode.active = !1;
},
promptAnswer: function(a, s, e) {
var c = this;
this.onResetEvent();
for (var t = function(e) {
var t = a[e - 1], n = a[e], i = n[0], o = n[1];
c.scheduleOnce(function() {
this.getCell(i, o).markShadow(this.getCell(t[0], t[1]));
}, .3 + .1 * (e - s));
}, n = s; n <= e; ++n) t(n);
},
playCrossEffect: function() {
this.loopCellArray(function(e) {
e.clearLine();
e.clearShadow();
});
this.loopCellArray(function(e) {
var t = e.getBlockNode();
t && t.runAction(cc.scaleTo(.5, 0));
});
this.scheduleOnce(function() {
this.loopCellArray(function(e) {
var t = e.getBackGroundNode();
t && t.runAction(cc.scaleTo(.5, 0));
});
}, .3, this);
}
});
cc._RF.pop();
}, {
Cell: "Cell",
ResPool: "ResPool"
} ],
MessageCenter: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "96e61qYBh9D06dj2bxUJtbr", "MessageCenter");
var r = cc.Class({
properties: {
type: null,
callback: null,
target: null
},
ctor: function() {
this.type = arguments[0];
this.callback = arguments[1];
this.target = arguments[2];
},
getType: function() {
return this.type;
},
getCallback: function() {
return this.callback;
},
getTarget: function() {
return this.target;
},
onCall: function(e) {
this.callback.call(this.target, e);
}
}), i = cc.Class({
properties: {
map: null
},
ctor: function() {
this.map = {};
},
addListener: function(e, t, n) {
this.map[e] || (this.map[e] = []);
for (var i = this.map[e], o = 0, a = i.length; o < a; ++o) {
var s = i[o];
if (s.getCallback() === t && s.getTarget() === n) return;
}
var c = new r(e, t, n);
i.push(c);
},
removeAll: function() {
this.map = {};
},
removeAllFromType: function(e) {
this.map[e] && (this.map[e] = []);
},
removeListener: function(e, t, n) {
var i = this.map[e];
if (i) {
for (var o = -1, a = 0, s = i.length; a < s; ++a) {
var c = i[a];
if (c.getCallback() === t && c.getTarget() === n) {
o = a;
break;
}
}
-1 !== o && i.splice(o, 1);
}
},
broadcast: function(e, t) {
var n = this.map[e];
if (n) for (var i = cc.js.array.copy(n), o = 0, a = i.length; o < a; ++o) i[o].onCall(t);
},
brocast: function(e, t) {
this.broadcast(e, t);
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
NoRepeatSound: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6c226FQJqhBDpEpMW5Mp/cT", "NoRepeatSound");
var i = new (cc.Class({
extends: cc.Object,
properties: {},
init: function() {
this.soundMap = {};
return this;
},
registerKey: function(e, t) {
this.soundMap[e] = {
key: e,
playFrame: -1,
callback: t
};
},
playSoundKey: function(e) {
var t = this.soundMap[e];
if (t) {
var n = cc.director.getTotalFrames();
if (n !== t.playFrame) {
t.playFrame = n;
t.callback();
}
}
},
removeSoundKey: function(e) {
if (this.soundMap.hasOwnProperty(e)) {
this.soundMap[e] = null;
delete this.soundMap[e];
}
},
removeAllSoundKey: function() {
this.soundMap = {};
}
}))().init();
t.exports = i;
cc._RF.pop();
}, {} ],
NodePool: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d09521qy1JOVJ/lKV4tTAvw", "NodePool");
t.exports = {
_getResForPool: function(e, t, n) {
var i = 0 < e.length ? e.pop() : null;
null === i && ((i = cc.instantiate(t)).parent = n);
i.active = !0;
return i;
},
_setResToPool: function(e, t) {
e.active = !1;
t.push(e);
}
};
cc._RF.pop();
}, {} ],
NormalManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fb4ac6cn9xB77J0/34JX3kl", "NormalManager");
cc.Class({
extends: cc.Component,
properties: {
gradeProcessLabel: cc.Label
},
onLoad: function() {},
start: function() {
this.updateGradeProcessView();
},
updateGradeProcessView: function() {
var e = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.gradeProcessLabel.string = (e.getCurrentLevel() + 1).toString();
}
});
cc._RF.pop();
}, {} ],
NormalOverView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b2a096b7HdAn5BWBmLv7n+z", "NormalOverView");
var i = e("GamePanel");
cc.Class({
extends: i,
properties: {
homeButtonNode: cc.Node,
nextButtonNode: cc.Node,
gradeProcessLabel: cc.Label
},
onLoad: function() {
this.initPanel();
},
onBeforeShow: function() {
this._super();
sc.GameSound.gameSuccessEnter();
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.updateGradeProcessView();
if (this.data.isLastGradeAndLevel()) {
this.nextButtonNode.active = !1;
this.homeButtonNode.position = cc.p(0, this.homeButtonNode.position.y);
}
sc.PushModule.doOpenPageOnce();
},
updateGradeProcessView: function() {
this.gradeProcessLabel.string = (this.data.getCurrentLevel() + 1).toString();
},
onClickHome: function() {
sc.GameSound.buttonClick();
cc.director.loadScene("title");
},
onClickNext: function() {
var e = this;
sc.GameSound.gameSuccessNext();
this.hideView(function() {
e.nextLevel();
}, this);
},
nextLevel: function() {
var e = this, t = sc.Facade.retrieveMediator(sc.GameConst.GameManagerMediator);
cc.find("Canvas/globalMask").active = !0;
t.getMapScript().playCrossEffect();
setTimeout(function() {
e.data.nextGameLevel();
cc.director.loadScene("game");
}, 1200);
}
});
cc._RF.pop();
}, {
GamePanel: "GamePanel"
} ],
Observer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "21afeV0goJBu7LSp6uh5mBe", "Observer");
var i = cc.Class({
extends: cc.Object,
properties: {
fns: null,
isPublishing: !1,
listRemove: null
},
ctor: function() {
this.fns = {};
},
subscribe: function(e, t, n) {
this.fns[e] || (this.fns[e] = []);
var i = {
callback: t,
target: n = n || this
};
this.fns[e].push(i);
return i;
},
unsubscribe: function(e, t, n) {
if (this.isPublishing) {
null === this.listRemove && (this.listRemove = []);
this.listRemove.push({
eventName: e,
callback: t,
target: n
});
} else this._removeOne(e, t, n);
},
publish: function(e, t) {
this.isPublishing = !0;
this.listRemove = null;
var n = this.fns[e];
if (n) {
n.forEach(function(e) {
e.callback.call(e.target, t);
});
}
this.isPublishing = !1;
if (null !== this.listRemove) {
for (var i = 0, o = this.listRemove.length; i < o; ++i) {
var a = this.listRemove[i];
this._removeOne(a.eventName, a.callback, a.target);
}
this.listRemove = null;
}
},
_removeOne: function(e, t, n) {
var i = this.fns[e];
i && (this.fns[e] = i.filter(function(e) {
return e.callback !== t || e.target !== n;
}));
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
OnEnterGame: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fa05cCEG0NMJ5s0QiKh+JZu", "OnEnterGame");
var i = e("BaseCommand");
cc.Class({
extends: i,
properties: {},
execute: function(e) {
var t = e.getBody().level, n = e.getBody().mode, i = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
i.setGameMode(n);
i.setCurrentLevel(t);
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {
BaseCommand: "BaseCommand"
} ],
PanelView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b610aDRGaZNcKzi8/0iS57R", "PanelView");
var i = cc.Enum({
HIDE: 0,
HIDE_TO_SHOW: 1,
SHOW: 2,
SHOW_TO_HIDE: 3
});
cc.Class({
extends: cc.Component,
properties: {
background: cc.Node,
panel: cc.Node,
firstInit: {
default: !0,
serializable: !1,
visible: !1
}
},
onLoad: function() {},
start: function() {
this.initialize();
},
showView: function(e, t) {
this.initialize();
if (this.viewStatus === i.HIDE) {
this.viewStatus = i.HIDE_TO_SHOW;
this.background.active = !0;
this.background.opacity = 0;
this.background.runAction(cc.fadeTo(.2, this.backgroundOpacity));
this.panel.active = !0;
this.panel.opacity = 0;
this.panel.scale = .5;
this.panel.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.3, 1).easing(cc.easeBackOut())), cc.callFunc(function() {
this.viewStatus = i.SHOW;
e && (t ? e.call(t) : e());
}, this)));
}
},
hideView: function(e, t) {
this.initialize();
if (this.viewStatus === i.SHOW) {
this.viewStatus = i.SHOW_TO_HIDE;
this.background.runAction(cc.sequence(cc.fadeOut(.2), cc.callFunc(function() {
this.background.active = !1;
}, this)));
this.panel.runAction(cc.sequence(cc.spawn(cc.fadeOut(.2), cc.scaleTo(.3, .5).easing(cc.easeBackIn())), cc.callFunc(function() {
this.viewStatus = i.HIDE;
this.panel.active = !1;
e && (t ? e.call(t) : e());
}, this)));
}
},
initialize: function() {
if (this.firstInit) {
this.firstInit = !1;
this.background || (this.background = cc.find("background", this.node));
this.panel || (this.panel = cc.find("panel", this.node));
this.backgroundOpacity = this.background.opacity;
this.background.active = !1;
this.panel.active = !1;
this.viewStatus = i.HIDE;
}
},
showImmediate: function() {
this.initialize();
if (this.background && !this.background.active) {
this.background.stopAllActions();
this.background.active = !0;
this.background.opacity = this.backgroundOpacity;
}
if (this.panel && !this.panel.active) {
this.panel.stopAllActions();
this.panel.active = !0;
this.panel.scale = 1;
this.panel.opacity = 255;
}
this.viewStatus = i.SHOW;
},
hideImmediate: function() {
this.initialize();
if (this.background && this.background.active) {
this.background.stopAllActions();
this.background.active = !1;
}
if (this.panel && this.panel.active) {
this.panel.stopAllActions();
this.panel.active = !1;
}
this.viewStatus = i.HIDE;
},
setBackgroundAndPanel: function(e, t) {
this.background = e;
this.panel = t;
}
});
cc._RF.pop();
}, {} ],
Platform: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2795fm918xFNZ2QTNf1iRNA", "Platform");
var i = {
ReflectionArgumentsIOS: function(e) {
for (var t = [], n = 0, i = e.length; n < i; ++n) {
2 !== n && t.push(e[n]);
2 < n && (t[1] += ":");
}
return t;
},
AndroidParam: {
Int: "I",
Float: "F",
Void: "V",
Boolean: "Z",
String: "Ljava/lang/String;",
ListParams: function(e, t) {
for (var n = "(", i = 0, o = e.length; i < o; ++i) n += e[i];
n += ")";
return n += t;
}
},
isIOS: function() {
return cc.sys.os === cc.sys.OS_IOS;
},
isAndroid: function() {
return cc.sys.os === cc.sys.OS_ANDROID;
},
isWindows: function() {
return cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os === cc.sys.OS_OSX;
},
Reflection: function() {
var e = arguments;
this.isIOS() && (e = this.ReflectionArgumentsIOS(arguments));
return jsb.reflection.callStaticMethod.apply(this, e);
}
};
t.exports = i;
cc._RF.pop();
}, {} ],
PreventMultiTouch: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bee7dJYAidEJpDVa/2yOaTn", "PreventMultiTouch");
var i = cc.Class({
extends: cc.Component,
properties: {
interactable: !0,
touchListener: {
default: null,
serializable: !1,
visible: !1
}
},
statics: {
Create: function() {
var e = "CreatePreventMultiTouch", t = cc.find(e);
if (t) return t.getComponent(i);
var n = new cc.Node();
n.name = e;
cc.game.addPersistRootNode(n);
return n.addComponent(i);
}
},
onLoad: function() {
this.addTouchListenerEvent();
},
onDestroy: function() {
this.removeListenerEvent();
},
addTouchListenerEvent: function() {
if (null === this.touchListener) {
this.touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: this.onTouchBegan.bind(this),
onTouchMoved: this.onTouchMoved.bind(this),
onTouchEnded: this.onTouchEnded.bind(this),
onTouchCancelled: this.onTouchCancelled.bind(this)
});
cc.eventManager.addListener(this.touchListener, this.node);
}
},
removeListenerEvent: function() {
if (null !== this.touchListener) {
cc.eventManager.removeListeners(this.touchListener, this.node);
this.touchListener = null;
}
},
onTouchBegan: function(e) {
return this.interactable && 0 < e.getID();
},
onTouchMoved: function(e) {
return !0;
},
onTouchEnded: function(e) {
return !0;
},
onTouchCancelled: function(e) {
return !0;
},
setInteractable: function(e) {
this.interactable = e;
}
});
cc._RF.pop();
}, {} ],
Proxy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b5cebL1FIZN7ZbOh5Pu1bAR", "Proxy");
var i = cc.Class({
properties: {
proxy: null
},
ctor: function() {
this.proxy = {};
},
removeAll: function() {
this.proxy = {};
},
addProxy: function(e, t) {
this.proxy[e] = t;
},
removeProxy: function(e) {
if (this.proxy.hasOwnProperty(e)) {
this.proxy[e] = null;
delete this.proxy[e];
}
},
getProxy: function(e) {
var t = this.proxy[e];
return t || null;
}
});
t.exports = new i();
cc._RF.pop();
}, {} ],
PushAdapterWH: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9f8d0SX7y9DqrxNV7y6dKd4", "PushAdapterWH");
cc.Class({
extends: cc.Component,
properties: {
adapterWidth: !1,
adapterHeight: !1,
standardScreen: cc.size(960, 640)
},
onLoad: function() {
this.onAspWidth();
},
onAspWidth: function() {
if (this.adapterWidth && 0 !== this.standardScreen.height) {
var e = cc.director.getVisibleSize(), t = this.standardScreen.width / this.standardScreen.height, n = e.width / e.height;
cc.log("asp: %s %s", n, t);
if (n < t) {
this.node.scale = n / t;
cc.log("now scale: %s %s", this.node.name, this.node.scale);
}
}
}
});
cc._RF.pop();
}, {} ],
PushBigTexturePointMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ae3eepTvYVMH7pPVPQ2k3Rj", "PushBigTexturePointMgr");
cc.Class({
extends: cc.Component,
properties: {
scrollView: cc.ScrollView,
pointRemovableNode: cc.Node,
pointNodes: [ cc.Node ]
},
onLoad: function() {
this.pointLength = this.pointNodes.length;
this.addScrollViewEvent(this.scrollView, "PushBigTexturePointMgr", this.node, "onScrollViewEvent", "");
},
start: function() {},
update: function(e) {},
addScrollViewEvent: function(e, t, n, i, o) {
var a = new cc.Component.EventHandler();
a.target = n;
a.component = t;
a.handler = i;
a.customEventData = o;
e.scrollEvents.push(a);
},
onScrollViewEvent: function(e, t, n) {
if (t === cc.ScrollView.EventType.TOUCH_UP) ; else if (t === cc.ScrollView.EventType.SCROLLING) {
var i = e.getScrollOffset(), o = e.getMaxScrollOffset();
this.pointRemovableNode.position = cc.pLerp(this.pointNodes[0].position, this.pointNodes[this.pointLength - 1].position, -i.x / o.x);
}
}
});
cc._RF.pop();
}, {} ],
PushClickCloseView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5f77bi8ADJOG7M2gyaXbtuh", "PushClickCloseView");
cc.Class({
extends: cc.Component,
properties: {
button: cc.Button,
closeView: cc.Node
},
onLoad: function() {
if (this.button) {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = cc.js.getClassName(this);
e.handler = "onClickCloseView";
e.customEventData = "";
this.button.clickEvents.push(e);
}
},
onClickCloseView: function() {
this.closeView && (this.closeView.active = !1);
}
});
cc._RF.pop();
}, {} ],
PushEditorApp: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e2566AIx09FIJbzlGC5yPDm", "PushEditorApp");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {
appInfo: {
default: null,
serializable: !1,
visible: !1
},
touchStartTime: {
default: 0,
serializable: !1,
visible: !1
}
},
start: function() {
this.refreshTexture();
i.getProxy("push").addImageCacheEvent(this.onImageCacheEvent, this);
},
onEnable: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
},
onDisable: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
},
onDestroy: function() {
i.getProxy("push").removeImageCacheEvent(this.onImageCacheEvent, this);
},
getAppInfo: function() {
return this.appInfo;
},
onImageCacheEvent: function(e) {
if (this.getAppInfo()) {
var t = e.spriteFrame;
if (t) {
this.getAppInfo().iconUrl === e.textureUrl && (this.node.getComponent(cc.Sprite).spriteFrame = t);
}
}
},
updateViewFromData: function(e) {
this.appInfo = e;
this.refreshTexture();
},
onTouchStart: function(e) {
this.touchStartTime = Date.now();
this.touchStartPosition = e.getLocation();
},
onTouchMove: function(e) {},
onTouchEnd: function(e) {
if (!(200 < Date.now() - this.touchStartTime || 5 < cc.pDistance(this.touchStartPosition, e.getLocation()))) {
cc.log("click big view");
this.nativeDownload();
}
},
nativeDownload: function() {
if (this.getAppInfo()) {
var e = this.getAppInfo().packageName, t = this.getAppInfo().bundleID;
cc.log("download: %s %s", e, t);
i.getProxy("push").nativeDownload(e, t);
}
},
refreshTexture: function() {
if (this.getAppInfo()) {
var e = this.getAppInfo().iconUrl, t = i.getProxy("push").getSpriteFrame(e);
t && (this.node.getComponent(cc.Sprite).spriteFrame = t);
}
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
PushLayoutItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2ebb1fOaWZN5a6DJN2rmUV6", "PushLayoutItem");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {
iconNode: cc.Node,
gameNameLabel: cc.Label,
gameDescribeLabel: cc.Label,
downloadNode: cc.Node,
appInfo: {
default: null,
serializable: !1,
visible: !1
},
validStatus: {
default: !1,
serializable: !1,
visible: !1
}
},
start: function() {
this.refreshTexture();
i.getProxy("push").addImageCacheEvent(this.onImageCacheEvent, this);
},
onDestroy: function() {
i.getProxy("push").removeImageCacheEvent(this.onImageCacheEvent, this);
},
hideView: function() {
this.node.children.forEach(function(e) {
e.active = !1;
});
},
showView: function() {
this.node.children.forEach(function(e) {
e.active = !0;
});
},
setValidStatus: function(e) {},
updateItem: function(e) {
this.appInfo = e;
this.gameNameLabel.string = "" + e.name;
this.gameDescribeLabel.string = "" + e.description;
this.refreshTexture();
},
getAppInfo: function() {
return this.appInfo;
},
onImageCacheEvent: function(e) {
if (this.appInfo) {
var t = e.spriteFrame;
if (t) {
this.appInfo.iconUrl === e.textureUrl && (this.iconNode.getComponent(cc.Sprite).spriteFrame = t);
}
}
},
onClickDownload: function() {
if (null !== this.getAppInfo()) {
var e = this.getAppInfo().packageName, t = this.getAppInfo().bundleID;
cc.log("download: %s %s", e, t);
i.getProxy("push").nativeDownload(e, t);
}
},
refreshTexture: function() {
if (this.getAppInfo()) {
var e = this.getAppInfo().iconUrl, t = i.getProxy("push").getSpriteFrame(e);
t && (this.iconNode.getComponent(cc.Sprite).spriteFrame = t);
}
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
PushLocalizedLabel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "09587n2zm1LKKWcdl/MMbd7", "PushLocalizedLabel");
cc.Class({
extends: e("LocalizedLabel"),
editor: {
menu: "i18n/PushLocalizedLabel"
}
});
cc._RF.pop();
}, {
LocalizedLabel: "LocalizedLabel"
} ],
PushLocalizedSprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "77e12hDnAJC6KT57Ddm9dID", "PushLocalizedSprite");
cc.Class({
extends: e("LocalizedSprite"),
editor: {
menu: "i18n/PushLocalizedSprite"
}
});
cc._RF.pop();
}, {
LocalizedSprite: "LocalizedSprite"
} ],
PushModulePC: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ef8eekZLfRPw7yRw9gZoNf0", "PushModulePC");
var i = cc.Class({
extends: cc.Object,
properties: {
isFacebookInstanceGame: !1
},
statics: {
getInstance: function() {
i.instance || (i.instance = new i().init());
return i.instance;
}
},
init: function() {
return this;
},
setPackageNameAndBundleID: function(e, t) {},
getPackageName: function() {
return "com.sencatech.game.sample";
},
getBundleID: function() {
return this.getPackageName();
},
doOpenPageOnce: function() {
this.doRequestPushBigTexture();
},
doRequestBanner: function() {},
doRequestReward: function(e, t) {
e.call(t, !0);
},
doOpenReward: function(e, t) {
e.call(t, !0, 1);
},
doRequestPushBigTexture: function() {
this.isUnlock();
},
isUnlock: function() {
return !1;
},
unLock: function() {
this.changedLock(!0);
},
changedLock: function(e) {},
unLockEvent: function() {
this.unLock();
},
likesEvent: function() {
this.likesRecord();
},
isLikes: function() {
return !0;
},
likesRecord: function() {}
});
t.exports = i;
cc._RF.pop();
}, {} ],
PushModule: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5d401rkbW1A9aYWDL4Gagap", "PushModule");
var a = t("Proxy"), i = cc.Class({
extends: cc.Object,
properties: {
_packageName: "",
_bundleID: ""
},
statics: {
getInstance: function() {
i.instance || (i.instance = new i().init());
return i.instance;
}
},
init: function() {
return this;
},
setPackageNameAndBundleID: function(e, t) {
this._packageName = e;
this._bundleID = t;
},
getPackageName: function() {
return this._packageName;
},
getBundleID: function() {
return this._bundleID;
},
doOpenPageOnce: function() {
var e = a.getProxy("admob");
if (e) {
var t = e.getAd("page");
t && t.isAvailable() && t.isLoaded() && a.getProxy("admob").openMob("page", function() {}, this);
}
},
doRequestBanner: function() {
var e = "banner", t = a.getProxy("admob");
if (t) {
var n = t.getAd(e);
n && n && n.isAvailable() && (n.isLoaded() ? t.setBannerStatus(e, 1) : t.loadMob(e));
}
},
doRequestReward: function(e, t) {
var n = a.getProxy("admob");
if (n) {
var i = n.getAd("reward");
if (i) {
if (i.isAvailable()) {
if (i.isLoaded()) {
e.call(t, !0);
return;
}
n.loadMob("reward");
}
e.call(t, !1);
} else e.call(t, !1);
} else e.call(t, !1);
},
doOpenReward: function(i, o) {
this.doRequestReward(function(e) {
var t = a.getProxy("admob");
if (t) {
var n = t.getAd("reward");
n && e ? t.openMob("reward", function(e) {
0 !== e.result ? i.call(o, !1) : i.call(o, !0, n.getRewardAmount());
}, this) : i.call(o, !1);
} else i.call(o, !1);
}, this);
},
doRequestPushBigTexture: function() {
if (!this.isUnlock()) {
var e = t("PushViewBigTexture");
e && e.getInstance() && e.getInstance().showView();
}
},
doOpenLeaderBoard: function(e, t) {
var n = {
cmd: "show"
};
n.leaderboardId = e;
n.score = t;
cc.GameApplication.JavascriptBridgeNative.sendMessage("leaderboard", n);
},
isUnlock: function() {
var e = a.getProxy("appdata");
return !!e && e.isBoolean("unlock");
},
unLock: function() {
this.changedLock(!0);
},
changedLock: function(e) {
var t = a.getProxy("appdata");
if (t) return t.setBoolean("unlock", e);
},
unLockEvent: function() {
this.unLock();
var e = a.getProxy("admob");
if (e) {
e.setBannerStatus("banner", 0);
var t = e.getAd("banner");
t && t.setAvailable(!1);
var n = e.getAd("page");
n && n.setAvailable(!1);
}
},
likesEvent: function() {
this.likesRecord();
},
isLikes: function() {
var e = a.getProxy("appdata");
return !!e && e.isBoolean("likes");
},
likesRecord: function() {
var e = a.getProxy("appdata");
if (e) return e.setBoolean("likes", !0);
}
});
e.exports = i;
cc._RF.pop();
}, {
Proxy: "Proxy",
PushViewBigTexture: "PushViewBigTexture"
} ],
PushMonitorBanner: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "46fcfvC78hDJZ9ecVtLLE8W", "PushMonitorBanner");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {
originalVisible: {
default: !1,
serializable: !1,
visible: !1
}
},
onEnable: function() {
this.originalVisible = !1;
var e = this.getBanner();
this.originalVisible = e.isViewVisible();
e.isAvailable() && this.originalVisible && this.getAdMob().setBannerStatus("banner", 0);
},
onDisable: function() {
var e = this.getBanner();
e.isAvailable() && this.originalVisible && e.isLoaded() && this.getAdMob().setBannerStatus("banner", 1);
},
update: function(e) {
this.getBanner().isAvailable() && this.getBanner().isViewVisible() && this.getAdMob().setBannerStatus("banner", 0);
},
getBanner: function() {
this.banner || (this.banner = i.getProxy("admob").getAdMob("banner"));
return this.banner;
},
getAdMob: function() {
return i.getProxy("admob");
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
PushMoreGame: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d4e95KEi+5FdpWVTiihCHCd", "PushMoreGame");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.sprite = this.node.getComponent(cc.Sprite);
this.sprite.enabled = !1;
this.changedEnable = !1;
this.changedFrameTimeMax = 3;
this.changedFrameTime = this.changedFrameTimeMax;
this.moreGameIndex = -1;
},
start: function() {
this.pushViewScript = i.getProxy("push-view");
null === this.getPushViewScript() && (this.node.active = !1);
},
update: function(e) {
if (!this.changedEnable) {
this.changedEnable = this.getPushViewScript().isDataInitialization();
if (this.changedEnable) {
this.sprite.enabled = !0;
this.setClickEvent();
this.beginFloat();
}
}
if (this.changedEnable) {
this.changedFrameTime += e;
if (this.changedFrameTime >= this.changedFrameTimeMax) {
this.changedFrameTime = 0;
this.changedFrame();
}
}
},
changedFrame: function() {
this.moreGameIndex++;
var e = this.getPushViewScript().getMoreGameApps();
this.moreGameIndex >= e.length && (this.moreGameIndex = 0);
var t = e[this.moreGameIndex].iconUrl, n = this.getPushViewScript().getInternalPush().getSpriteFrame(t);
n && (this.sprite.spriteFrame = n);
},
getPushViewScript: function() {
return this.pushViewScript;
},
setClickEvent: function() {
if (this.changedEnable) {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = cc.js.getClassName(this);
e.handler = "onClickOpenPushView";
e.customEventData = "";
this.node.getComponent(cc.Button).clickEvents.push(e);
}
},
onClickOpenPushView: function() {
this.getPushViewScript().openPushView();
},
beginFloat: function() {
this.node.runAction(cc.sequence(cc.moveBy(1, cc.p(0, 15)), cc.moveBy(1, cc.p(0, -15))).repeatForever());
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
PushViewBigTexture: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1a6faxMBRpBhJaD6plietc2", "PushViewBigTexture");
var o = e("Proxy"), i = null, a = cc.Enum({
HIDE: 0,
ACTION: 1,
SHOW: 2
});
cc.Class({
extends: cc.Component,
properties: {
horizontal: !0,
blackBackground: cc.Node,
bigTextureSprite: cc.Sprite,
closeButton: cc.Node,
boardNode: cc.Node
},
statics: {
getInstance: function() {
return i;
}
},
onLoad: function() {
o.addProxy("pushBig", this);
this.blackSrcOpacity = this.blackBackground.opacity;
this.viewStatus = a.HIDE;
this.bigTextureInfo = null;
},
start: function() {
if (null === i) {
(i = this).initCloseButtonEvent();
this.initBigTextureButtonEvent();
this.checkBannerScale = !1;
this.dstScale = 1;
this.admob = o.getProxy("admob");
this.banner = this.admob.getAd("banner");
null !== this.banner && (this.bannerEvent = this.banner.addEventListener(this.onBannerEvent, this));
this.scheduleOnce(function() {
null === this.getAppInfo() && this.randomBigTextureFrame();
}, 1, this);
}
},
onDestroy: function() {
if (this.bannerEvent) {
null !== this.banner && this.banner.removeEventListener(this.bannerEvent);
this.bannerEvent = null;
}
i === this && (i = null);
o.removeProxy("pushBig");
},
setShowFrame: function(e) {
if (this.bigTextureSprite) {
var t = this.bigTextureSprite.spriteFrame;
if (t) {
var n = t.getTexture();
t.clearTexture();
if (n) {
cc.textureCache.removeTexture(n);
cc.loader.release(n);
}
}
this.bigTextureSprite.spriteFrame = e;
}
},
showView: function() {
this.randomBigTextureFrame();
if (null !== this.getAppInfo()) {
if (!this.checkBannerScale && null !== this.banner && this.banner.isViewVisible()) {
this.checkBannerScale = !0;
this.onCheckBannerOffset();
}
if (this.viewStatus === a.HIDE) {
this.viewStatus = a.ACTION;
this.blackBackground.active = !0;
this.blackBackground.opacity = 0;
this.blackBackground.runAction(cc.fadeTo(.15, this.blackSrcOpacity));
this.boardNode.active = !0;
this.boardNode.scale = 0;
this.boardNode.opacity = 0;
this.boardNode.runAction(cc.sequence(cc.spawn(cc.fadeTo(.3, 255), cc.scaleTo(.3, this.dstScale).easing(cc.easeBackOut())), cc.callFunc(function() {
this.boardNode.scale = this.dstScale;
this.viewStatus = a.SHOW;
}, this)));
}
}
},
hideView: function() {
if (this.viewStatus === a.SHOW) {
this.viewStatus = a.ACTION;
this.blackBackground.runAction(cc.fadeOut(.2));
this.boardNode.runAction(cc.sequence(cc.spawn(cc.fadeOut(.2), cc.scaleTo(.2, 0).easing(cc.easeBackIn())), cc.callFunc(function() {
this.viewStatus = a.HIDE;
this.blackBackground.active = !1;
this.boardNode.active = !1;
}, this)));
}
},
initCloseButtonEvent: function() {
this.setButtonEvent(this.closeButton, "onCloseClick");
},
initBigTextureButtonEvent: function() {
this.setButtonEvent(this.boardNode, "onBigTextureClick");
},
onCloseClick: function() {
this.hideView();
},
onBigTextureClick: function() {
if (null !== this.getAppInfo()) {
var e = this.getAppInfo().packageName, t = this.getAppInfo().bundleID;
cc.log("download: %s %s", e, t);
o.getProxy("push").nativeDownload(e, t);
}
},
getScriptName: function() {
var e = cc.js.getClassName(this), t = e.lastIndexOf(".");
0 <= t && (e = e.slice(t + 1));
return e;
},
setButtonEvent: function(e, t) {
var n = new cc.Component.EventHandler();
n.target = this.node;
n.component = this.getScriptName();
n.handler = t;
n.customEventData = "";
e.getComponent(cc.Button).clickEvents.push(n);
},
randomBigTextureFrame: function() {
var e = o.getProxy("push");
if (e) {
var t = e.getInterstitialApps();
if (null !== t) {
var n = t[Math.floor(1e4 * cc.random0To1()) % t.length];
if (this.getAppInfo() !== n) {
var i = this.horizontal ? n.thumbnailUrl : n.portraitThumbnailUrl;
e.readTextureFromLocal(i, function(e) {
if (null !== e) {
this.bigTextureInfo = n;
this.setShowFrame(e);
}
}, this);
}
}
}
},
getAppInfo: function() {
return this.bigTextureInfo;
},
getBannerBottomAtGameScene: function(e) {
return this.admob ? this.admob.getBannerBottomAtGameScene(e.getBannerSize().height) : 0;
},
onBannerEvent: function(e) {
var t = e.adFunction;
if (t && "onAdViewVisible" === t && null !== this.banner && this.banner.isViewVisible() && !this.checkBannerScale) {
this.checkBannerScale = !0;
this.onCheckBannerOffset();
}
},
onCheckBannerOffset: function() {
var e = this.boardNode.height;
0 === e && (e = 1);
var t = this.getBannerBottomAtGameScene(this.banner), n = cc.director.getVisibleSize().height;
if (n - 2 * (t + 15) < e) {
var i = n - 2 * (t + 15);
this.dstScale = i / e;
}
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
PushView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0892buF37BMMKnfwQ4vnZkE", "PushView");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {
pushViewNode: cc.Node,
horizontal: !0,
gameListScrollLayout: cc.Layout,
moldListScrollLayout: cc.Node,
moldListScrollLayout2: cc.Node,
titleLabel: cc.Label,
editorAppViewNodeParent: cc.Node,
closeButtonNode: cc.Node,
preMainFrameInfo: {
default: null,
serializable: !1,
visible: !1
},
requiredInstantiatedAppItem: {
default: null,
serializable: !1,
visible: !1
}
},
onLoad: function() {
i.addProxy("push-view", this);
this.pushScript = i.getProxy("push");
},
start: function() {
this.initCloseButtonEvent();
this.preMainFrameInfo = null;
},
update: function(e) {
if (null === this.preMainFrameInfo) {
this.preMainFrameInfo = this.getInternalPush().getMainFrame();
if (null !== this.preMainFrameInfo) {
this.updateGameListScrollView();
this.initPushEditorApp(this.editorAppViewNodeParent.children);
this.initTitleLabel();
}
}
this.updateContinueToInitialize(e);
},
getInternalPush: function() {
return this.pushScript;
},
updateGameListScrollView: function() {
var e = this.getMoreGameApps();
if (null !== e) {
this.gameListScrollLayout.node.height = 228;
var t = null;
if (8 < e.length) {
t = e.slice(0, 8);
this.requiredInstantiatedAppItem = new o(e.slice(8));
} else {
t = e;
this.requiredInstantiatedAppItem = null;
}
this.addLayoutItem(t);
}
},
addLayoutItem: function(e) {
this.horizontal ? this.addHorizontalItem(e) : this.addPortraitItem(e);
},
addHorizontalItem: function(e) {
var t = parseInt((e.length + 1) / 2);
this.gameListScrollLayout.node.height += 114 * t;
for (var n = null, i = 0; i < e.length; i++) {
var o = parseInt(i % 2);
if (0 === o) {
(n = cc.instantiate(this.moldListScrollLayout)).parent = this.gameListScrollLayout.node;
if (i + 1 >= e.length) {
var a = n.children[1].getComponent("PushLayoutItem");
a.hideView();
a.setValidStatus(!1);
}
}
var s = n.children[o].getComponent("PushLayoutItem");
s.updateItem(e[i]);
s.setValidStatus(!0);
}
},
addPortraitItem: function(e) {
this.gameListScrollLayout.node.height += 114 * e.length;
for (var t = 0; t < e.length; t++) {
var n = cc.instantiate(this.moldListScrollLayout2);
n.parent = this.gameListScrollLayout.node;
var i = n.children[0].getComponent("PushLayoutItem");
i.updateItem(e[t]);
i.setValidStatus(!0);
}
},
initPushEditorApp: function(e) {
if (e && 0 !== e.length) {
var t = this.getInternalPush().getMainFrame();
if (null !== t) {
var i = t.editorApps;
i && (i = i.apps) && 0 !== i.length && e.forEach(function(e, t) {
var n = e.addComponent("PushEditorApp");
t >= i.length || n.updateViewFromData(i[t]);
}, this);
}
}
},
initCloseButtonEvent: function() {
if (this.closeButtonNode) {
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = "PushView";
e.handler = "onClickClosePushView";
e.customEventData = "";
this.closeButtonNode.getComponent(cc.Button).clickEvents.push(e);
}
},
initTitleLabel: function() {
if (this.titleLabel) {
var e = this.getInternalPush().getMainFrame();
if (null !== e) {
var t = e.recommendedApps;
if (t) {
var n = t.title;
n && (this.titleLabel.string = "" + n);
}
}
}
},
openPushView: function() {
this.onClickOpenPushView();
},
onClickOpenPushView: function() {
this.pushViewNode && (this.pushViewNode.active || (this.pushViewNode.active = !0));
},
updateContinueToInitialize: function(e) {
if (this.pushViewNode && this.pushViewNode.active && null !== this.requiredInstantiatedAppItem) if (this.requiredInstantiatedAppItem.hasNext()) {
var t = this.requiredInstantiatedAppItem, n = t.next(), i = t.next();
null !== i ? this.addLayoutItem([ n, i ]) : this.addLayoutItem([ n ]);
} else this.requiredInstantiatedAppItem = null;
},
onClickClosePushView: function() {
this.pushViewNode && this.pushViewNode.active && (this.pushViewNode.active = !1);
},
getMoreGameApps: function() {
var e = this.getInternalPush().getMainFrame();
if (null === e) return null;
var t = e.recommendedApps;
if (!t) return null;
var n = t.apps;
return n ? 0 === n.length ? null : n : null;
},
isDataInitialization: function() {
return null !== this.preMainFrameInfo;
}
});
var o = cc.Class({
properties: {
array: {
default: null,
serializable: !1,
visible: !1
},
index: 0,
length: 0
},
ctor: function() {
this.array = arguments[0];
this.length = this.array.length;
this.first();
},
first: function() {
return (this.index = 0) < this.length ? this.array[0] : null;
},
hasNext: function() {
return this.index < this.length;
},
next: function() {
if (!this.hasNext()) return null;
var e = this.array[this.index];
this.index++;
return e;
},
getArray: function() {
return this.array;
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
ResPool: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3b400LLPb9NRrADLGFMP4P+", "ResPool");
var i = cc.Class({
properties: {
pool: []
},
ctor: function() {
2 === arguments.length && this.init(arguments[0], arguments[1]);
},
init: function(e, t) {
this.mold = e;
this.parent = t;
return this;
},
_getResForPool: function(e, t, n) {
var i = 0 < e.length ? e.pop() : null;
null === i && ((i = cc.instantiate(t)).parent = n);
i.active = !0;
return i;
},
_setResToPool: function(e, t) {
e.active = !1;
t.push(e);
},
getRes: function() {
return this._getResForPool(this.pool, this.mold, this.parent);
},
setRes: function(e) {
e.parent = this.parent;
this._setResToPool(e, this.pool);
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
Ruler: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9bc2ap20QxOW5VgPXikIs3t", "Ruler");
cc.Class({
extends: cc.Component,
editor: {},
properties: {
debugDrawEnable: !1
},
onLoad: function() {
if (this.debugDrawEnable) {
var e = new cc.Node();
e.parent = this.node;
this.lineDraw = e.addComponent(cc.Graphics);
this.lineDraw.fillColor = cc.color(0, 255, 0, 255);
var t = new cc.Node();
t.parent = e;
t.anchorX = 1;
t.anchorY = 1;
this.positionLabel = t.addComponent(cc.Label);
t.color = cc.color(255, 0, 0, 255);
this.positionLabel.fontSize = 14;
this.positionLabel.node.active = !1;
this.positionLabel.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
this.positionLabel.verticalAlign = cc.Label.VerticalAlign.TOP;
this.canvas = cc.find("Canvas");
this.screenWidth = cc.director.getVisibleSize().width;
this.screenHeight = cc.director.getVisibleSize().height;
this.enableRuler = !1;
this.initTouchEnable = !1;
if (!this.initTouchEnable) {
this.initTouchEnable = !0;
var n = this.node;
n.on(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
n.on(cc.Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
n.on(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
n.on(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);
}
this.onLoadSystemEvent();
}
},
onDestroy: function() {
this.onDestroySystemEvent();
},
onLoadSystemEvent: function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onDestroySystemEvent: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
OnTouchStart: function(e) {
this.OnTouchMove(e);
},
OnTouchMove: function(e) {
if (this.enableRuler) {
var t = this.canvas.convertTouchToNodeSpaceAR(e);
this.positionLabel.node.active = !0;
this.positionLabel.string = cc.formatStr("(%s,%s)", parseInt(t.x), parseInt(t.y));
this.positionLabel.node.position = cc.p(t.x - 10, t.y - 10);
this.lineDraw.clear();
this.lineDraw.moveTo(t.x - this.screenWidth, t.y);
this.lineDraw.lineTo(t.x + this.screenWidth, t.y);
this.lineDraw.moveTo(t.x, t.y - this.screenHeight);
this.lineDraw.lineTo(t.x, t.y + this.screenHeight);
this.lineDraw.fill();
}
},
OnTouchEnd: function(e) {
this.positionLabel.node.active = !1;
this.lineDraw.clear();
},
onKeyDown: function(e) {
switch (e.keyCode) {
case cc.KEY.a:
case cc.KEY.A:
this.enableRuler = !0;
}
},
onKeyUp: function(e) {
switch (e.keyCode) {
case cc.KEY.a:
case cc.KEY.A:
this.enableRuler = !1;
}
}
});
cc._RF.pop();
}, {} ],
SplashFadeIn: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "40864e9s8xJ6p85voNd27fG", "SplashFadeIn");
cc.Class({
extends: cc.Component,
properties: {
nextSceneName: ""
},
onLoad: function() {
this.enterSplash();
},
enterSplash: function() {
var e = cc.find("Canvas");
if (e) {
e.opacity = 0;
e.runAction(cc.sequence(cc.fadeIn(.5), cc.delayTime(.5), cc.callFunc(function() {
cc.director.loadScene(this.nextSceneName);
}, this)));
}
}
});
cc._RF.pop();
}, {} ],
Splash: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6ef4bCbSBVK55gkQs1FZvE+", "Splash");
var i = e("AppData"), o = e("GameConst"), a = e("GameSound"), s = e("GameFacade"), c = (e("GameInitImp"), 
e("Proxy")), r = e("sc"), u = e("BaseView"), l = e("GameLevelInfo"), h = e("PushModule");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.director.setDisplayStats(!1);
this._initConfigureData();
this._initGlobal();
this._initAppData();
r.Facade.startup();
},
start: function() {},
_initAppData: function() {
var e = new i(this._getPackageName() + "-");
c.addProxy("appdata", e);
},
_initGlobal: function() {
r.GameConst = o;
r.Facade = new s("OneLineFacade");
r.GameSound = a;
r.PushModule = h.getInstance();
u.GetFacadeInstance = function() {
return r.Facade;
};
},
_initConfigureData: function() {
o.GameLevelInfo = l;
},
_getPackageName: function() {
return "com.sencatech.game.oneline";
}
});
cc._RF.pop();
}, {
AppData: "AppData",
BaseView: "BaseView",
GameConst: "GameConst",
GameFacade: "GameFacade",
GameInitImp: "GameInitImp",
GameLevelInfo: "GameLevelInfo",
GameSound: "GameSound",
Proxy: "Proxy",
PushModule: "PushModule",
sc: "sc"
} ],
SpriteFrameSet: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8f8bcOgICZBLoQQ1aAT0ukF", "SpriteFrameSet");
var i = cc.Class({
name: "SpriteFrameSet",
properties: {
language: "",
spriteFrame: cc.SpriteFrame
}
});
t.exports = i;
cc._RF.pop();
}, {} ],
TitleChallenge: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7a2ddACP2JN6ZdNq+vwt+qg", "TitleChallenge");
cc.Class({
extends: cc.Component,
properties: {
maskNode: cc.Node,
timeLabel: cc.Label,
challengeSuccessCountLabel: cc.Label
},
onLoad: function() {
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.timeValue = -1;
this.maskNode.active = !0;
this.updateTimeLabel();
this.updateChallengedCount();
},
update: function(e) {
this.maskNode.active && this.updateTimeLabel();
},
updateTimeLabel: function() {
var e = this.data.getGameChallengeRecordTime(), t = Date.now(), n = Math.floor((t - e) / 1e3);
if (n > sc.GameConst.Configure.CHALLENGE_TIME) this.maskNode.active = !1; else if (this.timeValue !== n) {
this.timeValue = n;
var i = sc.GameConst.Configure.CHALLENGE_TIME - n;
i < 0 && (i = 0);
var o = Math.floor(i / 60), a = Math.floor(i % 60);
this.timeLabel.string = (10 <= o ? "" + o : "0" + o) + ":" + (10 <= a ? "" + a : "0" + a);
}
},
updateChallengedCount: function() {
this.challengeSuccessCountLabel.string = this.data.getChallengedCount().toString();
},
onClickChallenge: function(e) {
if (!(0 < e.getID())) {
sc.GameSound.buttonClick();
cc.find("Canvas/challengeView").getComponent("ChallengeView").showView();
}
}
});
cc._RF.pop();
}, {} ],
Title: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "146401e0OxFIKX9npj6Hxwn", "Title");
cc.Class({
extends: cc.Component,
properties: {
gradeProcessLabels: [ cc.Label ],
coinLabel: cc.Label,
todayRewardNode: cc.Node
},
onLoad: function() {
this.data = sc.Facade.retrieveProxy(sc.GameConst.GameProxy);
this.gradeProcessLabels.forEach(function(e, t) {
var n = this.data.getGradeProcess(t) + 1, i = sc.GameConst.Configure.GRADE_MAX_LEVEL[t];
i < n && (n = i);
e.string = n.toString() + "/" + i;
}, this);
this.currentCoinNumber = -1;
this.updateCoinView();
this.updateTodayRewardButtonState();
sc.PushModule.doRequestPushBigTexture();
},
update: function(e) {
this.updateCoinView();
this.updateTodayRewardButtonState();
},
onClickEnterGradeProcess: function(e, t) {
sc.GameSound.buttonClick();
if (!(0 < e.getID())) {
t = parseInt(t);
if (!isNaN(t) && 0 <= t && t < sc.GameConst.GRADE_MAX) {
this.data.setCurrentGrade(t);
cc.director.loadScene("level");
}
}
},
updateCoinView: function() {
if (this.currentCoinNumber !== this.data.getGameCoin()) {
this.currentCoinNumber = this.data.getGameCoin();
this.coinLabel.string = this.data.getGameCoin().toString();
}
},
onClickTodayReward: function(e) {
sc.GameSound.buttonClick();
0 < e.getID() || cc.find("Canvas/loginRewardView").getComponent("LoginRewardView").showView();
},
onClickLeaderBoard: function(e) {
sc.GameSound.buttonClick();
if (!(0 < e.getID())) {
var t = this.data.getChallengedCount();
sc.PushModule.doOpenLeaderBoard([ "CgkI4rj9474EEAIQAQ" ], [ t ]);
}
},
updateTodayRewardButtonState: function() {
this.todayRewardNode.active && this.data.isGameTodayReward() && (this.todayRewardNode.active = !1);
}
});
cc._RF.pop();
}, {} ],
ToastUtil: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "00e88Z4svJIJ40n/tO15m6T", "ToastUtil");
cc.Class({
extends: cc.Component,
statics: {
_instanceNode: null,
makeText: function(e) {
var t = new cc.Node();
t.addComponent(cc.Label).string = e;
this.makeNode(t);
},
makeSpriteFrame: function(e) {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = e;
this.makeNode(t);
},
makeNode: function(e) {
var t = cc.find("Canvas");
if (null !== t) {
if (null !== this._instanceNode) {
this._instanceNode.destroy();
this._instanceNode = null;
}
(this._instanceNode = e).parent = t;
e.position = cc.p(0, .5 * -t.height);
e.active = !0;
e.opacity = 0;
e.runAction(cc.sequence(cc.spawn(cc.fadeIn(.5), cc.moveBy(.8, cc.p(0, 100))), cc.delayTime(.5), cc.fadeOut(.2), cc.callFunc(function() {
this._instanceNode.destroy();
this._instanceNode = null;
}, this)));
} else {
e.destroy();
e = null;
}
}
},
properties: {}
});
cc._RF.pop();
}, {} ],
TouchComponent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a6d6834hftPhZQJ7SNsoEyb", "TouchComponent");
cc.Class({
extends: cc.Component,
properties: {
hadRegisterTouch: {
default: !1,
serializable: !1,
visible: !1
},
touchEnable: {
default: !0,
serializable: !1,
visible: !1
},
startTouchEnable: {
default: !1,
serializable: !1,
visible: !1
},
onTouchTarget: {
default: null,
serializable: !1,
visible: !1
},
onTouchStartEvent: {
default: null,
serializable: !1,
visible: !1
},
onTouchMoveEvent: {
default: null,
serializable: !1,
visible: !1
},
onTouchEndEvent: {
default: null,
serializable: !1,
visible: !1
},
onTouchCancelEvent: {
default: null,
serializable: !1,
visible: !1
}
},
onEnable: function() {
this.registerTouch();
},
onDisable: function() {
this.unregisterTouch();
},
registerTouch: function() {
if (!this.hadRegisterTouch) {
this.hadRegisterTouch = !0;
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
}
},
unregisterTouch: function() {
if (this.hadRegisterTouch) {
this.hadRegisterTouch = !1;
this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
}
},
followMe: function(e) {
var t = this.node.parent.convertTouchToNodeSpaceAR(e);
this.node.position = t;
},
_isInterrupt: function(e) {
return !this.touchEnable || !this.startTouchEnable;
},
onTouchStart: function(e) {
if (this.touchEnable && !this.startTouchEnable) {
this.startTouchEnable = !0;
this.callbackEvent(this.onTouchStartEvent, e);
}
},
onTouchMove: function(e) {
this._isInterrupt(e) || this.callbackEvent(this.onTouchMoveEvent, e);
},
onTouchEnd: function(e) {
if (!this._isInterrupt(e)) {
this.startTouchEnable = !1;
this.callbackEvent(this.onTouchEndEvent, e);
}
},
onTouchCancel: function(e) {
if (!this._isInterrupt(e)) {
this.startTouchEnable = !1;
this.callbackEvent(this.onTouchCancelEvent, e);
}
},
callbackEvent: function(e, t) {
null !== e && (null !== this.onTouchTarget ? e.call(this.onTouchTarget, t) : e(t));
},
setTouchEnable: function(e) {
this.touchEnable = e;
this.startTouchEnable = !1;
},
listenerTargetAndCallback: function(e, t, n, i, o) {
e && (this.onTouchTarget = e);
t && (this.onTouchStartEvent = t);
n && (this.onTouchMoveEvent = n);
i && (this.onTouchEndEvent = i);
o && (this.onTouchCancelEvent = o);
}
});
cc._RF.pop();
}, {} ],
TouchMap: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b5fa7FyIRlPqaQbtkNjdveU", "TouchMap");
var i = e("TouchComponent");
e("GameConst");
cc.Class({
extends: cc.Component,
properties: {
mCamera: cc.Camera,
rectNode: cc.Node,
mapNode: cc.Node
},
onLoad: function() {
this.touchScript = this.rectNode.addComponent(i);
this.touchScript.listenerTargetAndCallback(this, this.onTouchStart, this.onTouchMove, this.onTouchEnd, this.onTouchEnd);
this.mapScript = this.mapNode.getComponent("Map");
},
onTouchStart: function(e) {
this.preTouchState = null;
this.preTouchIndex = {
x: -1,
y: -1
};
0 < e.getID() || this.touchIndex(cc.Node.EventType.TOUCH_START, e);
},
onTouchMove: function(e) {
0 < e.getID() || this.touchIndex(cc.Node.EventType.TOUCH_MOVE, e);
},
onTouchEnd: function(e) {
0 < e.getID() || this.touchIndex(cc.Node.EventType.TOUCH_END, e);
},
touchIndex: function(e, t) {
var n = this.mCamera.getCameraToWorldPoint(t.getLocation()), i = this.rectNode.convertToNodeSpaceAR(n), o = Math.floor(i.x / 110), a = Math.floor(-i.y / 110);
this.mapScript.moveTouchPoint(i);
e === cc.Node.EventType.TOUCH_END && this.mapScript.hideTouchPoint();
if (this.preTouchState !== e || this.preTouchIndex.x !== a || this.preTouchIndex.y !== o) {
this.preTouchIndex = {
x: a,
y: o
};
this.mapScript.drawIndex(a, o);
sc.Facade.sendNotification(sc.GameConst.ON_INPUT_INDEX, {
touchType: e,
index: {
x: a,
y: o
},
locationPosition: i
});
}
}
});
cc._RF.pop();
}, {
GameConst: "GameConst",
TouchComponent: "TouchComponent"
} ],
UITopAdmobEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ccbeaS4NN5MxaSboMQjSo/S", "UITopAdmobEvent");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
editor: {
menu: "baby2/UITopAdmobEvent"
},
properties: {},
onLoad: function() {},
start: function() {
var e = this.getAd("banner");
if (e.isAvailable()) {
this.uiNodeWidget = this.node.getComponent(cc.Widget);
this.uiNodeWidgetTop = this.uiNodeWidget.top;
this.bannerEvent = e.addEventListener(this.onBannerEvent, this);
e.isViewVisible() ? this.onShowBannerView() : e.isLoaded() && this.getAdmob().setBannerStatus("banner", 1);
}
},
onDestroy: function() {
if (this.bannerEvent) {
this.getAd("banner").removeEventListener(this.bannerEvent);
this.bannerEvent = null;
}
},
getAdmob: function() {
return i.getProxy("admob");
},
getAd: function(e) {
return this.getAdmob().getAdMob(e);
},
onBannerEvent: function(e) {
var t = e.adFunction;
if (t && "onAdViewVisible" === t) {
this.getAd("banner").isViewVisible() ? this.onShowBannerView() : this.onHideBannerView();
}
},
onShowBannerView: function() {
var e = this.getAd("banner"), t = this.getGameVisibleHeight(e.getBannerSize().height);
cc.log("广告挤压下移了: %s", t);
this.uiNodeWidget.top = t;
this.uiNodeWidget.updateAlignment();
},
onHideBannerView: function() {
this.uiNodeWidget.top = this.uiNodeWidgetTop;
this.uiNodeWidget.updateAlignment();
},
getGameVisibleHeight: function(e) {
return this.getAdmob().getBannerBottomAtGameScene(e);
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
UITopNoAdmob: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cfa65nxbsBOpLN4H3juxCF1", "UITopNoAdmob");
var i = e("Proxy");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.hideBanner();
},
hideBanner: function() {
var e = this.getBanner();
e && e.isAvailable() && e.isLoaded() && e.isViewVisible() && i.getProxy("admob").setBannerStatus("banner", 0);
},
getBanner: function() {
this.banner || (this.banner = i.getProxy("admob").getAdMob("banner"));
return this.banner;
}
});
cc._RF.pop();
}, {
Proxy: "Proxy"
} ],
UIViewComponentMediator: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c74742opqdPwoaHoks5jVsM", "UIViewComponentMediator");
cc.Class({
extends: cc.Component,
properties: {},
onEnable: function() {},
onDisable: function() {
this.removeMediator();
},
listNotificationInterests: function() {
return [];
},
handleNotification: function(e) {},
registerMediator: function(e) {
if (!this.mediator) {
this.mediator = new i(cc.js.getClassName(this), this);
e.registerMediator(this.mediator);
}
},
removeMediator: function() {
if (this.mediator) {
this.mediator.getFacade().removeMediator(this.mediator.getMediatorName());
this.mediator = null;
}
}
});
var i = cc.Class({
extends: e("CCMediator"),
properties: {},
listNotificationInterests: function() {
return this.getViewComponent().listNotificationInterests();
},
handleNotification: function(e) {
this.getViewComponent().handleNotification(e);
}
});
cc._RF.pop();
}, {
CCMediator: "CCMediator"
} ],
VersionName: [ function(i, e, t) {
"use strict";
cc._RF.push(e, "a447b5pUeFNY6hm2h2q3Nuo", "VersionName");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = this.node.getComponent(cc.Label);
if (e) {
var t = i("GameInitImp");
if (t) {
var n = t.getInstance();
if (!n.isDebug()) {
this.node.active = !1;
return;
}
e.string = "v" + n.getVersionName() + " code:" + n.getVersionCode();
this.resetWidget();
}
} else this.node.active = !1;
},
resetWidget: function() {
var e = this.node.getComponent(cc.Widget);
null === e && (e = this.node.addComponent(cc.Widget));
e.left = 10;
e.bottom = 10;
e.isAlignLeft = !0;
e.isAlignBottom = !0;
e.updateAlignment();
}
});
cc._RF.pop();
}, {
GameInitImp: "GameInitImp"
} ],
WinSimulation: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3412b8vmmFKNKwbz91UkdWD", "WinSimulation");
var i = {
extends: null,
properties: {},
ctor: function() {
cc.log("WinSimulation init");
},
sendMessage: function(e, t) {
if (this[e]) {
cc.log("< %s > %s", e, JSON.stringify(t));
var n = this[e](t);
cc.log("( %s ) %s", e, JSON.stringify(n));
return n;
}
cc.log("windows 平台没有实现接口: %s", e);
return "{}";
},
EmitCallback: function(e, t) {
var n = cc.find("Canvas");
n ? n.runAction(cc.sequence(cc.delayTime(e), cc.callFunc(t, this))) : cc.log("ERROR: Canvas not find");
},
ReceiveHandleMessage: function(e, t) {
var n = JSON.stringify(t);
this.isDebugEnable() && cc.log("{%s} >= %s", e, n);
cc.GameApplication.NativeToJavascript(e, t);
},
WaitToReceive: function(e, t, n) {
this.EmitCallback(e, function() {
this.ReceiveHandleMessage(t, n);
});
}
}, o = null;
i.setTypeClass = function(e) {
o = e;
};
i.getTypeClass = function() {
return o;
};
t.exports = i;
cc._RF.pop();
}, {} ],
en: [ function(n, e, t) {
"use strict";
cc._RF.push(e, "d0e7bh2+y5IL4SfWIsCJin1", "en");
window.i18n || (window.i18n = {});
window.i18n.languages || (window.i18n.languages = {});
window.i18n.languages.en = {};
e.exports = {
language: window.i18n.languages.en,
load: function(e) {
for (var t in e) e.hasOwnProperty(t) && (this.language[t] = e[t]);
(function() {
var e = n("LanguageData"), t = window.i18n.curLang;
e.init("xx");
e.init(t);
})();
}
};
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ],
"es6-promise": [ function(B, n, i) {
(function(G, O) {
"use strict";
cc._RF.push(n, "bd79bDJ2udMC4Yu3RKze1N1", "es6-promise");
var e, t, D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
e = void 0, t = function() {
function u(e) {
return "function" == typeof e;
}
var n = Array.isArray ? Array.isArray : function(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}, i = 0, t = void 0, o = void 0, c = function(e, t) {
d[i] = e;
d[i + 1] = t;
2 === (i += 2) && (o ? o(p) : f());
};
var e = "undefined" != typeof window ? window : void 0, a = e || {}, s = a.MutationObserver || a.WebKitMutationObserver, r = "undefined" == typeof self && "undefined" != typeof G && "[object process]" === {}.toString.call(G), l = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
function h() {
var e = setTimeout;
return function() {
return e(p, 1);
};
}
var d = new Array(1e3);
function p() {
for (var e = 0; e < i; e += 2) {
(0, d[e])(d[e + 1]);
d[e] = void 0;
d[e + 1] = void 0;
}
i = 0;
}
var f = void 0;
f = r ? function() {
return G.nextTick(p);
} : s ? function() {
var e = 0, t = new s(p), n = document.createTextNode("");
t.observe(n, {
characterData: !0
});
return function() {
n.data = e = ++e % 2;
};
}() : l ? function() {
var e = new MessageChannel();
e.port1.onmessage = p;
return function() {
return e.port2.postMessage(0);
};
}() : void 0 === e && "function" == typeof B ? function() {
try {
var e = Function("return this")().require("vertx");
return "undefined" != typeof (t = e.runOnLoop || e.runOnContext) ? function() {
t(p);
} : h();
} catch (e) {
return h();
}
}() : h();
function m(e, t) {
var n = this, i = new this.constructor(y);
void 0 === i[v] && R(i);
var o = n._state;
if (o) {
var a = arguments[o - 1];
c(function() {
return L(o, i, a, n._result);
});
} else I(n, i, e, t);
return i;
}
function g(e) {
if (e && "object" === ("undefined" == typeof e ? "undefined" : D(e)) && e.constructor === this) return e;
var t = new this(y);
S(t, e);
return t;
}
var v = Math.random().toString(36).substring(2);
function y() {}
var C = void 0, b = 1, x = 2, w = {
error: null
};
function E(e) {
try {
return e.then;
} catch (e) {
w.error = e;
return w;
}
}
function N(e, t, n) {
if (t.constructor === e.constructor && n === m && t.constructor.resolve === g) a = e, 
(s = t)._state === b ? _(a, s._result) : s._state === x ? T(a, s._result) : I(s, void 0, function(e) {
return S(a, e);
}, function(e) {
return T(a, e);
}); else if (n === w) {
T(e, w.error);
w.error = null;
} else void 0 === n ? _(e, t) : u(n) ? (i = t, o = n, c(function(t) {
var n = !1, e = function(e, t, n, i) {
try {
e.call(t, n, i);
} catch (e) {
return e;
}
}(o, i, function(e) {
if (!n) {
n = !0;
i !== e ? S(t, e) : _(t, e);
}
}, function(e) {
if (!n) {
n = !0;
T(t, e);
}
}, t._label);
if (!n && e) {
n = !0;
T(t, e);
}
}, e)) : _(e, t);
var i, o, a, s;
}
function S(e, t) {
e === t ? T(e, new TypeError("You cannot resolve a promise with itself")) : (i = "undefined" == typeof (n = t) ? "undefined" : D(n), 
null === n || "object" !== i && "function" !== i ? _(e, t) : N(e, t, E(t)));
var n, i;
}
function A(e) {
e._onerror && e._onerror(e._result);
P(e);
}
function _(e, t) {
if (e._state === C) {
e._result = t;
e._state = b;
0 !== e._subscribers.length && c(P, e);
}
}
function T(e, t) {
if (e._state === C) {
e._state = x;
e._result = t;
c(A, e);
}
}
function I(e, t, n, i) {
var o = e._subscribers, a = o.length;
e._onerror = null;
o[a] = t;
o[a + b] = n;
o[a + x] = i;
0 === a && e._state && c(P, e);
}
function P(e) {
var t = e._subscribers, n = e._state;
if (0 !== t.length) {
for (var i = void 0, o = void 0, a = e._result, s = 0; s < t.length; s += 3) {
i = t[s];
o = t[s + n];
i ? L(n, i, o, a) : o(a);
}
e._subscribers.length = 0;
}
}
function L(e, t, n, i) {
var o = u(n), a = void 0, s = void 0, c = void 0, r = void 0;
if (o) {
if ((a = function(e, t) {
try {
return e(t);
} catch (e) {
w.error = e;
return w;
}
}(n, i)) === w) {
r = !0;
s = a.error;
a.error = null;
} else c = !0;
if (t === a) {
T(t, new TypeError("A promises callback cannot return that same promise."));
return;
}
} else {
a = i;
c = !0;
}
t._state !== C || (o && c ? S(t, a) : r ? T(t, s) : e === b ? _(t, a) : e === x && T(t, a));
}
var M = 0;
function R(e) {
e[v] = M++;
e._state = void 0;
e._result = void 0;
e._subscribers = [];
}
var F = function() {
function e(e, t) {
this._instanceConstructor = e;
this.promise = new e(y);
this.promise[v] || R(this.promise);
if (n(t)) {
this.length = t.length;
this._remaining = t.length;
this._result = new Array(this.length);
if (0 === this.length) _(this.promise, this._result); else {
this.length = this.length || 0;
this._enumerate(t);
0 === this._remaining && _(this.promise, this._result);
}
} else T(this.promise, new Error("Array Methods must be provided an Array"));
}
e.prototype._enumerate = function(e) {
for (var t = 0; this._state === C && t < e.length; t++) this._eachEntry(e[t], t);
};
e.prototype._eachEntry = function(t, e) {
var n = this._instanceConstructor, i = n.resolve;
if (i === g) {
var o = E(t);
if (o === m && t._state !== C) this._settledAt(t._state, e, t._result); else if ("function" != typeof o) {
this._remaining--;
this._result[e] = t;
} else if (n === k) {
var a = new n(y);
N(a, t, o);
this._willSettleAt(a, e);
} else this._willSettleAt(new n(function(e) {
return e(t);
}), e);
} else this._willSettleAt(i(t), e);
};
e.prototype._settledAt = function(e, t, n) {
var i = this.promise;
if (i._state === C) {
this._remaining--;
e === x ? T(i, n) : this._result[t] = n;
}
0 === this._remaining && _(i, this._result);
};
e.prototype._willSettleAt = function(e, t) {
var n = this;
I(e, void 0, function(e) {
return n._settledAt(b, t, e);
}, function(e) {
return n._settledAt(x, t, e);
});
};
return e;
}();
var k = function() {
function t(e) {
this[v] = M++;
this._result = this._state = void 0;
this._subscribers = [];
if (y !== e) {
"function" != typeof e && function() {
throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
}();
this instanceof t ? function(t, e) {
try {
e(function(e) {
S(t, e);
}, function(e) {
T(t, e);
});
} catch (e) {
T(t, e);
}
}(this, e) : function() {
throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}();
}
}
t.prototype.catch = function(e) {
return this.then(null, e);
};
t.prototype.finally = function(t) {
var n = this.constructor;
return this.then(function(e) {
return n.resolve(t()).then(function() {
return e;
});
}, function(e) {
return n.resolve(t()).then(function() {
throw e;
});
});
};
return t;
}();
k.prototype.then = m;
k.all = function(e) {
return new F(this, e).promise;
};
k.race = function(o) {
var a = this;
return n(o) ? new a(function(e, t) {
for (var n = o.length, i = 0; i < n; i++) a.resolve(o[i]).then(e, t);
}) : new a(function(e, t) {
return t(new TypeError("You must pass an array to race."));
});
};
k.resolve = g;
k.reject = function(e) {
var t = new this(y);
T(t, e);
return t;
};
k._setScheduler = function(e) {
o = e;
};
k._setAsap = function(e) {
c = e;
};
k._asap = c;
k.polyfill = function() {
var e = void 0;
if ("undefined" != typeof O) e = O; else if ("undefined" != typeof self) e = self; else try {
e = Function("return this")();
} catch (e) {
throw new Error("polyfill failed because global object is unavailable in this environment");
}
var t = e.Promise;
if (t) {
var n = null;
try {
n = Object.prototype.toString.call(t.resolve());
} catch (e) {}
if ("[object Promise]" === n && !t.cast) return;
}
e.Promise = k;
};
return k.Promise = k;
}, "object" === ("undefined" == typeof i ? "undefined" : D(i)) && "undefined" != typeof n ? n.exports = t() : "function" == typeof define && define.amd ? define(t) : e.ES6Promise = t();
cc._RF.pop();
}).call(this, B("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 1
} ],
md5: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b6104wWXJREf43gpO/hS3qi", "md5");
var o = 0, a = "", c = 8;
function i(e) {
return v(r(l(e), e.length * c));
}
function r(e, t) {
e[t >> 5] |= 128 << t % 32;
e[14 + (t + 64 >>> 9 << 4)] = t;
for (var n = 1732584193, i = -271733879, o = -1732584194, a = 271733878, s = 0; s < e.length; s += 16) {
var c = n, r = i, u = o, l = a;
i = f(i = f(i = f(i = f(i = p(i = p(i = p(i = p(i = d(i = d(i = d(i = d(i = h(i = h(i = h(i = h(i, o = h(o, a = h(a, n = h(n, i, o, a, e[s + 0], 7, -680876936), i, o, e[s + 1], 12, -389564586), n, i, e[s + 2], 17, 606105819), a, n, e[s + 3], 22, -1044525330), o = h(o, a = h(a, n = h(n, i, o, a, e[s + 4], 7, -176418897), i, o, e[s + 5], 12, 1200080426), n, i, e[s + 6], 17, -1473231341), a, n, e[s + 7], 22, -45705983), o = h(o, a = h(a, n = h(n, i, o, a, e[s + 8], 7, 1770035416), i, o, e[s + 9], 12, -1958414417), n, i, e[s + 10], 17, -42063), a, n, e[s + 11], 22, -1990404162), o = h(o, a = h(a, n = h(n, i, o, a, e[s + 12], 7, 1804603682), i, o, e[s + 13], 12, -40341101), n, i, e[s + 14], 17, -1502002290), a, n, e[s + 15], 22, 1236535329), o = d(o, a = d(a, n = d(n, i, o, a, e[s + 1], 5, -165796510), i, o, e[s + 6], 9, -1069501632), n, i, e[s + 11], 14, 643717713), a, n, e[s + 0], 20, -373897302), o = d(o, a = d(a, n = d(n, i, o, a, e[s + 5], 5, -701558691), i, o, e[s + 10], 9, 38016083), n, i, e[s + 15], 14, -660478335), a, n, e[s + 4], 20, -405537848), o = d(o, a = d(a, n = d(n, i, o, a, e[s + 9], 5, 568446438), i, o, e[s + 14], 9, -1019803690), n, i, e[s + 3], 14, -187363961), a, n, e[s + 8], 20, 1163531501), o = d(o, a = d(a, n = d(n, i, o, a, e[s + 13], 5, -1444681467), i, o, e[s + 2], 9, -51403784), n, i, e[s + 7], 14, 1735328473), a, n, e[s + 12], 20, -1926607734), o = p(o, a = p(a, n = p(n, i, o, a, e[s + 5], 4, -378558), i, o, e[s + 8], 11, -2022574463), n, i, e[s + 11], 16, 1839030562), a, n, e[s + 14], 23, -35309556), o = p(o, a = p(a, n = p(n, i, o, a, e[s + 1], 4, -1530992060), i, o, e[s + 4], 11, 1272893353), n, i, e[s + 7], 16, -155497632), a, n, e[s + 10], 23, -1094730640), o = p(o, a = p(a, n = p(n, i, o, a, e[s + 13], 4, 681279174), i, o, e[s + 0], 11, -358537222), n, i, e[s + 3], 16, -722521979), a, n, e[s + 6], 23, 76029189), o = p(o, a = p(a, n = p(n, i, o, a, e[s + 9], 4, -640364487), i, o, e[s + 12], 11, -421815835), n, i, e[s + 15], 16, 530742520), a, n, e[s + 2], 23, -995338651), o = f(o, a = f(a, n = f(n, i, o, a, e[s + 0], 6, -198630844), i, o, e[s + 7], 10, 1126891415), n, i, e[s + 14], 15, -1416354905), a, n, e[s + 5], 21, -57434055), o = f(o, a = f(a, n = f(n, i, o, a, e[s + 12], 6, 1700485571), i, o, e[s + 3], 10, -1894986606), n, i, e[s + 10], 15, -1051523), a, n, e[s + 1], 21, -2054922799), o = f(o, a = f(a, n = f(n, i, o, a, e[s + 8], 6, 1873313359), i, o, e[s + 15], 10, -30611744), n, i, e[s + 6], 15, -1560198380), a, n, e[s + 13], 21, 1309151649), o = f(o, a = f(a, n = f(n, i, o, a, e[s + 4], 6, -145523070), i, o, e[s + 11], 10, -1120210379), n, i, e[s + 2], 15, 718787259), a, n, e[s + 9], 21, -343485551);
n = m(n, c);
i = m(i, r);
o = m(o, u);
a = m(a, l);
}
return Array(n, i, o, a);
}
function u(e, t, n, i, o, a) {
return m((s = m(m(t, e), m(i, a))) << (c = o) | s >>> 32 - c, n);
var s, c;
}
function h(e, t, n, i, o, a, s) {
return u(t & n | ~t & i, e, t, o, a, s);
}
function d(e, t, n, i, o, a, s) {
return u(t & i | n & ~i, e, t, o, a, s);
}
function p(e, t, n, i, o, a, s) {
return u(t ^ n ^ i, e, t, o, a, s);
}
function f(e, t, n, i, o, a, s) {
return u(n ^ (t | ~i), e, t, o, a, s);
}
function s(e, t) {
var n = l(e);
16 < n.length && (n = r(n, e.length * c));
for (var i = Array(16), o = Array(16), a = 0; a < 16; a++) {
i[a] = 909522486 ^ n[a];
o[a] = 1549556828 ^ n[a];
}
var s = r(i.concat(l(t)), 512 + t.length * c);
return r(o.concat(s), 640);
}
function m(e, t) {
var n = (65535 & e) + (65535 & t);
return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
}
function l(e) {
for (var t = Array(), n = (1 << c) - 1, i = 0; i < e.length * c; i += c) t[i >> 5] |= (e.charCodeAt(i / c) & n) << i % 32;
return t;
}
function g(e) {
for (var t = "", n = (1 << c) - 1, i = 0; i < 32 * e.length; i += c) t += String.fromCharCode(e[i >> 5] >>> i % 32 & n);
return t;
}
function v(e) {
for (var t = o ? "0123456789ABCDEF" : "0123456789abcdef", n = "", i = 0; i < 4 * e.length; i++) n += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
return n;
}
function y(e) {
for (var t = "", n = 0; n < 4 * e.length; n += 3) for (var i = (e[n >> 2] >> n % 4 * 8 & 255) << 16 | (e[n + 1 >> 2] >> (n + 1) % 4 * 8 & 255) << 8 | e[n + 2 >> 2] >> (n + 2) % 4 * 8 & 255, o = 0; o < 4; o++) 8 * n + 6 * o > 32 * e.length ? t += a : t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >> 6 * (3 - o) & 63);
return t;
}
t.exports = {
hex_md5: i,
b64_md5: function(e) {
return y(r(l(e), e.length * c));
},
str_md5: function(e) {
return g(r(l(e), e.length * c));
},
hex_hmac_md5: function(e, t) {
return v(s(e, t));
},
b64_hmac_md5: function(e, t) {
return y(s(e, t));
},
str_hmac_md5: function(e, t) {
return g(s(e, t));
}
};
cc._RF.pop();
}, {} ],
"polyglot.min": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ad5f4fvKM9NZ6MkIZGsm6jD", "polyglot.min");
var i, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
i = void 0, o = function(t) {
function e(e) {
e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
this.allowMissing = !!e.allowMissing, this.warn = e.warn || n;
}
function o(e, t, n) {
var i, o, a, s, c, r, u;
return null != n && e ? (a = (o = e.split(l))[(s = t, c = n, h[(r = s, u = function(e) {
var t, n, i, o = {};
for (t in e) if (e.hasOwnProperty(t)) {
n = e[t];
for (i in n) o[n[i]] = t;
}
return o;
}(d), u[r] || u.en)](c))] || o[0], i = a.replace(/^\s+|\s+$/g, "")) : i = e, i;
}
function n(e) {
t.console && t.console.warn && t.console.warn("WARNING: " + e);
}
e.VERSION = "0.4.3", e.prototype.locale = function(e) {
return e && (this.currentLocale = e), this.currentLocale;
}, e.prototype.extend = function(e, t) {
var n;
for (var i in e) e.hasOwnProperty(i) && (n = e[i], t && (i = t + "." + i), "object" == ("undefined" == typeof n ? "undefined" : a(n)) ? this.extend(n, i) : this.phrases[i] = n);
}, e.prototype.clear = function() {
this.phrases = {};
}, e.prototype.replace = function(e) {
this.clear(), this.extend(e);
}, e.prototype.t = function(e, t) {
var n, i;
return "number" == typeof (t = null == t ? {} : t) && (t = {
smart_count: t
}), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
i = e), "string" == typeof n && (t = function(e) {
var t = {};
for (var n in e) t[n] = e[n];
return t;
}(t), i = function(e, t) {
for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
return e;
}(i = o(n, this.currentLocale, t.smart_count), t)), i;
}, e.prototype.has = function(e) {
return e in this.phrases;
};
var l = "||||", h = {
chinese: function(e) {
return 0;
},
german: function(e) {
return 1 !== e ? 1 : 0;
},
french: function(e) {
return 1 < e ? 1 : 0;
},
russian: function(e) {
return e % 10 == 1 && e % 100 != 11 ? 0 : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100) ? 1 : 2;
},
czech: function(e) {
return 1 === e ? 0 : 2 <= e && e <= 4 ? 1 : 2;
},
polish: function(e) {
return 1 === e ? 0 : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100) ? 1 : 2;
},
icelandic: function(e) {
return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
}
}, d = {
chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
french: [ "fr", "tl", "pt-br" ],
russian: [ "hr", "ru" ],
czech: [ "cs" ],
polish: [ "pl" ],
icelandic: [ "is" ]
};
return e;
}, "function" == typeof define && define.amd ? define([], function() {
return o(i);
}) : "object" == ("undefined" == typeof n ? "undefined" : a(n)) ? t.exports = o(i) : i.Polyglot = o(i);
cc._RF.pop();
}, {} ],
"puremvc-1.0.1": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "19504MDuUpKqK8RXQ8dtFPf", "puremvc-1.0.1");
(function(e) {
null == e && (e = window);
if (!e.puremvc) {
o.prototype.setNotifyMethod = function(e) {
this.notify = e;
};
o.prototype.setNotifyContext = function(e) {
this.context = e;
};
o.prototype.getNotifyMethod = function() {
return this.notify;
};
o.prototype.getNotifyContext = function() {
return this.context;
};
o.prototype.notifyObserver = function(e) {
this.getNotifyMethod().call(this.getNotifyContext(), e);
};
o.prototype.compareNotifyContext = function(e) {
return e === this.context;
};
o.prototype.notify = null;
o.prototype.context = null;
i.prototype.getName = function() {
return this.name;
};
i.prototype.setBody = function(e) {
this.body = e;
};
i.prototype.getBody = function() {
return this.body;
};
i.prototype.setType = function(e) {
this.type = e;
};
i.prototype.getType = function() {
return this.type;
};
i.prototype.toString = function() {
var e = "Notification Name: " + this.getName();
e += "\nBody:" + (null == this.body ? "null" : this.body.toString());
return e += "\nType:" + (null == this.type ? "null" : this.type);
};
i.prototype.name = null;
i.prototype.type = null;
i.prototype.body = null;
t.prototype.sendNotification = function(e, t, n) {
var i = this.getFacade();
i && i.sendNotification(e, t, n);
};
t.prototype.initializeNotifier = function(e) {
this.multitonKey = String(e);
this.facade = this.getFacade();
};
t.prototype.getFacade = function() {
if (null == this.multitonKey) throw new Error(t.MULTITON_MSG);
return r.getInstance(this.multitonKey);
};
t.prototype.multitonKey = null;
t.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
((n.prototype = new t()).constructor = n).prototype.execute = function(e) {};
((a.prototype = new t()).constructor = a).prototype.subCommands = null;
a.prototype.initializeMacroCommand = function() {};
a.prototype.addSubCommand = function(e) {
this.subCommands.push(e);
};
a.prototype.execute = function(e) {
for (;0 < this.subCommands.length; ) {
var t = new (this.subCommands.shift())();
t.initializeNotifier(this.multitonKey);
t.execute(e);
}
};
s.NAME = "Mediator";
((s.prototype = new t()).constructor = s).prototype.getMediatorName = function() {
return this.mediatorName;
};
s.prototype.setViewComponent = function(e) {
this.viewComponent = e;
};
s.prototype.getViewComponent = function() {
return this.viewComponent;
};
s.prototype.listNotificationInterests = function() {
return [];
};
s.prototype.handleNotification = function(e) {};
s.prototype.onRegister = function() {};
s.prototype.onRemove = function() {};
s.prototype.mediatorName = null;
s.prototype.viewComponent = null;
c.NAME = "Proxy";
((c.prototype = new t()).constructor = c).prototype.getProxyName = function() {
return this.proxyName;
};
c.prototype.setData = function(e) {
this.data = e;
};
c.prototype.getData = function() {
return this.data;
};
c.prototype.onRegister = function() {};
c.prototype.onRemove = function() {};
c.prototype.proxyName = null;
c.prototype.data = null;
r.prototype.initializeFacade = function() {
this.initializeModel();
this.initializeController();
this.initializeView();
};
r.getInstance = function(e) {
if (null == e) return null;
null == r.instanceMap[e] && (r.instanceMap[e] = new r(e));
return r.instanceMap[e];
};
r.prototype.initializeController = function() {
null == this.controller && (this.controller = d.getInstance(this.multitonKey));
};
r.prototype.initializeModel = function() {
null == this.model && (this.model = h.getInstance(this.multitonKey));
};
r.prototype.initializeView = function() {
null == this.view && (this.view = l.getInstance(this.multitonKey));
};
r.prototype.registerCommand = function(e, t) {
this.controller.registerCommand(e, t);
};
r.prototype.removeCommand = function(e) {
this.controller.removeCommand(e);
};
r.prototype.hasCommand = function(e) {
return this.controller.hasCommand(e);
};
r.prototype.registerProxy = function(e) {
this.model.registerProxy(e);
};
r.prototype.retrieveProxy = function(e) {
return this.model.retrieveProxy(e);
};
r.prototype.removeProxy = function(e) {
var t = null;
null != this.model && (t = this.model.removeProxy(e));
return t;
};
r.prototype.hasProxy = function(e) {
return this.model.hasProxy(e);
};
r.prototype.registerMediator = function(e) {
null != this.view && this.view.registerMediator(e);
};
r.prototype.retrieveMediator = function(e) {
return this.view.retrieveMediator(e);
};
r.prototype.removeMediator = function(e) {
var t = null;
null != this.view && (t = this.view.removeMediator(e));
return t;
};
r.prototype.hasMediator = function(e) {
return this.view.hasMediator(e);
};
r.prototype.sendNotification = function(e, t, n) {
this.notifyObservers(new i(e, t, n));
};
r.prototype.notifyObservers = function(e) {
null != this.view && this.view.notifyObservers(e);
};
r.prototype.initializeNotifier = function(e) {
this.multitonKey = e;
};
r.hasCore = function(e) {
return null != r.instanceMap[e];
};
r.removeCore = function(e) {
if (null != r.instanceMap[e]) {
h.removeModel(e);
l.removeView(e);
d.removeController(e);
delete r.instanceMap[e];
}
};
r.prototype.controller = null;
r.prototype.model = null;
r.prototype.view = null;
r.prototype.multitonKey = null;
r.instanceMap = [];
r.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
l.prototype.initializeView = function() {};
l.getInstance = function(e) {
if (null == e) return null;
null == l.instanceMap[e] && (l.instanceMap[e] = new l(e));
return l.instanceMap[e];
};
l.prototype.registerObserver = function(e, t) {
null != this.observerMap[e] ? this.observerMap[e].push(t) : this.observerMap[e] = [ t ];
};
l.prototype.notifyObservers = function(e) {
if (null != this.observerMap[e.getName()]) {
for (var t, n = this.observerMap[e.getName()], i = [], o = 0; o < n.length; o++) {
t = n[o];
i.push(t);
}
for (o = 0; o < i.length; o++) (t = i[o]).notifyObserver(e);
}
};
l.prototype.removeObserver = function(e, t) {
for (var n = this.observerMap[e], i = 0; i < n.length; i++) if (1 == n[i].compareNotifyContext(t)) {
n.splice(i, 1);
break;
}
0 == n.length && delete this.observerMap[e];
};
l.prototype.registerMediator = function(e) {
if (null == this.mediatorMap[e.getMediatorName()]) {
e.initializeNotifier(this.multitonKey);
var t = (this.mediatorMap[e.getMediatorName()] = e).listNotificationInterests();
if (0 < t.length) for (var n = new o(e.handleNotification, e), i = 0; i < t.length; i++) this.registerObserver(t[i], n);
e.onRegister();
}
};
l.prototype.retrieveMediator = function(e) {
return this.mediatorMap[e];
};
l.prototype.removeMediator = function(e) {
var t = this.mediatorMap[e];
if (t) {
for (var n = t.listNotificationInterests(), i = 0; i < n.length; i++) this.removeObserver(n[i], t);
delete this.mediatorMap[e];
t.onRemove();
}
return t;
};
l.prototype.hasMediator = function(e) {
return null != this.mediatorMap[e];
};
l.removeView = function(e) {
delete l.instanceMap[e];
};
l.prototype.mediatorMap = null;
l.prototype.observerMap = null;
l.instanceMap = [];
l.prototype.multitonKey = null;
l.MULTITON_MSG = "View instance for this Multiton key already constructed!";
h.prototype.initializeModel = function() {};
h.getInstance = function(e) {
if (null == e) return null;
null == h.instanceMap[e] && (h.instanceMap[e] = new h(e));
return h.instanceMap[e];
};
h.prototype.registerProxy = function(e) {
e.initializeNotifier(this.multitonKey);
(this.proxyMap[e.getProxyName()] = e).onRegister();
};
h.prototype.retrieveProxy = function(e) {
return this.proxyMap[e];
};
h.prototype.hasProxy = function(e) {
return null != this.proxyMap[e];
};
h.prototype.removeProxy = function(e) {
var t = this.proxyMap[e];
if (t) {
this.proxyMap[e] = null;
t.onRemove();
}
return t;
};
h.removeModel = function(e) {
delete h.instanceMap[e];
};
h.prototype.proxyMap = null;
h.instanceMap = [];
h.MULTITON_MSG = "Model instance for this Multiton key already constructed!";
d.prototype.initializeController = function() {
this.view = l.getInstance(this.multitonKey);
};
d.getInstance = function(e) {
if (null == e) return null;
null == this.instanceMap[e] && (this.instanceMap[e] = new this(e));
return this.instanceMap[e];
};
d.prototype.executeCommand = function(e) {
var t = this.commandMap[e.getName()];
if (null != t) {
var n = new t();
n.initializeNotifier(this.multitonKey);
n.execute(e);
}
};
d.prototype.registerCommand = function(e, t) {
null == this.commandMap[e] && this.view.registerObserver(e, new o(this.executeCommand, this));
this.commandMap[e] = t;
};
d.prototype.hasCommand = function(e) {
return null != this.commandMap[e];
};
d.prototype.removeCommand = function(e) {
if (this.hasCommand(e)) {
this.view.removeObserver(e, this);
this.commandMap[e] = null;
}
};
d.removeController = function(e) {
delete this.instanceMap[e];
};
d.prototype.view = null;
d.prototype.commandMap = null;
d.prototype.multitonKey = null;
d.instanceMap = [];
d.MULTITON_MSG = "controller key for this Multiton key already constructed";
var u = {
global: function() {
return this;
}(),
extend: function(e, t) {
if ("function" != typeof e) throw new TypeError("#extend- child should be Function");
if ("function" != typeof t) throw new TypeError("#extend- parent should be Function");
if (t !== e) {
var n = new Function();
n.prototype = t.prototype;
e.prototype = new n();
return e.prototype.constructor = e;
}
},
decorate: function(e, t) {
for (var n in t) e[n] = t[n];
return e;
}
};
e.puremvc = {
View: l,
Model: h,
Controller: d,
SimpleCommand: n,
MacroCommand: a,
Facade: r,
Mediator: s,
Observer: o,
Notification: i,
Notifier: t,
Proxy: c,
define: function(e, t, n) {
e || (e = {});
var i, o, a = e.name, s = e.parent, c = "function" == typeof s, r = e.scope || null;
if ("parent" in e && !c) throw new TypeError("Class parent must be Function");
if (e.hasOwnProperty("constructor")) {
if ("function" != typeof (i = e.constructor)) throw new TypeError("Class constructor must be Function");
} else i = c ? function() {
s.apply(this, arguments);
} : new Function();
c && u.extend(i, s);
if (t) {
o = i.prototype;
u.decorate(o, t);
o.constructor = i;
}
n && u.decorate(i, n);
if (a) {
if ("string" != typeof a) throw new TypeError("Class name must be primitive string");
p(a, i, r);
}
return i;
},
declare: p
};
}
function o(e, t) {
this.setNotifyMethod(e);
this.setNotifyContext(t);
}
function i(e, t, n) {
this.name = e;
this.body = t;
this.type = n;
}
function t() {}
function n() {}
function a() {
this.subCommands = [];
this.initializeMacroCommand();
}
function s(e, t) {
this.mediatorName = e || this.constructor.NAME;
this.viewComponent = t;
}
function c(e, t) {
this.proxyName = e || this.constructor.NAME;
null != t && this.setData(t);
}
function r(e) {
if (null != r.instanceMap[e]) throw new Error(r.MULTITON_MSG);
this.initializeNotifier(e);
(r.instanceMap[e] = this).initializeFacade();
}
function l(e) {
if (null != l.instanceMap[e]) throw new Error(l.MULTITON_MSG);
this.multitonKey = e;
(l.instanceMap[this.multitonKey] = this).mediatorMap = [];
this.observerMap = [];
this.initializeView();
}
function h(e) {
if (h.instanceMap[e]) throw new Error(h.MULTITON_MSG);
this.multitonKey = e;
(h.instanceMap[e] = this).proxyMap = [];
this.initializeModel();
}
function d(e) {
if (null != d.instanceMap[e]) throw new Error(d.MULTITON_MSG);
this.multitonKey = e;
(d.instanceMap[this.multitonKey] = this).commandMap = new Array();
this.initializeController();
}
function p(e, t, n) {
for (var i, o, a = e.split("."), s = n || u.global, c = 0, r = a.length; c < r; c++) s = null == (i = s)[o = a[c]] ? s[o] = {} : s[o];
return null == t ? s : i[o] = t;
}
})(void 0);
cc._RF.pop();
}, {} ],
scHelper: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2d4baVRJDZNX4KXCSflNqMd", "scHelper");
var i = {
setParent: function(e, t) {
var n = e.convertToWorldSpaceAR(cc.p(0, 0));
e.parent = t;
e.position = t.convertToNodeSpaceAR(n);
},
setSiblingIndexFirst: function(e) {
e.setSiblingIndex(0);
},
setSiblingIndexLast: function(e) {
e.setSiblingIndex(e.parent.children.length - 1);
},
setPosition: function(e, t) {
var n = t.convertToWorldSpaceAR(cc.p(0, 0));
e.position = e.parent.convertToNodeSpaceAR(n);
},
setPositionFromWorld: function(e, t) {
e.position = e.parent.convertToNodeSpaceAR(t);
},
convertNodePosition: function(e, t) {
return e.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.p(0, 0)));
},
randomOnce: function(e) {
null !== e && 0 !== e.length || cc.error("array 非法");
var t = Math.floor(1e4 * cc.random0To1()) % e.length, n = e[t];
e.splice(t, 1);
return n;
},
randomTake: function(e) {
var t = e;
null !== t && 0 !== t.length || cc.error("array 非法");
return t[Math.floor(1e4 * cc.random0To1()) % t.length];
},
addButtonEvent: function(e, t, n, i) {
if (e) {
var o = new cc.Component.EventHandler();
o.target = t.node;
o.component = cc.js.getClassName(t);
o.handler = n;
o.customEventData = "undefined" == typeof i ? "" : i;
e.clickEvents.push(o);
}
}
};
t.exports = i;
cc._RF.pop();
}, {} ],
sc: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "174f7hLWUtG2bvlRoLUnb7o", "sc");
(function() {
window.sc = window.sc ? window.sc : {};
window.sc.Game = window.sc.Game ? window.sc.Game : {};
})();
t.exports = window.sc;
cc._RF.pop();
}, {} ],
"state-machine": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5718eTAqZVKF4nYKclwMOCb", "state-machine");
(function() {
var d = {
VERSION: "2.4.0",
Result: {
SUCCEEDED: 1,
NOTRANSITION: 2,
CANCELLED: 3,
PENDING: 4
},
Error: {
INVALID_TRANSITION: 100,
PENDING_TRANSITION: 200,
INVALID_CALLBACK: 300
},
WILDCARD: "*",
ASYNC: "async",
create: function(e, t) {
var n = "string" == typeof e.initial ? {
state: e.initial
} : e.initial, i = e.terminal || e.final, o = t || e.target || {}, a = e.events || [], s = e.callbacks || {}, c = {}, r = {}, u = function(e) {
var t = Array.isArray(e.from) ? e.from : e.from ? [ e.from ] : [ d.WILDCARD ];
c[e.name] = c[e.name] || {};
for (var n = 0; n < t.length; n++) {
r[t[n]] = r[t[n]] || [];
r[t[n]].push(e.name);
c[e.name][t[n]] = e.to || t[n];
}
e.to && (r[e.to] = r[e.to] || []);
};
if (n) {
n.event = n.event || "startup";
u({
name: n.event,
from: "none",
to: n.state
});
}
for (var l = 0; l < a.length; l++) u(a[l]);
for (var h in c) c.hasOwnProperty(h) && (o[h] = d.buildEvent(h, c[h]));
for (var h in s) s.hasOwnProperty(h) && (o[h] = s[h]);
o.current = "none";
o.is = function(e) {
return Array.isArray(e) ? 0 <= e.indexOf(this.current) : this.current === e;
};
o.can = function(e) {
return !this.transition && void 0 !== c[e] && (c[e].hasOwnProperty(this.current) || c[e].hasOwnProperty(d.WILDCARD));
};
o.cannot = function(e) {
return !this.can(e);
};
o.transitions = function() {
return (r[this.current] || []).concat(r[d.WILDCARD] || []);
};
o.isFinished = function() {
return this.is(i);
};
o.error = e.error || function(e, t, n, i, o, a, s) {
throw s || a;
};
o.states = function() {
return Object.keys(r).sort();
};
n && !n.defer && o[n.event]();
return o;
},
doCallback: function(t, e, n, i, o, a) {
if (e) try {
return e.apply(t, [ n, i, o ].concat(a));
} catch (e) {
return t.error(n, i, o, a, d.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
}
},
beforeAnyEvent: function(e, t, n, i, o) {
return d.doCallback(e, e.onbeforeevent, t, n, i, o);
},
afterAnyEvent: function(e, t, n, i, o) {
return d.doCallback(e, e.onafterevent || e.onevent, t, n, i, o);
},
leaveAnyState: function(e, t, n, i, o) {
return d.doCallback(e, e.onleavestate, t, n, i, o);
},
enterAnyState: function(e, t, n, i, o) {
return d.doCallback(e, e.onenterstate || e.onstate, t, n, i, o);
},
changeState: function(e, t, n, i, o) {
return d.doCallback(e, e.onchangestate, t, n, i, o);
},
beforeThisEvent: function(e, t, n, i, o) {
return d.doCallback(e, e["onbefore" + t], t, n, i, o);
},
afterThisEvent: function(e, t, n, i, o) {
return d.doCallback(e, e["onafter" + t] || e["on" + t], t, n, i, o);
},
leaveThisState: function(e, t, n, i, o) {
return d.doCallback(e, e["onleave" + n], t, n, i, o);
},
enterThisState: function(e, t, n, i, o) {
return d.doCallback(e, e["onenter" + i] || e["on" + i], t, n, i, o);
},
beforeEvent: function(e, t, n, i, o) {
if (!1 === d.beforeThisEvent(e, t, n, i, o) || !1 === d.beforeAnyEvent(e, t, n, i, o)) return !1;
},
afterEvent: function(e, t, n, i, o) {
d.afterThisEvent(e, t, n, i, o);
d.afterAnyEvent(e, t, n, i, o);
},
leaveState: function(e, t, n, i, o) {
var a = d.leaveThisState(e, t, n, i, o), s = d.leaveAnyState(e, t, n, i, o);
return !1 !== a && !1 !== s && (d.ASYNC === a || d.ASYNC === s ? d.ASYNC : void 0);
},
enterState: function(e, t, n, i, o) {
d.enterThisState(e, t, n, i, o);
d.enterAnyState(e, t, n, i, o);
},
buildEvent: function(a, s) {
return function() {
var e = this.current, t = s[e] || (s[d.WILDCARD] != d.WILDCARD ? s[d.WILDCARD] : e) || e, n = Array.prototype.slice.call(arguments);
if (this.transition) return this.error(a, e, t, n, d.Error.PENDING_TRANSITION, "event " + a + " inappropriate because previous transition did not complete");
if (this.cannot(a)) return this.error(a, e, t, n, d.Error.INVALID_TRANSITION, "event " + a + " inappropriate in current state " + this.current);
if (!1 === d.beforeEvent(this, a, e, t, n)) return d.Result.CANCELLED;
if (e === t) {
d.afterEvent(this, a, e, t, n);
return d.Result.NOTRANSITION;
}
var i = this;
this.transition = function() {
i.transition = null;
i.current = t;
d.enterState(i, a, e, t, n);
d.changeState(i, a, e, t, n);
d.afterEvent(i, a, e, t, n);
return d.Result.SUCCEEDED;
};
this.transition.cancel = function() {
i.transition = null;
d.afterEvent(i, a, e, t, n);
};
var o = d.leaveState(this, a, e, t, n);
if (!1 === o) {
this.transition = null;
return d.Result.CANCELLED;
}
return d.ASYNC === o ? d.Result.PENDING : this.transition ? this.transition() : void 0;
};
}
};
if ("undefined" != typeof n) {
"undefined" != typeof t && t.exports && (n = t.exports = d);
n.StateMachine = d;
} else "function" == typeof define && define.amd ? define(function(e) {
return d;
}) : "undefined" != typeof window ? window.StateMachine = d : "undefined" != typeof self && (self.StateMachine = d);
})();
cc._RF.pop();
}, {} ],
zh: [ function(n, e, t) {
"use strict";
cc._RF.push(e, "36082fbd/lHNp3qXrFPaGF7", "zh");
window.i18n || (window.i18n = {});
window.i18n.languages || (window.i18n.languages = {});
window.i18n.languages.zh = {};
e.exports = {
language: window.i18n.languages.zh,
load: function(e) {
for (var t in e) e.hasOwnProperty(t) && (this.language[t] = e[t]);
(function() {
var e = n("LanguageData"), t = window.i18n.curLang;
e.init("xx");
e.init(t);
})();
}
};
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ]
}, {}, [ "AppData", "AppStorage", "ApplicationBehavior", "JavascriptBridgeNative", "JavascriptBridgeReceive", "Platform", "WinSimulation", "GameInitProtocol", "CollisionProxy", "GameInitImp", "GameMultiFinger", "GameQuitOnButton", "KeyEventComponent", "LanguageShowFrame", "LanguageShowNode", "PanelView", "PreventMultiTouch", "Ruler", "SplashFadeIn", "TouchComponent", "VersionName", "DragonBonesAnimationEvent", "GameApplication", "Iap", "state-machine", "Baby2AdaptationStrategy", "LangauageSprite", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "en", "zh", "polyglot.min", "es6-promise", "CCFacade", "CCMacroCommand", "CCMediator", "CCProxy", "CCSimpleCommand", "UIViewComponentMediator", "puremvc-1.0.1", "LoopSound", "NoRepeatSound", "MessageCenter", "NodePool", "Observer", "Proxy", "md5", "scHelper", "AppInfo", "InternalPush", "InternalWebMainFrame", "PushAdapterWH", "PushBigTexturePointMgr", "PushEditorApp", "PushLayoutItem", "PushMonitorBanner", "PushMoreGame", "PushView", "PushViewBigTexture", "Ad", "AdMob", "UITopAdmobEvent", "UITopNoAdmob", "AppReviews", "AppReviewsPanelView", "AppStore", "LocalizationTextKey", "PushClickCloseView", "CommandAppLanaguageEn", "CommandAppLanaguageZh", "PushLocalizedLabel", "PushLocalizedSprite", "PushModule", "GameLevelInfo", "BaseCommand", "BaseMediator", "BaseView", "GamePanel", "GameUtil", "ResPool", "sc", "OnEnterGame", "AdsPlugin", "AdsSplash", "AdsTop", "Autorotation", "BackKeyExit", "ButtonExit", "ButtonSound", "PushModulePC", "ToastUtil", "GameConst", "GameFacade", "GameSound", "GameProxy", "BlockResColor", "Cell", "ChallengeFailed", "ChallengeManager", "ChallengeSuccess", "ChallengeView", "CoinGetView", "DebugView", "GameManager", "GameManagerMediator", "GradeTitleShow", "LayoutManager", "LevelItem", "LevelManager", "LoginRewardView", "Map", "NormalManager", "NormalOverView", "Splash", "Title", "TitleChallenge", "TouchMap" ]);