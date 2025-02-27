document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser"); // 현재 로그인한 사용자

    if (!loggedInUser) {
        alert("로그인이 필요합니다!");
        location.href = "../login/login.html"; // 로그인 페이지로 이동
        return;
    }

    let userData = JSON.parse(localStorage.getItem(loggedInUser)); // 사용자 정보 가져오기
    if (!userData) {
        alert("사용자 정보를 불러올 수 없습니다.");
        return;
    }

    function loadMyPosts(keyword = "") {
        const myPostList = document.getElementById("myPostList");
        myPostList.innerHTML = ""; // 기존 목록 초기화

        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const myPosts = posts.filter(post => post.author === userData.name); // 사용자가 작성한 글만 필터링

        // 검색 기능 적용 (제목 또는 내용에 키워드 포함된 글만 필터링)
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
                    <button onclick="location.href='../Local/reviewDetail.html?id=${post.id}'">자세히 보기</button>
                `;
                myPostList.appendChild(postItem);
            });
        }
    }

    // 검색 실행 함수
    function searchPosts() {
        const keyword = document.getElementById("searchInput").value.trim();
        loadMyPosts(keyword);
    }

    // 검색 버튼 클릭 이벤트
    document.getElementById("searchButton").addEventListener("click", searchPosts);

    // 엔터 키 입력 시 검색 실행
    document.getElementById("searchInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // 기본 엔터 동작 방지 (폼 제출 방지)
            searchPosts(); // 검색 실행
        }
    });

    // 초기 글 목록 로드
    loadMyPosts();
});