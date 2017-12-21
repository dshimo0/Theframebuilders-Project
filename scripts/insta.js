
var ig = {};
// Instagram Token
ig.token = '6458559222.1677ed0.f2da3095e17e4c22951f30b3e0c5cdb9';
// Initialize instafeed
ig.init = function() {
  $('.instagram').each(function(i) {
    var args = {};
    args.container = $(this);
    args.userid = args.container.data('userid');
    //Feed images depending on the screen size
    if ( screen.width < 760 ) {
      args.limit = 4;
    }
    else if ( screen.width > 760 && screen.width < 1020 ) {
      args.limit = 9;
    }
    else if ( screen.width >= 1024 && screen.width <= 1270 ) {
      args.limit = 8;
    }
    else {
      args.limit = args.container.data('limit');
    };
    args.feedurl = 'https://api.instagram.com/v1/users/'+args.userid+'/media/recent/?access_token='+ig.token+'&count='+args.limit+'&callback=?';
    args.html = '';
    // PASS ARGS TO QUERY
    ig.query(args);
  });
}

ig.query = function(args) {
  $.getJSON(args.feedurl, {}, function(data) {
		// PASS QUERY DATA TO BUILDER
		ig.build(data, args);
	});
}


ig.build = function(data, args) {
  
  $.each(data.data,function (i,item) {
    console.log(item);
    if (item.caption) var caption = item.caption.text;
    var thumb = item.images.low_resolution.url;
    var LINK = item.link;
    var img = item.images.standard_resolution.url;
    //get 1280 size photo [hack until avail in api]
    var hires = img.replace('s640x640', '1080x1080');
    args.html += '<a href='+LINK+' target="_blank"  class="image" style="background-image: url('+thumb+');" data-img="'+hires+'">';
    if (caption) args.html += '<span class="caption">'+caption+'</span>';
    args.html += '</a>';
    // PASS TO OUTPUT
    ig.output(args);
  });
}

ig.output = function(args) {
  args.container.html(args.html);
}

ig.view = {
  viewer: $('.igviewer'),
  image: $('.igviewer img'),
}
ig.init();

