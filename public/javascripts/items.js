var currentItem = '';

$(document).ready(function(){
  $("#postItem").click(function(){
      var myobj = {Item:$("#item").val(),Link:$("#link").val(),Image:$("#image").val()};
      jobj = JSON.stringify(myobj);
      runItem(jobj);
      // Clear out the form for next submission
      $("#item").val('');
      $("#link").val('');
      $("#image").val('');
  });

   $("#getItems").click(function() {
    $.getJSON('item', function(data) {
      var everything = "<div class='row'>";
      let linkSection;
      for(var item in data) {
        itemObj = data[item];
        let link = itemObj.Link;
        if (!link)
          linkSection = "<a class='btn btn-danger' role='button'>No Link</a> ";
        else
          linkSection = "<a href='" + itemObj.Link + "' class='btn btn-primary' role='button' target='_blank'>Open in New Window</a> ";
        everything += "<div class='col-sm-6 col-md-4'><div class='thumbnail'>"
                   +    "<img src='" + itemObj.Image + "' alt='" + itemObj.Item  + "'>"
                   +    "<div class='caption'><h3>" + itemObj.Item + "</h3>"
                   +    "<p>" + linkSection
                   +    "<button data-toggle='modal' data-target='#commentModal' type='button' class='btn' onclick='loadComments(\"" + itemObj._id + "\")'>"
                   +      "Comments"
                   +    "</button></p></div>"
                   +  "</div></div>";
      }
      everything += "</div>";
      $("#items").html(everything);
    })
  });

    $("#deleteItems").click(function() {
        $.ajax({
            url: 'item',
            type: 'DELETE',
            success: function (data, textStatus) {
                console.log('deleted');
                $("#items").html('');
            }
        })
  });
});

function runItem(jobj) {
    var url = "item";
    $.ajax({
    url:url,
    type: "POST",
    data: jobj,
    contentType: "application/json; charset=utf-8",
    success: function(data,textStatus) {
        $("#done-message").html('Saved item: ' + textStatus);
        $('#done').slideDown('fast');
    }
    });
}

function loadComments(id) {
  currentItem = id;

  $('#commentList').empty();

  $.get('comments/'+currentItem, function(data) {
    $.each(data, function(index, value) {
      $('#commentList').append($('<dt/>', {text: value.Name}));
      $('#commentList').append($('<dd/>', {text: value.Text}));
    });
  });
}

function postComment() {
  var comment = {_Item: currentItem, Name: $("#nameInput").val(), Text: $("#commentInput").val()};
  $.post('comment', comment, function(data) {
    $("#doneComment-message").html('Comment posted!');
    $('#doneComment').slideDown('fast');
    loadComments(currentItem);
  });
  $("#nameInput").val('');
  $("#commentInput").val('');
}