import { Link } from "react-router-dom";
import { useState } from "react";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import MainLayOut from "../../layout/MainLayOut";

import SimpleAccordionCP from "../../components/FaqPageCP/FaqPageAccordionCP";
import SelectInputCP from "../../components/_common/SelectInputCP";
import TextAreaInputCP from "../../components/_common/TextAreaInputCP";
import ButtonCP from "../../components/_common/ButtonCP";
import OutLineButtonCP from "../../components/_common/OutLineButtonCP";

import { ContactSection, FaqPageMainStyle, QNASection } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faEnvelope, faComments } from "@fortawesome/free-solid-svg-icons";

/** FAQ question - answer 데이터
 * 각 섹션은 title과 items로 구성됨
 * title은 섹션의 제목
 * items는 질문과 답변의 배열로, 각 객체는 id, question, answer 속성을 가짐
 * @property {Object} faqData.general - 일반 관련 질문 섹션
 * @property {Object} faqData.user - 고객 관련 질문 섹션
 * @property {Object} faqData.owner - 푸드트럭 사장님 관련 질문 섹션
 * @property {string} faqData.general.title - 일반 관련 질문 섹션 제목
 * @property {Array} faqData.general.items - 일반 관련 질문과 답변 목록
*/
const faqData = {
  general: {
    title: "일반 관련 질문",
    items: [
      {

        id: "g1", //id 겹침 피하기 위해 g1, u1, o1 등으로 구분
        question: "길맛로드는 어떤 서비스인가요?",
        answer: "길맛로드는 길거리 포장마차와 푸드트럭의 실시간 위치 정보를 제공하는 플랫폼입니다. 고객은 주변 푸드트럭을 쉽게 찾을 수 있고, 사장님들은 위치 정보를 등록하여 고객과 소통할 수 있습니다.",
      },

      {
        id: 'g2',
        question: '서비스 이용료가 있나요?',
        answer: '기본적인 서비스 이용은 무료입니다. 푸드트럭 사장님의 경우 프리미엄 기능 이용 시 별도 요금이 발생할 수 있습니다.'
      },
      {
        id: 'g3',
        question: '회원가입 없이도 이용할 수 있나요?',
        answer: '지도에서 푸드트럭 위치 확인은 회원가입 없이도 가능합니다. 하지만 찜하기, 리뷰 작성, 알림 설정 등의 기능은 회원가입이 필요합니다.'
      },
      {
        id: 'g4',
        question: '리뷰는 어떻게 작성하나요?',
        answer: '고객은 푸드트럭을 이용한 후, 해당 푸드트럭의 페이지에서 리뷰를 작성할 수 있습니다. 리뷰는 다른 고객들에게 유용한 정보를 제공합니다.'
      },
      {
        id: 'g5',
        question: '서비스 이용 중 문제가 발생했어요.',
        answer: '고객센터에 문의하시거나, FAQ 페이지에서 자주 묻는 질문을 확인해 주세요. 추가적인 도움이 필요하시면 고객 지원팀에 연락해 주세요.'
      },
    ]
  },
  user: {
    title: "고객 관련 질문",
    items: [
      {
        id: 'u1',
        question: '푸드트럭을 위치 정보가 정확하지 않아요.',
        answer: '위치 정보는 푸드트럭 사장님이 직접 업데이트합니다. 정확하지 않은 정보를 발견하시면 "제보하기" 기능을 통해 신고해주세요.'
      },
      {
        id: 'u2',
        question: '찜한 푸드트럭 알림은 어떻게 받나요?',
        answer: '마이페이지 > 설정에서 알림 기능을 활성화하시면, 찜한 푸드트럭의 위치 변경이나 새로운 소식을 알림으로 받을 수 있습니다.'
      },
      {
        id: 'u3',
        question: '리뷰 작성 후 수정이나 삭제가 가능한가요?',
        answer: '네, 작성한 리뷰는 마이페이지에서 언제든지 수정하거나 삭제할 수 있습니다.'
      }
    ]
  },
  owner: {
    title: "푸드트럭 사장님 관련 질문",
    items: [
      {
        id: 'o1',
        question: '푸드트럭 등록은 어떻게 하나요?',
        answer: '"푸드트럭 등록하기" 메뉴에서 필요한 정보를 입력하시면 됩니다. 사업자등록증이 있으면 더 빠른 승인이 가능합니다.'
      },
      {
        id: 'o2',
        question: '위치 정보는 얼마나 자주 업데이트해야 하나요?',
        answer: '실시간으로 업데이트하는 것이 가장 좋습니다. 최소한 영업 시작 시와 위치 이동 시에는 반드시 업데이트해주세요.'
      },
      {
        id: 'o3',
        question: '고객 리뷰에 답변할 수 있나요?',
        answer: '네, 고객 리뷰에 답변할 수 있습니다. 리뷰 페이지에서 답변을 작성하면 다른 고객들에게도 보여집니다.'
      },
      {
        id: 'o4',
        question: '등록 승인은 얼마나 걸리나요?',
        answer: '일반적으로 1-2일 내에 검토가 완료됩니다. 사업자등록증 등 필요 서류가 완비된 경우 더 빠른 승인이 가능합니다.'
      }
    ]
  }
};


