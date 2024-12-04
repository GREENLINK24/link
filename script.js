// 사용자의 선택을 기록할 객체
let userSelections = {
    experience: "",
    environment: "",
    region: "",
    cropType: ""
};

// 질문을 진행하는 함수
function showQuestion() {
    // 첫 번째 질문을 표시
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'block';  // 질문 보이기
    const recommendedContainer = document.getElementById('recommended-machines');
    recommendedContainer.style.display = 'none';  // 추천 결과 숨기기

    // 첫 번째 질문을 표시
    document.getElementById('question1').style.display = 'block';
}

// 사용자가 질문에 답을 클릭했을 때 호출되는 함수
function nextQuestion(selection) {
    // 선택된 값을 userSelections에 기록
    const currentQuestion = document.querySelector('.question-container[style*="display: block"]');
    const questionType = currentQuestion.getAttribute('data-question');
    userSelections[questionType] = selection;

    // 현재 질문 숨기기
    currentQuestion.style.display = 'none';

    // 다음 질문을 표시
    const nextQuestionIndex = parseInt(currentQuestion.id.replace('question', '')) + 1;
    const nextQuestion = document.getElementById('question' + nextQuestionIndex);
    
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    } else {
        // 모든 질문이 끝났으면 추천 결과 표시
        showRecommendations();
    }
}

// 추천 농기계 계산 및 표시
function showRecommendations() {
    const recommendations = [];

    // 농업 경력에 따른 추천
    if (userSelections.experience === "beginner") {
        recommendations.push("초급자를 위한 소형 트랙터");
        recommendations.push("초급자를 위한 일반 경운기");
    } else if (userSelections.experience === "intermediate") {
        recommendations.push("중급자를 위한 하이브리드 트랙터");
        recommendations.push("중급자를 위한 자동 경운기");
    } else if (userSelections.experience === "advanced") {
        recommendations.push("고급자를 위한 대형 트랙터");
        recommendations.push("고급 자동 경운기");
    }

    // 재배 환경에 따른 추천
    if (userSelections.environment === "indoor") {
        recommendations.push("온실 재배에 적합한 소형 자동 경운기");
        recommendations.push("온실용 스마트 농기계");
    } else if (userSelections.environment === "outdoor") {
        recommendations.push("야외 재배용 대형 트랙터");
        recommendations.push("야외용 스마트 트랙터");
    }

    // 지역별 농기계 추천 (지역 특성 반영)
    const regionRecommendations = {
        gyeonggi: ["소형 트랙터", "경운기"],
        chungcheong_south: ["대형 트랙터", "자동 경운기"],
        chungcheong_north: ["경사로 작업이 용이한 트랙터", "소형 경운기"],
        jeolla_north: ["대형 트랙터", "스마트 자동 경운기"],
        jeolla_south: ["스마트 트랙터", "자동 경운기"],
        gyeongsang_north: ["소형 트랙터", "경운기"],
        gyeongsang_south: ["대형 트랙터", "스마트 농기계"],
        gangwon: ["소형 트랙터", "경운기"],
        jeju: ["무인 트랙터", "스마트 자동 경운기"],
        ullung_dokdo: ["소형 트랙터", "경운기"]
    };

    // 지역별 추천 추가
    if (userSelections.region && regionRecommendations[userSelections.region]) {
        recommendations.push(...regionRecommendations[userSelections.region]);
    }

    // 작물 유형에 따른 추천
    const cropRecommendations = {
        cereal: ["곡물 수확용 콤바인", "곡물 파종기"],
        vegetable: ["채소 파종기", "채소 수확기"],
        fruit: ["과일 수확기", "과일 파종기", "과일 수확용 드론"]
    };

    // 작물별 추천 추가
    if (userSelections.cropType && cropRecommendations[userSelections.cropType]) {
        recommendations.push(...cropRecommendations[userSelections.cropType]);
    }

    // 결과 출력
    const machineList = document.getElementById('machine-list'); // 추천 농기계 목록을 출력할 요소
    machineList.innerHTML = ""; // 기존 목록 초기화

    if (recommendations.length > 0) {
        recommendations.forEach(function (machine) {
            const machineItem = document.createElement('li'); // 새 항목 생성
            machineItem.textContent = machine;  // 항목에 텍스트 추가

            // 클릭 이벤트 리스너 추가
            machineItem.addEventListener('click', function() {
                alert(`선택된 농기계: ${machine}`); // 클릭 시 알림 표시
            });

            machineList.appendChild(machineItem); // 항목을 목록에 추가
        });

        // 추천 결과 컨테이너 표시
        const recommendedContainer = document.getElementById('recommended-machines');
        recommendedContainer.style.display = 'block';  // 추천 결과 표시
    } else {
        machineList.innerHTML = "추천할 농기계가 없습니다. 선택을 다시 확인해주세요!";
    }
}
