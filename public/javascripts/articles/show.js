(function() {

  // Search vocab click
  $('.panel-body span').click(function() {
    var vocab = $(this).text();
    var url = '/vocabs/' + vocab + '/search';

    $.ajax({
        method: "POST",
        url: url,
      })
      .done(function(res) {
        console.log(res);

        var str = createSearchResult(res.word, res.definitions);

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

  // Add word to booklet
  $('#add-vocab').click(function() {
    var vocab = $('.result h4').text();


    // Send request.
    var url = '/vocabs/' + vocab;
    $.ajax({
        method: "POST",
        url: url,
      })
      .done(function(res) {

        if (res.status === 1) {
          // TODO: need to have some animation here
          console.log('success');
        }

      });
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
        console.log(res);
        if (res.status === true) {
          window.location = './' + article_id + '/comments';
        }
      });
  });

})();


function createSearchResult(query, definitions) {
  var str = '<h4>' + query + '</h4>';

  if (definitions.length === 0) {
    return str + '<p>查無此單字</p>';
  }

  definitions.forEach(function(definition) {
    str += '<p class="definition">' + definition + '</p>';
  });

  return str;
}