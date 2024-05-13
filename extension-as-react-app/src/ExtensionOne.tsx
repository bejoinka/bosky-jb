/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { useStarships } from "./useStarships";

interface ExtensionOneProps {
  onComplete: (object: string) => void;
}

const ExtensionOne: React.FC<ExtensionOneProps> = ({ onComplete }) => {
  const [name, setName] = useState<string>("");
  const submitForm = () => {
    console.log(name);
    onComplete(name);
  };
  // const { starships } = useStarships();
  // console.log("inside remote", starships);
  const updateName = (inputEvent: any) => {
    setName(inputEvent.target.value);
  };
  return (
    <div>
      <h1 className="text-4xl my-4">Remote: Extension One</h1>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Please enter your name"
        value={name}
        onChange={updateName}
      />
      <button type="submit" onClick={submitForm}>
        Submit
      </button>
    </div>
  );
};
export default ExtensionOne;
