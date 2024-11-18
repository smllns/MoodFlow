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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    .toLowerCase();
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
    header: ({ column }) => <Button variant='cool'>Weather</Button>,
    // header: 'Weather',
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
    header: ({ column }) => <Button variant='cool'>Factors</Button>,
    // header: 'Factors',
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

  function printContent() {
    // Получаем элемент таблицы
    const tableElement = document.querySelector('table');

    if (!tableElement) return;

    // Создаем новое окно для печати
    const printWindow = window.open('', '', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.write(
        '<html><head><title>MoodFlow Mood Data Table</title>'
      );

      // Копируем все стили со страницы
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach((style) => {
        printWindow.document.write(style.outerHTML);
      });

      printWindow.document.write('</head><body>');
      printWindow.document.write(tableElement.outerHTML); // Вставляем таблицу в новое окно

      printWindow.document.write(
        '<p class="mt-auto text-center text-sm">© 2024 All rights reserved by smllns</p>'
      );

      printWindow.document.write('</body></html>');
      printWindow.document.close();

      // Добавляем обработчик события, чтобы закрыть окно после отмены печати
      printWindow.addEventListener('afterprint', () => {
        printWindow.close();
      });

      // Запускаем печать
      printWindow.print();
    }
  }

  function exportInPdf() {
    // Получаем элемент таблицы
    const tableElement = document.querySelector('table');

    if (!tableElement) return;

    // Используем html2canvas для создания скриншота таблицы
    html2canvas(tableElement as HTMLElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Создаем новый документ PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Добавляем изображение в PDF, разбивая его на страницы
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight; // Сдвиг на следующую страницу
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Сохраняем PDF
      pdf.save('MoodFlow_Data.pdf');
    });
  }

  return (
    <div className=' x0:w-[90vw] md:w-[55vw] lg:w-full overflow-x-auto'>
      <div className='flex flex-row gap-2 items-center w-full justify-end px-2 '>
        <Button
          variant='secondary'
          onClick={printContent}
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
          onClick={exportInPdf}
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
