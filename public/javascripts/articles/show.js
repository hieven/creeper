(function() {

  // Search vocab click
  $('.panel-body span').click(function() {
    var text = $(this).text();
    var url = '/vocabs/' + text + '/search';

    $.ajax({
        method: "POST",
        url: url,
      })
      .done(function(res) {
        console.log(res);
        var vocab = res.vocab;
        var basic = (vocab.basic || {
          explains: vocab.translation
        });
        console.log(basic);
        var str = createSearchResult(vocab.query, basic);

        $('#search-result .result').html(str);
        $('#search-result').addClass('slideInUp');
        $('#search-result').removeClass('hide slideOutDown');
      });
  });

  // Search result collapse
  $('#search-result .close').click(function() {
    $('#search-result').removeClass('slideInUp');
    $('#search-result').addClass('slideOutDown');

  });


  // Complete reading
  $('#complete-btn').click(function() {
    var category = $(this).data('category');
    var article_id = $(this).data('article-id');
    var url = '/articles/' + category + '/' + article_id + '/complete';

    $.ajax({
        method: "POST",
        url: url,
      })
      .done(function(res) {
        if (res.status === true) {
          window.location = '/';
        }
      });
  });

})();


function createSearchResult(query, basic) {
  var str = '<h4>' + query + '</h4>';
  basic.explains.forEach(function(explain) {
    str += '<p>' + explain + '</p>';
  });

  return str;
}