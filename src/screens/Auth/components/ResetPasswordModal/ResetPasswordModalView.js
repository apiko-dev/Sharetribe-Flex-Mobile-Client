import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import T from 'prop-types';
import { Loader, IconFonts } from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';
import { RootModal, SuccessModal, ErrorModal } from './components';

const ResetPasswordModal = ({
  isVisible,
  onChange,
  onCloseModal,
  resetPassword,
  activeField,
  isLoading,
  isValidEmail,
  email,
  isError,
  isSuccess,
}) => {
  const modalContentComponent = () => {
    if (isError) {
      return <ErrorModal resetPassword={resetPassword} />;
    }

    if (isSuccess) {
      return <SuccessModal onCloseModal={onCloseModal} />;
    }

    return (
      <RootModal
        email={email}
        onChange={onChange}
        resetPassword={resetPassword}
        isValidEmail={isValidEmail}
        activeField={activeField}
      />
    );
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
                name="outline-close-24px"
                size={28}
                tintColor={colors.icon.tintColorGray}
                onPress={() => onCloseModal()}
              />
            </View>

            {modalContentComponent()}
          </React.Fragment>
        )}
      </View>
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  isVisible: T.bool,
  onChange: T.func,
  onCloseModal: T.func,
  email: T.string,
  resetPassword: T.func,
  activeField: T.string,
  isLoading: T.bool,
  isValidEmail: T.bool,
  isError: T.bool,
  isSuccess: T.bool,
};

export default ResetPasswordModal;
