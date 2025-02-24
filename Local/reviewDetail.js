document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get("id");

    if (!reviewId) {
        alert("잘못된 접근입니다.");
        window.location.href = "../Local/selectLocal.html";
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let review = reviews.find(r => r.id === reviewId);

    if (!review) {
        alert("존재하지 않는 게시글입니다.");
        window.location.href = "../Local/selectLocal.html";
        return;
    }

    document.getElementById("reviewTitle").textContent = review.title;
    document.getElementById("reviewAuthor").textContent = review.author;
    document.getElementById("reviewDate").textContent = review.date;
    document.getElementById("reviewContent").textContent = review.content;
});
