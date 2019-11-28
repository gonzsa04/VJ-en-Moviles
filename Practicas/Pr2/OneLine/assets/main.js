var printfConsoleLogMain = function(str) {
    //console.log (str);
}

var mMainGameSencatech = {
    defaultEnter: "src/Application.js",
    android_base_activity: "com/sencatech/game/BaseGamePlayerActivity",
    android_reflection_result: "()Ljava/lang/String;",

    android_reflection_getgamepath: "getRunningGamePath",
    android_reflection_getenterfile: "getGameEntranceFile",
    android_reflection_getgamepackage: "getRunningGamePackageName",

    log_getgamepath_result: "from [android-java] getRunningGamePath() >= %s",

    _game_path: "",
    _game_enter: "",

    end_class: 0
};

var initGameEnvironmentMain = function () {
    mMainGameSencatech._game_enter = mMainGameSencatech.defaultEnter;

    if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
        printfConsoleLogMain ("android get game path function begin");

        var o = jsb.reflection.callStaticMethod(mMainGameSencatech.android_base_activity,
            mMainGameSencatech.android_reflection_getgamepath,
            mMainGameSencatech.android_reflection_result);
        if (null != o) {
            mMainGameSencatech._game_path = o;
            printfConsoleLogMain("game get GameDirPath: " + o);
        } else {
            printfConsoleLogMain("game get game dir error");
        }

        var entry = jsb.reflection.callStaticMethod(mMainGameSencatech.android_base_activity,
            mMainGameSencatech.android_reflection_getenterfile,
            mMainGameSencatech.android_reflection_result);
        if (entry != null) {
            mMainGameSencatech._game_enter = entry;
            printfConsoleLogMain("game get enterScript: " + entry);
        } else {
            printfConsoleLogMain("game get enter script error");
        }
    }

    if (cc.sys.isNative) {
        var searchPaths = jsb.fileUtils.getSearchPaths();
        searchPaths.push('script');

        if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX ||
            cc.sys.os == cc.sys.OS_WINDOWS) {
            searchPaths.push("res");
            searchPaths.push("src");
            printfConsoleLogMain("windows os");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            searchPaths.push(mMainGameSencatech._game_path);
            searchPaths.push(mMainGameSencatech._game_path + "src/");
            searchPaths.push(mMainGameSencatech._game_path + "res/");
        }
        jsb.fileUtils.setSearchPaths(searchPaths);
    }
};


var emitFirstSceneLauncherEventMain = function () {
    cc.director.once(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, function () {
        printfConsoleLogMain ("第一次场景启动之后的事件:");
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("com/sencatech/bridging/Bridging",
                "Cocos2dxBridge",
                "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
                "applicationFirstSceneLauncher",
                "{}");
        }
    });
};


//(function () {
//    printfConsoleLogMain("init environment before");
//    initGameEnvironmentMain();
//    printfConsoleLogMain("init environment late");
//    printfConsoleLogMain("new game enter function !! " + mMainGameSencatech._game_enter);
//    require(mMainGameSencatech._game_enter);
//    emitFirstSceneLauncherEventMain();
//})();


(function() {
    require("src/main.js");
    emitFirstSceneLauncherEventMain();
})();