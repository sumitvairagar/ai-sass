import { PlantInfo } from "../types";

interface PlantInfoDisplayProps {
  plantInfo: PlantInfo | null;
}

export default function PlantInfoDisplay({ plantInfo }: PlantInfoDisplayProps) {
  if (!plantInfo) return null;

  return (
    <div className="mt-6 bg-gray-100 rounded-md overflow-hidden">
      <div className="bg-green-500 text-white py-2 px-4">
        <h2 className="text-xl font-semibold">{plantInfo.name}</h2>
        <p className="text-sm italic">{plantInfo.scientific_name}</p>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">Description:</h3>
        <p className="text-gray-700 mb-4">{plantInfo.description}</p>
        <h3 className="font-semibold mb-2">Care Instructions:</h3>
        <p className="text-gray-700 mb-4">{plantInfo.care_instructions}</p>
        <h3 className="font-semibold mb-2">Native Regions:</h3>
        <p className="text-gray-700 mb-4">{plantInfo.native_regions}</p>
        <h3 className="font-semibold mb-2">Interesting Facts:</h3>
        <ul className="list-disc pl-5">
          {plantInfo.interesting_facts.map((fact, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
