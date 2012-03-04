//$(function () {





//    $('button').button();


//    if ($.cookie('webtourstep', newOptions) == '2')
//        step3();

//    $('#startTour').click(function () {
//        step1();
//    });

//    $('.tour-next').live('click', function () {
//        var step = parseInt($(this).closest('.step-div').attr('id').replace('step', ''));
//        eval('step' + (step + 1) + '()');
//    });


//    $('.tour-prev').live('click', function () {
//        var step = parseInt($(this).closest('.step-div').attr('id').replace('step', ''));
//        eval('step' + (step - 1) + '()');
//    });

//    $('.tour-end').live('click', function () {
//        if (useExpose()) {
//            $.mask.close();
//            $('.page').qtip('destroy');
//          
//        }
//    });

//});

//var newOptions = {
//    path: '/'
//};

//function step1() {
//    closeAllToolTips();
//    $.cookie('webtourstep', 1, { path: '/' });
//    if (useExpose()) {
//        $.mask.close();
//        $('').expose({
//            opacity: 0.8,

//            closeSpeed: 0,

//            // we only want to close exposing when playback is finished
//            // (or the ESC button is pressed)
//            closeOnClick: false
//        });
//    }
//    var box = $('#step1').clone();
//    showMainTourBox(box);
//}

//function closeAllToolTips() {

//    $('[aria-describedby]:not(".ui-tooltip")').qtip('destroy');
//}


//function step2() {
//    closeAllToolTips();
//    $.cookie('webtourstep', 2, newOptions);


//    if (useExpose()) {
//        $.mask.close();
//        $("#menu a").eq(1).expose({
//            opacity: 0.8,
//            closeSpeed: 0,
//            loadSpeed: 0,
//            // we only want to close exposing when playback is finished
//            // (or the ESC button is pressed)
//            closeOnClick: false
//        });
//    }

//    $("#menu a").eq(1).css('zIndex', '9999');
//    $("#menu a").eq(1).qtip({
//        content: {
//            text: 'Click the About Link',
//            title: {
//                text: '',
//                button: false
//            }
//        },
//        position: {
//            my: 'top right', // Use the corner...
//            at: 'bottom center' // ...and opposite corner
//        },
//        show: {
//            event: false, // Don't specify a show event...
//            ready: true // ... but show the tooltip when ready
//        },
//        hide: false, // Don't specify a hide event either!
//        style: {
//            classes: 'ui-tooltip-tipped ui-tooltip-' + 'red',
//            tip: true
//        }
//    });

//    var box = $('#step2').clone();
//    showMainTourBox(box);

//    $('input').focus();

//    $('input').val('Bryan');
//}


//function step3() {
//    closeAllToolTips();
//    if (window.location.pathname != '/Home/About') {
//        window.location.pathname = '/Home/About';
//    } else {


//        var box = $('#step3').clone();
//        showMainTourBox(box);



//        $.cookie('webtourstep', 3, { path: '/' });


//        if (useExpose()) {
//            $.mask.close();
//        }       


//        window.setTimeout(function () {


//            if (useExpose()) {
//                
//                $('#div1').expose({
//                    opacity: 0.8,

//                    closeSpeed: 0,

//                    // we only want to close exposing when playback is finished
//                    // (or the ESC button is pressed)
//                    closeOnClick: false
//                });
//            }

//            $('input').attr('title', 'Enter your user name');

//            $('input').qtip({
//                content: {
//                    text: 'Enter your name',
//                    title: {
//                        text: '',
//                        button: false
//                    }
//                },
//                position: {
//                    my: 'top left', // Use the corner...
//                    at: 'bottom left' // ...and opposite corner
//                },
//                show: {
//                    event: false, // Don't specify a show event...
//                    ready: true // ... but show the tooltip when ready
//                },
//                hide: false, // Don't specify a hide event either!
//                style: {
//                    classes: 'ui-tooltip-tipped ui-tooltip-' + 'red',
//                    tip: true
//                }
//            });


//            $('input').focus();

//            $('input').keyup(function () {


//                if ($(this).val() != "") {
//                    $('input').unbind('keyup');

//                    $('input').qtip().destroy();

//                    $('#enterBtn').qtip({
//                        content: {
//                            text: 'Click Enter',
//                            title: {
//                                text: '',
//                                button: false
//                            }
//                        },
//                        position: {
//                            my: 'bottom left', // Use the corner...
//                            at: 'top left' // ...and opposite corner
//                        },
//                        show: {
//                            event: false, // Don't specify a show event...
//                            ready: true // ... but show the tooltip when ready
//                        },
//                        hide: false, // Don't specify a hide event either!
//                        style: {
//                            classes: 'ui-tooltip-tipped ui-tooltip-' + 'red',
//                            tip: true
//                        }
//                    });
//                }
//            });


//        }, 1000, true); 
//    
//    }
//}


//function step4() {
//    closeAllToolTips();
//    if (useExpose()) {
//        $.mask.close();
//        $('').expose({
//            opacity: 0.8,

//            closeSpeed: 0,

//            // we only want to close exposing when playback is finished
//            // (or the ESC button is pressed)
//            closeOnClick: false
//        });
//    }
//  
//    var box = $('#step4').clone();
//    showMainTourBox(box);
//}

//function showMainTourBox(text) {
//    $('.page').qtip({
//        content: {
//            text: $(text),
//            title: {
//                text: 'eRAMP Tour',
//                button: false
//            }
//        },
//        position: {
//            my: 'top left', // Use the corner...
//            at: 'top left' // ...and opposite corner
//        },
//        show: {
//            event: false, // Don't specify a show event...
//            ready: true // ... but show the tooltip when ready
//        },
//        hide: false, // Don't specify a hide event either!
//        style: {
//            classes: 'ui-tooltip-tipped',
//            tip: false
//        }
//    });
//}

//function useExpose() {
//    if ($.browser.msie && $.browser.version == "6.0") {
//        return false;
//    } 
//    
//    if ($.browser.msie && $.browser.version == "7.0") {
//        return false;
//    } 
//        //document.documentMode;

//    if ($.browser.msie && $.browser.version == "8.0") {
//        
//        if(document.documentMode == 7)
//        return false;
//    }

//    if ($.browser.msie && $.browser.version == "9.0") {
//        if (document.documentMode == 7)
//        return false;
//    }
//    return true;
//}