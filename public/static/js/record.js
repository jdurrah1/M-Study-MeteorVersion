var audio_context;
var recorder;
var is_recording = false;

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);
	recorder = new Recorder(input);
}

function toggleRecording(button) {
	if (is_recording) {
		// stop recording
		recorder && recorder.stop();
		is_recording = false;
		console.log("recording stopped");
		createDownload();
		recorder.clear();
		$("#record").html('Record');
	}
	else {
		// start recording
		if(recorder === undefined)
		{
			init();
			console('initializing');
		}
		recorder & recorder.record();
		is_recording = true;
		console.log("recording started");
		$("#record").html('Stop Recording');
		$("#download_recording").hide();

	}
}

function createDownload() {
	recorder && recorder.exportWAV(function(blob) {
		var url = URL.createObjectURL(blob);
		var dwn = document.getElementById('download_recording');
		dwn.href = url;
		dwn.download = new Date().toISOString() + '.wav';
		$("#download_recording").show();
	});
}

/*document.getElementById("file-form").onsubmit = function(event) {
	event.preventDefault();

	var fileSelect = document.getElementById('file-select');
	var uploadButton = document.getElementById('upload-button');
	var file = fileSelect.files[0];
	var formData = new FormData();

	formData.append('media', file, file.name);
	console.log(formData);

	 $.ajax({
	 	type: 'POST',
	 	url: 'static/create_file.php',
	 	data: { 
	 		form_data : formData
	 	},
	 	processData: false,
	 	contentType: false,
		success: function(data) {
			console.log(data);
		}
	});
}*/

window.onload = function init() {
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		audio_context = new AudioContext;
	} catch (e) {
		alert('no web audio support in this browser');
	}
	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
		console.log("no live input" + e);
	});
};