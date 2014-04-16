$(document).ready(function() {
    var dataRef = new Firebase('https://torid-fire-2027.firebaseio.com/');
    
    $('#submit').click(function (e) {
          var author = $('#authorInput').val();
          var title = $('#titleInput').val();
          var content = $('#contentInput').val();
          
          //console.log("Sending:\nTitle: " + title + "\nAuthor: " + author + "\nContent: " + content);
          
          if(author != "" && title != "" && content != ""){
            dataRef.push({author:author, title:title, content:content});
            //$('#authorInput').val('');
            $('#titleInput').val('');
            $('#contentInput').val('');
          }
    });
    $('#delete').click(function (e) {
        dataRef.remove();
        // hackity method!
        location.reload();
    });
    
    dataRef.limit(10).on('child_added', function (snapshot) {
        var post = snapshot.val();
        
        var title = '<div class="title">' + post.title + '</div>';
        var author = '<div class="author">by: ' + post.author + '</div>';
        var content = '<br /><div class="content">' + post.content + '</div>';
        
        console.log("Received:\nTitle: " + title + "\nAuthor: " + author + "\nContent: " + content);
        
        $('.posts').prepend('<div class="module contentContainer">' + title + author + content + '</div>');
        
    });
})
