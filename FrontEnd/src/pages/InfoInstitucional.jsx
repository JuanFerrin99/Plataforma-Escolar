import React from "react";

import Hero from "../components/infoInstitucional/hero.jsx";
import Post from "../components/infoInstitucional/postContainer";
import '../styles/pages/InfoInstitucional.css';

export default function Info() {
  return (
    <div className="Info">
      <Hero />
      <Post />
    </div>
  );
}