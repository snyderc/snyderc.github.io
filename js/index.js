$(document).ready(function () {
    $(document).on("scroll", onScroll);

    // Special effect with proper button combination
    const keypressStack = [];
    const compareStack = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA', 'Enter'];
    document.addEventListener('keydown', (event) => {
        onKeypress(event, keypressStack, compareStack);
    });
    
    //smoothscroll -- Adapted from https://jsfiddle.net/cse_tushar/Dxtyu/141/
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50
        }, 500, 'swing', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

// Determines whether a menu element should be highlighted based on current scroll position
// Adapted from https://jsfiddle.net/cse_tushar/Dxtyu/141/
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#navbarNav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top -50 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#navbarNav div a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

function onKeypress(event, keypressStack, compareStack) {
    const userKeypress = event.code;
    // If user's keypress matches the next item in the compareStack, add it to keypressStack
    if (userKeypress === compareStack[keypressStack.length]) {
        keypressStack.push(event.code);
        if (userKeypress === 'Enter') {
            // Clear the keypress stack
            keypressStack.length = 0;
            // Redirect to the Geocities-izer
            window.location = "http://www.wonder-tonic.com/geocitiesizer/content.php?theme=2&music=0&url=www.snyderc.me";
        }
    }
    // If user's keypress doesn't match, clear keypressStack
    else {
        keypressStack.length = 0;
    }
};