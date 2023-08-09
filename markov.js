"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chains = {};
    const words = this.words;
    const lastWordIdx = words.length - 1;

    for (let x = 0; x < (words.length - 1); x++) {
      if (words[x] in chains) {
        chains[words[x]].push(words[x + 1]);
      } else {
        chains[words[x]] = [words[x + 1]];
      }
    }

    if (words[lastWordIdx] in chains) {
      chains[words[lastWordIdx]].push(null);
    } else {
      chains[words[lastWordIdx]] = [null];
    }

    return chains;
  }





  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    const newStoryArr = [];

    let currWord = this.words[0];

    while (currWord !== null) {
      newStoryArr.push(currWord);
      const randIndex = Math.floor(Math.random() * (this.chains[currWord].length));
      currWord = this.chains[currWord][randIndex];
    }

    return newStoryArr.join(" ");
  }
}

let marky = new MarkovMachine("I am very good lots of text and some texts.");

module.exports = { MarkovMachine, };