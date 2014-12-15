/*
// Random User-Agent
// Automatically change User-agent in given time-interval to random.
//
// Copyright (C) 2014 by Samoylov Nikolay <samoylovnn {d0g} gmail {d0t} com>
// MIT License
// http://github.com/tarampampam/random-user-agent/raw/master/LICENSE
*/

//'use strict';

/* REGEXP by randexp/min.js :: http://goo.gl/nvbFrQ */
/* USERAGENTs lists :: http://goo.gl/WNHq4o , http://goo.gl/1uy4ZG */

var rLocale   = 'en-(US|AU|CA|IN|IE|MT|NZ|PH|SG|ZA|GB|US)',
    rDotClr   = '( \\.NET CLR [2-3]\\.[1-8]\\.[3-5]07[0-9][0-9]\\;|)',
    rDotClr12 = '( \\.NET CLR [1-2]\\.[0-1]\\.[4-5]07[0-5][0-9]\\;|)',
    rMedSrv   = '( Media Center PC [4-6]\\.0\\;|)',
    rOSwin68  = 'Windows NT [6-8]\\.[0-1]',
    rOSwin56  = 'Windows NT (5|5|6)\\.[0-1]',
    rOSmacGnd = 'Intel Mac OS X 10_[6-8]_[2-8]',
    rOSmacDot = 'Intel Mac OS X 10\\.[5-8]',
    rOSlinux  = '(NetBSD amd64|Linux amd64|Linux x86_64|Ubuntu\\; Linux|SunOS sun4u)',
    rChrome3x = 'Chrome\\/3[1-7]\\.0\\.20[0-4][0-9]\\.[1-9][0-9]',
    rOpera    = 'Opera\\/(9|1[0-2])\\.(([5-6]0|0)|80)',
    
    userAgents = {
        "IE10": {
            "name": "Internet Explorer 10",
            "regexp": "Mozilla\\/5\\.0 \\(compatible\\; MSIE 10\\.0\\; "+
                      rOSwin68+"\\;( InfoPath\\.[2-3]\\;|)"+rDotClr+" (WOW64\\; |)"+
                      "Trident\\/[5-6]\\.0(\\; "+rLocale+"|)\\)"
        },
        "IE9": {
            "name": "Internet Explorer 9",
            "regexp": "Mozilla\\/5\\.0 \\((compatible|Windows\\; U)\\; MSIE 9\\.0\\; "+
                      rOSwin68+"\\; (Win64\\; x64\\; |WOW64\\; |)"+
                      "Trident\\/[5-4]\\.0;"+rDotClr+rMedSrv+"( Zune 4\\.[0-7]\\;|||)( \\.NET4\\.0(C|E)\\;) "+rLocale+"\\)"
        },
        "IE8": {
            "name": "Internet Explorer 8",
            "regexp": "Mozilla\\/(5|5|4)\\.0 \\(compatible\\; MSIE 8\\.0\\; "+rOSwin56+"\\; "+
                      "Trident\\/4\\.0\\; (WOW64|WOW64|GTB7\\.[2-6])\\; InfoPath\\.[2-3]\\;( SV1\\;|)"+rDotClr+" "+rLocale+"\\)"
        },
        "IE7": {
            "name": "Internet Explorer 7",
            "regexp": "Mozilla\\/(5|4|4)\\.0 \\((compatible|compatible|Windows\\; U)\\; MSIE 7\\.0\\; "+rOSwin56+"\\;"+
                      "( WOW64\\;|)"+rDotClr+rMedSrv+" InfoPath\\.[1-3]; "+rLocale+"\\)"
        },
        "IE6": {
            "name": "Internet Explorer 6",
            "regexp": "Mozilla\\/4\\.0 \\(compatible\\; MSIE 6\\.0\\; Windows NT 5\\.[0-1]\\;( SV1\\;||)"+rDotClr12+" "+rLocale+"\\)"
        },
        "ChromeWin": {
            "name": "Chrome on Windows",
            "regexp": "Mozilla\\/5\\.0 \\("+rOSwin68+"(\\; Win64\\; x64|\\; WOW64|)\\) "+
                      "AppleWebKit/(53[6-7]\\.[1-3][1-7]) \\(KHTML, like Gecko\\) "+rChrome3x+" Safari\\/(\\2)"
        },
        "ChromeMac": {
            "name": "Chrome on Mac",
            "regexp": "Mozilla\\/5\\.0 \\(Macintosh\\; "+rOSmacGnd+"\\) "+
                      "AppleWebKit\\/(53[6-7]\\.[1-3][1-7]) \\(KHTML, like Gecko\\) "+rChrome3x+" Safari\\/(\\1)"
        },
        "ChromeLin": {
            "name": "Chrome on Linux",
            "regexp": "Mozilla\\/5\\.0 \\(X11\\;( U\\; | )Linux (x86_64|i686)\\) "+
                      "AppleWebKit\\/(53[6-7]\\.[1-3][1-7]) \\(KHTML, like Gecko\\) "+rChrome3x+" Safari\\/(\\3)"
        },
        "FFWin": {
            "name": "FireFox on Windows",
            "regexp": "Mozilla\\/5\\.0 \\("+rOSwin68+"\\; (WOW64|Win64)\\; rv:(2[0-5]\\.0)\\) Gecko\\/20100101 Firefox\\/(\\2)"
        },
        "FFMac": {
            "name": "FireFox on Mac",
            "regexp": "Mozilla\\/5\\.0 \\(Macintosh\\;( U\\; | )"+rOSmacDot+"\\; rv:(2[0-5]\\.0)\\) Gecko\\/20100101 Firefox\\/(\\2)"
        },
        "FFLin": {
            "name": "FireFox on Linux",
            "regexp": "Mozilla\\/5\\.0 \\(X11\\; "+rOSlinux+"\\; rv:(2[0-5]\\.0)\\) Gecko\\/20100101 Firefox\\/(\\2)"
        },
        "SafariMac": {
            "name": "Safari on Windows",
            "regexp": "Mozilla\\/5\\.0 \\(Windows\\; U\\; "+rOSwin68+"\\; "+rLocale+"\\) "+
                      "AppleWebKit\\/(5[2-3][2-8]\\.[1-2][0-9](\\.[1-3][0-9]|)) "+
                      "\\(KHTML, like Gecko\\) Version\\/5\\.0(\\.[2-4]) Safari\\/(\\2)"
        },
        "SafariWin": {
            "name": "Safari on Mac",
            "regexp": "Mozilla\\/5\\.0 \\(Macintosh\\;( U\\; | )"+rOSmacGnd+"\\; "+rLocale+"\\) "+
                      "AppleWebKit\\/(5[2-3][2-8]\\.[1-2][0-9](\\.[1-3][0-9]|)) "+
                      "\\(KHTML, like Gecko\\)( Version\\/5\\.0(\\.[2-4]) | )Safari\\/(\\3)"
        },
        "SafariLin": {
            "name": "Safari on Linux",
            "regexp": "Mozilla\\/5\\.0 \\(X11\\; "+rOSlinux+"\\; "+rLocale+"\\) "+
                      "AppleWebKit\\/(5[2-3][2-8]\\.[1-2][0-9](\\.[1-3][0-9]|)) "+
                      "\\(KHTML, like Gecko\\)( Version\\/5\\.0(\\.[2-4]) | )Safari\\/(\\3)"
        },
        "OperaMac": {
            "name": "Opera on Windows",
            "regexp": rOpera+" (\\(compatible\\; MSIE 9\\.0\\; |\\()"+rOSwin68+"\\; "+rLocale+"\\) "+
                      "Presto\\/(2\\.(9|1[1-2])\\.([1-3]|)[0-9][0-9]) Version\\/1[1-2]\\.(1|[5-6])[0-2]"
        },
        "OperaWin": {
            "name": "Opera on Mac",
            "regexp": rOpera+" \\(Macintosh\\; "+rOSmacDot+"\\;( U\\; | )"+rLocale+"\\) "+
                      "Presto\\/(2\\.(9|1[1-2])\\.([1-3]|)[0-9][0-9]) Version\\/1[1-2]\\.(1|[5-6])[0-2]"
        },
        "OperaLin": {
            "name": "Opera on Linux",
            "regexp": rOpera+" \\(X11\\; Linux (i686|x86_64)\\; U\\; "+rLocale+"\\) "+
                      "Presto\\/(2\\.(9|1[1-2])\\.([1-3]|)[0-9][0-9]) Version\\/1[1-2]\\.(1|[5-6])[0-2]"
        },
        "iPhone": {
            "name": "Safari on iPhone",
            "regexp": "Mozilla\\/5\\.0 \\(iPhone\\; U\\; CPU iPhone OS 4_[2-3]_[1-3] like Mac OS X\\; "+rLocale+"\\) "+
                      "AppleWebKit/(53[3-5]\\.[1-3][1-7])\\.(9|1[0-1]) \\(KHTML, like Gecko\\) "+
                      "Version\\/5\\.0\\.2 Mobile\\/8(J|F|C)[1-4](8a|90|) Safari\\/6533\\.18\\.5"
        },
        "iPad": {
            "name": "Safari on iPad",
            "regexp": "Mozilla\\/5\\.0 \\(iPad\\;( U\\;|) CPU OS [3-6]_[0-2](_2|) like Mac OS X(\\; "+rLocale+"|)\\) "+
                      "AppleWebKit/(53[1-6]\\.[1-2][1-7])(\\.(9|1[0-1])|) \\(KHTML, like Gecko\\) "+
                      "Version\\/[4-6]\\.[0-1](\\.4|) Mobile\\/8(J|F|C)[1-4](8a|90|) Safari\\/([7-8]|)53[1-6]\\.2[0-1](\\.10|)"
        }
    };



