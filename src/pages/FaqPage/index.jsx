import MainLayOut from "../../layout/MainLayout";
import SimpleAccordionCP from "../../components/FaqPageCP/FaqPageAccordionCP";
import { ContactSection, FaqPageMainStyle, Section } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

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
        id: 'g1', //id 겹침 피하기 위해 g1, u1, o1 등으로 구분
        question: '길맛로드는 어떤 서비스인가요?',
        answer: '길맛로드는 길거리 포장마차와 푸드트럭의 실시간 위치 정보를 제공하는 플랫폼입니다. 고객은 주변 푸드트럭을 쉽게 찾을 수 있고, 사장님들은 위치 정보를 등록하여 고객과 소통할 수 있습니다.'
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

  return (
    <MainLayOut>
      <FaqPageMainStyle>
        <section>
          <h1>궁금한 것이 있으신가요?</h1>
          <p>자주 묻는 질문들을 확인해보세요. 원하는 답변을 찾지 못하셨다면 문의해주세요.</p>
        </section>
        {Object.entries(faqData).map(([key, section]) => (
          <Section key={key}>
            <div>
              <h2>{section.title}</h2>
              <SimpleAccordionCP items={section.items} />
            </div>
          </Section>
        ))}

        <section>
          <div className="flexBetweenCol">
            <div className="titleWrapper">
              <FontAwesomeIcon icon={faComment} className="icon" />
              <h2>1:1 문의하기</h2>
            </div>
            <p>답변을 찾지 못하셨나요? 직접 문의해주세요.</p>
          </div>
        </section>


      </FaqPageMainStyle>
    </MainLayOut>
  );
};

export default FaqPage;
