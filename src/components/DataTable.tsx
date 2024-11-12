'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { moodIcons } from '@/lib/constants';

export interface MoodDataItem {
  date: string;
  data: {
    mood: string;
    weather: string;
    sleep: number;
    factors: Array<string>;
  };
}

export interface MoodDataTableProps {
  data: MoodDataItem[];
}

const MOOD_ORDER = [
  'Very good',
  'Slightly good',
  'Okay',
  'Slightly bad',
  'Very bad',
];

function filterByFormattedDate(
  row: any,
  columnId: string,
  filterValue: string
) {
  const date = new Date(row.getValue('date'));
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .toLowerCase(); // Преобразуем в строку в нужном формате и в нижний регистр

  // Сравниваем отформатированную строку с фильтром
  return formattedDate.includes(filterValue.toLowerCase());
}

export const columns: ColumnDef<MoodDataItem>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date') as string);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
      return <div>{formattedDate}</div>;
    },
    filterFn: filterByFormattedDate,
  },

  // {
  //   accessorFn: (row) => row.data.mood,
  //   id: 'mood',
  //   header: ({ column }) => (
  //     <Button
  //       variant='ghost'
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Mood
  //       <ArrowUpDown />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('mood')}</div>,
  //   sortingFn: (rowA, rowB) => {
  //     const moodA = rowA.original.data.mood;
  //     const moodB = rowB.original.data.mood;
  //     const moodAIndex = MOOD_ORDER.indexOf(moodA);
  //     const moodBIndex = MOOD_ORDER.indexOf(moodB);
  //     return moodAIndex - moodBIndex;
  //   },
  // },

  {
    accessorFn: (row) => row.data.mood,
    id: 'mood',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Mood
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const mood = row.getValue('mood') as string;
      const iconSrc =
        moodIcons[mood as keyof typeof moodIcons] || moodIcons[''];
      return (
        <div className='flex items-center gap-2'>
          <img
            src={`/${iconSrc}`}
            alt={mood}
            className='w-5 h-5' // Размер иконки
          />
          {mood}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const moodA = rowA.original.data.mood;
      const moodB = rowB.original.data.mood;
      const moodAIndex = MOOD_ORDER.indexOf(moodA);
      const moodBIndex = MOOD_ORDER.indexOf(moodB);
      return moodAIndex - moodBIndex;
    },
  },
  {
    accessorFn: (row) => row.data.weather,
    id: 'weather',
    header: 'Weather',
    cell: ({ row }) => <div>{row.getValue('weather')}</div>,
  },
  {
    accessorFn: (row) => row.data.sleep,
    id: 'sleep',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Sleep
        <ArrowUpDown />
      </Button>
    ),
    // Сортировка по числовым значениям
    sortingFn: (rowA, rowB) =>
      rowA.original.data.sleep - rowB.original.data.sleep,
    cell: ({ row }) => <div>{row.getValue('sleep')}h</div>, // Добавляем "h" к числовым значениям
  },
  {
    accessorFn: (row) => row.data.factors,
    id: 'factors',
    header: 'Factors',
    cell: ({ row }) => {
      const factors = row.getValue('factors') as string[];
      return <div>{factors.join(', ')}</div>;
    },
  },
];

export function DataTable({ data }: MoodDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      filterByFormattedDate: filterByFormattedDate,
    },
  });

  return (
    <div className=' x0:w-[90vw] md:w-[55vw] lg:w-full overflow-x-auto'>
      <div className='flex items-center py-4 px-2 gap-2'>
        <Input
          placeholder='Search by date...'
          value={(table.getColumn('date')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('date')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table.getAllColumns().map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border dark:border-neutral-800'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.id === 'mood' ? 'min-w-[170px]' : 'min-w-[135px]'
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
