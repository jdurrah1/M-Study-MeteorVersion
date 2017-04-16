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

function blobToBase64(blob) {
var reader = new FileReader();
reader.onload = function() {
  var dataUrl = reader.result;
  var base64 = dataUrl.split(',')[1];
  sendpost(base64);
};
reader.readAsDataURL(blob);
};

function sendpost(base64)
{

console.log("sending post");
var name = HTTP.call("POST", "https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyAO2eO6JVR93eNL1WYpr040o7kFQ59XPbM",
  {data: {
    "config": {
        "encoding":"FLAC",
        "language_code": "en-US",
        "sampleRate": 44100
    },
    "audio": {
        "content":base64
    }
  }}, 
  function(error, result){

    var textAreaVal = JSON.parse(result.content).results[0].alternatives[0].transcript
    $(".textarea").val(textAreaVal);

    console.log(result);
    newResults = result; 
  }
  );
return name; 
}


function convertToFlac(blob){
	console.log("convertToFlac");
	worker = new Worker('../../flac.js/worker/EmsWorkerProxy.js');
	worker.onmessage = function(e) {
		if (e.data && e.data.reply === 'done') {
              console.log(e.data.values["encoded.flac"].blob);
              blobToBase64(e.data.values["encoded.flac"].blob);
          }
	}

	fr = new FileReader();

	fr.addEventListener('loadend', function() {
		console.log("filreader loaded")

		var encodedName = "encoded.flac"
		var args = [
		            // Input file *name*
		            "encoded.wav"
		          ];

       	var inData = {};
          // Remember: We set f.name as input file name
        inData["encoded.wav"] = new Uint8Array(fr.result);

		// Meta-information about the files
          // that are being created during encoding
          // Currently MIME type only
          var outData = {};
          outData[encodedName] = {
            // Its MIME type
            'MIME': 'audio/flac'
          };

           worker.postMessage({
            command: 'encode',
            args: args,
            outData: outData,
            fileData: inData
          });         

	});

	fr.readAsArrayBuffer(blob);

}

function createDownload() {
	recorder && recorder.exportWAV(function(blob) {
		var url = URL.createObjectURL(blob);
		var dwn = document.getElementById('download_recording');
		dwn.href = url;
		dwn.download = new Date().toISOString() + '.wav';
		$("#download_recording").show();

		convertToFlac(blob);

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