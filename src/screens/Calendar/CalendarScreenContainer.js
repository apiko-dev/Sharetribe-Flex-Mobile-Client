import { compose, hoistStatics, withProps } from 'recompose';
import {} from '../../services';
import XDate from 'xdate';
import CalendarScreenView from './CalendarScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('availableDates'),

    withProps(() => {
      const today = new XDate();

      return {
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear(),
        day: today.getDay(),
      };
    }),
  ),
)(CalendarScreenView);
