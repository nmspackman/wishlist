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
      var everything = "<ul>";
      for(var item in data) {
        itemObj = data[item];
        everything += "<li class='list-group-item'> Item: " + itemObj.Item + " -- Link: " + itemObj.Link + " --Image: " + itemObj.Image + "</li>";
      }
      everything += "</ul>";
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