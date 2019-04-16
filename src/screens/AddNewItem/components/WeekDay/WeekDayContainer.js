import { compose, withStateHandlers, hoistStatics } from 'recompose';
import R from 'ramda';

import { dayOfWeek } from '../../../../constants';
import WeekDay from './WeekDay';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        options: dayOfWeek,
        // options: [
        //   {
        //     dayOfWeek: 'sun',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'mon',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'tue',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'wed',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'thu',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'fri',
        //     seats: 0,
        //   },
        //   {
        //     dayOfWeek: 'sat',
        //     seats: 0,
        //   },
        // ],
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
