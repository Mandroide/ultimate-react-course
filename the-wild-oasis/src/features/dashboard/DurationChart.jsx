import styled from "styled-components";
import Heading from "../../ui/Heading.jsx";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {

  // Maybe in needs to place this fn into helpers folder
  function checkIsInRange(from, to, number) {
    return from <= number && to >= number;
  }

  function incArrayValue(arr, nights) {
    return arr.map((obj) => {
      const [from, to = from] = obj.duration.replace(/[^0-9-]/g, "").split("-");
      const isInRange = checkIsInRange(from, to, nights);

      return isInRange ? { ...obj, value: obj.value + 1 } : obj;
    });
  }

  return stays
      .reduce((arr, cur) => incArrayValue(arr, cur.numNights), startData)
      .filter((obj) => obj.value > 0);
}

function DurationChart({confirmedStays}) {
  return (
      <ChartBox>
        <Heading as="h2">Stay duration summary</Heading>
        <ResponsiveContainer height="80%" width="100%">
          <PieChart>
            <Pie data={startDataLight} dataKey="value" nameKey="duration" cx="40%" cy="50%" innerRadius="70%" outerRadius="90%" paddingAngle={3}>
              {startDataLight.map((entry) => (<Cell key={entry.duration} fill={entry.color} stroke={entry.color} />))}
            </Pie>
            <Tooltip/>
            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize="1.5rem" iconType="circle" formatter={value => ` ${value}`}/>
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
  );
}

export default DurationChart;