import React, { useState } from "react";
import "../assets/AnimatedBlock.css";

const textData = `
@Sales Team...

1. Order call par sabhi ko Diet and Dosage batana hai  
2. Alternative Number sabhi orders calls par lena jaruri hai jo ki apke order deliver home me madad Karega.

TOPPERS MUST USE BY ALL AGENTS - In all calls (Assurance Points)

Befikr (Chinta na karein) aap thik ho sakte hain lakho logo ki tarah

lakho ke tadad me patient Thik hue hai, jine aaram hai, aap bhi unhi logo ki ginti main aauge

Lakko ki tadad mein log thik hote hain, Hamare maqsad aapse 10 references lena hain.

Aap Pareshaan na Ho aap bilkul Thik Ho Sakte hain, Fikr mat karein yaqeen aur dua ke saath dawa lag ke lein

hamari kamyab dawa hain aap dua ke saath le zaroor fayda hoga bas pure 3 mahina lagatar lena hain

Hamarein patients ke liye bhi dua kijiye, aur dawa lein... aap bhi lakho patient mein honge jinhne fayda hua hain
`;

export default function AnimatedBlock() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="block-wrapper">
      <div className={`text-container ${expanded ? "expanded" : ""}`}>
        {textData}
      </div>

      <button
        className="view-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide" : "View"}
      </button>
    </div>
  );
}