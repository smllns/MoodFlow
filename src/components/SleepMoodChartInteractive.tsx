// 'use client';
// import React from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from './ui/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from './ui/chart';
// import { CartesianGrid, BarChart, Bar, XAxis } from 'recharts';
// import Image from 'next/image';
// import { AggregatedData } from '@/app/pages/SleepPage';
// const chartConfig = {
//   verybad: {
//     color: 'var(--chart-1)',
//     label: 'Very bad',
//   },
//   slightlybad: { color: 'var(--chart-2)', label: 'Slightly bad' },
//   okay: { color: 'var(--chart-3)', label: 'Okay' },
//   slightlygood: { color: 'var(--chart-4)', label: 'Slightly good' },
//   verygood: { color: 'var(--chart-5)', label: 'Very good' },
// } satisfies ChartConfig;

// interface SleepMoodChartProps {
//   chartData7: AggregatedData[];
//   chartData30: AggregatedData[];
//   info: string;
//   loading: boolean;
//   sleep: string | undefined;
// }
// const SleepMoodChartInteractive: React.FC<SleepMoodChartProps> = ({
//   chartData7,
//   chartData30,
//   info,
//   loading,
//   sleep,
// }) => {
//   const [activeChart, setActiveChart] = React.useState<'7' | '30'>('30');

//   // Function to handle button click
//   const handleChartChange = (days: '7' | '30') => {
//     setActiveChart(days);
//   };
//   if (loading) {
//     return (
//       <Card className='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]'>
//         <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
//       </Card>
//     );
//   }

//   return (
//     <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
//       <CardHeader>
//         <CardTitle className='pb-2 text-lg'>{info}</CardTitle>
//         <CardDescription className='pb-2 text-lg'>
//           Your average sleep time is {sleep}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className='min-h-[100px] w-full'>
//           <BarChart accessibilityLayer data={chartData30}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey='sleep'
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip content={<ChartTooltipContent />} />
//             {Object.keys(chartConfig).map((key) => {
//               const { label, color } =
//                 chartConfig[key as keyof typeof chartConfig];

//               return (
//                 <Bar
//                   key={key}
//                   dataKey={label}
//                   fill={color}
//                   radius={[5, 5, 0, 0]}
//                 />
//               );
//             })}
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className='flex flex-wrap gap-4 items-center justify-center text-sm'>
//         {Object.keys(chartConfig).map((key) => {
//           const { color, label } = chartConfig[key as keyof typeof chartConfig];
//           return (
//             <div key={key} className='flex items-center gap-2'>
//               <div
//                 style={{ backgroundColor: color }}
//                 className='w-3 h-3 rounded-full'
//               ></div>
//               <span className='text-xs'>{label}</span>
//             </div>
//           );
//         })}
//       </CardFooter>
//     </Card>
//   );
// };

// export default SleepMoodChartInteractive;

'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { CartesianGrid, BarChart, Bar, XAxis } from 'recharts';
import Image from 'next/image';
import { AggregatedData } from '@/app/pages/SleepPage';

const chartConfig = {
  verybad: {
    color: 'var(--chart-1)',
    label: 'Very bad',
  },
  slightlybad: { color: 'var(--chart-2)', label: 'Slightly bad' },
  okay: { color: 'var(--chart-3)', label: 'Okay' },
  slightlygood: { color: 'var(--chart-4)', label: 'Slightly good' },
  verygood: { color: 'var(--chart-5)', label: 'Very good' },
} satisfies ChartConfig;

interface SleepMoodChartProps {
  chartData7: AggregatedData[];
  chartData30: AggregatedData[];
  info: string;
  loading: boolean;
  sleep7: string | undefined;
  sleep30: string | undefined;
}

const SleepMoodChartInteractive: React.FC<SleepMoodChartProps> = ({
  chartData7,
  chartData30,
  info,
  loading,
  sleep7,
  sleep30,
}) => {
  const [activeChart, setActiveChart] = React.useState<'7' | '30'>('30');

  // Function to handle button click
  const handleChartChange = (days: '7' | '30') => {
    setActiveChart(days);
  };

  if (loading) {
    return (
      <Card className='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </Card>
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader className='flex flex-col items-stretch space-y-0  p-0 lg:flex-row lg:border-b border-neutral-200 dark:border-neutral-800'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 '>
          <CardTitle className='pb-2 text-lg'>
            Information for the last {activeChart === '30' ? 30 : 7} days
          </CardTitle>
          <CardDescription className='pb-2 text-sm'>
            Your average sleep time is {activeChart === '30' ? sleep30 : sleep7}
          </CardDescription>
        </div>
        <div className='flex '>
          {/* Buttons to switch between charts */}
          <button
            onClick={() => handleChartChange('30')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 lg:border-l  lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '30' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => handleChartChange('7')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-r-0 lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '7' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            7 Days
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={activeChart === '30' ? chartData30 : chartData7}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='sleep'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => {
              const { label, color } =
                chartConfig[key as keyof typeof chartConfig];
              return (
                <Bar
                  key={key}
                  dataKey={label}
                  fill={color}
                  radius={[5, 5, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex flex-wrap gap-4 items-center justify-center text-sm'>
        {Object.keys(chartConfig).map((key) => {
          const { color, label } = chartConfig[key as keyof typeof chartConfig];
          return (
            <div key={key} className='flex items-center gap-2'>
              <div
                style={{ backgroundColor: color }}
                className='w-3 h-3 rounded-full'
              ></div>
              <span className='text-xs'>{label}</span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default SleepMoodChartInteractive;
