$(".hide-and-show").hide()
// $(".wisestamp-checkbox").hide()

$(".wisestamp-open-login-form").click(function(){ 
    $(".hide-and-show").slideDown(1000)
})

$("#wisestamp-login-email").keypress(function(){
    $(".wisestamp-error-text").fadeOut()
});

$("#wisestamp-login-button").click(function(){
    var email = $("#wisestamp-login-email").val();
    var password = $("#wisestamp-login-password").val();
    if(email != '' && password != ''){
        $("#wisestamp-login-button").text("Loading...")
        setTimeout(() => {
            localStorage.setItem('email', email)
            $("#wisestamp-login-button").text("Login")
            location.reload()
        }, 3000)
    }else{
        $(".wisestamp-error-text").fadeIn()
    }
})

var getemail = localStorage.getItem('email')

if(getemail == null || getemail == "" ){
    console.log("No Email")
}else{
    $("body").html(`<div id="wisestamp-toolbar-menu" class="wisestamp-main-menu"
    style="direction: ltr; display: block; z-index: 9999999;"><img class="wisestamp-main-menu-close"
        src="chrome-extension://pbcgnkmbeodkmiijjfnliicelkjfcldg/content/img/toolbar-menu/close.png">
    <div class="wisestamp-context-menu">
        <div class="wisestamp-context-menu-inner">
            <div class="wisestamp-top-menu-header-wrapper">
                <p class="wisestamp-top-menu-title">Invoice Signature</p>
                <div class="wisestamp-user-email">
                    <div class="wisestamp-menu-inner-item-user-email-title">You are logged in as:</div>
                    <div class="wisestamp-menu-inner-item-user-email">${getemail}</div>
                </div>
                <div class="wisestamp-sign-out with-transition">Sign out</div>
                <div style="clear: both;"></div>
            </div>
            <ul class="wisestamp-menu-list">
                <li class="wisestamp-menu-list-item with-transition" style="cursor: pointer;">
                    <a href="#" class="wisestamp-menu-list-item-inner" style="text-decoration: none;" target="_blank"><img class="wisestamp-menu-list-item-icon"
                            src="chrome-extension://pbcgnkmbeodkmiijjfnliicelkjfcldg/content/img/toolbar-menu/edit.png"><span
                            class="wisestamp-menu-list-item-text ">Edit your signature</span></a>
                </li>
                <li class="wisestamp-menu-list-item with-transition" style="cursor: pointer;">
                    <a href="#" class="wisestamp-menu-list-item-inner" style="text-decoration: none;" target="_blank"><img class="wisestamp-menu-list-item-icon"
                            src="chrome-extension://pbcgnkmbeodkmiijjfnliicelkjfcldg/content/img/toolbar-menu/settings.png"><span
                            class="wisestamp-menu-list-item-text ">Signature settings</span></a>
                </li>
                <li class="wisestamp-menu-list-item with-transition" style="cursor: pointer;">
                    <a href="#" class="wisestamp-menu-list-item-inner" style="text-decoration: none;" target="_blank"><img class="wisestamp-menu-list-item-icon"
                            src="chrome-extension://pbcgnkmbeodkmiijjfnliicelkjfcldg/content/img/toolbar-menu/support.png"><span
                            class="wisestamp-menu-list-item-text ">Need help?</span></a>
                </li>
             <br>
                <li class="wisestamp-menu-item wisestamp-menu-item-upgrade" style="cursor: pointer;">
                    <div class="wisestamp-menu-list-item-inner"><span
                            class="wisestamp-menu-list-item-text with-scale with-transition">Upgrade to PRO</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="wisestamp-menu-bottom">
            <div class="wisestamp-disable-div with-transition">Disable Invoice</div><img
                src="content/img/logo/48x48.png"
                class="wisestamp-top-menu-logo with-transition with-scale">
            <div style="clear: both;"></div>
        </div>
    </div>
</div>`)
    console.log("Emai hai")
}

$(".wisestamp-sign-out").click(function(){
    setTimeout(() => {
        localStorage.removeItem('email')
        location.reload()
    }, 1000)
    
})