const FaqPage = () => {
  // 문의 유형 입력값 상태 관리
  const [askCategory, onChangeAskCategory, setAskCategory] = useInput("");
  // 문의 제목 입력값 상태 관리
  const [askTitle, onChangeAskTitle, setAskTitle] = useInput("");
  // 문의 내용 입력값 상태 관리
  const [askContent, onChangeAskContent, setAskContent] = useInput("");
  // 연락처 입력값 상태 관리
  const [askContact, onChangeAskContact, setAskContact] = useInput("");

  // 각 입력값별 에러 상태 관리
  const [askCategoryError, setAskCategoryError] = useState(false);
  const [askTitleError, setAskTitleError] = useState(false);
  const [askContentError, setAskContentError] = useState(false);
  const [askContactError, setAskContactError] = useState(false);

  // 문의 유형 리스트
  const askCategoryList = [
    { value: "general", data: "일반 문의" },
    { value: "technical", data: "기술 지원" },
    { value: "account", data: "계정 관련" },
    { value: "other", data: "기타 문의" },
  ];

  // 문의하기 폼 유효성 검사 함수
  const validateInquiryForm = async () => {
    let valid = true;
    // 문의 유형: 필수
    if (!askCategory) {
      setAskCategoryError(true);
      valid = false;
    } else {
      setAskCategoryError(false);
    }
    // 문의 제목: 2~20자
    if (askTitle.length < 2 || askTitle.length > 20) {
      setAskTitleError(true);
      valid = false;
    } else {
      setAskTitleError(false);
    }
    // 문의 내용: 필수
    if (!askContent) {
      setAskContentError(true);
      valid = false;
    } else {
      setAskContentError(false);
    }
    // 연락처: 전화번호-숫자만, 9~11자 / 이메일 - 간단한 정규식
    function isValidContact(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{9,11}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }
    if (!isValidContact(askContact)) {
      setAskContactError(true);
      valid = false;
    } else {
      setAskContactError(false);
    }

    // 모든 유효성 검사 통과 시 문의 접수
    if (valid) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/faq`, {
          askCategory,
          askTitle,
          askContent,
          askContact,
        });

        if (res.data.success) {
          alert("문의가 성공적으로 접수되었습니다!");
          setAskCategory("");
          setAskTitle("");
          setAskContent("");
          setAskContact("");
        } else {
          alert("문의 접수에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("문의 전송 오류: ", error);
        alert("서버 오류가 발생했습니다.");
      }
    }
  }

  return (
    <MainLayOut>
      <FaqPageMainStyle>
        <section>
          <h1>궁금한 것이 있으신가요?</h1>
          <p>자주 묻는 질문들을 확인해보세요. 원하는 답변을 찾지 못하셨다면 문의해주세요.</p>
        </section>
        {Object.entries(faqData).map(([key, section]) => (
          <QNASection key={key}>
            <div>
              <h2>{section.title}</h2>
              <SimpleAccordionCP items={section.items} />
            </div>
          </QNASection>
        ))}
        <ContactSection>
          {/* Contact Form Card */}
          <section>
            <div>
              <div>
                <FontAwesomeIcon icon={faComment} className="icon" />
                <h2>1:1 문의하기</h2>
              </div>
              <p>궁금한 점이 있으신가요? 고객센터로 문의해주세요.</p>
            </div>

            <div className="col">
              <SelectInputCP
                title="문의 유형"
                essential="true"
                listData={askCategoryList}
                onChangeHandler={onChangeAskCategory}
              />
              {askCategoryError && <span className="error askCategoryError">문의 유형을 선택하세요.</span>}
            </div>
            <div className="col">
              <TextAreaInputCP
                title="제목"
                essential="true"
                ex="문의 제목을 입력해주세요"
                onChangeHandler={onChangeAskTitle}
                value={askTitle}
                maxRows={2}
                minRows={1}
              />
              {askTitleError && <span className="error askTitleError">제목은 2자 이상 20자 이하로 입력해야 합니다.</span>}
            </div>
            <div className="col">
              <TextAreaInputCP
                title="내용"
                essential="true"
                ex="문의 내용을 자세히 작성해주세요"
                onChangeHandler={onChangeAskContent}
                value={askContent}
                maxRows={15}
                minRows={5}
              />
              {askContentError && <span className="error askContentError">문의 내용을 작성해주세요.</span>}
            </div>
            <div className="col">
              <TextAreaInputCP
                title="연락처"
                essential="true"
                ex="회신받을 이메일 또는 전화번호를 입력해주세요"
                onChangeHandler={onChangeAskContact}
                value={askContact}
                maxRows={2}
                minRows={1}
              />
              {askContactError && <span className="error askContactError">이메일 형식 또는 전화번호 형식이 올바르지 않습니다.</span>}
            </div>
            <ButtonCP onClick={validateInquiryForm}>문의하기</ButtonCP>
          </section>

          {/* Contact Info Card*/}
          <section>
            <div>
              <h2>고객지원 센터</h2>
              <p>다양한 방법으로 문의하실 수 있습니다.</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <div>
                <h3>전화 문의</h3>
                <p>1234-5678</p>
                <p>평일 9:00-18:00</p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <div>
                <h3>이메일 문의</h3>
                <p>support@gilmatroad.com</p>
                <p>24시간 접수 가능</p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faComments} className="icon" />
              <div>
                <h3>카카오톡 문의</h3>
                <p>@길맛로드</p>
                <p>평일 9:00-18:00</p>
              </div>
            </div>
            <section>
              <h2>자주 이용하는 기능</h2>
              <OutLineButtonCP color="black">
                <Link to="/map">지도에서 푸드트럭 찾기</Link>
              </OutLineButtonCP>
              <OutLineButtonCP color="black">
                <Link to="/register">푸드트럭 등록하기</Link>
              </OutLineButtonCP>
              <OutLineButtonCP color="black">
                <Link to="/my-page">마이페이지</Link>
              </OutLineButtonCP>
            </section>
          </section>
        </ContactSection>
      </FaqPageMainStyle>
    </MainLayOut>
  );
};

export default FaqPage;
