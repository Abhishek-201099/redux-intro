import { createSlice } from "@reduxjs/toolkit";

// INITIAL-STATE
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // The default action creators only take one paramter. So, use prepare to update the payload.
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        // No need to return the state in this case.
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// We've used custom action-creator instead of default from slice because we wanted to have some side-effects.
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

export default accountSlice.reducer;

// *******************************************************
// *******************************************************
// *******************************************************
// // REDUCER
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// // ACTION CREATORS
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   // This will return a function as middleware to the original dispatch and will be executed before dispatching the fetched values.
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     const response = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await response.json();
//     console.log("Data ", data);
//     dispatch({ type: "account/deposit", payload: data.rates.USD });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
