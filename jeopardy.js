
var icategory = -1;
var categories = $('#categories .table-cell').length;
var grades = $('#tableau #question-row').length;

var AUDIO_THINK_THEME = 'think_theme.mp3';
var AUDIO_THINK_THEME_REMIX = 'think_theme_remix.mp3';
var current_audio_src = "";

var irow_selector = 0;
var icol_selector = 0;

var KEYCODE_ESC = 27
var KEYCODE_SPACE = 32
var KEYCODE_1 = 49
var KEYCODE_F1 = 112
var KEYCODE_o = 79
var KEYCODE_s = 83
var KEYCODE_w = 87
var KEYCODE_n = 78
var KEYCODE_r = 82
var KEYCODE_0 = 48

var KEYCODE_left = 37
var KEYCODE_up = 38
var KEYCODE_right = 39
var KEYCODE_down = 40

var nteams;
var iteam = 1;

var negative_points_flag = false;
var answer_allow_only_iteam = 0;

var popup_window = null;

var modal = function(){}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function init(){
    setTeams();

    var idaily_double = parseInt(categories * grades * Math.random());
    $cell = $($('#tableau #question-row .table-cell').get(idaily_double))
    $cell.addClass('daily-double');

    popup_window = open('', 'jeoparty-solution-popup', 'height=400,width=400,resizable=yes,status=no,menubar=no,location=no,title="Solution"');
    print_popup('Solution will be displayed here. Close this if you do not need it. You may want to see this on a hidden screen.');

    modal.showScores();
}

