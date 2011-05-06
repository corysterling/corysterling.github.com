(function() {
  var get_data, handle_gallery_xml, handle_gigs_xml, setup_gallery, xml_fix_for_ie;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(document).ready(function() {
    $('.tab_content').hide();
    $('ul.tabs li:first').addClass('active').show();
    $('.tab_content:first').show();
    if (!$.browser.msie) {
      $('ul.tabs li a').blend({
        speed: 600
      });
    }
    $('a.fancyvideo').fancybox({
      overlayShow: true,
      hideOnContentClick: false
    });
    return $('ul.tabs li').click(function() {
      var active_tab;
      $('ul.tabs li').removeClass('active');
      $(this).addClass('active');
      $('.tab_content').hide();
      active_tab = $(this).find('a').attr('href');
      if ($.browser.msie) {
        $(active_tab).show();
      } else {
        $(active_tab).fadeIn();
      }
      get_data('#gallery', './xml/gallery.xml', handle_gallery_xml);
      get_data('#gigs_list', './xml/gigs.xml', handle_gigs_xml);
      return false;
    });
  });
  get_data = function(id, url, success) {
    $(id).empty();
    return $.ajax({
      type: 'GET',
      url: url,
      dataType: $.browser.msie ? 'text' : 'xml',
      success: success
    });
  };
  handle_gallery_xml = function(xml) {
    var new_xml;
    $('#gallery').empty();
    new_xml = xml_fix_for_ie(xml);
    $(new_xml).find('image').each(function() {
      var get_prop, source, title;
      get_prop = __bind(function(name) {
        return $(this).find(name).text();
      }, this);
      source = get_prop('source');
      title = get_prop('title');
      return $('#gallery').prepend("      <li>        <a href='" + source + "' title='" + title + "'>          <img src='" + source + "' alt='" + title + "' class='thumbnail' />        </a>      </li>    ");
    });
    return setup_gallery();
  };
  handle_gigs_xml = function(xml) {
    var new_xml;
    $('#gigs_list').empty();
    new_xml = xml_fix_for_ie(xml);
    $(new_xml).find('gig').each(function() {
      var get_prop;
      get_prop = __bind(function(name) {
        return $(this).find(name).text();
      }, this);
      return $('#gigs_list').append("      <tr class='first_line'>        <td class='date'>" + (get_prop('date')) + "</td>        <td class='venu'>" + (get_prop('venue')) + "</td>      </tr>      <tr class='second_line'>        <td class='time'>" + (get_prop('time')) + "</td>        <td class='details'>" + (get_prop('details')) + "</td>      </tr>    ");
    });
    return $('#gigs_list tr:first').addClass("first");
  };
  setup_gallery = function() {
    $('#gallery li a').fancybox({
      zoomSpeedIn: 0,
      zoomSpeedOut: 0
    });
    $('#gallery, #fancy_overlay').disableTextSelect();
    if (!$.browser.msie) {
      return $('#gallery li').blend({
        speed: 600
      });
    }
  };
  xml_fix_for_ie = function(xml) {
    var fuck;
    if ($.browser.msie) {
      fuck = new ActiveXObect('Microsoft.XMLDOM');
      fuck.loadXML(xml);
      xml = fuck;
    }
    return xml;
  };
}).call(this);
