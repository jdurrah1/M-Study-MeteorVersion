import { Meteor } from 'meteor/meteor';
SavedText = new Mongo.Collection('SavedText');
Meteor.startup(() => {
  // code to run on server at startup
});
