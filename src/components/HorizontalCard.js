import React, { useContext, useState } from 'react';
import shareI from '../images/shareIcon.svg';
import blackHI from '../images/blackHeartIcon.svg';
import { useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import * as storage from '../services/localStorage';

function handleClick(history, type, id) {
  if (type === 'comida') {
    history.push(`/comidas/${id}`);
  } else {
    history.push(`/bebidas/${id}`);
  }
}

function shareBt(id, type, setCopied) {
  let textCopy;
  let linkToCopy;
  if (type === 'comida') {
    linkToCopy = `http://localhost:3000/comidas/${id}`;
  } else {
    linkToCopy = `http://localhost:3000/bebidas/${id}`;
  }
  textCopy = document.createElement('textarea');
  textCopy.innerText = linkToCopy;
  document.body.appendChild(textCopy);
  textCopy.select();
  document.execCommand('copy');
  textCopy.remove();

  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 5000);
}

function disFav(id, type, setFav) {
  const histo = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let removing;
  if (type === 'comida') {
    removing = histo.filter((each) => each.id !== id);
  } else {
    removing = histo.filter((each) => each.id !== id);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(removing));
  setFav(true);
  setTimeout(() => {
    setFav(false);
  }, 5000);
}

function HCard({ card, index }) {
  const { copied, setCopied, setFav } = useContext(AppContext);
  const history = useHistory();

  return (
    <button className="card-rec">
      <div className="card">
        <button onClick={() => handleClick(history, card.type, card.id)}>
          <img
            src={card.image}
            alt={card.name}
            className="card-image-top"
            data-testid={`${index}-horizontal-image`}
          />
        </button>
        <div className="card-body card-description">
          <p
            className="card-title d-flex flex-column justify-content-end align-items-center"
            data-testid={`${index}-horizontal-top-text`}
          >
            {`${card.type === 'bebida' ? card.alcoholicOrNot : card.area} - ${card.category}`}
          </p>
          <button onClick={() => handleClick(history, card.type, card.id)}>
            <p data-testid={`${index}-horizontal-name`}>{card.name}</p>
          </button>
          <div>
            <button className="det-btn" onClick={() => disFav(card.id, card.type, setFav)}>
              <img
                src={blackHI}
                alt="favorite button"
                data-testid={`${index}-horizontal-favorite-btn`}
              />
            </button>
            <button className="det-btn" onClick={() => shareBt(card.id, card.type, setCopied)}>
              <img data-testid={`${index}-horizontal-share-btn`} alt="share button" src={shareI} />
              {copied && <span>Link copiado!</span>}
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

export default HCard;
