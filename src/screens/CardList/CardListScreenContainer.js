import { hoistStatics, compose } from 'recompose';
import CardListScreenView from './CardListScreenView';

export default hoistStatics(compose())(CardListScreenView);
