/**
 * dropDown 컴포넌트
 * @param dataArr data로 구성된 array
 * @param onChange state를 저장할 setState 함수
 * @param defaultData 처음 보여줄 문자열
 * @returns {JSX.Element}
 */
const DropDown = ({dataArr, onChange, placeholder, defaultData, key}) => {
    const onChangeData = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <select onChange={onChangeData} placeholder={placeholder}
                    style={{width: "100%", height: "3vh", fontSize: "1.5vh", fontFamily: "Noto Sans KR"}}
                    defaultValue={defaultData}
                    key={key}
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