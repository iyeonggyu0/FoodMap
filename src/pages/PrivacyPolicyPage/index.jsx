import MainLayOut from "../../layout/MainLayout";
import { PrivacyPolicyPageMainStyle } from "./style";

const PrivacyPolicyPage = () => {
  return (
    <MainLayOut>
      <PrivacyPolicyPageMainStyle>
        <div>
          <h1>개인정보 처리방침</h1>
          <p>
            <strong>최종 업데이트:</strong> 2025년 7월 30일
          </p>

          <section>
            <h2>제1조 (목적)</h2>
            <p>
              본 개인정보 처리방침은 귀하가 서비스를 이용할 때 당사의 정보 수집, 사용 및 공개에 대한 정책과 절차를 설명하며, 귀하의 개인정보 보호 권리와 관련
              법률이 귀하를 어떻게 보호하는지 안내합니다.
            </p>
          </section>

          <section>
            <h2>제2조 (동의 및 정책 출처)</h2>
            <p>
              당사는 귀하의 개인정보를 서비스 제공 및 개선을 위해 사용합니다. 서비스를 이용함으로써 귀하는 본 개인정보 처리방침에 따라 정보 수집 및 이용에
              동의하게 됩니다. 본 방침은{" "}
              <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/" target="_blank" rel="noopener noreferrer">
                무료 개인정보 보호정책 생성기
              </a>
              를 참고하여 작성되었습니다.
            </p>
          </section>

          <section>
            <h2>제3조 (해석 및 정의)</h2>
            <h3>해석</h3>
            <p>첫 글자가 대문자인 단어는 아래 조건에 따라 정의된 의미를 갖습니다. 단수/복수 여부와 관계없이 동일한 의미를 가집니다.</p>
            <h3>정의</h3>
            <div className="definition-list">
              <div className="definition-item">
                <span className="definition-term">계정</span>
                <span className="definition-desc">귀하가 당사 서비스 또는 일부에 접근할 수 있도록 생성된 고유 계정</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">계열사</span>
                <span className="definition-desc">당사자를 통제하거나, 당사자에 의해 통제받거나, 당사자와 공동으로 통제받는 법인(50% 이상 지분 등)</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">회사</span>
                <span className="definition-desc">(본 약관에서 "회사", "당사", "저희" 또는 "저희의"로 지칭) 길맛로드</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">쿠키</span>
                <span className="definition-desc">웹사이트가 귀하의 컴퓨터, 모바일 기기 등에 저장하는 작은 파일로, 방문 기록 등 다양한 용도로 사용</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">국가</span>
                <span className="definition-desc">대한민국</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">기기</span>
                <span className="definition-desc">서비스에 접근할 수 있는 컴퓨터, 휴대폰, 태블릿 등 모든 기기</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">개인정보</span>
                <span className="definition-desc">식별된 또는 식별 가능한 개인과 관련된 모든 정보</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">서비스</span>
                <span className="definition-desc">본 웹사이트</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">서비스 제공자</span>
                <span className="definition-desc">회사를 대신하여 데이터를 처리하는 모든 자연인 또는 법인(제3자 포함)</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">사용 데이터</span>
                <span className="definition-desc">서비스 사용 또는 인프라 자체에서 자동으로 수집된 데이터(예: 방문 기간)</span>
              </div>
              <div className="definition-item">
                <span className="definition-term">웹사이트</span>
                <span className="definition-desc">
                  길맛로드(
                  <a href="http://www.foodmap.site" target="_blank" rel="noopener noreferrer">
                    http://www.foodmap.site
                  </a>
                  )
                </span>
              </div>
              <div className="definition-item">
                <span className="definition-term">귀하</span>
                <span className="definition-desc">서비스를 이용하는 개인, 또는 그 개인을 대신하여 서비스를 이용하는 회사 등 법적 주체</span>
              </div>
            </div>
          </section>

          <section>
            <h2>제4조 (개인정보의 수집 및 이용)</h2>
            <h3>수집되는 데이터 유형</h3>
            <h4>개인정보</h4>
            <p>서비스 이용 시, 당사는 귀하에게 연락하거나 식별할 수 있는 정보를 요청할 수 있습니다. 예시:</p>
            <ul>
              <li>이메일 주소</li>
              <li>이름(성명)</li>
              <li>전화번호</li>
              <li>사용 데이터</li>
            </ul>
            <h4>사용 데이터</h4>
            <p>서비스 이용 시 자동으로 수집되는 정보(기기의 IP, 브라우저 종류/버전, 방문 페이지, 방문 일시, 체류 시간, 기기 고유 식별자 등)</p>
            <p>모바일 기기로 접속 시, 기기 종류, 고유 ID, IP, OS, 브라우저 종류, 진단 데이터 등도 자동 수집될 수 있습니다.</p>
          </section>

          <section>
            <h2>제5조 (쿠키 및 추적 기술)</h2>
            <p>당사는 쿠키 및 유사한 추적 기술(비콘, 태그, 스크립트 등)을 사용하여 서비스 활동을 추적하고 특정 정보를 저장합니다.</p>
            <ul>
              <li>
                <strong>쿠키/브라우저 쿠키:</strong> 귀하는 브라우저 설정을 통해 쿠키 거부 또는 알림을 받을 수 있습니다. 쿠키를 거부하면 일부 서비스 이용이
                제한될 수 있습니다.
              </li>
              <li>
                <strong>웹 비콘:</strong> 서비스 및 이메일에 포함된 작은 전자 파일로, 방문자 집계, 인기 섹션 기록, 시스템 무결성 확인 등에 사용됩니다.
              </li>
            </ul>
            <p>
              쿠키는 "영구 쿠키"와 "세션 쿠키"로 구분됩니다. 영구 쿠키는 오프라인 상태에서도 남아있고, 세션 쿠키는 브라우저 종료 시 삭제됩니다. 자세한 내용은{" "}
              <a
                href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking"
                target="_blank"
                rel="noopener noreferrer">
                쿠키 안내
              </a>
              를 참고하세요.
            </p>
            <ul>
              <li>
                <strong>필수 쿠키</strong> (세션 쿠키): 서비스 제공 및 일부 기능 사용에 필수적이며, 사용자 인증 및 부정 사용 방지 목적
              </li>
              <li>
                <strong>쿠키 정책/수락 쿠키</strong> (영구 쿠키): 쿠키 사용 동의 여부 식별
              </li>
              <li>
                <strong>기능성 쿠키</strong> (영구 쿠키): 로그인 정보, 언어 설정 등 사용자의 선택을 기억하여 맞춤형 경험 제공
              </li>
            </ul>
          </section>

          <section>
            <h2>제6조 (개인정보의 이용 목적)</h2>
            <ul>
              <li>서비스 제공 및 유지, 사용 모니터링</li>
              <li>계정 관리: 회원 등록 및 다양한 기능 제공</li>
              <li>계약 이행: 구매 계약 등 이행 및 관리</li>
              <li>연락: 이메일, 전화, SMS, 앱 알림 등으로 서비스 관련 안내 및 보안 업데이트 제공</li>
              <li>뉴스, 혜택, 유사 서비스 안내(수신 거부 가능)</li>
              <li>요청 관리: 문의 및 요청 처리</li>
              <li>사업 양도, 합병, 인수 등 기업 거래 평가 및 수행</li>
              <li>기타: 데이터 분석, 서비스 개선 등</li>
            </ul>
          </section>

          <section>
            <h2>제7조 (개인정보의 공유 및 제공)</h2>
            <ul>
              <li>서비스 제공자(제3자)와의 공유</li>
              <li>사업 양도, 합병, 인수 등 기업 거래 시 정보 이전</li>
              <li>계열사와의 공유</li>
              <li>비즈니스 파트너와의 공유(특정 상품, 서비스, 프로모션 제공 목적)</li>
              <li>다른 사용자와의 공유(게시물 등 공개 시)</li>
              <li>귀하의 동의 하에 기타 목적</li>
            </ul>
          </section>

          <section>
            <h2>제8조 (개인정보의 보관 및 파기)</h2>
            <p>
              회사는 본 방침에 명시된 목적을 위해 필요한 기간 동안만 개인정보를 보관합니다. 법적 의무, 분쟁 해결, 정책 이행 등 필요한 범위 내에서만 보관 및
              사용합니다.
            </p>
            <p>사용 데이터는 일반적으로 더 짧은 기간 보관되나, 보안 강화 또는 서비스 개선, 법적 의무가 있는 경우 더 오래 보관될 수 있습니다.</p>
          </section>

          <section>
            <h2>제9조 (개인정보의 국외 이전)</h2>
            <p>
              귀하의 정보(개인정보 포함)는 회사의 운영 사무소 및 처리에 참여하는 당사자가 위치한 모든 장소에서 처리될 수 있습니다. 국가 간 이전 시, 관련 법령에
              따라 안전하게 처리됩니다.
            </p>
          </section>

          <section>
            <h2>제10조 (개인정보의 삭제)</h2>
            <p>
              귀하는 당사가 보유한 개인정보의 삭제를 요청할 권리가 있습니다. 서비스 내에서 직접 삭제하거나, 계정 설정 또는 회사에 연락하여 삭제를 요청할 수
              있습니다. 단, 법적 의무가 있는 경우 일부 정보는 보관될 수 있습니다.
            </p>
          </section>

          <section>
            <h2>제11조 (개인정보의 공개)</h2>
            <h3>1. 사업 거래</h3>
            <p>회사가 합병, 인수, 자산 매각 등에 관여하는 경우 개인정보가 이전될 수 있으며, 사전 공지 후 새로운 방침이 적용됩니다.</p>
            <h3>2. 법 집행</h3>
            <p>법률 또는 공공기관(법원, 정부 등)의 유효한 요청이 있을 경우 개인정보를 공개할 수 있습니다.</p>
            <h3>3. 기타 법적 요구</h3>
            <ul>
              <li>법적 의무 준수</li>
              <li>회사의 권리/재산 보호</li>
              <li>서비스 관련 위법 행위 방지/조사</li>
              <li>이용자 및 대중의 안전 보호</li>
              <li>법적 책임 방지</li>
            </ul>
          </section>

          <section>
            <h2>제12조 (개인정보의 보안)</h2>
            <p>
              회사는 개인정보 보호를 위해 상업적으로 허용되는 수단을 사용하여 최선을 다하지만, 인터넷 전송 및 전자 저장 방식은 100% 안전하지 않으므로 절대적
              보장은 어렵습니다.
            </p>
          </section>

          <section>
            <h2>제13조 (아동의 개인정보 보호)</h2>
            <p>
              회사는 13세 미만 아동의 개인정보를 고의로 수집하지 않습니다. 부모 또는 보호자가 자녀의 정보 제공 사실을 알게 된 경우 연락해 주시기 바랍니다. 부모
              동의 없이 수집된 경우 즉시 삭제 조치합니다.
            </p>
            <p>법적 근거로 동의가 필요한 경우, 부모의 동의를 요구할 수 있습니다.</p>
          </section>

          <section>
            <h2>제14조 (외부 사이트 링크)</h2>
            <p>
              서비스에는 당사가 운영하지 않는 외부 웹사이트 링크가 포함될 수 있습니다. 외부 사이트 방문 시 해당 사이트의 개인정보 처리방침을 반드시 확인하시기
              바랍니다. 당사는 외부 사이트의 내용, 정책, 관행에 대해 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h2>제15조 (방침의 변경)</h2>
            <p>
              회사는 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 변경 시 본 페이지에 게시하며, 이메일 또는 서비스 내 공지로 안내합니다. 변경 사항은 게시
              즉시 효력이 발생합니다.
            </p>
          </section>

          <section>
            <h2>제16조 (문의처)</h2>
            <p>본 개인정보 처리방침에 관한 문의는 아래 이메일로 연락해 주시기 바랍니다.</p>
            <ul>
              <li>이메일: iyeonggyu0@syuin.ac.kr</li>
            </ul>
          </section>

          <section>
            <h2>제17조 (제 3자 정보 제공 동의)</h2>
            <p>
              본 서비스는 사용자에게 서비스 정보를 SMS로 제공합니다.
              <br />
              이때 필수적으로 SMS 전송 플랫폼 '문자온'에 사용자의 연락처 정보가 전달됨을 명시합니다.
            </p>
            <ul>
              <li>이메일: iyeonggyu0@syuin.ac.kr</li>
            </ul>
          </section>
        </div>
      </PrivacyPolicyPageMainStyle>
    </MainLayOut>
  );
};
export default PrivacyPolicyPage;
