/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useStarships } from "./useStarships";

interface ExtensionOneProps {
  onComplete: (object: string) => void;
}

const minimumNumberOfStarshipSelectionsRequired = 5;

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
  };
  

  const updateSelectedPathways = (inputEvent: any) => {
    const selectedValues = inputEvent.target.selectedOptions;
    const selectedValuesArr = Array.prototype.slice.call( selectedValues );
    console.log(selectedValues);
    setSelectedStarships(selectedValuesArr.map((option: any) => option.value));
  }
 
  const { loading, error, starships } = useStarships();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
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
      <label htmlFor="pathways">Starships:</label>
      <select name="pathways" id="pathways" onChange={updateSelectedPathways} multiple={true} style={{ "color": "black" }}>
        {starships.map((starship) => (
          <option key={starship.id} value={starship.name}>
            {starship.name}
          </option>
        ))}
      </select>
      <br /> <br />
      <span style={{ color: "red", fontSize: "0.8rem" }}>{validationError}</span>
      <br />
      <button type="submit" onClick={submitForm} style={{ border: "1px solid white", fontSize: "1rem", padding: "5px" }} >
        Submit
      </button>
    </div>
  );
};
export default ExtensionOne;
