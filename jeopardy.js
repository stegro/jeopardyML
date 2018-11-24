

var icategory = -1;
var categories = $('#categories .table-cell').length;
var grades = $('#tableau #question-row').length;

var irow_selector = 0;
var icol_selector = 0;

var KEYCODE_ESC = 27
var KEYCODE_SPACE = 32
var KEYCODE_1 = 49
var KEYCODE_i = 73
var KEYCODE_o = 79
var KEYCODE_s = 83
var KEYCODE_w = 87
var KEYCODE_0 = 48

var KEYCODE_left = 37
var KEYCODE_up = 38
var KEYCODE_right = 39
var KEYCODE_down = 40

var nteams;

var modal = function(){}

function init(){
        setTeams();
        modal.showCategoryIntro();
}

function setTeams(){
    nteams = parseInt($('#options-modal select').val());
    $('#options-modal').hide();
    var teams = $('#teams-modal .team');
    for(var i = 0; i < nteams; i++){
        $(teams[i]).show();
    }
    for(var i = nteams; i < 6; i++){
        $(teams[i]).hide();
    }
}

function animateSymbol(text, extraclass){
    $('.symbol-box').html(text);

    $('.symbol-box').show();
    $('.symbol-box').addClass("symbol-animation");
    $('.symbol-box').addClass(extraclass);

    setTimeout(function(){
        $('.symbol-box').removeClass("symbol-animation");
        $('.symbol-box').removeClass(extraclass);
        $('.symbol-box').hide();
        // this timeout should match the animation duration:
    }, 1500)
}

function moveSelector(keycode){
    if(keycode == KEYCODE_right) {
        icol_selector = (icol_selector + 1 + categories) % categories;
    }else if(keycode == KEYCODE_left) {
        icol_selector = (icol_selector - 1 + categories) % categories;
    }else if(keycode == KEYCODE_up) {
        irow_selector = (irow_selector - 1 + grades) % grades;
    }else if(keycode == KEYCODE_down) {
        irow_selector = (irow_selector + 1 + grades) % grades;
    }
    $('.selected-cell').removeClass('selected-cell')
    $($($('#tableau #question-row').get(irow_selector)).children().get(icol_selector)).addClass('selected-cell')
}


modal.revealSolution = function(){
    var solution = $('#riddle-modal').find(".solution")
    solution.css({
        "display": "flex",
    });

    solution.addClass("reveal");
}

modal.showRiddle = function(cell){
    $('.selected-cell').removeClass("selected-cell");
    $(cell).addClass("selected-cell");
    icol_selector = $(cell).closest(".table-row").children().index(cell);
    irow_selector = $('#tableau #question-row').index($(cell).closest(".table-row"))

    var category = $($("#categories .table-cell").get(position)).text()
    var points = $(cell).attr("data-points");
    $('#category-points-title').text(category + " für " + points);
    var bbox = cell.getBoundingClientRect();

    // replace whatever is on the modal screen with clue and solution
    $('#riddle-modal .modal-inner').html(
        $(cell).find(".clue").prop("outerHTML") +
            $(cell).find(".solution").prop("outerHTML")
    )

    $('#riddle-modal .modal-inner').scrollTop(0)

    // get access to clue and solution elements
    $('#riddle-modal .clue').css({
        "display": "block"
    });

    // draw a baby version of the modal screen
    $('#riddle-modal').css({
        transform: "translate(" + bbox.x + "px, " + bbox.y  + "px) scale(" + (bbox.width/$(window).width()) + ", " + (bbox.height / $(window).height()) + ")",
        "display": "inline-block",
    })

    $('.expanded').removeClass("expanded");
    $('#riddle-modal').addClass("expanded");
    modal.setHandlers()


    // wait a bit, then animate the transform
    setTimeout(function(){

        $('#riddle-modal').css({
            top:0,
            left:0,
            bottom:0,
            right:0,
            width: '100%',
            height: '100%',
            borderWidth:0,
            transform: "translate(0px, 0px) scale(1)"
        });
    }, 500);

}

modal.hideRiddle = function(){
    $('#riddle-modal').hide()
    $('#riddle-modal').removeClass("expanded");
    $('#riddle-modal').css({
        borderWidth:3
    });
    modal.setHandlers();
}

modal.showScores = function(){
    $('#gameplay').css("filter", "blur(5px)");
    $('#teams-modal').css({
        "display": "flex"
    });
    $('.expanded').removeClass("expanded");
    $('#teams-modal').addClass("expanded");

    modal.setHandlers();

}

