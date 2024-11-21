//bar chart used in sleep charts
'use client';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface CommonSleepChartProps {
  data: any[];
  config: Record<string, { label: string; color: string }>;
  className?: string;
}

const CommonSleepChart: React.FC<CommonSleepChartProps> = ({
  data,
  config,
  className,
}) => {
  return (
    <ChartContainer config={config} className={className}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='sleep'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {Object.keys(config).map((key) => {
          const { label, color } = config[key as keyof typeof config];
          return (
            <Bar key={key} dataKey={label} fill={color} radius={[5, 5, 0, 0]} />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default CommonSleepChart;
