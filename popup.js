$(document).ready(function(){
    function bg(){return chrome.extension.getBackgroundPage()}
    
    var        userAgents = getUserAgents(),
         autoChangeChkBox = '#autochange',
           autoChangeName = '#change-timer',
        customTypesChkBox = '#custom-types';
    
    // Return object of all User-Agent
    function getUserAgents(){
        return bg().getUserAgents();
    }
    
    // Return random value of User-Agent
    function getRndUserAgent(obj){
        return bg().getRndUserAgent(obj);
    }
    
    // Return <input> element by <a> tag id
    function getInputElementByLinkID(link){
        return $('#'+link).prev().prev('input');
    }
    
    // Save checkboxes position
    function saveBrowsersConfig(){
        var data = [];
        $.each(userAgents, function() {
            var el = getInputElementByLinkID(this.ID);
            if(el.length)
                data.push({
                    "ID": this.ID,
                    "name": this.name,
                    "state": el.prop('checked')
                });
            else
                console.warn('Cannot find <input> element before <a>');
        });
        if(data.length) {
            bg().setBrowsersConfig(data);
        }
    }
    
    // Return actual User-Agent
    function getUserAgent(){
        return bg().getUserAgent();
    }
    
    // Show User-Agent text on label
    function setUserAgentLabel(text){
        return $('#user-agent-now').text(text);
    }
    
    // Set auto refresh timer interval
    function setTimerInterval(){
        var autoChangeInt = $(autoChangeName).val();
        bg().setTimerInterval(autoChangeInt * 60000);
    }
    
    // Set User-Agent
    function setUA(ua, desc){
        bg().setUserAgent(ua, desc);
        refreshUserAgentLabel();
    }
    
    function clearUA(){
        bg().clearUserAgent();
        refreshUserAgentLabel();
    }
    
    function refreshUserAgentLabel(){
        setUserAgentLabel(getUserAgent());
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
    
    // On check autochange - enable timer and set timer interval
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
    $.each(userAgents, function() {
        // OnClick <a> event
        function userAgentLink(userAgentsList, Description){
            setUA(getRndUserAgent(userAgentsList), Description);
        }
        function userAgentCheckbox(){
            saveBrowsersConfig();
        }
        $('#'+this.ID)
            .click(userAgentLink.bind(this, this, this.name))
            .text(this.name); // Appent text from description
        getInputElementByLinkID(this.ID)
            .click(userAgentCheckbox.bind(this));
    });
    
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
    $.each(data, function() {
        var el = getInputElementByLinkID(this.ID);
        if(el.length)
            el.prop('checked', this.state)
        else
            console.warn('Cannot find saved element "' + this.ID + '"');
    });
        
    



    /* --- etc. ------------------------------------------------------------- */

    // Load locale
    // http://codethug.com/2013/02/08/clean-markup-with-chrome-extension-i18n/
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