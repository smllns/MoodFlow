'use client';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const data = {
  navMain: [
    {
      title: 'Mood of the day',
      desc: 'currmood',
      url: '#',
    },
    {
      title: 'Calendar',
      desc: 'calendar',
      url: '#',
    },
    {
      title: 'Statistics',
      desc: 'fullstats',
      url: '#',
      items: [
        {
          title: 'Mood vs weather',
          desc: 'weather',
          url: '#',
        },
        {
          title: 'Mood vs sleeping',
          desc: 'sleep',
          url: '#',
        },
        {
          title: 'Mood vs factors',
          desc: 'factors',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      desc: 'settings',
      url: '#',
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userName: string; // Добавляем userName как обязательный строковый пропс
  setCurrentPage: (page: string) => void;
}
export function AppSidebar({
  userName,
  setCurrentPage,
  ...props
}: AppSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };
  const handleMenuClick = (page: string) => {
    setCurrentPage(page); // Устанавливаем новую текущую страницу
  };

  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-[#f5f5f5] dark:bg-[#181818]  text-[#11111a] dark:text-[#ffffff]'>
                  <p className='text-base'>💖</p>
                </div>
                <span className='font-semibold'>MoodFlow</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className='flex items-center justify-center rounded-lg  text-[#11111a] dark:text-[#ffffff]'>
              <p>Hello {userName} 💗</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault(); // Предотвращаем переход по ссылке
                      handleMenuClick(item.desc.toLowerCase()); // Изменяем страницу
                    }}
                    className='font-medium'
                  >
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.desc}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              handleMenuClick(subItem.desc.toLowerCase());
                            }}
                          >
                            {subItem.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='w-full flex justify-end '>
          <ThemeToggle />
        </div>
        <Button type='button' onClick={handleLogout}>
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