// GUI
/* -------------------------------------------------------------------------- */

function setExtensionIcon(state){ // main update icon function is getTimerEnable()
    var imageName = '';
    switch (state) {
       case 'active':
          imageName = 'img/48x48.png';
          break;
       case 'inactive':
          imageName = 'img/48x48g.png';
          break;
       default:
          imageName = 'img/48x48.png';
          break;
    }
    chrome.browserAction.setIcon({path: imageName}, function(){});
    return;
}

/* -------------------------------------------------------------------------- */

// Customize 'console.info()' output
// http://stackoverflow.com/questions/18410119/is-it-possible-to-bind-a-date-time-to-a-console-log
console.infoCopy = console.info.bind(console);
console.info = function(data) {
    var now = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var timestamp = '[' + now + '] ';
    this.infoCopy(timestamp, data);
};

/* -------------------------------------------------------------------------- */





var globUserAgent   = null,
    
    globBrowsersConfig        = [
        {ID: "ChromeWin", state: true},
        {ID: "ChromeMac", state: true},
        {ID: "ChromeLin", state: true}
    ],
    globCustomUserAgentSelect = true,
    
    globTimerInterval = 900000, // 15 min
    globTimerEnabled  = true,
    globTimerHandler  = null,
    
    globExceptionsList = ['chrome.google.com/webstore/'],
    
    globUseGlobalStorage = true; // true = global, false = local // TODO: Change to 'true' before release


