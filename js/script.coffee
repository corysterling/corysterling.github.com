$(document).ready ->

  # hide all content
  $('.tab_content').hide()

  # activate first tab
  $('ul.tabs li:first').addClass('active').show()

  # show first tab content
  $('.tab_content:first').show()

  if !$.browser.msie
    $('ul.tabs li a').blend speed:600

  $('a.fancyvideo').fancybox
    overlayShow: yes
    hideOnContentClick: no

  # on click event
  $('ul.tabs li').click ->
    # deactivate all tabs
    $('ul.tabs li').removeClass 'active'

    # add 'active' to selected tab
    $(this).addClass 'active'
    
    # hide all tab content
    $('.tab_content').hide()

    # find href attribute value to id tab + content
    active_tab = $(this).find('a').attr 'href'

    if $.browser.msie
      $(active_tab).show()
    else
      $(active_tab).fadeIn()
    

    get_data '#gallery', './xml/gallery.xml', handle_gallery_xml
    get_data '#gigs_list', './xml/gigs.xml', handle_gigs_xml

    false


get_data = (id, url, success) ->
  $(id).empty()
  $.ajax
    type: 'GET'
    url: url
    dataType: if $.browser.msie then 'text' else 'xml'
    success: success


handle_gallery_xml = (xml) ->
  $('#gallery').empty()

  new_xml = xml_fix_for_ie xml
  $(new_xml).find('image').each ->
    get_prop = (name) => $(this).find(name).text()
    source = get_prop 'source'
    title = get_prop 'title'

    $('#gallery').prepend "
      <li>
        <a href='#{source}' title='#{title}'>
          <img src='#{source}' alt='#{title}' class='thumbnail' />
        </a>
      </li>
    "

  setup_gallery()

handle_gigs_xml = (xml) ->
  $('#gigs_list').empty()
  
  new_xml = xml_fix_for_ie xml
  $(new_xml).find('gig').each ->
    get_prop = (name) => $(this).find(name).text()
    
    $('#gigs_list').append "
      <tr class='first_line'>
        <td class='date'>#{get_prop 'date'}</td>
        <td class='venu'>#{get_prop 'venue'}</td>
      </tr>

      <tr class='second_line'>
        <td class='time'>#{get_prop 'time'}</td>
        <td class='details'>#{get_prop 'details'}</td>
      </tr>
    "

  $('#gigs_list tr:first').addClass("first");


setup_gallery = ->
  $('#gallery li a').fancybox
    zoomSpeedIn: 0
    zoomSpeedOut: 0

  # disable selection
  $('#gallery, #fancy_overlay').disableTextSelect()
  
  # enable blending
  if !$.browser.msie
    $('#gallery li').blend speed: 600

xml_fix_for_ie = (xml) ->
  if $.browser.msie
    fuck = new ActiveXObect 'Microsoft.XMLDOM'
    fuck.loadXML xml
    xml = fuck
  xml


