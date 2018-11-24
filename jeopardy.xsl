<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="utf-8" indent="yes" />

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>JEOPARDY!</title>

        <style>
          :root {
          --grades: <xsl:value-of select="count(/jeopardy/points)"/>;
          --categories: <xsl:value-of select="count(/jeopardy/category)"/>;
          --header_height: 5%;
          }
        </style>

        <script>
          <!-- for XSLT 2 this could be simple, but this is for XSLT 1.0: -->
          <xsl:variable name="max_points">
            <xsl:for-each select="/jeopardy/points">
              <xsl:sort select="." data-type="number" order="descending"/>
              <xsl:if test="position() = 1"><xsl:value-of select="." /></xsl:if>
            </xsl:for-each>
          </xsl:variable>
          var max_points = <xsl:copy-of select="$max_points" />
        </script>

        <link rel="stylesheet" href="jeopardy.css"/>
        <link rel="stylesheet" type="text/css" href="celebrate.css" />
        <script src="jquery.min.js"></script>
        <script src="jeopardy.js" ></script>
        <script type="text/javascript" src="celebrate.js"></script>

      </head>
      <body onload="init();">
        <div id="gameplay">
          <table id="tableau">
            <tr class="table-row" >
              <td>
                <!-- give the surrounding tag an attribute:-->
                <xsl:attribute name="colspan">
                  <xsl:value-of select="count(/jeopardy/category)"/>;
                </xsl:attribute>
                <table id="title-tableau">
                  <tr class="table-row" id="categories">
                    <xsl:for-each select="/jeopardy/category">
                      <th class="table-cell">
                        <xsl:value-of select="title" />
                      </th>
                    </xsl:for-each>
                  </tr>
                </table>
              </td>
            </tr>

            <xsl:for-each select="/jeopardy/points">
              <tr class="table-row" id="question-row">

                <!--
                    Now put the points value into a variable, in order to be
                    able to access it inside the inner nested for-each
                -->
                <xsl:variable name="points">
                  <xsl:value-of select="./text()"/>
                </xsl:variable>
                <xsl:variable name="ipoints">
                  <xsl:number />
                </xsl:variable>

                <xsl:for-each select="/jeopardy/category">
                  <td class="table-cell">
                    <!-- give the surrounding tag an attribute:-->
                    <xsl:attribute name="data-points">
                      <xsl:copy-of select="$points" />
                    </xsl:attribute>

                    <div class="points"><xsl:copy-of select="$points" /></div>
                    <div class="clue">
                      <!-- <xsl:value-of select="questions/riddle[0 + $ipoints]/clue" /> -->
                      <xsl:copy-of select="questions/riddle[0 + $ipoints]/clue/node()"/>
                    </div>
                    <div class="solution">
                      <!-- <xsl:value-of select="questions/riddle[0 + $ipoints]/solution" /> -->
                      <xsl:copy-of select="questions/riddle[0 + $ipoints]/solution/node()"/>
                    </div>
                  </td>
                </xsl:for-each>
              </tr>
            </xsl:for-each>
          </table>
        </div>

        <div id="daily-double-modal" class="modal-wrapper">
          <h1>Double Jeopardy!</h1>

          <p>
            Einsatz:
            <span id="daily-double-amount" contenteditable="true">999</span>
          </p>

          <div id="daily-double-team">
          </div>
        </div>

        <div class="symbol-box">
        </div>

        <div id="teams-modal" class="modal-wrapper">

          <div class="team solved-by-team-1" id="team1" style="display:none">
            <h3 class="name" contenteditable="true">Team 1</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

          <div class="team solved-by-team-2" id="team2" style="display:none">
            <h3 class="name" contenteditable="true">Team 2</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

          <div class="team solved-by-team-3" id="team3" style="display:none">
            <h3 class="name" contenteditable="true">Team 3</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

          <div class="team solved-by-team-4" id="team4" style="display:none">
            <h3 class="name" contenteditable="true">Team 4</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

          <div class="team solved-by-team-5" id="team5" style="display:none">
            <h3 class="name" contenteditable="true">Team 5</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

          <div class="team solved-by-team-6" id="team6" style="display:none">
            <h3 class="name" contenteditable="true">Team 6</h3>
            <h3 class="score" contenteditable="true">0</h3>
            <div class="score-control">
              <span class="plus">+</span>
              <span class="minus">-</span>
            </div>
          </div>

        </div>

        <div id="riddle-modal" class="modal-wrapper">
          <table id="riddle-modal-table">
            <tr id="riddle-title">
              <td id="category-points-title"></td>
              <td id="continue-button">Zurück <kbd>ESC</kbd></td>
              <td id="solution-button">
                Lösung zeigen <kbd>Leertaste</kbd>.
                Werten für <kbd>1</kbd> <kbd>2</kbd> ...
                +<kbd>Ctrl</kbd> für Abzug.
              </td>
            </tr>
            <tr>
              <td class="modal-inner" colspan="3">
              </td>
            </tr>
          </table>
        </div>

        <div id="category-intro-modal" class="modal-wrapper">

        </div>

        <div id="options-modal" class="modal-wrapper">
          <div>
          <h1>JEOPARDY!</h1>

          <p>
          <select>
            <option value="1">1 Team</option>
            <option value="2">2 Teams</option>
            <option value="3">3 Teams</option>
            <option value="4" selected="true">4 Teams</option>
            <option value="5">5 Teams</option>
            <option value="6">6 Teams</option>
          </select>
          <input class="submit" type="button" id="submit" value="Anwenden" onclick="modal.hideOptions()" />
          <script>
            if(window.navigator.platform.indexOf("Mac") == 0){
            $('#fullscreen, #mac').show();
            } else if(window.navigator.platform.indexOf("Win") == 0){
            $('#fullscreen, #windows').show();
            }
          </script>
          </p>
          </div>
        </div>

      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
