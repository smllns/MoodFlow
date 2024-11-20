// Mood data table component that renders user mood data with sorting and filtering functionality //used in full stats component
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
import { printContent } from '@/lib/printContent';
import { exportInPdf } from '@/lib/exportInPdf';

// Defining the structure of a single mood data entry
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

// Predefined mood order to sort the moods in a specific sequence
const MOOD_ORDER = [
  'Very good',
  'Slightly good',
  'Okay',
  'Slightly bad',
  'Very bad',
];

// Custom filter function for filtering rows by formatted date
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
    .toLowerCase();
  return formattedDate.includes(filterValue.toLowerCase());
}

// Defining the table columns with sorting and filtering capabilities
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
    // Renders the formatted date in the cell
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
    // Renders mood with an associated icon
    cell: ({ row }) => {
      const mood = row.getValue('mood') as string;
      const iconSrc =
        moodIcons[mood as keyof typeof moodIcons] || moodIcons[''];
      return (
        <div className='flex items-center gap-2'>
          <img src={`/${iconSrc}`} alt={mood} className='w-5 h-5' />
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
    header: ({ column }) => <Button variant='cool'>Weather</Button>,
    // Renders weather condition
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

    sortingFn: (rowA, rowB) =>
      rowA.original.data.sleep - rowB.original.data.sleep,
    // Renders sleep hours with 'h' suffix
    cell: ({ row }) => <div>{row.getValue('sleep')}h</div>,
  },
  {
    accessorFn: (row) => row.data.factors,
    id: 'factors',
    header: ({ column }) => <Button variant='cool'>Factors</Button>,
    // Renders factors as a comma-separated list
    cell: ({ row }) => {
      const factors = row.getValue('factors') as string[];
      return <div>{factors.join(', ')}</div>;
    },
  },
];

export function DataTable({ data }: MoodDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  // React table instance with sorting and filtering configuration
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
      <div className='flex flex-row gap-2 items-center w-full justify-end px-2 '>
        <Button
          variant='secondary'
          onClick={() => {
            const tableElement = document.querySelector('table');
            if (tableElement) printContent(tableElement as HTMLElement);
          }}
          className='flex items-center space-x-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z'
            />
          </svg>
          <span>Print</span>
        </Button>
        <Button
          variant='secondary'
          onClick={() => {
            const tableElement = document.querySelector('table');
            if (tableElement) exportInPdf(tableElement as HTMLElement);
          }}
          className='flex items-center space-x-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
            />
          </svg>

          <span>Export in PDF</span>
        </Button>
      </div>
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
