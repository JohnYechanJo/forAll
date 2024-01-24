/**
 * dropDown 컴포넌트
 * @param dataArr data로 구성된 array
 * @param onChange state를 저장할 setState 함수
 * @param defaultData 처음 보여줄 문자열
 * @returns {JSX.Element}
 */
const DropDown = ({dataArr, onChange, placeholder, defaultData, val, width}) => {
    const onChangeData = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <select onChange={onChangeData} placeholder={placeholder}
                    style={{width: width, height: "1.875rem", fontSize: "0.75rem",lineHeight:"1.375rem" ,fontFamily: "Noto Sans KR",border: "1px solid #D9D9D9"}}
                    defaultValue={defaultData}
                    key={val}
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