import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Mongo } from 'meteor/mongo'

import './main.html';

SavedText = new Mongo.Collection('SavedText');

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.clipboard.events({
	'click .js-textareacutbtn'(event){
		var cut_text = document.querySelector('textarea');
		cut_text.select();
		try
		{
			var successful = document.execCommand('cut');
			var message = 'successful';
			if (!successful)
				message = 'unsucessful';
			console.log('Cutting clipboard text was '+message);
		}
		catch(err)
		{
			console.log('Error: unable to cut');
		}
	},
	'click .js-textareacopybtn'(event){
		var copy_text = document.querySelector('textarea');
		copy_text.select();
		try
		{
			var successful = document.execCommand('copy');
			var message = 'successful';
			if (!successful)
				message = 'unsucessful';
			console.log('Copying clipboard text was '+message);
		}
		catch(err)
		{
			console.log('Error: unable to copy');
		}

	},
	'click .js-textareapastebtn'(event){
		var paste_text = document.querySelector('textarea');
		paste_text.select();
		try
		{
			focus();
			var successful = document.execCommand('paste');
			var message = 'successful';
			if (!successful)
				message = 'unsucessful';
			console.log('Pasting clipboard text was '+message);
		}
		catch(err)
		{
			console.log('Error: unable to paste');
		}
	},
	'click .js-textareaclearbtn'(event){
		$(".textarea").val("") ;
	},
});

Template.savedTextList.helpers({
  savedTextValues() {
  	return SavedText.find({}, { sort: { createdAt: -1 } });
  },
});

Template.updatedSpeechToTextControls.events({
  'click .js-textareasavebtn'(event) {
    // Prevent default browser form submit
    var textarea_text = $(".textarea").val()

 
    // Insert a task into the collection
    SavedText.insert({
      text:textarea_text,
      createdAt: new Date(), // current time
    });
  },
});

Template.savedTextValue.events({
    'click .delete'() {
    	console.log('deleting' + this._id)
    SavedText.remove(this._id);
  },
	'click .well'(){
		console.log('paragraph clicked');
		console.log(this['text']);
		$(".textarea").val(this['text']);
	},

});







