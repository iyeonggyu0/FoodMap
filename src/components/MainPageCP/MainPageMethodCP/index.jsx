import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShop, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MainPageMethodCPMainStyle, MainPageMethodCPStyle } from "./style";

const MainPageMethodCP = () => {
  return (
    <MainPageMethodCPMainStyle>
      <div>
        <h2>이용 방법</h2>
        <p>
          간단한 4단계로 푸드트럭을 찾고 즐기세요.
          <br />
          고객과 사장님 모두를 위한 쉬운 이용 가이드입니다.
        </p>
      </div>
      <div>
        {/* 손님 */}
        <MainPageMethodCPStyle color="--brown-light">
          {/* 상단 */}
          <div>
            <div className="icon flexCenter">
              {/* 아이콘 */}
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2>사용자</h2>
            <p>맛있는 푸드트럭을 쉽게 찾아 보세요</p>
          </div>
          {/* 하단 */}
          <div className="flexBetweenCol">
            <div>
              <div className="flexCenter">1</div>
              <div>
                <p>지도에서 내 주변 푸드트럭 확인</p>
                <p>실시간 위치 정보로 가까운 포드트럭을 한눈에 찾아보세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">2</div>
              <div>
                <p>리뷰와 메뉴 정보 확인</p>
                <p>다른 고객들의 솔직한 후기와 메뉴를 미리 확인하세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">3</div>
              <div>
                <p>찜하기로 즐겨찾는 푸드트럭 저장</p>
                <p>마음에 드는 푸드트럭을 저장하고 알림을 받아보세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">4</div>
              <div>
                <p>방문 후 리뷰 작성</p>
                <p>경험을 공유하고 다른 고객들에게 도움을 주세요.</p>
              </div>
            </div>
          </div>
          <div className="flexCenter">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p>지금 바로 찾기</p>
          </div>
        </MainPageMethodCPStyle>

        {/* 사장님 */}
        <MainPageMethodCPStyle color="--brown">
          {/* 상단 */}
          <div>
            <div className="icon flexCenter">
              {/* 아이콘 */}
              <FontAwesomeIcon icon={faShop} />
            </div>
            <h2>사장님</h2>
            <p>푸드트럭을 효과적으로 홍보하세요</p>
          </div>
          {/* 하단 */}
          <div className="flexBetweenCol">
            <div>
              <div className="flexCenter">1</div>
              <div>
                <p>푸드트럭 정보 등록</p>
                <p>메뉴, 운영시간, 연락처 등 기본 정보를 등록하세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">2</div>
              <div>
                <p>실시간 위치와 운영 시간 업데이트</p>
                <p>고객들이 쉽게 찾을 수 있도록 현재 위치를 업데이트하세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">3</div>
              <div>
                <p>고객 리뷰 관리</p>
                <p>고객 후기에 답글을 달고 소통을 통해 신뢰를 쌓으세요.</p>
              </div>
            </div>
            <div>
              <div className="flexCenter">4</div>
              <div>
                <p>매출 및 통계 확인</p>
                <p>방문자 수, 리뷰 통계 등을 확인하고 사업을 개선하세요.</p>
              </div>
            </div>
          </div>
          <div className="flexCenter">
            <FontAwesomeIcon icon={faPlus} />
            <p>푸드트럭 등록하기</p>
          </div>
        </MainPageMethodCPStyle>
      </div>
    </MainPageMethodCPMainStyle>
  );
};
export default MainPageMethodCP;
