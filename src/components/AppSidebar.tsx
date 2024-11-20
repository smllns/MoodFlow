//closable sidebar component, always rendered when user is logged in
//main navigation of the app
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
  useSidebar,
} from '@/components/ui/sidebar';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

// Data representing the main navigation structure of the sidebar
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
      title: 'Mood statistics',
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
      title: 'Articles',
      desc: 'articles',
      url: '#',
    },
    {
      title: 'Settings',
      desc: 'settings',
      url: '#',
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userName: string;
  setCurrentPage: (page: string) => void;
}
export function AppSidebar({
  userName,
  setCurrentPage,
  ...props
}: AppSidebarProps) {
  const router = useRouter();

  const { isMobile, setOpenMobile } = useSidebar();

  // Function to handle user logout and redirect to homepage
  const handleLogout = () => {
    router.push('/');
  };

  // Function to handle menu item click and navigate to the respective page
  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          {/* Sidebar menu header with app name and user greeting */}
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild className='cursor-default'>
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
          {/* Main navigation menu items */}
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
        {/* Theme toggle button */}
        <div className='w-full flex justify-end '>
          <ThemeToggle />
        </div>
        {/* Log out button */}
        <Button type='button' onClick={handleLogout}>
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
