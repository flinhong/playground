$( document ).ready(function() {
  
  $( "#search" ).on( "submit", function( event ) {
    event.preventDefault();
    var title = $('#inputTitle').val();
    var artist = $('#inputArtist').val();
    var keywords = encodeURIComponent(title); // keywords for searching
    if (artist) keywords += '+' + encodeURIComponent(artist);
    // console.log(w)
    queryData(keywords);
  });

  // get music infomation
  function queryData(keywords) {
    var urlString = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${keywords}&n=10&p=1&remoteplace=txt.mqq.all&catZhida=0&t=0&flag=1`;

    $.ajax({
      type: "get",
      async: false,
      url: urlString,
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "callback",
      scriptCharset: 'utf-8',
      success: function(data) {
        var html = processSearch(data);
        $('#music-info').html(html);
        $('#music-info tr').each(function() {
          $(this).click(function() {
            var id = $(this).attr('id');
            var mid = $(this).attr('class');
            $('#lyric').text('加载中...')
            queryLrc(id);
            var name = $(this).find('td')[0].innerHTML;
            var singer = $(this).find('td')[1].innerHTML;
            $('#card .card-title').text(name);
            $('#card .card-subtitle').text(singer);
            $('#card').removeClass('d-none');
            queryMusic(mid);
          })
        })
      },
      error: function() {
        alert('fail')
      }
    });
  }

  function queryMusic(mid) {
    var urlString = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1278911659&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${mid}&filename=C400${mid}.m4a&guid=3655047200`;

    $.ajax({
      type: "get",
      async: false,
      url: urlString,
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "callback",
      scriptCharset: 'utf-8',
      success: function(data) {
        // console.log(data);
        var vkey = data.data.items[0].vkey;
        var filename = data.data.items[0].filename;
        var musicpath = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=3655047200&fromtag=66`
        // console.log(musicpath);
        var music = `<audio src="${musicpath}" controls></audio>`
        $('#audio').html(music);
        $('#audio').removeClass('d-none')
      },
      error: function() {
        alert('fail')
      }
    });

    // var urlString = `https://ws.stream.qqmusic.qq.com/${mid}.m4a?fromtag=46`;
    // console.log(urlString);
    // var audio = `<audio src="${urlString}" controls></audio>`
    // $('#music-info').append(audio);
  }

  function queryLrc(id) {
    // var urlString = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${id}&g_tk=5381&jsonpCallback=callback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;

    var urlString = `https://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`;
    // console.log(urlString);

    // var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + urlString + '"') + '&format=xml&callback=?';
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=';
    yql += 'select * from xml where url="' + urlString +'"';
    yql += '&charset=gb2312&format=xml&callback=?';
    yql = encodeURI(yql);

    // console.log(yql)
    // console.log(yql);
    $.getJSON(yql, function () {
    })
    .done(function(data) {
      // console.log(data);
      var xmlDoc = $.parseXML( data.results[0] );
      if (xmlDoc) {
        var $xml = $(xmlDoc);
        var lyric = $xml.find('lyric').text();
        // console.log(lyric);
        var html = `<pre>${lyric}</pre>`
        $('#lyric').html(html);
      } else {
        $('#lyric').html('啥也没找到');
      }
    })
    .fail(function() {
      $('#lyric').html('出错了');
    })
  }

  // $.getJSON( "./data.json", function( data ) {
  //   var html = processSearch(data);
  //   $('#music-info').html(html);
  //   $('#music-info tr').each(function() {
  //     $(this).click(function() {
  //       var musicid = $(this).attr('id');
  //       queryLrc(musicid);
  //       var name = $(this).find('td')[0].innerHTML;
  //       var singer = $(this).find('td')[1].innerHTML;
  //       $('#card .card-title').text(name);
  //       $('#card .card-subtitle').text(singer);
  //       $('#card').removeClass('d-none');
  //     })
  //   })
  // });

  function processSearch(data) {
    // console.log(data);
    var list = data.data.song.list;
    // console.log(list);
    var html = '<table class="table table-striped table-hover">';
    html += `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">歌名</th>
      <th scope="col">歌手</th>
      <th scope="col">专辑</th>
    </tr>
    </thead><tbody>`;
    var count = 0;
    for (item in list) {
      count++;
      var album = list[item].albumname;
      var songname = list[item].songname;
      var songmid = list[item].songmid;
      var songid = list[item].songid;
      var singer = list[item].singer[0].name;
      html += `<tr id="${songid}" class="${songmid}"><th scope="row">${count}</th><td>${songname}</td><td>${singer}</td><td>${album}</td>`;
    }
    html += '</tbody></table>'
    return html
  }

});