function getUserAgents(){
    return userAgents;
}

function getRndArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)]; // string
}

// Return random item from input array
//                       (string) OR (Object ['userAgents' item])
function getRndUserAgent(browserObj) {
    var rndValue = (typeof browserObj == 'string') ? new RandExp(browserObj).gen() : new RandExp(browserObj.regexp).gen();
    if((rndValue == '') || (rndValue == getUserAgent()))
        // http://habrahabr.ru/post/167033/
        // make self-call for unique value
        //setTimeout(function(){ return getRndUserAgent(browserObj) }, 0); 
        return getRndUserAgent(browserObj);
    return rndValue; // string
}

// Return random User-Agent from ALL user-agents
function getGlobalRndUserAgent() {
    function fetch_random(obj) {
        var temp_key, keys = [];
        for(temp_key in obj) {
           if(obj.hasOwnProperty(temp_key)) {
               keys.push(temp_key);
           }
        }
        return obj[keys[Math.floor(Math.random() * keys.length)]];
    }
    var rndBrowser = fetch_random(getUserAgents()),
        rndUserAgent = getRndUserAgent(rndBrowser);
    if(rndUserAgent == getUserAgent())
        // http://habrahabr.ru/post/167033/
        // make self-call for unique value
        //setTimeout(function(){ return getGlobalRndUserAgent() }, 0); 
        return getGlobalRndUserAgent();
    return rndUserAgent; // string
}




