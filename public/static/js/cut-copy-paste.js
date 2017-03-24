var cut_button = document.querySelector('.js-textareacutbtn');
cut_button.addEventListener('click', function(event)
{
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
});

var copy_button = document.querySelector('.js-textareacopybtn');
copy_button.addEventListener('click', function(event)
{
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
});

var paste_button = document.querySelector('.js-textareapastebtn');
paste_button.addEventListener('click', function(event)
{
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
});