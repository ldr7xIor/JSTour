document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get("id");
    loadComments();
    if (!reviewId) {
        alert("잘못된 접근입니다.");
        window.location.href = "../Local/selectLocal.html";
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("posts")) || [];
    let review = reviews.find(r => r.id === Number(reviewId)); // Number 변환하여 비교

    if (!review) {
        alert("존재하지 않는 게시글입니다.");
        window.location.href = "../Local/selectLocal.html";
        return;
    }

    document.getElementById("reviewTitle").textContent = review.title;
    document.getElementById("reviewAuthor").textContent = review.author;
    document.getElementById("reviewDate").textContent = review.timestamp; // timestamp 추가
    document.getElementById("reviewContent").textContent = review.content;

    // 지역 정보 추가
    const regionElement = document.createElement("p");
    regionElement.innerHTML = `<strong>지역:</strong> ${review.regions.join(", ")}`;
    document.getElementById("reviewContent").after(regionElement);
});

function postComment() {
    let loggedInUser = sessionStorage.getItem("loggedInUser");
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();

    if (!commentText) {
        alert("댓글을 입력하세요!");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get("id"); // 현재 글의 ID 가져오기
    if (!reviewId) return;

    let comments = JSON.parse(localStorage.getItem(`comments_${reviewId}`)) || [];
    let timestamp = new Date().toLocaleString();

    let commentData = {
        text: commentText,
        timestamp: timestamp,
        reviewId: reviewId // 댓글에 해당 글 ID 추가
    };

    if (loggedInUser) {
        let userData = JSON.parse(localStorage.getItem(loggedInUser));
        commentData.author = userData.name;
        commentData.profilePicture = userData.profilePicture || "../myPage/나기.jpg";
    } else {
        let randomNum = Math.floor(Math.random() * 10000);
        commentData.author = `비회원${randomNum}`;
        commentData.profilePicture = "../myPage/나기.jpg";
    }

    comments.push(commentData);
    localStorage.setItem(`comments_${reviewId}`, JSON.stringify(comments));

    // "내가 쓴 댓글" 목록에도 저장
    let allComments = JSON.parse(localStorage.getItem("comments")) || [];
    commentData.reviewId = reviewId; // 🛠 reviewId를 명확히 추가
    allComments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(allComments));

    commentInput.value = ""; 
    loadComments();
}

function loadComments() {
    let commentList = document.getElementById("commentList");
    commentList.innerHTML = "";

    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get("id");
    if (!reviewId) return;

    let comments = JSON.parse(localStorage.getItem(`comments_${reviewId}`)) || [];

    comments.forEach(comment => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <img src="${comment.profilePicture}" alt="Profile" class="comment-profile">
                <strong>${comment.author}</strong> - <small>${comment.timestamp}</small>
            </div>
            <p>${comment.text}</p>
        `;
        commentList.appendChild(listItem);
    });
}


