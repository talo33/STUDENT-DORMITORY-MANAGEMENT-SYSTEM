import dayjs from 'dayjs';
import { DatePicker as CustomDatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function DatePicker({ setSelectedDate, defaultValue, isStudent, className }) {
  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const [date, setDate] = useState(null);

  useEffect(() => {
    !!defaultValue && setDate(moment(defaultValue).format('DD/MM/YYYY'));
  }, [defaultValue]);

  return !!date ? (
    <CustomDatePicker
      disabled={isStudent}
      format={'DD/MM/YYYY'}
      className={`custom_select_field date-input disabled:bg-slate-100/70 disabled:cursor-not-allowed ${className}`}
      onChange={onChange}
      defaultValue={dayjs(date, 'DD/MM/YYYY')}
    />
  ) : (
    <CustomDatePicker
      disabled={isStudent}
      format={'DD/MM/YYYY'}
      className={`custom_select_field date-input disabled:bg-slate-100/70 disabled:cursor-not-allowed ${className}`}
      placeholder={'DD/MM/YYYY'}
      onChange={onChange}
    />
  );
}
