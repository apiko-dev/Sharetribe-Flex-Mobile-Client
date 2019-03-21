import {
  compose,
  withPropsOnChange,
  branch,
  renderComponent,
} from 'recompose';
import { inject } from 'mobx-react';
import ListView from './ListView';
import { Loader } from '../../../../components';

export default compose(
  inject(({ listings }) => ({
    listings: listings.asArray,
    isLoading: listings.fetchListings.inProgress,
  })),

  branch((props) => props.isLoading, renderComponent(Loader)),

  withPropsOnChange('isLoading', console.log),
)(ListView);
