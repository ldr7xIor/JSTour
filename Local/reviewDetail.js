document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get("id");

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
