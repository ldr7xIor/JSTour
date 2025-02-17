document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const id = document.getElementById("signupId").value;
            const password = document.getElementById("signupPassword").value;
            const passwordConfirm = document.getElementById("password_confirm").value;

            const defaultProfilePicture = "myPage/나기.jpg";
            if (!name || !id || !password || !passwordConfirm) {
                alert("모든 필드를 입력해주세요.");
                return;
            }

            if (password !== passwordConfirm) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            if (localStorage.getItem(id)) {
                alert("이미 존재하는 아이디입니다.");
                return;
            }

            const userData = { name, password, profilePicture: defaultProfilePicture };
            localStorage.setItem(id, JSON.stringify(userData));

            alert("회원가입 성공! 로그인하세요.");
            window.location.href = "login.html";
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const id = document.getElementById("loginId").value;
            const password = document.getElementById("loginPassword").value;
            const message = document.getElementById("message");

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
            message.innerText = `${userData.name}님, 로그인 성공!`;

            setTimeout(() => {
                window.location.href = "../mainpage.html";
            }, 1000);
        });
    }
});
