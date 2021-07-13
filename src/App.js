import React from 'react';
import { connect } from 'react-redux';
import { fetchAction } from './actions';
import Ingredient from './Ingredient';

const App = ({ loading, ingredients, fetchIngredients }) => {
  let buttonContent = `Click me${ingredients.length ? ' again': ''}!`;
  if (loading) {
    buttonContent = <div className="loader"/>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content-wrapper">
          <h4>Get a random Food Recipe</h4>
          <div>
            <button onClick={fetchIngredients}>
              {buttonContent}
            </button>
          </div>
          <ul>
            {ingredients.map(ingredient => (
                <li key={ingredient.name}>
                  <Ingredient {...ingredient} />
                </li>
              )
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: () => dispatch(fetchAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);