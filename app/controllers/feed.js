// var args = arguments[0] || {};
OS_IOS && $.cameraButton.addEventListener("click", function(_event) {
	$.cameraButtonClicked(_event);
});

$.cameraButtonClicked = function(_event){
	alert("user clicked camera button");

	var photoSource ;

	if (!Ti.Media.isCameraSupported) {
	    photoSource = 'openPhotoGallery';
	  } else {
	    photoSource = 'showCamera';
	  }

	Ti.Media[photoSource]({
		success:function(event){
			processImage(event.media, function (photoResp){
			// event.media object holding the picture that the user has taken.
			// create the row
			var row = Alloy.createController("feedRow", photoResp);
					// add the controller view, which is a row to the table
					if ($.feedTable.getData().length === 0) {
						$.feedTable.setData([]);
						$.feedTable.appendRow(row.getView(), true);
					} else {
						$.feedTable.insertRowBefore(0,row.getView(), true);
					}
				
			});
		}, 
		cancel: function(){
			// called when user cancels taking a picture
		},
		error: function(error){
			//display alert on error
			if(error.code === Ti.Media.NO_CAMERA){
				alert("Please run this test on the device");
			}else{
				alert("Unexpected error"+ error.code);
			}
		},
		saveToPhotoGallery: false,
		allowEditing: true,
		// only allow for photos, no video
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function processImage(_mediaObject, _callback){
	// since there is no ACS integration yet, we will fake it
	var photoObject = {
		image:_mediaObject,
		title: "Sample Photo"+ new Date(),
	};

	_callback(photoObject);
}