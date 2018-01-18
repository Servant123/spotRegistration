var express = require('express');
var router = express.Router();
var individualReg = require('../models/individualReg');

router.get('/', (req,res)=>{
  res.render('individualReg');
});
router.post('/', (req,res)=>{
  res.set({ 'content-type':'text/html;charset=utf-8'})
  console.log(req.body);
  var kid = req.body;
  if(kid.school[0] == 'Others'){
    kid.school = kid.school[1];
  }
  else{
    kid.school = kid.school[0];
  }
  if(!Array.isArray(kid.event)){
    var event = [];
    event.push(kid.event);
    kid.event = event;
  }
  console.log(kid);
  individualReg.create(kid)
  .then((regKid)=>{
    console.log(regKid);
    console.log('Successful');
  })
  .catch((err)=>{
    throw err;
  });

  res.render('individualSuccessful',{kid:kid});


  res.end();
});


router.get('/participants',(req,res)=>{
  // send data to the participants page

    individualReg.find({},{_id:true, name: true, event : true, class:true, school:true }).then(function(result){
    //console.log(result);
      var obj={};
      obj.fancyDress = result.filter(function(participant) {
                        return participant.event.indexOf('FANCY DRESS') > -1 ;
                    });

      obj.kalaabhiruchi=result.filter(function(participant) {
                        return participant.event.indexOf('KALAABHIRUCHI') > -1 ;
                    });

      obj.sandesha=result.filter(function(participant) {
                                      return participant.event.indexOf('SANDESHA') > -1 ;
                                  });

      obj.kannadaPoetryRecitation=result.filter(function(participant) {
                                  return participant.event.indexOf('KANNADA POETRY RECITATION') > -1 ;
                                });
      obj.sahityaSindhu=result.filter(function(participant) {
                              return participant.event.indexOf('SAHITYA-SINDHU') > -1 ;
                              });
      obj.bhasika=result.filter(function(participant) {
                        return participant.event.indexOf('BHASHIKA') > -1 ;
                              });
      obj.mime=result.filter(function(participant) {
                            return participant.event.indexOf('MIME') > -1 ;
                              });


                res.render('individualPart',{data:obj});
  },(reason)=> {
  console.log(reason); // Error!
}


);



});
module.exports = router;
