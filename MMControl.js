(function(page){
  function MMControl(){
    this.PlayGameSolo = function(){
      
    }
    
    this.playGame = function(){
      MM.Setup();
      var guess = MM.GetFirstGuess();
      var raw = prompt(guess.flat);
      guess = MM.GetScore(raw, guess);
      while(guess.score.blacks < 4){
        guess = MM.getGuess(guess);
        raw = prompt(guess.flat);
        //debugger;
        guess = MM.GetScore(raw, guess);
      }
    }
    
    
  }

  page.MMControl = new MMControl();
})(this)