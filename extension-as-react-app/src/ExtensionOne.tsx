/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useStarships } from "./useStarships";
// import { useStarships } from "./useStarships";

interface ExtensionOneProps {
  onComplete: (object: string) => void;
}

const ExtensionOne: React.FC<ExtensionOneProps> = ({ onComplete }) => {
  const [name, setName] = useState<string>("");
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]); 
  const submitForm = () => {
    console.log(name);
    console.log(selectedPathways);
    onComplete({
      name,
      selectedPathways,
    });
  };
  const updateName = (inputEvent: any) => {
    setName(inputEvent.target.value);
  };

  const updateSelectedPathways = (inputEvent: any) => {
    const selectedValues = inputEvent.target.selectedOptions;
    const selectedValuesArr = Array.prototype.slice.call( selectedValues );
    console.log(selectedValues);
    setSelectedPathways(selectedValuesArr.map((option: any) => option.value));
  }
 
  const { loading, error, pathways } = useStarships();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(pathways);

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
      <br />
      <label htmlFor="pathways">Pathways:</label>
      <select name="pathways" id="pathways" onChange={updateSelectedPathways} multiple={true}>
        {pathways.map((pathway) => (
          <option key={pathway.id} value={pathway.id}>
            {pathway.title}
          </option>
        ))}
      </select>
      <br />
      <button type="submit" onClick={submitForm}>
        Submit
      </button>
    </div>
  );
};
export default ExtensionOne;
