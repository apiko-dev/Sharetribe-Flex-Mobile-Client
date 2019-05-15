import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import T from 'prop-types';
import { IconFonts, Loader } from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';
import { SuccessModal, ErrorModal } from './components';

const RequestSentModal = ({
  isLoading,
  navigationToRequestToRent,
  onCloseModal,
  isVisible,
  gotoProduct,
  isError,
  goToChat,
}) => {
  const modalContentComponent = () => {
    if (isError) {
      return (
        <ErrorModal
          navigationToRequestToRent={navigationToRequestToRent}
        />
      );
    }

    return <SuccessModal goToChat={goToChat} />;
  };

  return (
    <Modal isVisible={isVisible} style={s.modal} avoidKeyboard>
      <View style={s.container}>
        {isLoading ? (
          <View style={s.loaderContainer}>
            <Loader large color={colors.loader.secondary} />
          </View>
        ) : (
          <React.Fragment>
            <View style={s.closeIconContainer}>
              <IconFonts
                name="close"
                size={28}
                tintColor={colors.icon.tintColorGray}
                onPress={() =>
                  (!isError && gotoProduct()) || onCloseModal()
                }
              />
            </View>

            {modalContentComponent()}
          </React.Fragment>
        )}
      </View>
    </Modal>
  );
};

RequestSentModal.propTypes = {
  isVisible: T.bool,
  navigationToRequestToRent: T.func,
  onCloseModal: T.func,
  gotoProduct: T.func,
  goToChat: T.func,
  isLoading: T.bool,
  isError: T.bool,
};

export default RequestSentModal;
