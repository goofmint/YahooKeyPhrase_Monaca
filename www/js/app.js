// Yahoo! デベロッパーネットワークで取得したアプリのIDに書き換えてください
let yahooAppId = 'YOUR_YAHOO_APP_ID';

let wikipediaUrl = 'https://ja.wikipedia.org/w/api.php?format=json&action=query&rvparse=1&rvprop=content&prop=revisions&titles=';
let yahooUrl = 'https://jlp.yahooapis.jp/KeyphraseService/V1/extract';

ons.ready(function() {
  $('#load').on('click', function(e) {
    
    let keyword = $('#keyword').val();
    let url = `${wikipediaUrl}${keyword}`;
    // Wikipediaのコンテンツを取得します
    $.ajax({
      url: url,
      dataType: 'json'
    })
    .then(function(results) {
      //本文を抽出します
      let key = Object.keys(results.query.pages)[0];
      let content = results.query.pages[key].revisions[0]['*'];
      content = jQuery.truncate(content, {
        length: 1000,
        stripTags: true
      });
      
      // Yahoo!テキスト解析を実行します
      return $.ajax({
        url: yahooUrl,
        type: 'get',
        dataType: 'jsonp',
        data: {
          appid: yahooAppId,
          sentence: content,
          output: 'json'
        }
      })
    })
    .then(function(results) {
      // 返ってきた文字をリスト表示します
      $('#results').empty();
      let html = [];
      for (let key in results) {
        html.push(`<ons-list-item>${key}</ons-list-item>`);
      }
      $('#results').html(html.join(''));
    })
  });
  
});