// Manupulate User-Agent
/* -------------------------------------------------------------------------- */

function setUserAgent(ua) {
    if(ua == undefined) ua = null;
    globUserAgent = ua;
    console.info('Setted new UserAgent by \'setUserAgent()\': ' + ua);
    saveConfig();
    return (globUserAgent !== null) ? true : false;
}

function clearUserAgent() {
    globUserAgent = null;
    console.info('\'clearUserAgent()\' called');
    saveConfig();
    return (globUserAgent === null) ? true : false;
}

function getUserAgent() {
    return (globUserAgent !== null) ? globUserAgent : navigator.userAgent;
}




// User-Agent select next
/* -------------------------------------------------------------------------- */
function getNextAutoUserAgent() {
    if(globCustomUserAgentSelect) {
        if(globBrowsersConfig.length) {
            var data = [];
            // check all items in array 'globBrowsersConfig' 
            for (var i = 0; i < globBrowsersConfig.length; i++) {
                // if 'state' === true
                if(globBrowsersConfig[i].state) { 
                    var neededID = globBrowsersConfig[i].ID; 
                    // search browser with ID 'neededID' in 'userAgents'
                    for(var key in getUserAgents()) {
                        var obj = getUserAgents()[key];
                        // Work with our target item
                        if(key === neededID) {
                            // Add to result array regexp of browser
                            data.push(obj.regexp);
                            break;
                        }
                    }
                }
            }
            if(data.length) {
                // All correctly
                // In 'data' stored = ['regexp1', 'regexpN']
                return getRndUserAgent(getRndArrayItem(data));
            } else {
                console.warn('\'globBrowsersConfig\' return empty result array, set random User-Agent');
                return getGlobalRndUserAgent(); // string
            }
        } else {
            console.warn('\'globBrowsersConfig\' length not valid');
            return getGlobalRndUserAgent(); // string
        }
    } else {
        return getGlobalRndUserAgent(); // string
    }
    return false;
}


// Timer Functions
/* -------------------------------------------------------------------------- */

function setTimerInterval(value) {
                              // (int) minimal value
    globTimerInterval = (value > 299999) ? value : 300000; // Default value
    saveConfig();
    console.info('\'setTimerInterval()\' set '+globTimerInterval);
    autoUpdateUserAgent(true);
    return globTimerInterval;
}

function getTimerInterval() {
    return globTimerInterval;
}

function setTimerEnable(bool) {
    var oldState = getTimerEnable();
    globTimerEnabled = (bool) ? bool : false;
    if(!oldState && globTimerEnabled) autoUpdateUserAgent(true);
    saveConfig();
    
    return globTimerEnabled;
}

function getTimerEnable() {
    if(globTimerEnabled) setExtensionIcon('active'); else setExtensionIcon('inactive');
    return globTimerEnabled;
}

//                           (bool)
function autoUpdateUserAgent(justRunTheLoop){
    var justRunTheLoop = (justRunTheLoop) ? true : false;
    console.info('\'autoUpdateUserAgent()\' called, \'justRunTheLoop\' flag is '+justRunTheLoop);
    if(globTimerEnabled) {
        if(!justRunTheLoop) {
            var newUserAgent = getNextAutoUserAgent();
            if(newUserAgent) 
                setUserAgent(newUserAgent);
            else
                console.warn('\'autoUpdateUserAgent()\' return bad result');
        }
        //setTimeout(autoUpdateUserAgent, globTimerInterval);
        window.clearTimeout(globTimerHandler);
        globTimerHandler = setTimeout(function(){ return autoUpdateUserAgent() }, globTimerInterval); 
    }
}




// Browsers config and Custom UserAgent Select
/* -------------------------------------------------------------------------- */

function getBrowsersConfig() {
    return globBrowsersConfig;
}

function setBrowsersConfig(data) {
    if(data.length) {
        globBrowsersConfig = data;
        saveConfig();
        return true;
    } else
        return false;
}

function getCustomUserAgentSelect() {
    return globCustomUserAgentSelect;
}

