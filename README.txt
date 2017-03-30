MSTUDY-01
for University of Michigan EECS 481 Winter 2017

Jacob Durrah (jdurrah)
Meredith Keesling (merek)
Justin Patrick (jmpat)
Paul Scott (paulscot)

The app should be currently deployed, and so you can visit
http://m-study1.meteorapp.com/ to use it.  If it is unavailable, or if
for any other reason you wish to deploy it locally, please follow these steps:

1. Visit meteor.com and download Meteor onto your machine
2. Clone our MStudy repository from https://github.com/jdurrah1/M-Study-MeteorVersion.git
3. Open the command prompt in the M-Study-MeteorVersion folder (may need to run as admin)
4. Type "meteor npm install"
5. Type "meteor"
6. Go to http://localhost:3000/ in your browser

Remember, these steps are not always necessary, only if you need to deploy it yourself.

An important note: since we have created an entirely new repository for the beta release,
a lot of the code from our alpha release has been copied over, rather than starting from
scratch.  Additionally, since we are now using the Meteor API to run the code rather
than running it manually with Vagrant, a lot of files were necessary to import;
this explains why we appear to have added such a gargantuan number of lines of code.


Beta Release functionality:

In contrast to our alpha release, where there were two separate pages (dashboard and
manage docs) that the user had to navigate between, in this release we have streamlined
things by including everything on one page.

When loading the app's page, you can see the dashboard, which
displays the clipboard and several buttons.  The clipboard's purpose is to
store text that the user types in, pastes in, or records.  The button's
functions are as follows:

Save -		Stores the message currently on the clipboard into the database.
		All of your saved messages can be seen in the list on the right.

Cut -		Takes the message on the clipboard, copies it to your computer's
		clipboard and empties the MStudy clipboard.

Copy -		Takes the message on the clipboard and copies it to your
		computer's clipboard.

Paste -		Intended to take a string from your computer's clipboard and
		replace the contents of the MStudy clipboard with that string.
		We haven't got it to work successfully yet; the problem seems to
		stem from a security issue that is system or browser-dependent.

Clear -		Empties the MStudy clipboard.

Download	Download the contents of the MStudy clipboard as a
as .txt -	.txt file to your computer's downloads folder.
		The title of the file is the string's first 16 characters.

Download	Download the contents of the MStudy clipboard as a .doc file
as .doc -	(can be opened in Microsoft Word) to your computer's downloads folder.
		The title of the file is the string's first 16 characters.

Upload		When clicking Choose File and locating any kind of text file on your
a .txt -	computer, you can then click the upload button to fill the clipboard
		with the string contents of that file.

Record -	Clicking this button once will make the browser begin
		recording audio, and clicking a second time will stop it.
		The intended functionality was to have this recorded
		message be immediately sent to the VoiceBase API to
		be converted into a text string, which would appear in
		the clipboard.  However, this is still proving to be quite a difficult
		task to implement.  We have attempted using several different transcription
		APIs, but have yet to find one that successfully converts and
		sends back the transcription as text.  We intend to continue
		working on this, since this was a very important part of our initial
		M-Study idea, and would be very useful to our client Brad.

The list on the right side contains all of the messages you have saved.  In order to save
messages, you must first sign in with an email and password using the Sign In button in
the bar on the top.  Clicking the X button on a message in the list will delete it, and
clicking the message itself will copy it to the MStudy clipboard to edit.