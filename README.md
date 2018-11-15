# jeopardyML

This is a simple game to host your own jeopardy game
show for your friends or your students. Offline, no server, no garbage, no
installation, data and rendering is separated. You just need a single
file with your webbrowser.

This does not come with any game data, it is up to you to invent
categories, clues and solutions.

### Instructions:

 1. You copy jeopardy.xml into a new file, say myjeopardy.xml
 2. Edit myjeopardy.xml with a Texteditor and fill it with your own content.
 3. You open myjeopardy.xml with your webbrowser and make it fullscreen (try pressing *[F11]*)
    All the rendering is done by the browser via XSLT, XHTML, CSS and Javascript.

### Notes:

  * This is made for big screens, not for mobile phones.
  * points values, number of categories and number of questions are arbitrary
  * all categories must have same number of questions (i.e. no empty cells in the first hand)
  * controls are supposed to be done with keyboard as much as possible, to avoid
    the mouse pointer on the screen.
  * You may put arbitrary XHTML content into the clue and solutions

### Controls:

 * At the category intro screen:
    - *[Space]* to display the next category title
    - *[ESC]* to leave it
 * At the main screen:
    - *[i]* to show category intro again
    - *[s]* to show scores
    - *[o]* to show options
    - click on a cell to make it active and enter it if possible
    - *[1]*, *[2]* or any other numeric key to change the team which has
      solved the currently active cell (in case you made a mistake at first).
      This will also take away the points awarded to the old team and give them to the new team.
 * At the scores screen:
    - *[ESC]* to leave it
    - enter credits and team names as you like
    - click the + and - buttons to add and subtract scores according to the value of
       the active cell
 * At the options screen:
    - change number of teams and hit the button to leave

And this is what this game is all about:

 * At the 'riddle' screen initially only the clue is displayed
    - *[ESC]* to leave without solving
    - *[Space]* to reveal solution
    - *[1]*, *[2]* or any other numeric key to give Team 1/2/... the points and leave
    - *[Ctrl]+[1]* to substract points from Team 1 (and analogously for the other teams)
    - *[0]* to leave after having revealed the solution, if nobody has solved


### ToDo:

 * pick question cell using keyboard arrows
 * display images automatically as large as possible
 * play jeopardy themes if files exist
 * arrange score boxes in a grid for 6 players
 * proper localisation
 * a neat (animated?) screen to celebrate the winner
 * daily double, double jeopardy, final jeopardy or other special things
 * test with other browsers
