import { compose, withStateHandlers, hoistStatics } from 'recompose';
import R from 'ramda';

import WeekDay from './WeekDay';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        // options: ['Se', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        options: [
          {
            dayOfWeek: 'Se',
          },
          {
            dayOfWeek: 'Mo',
          },
          {
            dayOfWeek: 'Tu',
          },
          {
            dayOfWeek: 'We',
          },
          {
            dayOfWeek: 'Th',
          },
          {
            dayOfWeek: 'Fr',
          },
          {
            dayOfWeek: 'Sa',
          },
        ],
        selectedWeekOptions: [],
      },
      {
        onSelectWeek: (props) => (option) => {
          // debugger;
          // if (R.contains(option, props.selectedWeekOptions)) {
          //   // debugger;
          //   selectedWeekOptions: props.selectedWeekOptions.filter((i) => i !== option);
          // } else {
          props.selectedWeekOptions.push(option);
          // }
          // selectedWeekOptions: option,
          // console.log(props.selectedWeekOptions);
        },
      },
    ),
  ),
)(WeekDay);
