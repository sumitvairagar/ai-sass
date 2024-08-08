import { useState } from "react";
import ImageUpload from "./ImageUpload";
import PlantInfoDisplay from "./PlantInfoDisplay";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PlantInfo } from "../types";

interface HomeContentProps {
  user: any;
  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
}

export default function HomeContent({
  user,
  setShowLogin,
  setShowSignup,
}: HomeContentProps) {
  const [image, setImage] = useState<File | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [useCount, setUseCount] = useState(0);

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const identifyPlant = async () => {
    if (!image) return;
    if (useCount >= 1 && !user) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    setPlantInfo(null);
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_MODEL,
    });

    try {
      const imageParts = await fileToGenerativePart(image);
      const result = await model.generateContent([
        "Identify this plant and provide the following information: name, scientific name, brief description, care instructions, native regions, and 3 interesting facts. Format the response as JSON with the following keys: name, scientific_name, description, care_instructions, native_regions, interesting_facts (as an array).",
        imageParts,
      ]);
      const response = await result.response;
      const text = await response.text();

      // Extract JSON from the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        const jsonString = jsonMatch[1];
        const parsedInfo: PlantInfo = JSON.parse(jsonString);
        setPlantInfo(parsedInfo);
        setUseCount((prevCount) => prevCount + 1);
      } else {
        throw new Error("Unable to extract JSON from the response");
      }
    } catch (error) {
      console.error("Error identifying plant:", error);
      setPlantInfo(null);
    } finally {
      setLoading(false);
    }
  };

  async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result!.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  return (
    <div className="mt-16 bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Plant Identifier
      </h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      <button
        onClick={identifyPlant}
        disabled={!image || loading}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        {loading ? "Identifying..." : "Identify Plant"}
      </button>
      <PlantInfoDisplay plantInfo={plantInfo} />
    </div>
  );
}
