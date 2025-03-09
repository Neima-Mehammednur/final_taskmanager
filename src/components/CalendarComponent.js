
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar, LocaleConfig } from 'react-native-calendars';
// import { colors } from '../constants/theme';

// LocaleConfig.locales['en'] = {
//   monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
//   dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//   dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
//   today: 'Today',
// };
// LocaleConfig.defaultLocale = 'en';

// const CalendarComponent = ({ markedDates, onDayPress, isDarkMode }) => {
//   return (
//     <View style={[styles.calendarContainer, isDarkMode && styles.darkCalendarContainer]}>
//       <Calendar
//         markedDates={markedDates}
//         markingType={'multi-dot'}
//         onDayPress={onDayPress}
//         theme={{
//           backgroundColor: isDarkMode ? colors.darkBackground : colors.background,
//           calendarBackground: isDarkMode ? colors.darkBackground : colors.background,
//           textSectionTitleColor: isDarkMode ? colors.darkText : colors.primary,
//           selectedDayBackgroundColor: colors.primary,
//           selectedDayTextColor: colors.background,
//           todayTextColor: colors.primary,
//           dayTextColor: isDarkMode ? colors.darkText : colors.text,
//           textDisabledColor: isDarkMode ? '#555' : '#ccc',
//           arrowColor: isDarkMode ? colors.darkText : colors.primary,
//           monthTextColor: isDarkMode ? colors.darkText : colors.primary,
//           textDayFontWeight: 'bold',
//           textMonthFontWeight: 'bold',
//           textDayHeaderFontWeight: 'bold',
//           textDayHeaderFontSize: 14,
//           textDayFontSize: 16,
//           textMonthFontSize: 18,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   calendarContainer: {
//     margin: 16,
//     backgroundColor: colors.background,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   darkCalendarContainer: {
//     backgroundColor: colors.darkBackground,
//   },
// });

// export default CalendarComponent;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { colors } from '../constants/theme';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const CalendarComponent = ({ markedDates, onDayPress, isDarkMode }) => {
  return (
    <View style={[styles.calendarContainer, isDarkMode && styles.darkCalendarContainer]}>
      <Calendar
        key={isDarkMode ? 'dark' : 'light'} // Force re-render when theme changes
        markedDates={markedDates}
        markingType={'multi-dot'}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: isDarkMode ? colors.darkBackground : colors.background,
          calendarBackground: isDarkMode ? colors.darkBackground : colors.background,
          textSectionTitleColor: isDarkMode ? colors.darkText : colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.background,
          todayTextColor: colors.primary,
          dayTextColor: isDarkMode ? colors.darkText : colors.text,
          textDisabledColor: isDarkMode ? '#555' : '#ccc',
          arrowColor: isDarkMode ? colors.darkText : colors.primary,
          monthTextColor: isDarkMode ? colors.darkText : colors.primary,
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayHeaderFontSize: 14,
          textDayFontSize: 16,
          textMonthFontSize: 18,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    margin: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCalendarContainer: {
    backgroundColor: colors.darkBackground,
  },
});

export default CalendarComponent;