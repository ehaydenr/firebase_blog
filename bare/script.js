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

        var title = document.createElement("h1");
        title.appendChild(document.createTextNode(post.title));
        var author = document.createElement("em");
        author.appendChild(document.createTextNode(post.author));
        var br = document.createElement("br");
        var content = document.createTextNode(post.content);
        var hr = document.createElement("hr");
        
        $('.posts').prepend(content);
        $('.posts').prepend(br);
        $('.posts').prepend(author);
        $('.posts').prepend(title);
        $('.posts').prepend(hr);

    });
})
