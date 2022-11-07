import React, { useState } from "react";
import CardGrid from "../components/home/tarjetas/CardGrid";
import content from "../components/home/tarjetas/content";
import '../styles/pages/Cursoshomepage.css';


export default function Cursoshomepage() {
  return (
      <div
        id="grid"
        className="page__scrollable-content"
      >
        <CardGrid
          cards={[...content.cards1]}
          easeSpeed={0.15}
          easeFunction={content.ease}
          avatar={content.avatar}
        />
      </div>
  );
}

