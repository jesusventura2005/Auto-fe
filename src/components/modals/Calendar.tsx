import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Control } from 'react-hook-form';

type CalendarProps = {
  control: Control<any>;
  name: string;
  rules?: Record<string, any>;
};

const Calendar = ({ control, name, rules }: CalendarProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <View>
          <DateTimePicker
            value={value || new Date()}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                onChange(selectedDate);
              }
            }}
            display="spinner"
          />
        </View>
      )}
    />
  );
};

export default Calendar;
