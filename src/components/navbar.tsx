import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-4 lg:px-8 mx-4 lg:mx-0">
        <div className="relative flex items-center">
          <Link className="mr-3 flex-none md:w-auto" href="/">
            <span className="sr-only">Blood donors</span>
            <span className="text-l sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Blood donors</span>
          </Link>
          <div className="relative hidden lg:flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
              <ul className="flex space-x-8">
                <NavItem href="/donor">Donor</NavItem>
                <NavItem href="/seeker">Seeker</NavItem>
              </ul>
            </nav>
            <div className="flex items-center border-l border-slate-200 dark:border-slate-800 ml-6 pl-6">
              <Link href="/login">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                  ?
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NavItemProps = {
  href: string;
};

const NavItem: React.FC<React.PropsWithChildren<NavItemProps>> = ({ href, children }) => (
  <li>
    <Link className="hover:text-sky-500 dark:hover-text-sky-400" href={href}>
      {children}
    </Link>
  </li>
);

export default NavBar;
