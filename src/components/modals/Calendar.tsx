import { Platform, TouchableOpacity, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';

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
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={valueDate || new Date()}
      render={({ field: { value, onChange } }) => {
        const dateValue = getValidDate(value, valueDate || new Date());

        if (Platform.OS === 'ios') {
          // Inline picker for iOS
          return (
            <View>
              <DateTimePicker
                mode="date"
                minimumDate={new Date()}
                value={dateValue}
                onChange={(_, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
                display="spinner"
              />
            </View>
          );
        }

        // Button + modal for Android
        return (
          <View>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 12,
                backgroundColor: '#fff',
              }}>
              <Text>{dateValue ? dateValue.toLocaleDateString() : 'Selecciona una fecha'}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                mode="date"
                minimumDate={new Date()}
                value={dateValue}
                onChange={(event, selectedDate) => {
                  setShow(false);
                  if (event.type === 'set' && selectedDate) {
                    onChange(selectedDate);
                  }
                }}
                display="default"
              />
            )}
          </View>
        );
      }}
    />
  );
};

export default Calendar;
