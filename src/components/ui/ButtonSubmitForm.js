import React, { useContext } from 'react';
import classnames from 'classnames';
import Loader from 'react-loader-spinner';

import { StatusRenderContext } from './../../contexts/StatusRenderContext';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function ButtonSubmitForm({ text, label, isActive }) {
  const isRenderer = useContext(StatusRenderContext);

  const btnClasses = classnames({
    btn: true,
    btn_type_submit: true,
    'form__btn-submit': true,
    'form__btn-submit_disabled': !isActive,
  });

  return (
    <button
      type="submit"
      className={btnClasses}
      aria-label={label}
      disabled={!isActive}
    >
      {isRenderer ? (
        <Loader
          type="ThreeDots"
          color="#ffffff"
          height={80}
          width={80}
          className="btn__spinner"
        />
      ) : (
        text
      )}
    </button>
  );
}

export default ButtonSubmitForm;
