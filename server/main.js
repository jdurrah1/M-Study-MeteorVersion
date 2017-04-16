import { Meteor } from 'meteor/meteor';
SavedText = new Mongo.Collection('SavedText');
Meteor.startup(() => {
  // code to run on server at startup

Meteor.methods({
	getAudio: function (blob) {
		console.log(blob);
		var name = HTTP.call("POST", "https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyAO2eO6JVR93eNL1WYpr040o7kFQ59XPbM",
		{data: {
		  "config": {
		      "encoding":"FLAC",
		      "language_code": "en-US"
		  },
		  "audio": {
		      "uri":"gs://eecs481mstudyrecordings/2017-04-12T19-29-22.471Z.flac"
		  }
		}}
		);
		console.log(name);
		return name; 
	},

	printConsole: function(x){
		console.log(x); 
	} 

	} 

);


});

