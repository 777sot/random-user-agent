/*
// Random User-Agent
// Automatically change User-agent in given time-interval to random.
//
// Copyright (C) 2014 by Samoylov Nikolay <samoylovnn@gmail.com>
// MIT License
// http://github.com/tarampampam/random-user-agent/raw/master/LICENSE
*/

$(document).ready(function(){
    function bg(){return chrome.extension.getBackgroundPage()}
    
    var        userAgents = bg().getUserAgents(),
         autoChangeChkBox = '#autochange',
           autoChangeName = '#change-timer',
        customTypesChkBox = '#custom-types';
    
    // Return <input> element by <a> tag id
    function getInputElementByLinkID(link){
        return $('#'+link).prev().prev('input');
    }
    
    // Save checkboxes position
    function saveBrowsersConfig(){
        var data        = [], 
            browsersIDs = Object.keys(userAgents);
        for(var i = 0; i < browsersIDs.length; i++){
            var el = getInputElementByLinkID(browsersIDs[i]);
            if(el.length) {
                var browserData = userAgents[browsersIDs[i]];
                data.push({
                    "ID": browsersIDs[i],
                    "name": browserData.name,
                    "state": el.prop('checked')
                });
            } else
                console.warn('Cannot find <input> element before <a>');
        }
        if(data.length) {
            bg().setBrowsersConfig(data);
        }
    }
    
    // Show User-Agent text on label
    function setUserAgentLabel(text){
        if($('#user-agent-now').text() !== text) $('#user-agent-now').text(text);
        return;
    }
    
    // Set auto refresh timer interval
    function setTimerInterval(){
        var autoChangeInt = $(autoChangeName).val();
        bg().setTimerInterval(autoChangeInt * 60000);
    }
    
    // Set User-Agent
    function setUA(ua){
        bg().setUserAgent(ua);
        refreshUserAgentLabel();
    }
    
    function clearUA(){
        bg().clearUserAgent();
        refreshUserAgentLabel();
    }
    
    function refreshUserAgentLabel(){
        setUserAgentLabel(bg().getUserAgent());
    }





    /* --- Events ----------------------------------------------------------- */
    
    // Hide \ show settings (and some others)
    $('.openClose').on('click',function(){
        var animationSpeed = 300,
            target = $('#'+$(this).attr("id")+'-content');
        if(!target.is(':visible')){
            $('.openCloseObj').each(function(){
                $(this).slideUp(animationSpeed);
            })
            target.slideToggle(animationSpeed);
        }
    });
    
    // On change timer interval (dropdown) - set interval and enable autochange
    $(autoChangeName).on('change', function(){
        setTimerInterval();
        if(!$(autoChangeChkBox).prop('checked'))
            $(autoChangeChkBox).click();
    });
    
    // Autochange - enable timer and set timer interval
    $(autoChangeChkBox).on('click', function(){
        setTimerInterval();
        bg().setTimerEnable($(autoChangeChkBox).prop('checked'));
    });
    
    // 'Reset' button click
    $('#reset-ua-now').on('click', function(){
        clearUA();
    });
    
    // 'Change now' button click
    $('#change-ua-now').on('click', function(){
        setUA(bg().getNextAutoUserAgent());
    });



    // Attach events to links for 'quick set' User-Agent -----------------------
    // OnClick <a> event
    function userAgentLinkClick(userAgentsList){
        setUA(bg().getRndUserAgent(userAgentsList));
    }
    function userAgentCheckbox(){
        saveBrowsersConfig();
    }
    var browsersIDs = Object.keys(userAgents);
    for(var i = 0; i < browsersIDs.length; i++){
        var browserID = browsersIDs[i],
            browserData = userAgents[browsersIDs[i]],
            userAgentLink = $('#'+browserID);
        
        userAgentLink                  // (handle) (1st param) (2nd param)
            .click(userAgentLinkClick.bind(this, browserData))
            .text(browserData.name); // Appent text from description
        
        getInputElementByLinkID(browserID)
            .click(userAgentCheckbox.bind(this));
    }



    // Use custom types of browsers to generate random value
    $(customTypesChkBox).on('click', function(){
        bg().setCustomUserAgentSelect($(this).prop('checked'));
    });



    // 'Change' (set custom UA) button click
    $('#customButton').on('click', function(){
        if($(autoChangeChkBox).prop('checked'))
            $(autoChangeChkBox).click();
        setUA($('#ua').val(), null);
    });




    /* --- Load values ------------------------------------------------------ */
    // Set random User-Agent in custom UA text field
    $('#ua').val(bg().getUserAgent());
    // Load Auto Change value
    $(autoChangeChkBox).prop('checked', bg().getTimerEnable());
    
    // Load Use custom types of browsers value
    $(customTypesChkBox).prop('checked', bg().getCustomUserAgentSelect());
    
    // Load autoupdate timer interval value
    $(autoChangeName).val(bg().getTimerInterval() / 60000);

    // Load checkboxes state
    var data = bg().getBrowsersConfig();
    if(!(data === undefined) && data.length)$.each(data, function() {
        var el = getInputElementByLinkID(this.ID);
        if(el.length)
            el.prop('checked', this.state)
        else
            console.warn('Cannot find saved element "' + this.ID + '"');
    });

    



    /* --- etc. ------------------------------------------------------------- */

    // Load locale
    // http://goo.gl/2fxSJX
    $('[data-resource]').each(function() {
        var el = $(this);
        var resourceName = el.data('resource');
        var resourceText = chrome.i18n.getMessage(resourceName);
        el.text(resourceText);
    });

    // Begin autoupdate User-Agent in textfield
    refreshUserAgentLabel();
    setInterval(function(){
        refreshUserAgentLabel();
    }, 1000);
});