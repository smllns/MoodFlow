//bar chart used in sleep charts
'use client';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface CommonWeatherChartProps {
  data: any[];
  chartConfig: Record<string, { color: string; label: string }>;
  className?: string;
}

const CommonWeatherChart: React.FC<CommonWeatherChartProps> = ({
  data,
  chartConfig,
  className,
}) => {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='weather'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {Object.entries(chartConfig).map(([key, { label, color }]) => (
          <Bar key={key} dataKey={label} stackId='a' fill={color} radius={0} />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

export default CommonWeatherChart;
