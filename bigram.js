const { MarkovMachine } = require("./markov");

class BigramMarkovMachine extends MarkovMachine {


 /** set Markov bigram chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "the hat": [null]}
  */

 makeChains(){
  let chains = {};

  for(let i = 0; i < this.words.length-1; i++){
    let bigram = `${this.words[i]} ${this.words[i+1]}`;
    let nextWord = this.words[i + 2] || null;

    if(chains.includes(bigram)){
      chains[bigram].push(nextWord);
    } else {
      chains[bigram] = [nextWord];
    }
  }
  this.chains = chains;
 }




}

module.exports= { BigramMarkovMachine, };