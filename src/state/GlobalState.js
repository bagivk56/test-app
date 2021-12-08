import { setItem } from "../common/Storage";

const UPDATE_WALLETS = "GlobalState/UPDATE_WALLET";
const UPDATE_LANGUAGE = "GlobalState/UPDATE_LANGUAGE";

const initialState = {
  appVersion: "1.0.0",
  language: "en-EN",

  wallets: {},
};

export function updateWallets (wallets = {}) {
  (async () => {
    await setItem(JSON.stringify(wallets), "wallets");
  })();

  return {
    type: UPDATE_WALLETS,
    wallets,
  };
}
export function updateLanguage (language) {

  (async () => {
    await setItem(language, "language");
  })();

  return {
    type: UPDATE_LANGUAGE,
    language,
  };
}

// Reducer
export default function GlobalState(state = initialState, action = {}) {
  switch (action.type) {

    case UPDATE_WALLETS: {
      let wallets = action.wallets;

      return {
        ...state,
        wallets,
      };
    }
    case UPDATE_LANGUAGE: {
      let language = action.language;

      return {
        ...state,
        language,
      };
    }

    default:
      return state;
  }
}
