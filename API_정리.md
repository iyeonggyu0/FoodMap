# API 정리 문서

## 1. 사용자 인증 관련 API

### 1.1 로그인 API

- **API 형식**: POST
- **API 주소**: `/login`
- **컴포넌트/페이지**: LoginPage (src/pages/LoginPage/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "id": "string", // 사용자 ID
    "pw": "string" // 사용자 비밀번호
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 1.2 회원가입 API

- **API 형식**: POST
- **API 주소**: `/signup`
- **컴포넌트/페이지**: SignUpPage (src/pages/SignUpPage/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "username": "string", // 사용자 이름 (5-20자)
    "password": "string", // 비밀번호 (8-20자)
    "email": "string", // 이메일
    "nickname": "string", // 닉네임 (2-10자, 한글/영어/숫자)
    "role": "string", // 역할 ("user" | "president")
    "phone": "string" // 전화번호 (010으로 시작, 11자리)
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

## 2. 인증번호 관련 API

### 2.1 인증번호 발송 API

- **API 형식**: POST
- **API 주소**: `/certification/send`
- **컴포넌트/페이지**:
  - SignUpPage (src/pages/SignUpPage/index.jsx)
  - MyPageInfoCP (src/components/MyPageCP/MyPageInfoCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "phone": "string" // 전화번호 (010으로 시작, 11자리)
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 2.2 인증번호 확인 API

- **API 형식**: POST (SignUpPage) / PUT (MyPageInfoCP)
- **API 주소**: `/certification/check`
- **컴포넌트/페이지**:
  - SignUpPage (src/pages/SignUpPage/index.jsx)
  - MyPageInfoCP (src/components/MyPageCP/MyPageInfoCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "phone": "string", // 전화번호
    "certification": "string" // 인증번호
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

## 3. 사용자 정보 관리 API

### 3.1 비밀번호 변경 API

- **API 형식**: PUT
- **API 주소**: `/user/password`
- **컴포넌트/페이지**: MyPageInfoCP (src/components/MyPageCP/MyPageInfoCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "password": "string" // 새 비밀번호 (8-20자)
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 3.2 닉네임 변경 API

- **API 형식**: PUT
- **API 주소**: `/user/nickname`
- **컴포넌트/페이지**: MyPageInfoCP (src/components/MyPageCP/MyPageInfoCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "nickname": "string" // 새 닉네임 (2-10자, 한글/영어/숫자)
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 3.3 회원탈퇴 API

- **API 형식**: DELETE
- **API 주소**: `/user/secession`
- **컴포넌트/페이지**: MyPageInfoCP (src/components/MyPageCP/MyPageInfoCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

## 4. 푸드트럭 관련 API

### 4.1 푸드트럭 정보 조회 API (주석처리됨)

- **API 형식**: GET
- **API 주소**: `/user/foodtruck`
- **컴포넌트/페이지**: MyFTCP (src/components/MyPageCP/MyFTCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean",
    "data": {
      "name": "string", // 푸드트럭 이름
      "category": "string", // 카테고리
      "intro": "string", // 소개
      "operatorNum": "string", // 사업자 등록번호
      "menu": [
        {
          "name": "string", // 메뉴명
          "price": "string", // 가격
          "info": "string", // 메뉴 설명
          "num": "string" // 메뉴 번호
        }
      ],
      "schedule": [
        {
          "day": "string", // 요일
          "holiday": "boolean", // 영업일 여부
          "start": "string", // 시작 시간
          "end": "string", // 종료 시간
          "mapAddress": "string", // 지도상 주소
          "userAddress": "string" // 안내용 주소
        }
      ]
    }
  }
  ```

### 4.2 푸드트럭 정보 수정 API (주석처리됨)

- **API 형식**: PUT
- **API 주소**: `/user/foodtruck`
- **컴포넌트/페이지**: MyFTCP (src/components/MyPageCP/MyFTCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "name": "string", // 푸드트럭 이름
    "category": "string", // 카테고리
    "intro": "string", // 소개
    "menu": [
      {
        "name": "string", // 메뉴명
        "price": "string", // 가격
        "info": "string", // 메뉴 설명
        "num": "string" // 메뉴 번호
      }
    ],
    "schedule": [
      {
        "day": "string", // 요일
        "holiday": "boolean", // 영업일 여부
        "start": "string", // 시작 시간
        "end": "string", // 종료 시간
        "mapAddress": "string", // 지도상 주소
        "userAddress": "string" // 안내용 주소
      }
    ],
    "operatorNum": "string" // 사업자 등록번호
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 4.3 푸드트럭 목록 조회 API (주석처리됨)

- **API 형식**: GET
- **API 주소**: `/map/ft/{filter}`
- **컴포넌트/페이지**: MapPage (src/pages/MapPage/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **쿼리 파라미터**: filter (카테고리 필터)
- **API 응답데이터**:
  ```json
  [
    {
      "truckId": "string", // 푸드트럭 ID
      "name": "string", // 푸드트럭 이름
      "category": "string", // 카테고리
      "like": "boolean", // 찜 여부
      "review": [
        {
          "nickName": "string", // 리뷰 작성자 닉네임
          "content": "string", // 리뷰 내용
          "rating": "number" // 평점
        }
      ],
      "intro": "string", // 푸드트럭 소개
      "menu": [
        {
          "name": "string", // 메뉴명
          "price": "string", // 가격
          "info": "string", // 메뉴 설명
          "num": "string" // 메뉴 번호
        }
      ],
      "schedule": [
        {
          "day": "string", // 요일
          "holiday": "boolean", // 휴무 여부
          "start": "string", // 시작 시간
          "end": "string", // 종료 시간
          "mapAddress": "string", // 지도용 주소
          "userAddress": "string", // 안내용 주소
          "sms": "boolean" // 알람 여부
        }
      ],
      "coords": {
        "lat": "number", // 위도
        "lng": "number" // 경도
      },
      "distance": "number" // 거리
    }
  ]
  ```

## 5. 찜하기/알림 관련 API

### 5.1 찜하기 추가 API

- **API 형식**: POST
- **API 주소**: `/map/ft/like`
- **컴포넌트/페이지**:
  - MapPage (src/pages/MapPage/index.jsx)
  - MyLikeCP (src/components/MyPageCP/MyLikeCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "ftId": "string" // 푸드트럭 ID
  }
  ```
- **요청 설정**: `{ withCredentials: true }`
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 5.2 찜하기 삭제 API

- **API 형식**: DELETE
- **API 주소**: `/map/ft/like/{ftId}`
- **컴포넌트/페이지**:
  - MapPage (src/pages/MapPage/index.jsx)
  - MyLikeCP (src/components/MyPageCP/MyLikeCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **URL 파라미터**: ftId (푸드트럭 ID)
- **요청 설정**: `{ withCredentials: true }`
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 5.3 SMS 알림 추가 API

- **API 형식**: POST
- **API 주소**: `/map/ft/sms`
- **컴포넌트/페이지**:
  - MapPage (src/pages/MapPage/index.jsx)
  - MyLikeCP (src/components/MyPageCP/MyLikeCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "ftId": "string", // 푸드트럭 ID
    "day": "string" // 요일 ("월", "화", ...)
  }
  ```
- **요청 설정**: `{ withCredentials: true }`
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 5.4 SMS 알림 삭제 API

- **API 형식**: DELETE
- **API 주소**: `/map/ft/sms/{ftId}/{day}`
- **컴포넌트/페이지**:
  - MapPage (src/pages/MapPage/index.jsx)
  - MyLikeCP (src/components/MyPageCP/MyLikeCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **URL 파라미터**:
  - ftId (푸드트럭 ID)
  - day (요일)
- **요청 설정**: `{ withCredentials: true }`
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 5.5 찜 목록 조회 API (주석처리됨)

- **API 형식**: GET
- **API 주소**: `/ft/like`
- **컴포넌트/페이지**: MyLikeCP (src/components/MyPageCP/MyLikeCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean",
    "ftList": [
      {
        "truckId": "string", // 푸드트럭 ID
        "name": "string", // 푸드트럭 이름
        "category": "string", // 카테고리
        "like": "boolean", // 찜 여부
        "review": [
          {
            "nickName": "string", // 리뷰 작성자 닉네임
            "content": "string", // 리뷰 내용
            "rating": "number" // 평점
          }
        ],
        "intro": "string", // 푸드트럭 소개
        "menu": [
          {
            "name": "string", // 메뉴명
            "price": "string", // 가격
            "info": "string", // 메뉴 설명
            "num": "string" // 메뉴 번호
          }
        ],
        "schedule": [
          {
            "day": "string", // 요일
            "holiday": "boolean", // 휴무 여부
            "start": "string", // 시작 시간
            "end": "string", // 종료 시간
            "mapAddress": "string", // 지도용 주소
            "userAddress": "string", // 안내용 주소
            "sms": "boolean" // 알람 여부
          }
        ]
      }
    ]
  }
  ```

## 6. 리뷰 관련 API

### 6.1 사용자 리뷰 목록 조회 API (주석처리됨)

- **API 형식**: GET
- **API 주소**: `/user/review`
- **컴포넌트/페이지**: MyReviewCP (src/components/MyPageCP/MyReviewCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean",
    "reviews": [
      {
        "id": "string", // 리뷰 ID
        "content": "string", // 리뷰 내용
        "rating": "number", // 평점
        "createdAt": "string", // 작성일 (ISO 8601 형식)
        "ftData": {
          "name": "string", // 푸드트럭 이름
          "truckId": "string" // 푸드트럭 ID
        }
      }
    ]
  }
  ```

### 6.2 리뷰 수정 API

- **API 형식**: PUT
- **API 주소**: `/review`
- **컴포넌트/페이지**: MyReviewCP (src/components/MyPageCP/MyReviewCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {
    "id": "string", // 리뷰 ID
    "content": "string", // 수정된 리뷰 내용
    "rating": "number" // 수정된 평점
  }
  ```
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "review": {
      "content": "string", // 수정된 리뷰 내용
      "rating": "number" // 수정된 평점
    },
    "message": "string" // 실패 시 에러 메시지
  }
  ```

### 6.3 리뷰 삭제 API

- **API 형식**: DELETE
- **API 주소**: `/review/{reviewId}`
- **컴포넌트/페이지**: MyReviewCP (src/components/MyPageCP/MyReviewCP/index.jsx)
- **API 전달 데이터**:
  ```json
  {}
  ```
- **URL 파라미터**: reviewId (리뷰 ID)
- **API 응답데이터**:
  ```json
  {
    "success": "boolean", // 요청 성공 여부
    "message": "string" // 실패 시 에러 메시지
  }
  ```

## 7. API 공통 사항

### 7.1 환경 변수

- **Base URL**: `${import.meta.env.VITE_API_URL}`

### 7.2 인증 방식

- **세션 기반 인증**: 일부 API에서 `{ withCredentials: true }` 옵션 사용
- **로그인 상태 확인**: `useLoginCheck` 훅 사용 (현재 대부분 주석처리되어 있음)

### 7.3 에러 처리

- 모든 API는 `success` 필드로 성공/실패 여부를 판단
- 실패 시 `message` 필드에 에러 메시지 포함
- catch 블록에서 콘솔 에러 로그 및 사용자 알림 처리

### 7.4 주석처리된 API

다음 API들은 현재 주석처리되어 있고 더미 데이터로 대체되어 있습니다:

- 푸드트럭 정보 조회 (`/user/foodtruck`)
- 푸드트럭 정보 수정 (`/user/foodtruck`)
- 푸드트럭 목록 조회 (`/map/ft/{filter}`)
- 찜 목록 조회 (`/ft/like`)
- 사용자 리뷰 목록 조회 (`/user/review`)

---

_이 문서는 2025년 8월 12일 기준으로 작성되었습니다._
