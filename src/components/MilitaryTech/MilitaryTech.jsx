import React from "react";
import MilitaryHero from "./MilitaryHero/MilitaryHero";
import MilitaryCategories from "./MilitaryCategories/MilitaryCategories";
import Brands from "./Brands/Brands";
import MilitaryServices from "./MilitaryServices/MilitaryServices";
import Price from "./Price/Price";

export default function MilitaryTech() {
  return (
    <main className="military-page">
      <MilitaryHero />
      <MilitaryCategories />
      <Brands />
      <MilitaryServices />
      <Price />
    </main>
  );
}
