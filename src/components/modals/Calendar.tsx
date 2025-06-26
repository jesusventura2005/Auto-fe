import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Control } from 'react-hook-form';

type CalendarProps = {
  control: Control<any>;
  name: string;
  rules?: Record<string, any>;
  valueDate?: Date;
};

function getValidDate(val: any, fallback: Date) {
  if (val instanceof Date && !isNaN(val.getTime())) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d;
  }
  return fallback;
}

const Calendar = ({ control, name, rules, valueDate }: CalendarProps) => {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={valueDate || new Date()}
      render={({ field: { value, onChange } }) => (
        <View>
          <DateTimePicker
            value={getValidDate(value, valueDate || new Date())}
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
