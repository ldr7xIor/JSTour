document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const id = document.getElementById("loginId").value;
            const password = document.getElementById("loginPassword").value;

            const userData = JSON.parse(localStorage.getItem(id));

            if (!userData) {
                alert("존재하지 않는 아이디입니다.");
                return;
            }

            if (userData.password !== password) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            sessionStorage.setItem("loggedInUser", id);  // 로그인한 사용자 저장

            // 로그인 성공 후 mypage로 리다이렉트
            window.location.href = "../mainpage.html";
        });
    }
});
