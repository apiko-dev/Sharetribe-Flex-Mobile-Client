import * as R from 'ramda';
import { createContext } from 'react';
import { withContext, getContext } from '../hocs';

const CategoriesContext = createContext({});

export const withCategoriesContext = withContext(
  CategoriesContext,
  R.pick(['chooseCategory', 'category', 'subCategory', 'search']),
);

export const getCategoriesContext = getContext(CategoriesContext);
