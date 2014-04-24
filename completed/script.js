$(document).ready(function() {
    var dataRef = new Firebase('https://torid-fire-2027.firebaseio.com/');
    
    $('#submit').click(function (e) {
          var author = $('#authorInput').val();
          var title = $('#titleInput').val();
          var content = $('#contentInput').val();
          
          //console.log('Sending:\nTitle: ' + title + '\nAuthor: ' + author + '\nContent: ' + content);
          
          if(author != '' && title != '' && content != ''){
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

        var title = document.createElement('div');
        title.className = 'title';
        title.appendChild(document.createTextNode(post.title));

        var author = document.createElement('div');
        author.className = 'author';
        author.appendChild(document.createTextNode(post.author));

        var content = document.createElement('div');
        content.className = 'content';
        content.appendChild(document.createTextNode(post.content));

        var module = document.createElement('div');
        module.className = 'module contentContainer';

        module.appendChild(title);
        module.appendChild(author);
        module.appendChild(content);
        
        $('.posts').prepend(module);

    });
})
