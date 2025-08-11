export const userDummyData = {
  id: 42, // DB 인덱스, 내부 식별자
  username: "testUser", // 아이디
  email: "test@email.com", // 이메일
  nickname: "tester", // 닉네임
  role: "president", //president user
  phone: "01022742467", // 전화번호
  like: [
    {
      truckId: "175204",
      name: "오남 핫도그",
      category: "간식",
      review: [
        { nickName: "핫도그매니아", content: "치즈가 쭉 늘어나서 좋아요.", rating: 4.0 },
        { nickName: "감자덕후", content: "감자핫도그가 바삭해요!", rating: 4.5 },
      ],
      intro: "겉은 바삭, 속은 촉촉한 수제 핫도그를 맛볼 수 있습니다.",
      menu: [
        { name: "치즈핫도그", price: "3000", info: "쭉 늘어나는 치즈", num: "1" },
        { name: "감자핫도그", price: "3500", info: "감자가 듬뿍", num: "2" },
      ],
      schedule: [
        {
          day: "월",
          holiday: false,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: false,
        },
        {
          day: "화",
          holiday: true,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: true,
        },
        {
          day: "수",
          holiday: false,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: false,
        },
        {
          day: "목",
          holiday: true,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: true,
        },
        {
          day: "금",
          holiday: true,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: true,
        },
        {
          day: "토",
          holiday: true,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: false,
        },
        {
          day: "일",
          holiday: true,
          start: "12",
          end: "20",
          mapAddress: "경기 남양주시 오남읍 진건오남로522번길 11-1 지산파크빌상가",
          userAddress: "오남초등학교 앞",
          sms: true,
        },
      ],
    },
    {
      truckId: "809134",
      name: "진건 아이스크림",
      category: "디저트",
      review: [
        { nickName: "아이스크림러버", content: "바닐라맛이 진해요.", rating: 4.5 },
        { nickName: "토핑덕후", content: "토핑이 다양해서 좋아요.", rating: 4.0 },
      ],
      intro: "다양한 맛의 아이스크림과 토핑을 즐길 수 있습니다.",
      menu: [
        { name: "바닐라", price: "2500", info: "기본 바닐라맛", num: "1" },
        { name: "초코", price: "2500", info: "진한 초코맛", num: "2" },
      ],
      schedule: [
        { day: "월", holiday: true, start: "12", end: "18", sms: true, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "화", holiday: true, start: "12", end: "18", sms: false, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "수", holiday: true, start: "12", end: "18", sms: true, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "목", holiday: true, start: "12", end: "18", sms: false, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "금", holiday: false, start: "12", end: "18", sms: false, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "토", holiday: false, start: "12", end: "18", sms: false, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
        { day: "일", holiday: false, start: "12", end: "18", sms: false, mapAddress: "경기 남양주시 오남읍 양지로 57", userAddress: "진건초등학교 앞" },
      ],
    },
  ],
};
