import React from "react";
import FeatureCard from "./FeatureCard";
import { FaLeaf, FaSearch, FaDatabase } from "react-icons/fa";

const Features: React.FC = () => {
  const features = [
    {
      title: "Recognize Plants Using AI",
      description: "Identify various plants using advanced AI algorithms.",
      icon: <FaLeaf className="text-green-500 w-12 h-12 mx-auto" />,
    },
    {
      title: "Search Plant Database",
      description: "Access a vast database of plant information and care tips.",
      icon: <FaSearch className="text-blue-500 w-12 h-12 mx-auto" />,
    },
    {
      title: "Save Your Searches",
      description:
        "Keep a record of your plant searches and revisit them anytime.",
      icon: <FaDatabase className="text-yellow-500 w-12 h-12 mx-auto" />,
    },
  ];

  return (
    <div className="my-16">
      <h1 className="text-3xl font-bold text-center mb-8">Features</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
