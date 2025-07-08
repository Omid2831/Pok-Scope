import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";


const PokemonRadarChart = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
        <RadarChart
          cx={150}
          cy={150}
          outerRadius={100}
          width={300}
          height={300}
          data={stats}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Base Stats"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            isAnimationActive={false} // disable Recharts animation to avoid conflict
          />
          <Tooltip />
        </RadarChart>
    
  );
};

export default PokemonRadarChart;
