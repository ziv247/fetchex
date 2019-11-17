
function serverGetPosts(url,onSuccess) {
    fetch(`https://jsonplaceholder.typicode.com/${url}`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => {
            onSuccess(success,url);
        }
    ).catch(error => console.log(error));
}

function addComment(postId,name,email,body,onComment) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            "postId": postId,
            "name": name,
            "email": email,
            "body":body
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => onComment(json))
        .then(success => {
            console.log("Success: ",success);
        })
}

function updatePost(post) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(success => {
            console.log("Success: ",success);
    })
}

function onDeleteInServer(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
    }).then(r => r.json())
        .then(json => console.log(json));

}
function addPostToServer(title,body,userId,onAddPost) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => onAddPost(json)).then(success => console.log("Success: "+success))
}






export {serverGetPosts,updatePost,addComment,onDeleteInServer,addPostToServer};