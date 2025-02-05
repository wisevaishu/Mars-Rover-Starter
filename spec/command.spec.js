const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to 
//comment out all the others.
// However, do NOT edit the grading tests for any reason and make sure to un-comment out your 
//code to get the autograder to pass.

describe("Command class", function() {

  it("constructor sets command type", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
    //expect( function() { new Command();}).toThrow(new Error('Oops'));
  });

  //Test 2
  it("constructor sets a value passed in as the 2nd argument", function() {
    let output = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(output.commandType).toBe('MODE_CHANGE');
  });

  //Test 3
  it("checks the value in the Command Class correctly sets the value property in new object", function() {
    let output = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(output.value).toBe('LOW_POWER');
  });

});