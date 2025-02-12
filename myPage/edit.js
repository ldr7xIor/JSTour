document.addEventListener("DOMContentLoaded", function () {
    const nicknameEditBtn = document.getElementById("nicknameEditBtn");
    const profileImgEditBtn = document.getElementById("profileImgEditBtn");
    const nameForm = document.getElementById("nameForm");
    const imageForm = document.getElementById("imageForm");
    const saveNicknameBtn = document.getElementById("saveNicknameBtn");
    const saveProfileImgBtn = document.getElementById("saveProfileImgBtn");

    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));

        // 처음에는 폼 숨기기
        nameForm.style.display = "none";
        imageForm.style.display = "none";

        // 닉네임 수정 버튼 클릭 시
        nicknameEditBtn.addEventListener("click", function () {
            nameForm.style.display = "block";
            imageForm.style.display = "none";
            document.getElementById("name").value = userData.name;
        });

        // 프로필 사진 수정 버튼 클릭 시
        profileImgEditBtn.addEventListener("click", function () {
            imageForm.style.display = "block";
            nameForm.style.display = "none";
        });

        // 닉네임 저장 기능
        saveNicknameBtn.addEventListener("click", function () {
            const newNickname = document.getElementById("name").value;
            if (newNickname) {
                userData.name = newNickname;
                localStorage.setItem(loggedInUser, JSON.stringify(userData)); // 로그인한 사용자의 데이터 업데이트
                alert("닉네임이 변경되었습니다.");
            }
        });

        saveProfileImgBtn.addEventListener("click", function () {
            const fileInput = document.getElementById("profile_img");
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    userData.profilePicture = e.target.result;
                    localStorage.setItem(loggedInUser, JSON.stringify(userData)); // 로컬 스토리지 업데이트
        
                    alert("프로필 사진이 변경되었습니다.");
                    location.href = "mypage.html"; // 변경 즉시 적용되도록 페이지 새로고침
                };
                reader.readAsDataURL(file);
            }
        });
        
    }
});
