/**
 * Created by Randy on 03/19/17.
 */
var MOBILE_WIDTH = 810;

var openedSubMenu;
var scrolling;
var width;

$(document).ready(function () {
    setup();
    $("#section-header-wrapper").css("background", "#2e2e2e url('img/Background.jpg') no-repeat 0px 0px");
});

/**
 * Setup the script
 */
function setup() {
    width = $(window).width();

    //Set up construction msg
    {
        $("#underConstruction-close").on("click", function () {
            $("#underConstruction").fadeOut();
        });
        if (getCookie("SeenMsg") != "true") {
            setCookie("SeenMsg", true, 0.5);
            $("#underConstruction").fadeIn();
        } else
            $("#underConstruction").fadeOut();
    }

    /* Navbar Handlers */
    {
        $(document).mouseup(handleSubMenu);

        $(".sub-nav-bar").hide();
        $(".nav-bar-item").on("click", function () {
            openSubMenu($(this));
        });

        //Do nothing class
        $(".doNothingLink").on("click", function (element) {
            element.preventDefault();
        });

        //Scroll to class
        $(".scrollTo").on("click", function () {
            scrollTo($("" + $(this).attr("scrollTo")));
        });

        //If resize
        $(window).on('resize', function () {
            if ($(this).width() != width) {
                if (width <= MOBILE_WIDTH && $(this).width() > MOBILE_WIDTH)
                    if (!$("#nav-bar-wrapper").is(":visible"))
                        $("#nav-bar-wrapper").fadeIn();

                    else if (width > MOBILE_WIDTH && $(this).width() <= MOBILE_WIDTH)
                        if ($("#nav-bar-wrapper").is(":visible"))
                            $("#nav-bar-wrapper").fadeOut();
            }
            width = $(this).width();
        });

        //Navbar icon
        $("#nav-bar-icon").on("click", function () {
            $("#nav-bar-wrapper").fadeToggle();
        });
    }

    /* Social Link Handlers */
    {
        $("#social-links-wrapper").on("mouseenter", function () {
            $("#social-links-indicator").hide();
            $("#social-links").animate({right: "0px"}, "fast");
        });
        $("#social-links-wrapper").on("mouseleave", function () {
            $("#social-links").animate({right: "-15px"}, "fast", function () {
                $("#social-links-indicator").show();
            });

        });
    }

    /* Setup Header Buttons */
    {
        $("#section-header .btn").on("mouseenter", function () {

            //Prevent a queue from forming with animate
            var obj = $(this);
            if (obj.data("hovering") == false || obj.data("hovering") == null) {
                obj.data("hovering", true);
                obj.animate({
                        backgroundColor: "#2ECC40"
                    }, "medium", null,
                    function () {
                        obj.data("hovering", false);
                    });
            }
        });
        $("#section-header .btn").on("mouseleave", function () {

            //Only animate when this was previously animated
            var obj = $(this);
            obj.animate({
                backgroundColor: 'transparent'
            }, "medium");
        });
        $("#section-header-buttons-contact").on("click", function () {
            console.log("Open Contact Form");
        });
    }

    /* Setup Custom ParticlesJS */
    {
        particlesJS.load('particles-js', './assets/particlesjs-config.json');
    }

}

/**
 * Handle if a sub-menu should be closed
 * @param element
 */
function handleSubMenu(element) {
    if (openedSubMenu != null) {
        var menu = openedSubMenu;

        //Check if the user clicked within the nav-bar
        var clickedInSub = menu.is(element.target) || menu.has(element.target).length > 0;

        if (!clickedInSub)
            openedSubMenu.slideUp();
    }
}

/**
 * Open a sub menu
 * @param element
 */
function openSubMenu(element) {
    var ITEM_HEIGHT = 50;
    var menu = element.children(".sub-nav-bar")

    //Because this gets called every time the nav-bar item gets clicked,
    // you only want to open it if it's currently closed
    if (!menu.is(":visible")) {
        openedSubMenu = menu;
        menu.slideDown();
    }
    if (width <= MOBILE_WIDTH) {
        var value = element.position().top + ITEM_HEIGHT;
        menu.css("top", value + "px");
    } else
        menu.css("top", "61px");
}

/**
 * Scroll to given element(Accounting for the navbar taking the top 60px
 * @param element
 */
function scrollTo(element) {
    if (!scrolling) {
        scrolling = true;
        $('html, body').animate({
            scrollTop: (element.offset().top - 65)
        }, 1750, function () {
            scrolling = false;
        });
    }
}