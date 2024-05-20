/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStarships } from "./useStarships";

interface StarshipComponentProps {
    onSelectedStarships: (starships: string[]) => void;
}

export const StarshipComponent: React.FC<StarshipComponentProps>  = ({onSelectedStarships}) => {
    const { loading, error, starships } = useStarships();

    const updatedSelectedStarships = (inputEvent: any) => {
        const selectedValues = inputEvent.target.selectedOptions;
        const selectedValuesArr = Array.prototype.slice.call( selectedValues );
        console.log(selectedValues);
        
        const selectedStarships = selectedValuesArr.map((option: any) => option.value);
        onSelectedStarships(selectedStarships);
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;


    return (
        <>
        <label htmlFor="starships">Starships:</label>
        <select name="starships" id="starships" onChange={updatedSelectedStarships} multiple={true} style={{ "color": "black" }} >
          {starships.map((starship) => (
            <option key={starship.id} value={starship.name}>
              {starship.name}
            </option>
          ))}
        </select>        
        </>
  
    );
  };
    