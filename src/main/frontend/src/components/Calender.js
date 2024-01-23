import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
const Calendar  = ({setDate}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);
    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"  // 원하는 날짜 형식으로 설정
                inline
                locale={ko}
                popperPlacement="bottom"
                popperModifiers={{
                    offset: {
                        enabled: true,
                        offset: '5px, 10px'
                    },
                    preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: 'viewport'
                    }
                }}
            />
        </div>
    );
};
export default Calendar;