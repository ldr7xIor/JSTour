document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("로그인이 필요합니다!");
        location.href = "../login/login.html";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    if (!userData) {
        alert("사용자 정보를 불러올 수 없습니다.");
        return;
    }

    function loadMyPosts(keyword = "") {
        const myPostList = document.getElementById("myPostList");
        myPostList.innerHTML = "";

        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const myPosts = posts.filter(post => post.author === userData.name);

        const filteredPosts = myPosts.filter(post => 
            post.title.includes(keyword) || post.content.includes(keyword)
        );

        if (filteredPosts.length === 0) {
            myPostList.innerHTML = "<p>검색 결과가 없습니다.</p>";
        } else {
            filteredPosts.reverse().forEach(post => {
                const postItem = document.createElement("li");
                postItem.innerHTML = `
                    <strong>${post.title}</strong> - <em>${post.timestamp}</em><br>
                    <small>지역: ${post.regions.join(", ")}</small><br>
                    <button onclick="location.href='https://ldr7xior.github.io/JSTour/Local/reviewDetail.html?id=${post.id}'">자세히 보기</button>
                `;
                myPostList.appendChild(postItem);
            });
        }
    }

    function searchPosts() {
        const keyword = document.getElementById("searchInput").value.trim();
        loadMyPosts(keyword);
    }

    document.getElementById("searchButton").addEventListener("click", searchPosts);

    document.getElementById("searchInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchPosts();
        }
    });

    loadMyPosts();
});
