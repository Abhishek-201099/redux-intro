import { combineReducers, createStore } from "redux";

const initialStateAccount={
  balance:0,
  loan:0,
  loanPurpose:''
};

const initialStateCustomer={
  fullName:'',
  nationalID:'',
  createdAt:''
}

function accountReducer(state=initialStateAccount,action){
  switch(action.type){
    case 'account/deposit'    : return {...state,balance:state.balance+action.payload};
    case 'account/withdraw'   : return {...state,balance:state.balance-action.payload};
    case 'account/requestLoan': if(state.loan > 0) return;
                                return {...state, loan:action.payload.amount, balance:state.balance+action.payload.amount, loanPurpose:action.payload.purpose};
    case 'account/payLoan'    : return {...state,balance:state.balance-state.loan,loan:0,loanPurpose:''};
    default : return state;
  };
};

function customerReducer(state=initialStateCustomer,action){
  switch(action.type){
    case 'customer/createCustomer' : return {...state,fullName:action.payload.fullName,nationalID:action.payload.nationalID,createdAt:action.payload.createdAt};
    case 'customer/updateName'     : return {...state,fullName:action.payload};
    default                        : return state;
  }
}

const rootReducer=combineReducers({
  account:accountReducer,
  customer:customerReducer
})

const store=createStore(rootReducer);

// store.dispatch({type:'account/deposit',payload:500});
// console.log(store.getState());

// store.dispatch({type:'account/withdraw',payload:200});
// console.log(store.getState());

// store.dispatch({type:'account/requestLoan',payload:{amount:1000,purpose:'To buy a car'}});
// console.log(store.getState());

// store.dispatch({type:'account/payLoan'});
// console.log(store.getState());

// ******************************************
// ******************************************
// ACTION CREATORS
function deposit(amount){
  return {type:'account/deposit',payload:amount};
}

function withdraw(amount){
  return {type:'account/withdraw',payload:amount}
}

function requestLoan(amount,purpose){
  return {type:'account/requestLoan',payload:{amount,purpose}};
}

function payLoan(){
  return {type:'account/payLoan'};
}

function createCustomer(fullName,nationalID){
  return {type:'customer/createCustomer',payload:{fullName,nationalID,createdAt:new Date().toISOString()}};
}

function updateName(fullName){
  return {type:'customer/updateName',payload:fullName};
}



// ******************************************
// ******************************************
// DISPATCHING ACTIONS FROM ACTION CREATORS TO STORE
store.dispatch(deposit(1500));
console.log('#deposit ',store.getState());

store.dispatch(withdraw(500));
console.log('#withdraw ',store.getState());

store.dispatch(requestLoan(1000,'buying sgt. peppers'))
console.log('#requestLoan ',store.getState());

store.dispatch(payLoan());
console.log('#payLoan ',store.getState());

store.dispatch(createCustomer('Abhishek Bhattacharjee','70802383'));
console.log('#createCustomer',store.getState());

store.dispatch(updateName('Abhishek OG'));
console.log('#updateName ',store.getState());

