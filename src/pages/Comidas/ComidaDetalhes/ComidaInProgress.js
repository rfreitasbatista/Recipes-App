import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import * as api from '../../../services/api';
import * as storage from '../../../services/localStorage';
import AppContext from '../../../contexts/AppContext';
import './style.css';
import DetailHeader from '../../../components/DetailHeader';
import * as builder from '../../../services/builders';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */

function disabling() {
  let disabled = true;
  let checked = 0;
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === inputs.length) {
    disabled = false;
  }
  return disabled;
}

function handleFinalizarReceita(history) {
  history.push('/receitas-feitas');
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};

const styleDash = {
  textDecoration: 'line-through',
};
const styleNone = {
  textDecoration: 'none',
};

function checkLS(str, id, history) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (LS && history.location.pathname.includes('comidas')) {
    if (LS.meals[id]) {
      const newCheck = LS.meals[id].some((each) => each === str);
      return newCheck;
    }
  }
  if (LS && history.location.pathname.includes('bebidas')) {
    const newCheck = LS.cocktails[id].some((each) => each === str);
    return newCheck;
  }
  return false;
}

function handleDashed(e, setUtilizados, utilizados, id, history) {
  const line = document.getElementsByClassName(`${e.target.id}`)[0];
  if (e.target.checked) {
    line.style.textDecoration = 'line-through';
    setUtilizados([...utilizados, e.target.id]);
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (history.location.pathname.includes('comidas')) {
      LS.meals[id] = [...utilizados, e.target.id];
    }
    if (history.location.pathname.includes('bebidas')) {
      LS.cocktails[id] = [...utilizados, e.target.id];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
  } else {
    line.style.textDecoration = 'none';
    const newArr = utilizados.filter((data) => data !== e.target.id);
    setUtilizados(newArr);
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (history.location.pathname.includes('comidas')) {
      LS.meals[id] = newArr;
    }
    if (history.location.pathname.includes('bebidas')) {
      LS.cocktails[id] = newArr;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
  }
}

function ingredientsList(details, setUtilizados, utilizados, id, history) {
  const quantities = builder.quantityBuilder(details);
  const ingredients = builder.ingredientBuilder(details);

  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {quantities.map((element, index) => (
          <li data-testid={`${index}-ingredient-step`}>
            <input
              type="checkbox"
              checked={checkLS(`${ingredients[index]} - ${element}`, id, history)}
              id={`${ingredients[index]} - ${element}`}
              onChange={(e) => handleDashed(e, setUtilizados, utilizados, id, history)}
            />
            <label htmlFor={`${ingredients[index]} - ${element}`}>
              <span
                style={
                  checkLS(`${ingredients[index]} - ${element}`, id, history) ? styleDash : styleNone
                }
                className={`${ingredients[index]} - ${element} ing`}
              >
                {ingredients[index]} - {element}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComidaInProgress() {
  const { loading, setLoading, details, setDetails, setLiked } = useContext(AppContext);
  const [Meal, setMeal] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const historico = storage.starterLS(history, id, LS);

  const [utilizados, setUtilizados] = useState(historico);

  useEffect(() => {
    builder.inProgressBuilder(history, setLoading, setDetails, id, setMeal);
  }, [id]);

  useEffect(() => {
    storage.inProgressLS(id, history);
    storage.favoriteLS(id, setLiked);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
      </div>
      <div className="details-body">
        {ingredientsList(details, setUtilizados, utilizados, id, history)}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <button
          style={style}
          data-testid="finish-recipe-btn"
          disabled={disabling()}
          onClick={() => handleFinalizarReceita(history)}
        >
          {' '}
          Finalizar receita
        </button>
      </div>
    </div>
  );
}

export default ComidaInProgress;
