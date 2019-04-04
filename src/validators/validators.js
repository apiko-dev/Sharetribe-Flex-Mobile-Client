import Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  /* firstName: Yup.string()
    .trim()
    .min(1),
  lastName: Yup.string()
    .trim()
    .min(1),
  bio: Yup.string()
    .trim()
    .min(0),
  email: Yup.string()
    .trim()
    .matches(regExp.emailRegexp),
  phone: Yup.string()
    .trim()
    .min(10),
  newPassword: Yup.string()
    .trim()
    .min(9),
  replyPassword: Yup.string()
    .trim()
    .min(0)
    .oneOf([Yup.ref('newPassword'), null]), */
});
