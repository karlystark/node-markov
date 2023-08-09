"use strict";

const { MarkovMachine } = require("./markov.js");
let mark;
let mark2;

beforeAll(function () {
  mark = new MarkovMachine("The cat in the hat.");
  mark2 = new MarkovMachine("The plants seemed to be happy after a day of rain, happy to be happy. Plants know how to be happy, happy plants after rain.");
});

describe("getChains", function () {

  test("returns correct chains object with single branch", function () {

    expect(mark.getChains()).toEqual({
      "The": ["cat"],
      "cat": ["in"],
      "in": ["the"],
      "the": ["hat."],
      "hat.": [null],
    });
  });

  test("returns correct chains object with multiple branches", function () {
    expect(mark2.getChains()).toEqual({
      "Plants": ["know"],
      "The": ["plants"],
      "a": ["day"],
      "after": ["a", "rain."],
      "be": ["happy", "happy.", "happy,"],
      "day": ["of"],
      "happy": ["after", "to", "plants"],
      "happy,": ["happy"],
      "happy.": ["Plants"],
      "how": ["to"],
      "know": ["how"],
      "of": ["rain,"],
      "plants": ["seemed", "after"],
      "rain,": ["happy"],
      "rain.": [null],
      "seemed": ["to"],
      "to": ["be", "be", "be"],
    });
  });

});


describe("getText returns expected results", function () {

  test("returns correct text string with single branch", function () {
    expect(mark.getText()).toEqual("The cat in the hat.");
  });

  test("returns valid text string with multiple branches", function () {
    const result = mark2.getText().split();
    const chains = mark2.chains;

    for(let x = 0 ; x <= result.length-2; x++){
    expect(chains[result[x]]).toContain(result[x+1]);
    }

    expect(chains[result.length-1]).toBeFalsy();

  });

});