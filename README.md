# jeopardyML

This is a simple game to host your own jeopardy game
show for your friends. Offline, no server, no garbage, no
installation, data and rendering is separated. You just have to open a single
file in your webbrowser.

This does not come with any game data, it is up to you to invent
categories, clues and solutions.

Buzzers: This thing does not interact in any way with buzzer hardware
because there is no need to. The task of selecting the player who has
hit his knob the quickest has nothing to do with the task of selecting
and displaying questions, and managing scores.


### Instructions:

 1. You copy jeopardy.xml into a new file, say myjeopardy.xml
 2. Edit myjeopardy.xml with a texteditor and fill it with your own content.
 3. You open myjeopardy.xml with your webbrowser and make it fullscreen (try pressing *[F11]*)
    All the rendering is done by the browser via XSLT, XHTML, CSS and Javascript.

### Notes:

  * this is made for big screens, not for mobile phones.
  * points values, number of categories and number of questions are arbitrary and
    are all defined in the xml file
  * a random cell will be made a "Daily Double". Only the player who chose the cell
    is allowed to answer, but this rule must be enforced by the show host, of course.
    After placing bet, the mechanics of solving the riddle is identical to the
    other cells.
  * all categories must have same number of questions (i.e. no empty cells in the
    first hand)
  * controls are supposed to be done with keyboard as much as possible, to avoid
    the mouse pointer on the screen. You may want to map an infrared remote
    handle to keyboard keys.
  * you may put arbitrary XHTML content into the clues and solutions
  * if there is a file 'think_theme.mp3' in the folder then this audio will be played during
    category intro and at the scores screen. Due to filesize and legal reasons, such an
    audio file is not included in this repository, but you can find it elsewhere
    on the web (search for 'jeopardy think theme').

### Controls:

 * At the category intro screen:
    - *[Space]* to display the next category title
    - *[ESC]* to leave it
 * At the main screen:
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
    - *[1]*, *[2]* or any other numeric key to give team 1/2/... the points and return
    - *[Ctrl]+[1]* to substract points from team 1 (and analogously for the other teams)
    - Pressing first *[n]* and then a number (within 3 seconds) will also yield negative points for
      the respective team. This may be useful if the showmaster is using an
      infrared (IR) remote which is mapped to keyboard keys.
    - *[0]* to return after having revealed the solution, if nobody has solved

### Acknowledgements

 * The beautiful confetti animation was written by Hemn Chawroka,
   thank you so much!

### ToDo:

 * display images automatically as large as possible
 * arrange score boxes in a grid
 * proper localisation
 * double jeopardy, final jeopardy
 * test with other browsers
 * deal with several teams having the same score on the winner screen
