$(document).ready(function() {

  //When page loads...
  $(".tab_content").hide(); //Hide all content
  $("ul.tabs li:first").addClass("active").show(); //Activate first tab
  $(".tab_content:first").show(); //Show first tab content

  if (!$.browser.msie) {
    $("ul.tabs li a").blend({speed: 600});
  }

  $("a.fancyvideo").fancybox({
    'overlayShow': true,
    'hideOnContentClick': false
  });

  //On Click Event
  $("ul.tabs li").click(function() {

    $("ul.tabs li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(".tab_content").hide(); //Hide all tab content

    var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content

    if ($.browser.msie) {
      $(activeTab).show();
    } else {
      $(activeTab).fadeIn();
    }

    getGallery();
    getGigsList();

    return false;
  });

});


function getGallery() {
  $("#gallery").empty();
  $.ajax({
    type: "GET",
    url: "./xml/gallery.xml",
    dataType: ($.browser.msie) ? "text" : "xml",
    success: parseGalleryXml
  });
}

function getGigsList() {
  $("#gigs_list").empty();
  $.ajax({
    type: "GET",
    url: "./xml/gigs.xml",
    dataType: ($.browser.msie) ? "text" : "xml",
    success: parseEngagementsXml
  });
}


function xmlFixForIE(xml) {  
  if ($.browser.msie) {  
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
    xmlDoc.loadXML(xml);
    xml = xmlDoc;  
  }  
  return xml;  
} 

function parseGalleryXml(xml) {
  $("#gallery").empty();

  var newXml = xmlFixForIE(xml);
  $(newXml).find("image").each(function() {
    var source = $(this).find("source").text();
    var title = $(this).find("title").text();

    $("#gallery").prepend("<li><a href='"+source+"' title='"+title+"'><img src='"+source+"' alt='"+title+"' class='thumbnail' /></a></li>"); 
  });

  setupGallery();
}

function setupGallery() {
  /* fancybox */
  $("#gallery li a").fancybox({
    'zoomSpeedIn': 0,
  'zoomSpeedOut': 0
  });

  /* disabling selection */
  $("#gallery, #fancy_overlay").disableTextSelect();


  /* enabling blending */
  if (!$.browser.msie) {
    $("#gallery li").blend({speed: 600});
  }
}

function parseEngagementsXml(xml) {
  $("#gigs_list").empty();

  var newXml = xmlFixForIE(xml);
  $(newXml).find("gig").each(function() {
    var venue = $(this).find("venue").text();
    var date = $(this).find("date").text();
    var time = $(this).find("time").text();
    var details = $(this).find("details").text();

    var listItem = "";
    listItem += "<tr class='first_line'><td class='date'>"+date+"</td><td class='venue'>"+venue+"</td></tr>";
    listItem += "<tr class='second_line'><td class='time'>"+time+"</td><td class='details'>"+details+"</td></tr>";

    $("#gigs_list").append(listItem);
  });

  $("#gigs_list tr:first").addClass("first");

}