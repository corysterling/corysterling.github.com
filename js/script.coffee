$(document).ready ->

  $('.tab_content').hide()
  $('ul.tabs li:first').addClass('active').show()
  $('.tab_content:first').show()

  if !$.browser.msie
    $('ul.tabs li a').blend speed:600

  # on click event
  $('ul.tabs li').click ->
    $('ul.tabs li').removeClass 'active'
    $(this).addClass 'active'
    $('.tab_content').hide()

    active_tab = $(this).find('a').attr 'href'

    if $.browser.msie
      $(active_tab).show()
    else
      $(active_tab).fadeIn()


    get_data '#audio', 'media', './xml/sounds.xml', sound_item
    get_data '#gigs_list', 'gig', './xml/gigs.xml', gig_item

    false


get_data = (container_id, element, url, item_callback) ->
  $(container_id).empty()

  callback = (xml) ->
    new_xml = xml_fix_for_ie xml
    $(new_xml).find(element).each ->
      $(container_id).append (item_callback this)

  $.ajax
    type: 'GET'
    url: url
    dataType: if $.browser.msie then 'text' else 'xml'
    success: callback


sound_item = (xml) ->
  get_prop = (name) => $(xml).find(name).text()
  "
    <li class='song'>
      <p>&ldquo;#{get_prop 'title'}&rdquo; (#{get_prop 'author'})</p>
       <object type='application/x-shockwave-flash' data='./flash/player.swf' id='audioplayer1' height='24' width='290'>
        <param name='movie' value='./flash/player.swf' />
        <param name='FlashVars' value='playerID=1&amp;soundFile=#{get_prop 'source'}' />
        <param name='quality' value='high' />
        <param name='menu' value='false' />
        <param name='wmode' value='transparent' />
      </object>
    </li>
  "


gig_item = (xml) ->
  get_prop = (name) => $(xml).find(name).text()
  "
    <tr class='first_line'>
      <td class='date'>#{get_prop 'date'}</td>
      <td class='venu'>#{get_prop 'venue'}</td>
    </tr>

    <tr class='second_line'>
      <td class='time'>#{get_prop 'time'}</td>
      <td class='details'>#{get_prop 'details'}</td>
    </tr>
  "

xml_fix_for_ie = (xml) ->
  if $.browser.msie
    fuck = new ActiveXObect 'Microsoft.XMLDOM'
    fuck.loadXML xml
    xml = fuck
  xml


