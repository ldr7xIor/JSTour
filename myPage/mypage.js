document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));

        // 프로필 정보 업데이트
        if (userData) {
            // 닉네임과 프로필 이미지 업데이트
            document.getElementById("nicknameDisplay").textContent = userData.name;
            document.getElementById("profileImage").src = userData.profilePicture || "https://example.com/default-profile.jpg";  // 기본 이미지 경로
        }
    }
});
