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

        // 댓글을 클릭하면 해당 리뷰로 이동
        if (comment.reviewId) { // reviewId가 존재하는 경우에만 이동 가능
            listItem.addEventListener("click", function () {
                window.location.href = `../Local/reviewDetail.html?id=${comment.reviewId}`;
            });
            listItem.style.cursor = "pointer"; // 클릭 가능 UI 변경
        }

        myCommentList.appendChild(listItem);
    });
}