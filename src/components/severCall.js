
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

function serverGetCommentsById(postId,onComment) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => {
        // console.log(success);
            onComment(success);
        }
    ).catch(error => console.log(error));
}

function addComment(postId,name,email,body,onComment) {
    console.log("serverCall: "+postId);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
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
        .then(success => onComment(success))
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
        .then(success => onAddPost(success))
}






export {serverGetPosts,updatePost,addComment,onDeleteInServer,addPostToServer,serverGetCommentsById};