document.addEventListener("DOMContentLoaded", function () {
    const cities = {
        seoul: ["강남/역삼/삼성", "신사/청담/압구정", "서초/교대/강동", "을지로/명동/중구/동대문", "서울역/이태원/용산", "종로/인사동", "홍대/합정/마포/서대문", "여의도", "영등포역", "구로/신도림/금천", "김포공항/염창/강서", "건대입구/성수/왕십리", "성북/강북/노원/도봉"],
        gyeonggi: ["가평/청평/양평", "수원/화성", "고양/파주/김포", "의정부/포천/동두천", "용인/동탄", "오산/평택", "남양주/구리/성남/분당", "이천/광주/여주/하남", "부천/광명/시흥/안산", "안양/의왕/군포"],
        incheon: ["송도/소래포구", "인천국제공항/강화/을왕리", "영종도/월미도", "주안/간석/인천시청", "청라/계양/부평"],
        gangwon: ["강릉", "속초/고성", "양양", "춘천/인제/철원", "평창/정선/영월", "동해/삼척/태백", "홍천/횡성/원주"],
        gyeongsang: ["대구/구미/안동/문경", "경주", "울산/양산/밀양", "거제/통영", "포항/영덕/울진/청송", "창원/마산/진해/김해/부곡", "남해/사천/하동/진주"],
        jeolla: ["광주", "전주/완주", "여수/순천/광양", "보성/화순/장흥/나주/고흥/영암", "진안/무주/장수/임실", "군산/익산/김제", "순창/남원/곡성/구례", "목포/신안/무안/진도/해남/완도/강진", "부안/고창/정읍", "담양/장성/영광/함평"],
        busan: ["해운대/마린시티", "벡스코/센텀시티", "송정/기장/정관", "광안리/경성대", "부산역", "자갈치/남포동/영도", "송도/다대포", "서면/연산/범일", "동래/온천/금정구", "사상/강서/김해공항/하단"],
        jeju: ["제주시/제주국제공항", "서귀포시/모슬포", "애월/한림/협재", "중문", "표선/성산", "함덕/김녕/세화"],
        chungcheong: ["대전/세종", "천안/아산/도고", "당진/덕산/태안/서산/안면도", "보령/대천/부여/공주/금산", "청주/음성/진천", "충주/제천/단양/괴산/증평"]
    };

    function updateCities() {
        const provinceSelect = document.getElementById("province");
        const citySelect = document.getElementById("city");
        const selectedProvince = provinceSelect.value;

        citySelect.innerHTML = '<option value="">시/군/구 선택</option>';

        if (selectedProvince && cities[selectedProvince]) {
            cities[selectedProvince].forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }

    document.getElementById("province").addEventListener("change", updateCities);

    document.getElementById("addRegion").addEventListener("click", function (event) {
        event.preventDefault();
        const citySelect = document.getElementById("city");
        const valueCity = citySelect.value;
        // const selectedList = document.getElementById("selectedList");

        if (!valueCity) {
            alert("지역을 선택해 주세요.");
            return;
        }

        // const regionList = document.createElement("li");
        // regionList.textContent = valueCity;

        // selectedList.appendChild(listItem);
    });

    document.querySelector("form").addEventListener("submit", function (event) {
        const titleInput = document.getElementById("reviewTitle").value.trim();
        const textArea = document.getElementById("reviewTextarea").value.trim();
    
        if (!titleInput || !textArea) {
            alert("제목과 내용을 모두 입력해야 합니다.");
            event.preventDefault();
        }
    });
});
