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
 2. Edit myjeopardy.xml with a Texteditor and fill it with your own content.
 3. You open myjeopardy.xml with your webbrowser and make it fullscreen (try pressing *[F11]*)
    All the rendering is done by the browser via XSLT, XHTML, CSS and Javascript.

### Notes:

  * this is made for big screens, not for mobile phones.
  * points values, number of categories and number of questions are arbitrary
  * all categories must have same number of questions (i.e. no empty cells in the first hand)
  * controls are supposed to be done with keyboard as much as possible, to avoid
    the mouse pointer on the screen.
  * you may put arbitrary XHTML content into the clues and solutions

### Controls:

 * At the category intro screen:
    - *[Space]* to display the next category title
    - *[ESC]* to leave it
 * At the main screen:
    - *[i]* to show category intro again
    - *[s]* to show scores
    - *[o]* to show options
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

And this is what this game is all about:

 * At the 'riddle' screen initially only the clue is displayed
    - *[ESC]* to leave without solving
    - *[Space]* to reveal the solution
    - *[1]*, *[2]* or any other numeric key to give team 1/2/... the points and return
    - *[Ctrl]+[1]* to substract points from team 1 (and analogously for the other teams)
    - *[0]* to return after having revealed the solution, if nobody has solved


### ToDo:

 * display images automatically as large as possible
 * play jeopardy sound themes if files exist
 * arrange score boxes in a grid
 * proper localisation
 * a neat (animated?) screen to celebrate the winner
 * daily double, double jeopardy, final jeopardy or other special things
 * test with other browsers