function print_popup(text){
    if(popup_window != null) {
        popup_window.document.write(text);
        popup_window.document.close(); // needed for chrome and safari
    }
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

function animateBuzzerVisualOut(){
    if($("#player-color-visualisation").hasClass("is-triggered")){
        $('#player-color-visualisation').addClass("buzzer-visual-animation");
        setTimeout(function(){
            $('#player-color-visualisation').removeClass("buzzer-visual-animation");
            $('#player-color-visualisation').hide();
            resetBuzzerVisual();

        // this timeout should match the animation duration:
    }, 1500)
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

function startAudio(filename, loop){
    if (typeof(loop)==='undefined') loop = true;
    try{
        // stop the current volume fade animation:
        $('#'+current_audio_src.hashCode()).stop();

        console.log("starting audio:" + filename);
        // console.log("while old src is:" + current_audio_src);
        // console.log(document.getElementsByTagName("audio"));

        // if there is no audio element for this file yet, create one.
        var filename_hash = filename.hashCode()
        var audio = document.getElementById(filename_hash);
        if(audio == null) {
            var audio = document.createElement('audio');
            document.body.appendChild(audio);
            audio.src = filename;
            audio.setAttribute("id", filename_hash);
            // console.log(audio.id);
            audio.loop = loop;
            audio.volume = 0.0;
        }
        // if the new sound is not the same as the last one
        if(filename != current_audio_src) {
            // then fade out volume of the old one more quickly
            $('#'+current_audio_src.hashCode()).animate({volume: 0.0},1000, audio.pause);
            current_audio_src = filename;
        }
        // fade in the desired audio
        var audio = document.getElementById(filename_hash);
        audio.play();
        $('#'+filename_hash).animate({volume: 1.0}, 3*1000);

        return true;
    }catch(err){
        console.log(err);
        console.log(err.message);
        return false;
    }
}

function stopThemeMusic(){
    try{
        var current_hash = current_audio_src.hashCode();
        let audio = document.getElementById(current_hash);
        fade_millisec = 8*1000;
        //console.log("stopping audio");
        $('#'+current_hash).animate({volume: 0.0}, duration=fade_millisec,
                                   complete=function(){
            document.getElementById(current_hash).pause();
            //console.log("audio has stopped");
        });
    }catch(err){
        console.log(err);
        console.log(err.message);
    }
}

modal.revealSolution = function(){
    var solution = $('#riddle-modal').find(".solution")
    solution.css({
        "display": "flex",
    });

    solution.addClass("reveal");
}

modal.showDailyDouble = function(points){
    $('#gameplay').css("filter", "blur(5px)");
    $('#daily-double-modal').css({
        "display": "flex"
    });
    $('#daily-double-amount').text(points);
    $('.expanded').removeClass("expanded");
    $('#daily-double-modal').addClass("expanded");
    var iteam = 1
    $('#daily-double-team').html(
        $("#team"+iteam).prop("outerHTML")
    );
    $('#daily-double-team .score-control').hide()
    $('#daily-double-amount').focus()
    modal.setHandlers();
}

modal.hideDailyDouble = function(){

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var amount = parseInt($('#daily-double-amount').text());
    if (!isNumber(amount)) {
        throw "Amount is not a valid number."
    }

    var score = parseInt($("#team"+iteam).find(".score").text())

    if(amount < 5){
        throw "Amount is too small."
    }else if(amount > max_points && amount > score){
        throw "Amount is too large."
    }
    // write the amount into the cell attribute
    $('.selected-cell').attr("data-points", amount);

    $('#gameplay').css("filter", "blur(0px)");
    $('#daily-double-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
}

modal.showRiddle = function(cell){

    $('.selected-cell').removeClass("selected-cell");
    $(cell).addClass("selected-cell");
    var points = $(cell).attr("data-points");

    if($(cell).hasClass("daily-double")) {
        modal.showDailyDouble(points);
    }else{
        icol_selector = $(cell).closest(".table-row").children().index(cell);
        irow_selector = $('#tableau #question-row').index($(cell).closest(".table-row"))

        var category = $($("#categories .table-cell").get(icol_selector)).text()
        $('#category-points-title').text(category + " für " + points);
        var bbox = cell.getBoundingClientRect();

        // replace whatever is on the modal screen with clue and solution
        $('#riddle-modal .riddle-inner').html(
            $(cell).find(".clue").prop("outerHTML") +
                $(cell).find(".solution").prop("outerHTML")
        )

        // to keep the xml simple, force some formatting: put span around any text
        if($('#riddle-modal .clue img').length > 0){
            $('#riddle-modal .clue').html(
                $('#riddle-modal .clue img')[0].outerHTML +
                "<span>" + $('#riddle-modal .clue')[0].textContent + "</span>"
                );

        }
        if($('#riddle-modal .solution img').length > 0){
            $('#riddle-modal .solution').html(
                $('#riddle-modal .solution img')[0].outerHTML +
                "<span>" + $('#riddle-modal .solution')[0].textContent + "</span>"
                );
        }

        $('#riddle-modal .riddle-inner').scrollTop(0)

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

    print_popup($('#riddle-modal .solution')[0].innerHTML);
}

modal.hideRiddle = function(){
    // make sure all teams may answer again after daily double
    answer_allow_only_iteam = 0;

    $('#riddle-modal').hide()
    $('#riddle-modal').removeClass("expanded");
    $('#riddle-modal').css({
        borderWidth:3
    });
    modal.setHandlers();
}

modal.showScores = function(){
    startAudio(AUDIO_THINK_THEME);
    $('#gameplay').css({"filter": "blur(5px)",
                        'transition':'all 2s ease-in'
                       });
    $('#teams-modal').css({
        "display": "flex",
    });
    $('.expanded').removeClass("expanded");
    $('#teams-modal').addClass("expanded");

    modal.setHandlers();

}

modal.hideScores = function(){
    $('#gameplay').css({"filter": "blur(0px)",
                        'transition':'all 2s ease-out'
                       });

    $('#teams-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
    stopThemeMusic();
}

modal.showWinner = function(){
    // if there is a remix, use that, otherwise try the default audio theme
    if(!startAudio(AUDIO_THINK_THEME_REMIX))
        startAudio(AUDIO_THINK_THEME);

    $('#gameplay').css("filter", "blur(10px)");
    $('#winner-modal').css({
        "display": "flex"
    });
    $('.expanded').removeClass("expanded");
    $('#winner-modal').addClass("expanded");

    var iteams = [];
    for(var i = 1; i <= nteams; i++){
        iteams[iteams.length] = i;
    }
    iteams.sort(function(a, b){
        var $score = $("#teams-modal #team"+a).find(".score")
        var ascore = parseInt($score.text())
        $score = $("#teams-modal #team"+b).find(".score")
        var bscore = parseInt($score.text())
        return bscore - ascore;
    });

    $('#winner-team-rank1').removeClass("winner-team-rank1-in-animation");
    $('#winner-team-rank2').removeClass("winner-team-rank2-in-animation");
    $('#winner-team-rank3').removeClass("winner-team-rank3-in-animation");
    $('#podium').removeClass("podium-in-animation");

    $('#winner-team-rank1').html(
        // attention, this must be the element below teams-modal,
        // because there is another one in the double jeopardy screen.
        $("#teams-modal #team"+iteams[0]).prop("outerHTML")
    );
    $('#winner-team-rank2').html(
        $("#teams-modal #team"+iteams[1]).prop("outerHTML")
    );
    $('#winner-team-rank3').html(
        $("#teams-modal #team"+iteams[2]).prop("outerHTML")
    );
    $('#winner-modal .score-control').hide()

    $('#podium').addClass("podium-in-animation");
    setTimeout(function(){
        startConfetti();

        $('#winner-team-rank3').addClass("winner-team-rank3-in-animation");
        setTimeout(function(){
            $('#winner-team-rank2').addClass("winner-team-rank2-in-animation");
            setTimeout(function(){
                $('#winner-team-rank1').addClass("winner-team-rank1-in-animation");
            },
                   // the timeout should match the animation length
                       8000);
        },
                   // the timeout should match the animation length
                   8000);
    },
               // the timeout should match the animation length
               8000);

    modal.setHandlers();
}

modal.hideWinner = function(){
    $('#gameplay').css("filter", "blur(0px)");
    $('#winner-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
    confetti.stop();
    stopThemeMusic();
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
    // on page load, the sound is not played but instead there is an error:
    //AbortError: The fetching process for the media resource was aborted by the user agent at the user's request.
    startAudio(AUDIO_THINK_THEME);

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
    $('#gameplay').css({"filter": "blur(0px)",
                       'transition':'all 3s ease-out'
                       });
    $('#category-intro-modal').hide()
    $('.expanded').removeClass("expanded");
    modal.setHandlers();
    stopThemeMusic();
}

function resetBuzzerVisual(){
    $('#player-color-visualisation').hide();
    $("#player-color-visualisation").removeClass("is-triggered");
    for(var iteam = 1; iteam <= nteams; iteam++) {
        $("#player-color-visualisation").removeClass("buzzer-border-team-"+iteam);
    }
}


modal.setHandlers = function(){
    $(window).off("keydown.riddle-modal");
    $(window).off("keydown.body");
    $(window).off("keydown.teams-modal");
    $(window).off("keydown.category-intro-modal");
    $(window).off("keydown.daily-double-modal");
    $(window).off("keydown.winner-modal");

    if($('#teams-modal').hasClass("expanded")) {
        $(window).on("keydown.teams-modal", function(e){
            if(e.keyCode == KEYCODE_ESC){
                e.preventDefault();
                modal.hideScores();
            }else if(e.keyCode == KEYCODE_F1){
                e.preventDefault();
                modal.hideScores();
                modal.showCategoryIntro();
            }

        });
    }else if($('#daily-double-modal').hasClass("expanded")) {
        $(window).on("keydown.daily-double-modal", function(e){
            if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                try{
                    answer_allow_only_iteam = iteam;
                    modal.hideDailyDouble();
                    $(".selected-cell").removeClass("daily-double");
                    $(".selected-cell").click();
                }catch(err){
                    console.log(err);
                    console.log(err.message);
                }
            }else if(e.keyCode == KEYCODE_up){
                e.preventDefault();
                // iteam is 1-based, so cycling with modulo goes like this:
                iteam = (iteam - 1 + 1 + nteams) % nteams + 1;
                $('#daily-double-team').html(
                    $("#team"+iteam).prop("outerHTML")
                );
                $('#daily-double-team .score-control').hide();
            }else if(e.keyCode == KEYCODE_down){
                e.preventDefault();
                // iteam is 1-based, so cycling with modulo goes like this:
                iteam = (iteam - 1 - 1 + nteams) % nteams + 1;
                $('#daily-double-team').html(
                    $("#team"+iteam).prop("outerHTML")
                );
                $('#daily-double-team .score-control').hide();
            }
        });
    }else if($('#winner-modal').hasClass("expanded")) {
        $(window).on("keydown.winner-modal", function(e){
            if(e.keyCode == KEYCODE_ESC){
                modal.hideWinner();
            } else if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                fade_millisec = 3000;
                $('#'+current_audio_src.hashCode()).animate({volume: 0.0}, fade_millisec);
                setTimeout(function(){
                    window.history.go(-1);
                }, fade_millisec);
            }
        });
    }else if($('#riddle-modal').hasClass("expanded")) {
        $(window).on("keydown.riddle-modal", function(e){
            if(e.keyCode == KEYCODE_ESC){
                e.preventDefault();
                modal.hideRiddle();
                resetBuzzerVisual();
                $('#riddle-modal').removeClass("waiting-for-buzzers");
            } else if(e.keyCode == KEYCODE_SPACE){
                e.preventDefault();
                animateBuzzerVisualOut();
                modal.revealSolution();
            }else if(e.keyCode == KEYCODE_0){
                e.preventDefault();
                $(".selected-cell").addClass("empty");
                modal.hideRiddle();
                resetBuzzerVisual();
                $('#riddle-modal').removeClass("waiting-for-buzzers");
            }else if(e.keyCode == KEYCODE_n){
                negative_points_flag = true;
                // deactivate it after a couple of seconds
                setTimeout(function(){
                    negative_points_flag = false;
                },3000);
            }else if(e.keyCode == KEYCODE_r){
                resetBuzzerVisual();
                // and wait for new buzzer hits
                $('#riddle-modal').addClass("waiting-for-buzzers");

            } else if(e.keyCode >= KEYCODE_1 && e.keyCode < KEYCODE_1 + nteams){
                e.preventDefault();
                var iteam = e.keyCode-KEYCODE_1+1;

                // make sure only the player who is allowed to answers the daily double
                if(answer_allow_only_iteam > 0 && iteam != answer_allow_only_iteam)
                    return
                if($("#player-color-visualisation").hasClass("is-triggered") &&
                   !$("#player-color-visualisation").hasClass("buzzer-border-team-"+iteam))
                    return

                var $score = $("#teams-modal #team"+iteam).find(".score")
                var score = parseInt($score.text())
                var val = parseInt($(".selected-cell").attr("data-points"));

                if(e.ctrlKey || negative_points_flag){
                    // if ctrl key is down, the team made a wrong guess, so give them
                    // minus points!
                    $score.text(Math.max(0,score - val));
                    var x_sign = "&#x2716;";
                    animateSymbol(x_sign, "team-"+iteam);
                    animateBuzzerVisualOut();

                    negative_points_flag = false;
                }else{
                    $(".selected-cell").addClass("solved-by-team-"+iteam);
                    $(".selected-cell").addClass("empty");
                    $score.text(score + val);
                    var check_sign = "&#x2714;";
                    animateSymbol(check_sign, "team-"+iteam);
                    animateBuzzerVisualOut();
                    // setTimeout(function(){
                    //     animateSymbol(""+val, "team-"+iteam);
                    // },1500);
                    setTimeout(modal.hideRiddle,
                               // this timeout should match the animation duration:
                               1*1500);
                    $('#riddle-modal').removeClass("waiting-for-buzzers");

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

            if(e.keyCode == KEYCODE_F1){
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

            }else if(e.keyCode == KEYCODE_w){
                e.preventDefault();
                modal.showWinner();

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
    });

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
