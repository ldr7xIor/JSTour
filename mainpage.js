document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        let userData = JSON.parse(localStorage.getItem(loggedInUser));

        if (userData) {
            const navBar = document.getElementById("nav-bar");
            navBar.innerHTML = `
                <div id="profile">
                    <img src="${userData.profilePicture}" alt="Profile">
                    <span>${userData.name}</span>
                    <a href="myPage/mypage.html">마이페이지</a> /
                    <a href="#" id="logout">로그아웃</a>
                </div>
            `;

            // 로그아웃 기능
            document.getElementById("logout").addEventListener("click", function () {
                sessionStorage.removeItem("loggedInUser"); // 로그인 상태 해제
                window.location.reload();
            });
        }
    }
});
