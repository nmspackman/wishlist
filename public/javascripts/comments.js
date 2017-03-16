

$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
    //   $("#json").text(jobj);
      run(jobj);
  });

   $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li class='list-group-item'> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });

    $("#deleteComments").click(function() {
        $.ajax({
            url: 'comment',
            type: 'DELETE',
            success: function (data, textStatus) {
                console.log('deleted');
                $("#comments").html('');
            }
        })
  });
});

function run(jobj) {
    var url = "comment";
    $.ajax({
    url:url,
    type: "POST",
    data: jobj,
    contentType: "application/json; charset=utf-8",
    success: function(data,textStatus) {
        console.log(textStatus);
        // $("#done").html(textStatus);
    }
    });
}