import { useSelector } from "react-redux";

import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
// import store from "./store";

function App() {
  const fullName=useSelector(state=>state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === ''    ?
      <CreateCustomer />  :
      <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>
      }
    </div>
  );
}

export default App;
