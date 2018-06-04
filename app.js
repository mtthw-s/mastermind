(function(page){
  function MM(){
    var self = this;
    var secret = "";
    var valids = "byrgot";
    self.future = [];
    var dead = [];
    
    this.PlayGame = function(_secret){
      secret = _secret;
    }
    
    function GetRandomNumber(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
    
    function generateRandomGuess(){
      var guess = GetRandomNumber(0,5);
      guess += GetRandomNumber(0,5);
      guess += GetRandomNumber(0,5);
      guess += GetRandomNumber(0,5);
      return guess;
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
    
    this.GetFirstGuess = function(){
      var guess = self.future.findIndex(function(e){
        return e.flat == "1122";
      })
      return getByIndex(guess);
    }
    
    this.GetScore = function(rawScore, guess){
      guess.score.blacks = GetResultFromRaw(rawScore, "a");
      guess.score.whites = GetResultFromRaw(rawScore, "z");
      return guess;
    }
    
    this.getGuess = function(prevGuess){
      //prevGuess.score.black = GetResultFromRaw(rawScore, "a");
      //prevGuess.score.white = GetResultFromRaw(rawScore, "z");
      RemoveIncorrectGuesses(prevGuess);
      return self.future[0];
    }
    
    function RemoveIncorrectGuesses(state){
      var newFuture = [];
      for(var i = 0; i < self.future.length; i++){
        if(self.future[i].flat != state.flat){
          self.future[i].GetScore(state.flat);
          if(self.future[i].score.blacks == state.score.blacks && self.future[i].score.whites == state.score.whites && state.flat != self.future[i].flat){
            newFuture.push(self.future[i]);
          }
        }
        
      }
      self.future = newFuture;
    }
    
    function GetResultFromRaw(score, item){
      var count = 0;
      for(var i = 0; i < score.length; i++){
        if(score[i] == item){
          count++;
        }
      }
      return count;
    }
    
    function getByIndex(index){
      if(index > -1){
        var s = self.future[index];
        self.future.splice(index, 1);
        return s;
      }
    }
    
    this.Setup = function(){
      for(var i = 1; i < 7; i++){
        for(var j = 1; j < 7; j++){
          for(var k = 1; k < 7; k++){
            for(var l = 1; l < 7; l++){
              self.future.push(new MMState([i,j,k,l]));
            }
          }
        }
      }
    }
  
    
  }
  
  page.MM = new MM();
  
})(this)