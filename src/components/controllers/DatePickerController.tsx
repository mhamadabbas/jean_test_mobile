import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import DatePicker from '../inputs/DatePicker';

type Props = {
    minDate?: Date;
    maxDate?: Date;
} & UseControllerProps<any>;

const DatePickerController: FC<Props> = ({ name, control, minDate, maxDate }) => {
    const { field } = useController({ name, control });
    return (
        <DatePicker
            maxDate={maxDate}
            minDate={minDate}
            value={field.value}
            onChange={field.onChange}
        />
    );
};

export default DatePickerController;
