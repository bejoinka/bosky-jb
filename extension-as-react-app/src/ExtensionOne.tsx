/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StarshipComponent } from "./StarshipComponent";

interface ExtensionOneProps {
  onComplete: (object: string) => void;
}

const minimumNumberOfStarshipSelectionsRequired = 5;

const starshipsApolloClient = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

const ExtensionOne: React.FC<ExtensionOneProps> = ({ onComplete }) => {
  const [name, setName] = useState<string>("");
  const [selectedStarships, setSelectedStarships] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>("");

  const submitForm = () => {
    if (selectedStarships.length < minimumNumberOfStarshipSelectionsRequired) {
      setValidationError('Please select at least 5 starships');
      return;      
    }
    console.log(name);
    console.log(selectedStarships);
    setValidationError('');
    onComplete(
      selectedStarships.join(','),
    );
  };
  const updateName = (inputEvent: any) => {
    setName(inputEvent.target.value);
  }
 

  return (
    <ApolloProvider client={starshipsApolloClient}>
    <div>
      <h1 className="text-4xl my-4">Remote: Extension One</h1>
      <label>Name: </label>
      <input
        type="text"
        placeholder="Please enter your name"
        value={name}
        onChange={updateName}
      />
      <br /><br />
      <StarshipComponent onSelectedStarships={setSelectedStarships} />
      <br /> <br />
      <span style={{ color: "red", fontSize: "0.8rem" }}>{validationError}</span>
      <br />
      <button type="submit" onClick={submitForm} style={{ border: "1px solid white", fontSize: "1rem", padding: "5px" }} >
        Submit
      </button>
    </div>
    </ApolloProvider>
  );
};
export default ExtensionOne;
