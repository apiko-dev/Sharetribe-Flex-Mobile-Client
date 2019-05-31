import React, { useState } from 'react';
import T from 'prop-types';
import { View } from 'react-native';

import { Observer } from 'mobx-react/custom';
import {
  Touchable,
  ShadowContainer,
  RentItem,
} from '../../../../components';
import s from './styles';
import NavigateInfoBlock from './components/NavigateInfoBlock';

function RentalsItem({ transaction }) {
  const [isShowDetails, setIsShowDetails] = useState(false);

  function handleToggleVisible() {
    setIsShowDetails(!isShowDetails);
  }

  return (
    <ShadowContainer>
      <Observer>
        {() => (
          <Touchable
            style={s.container}
            onPress={() => handleToggleVisible()}
          >
            <View style={s.itemContainer}>
              <RentItem
                transaction={transaction}
                isShowDetails={isShowDetails}
              />
              {isShowDetails && (
                <NavigateInfoBlock transaction={transaction} />
              )}
            </View>
          </Touchable>
        )}
      </Observer>
    </ShadowContainer>
  );
}

RentalsItem.propTypes = {
  transaction: T.object,
};

export default RentalsItem;
