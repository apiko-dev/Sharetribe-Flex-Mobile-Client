import * as Yup from 'yup';
import { regExp } from '../utils';
import i18n from '../i18n';

export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(1)
    .max(100)
    .required(i18n.t('errors.requireFirstName')),
  lastName: Yup.string()
    .trim()
    .min(1)
    .max(100)
    .required(i18n.t('errors.requireLastName')),
  currentPasswordForEmail: Yup.string().min(
    8,
    i18n.t('errors.passwordMustBe'),
  ),
  email: Yup.string()
    .trim()
    .matches(regExp.emailRegexp)
    .required(i18n.t('errors.incorrectEmail')),
  phone: Yup.string()
    .trim()
    .min(10, i18n.t('errors.incorrectPhone')),
  currentPassword: Yup.string()
    .trim()
    .min(8, i18n.t('errors.passwordMustBe')),
  newPassword: Yup.string().when('currentPassword', {
    is: (val) => !!val,
    then: Yup.string()
      .trim()
      .min(8, i18n.t('errors.passwordMustBe'))
      .max(256, i18n.t('errors.passwordMustBe'))
      .required(i18n.t('errors.passwordMustBe')),
    otherwise: Yup.string().min(0),
  }),
  replyPassword: Yup.string().when('currentPassword', {
    is: (val) => !!val,
    then: Yup.string()
      .min(8)
      .max(256)
      .oneOf(
        [Yup.ref('newPassword')],
        i18n.t('errors.confirmPassword'),
      )
      .required(i18n.t('errors.confirmPassword')),
    otherwise: Yup.string().min(0),
  }),
});
