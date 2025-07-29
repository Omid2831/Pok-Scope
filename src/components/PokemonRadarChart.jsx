import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

/**
 * PokemonRadarChart component renders a radar chart visualization of Pokémon stats.
 *
 * @param {Array} stats - Array of stat objects with shape [{ name: string, value: number }]
 * Each object represents a Pokémon stat (e.g., HP, Attack, Defense).
 *
 * Example of a single stat: { name: "HP", value: 80 }
 */
const PokemonRadarChart = ({ stats }) => {

  // Early return if stats data is missing or empty to prevent rendering errors
  if (!stats || stats.length === 0) return null;

  return (
    <RadarChart
      cx={150}             // x-coordinate of the chart's center
      cy={140}             // y-coordinate of the chart's center
      outerRadius={100}    // radius of the outermost circle of the radar chart
      width={300}          // width of the SVG container
      height={300}         // height of the SVG container
      data={stats}         // data to be visualized, array of stat objects
    >
      {/* Background grid of concentric circles and spokes */}
      <PolarGrid />

      {/* Labels for each axis (stat name) positioned around the radar chart */}
      <PolarAngleAxis dataKey="name" />

      {/* Radial axis that shows the scale, domain limits the min and max values */}
      <PolarRadiusAxis angle={30} domain={[0, 150]} />

      {/* The radar shape representing the stat values */}
      <Radar
        name="Base Stats"
        dataKey="value"         // Key from stats objects used for radius length
        stroke="#8884d8"        // Outline color of the radar shape
        fill="#8884d8"          // Fill color inside the radar shape
        fillOpacity={0.6}       // Transparency of the radar fill
        isAnimationActive={false} // Disable animation for better performance or consistency
      />

      {/* Tooltip shows details when hovering over chart areas */}
      <Tooltip />
    </RadarChart>
  );
};

export default PokemonRadarChart;
