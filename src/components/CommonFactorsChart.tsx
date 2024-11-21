'use client';
import React from 'react';
import { LineChart, CartesianGrid, YAxis, XAxis, Line, Dot } from 'recharts';
import ChartTooltipContentFactors from './ChartTooltipContentFactors';
import { factorsChartConfig } from '@/lib/constants';
import { ChartContainer, ChartTooltip } from './ui/chart';

interface ChartData {
  month: string;
  date: number;
  mood: number;
  factors: string[];
}

interface CommonChartProps {
  data: ChartData[];
  factorsConfig: typeof factorsChartConfig;
  className?: string;
}

const CommonFactorsChart: React.FC<CommonChartProps> = ({
  data,
  factorsConfig,
  className,
}) => {
  return (
    <ChartContainer config={factorsConfig} className={className}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <YAxis
          domain={[1, 5]}
          tickCount={5}
          tickLine={false}
          axisLine={false}
          hide={true}
        />
        <XAxis
          dataKey='date'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          hide={true}
        />
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            const data = payload[0].payload as ChartData;
            const formattedDate = `${data.month} ${data.date}`;
            const moodText =
              factorsConfig[data.mood as 1 | 2 | 3 | 4 | 5 | 6]?.label ||
              'Unknown';
            const factorsList = data.factors.length
              ? data.factors.join(', ')
              : 'Not stated';
            const moodColor =
              factorsConfig[data.mood as 1 | 2 | 3 | 4 | 5 | 6]?.color ||
              'var(--dot-tr)';

            return (
              <ChartTooltipContentFactors
                formattedDate={formattedDate}
                moodText={moodText}
                factorsList={factorsList}
                moodColor={moodColor}
              />
            );
          }}
        />
        <Line
          dataKey='mood'
          type='bumpX'
          stroke='var(--line)'
          strokeWidth={2}
          dot={({ payload, ...props }) => {
            const typedPayload = payload as ChartData;
            const color =
              factorsConfig[typedPayload.mood as 1 | 2 | 3 | 4 | 5 | 6]
                ?.color || 'var(--dot-tr)';
            return (
              <Dot
                key={payload.browser}
                r={5}
                cx={props.cx}
                cy={props.cy}
                fill={color}
                stroke={color}
              />
            );
          }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default CommonFactorsChart;
