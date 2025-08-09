import InputCP from "../../components/_common/InputCP";
import SelectInputCP from "../../components/_common/SelectInputCP";
import TextAreaInputCP from "../../components/_common/TextAreaInputCP";
import { useInput } from "../../hooks/useInput";
import MainLayOut from "../../layout/MainLayOut";
import { RegisterPageMainStyle } from "./style";

const RegisterPage = () => {
  // FT 푸드트럭 약자

  // 푸트드럭 이름
  const [FTName, onChangeFTName, setFTName] = useInput("");
  // 푸드트럭 카테고리
  const [FTCategory, onChangeFTCategory, setFTCategory] = useInput("");

  // 푸드트럭 카테고리 리스트
  const FTCategoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    {
      value: "튀김",
      data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김, 치킨)",
    },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    {
      value: "샌드위치/토스트",
      data: "샌드위치/토스트 (샌드위치, 토스트, 버거)",
    },
    {
      value: "디저트/음료",
      data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)",
    },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];

  // 푸드트럭 소개
  const [FTIntro, onChangeFTIntro, setFTIntro] = useInput("");

  const [phNumber, onChangePhoneNumber, setPhoneNumber] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");

  // FIXME: 로그인 세션 확인 기능 추가하기

  return (
    <MainLayOut>
      <RegisterPageMainStyle>
        <section>
          <div>
            <h1>푸드트럭 정보 등록</h1>
            <p>고객들이 쉽게 찾을 수 있도록 정확한 정보를 입력해주세요.</p>
          </div>
          <div>
            <h2>기본 정보</h2>
            <div className="col">
              <div>
                <InputCP
                  title="푸드트럭 이름"
                  essential="true"
                  value={FTName}
                  ex="황금 잉어빵"
                  onChangeHandler={onChangeFTName}
                />
                <span className="nameError error">2글자 이상 입력하세요</span>
              </div>
              <div>
                <SelectInputCP
                  title="카테고리"
                  essential="true"
                  listData={FTCategoryList}
                  onChangeHandler={onChangeFTCategory}
                />
                <span className="categoryError error">
                  카테고리를 선택하세요
                </span>
              </div>
            </div>
            <div className="col-full">
              <div>
                <TextAreaInputCP
                  title="푸드트럭 소개"
                  essential="true"
                  ex="푸드트럭에 대한 소개를 입력하세요."
                  onChangeHandler={onChangeFTIntro}
                  value={FTIntro}
                  maxRows={7}
                  minRows={5}
                />
                <span className="introError error">20자 이상 입력하세요</span>
              </div>
            </div>

            <div className="col">
              <div>
                <InputCP
                  title="연락처"
                  essential="true"
                  value={phNumber}
                  ex="010-1234-5678"
                  onChangeHandler={onChangePhoneNumber}
                />
                <span className="nameError error">올바른 형식이 아닙니다.</span>
              </div>
              <div>
                <InputCP
                  title="이메일"
                  essential="true"
                  value={email}
                  ex="your-email@email.com"
                  onChangeHandler={onChangeEmail}
                />
                <span className="nameError error">
                  올바른 이메일을 입력하세요
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2>메뉴 정보</h2>
          </div>
        </section>
      </RegisterPageMainStyle>
    </MainLayOut>
  );
};
export default RegisterPage;
