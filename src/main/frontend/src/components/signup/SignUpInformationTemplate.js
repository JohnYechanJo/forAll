const SignUpInformationTemplate = ({setIsAllChecked, submit}) => {
    return (
        <div>
            <div>
                <button onClick={() => setIsAllChecked()}>{"<"}</button>
                <h1>03.안내 사항</h1>
            </div>
            <div>
                <p>포 올은 아래 권한들을 필요로 합니다</p>
                <p>서비스 사용 중 웹에서 요청 시 허용해 주세요</p>
            </div>
            <button onClick={() => submit()}>가입하기</button>
        </div>
    )
};

export default SignUpInformationTemplate;