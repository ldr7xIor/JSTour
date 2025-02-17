document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));

        if (userData) {
            document.getElementById("nicknameDisplay").textContent = userData.name;
            
            // 프로필 이미지 업데이트
            const profileImage = document.getElementById("profileImage");
            profileImage.src = userData.profilePicture || "나기.jpg"; // 기본 이미지 적용
        }
    }
});
