import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View } from 'react-native';

import {
  Text,
  RentItem,
  Button,
  Touchable,
} from '../../../../components';
import i18n from '../../../../i18n';
import s from './styles';

function Confirmation({
  setShowDetails,
  isShowDetails,
  transaction,
  onAccept,
  onDeny,
  goToProduct,
}) {
  const isUserCustomer = R.pathOr(
    false,
    [
      'relationships',
      'listing',
      'relationships',
      'author',
      'isViewer',
    ],
    transaction,
  );
  const detailsButton = () => (
    <Touchable
      style={s.detailsContainer}
      onPress={() => setShowDetails()}
    >
      {isShowDetails ? (
        <Text xxsmallSize orange>
          {i18n.t('chat.closeDetails')}
        </Text>
      ) : (
        <Text xxsmallSize orange>
          {i18n.t('chat.viewDetails')}
        </Text>
      )}
    </Touchable>
  );
  return (
    <View style={[s.container, isUserCustomer && s.minHeight]}>
      <RentItem
        isShowDetails={isShowDetails}
        transaction={transaction}
      />
      <View style={s.buttonContainer}>
        {!isUserCustomer && (
          <React.Fragment>
            <View style={s.accept}>
              <Button
                title={i18n.t('chat.accept')}
                primary
                buttonStyle={s.buttonStyle}
                containerStyle={s.containerStyle}
                titleStyle={s.titleStyle}
                onPress={onAccept}
              />
            </View>
            <View style={s.deny}>
              <Button
                title={i18n.t('chat.deny')}
                buttonStyle={s.buttonStyle}
                containerStyle={s.containerStyle}
                titleStyle={s.titleStyle}
                onPress={onDeny}
              />
            </View>
          </React.Fragment>
        )}
        {isUserCustomer && (
          <View style={s.viewGoods}>{detailsButton()}</View>
        )}
        <View style={s.viewGoods}>
          <Touchable orange xsmallSize onPress={goToProduct}>
            <Text xxsmallSize orange>
              View goods
            </Text>
          </Touchable>
        </View>
      </View>
      {!isUserCustomer && detailsButton()}
    </View>
  );
}

Confirmation.propTypes = {
  setShowDetails: T.func,
  isShowDetails: T.bool,
  transaction: T.object,
  onAccept: T.func,
  onDeny: T.func,
  goToProduct: T.func,
};

export default Confirmation;
