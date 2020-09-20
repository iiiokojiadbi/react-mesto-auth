import errorImg from './../images/error.svg';
import successImg from './../images/success.svg';

export function optionsInfoTooltip(type) {
  switch (type) {
    case 'error':
      return {
        imgStatus: errorImg,
        altStatus: 'errorImg',
        titleStatus: 'Что-то пошло не так! Попробуйте ещё раз.',
      };
    case 'login':
      return {
        imgStatus: successImg,
        altStatus: 'successImg',
        titleStatus: 'Вы успешно авторизовались!',
      };
    default:
      return {
        imgStatus: successImg,
        altStatus: 'successImg',
        titleStatus: 'Вы успешно зарегистрировались!',
      };
  }
}
