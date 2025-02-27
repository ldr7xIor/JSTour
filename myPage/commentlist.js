document.addEventListener("DOMContentLoaded", function () {
    loadMyComments();
});

function loadMyComments() {
    let myCommentList = document.getElementById("myCommentList");
    myCommentList.innerHTML = "";

    let loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        myCommentList.innerHTML = "<p>로그인 후 확인할 수 있습니다.</p>";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    let myName = userData.name; // 로그인한 사용자의 닉네임

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    
    let myComments = comments.filter(comment => comment.author === myName);

    if (myComments.length === 0) {
        myCommentList.innerHTML = "<p>작성한 댓글이 없습니다.</p>";
        return;
    }

    myComments.forEach(comment => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <img src="${comment.profilePicture}" alt="Profile" class="comment-profile">
                <strong>${comment.author}</strong> - <small>${comment.timestamp}</small>
            </div>
            <p>${comment.text}</p>
        `;
        myCommentList.appendChild(listItem);
    });
}

