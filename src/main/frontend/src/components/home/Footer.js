import {useNavigate} from "react-router-dom";

const Footer =() => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                width: '8.5625rem', height: '4.3125rem', fontSize: '1rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginTop: '4.5rem'
            }}>
                <a onClick={() => navigate("/FAQ")}>&nbsp;&nbsp;&nbsp;&nbsp;• 자주 묻는 질문</a>
                <a onClick={() => navigate("/EntryPartnerShip")}>&nbsp;&nbsp;&nbsp;&nbsp;• 입점 및 제휴 문의</a>
            </div>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                width: '12.4375rem', height: '5rem', fontSize: '0.4375rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '1rem',
                marginTop: '2.5rem'
            }}>
                <p style={{ margin: '0.1rem 0' }}>주식회사 포 올</p>
                <p style={{ margin: '0.1rem 0' }}>대표 : 김대원 | 개인정보관리 책임자 : 김대원</p>
                <p style={{ margin: '0.1rem 0' }}>이메일 : for.official.all@gmail.com | 대표번호 : 010-9019-7733</p>
                <p style={{ margin: '0.1rem 0' }}>주소 : 서울시 관악구 관악로 17길</p>
                <p style={{ margin: '0.1rem 0' }}>사업자등록번호 :</p>
            </div>
        </div>

    )
};

export default Footer;