/**
 * dropDown 컴포넌트
 * @param dataArr data로 구성된 array
 * @param onChange state를 저장할 setState 함수
 * @param defaultData 처음 보여줄 문자열
 * @returns {JSX.Element}
 */
const DropDown = ({dataArr, onChange, placeholder, defaultData}) => {
    const onChangeData = (e) => {
        onChange(e.target.value);
    };
//defaultvalue 설정했음
    return (
        <div>
            <select onChange={onChangeData} placeholder={placeholder} defaultValue={defaultData}
                    style={{width: "100%", height: "3vh", fontSize: "1.5vh", fontFamily: "Noto Sans KR"}}
            >
                {dataArr.map(data => (
                    <option key={data} value={data}>
                        {data}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default DropDown;