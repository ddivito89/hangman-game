
  //Define page variables
  var games = [{
    hint: "Stronghold of House Stark",
    answer: "Winterfell"
  }, {
    hint: "The sword of John Snow",
    answer: "Longclaw"
  }];

  document.onkeydown = function(event) {
  //press any key
  newGame(0, 0, 0);
  }


  //game function
  function newGame(x, wins, losses) {
    //declare game variables and functions
    var wordHint = games[x].hint;
    var word = games[x].answer;
    var letterArray = [];
    var guessArray = [];
    var wrongArray = [];
    var gameOver = false;
    var guessesRemaining = 5;

    //doc selectors as variables
    var hintDiv = document.getElementById("hint");
    var wordDiv = document.getElementById("word");
    var statusDiv = document.getElementById("status");
    var badGuessDiv = document.getElementById("badGuess");
    var scoreDiv = document.getElementById("score");

    //alpha validation function
    function isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }

    for (var i = 0; i < word.length; i++) {
      letterArray.push(word.charAt(i).toUpperCase());
      guessArray.push("_");
    }

    hintDiv.innerHTML = wordHint;
    wordDiv.innerHTML = guessArray.join(" ");
    statusDiv.innerHTML = (guessesRemaining + " guesses left");
    scoreDiv.innerHTML = ("Wins: " + wins + "   Losses: " + losses);
    badGuessDiv.innerHTML = ("bad guesses: ");


    //GUESSING GAME
    document.onkeydown = function(event) {
      if (guessesRemaining > 0) {

        var userGuess = event.key.toUpperCase();

        if (isLetter(userGuess)) {
          var guessValid = false;
          if (letterArray.indexOf(userGuess) > -1) {
            for (i = 0; i < letterArray.length; i++) {
              if (letterArray[i] === userGuess) {
                guessArray[i] = userGuess;
              }
              wordDiv.innerHTML = guessArray.join(" ");
            }
            //see if game over as and declare
            if (guessArray.indexOf("_") === -1) {
              wins++;
              gameOver = true;
              alert("YOU WIN! Answer is " + word.toUpperCase());
            }
          } else {
            if (wrongArray.indexOf(userGuess) === -1) {
              guessesRemaining--;
              wrongArray.push(userGuess)
              if (guessesRemaining === 0) {
                losses++;
                gameOver = true;
                alert("YOU LOSE! Answer was " + word.toUpperCase());

              } else {
                badGuessDiv.innerHTML = ("bad guesses: " + wrongArray.join(", "));
                statusDiv.innerHTML = (guessesRemaining + " guesses left");
              }
            }
          }
        }
      }
      if (gameOver === true) {
        x++;
        if (x > games.length - 1) {
          alert("OUT OF PUZZLES.  GAME RESETTING");
          newGame(0, 0, 0);
        } else {
          newGame(x, wins, losses);
        }
      }
    }
  };
