Template.explanation.helpers({
  Message: function(){
    var user = Meteor.users.findOne(Meteor.userId());
    var helper = user && user.profile.controls;
    return helper && helper.wMEMessage;
  },

})
Template.explanation.onRendered(function(){
  var user = Meteor.users.findOne(Meteor.userId());
  var helper = user && user.profile.controls;
  var wMEMessage =  helper && helper.wMEMessage;
    voiceSynth(wMEMessage,"en_EN");
})