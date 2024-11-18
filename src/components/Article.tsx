//article page
'use client';
import React from 'react';
import PageTitle from './ui/page-title';
import { Button } from './ui/button';
interface ArticleProps {
  title: string;
  description: string;
  content: string;
}
const Article: React.FC<ArticleProps> = ({ title, description, content }) => {
  //function for printing an article in a custom template
  const printContent = () => {
    const printWindow = window.open('', '', 'height=500, width=800');
    const contentToPrint = document.createElement('div');
    contentToPrint.innerHTML = `
    <div class="min-h-screen flex flex-col">
      <h1 class="text-3xl font-bold text-center">${title}</h1>
      <p class="pt-2 pb-5 text-sm text-center text-neutral-500">${description}</p>
      <div class="py-2">
        <div class="x0:mx-2 lg:mx-5" >${content}</div>
      </div>
      <p class="mt-auto text-center text-sm">© 2024 All rights reserved by smllns</p>
    </div>
  `;
    printWindow?.document.body.appendChild(contentToPrint);
    const style = printWindow?.document.createElement('style');
    if (style) {
      style.innerHTML = `
        body {
          font-family: Arial, sans-serif;
          background: none;
          color: #000;
        }
        .pt-2, .pb-5 {
          padding-top: 0.5rem;
          padding-bottom: 1.25rem;
        }
        .x0\\:mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
        .lg\\:mx-5 {
          margin-left: 1.25rem;
          margin-right: 1.25rem;
        }
      `;
      printWindow?.document.head.appendChild(style);
    }
    printWindow?.print();
    printWindow?.close();
  };
  return (
    <div>
      <PageTitle title={title} />
      <p className='pt-2 pb-5 text-sm text-neutral-500 dark:text-neutral-400 text-center'>
        {description}
      </p>
      <div className='-mx-3 rounded-lg py-2 bg-gray-100/50  dark:bg-neutral-800/50  '>
        <div
          className='x0:mx-2 lg:mx-5 '
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className='flex justify-center pt-2 '>
        <Button
          variant='secondary'
          onClick={printContent}
          className='flex items-center space-x-2'
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
          <span>Print this article</span>
        </Button>
      </div>
    </div>
  );
};

export default Article;
