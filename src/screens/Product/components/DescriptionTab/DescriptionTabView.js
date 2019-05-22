import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import Location from '../Location/Location';
import Seller from '../Seller/Seller';
import LeaseStatus from '../LeaseStatus/LeaseStatus';
import {
  ShadowContainer,
  ExpandableText,
  UserInfo,
} from '../../../../components';
import { fontSizes } from '../../../../styles';

const DescriptionTab = ({
  text,
  user,
  location,
  geolocation,
  isLoadingDates,
  navigationToCalendar,
  nearestAvailableDate,
  isOnLease,
}) => (
  <View style={s.container}>
    <ShadowContainer>
      <View style={s.description}>
        <View style={s.textContainer}>
          <ExpandableText
            numberOfLines={5}
            fontSize={fontSizes.medium}
            lineHeight={fontSizes.medium}
            ellipsizeMode="tail"
          >
            {text}
          </ExpandableText>
        </View>
      </View>
    </ShadowContainer>
    <ShadowContainer>
      <LeaseStatus
        isLoading={isLoadingDates}
        navigationToCalendar={navigationToCalendar}
        isOnLease={isOnLease}
        date={nearestAvailableDate}
      />
    </ShadowContainer>
    <ShadowContainer>
      <Location location={location} geolocation={geolocation} />
    </ShadowContainer>
    <ShadowContainer>
      <UserInfo
        user={user}
        rating={4}
        showViewProfile
        showAverageRating
      />
    </ShadowContainer>
  </View>
);

DescriptionTab.propTypes = {
  text: T.string,
  user: T.object,
  location: T.string,
  geolocation: T.object,
  isLoadingDates: T.bool,
  isOnLease: T.bool,
  navigationToCalendar: T.func,
  nearestAvailableDate: T.oneOfType([T.string, T.bool]),
};

export default DescriptionTab;
