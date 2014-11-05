ImageUpload
===========

ImageUpload is a plugin that aims to streamline the way it is done uploading images. It combines ease of use with powerful jQuery tool cutting images jCrop ( https://github.com/tapmodo/Jcrop ).

Compatibility
---------------

ImageUpload been tested and is certified for the following browsers :
* Firefox 23+
* Google Chrome 29+

Features Overview
------------------------

* Support for most popular image formats ( jpg, png, gif, bmp );
* Definition of the default image that appears when the page loads;
* Define the upload location;
* Resize images during the upload;
* Convert images during the upload;
* Crop images;
* Ability to filter the types of images and size allowed;
* Support drag and drop;
* Support the progress bar.



How to use ?
----------

To use ImageUpload, just instantiate it to some element input [type='file']

	jQuery("#file").imageUpload();
  

Parameters
------

To configure the behavior of plugins, some parameters are available :

* path;
* uploadFolder;
* uploadFile;
* imageDefault;
* maxFileSize;
* fileTypes;
* Jcrop;
* resizeTo;
* renameTo;
* convertto.


### path
Defines the location where the plugin is located :

    jQuery("#file").imageUpload(
    	path : 'plugins/imageUpload/'
    );

### uploadFolder
Defines the location where the images will be sent after the upload :

    jQuery("#file").imageUpload(
    	uploadFolder : 'images/user/'
    );

### uploadFile
Sets the file that will be responsible for receiving and utilizing the information to upload :

    jQuery("#file").imageUpload(
    	UploadFile : 'imageUpload.php',
    );

### imageDefault
Tells the plugin which image to display when the page loads :

    jQuery("#file").imageUpload(
    	imageDefault : 'images/user/default.jpg'
    );

or

    jQuery("#file").imageUpload(
    	imageDefault : jQuery("imageUser").attr('src')
    );

### maxFileSize
Defines the maximum allowed size (kb) to upload :

    jQuery("#file").imageUpload(
    	maxFileSize : 1024
    );

### fileTypes
An array specifying the type of files allowed for upload :

    jQuery("#file").imageUpload(
    	fileTypes : ["image/jpeg","image/png","application/pdf"]
    );

### Jcrop
Send to Jcrop parameters that will be used :

    jQuery("#file").imageUpload(
    	Jcrop : { 
    		bgColor     : 'black', 
    		bgOpacity   : 0.4, 
    		aspectRatio : 1
    	}
    );

### resizeTo
Sets the height and/or width of the output image :

    jQuery("#file").imageUpload(
    	resizeTo : {
			width: 150,
			height: 150
		}
    );

It is also possible to pass only one dimension and the other is calculated automatically, keeping the aspect ratio :

    jQuery("#file").imageUpload(
    	resizeTo : {
			width: 450
		}
    );
	
or

    jQuery("#file").imageUpload(
    	resizeTo : {
			height: 370
		}
    );	

### renameTo
Sets the name of the output image :

    jQuery("#file").imageUpload(
    	renameTo : 'newImage'
    );

If `renameTo` is not defined, the name of the output is the same road.

### convertTo
Sets the format of the output image :

    jQuery("#file").imageUpload(
    	convertTo : 'png'
    );

If `convertTo` is not defined, the output format will be the same road.




Callbacks
---------
Some callback functions are available :

* onBeforeSend;
* onComplete;
* onError;
* onProgress;
* onDrag;
* onDrop.


### onBeforeSend

The event `onBeforeSend` is triggered before sending the image:

    jQuery("#file").imageUpload(
    	onBeforeSend : function(){
    		jQuery("span.status").text('Wait');
    	}
    );

`onBeforeSend` can also receive a parameter with the file information:

    jQuery("#file").imageUpload(
    	onBeforeSend : function(file){
    		console.info('Last Modified Date : ' + file.lastModifiedDate );
			console.info('Name : ' + file.name );
			console.info('Size : ' + file.size + 'b' );
			console.info('Type : ' + file.type );
    	}
    );

### onComplete

The `onComplete` event is fired after sending the image is successfully completed :

    jQuery("#file").imageUpload(
    	onComplete : function(){
    		jQuery("span.status").text('Successfully sent');
    	}
    );


### onError

The event `onError` is triggered when an error occurs during the upload :

    jQuery("#file").imageUpload(
    	onError : function(){
    		jQuery("span.status").text('Oops');
    	}
    );
    
`onError` can also receive a parameter with the error message :

    jQuery("#file").imageUpload(
    	onError : function(error){
    		jQuery("span.status").text(error);
    	}
    );

### onProgress
The event `onProgress` is triggered while sending image and receives a parameter with the information transfer :

    jQuery("#file").imageUpload(
    	onProgress : function(p){		
			percent = p.loaded / p.total * 100 + '%';
			jQuery("progressBar").css('width',percent);
    	}
    );

### onDrag

The event `onDrag` is triggered when something is dragged into the browser :

    jQuery("#file").imageUpload(
    	onDrag : function(){
    		console.inf('New file to be dragged');
    	}
    );

### onDrop

The event `onDrop` is triggered when something is loose in the browser :

    jQuery("#file").imageUpload(
    	onDrop : function(){
    		console.inf('New file drop in browser');
    	}
    );


Author
-----

* Thiago Thaison ( thiagothaison@gmail.com )
