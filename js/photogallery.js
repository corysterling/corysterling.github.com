$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "./xml/gallery.xml",
		dataType: "xml",
		success: parseXml
	});
});

function parseXml(xml) {
	$(xml).find("image").each(function() {
		var source = $(this).find("source").text();
		var title = $(this).find("title").text();
		
		$("#gallery").prepend("<li class='gallery_image'><a href='"+source+"' rel='gallery' class='group' title='"+title+"'><img src='"+source+"' alt='"+title+"' class='thumbnail' /></a></li>");
		
		setupGallery();
 
	});
}
 
function setupGallery() {
	/* fancybox */
	$("#gallery li a").fancybox({
		'zoomSpeedIn': 0,
		'zoomSpeedOut': 0
	});
	
	/* disabling selection */
	$("#gallery, #fancy_overlay, #fancy_inner").disableTextSelect();
	
	/* enabling blending */
	$("#gallery li").blend({speed: 600});
}