import React from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import s from './styles';
import i18n from '../../i18n';
import { Button } from '../../components';
import { CardItem, AddCardForm } from './components';

const cards = [
  '1234 1234 1234 1234',
  '4321 4321 4321 4321',
  '5678 5678 5678 5678',
  '8765 8765 8765 8765',
];

const CardListScreenView = ({
  onChange,
  selectedCard,
  onContinue,
}) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    extraScrollHeight={30}
  >
    <ScrollView style={s.container}>
      {cards.map((i) => (
        <CardItem
          number={i}
          key={i}
          onPress={onChange}
          selected={selectedCard}
        />
      ))}
      <AddCardForm />
      <Button
        containerStyle={s.buttonContainer}
        primary
        title={i18n.t('common.continue')}
        onPress={onContinue}
        disabled={!selectedCard}
      />
    </ScrollView>
  </KeyboardAwareScrollView>
);

CardListScreenView.navigationOptions = () => ({
  title: i18n.t('cardList.cardList'),
});

CardListScreenView.propTypes = {
  onChange: T.func,
  selectedCard: T.string,
  onContinue: T.func,
};

export default CardListScreenView;
