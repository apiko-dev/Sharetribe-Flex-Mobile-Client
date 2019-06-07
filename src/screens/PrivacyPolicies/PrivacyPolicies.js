/* eslint-disable max-len */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '../../components';
import Accordion from './components/Accordion/Accordion';
import i18n from '../../i18n';
import s from './styles';

const data = [
  {
    id: 1,
    title: 'Introduction',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 2,
    title: 'IP address,cookies & mobile identifiers',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 3,
    title: 'Use of this information',
    text:
      'To provide our service we may use the information we collect and host for the following general purposes.\n\n  • to provide customer services, including to create and manage user accounts, to resolve technical difficulties and to enable features;\n • to customize offers and experiences, including advertising  on our properties or third parties’ properties;\n • to monitor general and individual user activity, such as keyword searches, postings and transactional activity, and to manage traffic on the Advertising Portals\n • to contact our users, including for service matters, customer care or permitted marketing communications via any available communications channels;\n • to undertake research initiatives and to perform analytics to improve our services;\n • to enforce our Terms of Use including to combat fraud and abuse.\n\nWe may retain information that we collect and observe on our network only for as long as is required to fulfil the above business objectives.',
  },
  {
    id: 4,
    title: 'Information sharing',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 5,
    title: 'User contols',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 6,
    title: 'Security',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 7,
    title: 'Changes to this policy',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 8,
    title: 'Contact information',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
];

function PrivacyPolicies() {
  return (
    <ScrollView style={s.container}>
      <View style={s.headerContainer}>
        <Text largeSize bold>
          {`${i18n.t('PrivacyPolicies.title')}`}
        </Text>
        <Text style={s.headerText}>
          We respect your privacy and have developed a detailed
          Privacy Policy that is incorporated into these Terms. Please
          take the time to read our Privacy Policy. By agreeing to
          these Terms, you are also accepting the terms of our Privacy
          Policy. You should be aware that when you click certain
          links on our Advertising Portals or within our app you could
          be directed to other companies’ properties outside of our
          hosted environment where the information collected is
          outside of our direct control. The privacy policy of the
          third parties’ properties or applications will govern the
          information obtained from you by these third parties in
          those contexts.
        </Text>
      </View>
      {data.map((item) => (
        <Accordion {...item} key={item.id} />
      ))}
    </ScrollView>
  );
}

PrivacyPolicies.navigationOptions = () => ({
  title: `${i18n.t('PrivacyPolicies.name')}`,
});

export default PrivacyPolicies;
