import React from 'react';

export function IconicFlavorsBadges() {
  const badges = [
    { text: "Iconic\nFLAVORS", color: "bg-orange-400", textColor: "text-white" },
    { text: "Made in\nMINNESOTA", color: "bg-blue-400", textColor: "text-white" },
    { text: "Cannabis\nINFUSED", color: "bg-green-400", textColor: "text-white" },
    { text: "Made with\nCANE SUGAR", color: "bg-purple-400", textColor: "text-white" },
    { text: "Plant\nDERIVED", color: "bg-green-500", textColor: "text-white" },
    { text: "Iconic\nFLAVORS", color: "bg-orange-400", textColor: "text-white" }
  ];

  return (
    <div className="w-full py-8 bg-gradient-to-r from-cyan-100 to-cyan-200">
      <div className="flex justify-center items-center gap-8 px-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`${badge.color} ${badge.textColor} px-6 py-3 rounded-lg font-bold text-center text-sm leading-tight min-w-[120px]`}
          >
            {badge.text.split('\n').map((line, lineIndex) => (
              <div key={lineIndex}>{line}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}