import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Authenticate } from 'Validate/AuthContext';
import UserMenu from './UserMenu';
import { Dropdown } from 'antd';
import ServiceModal from 'components/ServiceModal';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Loại phòng', href: '/room' },
  {
    name: 'Dịch vụ',
    href: '/',
    subMenu: [
      {
        label: 'Trả phòng',
        key: '1',
        href: ''
      },
      {
        label: 'Chuyển phòng',
        key: '2',
        href: ''
      },
      {
        label: 'Sửa chữa phòng',
        key: '3',
        href: ''
      },
      {
        label: 'Gia hạn',
        key: '4',
        href: ''
      },
      {
        label: 'Xem hóa đơn',
        key: '5',
        href: ''
      }
    ]
  },
  { name: 'Đăng ký', href: '/policy/register' }
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuth, currentUser, logout } = useContext(Authenticate);

  const [keyService, setKeyService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-7xl min-h-[90px] items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 font-bold text-xl text-sky-500">
            <span className="sr-only">Your Company</span>
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
            /> */}
            DORM
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item?.subMenu?.length ? (
              <Dropdown
                key={item.name}
                menu={{
                  items: item.subMenu,
                  onClick: (menu) => {
                    setKeyService(menu.key);
                    setIsOpen(true);
                  }
                }}
              >
                <div className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">Dịch vụ</div>
              </Dropdown>
            ) : (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          {isAuth ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 font-bold text-xl text-sky-500">
              <span className="sr-only">Your Company</span>
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
              DORM
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10" onClick={() => setMobileMenuOpen(false)}>
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {isAuth ? (
                <div className="py-6">
                  <div>
                    <Link to={`/student/profile/${currentUser?._id}`} className="mobile_menu_selection">
                      Tài khoản
                    </Link>
                  </div>
                  <div className="mobile_menu_selection cursor-pointer" onClick={logout}>
                    Đăng xuất
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Link to="/login" className="mobile_menu_selection">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <ServiceModal keyService={keyService} isOpen={isOpen} onCancel={() => setIsOpen(false)} />
    </header>
  );
}
