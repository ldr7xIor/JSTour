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

            sessionStorage.setItem("loggedInUser", id);
            window.location.href = "../mainpage.html";
        });
    }
});
