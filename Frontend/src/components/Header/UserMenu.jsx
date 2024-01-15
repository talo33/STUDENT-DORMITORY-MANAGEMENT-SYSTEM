import { Fragment, useContext, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { Authenticate } from 'Validate/AuthContext';

export default function UserMenu() {
  const [isShowing, setIsShowing] = useState(false);
  const { currentUser, logout } = useContext(Authenticate);

  const userRole = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();

  const subMenu = [
    { name: 'Tài khoản', href: `/student/profile/${currentUser?._id}` },
    { name: 'Cài đặt', href: '#' }
  ];

  return (
    <Popover className="relative px-3" onMouseLeave={() => setIsShowing(false)}>
      <Popover.Button
        onClick={() => setIsShowing(!isShowing)}
        onMouseEnter={() => setIsShowing(true)}
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 border-none"
      >
        <UserCircleIcon width={35} className="cursor-pointer" />
      </Popover.Button>

      <Transition
        show={isShowing}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 flex w-screen max-w-min -translate-x-1/2 px-4 cursor-pointer">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {userRole.RoleId === process.env.REACT_APP_ADMIN_ROLE_ID && (
              <div className="block p-2 hover:text-indigo-600" onClick={() => navigate('/admin')}>
                Trang Admin
              </div>
            )}
            {subMenu.map((item) => (
              <Link key={item.name} to={item.href} className="block p-2 hover:text-indigo-600">
                {item.name}
              </Link>
            ))}

            <div className="block p-2 hover:text-indigo-600" onClick={logout}>
              Đăng xuất
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
