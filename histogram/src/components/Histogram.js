import React, { useMemo } from "react";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { Bar } from "@visx/shape";
import { GradientOrangeRed } from "@visx/gradient";
import { scaleBand } from "@visx/scale";


function Histogram(props) {
 

  const data = props.data;

  //dimensions
  const verticalMargin = 150;
  const horizontaMargin = 50;
  let width = 900;
  let height = 500;
  const xMax = width - horizontaMargin;
  const yMax = height - verticalMargin;


  const getMonth = (d) => d.month;
  const getNumber = (d) => Number(d.number);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [horizontaMargin, xMax],
        round: true,
        domain: data.map(getMonth),
        padding: 0.4,
      }),
    [xMax]
  );
 
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getNumber))],
        padding: 0.4,
      }),
    [yMax]
  );

  return width < 10 ? null : (

    <svg width={width} height={height} padding="230" className = "histogram">
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <GradientOrangeRed id="teal" />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const month = getMonth(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getNumber(d)) ?? 0);
          const barX = xScale(month);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${month}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              padding="800"
              fill= "rgb(242, 121, 115)"
            />
          );
        })}
      
      </Group>
    </svg>
  );
}
export default Histogram;
