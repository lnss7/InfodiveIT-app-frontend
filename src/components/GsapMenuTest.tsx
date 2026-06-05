"use client";

import { useState } from "react";
import { GsapMenu } from "./GsapMenu";

export function GsapMenuTest() {
  const [isOpen, setIsOpen] = useState(false);
  const [exitSpeed, setExitSpeed] = useState(1.5);
  const [easeReverse, setEaseReverse] = useState(true);

  return (
    <div className="gsap-menu-theme w-full flex flex-col items-center justify-center py-16 px-6 bg-[#0e100f] border-t border-[#42433d] mt-20 relative z-10">
      <div className="gsap-demo-header max-w-2xl w-full">
        <h2 className="text-xl md:text-2xl text-[#fffce1] font-normal mb-3">
          Menu GSAP Interrompível
        </h2>
        <p className="text-xs text-[#7c7c6f] mb-6 leading-relaxed">
          Esta é a demonstração interativa do menu GSAP traduzido para React. O menu utiliza uma timeline única com um <code>.addPause()</code>. Se você fechar o menu rapidamente durante a entrada, a animação é revertida de forma responsiva. Após abrir por completo, clicar novamente faz com que os painéis caiam com rotação aleatória.
        </p>
        
        <div className="gsap-demo-controls">
          <label>
            <input
              type="checkbox"
              checked={easeReverse}
              onChange={(e) => {
                if (isOpen) setIsOpen(false);
                setEaseReverse(e.target.checked);
              }}
            />
            <code>easeReverse</code>
          </label>
          <label className="ml-4">
            Velocidade de saída
            <input
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={exitSpeed}
              onChange={(e) => setExitSpeed(parseFloat(e.target.value))}
            />
            <span className="speed-val">{exitSpeed}×</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-8 py-3.5 bg-[#0ae448] text-[#0e100f] font-semibold rounded-full hover:bg-[#abff84] active:scale-95 transition-all duration-200 shadow-md shadow-[#0ae448]/20 text-sm"
        >
          {isOpen ? "Fechar Menu GSAP" : "Abrir Menu GSAP"}
        </button>
      </div>

      {/* Renders the GSAP Overlay drawer & menu items */}
      <GsapMenu
        isOpen={isOpen}
        onToggle={setIsOpen}
        exitSpeed={exitSpeed}
        easeReverse={easeReverse}
      />
    </div>
  );
}
