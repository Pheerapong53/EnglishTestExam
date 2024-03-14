import React, { useState } from 'react';
/*------------------------ Date Picker : BuddhistEra --------------*/
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
dayjs.locale('th');
dayjs.extend(buddhistEra);

const dateformats = {
    year: "BBBB",
    monthAndYear: "MMMM BBBB",
    keyboardDate: "DD/MM/BBBB",
};

const th_montharr = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const OwnDatePicker = (props) => {
    const { date, newdatefunc, onDateChange } = props;
    const [calendardate, setCalendarDate] = useState(dayjs(date));

    const thDateFormatFunc = (date) => {
        let thdate = dayjs(date).format('DD-MM-BBBB');
        let thmonth = th_montharr[Number(thdate.split('-')[1]) - 1];
        return (thdate.split('-')[0] + ' ' + thmonth + ' ' + thdate.split('-')[2]);
    }

    return (
        <LocalizationProvider
            adapterLocale={'th'}
            dateAdapter={AdapterDayjs}
            dateFormats={dateformats}
        >
            <DatePicker
                maxDate={dayjs(new Date(3000, 12, 31))}
                minDate={dayjs(new Date(1990, 1, 1))}
                views={['year', 'month', 'day']}
                onChange={(newdate) => {
                    setCalendarDate(dayjs(newdate));
                    newdatefunc(dayjs(newdate).format('YYYY-MM-DD'));
                    onDateChange(dayjs(newdate).format('YYYY-MM-DD'));
                }}
                slotProps={{
                    textField: {
                        inputProps: {
                            value: thDateFormatFunc(calendardate),
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
}

export default OwnDatePicker;
