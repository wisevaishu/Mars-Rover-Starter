const Message = require("./message");
const Command = require('./command.js');

class Rover{
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position=position;
      this.mode=mode;
      this.generatorWatts=generatorWatts;
   }
   
   receiveMessage(messageObj){
      
      let nameOfOriginalMessage = '';
      let resultArray =[];
      

      nameOfOriginalMessage = messageObj.name;  

      for(let i=0;i<messageObj.commands.length;i++){
         
         if (messageObj.commands[i].commandType === 'STATUS_CHECK'){
            let tempObj = {};

            tempObj["completed"] = true;
            tempObj["roverStatus"]=JSON.stringify(new Rover(this.position, this.mode));

            resultArray.push(tempObj);
            
         }

         else if (messageObj.commands[i].commandType === 'MOVE'){
            let tempObj = {};
            //if (messageObj.commands[i].value === 'LOW_POWER'){
            if (this.mode == "LOW_POWER"){
               tempObj["completed"] = false;
            }
            else{
               tempObj["completed"] = true;
               this.position = messageObj.commands[i].value;
            }
            resultArray.push(tempObj);
         }
         
         else 
         {
            let tempObj = {};
            tempObj["completed"] = true;
            this.mode = messageObj.commands[i].value;
            resultArray.push(tempObj);
         }

      }     
      
      let finalResultObject={
         message : nameOfOriginalMessage,
         results : resultArray
      };
      finalResultObject.results.forEach(result => {
         if (result.roverStatus) {
             result.roverStatus = JSON.parse(JSON.stringify(result.roverStatus));
         }
     });
      
      return finalResultObject;
    }
   }

   // let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
   // let message = new Message('Test message with two commands', commands);
   // let rover = new Rover(98382);    // Passes 98382 as the rover's position.
   // let response = rover.receiveMessage(message);

   // console.log(response);

   // let rover = new Rover(100);
   // let commands = [
   //    new Command('MOVE', 4321),
   //    new Command('STATUS_CHECK'),
   //    new Command('MODE_CHANGE', 'LOW_POWER'),
   //    new Command('MOVE', 3579),
   //    new Command('STATUS_CHECK')
   // ];
   
   // let message = new Message('TA power', commands);
   // let response = rover.receiveMessage(message);

   //  console.log(response);

   // console.log(response.message = 'TA power');
   // console.log(response.results[0].completed == true);
   // console.log(JSON.parse(response.results[1].roverStatus).position == 4321);
   // console.log(response.results[2].completed == true);
   // console.log(response.results[3].completed == false);
   // console.log(JSON.parse(response.results[1].roverStatus).position == 4321);
   // console.log(JSON.parse(response.results[4].roverStatus).mode=='LOW_POWER');
   // console.log(JSON.parse(response.results[4].roverStatus).generatorWatts == 110);
module.exports = Rover;
