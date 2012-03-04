$(function () {
    var tour =
        [
            {
                NavMessage: "Welcome to eRamp",
                MaskSelector: $('')
            },

            {
                NavMessage: "To begin click the About link",
                MaskSelector: $('#menu a').eq(1),
                OnStep: function () {
                    $('#menu a').eq(1).focus();
                 
                },
                TipMessage: 'Click the About Link',
                TipSelector: $("#menu a").eq(1),
                TipMy: 'top right',
                TipAt: 'bottom center'
            },
            {
                NavMessage: "On this page you can enter your name...",
                OnStep: function () {
                    $("#nameInput").focus();
                   
                },
                MaskSelector: $('#div1'),
                TipMessage: 'Enter your name',
                TipSelector: $("#nameInput"),
                TipMy: 'top left',
                TipAt: 'bottom left',
                RequiredState: function () {
                    return window.location.pathname == '/Home/About';
                },
                SetStateToRequired: function () {
                    window.location.pathname = '/Home/About';
                }
            },
            {
                NavMessage: "and then click enter to proceed.",
                MaskSelector: $('#div1'),
                TipMessage: 'Click Enter',
                TipSelector: $("#enterBtn"),
                TipMy: 'top center',
                TipAt: 'bottom center',
                RequiredState: function () {
                    return $("#nameInput").val() != "";
                },
                SetStateToRequired: function () {
                    $("#nameInput").val("Some User");
                },
                ReShowCurrentStepAfterSetState: true,
                StateMonitorElement: $("#nameInput"),
                StateMonitorEvent: 'keyup'
            }
        ];

    $('#menu a').eq(2).webtour(tour, { mainNavElement: '.page' });

    $('button').button();
});