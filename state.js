function State(code){
  var self = this;
  self.score = {blacks: 0, whites: 0};
  self.code;
  self.flat;
  
  if(typeof code !== "undefined"){
    self.code = code;
    self.flat = code.join("");
  }
  
  this.GetScore = function(compare){
      var testGuess = self.flat;
      var testCompare = compare;
      var result = "";
      
      //get blacks
      var res = GetBlacks(testGuess, testCompare);
      self.score.blacks = res.blacks;
      //get whites
      res = GetWhites(res.testGuess, res.testCompare);
      self.score.whites = res.whites;
      return self.score;
    }
  
  function GetWhites(testGuess, testCompare){
      var whites = 0;
      for(var i = 0; i < testGuess.length; i++){
        for(var j = 0; j < testCompare.length; j++){
          if(testGuess[i] === testCompare[j] && testGuess[i] != "0"){
            whites++;// += "z";
            //testGuess[i] = "0";
            testGuess = replaceAt(testGuess, i, "0");
            testCompare = replaceAt(testCompare, j, "0");
            //testCompare[i] = "0";
          }
        }
      }
      return {whites: whites, testGuess: testGuess, testCompare: testCompare};
    }
    
    function replaceAt(str, index, replacement) {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }
    
    function GetBlacks(testGuess, testCompare){
      var blacks = 0;
      for(var i = 0; i < testGuess.length; i++){
        if(testGuess[i] === testCompare[i] && (testGuess[i] != "0" || testCompare[i] != "0")){
          blacks++;// += "a";
          testGuess = replaceAt(testGuess, i, "0");
          testCompare = replaceAt(testCompare, i, "0");
          //testGuess[i] = "0";
          //testCompare[i] = "0";
        }
      }
      return {blacks: blacks, testGuess: testGuess, testCompare: testCompare};
    }

  
}