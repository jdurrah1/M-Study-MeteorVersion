import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'

import { Mongo } from 'meteor/mongo'

import './main.html';

SavedText = new Mongo.Collection('SavedText');


document.addEventListener("DOMContentLoaded", function() {
  ui_change();
});

function ui_change()
{
  document.body.style.backgroundColor = document.getElementById('color_page_bg').value;
  document.body.style.color = document.getElementById('color_page_text').value;
  for (var i=0; i<document.getElementsByTagName("h2").length; i+=1)
  {
    document.getElementsByTagName("h2")[i].style.backgroundColor = document.getElementById('color_page_bg').value;
    document.getElementsByTagName("h2")[i].style.color = document.getElementById('color_page_text').value;
    document.getElementsByTagName("h2")[i].style.border =
      "3px solid "+document.getElementById('color_page_text').value;
  }
  for (var i=0; i<document.getElementsByTagName("h3").length; i+=1)
  {
    document.getElementsByTagName("h3")[i].style.backgroundColor = document.getElementById('color_docs_bg').value;
    document.getElementsByTagName("h3")[i].style.color = document.getElementById('color_docs_text').value;
    document.getElementsByTagName("h3")[i].style.border =
      "3px solid "+document.getElementById('color_docs_text').value;
  }
  for (var i=0; i<document.getElementsByTagName("li").length; i+=1)
  {
    document.getElementsByTagName("li")[i].style.backgroundColor = document.getElementById('color_page_bg').value;
    document.getElementsByTagName("li")[i].style.color = document.getElementById('color_docs_text').value;
  }
  document.getElementById("clipBoard").style.backgroundColor = document.getElementById('color_clip_bg').value;
  document.getElementById("clipBoard").style.color = document.getElementById('color_clip_text').value;
  document.getElementById("sidenav").style.backgroundColor = document.getElementById('color_docs_bg').value;
  document.getElementById("sidenav").style.color = document.getElementById('color_docs_text').value;
  for (var i=0; i<document.getElementsByTagName("button").length; i+=1)
  {
    if (document.getElementsByTagName("button")[i].innerHTML === "&lt;&lt;")
    {
      document.getElementsByTagName("button")[i].style.backgroundColor = document.getElementById('color_clip_bg').value;
      document.getElementsByTagName("button")[i].style.color = document.getElementById('color_clip_text').value;
    }
    else
    {
      document.getElementsByTagName("button")[i].style.backgroundColor = document.getElementById('color_btn_bg').value;
      document.getElementsByTagName("button")[i].style.color = document.getElementById('color_btn_text').value;
    }
  }
}


Template.body.events({
	'click .btnSpeechToText'(){



		//make post request


		//make get request

		Meteor.call("getAudio", function (error, result) {
			data = result; 
			data2= JSON.parse(data.content);
			val = data2.results[0].alternatives[0].transcript;
			console.log(val);
		 });
	},

});



Template.clipboard.events({
	'click .js-textareadownloadtxtbtn'(event){
		console.log('now trying to download as .txt');
		console.log('grabbing clipboard contents');
		var elHtml = $(".textarea").val();
		var filename = elHtml.substring(0,16)+'.txt';
		var link = document.createElement('a');
		mimeType = 'text/plain';
		link.setAttribute('download', filename);
		link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
		link.click(); 
	},
	'click .js-textareadownloaddocbtn'(event){
		console.log('now trying to download as .doc');
		console.log('grabbing clipboard contents');
		var elHtml = $(".textarea").val();
		var filename = elHtml.substring(0,16)+'.doc';
		var link = document.createElement('a');
		mimeType = 'application/msword';
		link.setAttribute('download', filename);
		link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
		link.click(); 
	},
	'click .js-textareauploadtxtbtn'(event){
		function processFile(e)
		{
   			var file = e.target.result,
        		results;
    			if (file && file.length)
			{
        			//results = file.split("\n");
				results = file;
        			console.log(results)
        			$('.textarea').val(results);
    			}
		}
		console.log('now trying to upload text and put into clipboard');
		if (!window.FileReader)
		{
        		alert('Your browser is not supported');
    		}
		var fileInput = $('#uploadtxt');
    		var input = fileInput.get(0);
    		var reader = new FileReader();
    		if (input.files.length)
		{
        		var textFile = input.files[0];
        		reader.readAsText(textFile);
        		$(reader).on('load', processFile);
    		}
		else
		{
        		alert('Please upload a file before continuing')
    		}
	},
	'click .js-textareacutbtn'(event){
		var cut_text = document.querySelector('textarea');
		cut_text.select();
		try
		{
			var successful = document.execCommand('cut');
			var message = 'successful';
			if (!successful)
				message = 'unsucessful';
			console.log('main.js ~ Cutting clipboard text was '+message);
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
			console.log('main.js ~ Copying clipboard text was '+message);
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
			var successful = document.execCommand('paste');
			var message = 'successful';
			if (!successful)
				message = 'unsucessful';
			console.log('main.js ~ Pasting clipboard text was '+message);
		}
		catch(err)
		{
			console.log('Error: unable to paste');
		}
	},
	'click .js-textareaclearbtn'(event){
		$(".textarea").val("");
	},
	'click .js-uichangebtn'(event)
	{
		ui_change();
	},
});

Template.savedTextList.helpers({
  savedTextValues() {
  	return SavedText.find({owner: Meteor.userId()}, { sort: { createdAt: -1 } });
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
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
});

Template.savedTextValue.events({
  'click .delete_btn'(){
    console.log('deleting' + this._id);
    SavedText.remove(this._id);
  },
  'click .select_btn'(){
    console.log('paragraph clicked');
    console.log(this['text']);
    $(".textarea").val(this['text']);
  },
});