function setCustomUserAgentSelect(value) {
    globCustomUserAgentSelect = value;
    saveConfig();
    return (globCustomUserAgentSelect === value) ? true : false;
}




// Exceptions config
/* -------------------------------------------------------------------------- */

function getExceptionsList(type) {
    function validateGlobExceptionsList() {
        if((typeof(globExceptionsList) !== "undefined") && (globExceptionsList.length > 0))
            return true;
        return false;
    }
    
    if((typeof type == 'string') && (type == 'text')){
        if(validateGlobExceptionsList())
            return globExceptionsList.join("\n");
        else
            return "";
    }
    if(validateGlobExceptionsList())
        return globExceptionsList;
    else
        return [];
}

function setExceptionsList(data) {
    var result = false;
    function validateNewValue(value) {
        return ((typeof value == 'string') && (value.length > 3)) ? true : false;
    }
    if(data.isArray) {
        var outArray = [];

        // Make check all items
        for (var i = 0; i < data.length; ++i) 
            if(validateNewValue(data[i]))
                outArray.push(data[i]);

        globExceptionsList = outArray;
        result = true;
    } else if(typeof data == 'string'){
        var inArray = data.split("\n"),
            outArray = [];

        // Make check all items
        for (var i = 0; i < data.length; ++i) 
            if(validateNewValue(inArray[i]))
                outArray.push(inArray[i]);

        globExceptionsList = outArray;
        result = true;
    }
    
    console.info('Exceptions list updated ('+globExceptionsList.join(", ")+')');
    saveConfig();
    return result;
}




// Save and load config
/* -------------------------------------------------------------------------- */

function saveConfig() {
    function saveInStorage(a,b){
        return(globUseGlobalStorage)?chrome.storage.sync.set(a,b):chrome.storage.local.set(a,b)
    }
    saveInStorage(
        {
            'UserAgent':             getUserAgent(),
            'timerInterval':         getTimerInterval(),
            'timerEnabled':          getTimerEnable(),
            'customUserAgentSelect': getCustomUserAgentSelect(),
            'browsersConfig':        getBrowsersConfig(),
            'exceptionsList':        getExceptionsList()
        }, function(result) {
            console.info('Settings saved');
            return true;
        });
}

function loadConfig() {
    function loadFromStorage(a,b){
        return(globUseGlobalStorage)?chrome.storage.sync.get(a,b):chrome.storage.local.get(a,b)
    }
    loadFromStorage([
        'UserAgent', 
        'timerInterval', 
        'timerEnabled',
        'customUserAgentSelect',
        'browsersConfig',
        'exceptionsList'], function (value) {
            // If value not stored (loaded as 'undefined') - setup default (or setted in past) value
            globUserAgent             = (typeof(value.UserAgent)             !== "undefined") ? value.UserAgent             : globUserAgent;
            globTimerEnabled          = (typeof(value.timerEnabled)          !== "undefined") ? value.timerEnabled          : globTimerEnabled;
            globTimerInterval         = (typeof(value.timerInterval)         !== "undefined") ? value.timerInterval         : globTimerInterval;
            globCustomUserAgentSelect = (typeof(value.customUserAgentSelect) !== "undefined") ? value.customUserAgentSelect : globCustomUserAgentSelect;
            globBrowsersConfig        = (typeof(value.browsersConfig)        !== "undefined") ? value.browsersConfig        : globBrowsersConfig;
            globExceptionsList        = (typeof(value.exceptionsList)        !== "undefined") ? value.exceptionsList        : globExceptionsList;

            if(getTimerEnable()) autoUpdateUserAgent(true);
            
            console.info('Settings loaded');

            return true;
    });
}

loadConfig();




// Main hook
/* -------------------------------------------------------------------------- */

// Hook for replace header
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    if (globUserAgent == null)
        return;

    //console.log('Request url ' + details.url); // TODO: Hide console output
    for(var i = 0; i < globExceptionsList.length; ++i)
        if(details.url.indexOf(globExceptionsList[i]) > -1) {
            //console.log('Ignore url '+details.url); // TODO: Hide console output
            return;
        }

    for (var i = 0, l = details.requestHeaders.length; i < l; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i].value = globUserAgent;
            break;
        }
    }
    return {
        requestHeaders: details.requestHeaders
    };
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);

