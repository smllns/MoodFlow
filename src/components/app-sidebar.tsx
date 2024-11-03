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
      url: '#',
    },
    {
      title: 'Calendar',
      url: '#',
    },
    {
      title: 'Statistics',
      // url: '#',
      items: [
        {
          title: 'Mood vs weather',
          url: '#',
        },
        {
          title: 'Mood vs sleeping',
          url: '#',
        },
        {
          title: 'Mood vs factors',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-[#f5f5f5] dark:bg-[#11111a]  text-[#11111a] dark:text-[#ffffff]'>
                  <p className='text-base'>💖</p>
                </div>

                <span className='font-semibold'>MoodFlow</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className='font-medium'>
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        {/* <SidebarMenuSubButton asChild isActive={item.isActive}> */}
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
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
