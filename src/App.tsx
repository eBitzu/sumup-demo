import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { useCardType } from "./services/hooks/use-card-type/use-cart-type";
import { findCardRange } from "./services/utils/card-find.util";

function App() {
  const [ccInput, setCcInput] = useState<string>("");
  const [cardScheme, setCardScheme] = useState<string>("");
  const ccTypes = useCardType();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setCcInput(e.target.value);
  };

  useEffect(() => {
    const cartRange = findCardRange(ccTypes, ccInput);

    setCardScheme(
      cartRange
        ? cartRange.name
        : ccInput.length > 3
        ? "Invalid Card Scheme"
        : ""
    );
  }, [ccInput, ccTypes]);

  return ccTypes.length ? (
    <div className="App">
      <small className="disclaimer">
        This PoC determines the type of credit card based on first initial
        numbers
      </small>
      <div>
        <label htmlFor="ccn">Credit Card Number: </label>
        <input
          onChange={handleInputChange}
          type="tel"
          inputMode="numeric"
          pattern="[0-9\s]{12,19}"
          minLength={12}
          autoComplete="cc-number"
          maxLength={19}
          placeholder="xxxx xxxx xxxx xxxx"
        />
        <span style={{ marginLeft: "5px" }}>{cardScheme}</span>
      </div>
      <small className="disclaimer">*This app doesn't store or use this information in any way</small>
    </div>
  ) : (
    <>Loading data</>
  );
}

export default App;
