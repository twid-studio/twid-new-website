"use client";

import { DataContext } from "@/lib/providers/DataProvider/context";
import "./HomePage.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";

const HomePage = () => {
  const { data } = useContext(DataContext);

  return (
    <main className="home">
      
    </main>
  );
};

export default HomePage;
