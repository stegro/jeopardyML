# jeopardyML

This is a simple game to host your own jeopardy game
show for your friends. Offline, no server, no garbage, no
installation, data and rendering is separated. You just have to open a single
file in your webbrowser.
All the rendering is done by the browser via XSLT, XHTML, CSS and Javascript.

This does not come with any game data, it is up to you to invent
categories, clues and solutions.

Buzzers: This thing does not interact in any way with buzzer hardware
because there is no need to. The task of selecting the player who has
hit his knob the quickest has nothing to do with the task of selecting
and displaying questions, and managing scores.

### To make it work: Safety Policy

There has been a Firefox security patch which restricts local file loads by local pages.
In order to use jeopardyML on your local comuter you must roll back that patch (at least temporarily):
In Firefox, open the `about:config` settings, search for the key `privacy.file_unique_origin` and set its value to `False`.

Firefox allows to disable automatic playback of sounds on page
load. To get music right at the start of the game, you must un-block
autoplay. Instructions can be found at
https://support.mozilla.org/en-US/kb/block-autoplay

For the Chrome browser, one way to make this game work is to use the command line argument `--allow-file-access-from-files`.

### Instructions:

#### Preparations:

 1. You copy jeopardy.xml into a new file, say myjeopardy.xml
 2. Edit myjeopardy.xml with a texteditor and fill it with your own content.
 3. (optional) download music theme mp3 files from somewhere and put them into the same
    folder, see the *Notes* section
 4. (optional) To get a nice background in jeopardy.html,
    you may want to create a subfolder "logo" and download a logo image into "logo/jeopardy_gold.png".
    For example the file [https://www.logolynx.com/images/logolynx/d7/d7d438a124190a7a0fae5a8fdded33ea.png](https://www.logolynx.com/images/logolynx/d7/d7d438a124190a7a0fae5a8fdded33ea.png)
    that is linked at -[https://pixshark.com/jeopardy-logo-2014.htm](https://pixshark.com/jeopardy-logo-2014.htm) or other sites
    (if the laws of your country allow this).
    You may also want to edit jeopardy.html and link all your xml files there, to access
    them more easily during the game.

#### How to be game master:

 1. Make sure you know the official rules of the jeopardy quiz game. Decide which rules you want to follow for your game and which not.
 1. Make sure your browser allows to read local pages to read local files. See the note in the section above.
 2. Make sure you have read the section *Controls* below and you are familier with the relevant keyboard buttons.
 2. Open the welcome page jeopardy.html or just directly your myjeopardy.xml page with your webbrowser.
 3. Make the view fullscreen (try pressing *[F11]*).
 4. The page opens a javascript popup window to secretly display the solution.
    Although you usually block popup windows, you may
    want to allow this one. The Window permanently displays the respective solution.
    You can move it to a second screen which only the game master can see.


### Notes:

  * this is made for big screens, not for mobile phones.
  * points values, number of categories and number of questions are arbitrary and
    are all defined in the xml file
  * a random cell will be made a "Daily Double". After placing bet, the mechanics
    of solving the riddle is identical to the other cells, except that only the player who chose the cell
    is allowed to answer.
  * all categories must have same number of questions (i.e. no empty cells in the
    first hand)
  * controls are supposed to be done with keyboard as much as possible, to avoid
    the mouse pointer on the screen. You may want to map an infrared remote
    handle to keyboard keys.
  * you may put arbitrary XHTML content into the clues and solutions
  * if there is a file 'think_theme.mp3' in the folder then this audio will be played during
    category intro and at the scores screen. Due to filesize and legal reasons, audio files are
    not included in this repository, but you can find some elsewhere
    on the web (search for 'jeopardy think theme' or remixes on e.g. soundcloud).
  * if there is a file 'think_theme_remix.mp3' in the folder then this audio will be played during
    winner screen. Otherwise 'think_theme.mp3' will be tried.

### Controls:

 * At the category intro screen:
    - *[Space]* to display the next category title
    - *[ESC]* to leave it
 * At the main screen (the big table):
    - *[i]* to show category intro again
    - *[s]* to show scores
    - *[o]* to show options
    - *[w]* to show winner screen (preferably at end of the game)
    - click on a cell to select it and enter it if possible
    - *[Space]* is like clicking on the selected cell
    - *[1]*, *[2]* or any other numeric key to change the team which has
      solved the currently selected cell. This is useful if you have made a mistake at first
      and would like to correct the team that has solved.).
      This will also take away the points awarded to the old team and give them to the new team.
    - "[up]","[down]","[left]","[right]", keyboard arrows to move the cell selector
 * At the scores screen:
    - *[ESC]* to leave it
    - enter credits and team names as you like
    - click the + and - buttons to add and subtract scores according to the value of
       the selected cell
 * At the options screen:
    - change number of teams and hit the button to leave
 * At the winner screen:
    - *[ESC]* to leave it
    - *[SPACE]* to leave it and go back one page in history, i.e. to the page visited
      before this xml file. You may want to enlist links to all the rounds you created
      in jeopardy.html, for example, and go back to that page this way.
 * At the Daily Double screen:
    - *[up]*,*[down]* to change the teams score that is displayed
    - enter the amount via keyboard. If it is <5 or larger than the maximum points
      in this game (i.e. 500 in the template) or the score of the team, you cannot
      proceed.
    - *[SPACE]* to proceed to the riddle screen

And this is what this game is all about:

 * At the 'riddle' screen initially only the clue is displayed
    - *[ESC]* to leave without solving
    - *[Space]* to reveal the solution
    - *[r]* to reset the buzzer visuals (if there are any) and allow for new buzzer hits
    - *[1]*, *[2]* or any other numeric key to give team 1/2/... the points and return
    - *[Ctrl]+[1]* to substract points from team 1 (and analogously for the other teams)
    - Pressing first *[n]* and then a number (within 3 seconds) will also yield negative points for
      the respective team. This may be useful if the showmaster is using an
      infrared (IR) remote which is mapped to keyboard keys.
    - *[0]* to return after having revealed the solution, if nobody has solved

That is, if you want to play with Playstation2 USB buzzers, then you have to press *[r]* right after reading the question aloud. It is only after that that players can hit their buttons.

### Acknowledgements:

 * The beautiful confetti animation was written by Hemn Chawroka,
   thank you so much!

### ToDo:

 * timers
 * arrange score boxes in a grid
 * proper localisation
 * double jeopardy, final jeopardy
 * test with other browsers (this is only made for Firefox right now)
 * deal with several teams having the same score on the winner screen
 * kill any sound that was embedded in clue or solution when leaving
 * get back the solution pop, if it was accidentally closed.
 * solution popup with white font on black screen, for readability and
   less ambient light.
