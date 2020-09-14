import React from 'react';
import { Link } from 'react-router-dom';
import notFoundPage from './../images/404.png';

function PageNotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">
        <span>404</span> - Страница не найдена
      </h2>
      <img className="not-found__image" src={notFoundPage} alt="" />
      <p className="not-found__text">Ой, опять Mesto</p>
      <Link
        className="btn btn_type_to-main not-found__to-main"
        to="/"
      >
        Не уйти...
      </Link>
    </div>
  );
}

export default PageNotFound;
