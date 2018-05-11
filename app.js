(function(page){
  function App(){
    
    var secret = "";
    
    this.PlayGame = function(_secret){
      secret = _secret;
    }
    
    function GetBlacks(testGuess, testSecret){
      var blacks = "";
      for(var i = 0; i < testGuess; i++){
        if(testGuess[i] === testSecret[i]){
          blacks += "a";
          testGuess[i] = 0;
          testSecret[i] = 0;
        }
      }
      return blacks;
    }
    
    function GetWhites(testGuess, testSecret){
      var whites = "";
      for(var i = 0; i < testGuess.length; i++){
        for(var j = 0; j < testGuess.length; j++){
          if(testGuess[i] === testSecret[j] && testGuess[i] !== 0){
            whites += "z";
            testGuess[i] = 0;
            testSecret[i] = 0;
          }
        }
      }
      return whites;
    }
    
    function GetScore(guess){
      var testGuess = guess.slice(0);
      var testSecret = secret.slice(0);
      var result = "";
      
      //get whites
      result += GetBlacks(testGuess, testGuess);
      result += GetWhites(testGuess, testGuess);
      
      
    }
    
  }
  page.App = new App();
  
})(this)