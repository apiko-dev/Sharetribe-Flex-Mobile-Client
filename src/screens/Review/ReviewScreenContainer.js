import { compose, hoistStatics } from 'recompose';

import ReviewScreenView from './ReviewScreenView';

export default hoistStatics(compose())(ReviewScreenView);
