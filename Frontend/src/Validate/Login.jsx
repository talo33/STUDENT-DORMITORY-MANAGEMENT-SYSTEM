import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './auth.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from 'API/auth';
import { Authenticate } from './AuthContext';
import { toast } from 'react-toastify';
import { getProfileInformation } from 'API/user';
import { GlobalContextProvider } from 'context/GlobalContext';

const Login = () => {
  const { setCurrentUser, setAuth } = useContext(Authenticate);
  const { setDataUser } = useContext(GlobalContextProvider);

  const loginUser = async (userId) => {
    try {
      const res = await getProfileInformation({ userId });
      setDataUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCurrentUser(data);
      loginUser(data?.details?._id);
      setAuth(true);
      localStorage.setItem('currentUser', JSON.stringify(data?.details));
      localStorage.setItem('isAuth', true);
      navigate('/');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center font-bold text-2xl text-sky-500">
              <Link to={'/'}>DORM</Link>
            </div>
            <div className="text-center">
              <h2 className="mt-8 text-3xl uppercase font-bold leading-9 tracking-tight text-indigo-600">Đăng nhập</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Ban không ở KTX?{' '}
                <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      CMND/CCCD
                    </label>
                    <div className="mt-2">
                      <input
                        {...register('CMND', { required: true })}
                        type="text"
                        className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Mật khẩu
                    </label>
                    <div className="mt-2">
                      <input
                        {...register('MatKhau', { required: true })}
                        type="password"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                        Ghi nhớ
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Quên mật khẩu
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://sv.ktxhcm.edu.vn/assets/img/greet2.jpg"
            alt="dormb"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
