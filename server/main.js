import { Meteor } from 'meteor/meteor';
SavedText = new Mongo.Collection('SavedText');
Meteor.startup(() => {
  // code to run on server at startup

Meteor.methods({getAudio: function () {
		var name = HTTP.call("POST", "https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyAO2eO6JVR93eNL1WYpr040o7kFQ59XPbM",
		{data: {
		  "config": {
		      "encoding":"FLAC",
		      "sample_rate": 16000,
		      "language_code": "en-US"
		  },
		  "audio": {
		      "uri":"gs://cloud-samples-tests/speech/brooklyn.flac"
		  }
		}}
		);
		console.log(name);
		return name; 
		}}

);


});

