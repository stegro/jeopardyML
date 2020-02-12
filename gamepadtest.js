/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;

function connecthandler(e) {
    addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    for (var i=0; i<gamepad.buttons.length; i++) {
    }
    rAF(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
}

function updateStatus() {
    scangamepads();
    for (j in controllers) {
        var controller = controllers[j];
        // var d = document.getElementById("controller" + j);
        // var buttons = d.getElementsByClassName("button");
        for (var i=0; i<controller.buttons.length; i++) {
            //var b = buttons[i];
            var val = controller.buttons[i];
            var pressed = val == 1.0;
            if (typeof(val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }
            //var pct = Math.round(val * 100) + "%";
            //b.style.backgroundSize = pct + " " + pct;

            if (pressed) {
                // for (var iteam = 0; iteam < buttons.length; iteam++) {
                //     if(buttons[iteam] == i) {
                //         // the button of this team has been pressed!
                //         console.log("Team Button pressed" + iteam);
                //     }
                // }

                // these calculations on the button index work for the
                // wired version of the BUZZ(tm) controller for
                // Playstation2:
                iteam = Math.floor(i / 5)+1;
                ibutton = Math.floor(i % 5);
                BIG_BUZZER_IBUTTON = 0;

                console.log("Button pressed" +i+"; iteam:" + iteam+"; ibutton:" + ibutton);

                // listen to buttons only when the riddle-modal screen is shown
                if(ibutton == BIG_BUZZER_IBUTTON && $('#riddle-modal').hasClass("waiting-for-buzzers")) {
                    if(!$("#player-color-visualisation").hasClass("is-triggered")){
                        $("#player-color-visualisation").addClass("buzzer-border-team-"+iteam);
                        $("#player-color-visualisation").addClass("is-triggered");
                        $('#player-color-visualisation').css({
                            "display": "inline-block",

                        });
                    }
                }
            } else {
                // button is not pressed.
            }
        }
    }
    rAF(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (!(gamepads[i].index in controllers)) {
                addgamepad(gamepads[i]);
            } else {
                controllers[gamepads[i].index] = gamepads[i];
            }
        }
    }
}

if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
    setInterval(scangamepads, 500);
}
