$(document).ready(function(){
  $("#postItem").click(function(){
      var myobj = {Item:$("#item").val(),Link:$("#link").val(),Image:$("#image").val()};
      jobj = JSON.stringify(myobj);
    //   $("#json").text(jobj);
      runItem(jobj);
  });

   $("#getItems").click(function() {
    $.getJSON('item', function(data) {
      console.log(data);
      var everything = "<div class='row'>";
      for(var item in data) {
        itemObj = data[item];
        everything += "<div class='col-sm-6 col-md-4'><div class='thumbnail'>"
                   +    "<img src='" + itemObj.Image + "' alt='" + itemObj.Item  + "'>"
                   +    "<div class='caption'><h3>" + itemObj.Item + "</h3>"
                   +    "<p><a href='" + itemObj.Link + "' class='btn btn-primary' role='button' target='_blank'>Open in New Window</a></p></div>"
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
        console.log(textStatus);
        $("#done").html(textStatus);
    }
    });
}