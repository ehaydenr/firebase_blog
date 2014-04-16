$(document).ready(function() {
    var dataRef = new Firebase('https://torid-fire-2027.firebaseio.com/');
    
    $('#submit').click(function (e) {

      // Get all form data
      var author = $('#authorInput').val();
      var title = $('#titleInput').val();
      var content = $('#contentInput').val();
      
      //console.log("Sending:\nTitle: " + title + "\nAuthor: " + author + "\nContent: " + content);
      
      // Check everything is filled out
      if(author != "" && title != "" && content != ""){
        // Push to Firebase
        dataRef.push({author:author, title:title, content:content});

        // Rest Input Fields
        $('#titleInput').val('');
        $('#contentInput').val('');
      }
    });
    
    $('#delete').click(function (e) {
        // Delete Posts
        dataRef.remove();
        // hackity method!
        location.reload(); // Page Refresh
    });
    
    // Callback when new post available
    dataRef.limit(10).on('child_added', function (snapshot) {

        // Post Object
        var post = snapshot.val();
        
        // Post Data
        var title = '<h1>' + post.title + '</h1>';
        var author = '<em>by: ' + post.author + '</em>';
        var content = '<br />' + post.content + '<hr />';
        
        //console.log("Received:\nTitle: " + title + "\nAuthor: " + author + "\nContent: " + content);
        
        // Insert Post into page
        $('.posts').prepend(title + author + content);
        
    });
})