modal.hideScores = function(){
    $('#gameplay').css("filter", "blur(0px)");
    $('#teams-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
}

modal.showOptions = function(){
    $('#gameplay').css("filter", "blur(5px)");
    $('#options-modal').css({
        "display": "flex"
    });
    $('.expanded').removeClass("expanded");
    $('#options-modal').addClass("expanded");
    modal.setHandlers();
}
modal.hideOptions = function(){
    setTeams();
    $('#gameplay').css("filter", "blur(0px)");
    $('#options-modal').hide()
    modal.setHandlers();
}

modal.showCategoryIntro = function(){
    $('#gameplay').css("filter", "blur(20px)");
    $('#category-intro-modal').css({
        "display": "flex"
    });
    $('.expanded').removeClass("expanded");
    $('#category-intro-modal').addClass("expanded");
    modal.nextCategoryIntro();

    modal.setHandlers();

}

modal.nextCategoryIntro = function(){

    icategory++;
    if(icategory < categories) {

        $('#category-intro-modal').removeClass("category-in-animation");
        $('#category-intro-modal').addClass("category-out-animation");
        setTimeout(function(){
            $('#category-intro-modal').text($($('#categories .table-cell').get(icategory)).text())
            $('#category-intro-modal').removeClass("category-out-animation");
            $('#category-intro-modal').addClass("category-in-animation");

        },
                   // this timeout should match the animation duration:
                   1000);
    }else{
        $('#category-intro-modal').removeClass("category-in-animation");
        $('#category-intro-modal').addClass("category-out-animation");
        setTimeout(function(){
            icategory = -1;
            $('#category-intro-modal').text("");
            modal.hideCategoryIntro();
        },1000);
    }
}
modal.hideCategoryIntro = function(){
    $('#gameplay').css("filter", "blur(0px)");
    $('#category-intro-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
}

modal.setHandlers = function(){
    $(window).off("keydown.riddle-modal");
    $(window).off("keydown.body");
    $(window).off("keydown.teams-modal");
    $(window).off("keydown.category-intro-modal");

    if($('#teams-modal').hasClass("expanded")) {
        $(window).on("keydown.teams-modal", function(e){
            if(e.keyCode == KEYCODE_ESC){
                e.preventDefault();
                modal.hideScores();
            }
        });
    }else if($('#riddle-modal').hasClass("expanded")) {
        $(window).on("keydown.riddle-modal", function(e){
            if(e.keyCode == KEYCODE_ESC){
                e.preventDefault();
                modal.hideRiddle();
            } else if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                modal.revealSolution();
            }else if(e.keyCode == KEYCODE_0){
                e.preventDefault();
                $(".selected-cell").addClass("empty");
                modal.hideRiddle();
            } else if(e.keyCode >= KEYCODE_1 && e.keyCode < KEYCODE_1 + nteams){
                e.preventDefault();
                iteam = e.keyCode-KEYCODE_1+1;

                var $score = $("#team"+iteam).find(".score")
                var score = parseInt($score.text())
                var val = parseInt($(".selected-cell").attr("data-points"));
                if(e.ctrlKey){
                    // if ctrl key is down, the team made a wrong guess, so give them
                    // minus points!
                    $score.text(Math.max(0,score - val));
                    var x_sign = "&#x2716;";
                    animateSymbol(x_sign, "team-"+iteam);


                }else{
                    $(".selected-cell").addClass("solved-by-team-"+iteam);
                    $(".selected-cell").addClass("empty");
                    $score.text(score + val);
                    var check_sign = "&#x2714;";
                    animateSymbol(check_sign, "team-"+iteam);
                    // setTimeout(function(){
                    //     animateSymbol(""+val, "team-"+iteam);
                    // },1500);
                    setTimeout(modal.hideRiddle,
                               // this timeout should match the animation duration:
                               1*1500);

                }
            }
        });
    }else if($('#category-intro-modal').hasClass("expanded")) {
        $(window).on("keydown.riddle-modal", function(e){
            if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                modal.nextCategoryIntro();
            }else if(e.keyCode == KEYCODE_ESC){
                e.preventDefault();
                modal.hideCategoryIntro();
            }
        });

    }else {
        $(window).on("keydown.body", function(e){
            // for finding keycodes:
            // alert(e.keyCode);
            if(e.keyCode == KEYCODE_i){
                e.preventDefault();
                modal.showCategoryIntro();

            }else if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                $('.selected-cell').click();

            }else if(e.keyCode == KEYCODE_o){
                e.preventDefault();
                modal.showOptions();

            }else if(e.keyCode == KEYCODE_s){
                e.preventDefault();
                modal.showScores();

            }else if(e.keyCode >= KEYCODE_left && e.keyCode <= KEYCODE_down){
                e.preventDefault();
                moveSelector(e.keyCode);

            }else if((e.keyCode >= KEYCODE_1 && e.keyCode < KEYCODE_1 + nteams)
                     || e.keyCode == KEYCODE_0){
                e.preventDefault();
                for(var iteam = 1; iteam <= 6; iteam++) {
                    if($('.selected-cell').hasClass("solved-by-team-" + iteam)){
                        var $score = $("#team"+iteam).find(".score");
                        var score = parseInt($score.text());
                        var val = parseInt($(".selected-cell").attr("data-points"));
                        $score.text(score - val);
                        $('.selected-cell').removeClass("solved-by-team-" + iteam);
                    }
                }
                if((e.keyCode >= KEYCODE_1 && e.keyCode < KEYCODE_1 + nteams)
                   && $('.selected-cell').hasClass("empty")){
                    var new_iteam = e.keyCode-KEYCODE_1+1;
                    $('.selected-cell').addClass("solved-by-team-"+new_iteam);
                    var $score = $("#team"+new_iteam).find(".score");
                    var score = parseInt($score.text());
                    var val = parseInt($(".selected-cell").attr("data-points"));
                    $score.text(score + val);
                }
            }
        });
    }
}


$(document).ready(function(){
    $('#riddle-modal').on("click", '#solution-button', function(){
        modal.revealSolution();
    })

    $('#riddle-modal').on("click", '#continue-button', function(){
        modal.hideRiddle();
    });

    $('#question-row .table-cell').on("click", function(){
        if(!$(this).hasClass("empty"))
            // pass 'this', which represents the element being clicked
            modal.showRiddle(this);
    });

    // prevent the buttons from being highlighted
    $('body').on("mousedown", ".minus, .plus", function(e){
        e.preventDefault();
    });

    modal.setHandlers();

    $('body').on("click", ".plus", function(e){
        var $score = $(this).closest(".team").find(".score")
        var score = parseInt($score.text())
        var val = parseInt($(".selected-cell").attr("data-points"));
        $score.text(score + val);
    });

    $('body').on("click", ".minus", function(e){
        var $score = $(this).closest(".team").find(".score")
        var score = parseInt($score.text())
        var val = parseInt($(".selected-cell").attr("data-points"));
        $score.text(Math.max(0,score - val));
    });

});
