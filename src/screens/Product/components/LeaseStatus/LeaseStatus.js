import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import s from './styles';
import {
  Touchable,
  Text,
  ShadowContainer,
  TextTouchable,
  Loader,
} from '../../../../components';
import i18n from '../../../../i18n';

const LeaseStatus = ({
  isLoading,
  date,
  isOnLease,
  navigationToCalendar,
}) => {
  return (
    <ShadowContainer>
      <View style={s.container}>
        {isLoading ? (
          <View style={s.loaderContainer}>
            <Loader large />
          </View>
        ) : (
          <React.Fragment>
            <View style={s.mainContainer}>
              <View style={s.leaseContainer}>
                {isOnLease ? (
                  <Text red bold>
                    {i18n.t('common.nowOnLease')}
                  </Text>
                ) : (
                  <Text green bold>
                    {i18n.t('common.canLease')}
                  </Text>
                )}
              </View>
              <View style={s.dateContainer}>
                <Text>
                  <Text gray>
                    {isOnLease
                      ? i18n.t('common.nextAvailableDate')
                      : i18n.t('common.availableUntil')}
                  </Text>
                  <Text>{` ${date}`}</Text>
                </Text>
              </View>
            </View>
            <Touchable style={s.button}>
              <TextTouchable
                containerStyle={s.viewCalendar}
                textStyle={s.viewCalendarText}
                onPress={navigationToCalendar}
              >
                {i18n.t('common.viewCalendar')}
              </TextTouchable>
            </Touchable>
          </React.Fragment>
        )}
      </View>
    </ShadowContainer>
  );
};

LeaseStatus.propTypes = {
  isLoading: T.bool,
  date: T.string,
  isOnLease: T.bool,
  navigationToCalendar: T.func,
};

export default LeaseStatus;
