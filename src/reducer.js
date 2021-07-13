import { loop, Cmd } from "redux-loop";
import { actions, successAction } from "./actions";
import { fetchIngredientsEffect } from "./effects";

// Pre-loading: { loading: false, ingredients: [] }:
//  Initial pre-loading state, when the app is first rendered but no data is displayed.


export const initialState = {
  ingredients: [],
  loading: false,
};

// Loading: { loading: true, ingredients: [] }:
// The loading state, immediately after the user clicks the button.
// At this point the API is fetching, but has not returned any data.

const handleFetch = (state) => {
  const loadingState = {
    loading: true,
    ingredients: state.ingredients,
  };

  // The loaded state, when the API returns data (or an error, but for the sake of
  // simplicity in this tutorial we will assume that the API call is successful each time).
  // At that point, the App is no longer fetching data but now has taco ingredient data to display:-

  // Loaded: { loading: false, ingredients: ['ingredient1', …] }


  //side effect description (two arguments: function and promise(success/failure action creator.))
  const cmd = Cmd.run(fetchIngredientsEffect, {
    successActionCreator: successAction,
  });

  return loop(loadingState, cmd);   // (new store State, cmd object).
};

const handleSuccess = (state, action) => {
  return {
    loading: false,
    ingredients: action.ingredients,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.fetch:
      return handleFetch(state, action);
    case actions.success:
      return handleSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
