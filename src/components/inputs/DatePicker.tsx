import React, { FC, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Adapt, Button, Sheet, Text } from 'tamagui';
import { formatDate } from 'utils/date';

type Props = {
    value?: Date;
    onChange: (date: Date) => void;

    minDate?: Date;
    maxDate?: Date;
}

const DatePicker: FC<Props> = ({ value, onChange, minDate, maxDate }) => {
    const [date, setDate] = useState(value);
    const [open, setOpen] = useState(false);

    const handleChange = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        if (currentDate) onChange(currentDate);
        if (Platform.OS !== 'ios') setOpen(false);
    };

    return (
        <>
            <Button width="100%" backgroundColor="$gray4" onPress={() => setOpen(true)}>
                <Text>{date ? formatDate(date) : 'Select date'}</Text>
            </Button>
            <Sheet
                modal
                open={open}
                snapPoints={[320]}
                dismissOnSnapToBottom
                onOpenChange={setOpen}
                snapPointsMode='constant'>
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center">
                    <Text fontSize={20} fontWeight="bold" paddingBottom="$4">Select date</Text>
                    <RNDateTimePicker
                        mode="date"
                        display="spinner"
                        onChange={handleChange}
                        value={date || new Date()}
                        minimumDate={minDate}
                        maximumDate={maxDate}
                    />
                </Sheet.Frame>
                <Sheet.Overlay />
            </Sheet>
        </>
    );
};

export const styles = StyleSheet.create({
});

export default DatePicker;