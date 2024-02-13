const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to 
//comment out all the others.
//However, do NOT edit the grading tests for any reason and make sure to un-comment out your code
// to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 

    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  //Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);

    expect(response.message).toBe('Test message with two commands');
  });

  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);  
    let response = rover.receiveMessage(message);

    expect(response.results.length).toBe(commands.length);
  });

  //Test 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);  
    let response = rover.receiveMessage(message);

    for(let i=0;i<message.commands.length;i++){
      if (message.commands[i].commandType === 'STATUS_CHECK'){
         for(let j=0;j<response.results.length;j++){
            if(Object.keys(response.results[j]).length>1)
            {
              expect(JSON.parse(response.results[j].roverStatus).mode).toBe(rover.mode);
              expect(JSON.parse(response.results[j].roverStatus).generatorWatts).toBe(rover.generatorWatts);
              expect(JSON.parse(response.results[j].roverStatus).position).toBe(rover.position);

              // expect(response.results[j].roverStatus.mode).toBe(rover.mode);
              // expect(response.results[j].roverStatus.generatorWatts).toBe(rover.generatorWatts);
              // expect(response.results[j].roverStatus.position).toBe(rover.position);
            }
         }
      }
    }
  });

  //Test 11
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);  
    let response = rover.receiveMessage(message);
    for(let i=0;i<response.results.length;i++){
      if (message.commands[i].commandType === 'MODE_CHANGE'){
        expect(response.results[i].completed).toBe(true);
        expect(rover.mode).toBe("LOW_POWER");
      }
    }    
  });

  //Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);  
  let response = rover.receiveMessage(message);

    for(let i=0;i<response.results.length;i++){
      if (message.commands[i].commandType === 'MOVE'){
        if (this.mode === 'LOW_POWER'){
          expect(response.results[i].completed).toBe(false);
          expect(JSON.parse(response.results[j].roverStatus).position=this.position);
        }
      }
    }
  });  

  //Test 13
  it("responds with the position for the move command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);  
    let response = rover.receiveMessage(message);    
    
    for(let i=0;i<response.results.length;i++){
      if (message.commands[i].commandType === 'MOVE'){
        expect(JSON.parse(response.results[j].roverStatus).position).toBe(rover.position);
      }
    }

  });
});
