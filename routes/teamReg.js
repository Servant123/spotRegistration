var express = require('express');
var router = express.Router();
var teamReg = require('../models/teamReg');

router.get('/', (req,res)=>{
  res.render('teamReg');
});
router.post('/', (req,res)=>{
  console.log(req.body);
  var team = req.body;
  if(team.school[0] == 'Others'){
    team.school = team.school[1];
  }
  else{
    team.school = team.school[0];
  }
  if(!Array.isArray(team.event)){
    var event = [];
    event.push(team.event);
    team.event = event;
  }
  console.log(team);
  teamReg.create(team)
  .then((team)=>{
    console.log(team);
    console.log('Successful');
  })
  .catch((err)=>{
    throw err;
  })
  res.render('teamSuccessful',{kid:team});
  res.end();
});

router.get('/participants',(req,res)=>{
  // send data to the participants page

    teamReg.find({},{_id:true, name1: true, name2:true, name3:true, event : true, class:true, school:true }).then(function(result){
    //console.log(result);
      var obj={};
      obj.handAndVegetablePrinting = result.filter(function(participant) {
                        return participant.event.indexOf('HAND AND VEGETABLE PRINTING') > -1 ;
                    });

      obj.indiaQuiz=result.filter(function(participant) {
                        return participant.event.indexOf('INDIA QUIZ') > -1 ;
                    });

      obj.kalasiriCollageMaking=result.filter(function(participant) {
                                      return participant.event.indexOf('KALASIRI (Collage Making)') > -1 ;
                                  });

      obj.rangoli=result.filter(function(participant) {
                                  return participant.event.indexOf('VARNANJALI (Rangoli)') > -1 ;
                                });
      obj.clayModelling=result.filter(function(participant) {
                              return participant.event.indexOf('AAKRUTHI (Clay Modelling)') > -1 ;
                              });
      obj.wealthOutOfWaste=result.filter(function(participant) {
                        return participant.event.indexOf('WEALTH OUT OF WASTE') > -1 ;
                              });
      obj.debate=result.filter(function(participant) {
                            return participant.event.indexOf('CHARCHA (Debate)') > -1 ;
                              });

              console.log(obj);
                res.render('teamPart',{data:obj});
              },(reason)=> {
                console.log(reason); // Error!
              }


);



});
module.exports = router;
