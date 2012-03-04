/*
 webtour.js

 Version: 1.0
 Copyright 2012 Bryan Arendt - 

 About: A jquery plugin for creating interactive instructional tours of web sites.


 Dual licensed under MIT or GPLv2 licenses
   http://en.wikipedia.org/wiki/MIT_License
   http://en.wikipedia.org/wiki/GNU_General_Public_License

 Date: 20120304
  
 Dependancies:
 jquery
 jquery.qtip
 jquery.tools.expose
 jquery.cookie    
*/
(function ($) {
    $.webtour = function (element, array, options) {

        this.options = {};
        element.data('webtour', this);

        //set the initial step and figureout how many steps there are total.
        this.props = {};
        this.props.numberOfStep = array.length;
        this.props.current = 1;

        //default options
        var defaultStep = {
            NavMessage: null, //the message to be displayed on the tour navigator
            OnStep: function () { }, // the funtion to fire on this step of the tuour (i.e. fireing a controls blur event)
            MaskSelector: null, //the element to highlight using the background mask
            TipMessage: null, //the message in the tooltip
            TipSelector: null, //the element to show the tip on
            TipMy: null, //the tip My position
            TipAt: null, //the tip At position
            RequiredState: function () { return true; }, //a function that returns true if the page is in the required state for the step to show (i.e. checking the browser path to make sure they are on the correct page.)
            SetStateToRequired: function () { }, //a funciton to execute if the state is not statusfied. ie navigatin to a path.
            ReShowCurrentStepAfterSetState: false, //if true will rexecute the step. If fixing the state with JavaScript set this to true. Leave it false if navigating to a different page.
            StateMonitorElement: null, //the element to monitor for state change to move to the next event.
            StateMonitorEvent: null //the element event to monitor for state change to move to the next event.
        };

        //init the plugin
        this.init = function () {

            //set element click event to start the tour
            element.click(function () {
                element.data('webtour').showCurrentStep();
                return false;
            });

            //set defaults and bind state change events for each step
            $.each(array, function (i, v) {
                array[i] = $.extend({}, defaultStep, v);
                if (array[i].StateMonitorElement != null) {
                    array[i].StateMonitorElement.bind(
                        array[i].StateMonitorEvent,
                        function () {
                            if (array[i].RequiredState()) {
                                plugin.props.current += 1;
                                plugin.showCurrentStep();
                                array[i].StateMonitorElement.unbind(array[i].StateMonitorEvent);
                            }
                        }
                    );
                }
            });

            //check to see if we are in the middle of a tour. (if moving from page to page)
            var current = parseInt($.cookie('jqwebtourstep', { path: '/' }));
            var webTourActive = false;
            if (!isNaN(current)) {
                //the web tour is active so increment the current step (the user probably just navigates pages which should take them to the next step.)
                webTourActive = true;
                this.props.current = current + 1;
            }

            //set the default options.
            this.options = $.extend({}, $.webtour.defaultOptions, options);
            this.props.options = this.options;
            var plugin = this;
            var props = this.props;

            //add the class to the element
            element.addClass(this.options.cssClass);

            //bind the different tour nav buttons
            $('.tour-next').live('click', function () {
                props.current += 1;
                plugin.showCurrentStep();

            });

            $('.tour-prev').live('click', function () {
                props.current -= 1;
                plugin.showCurrentStep();
            });

            $('.tour-end').live('click', function () {
                //end the tour
                //close everything, clear the cookie and set the step back to 1 so the tour can be taken again.
                if (useExpose()) {
                    $.mask.close();
                }
                closeAllToolTips();
                $.cookie('jqwebtourstep', null, { path: '/' });
                props.current = 1;
            });

            //the web tour is active so increment the current step (the user probably just navigates pages which should take them to the next step.)
            if (webTourActive) {
                element.click();
            }
        };

        //this will get the div for the message navigator and include the proper navigation buttons depending on the step.
        this.getMainMessage = function (step) {

            var div = '<div id="stepnumber" style="width: 210px;" class="step-div"><div style="padding: 20px 0 20px 0;" id="tour-message">' +
                array[this.props.current - 1].NavMessage +
                '</div>';

            if (!isFirst(this.props))
                div += '<div style="float: left;"><button type="button" class="tour-prev">Previuos</button></div>';

            if (!isLast(this.props))
                div += '<div style="float: right;"><button type="button" class="tour-next tour-nav-button">Next</button></div><div style="clear: both;"></div>';

            if (isLast(this.props))
                div += '<div style="float: right;"><button type="button" class="tour-end tour-nav-button">Close</button></div><div style="clear: both;"></div>';

            div += '</div>';

            return div.replace('stepnumber', 'step' + step); ;
        };

        //execute the current step on the tour
        this.showCurrentStep = function () {
            //make sur epre conditions are satisfied for this step.
            var stateOk = array[this.props.current - 1].RequiredState();
            if (stateOk) {

                //close all the tool tips
                closeAllToolTips();


                //set cooke for current step incase of navigation. 
                if (!isLast(this.props))
                    $.cookie('jqwebtourstep', this.props.current, { path: '/' });
                else {
                    //clear cookie at end of tour
                    $.cookie('jqwebtourstep', null, { path: '/' });
                }

                //mask screen except for element to be exposed.
                if (useExpose()) {
                    $.mask.close();
                    var ele = array[this.props.current - 1].MaskSelector;
                    ele.expose({
                        opacity: 0.5,
                        closeSpeed: 0,
                        closeOnClick: false
                    });
                }

                //check if steo has element that need a tool tip.
                var eleToTip = array[this.props.current - 1].TipSelector;
                if (eleToTip != null) {
                    //add the tip
                    eleToTip.qtip({
                        content: {
                            text: array[this.props.current - 1].TipMessage, //set the step tip text
                            title: {
                                text: '',
                                button: false
                            }
                        },
                        position: {
                            my: array[this.props.current - 1].TipMy, // tool tip position
                            at: array[this.props.current - 1].TipAt // element position
                        },
                        show: {
                            event: false, // Don't specify a show event...
                            ready: true // ... but show the tooltip when ready
                        },
                        hide: false, // Don't specify a hide
                        style: {
                            classes: 'ui-tooltip-tipped',
                            tip: true
                        }
                    });
                }

                //show the main nav box
                showMainTourBox($(this.props.options.mainNavElement), this.getMainMessage(this.props.current));

                //execute the step function (i.)
                array[this.props.current - 1].OnStep();
            }
            else { //the page is not in the proper state to execute this step.

                //fix the state 
                array[this.props.current - 1].SetStateToRequired();

                //reshow this step if SetStateToRequired didn't reload the page.
                if (array[this.props.current - 1].ReShowCurrentStepAfterSetState) {
                    this.showCurrentStep();
                }
            }


        };

        this.init(element, options);

    };

    $.fn.webtour = function (array, options) { //Using only one method off of $.fn  
        return this.each(function () {
            (new $.webtour($(this), array, options));
        });
    };

    function showMainTourBox(element, message) {

        //the main nav is a qtip with the html from the message as its content.
        element.qtip({
            content: {
                text: message,
                title: {
                    text: 'eRAMP Tour',
                    button: false
                }
            },
            position: {
                my: 'top left',
                at: 'top left'
            },
            show: {
                event: false,
                ready: true
            },
            events: {
                show: function () {
                     $('button').button();
                }
            },

            hide: false,
            style: {
                classes: 'ui-tooltip-tipped',
                tip: false //no tip for main nav
            }
        });

        $('button').button();
    }


    function isFirst(props) {
        return props.current == 1;
    }

    function isLast(props) {
        return props.current == props.numberOfStep;
    }

    function closeAllToolTips() {
        $('[aria-describedby]:not(".ui-tooltip")').qtip('destroy');
    }

    function useExpose() {
        if ($.browser.msie && $.browser.version == "6.0") {
            return false;
        }

        if ($.browser.msie && $.browser.version == "7.0") {
            return false;
        }

        if ($.browser.msie && $.browser.version == "8.0") {

            if (document.documentMode == 7)
                return false;
        }

        if ($.browser.msie && $.browser.version == "9.0") {
            if (document.documentMode == 7)
                return false;
        }
        return true;
    }



    $.webtour.defaultOptions = {
        cssClass: 'webtour',
        mainNavElement: ''

    };

})(jQuery);