import { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from 'API/auth';
import { toast } from 'react-toastify';
import { GlobalContextProvider } from 'context/GlobalContext';

const schema = yup
  .object({
    newPassword: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        'Mật khẩu phải có ít nhất 8 ký tự, chữ thường, chữ hoa, số và ký tự đặc biệt'
      ),
    passwordConfirmation: yup.string().oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải khớp')
  })
  .required();

export default function ChangePassModal({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { profileData } = useContext(GlobalContextProvider);

  const handleChangePassword = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
    }
  });

  const onSubmit = (formData) => {
    handleChangePassword.mutate({
      id: profileData.Matk,
      data: formData
    });
    resetForm();
  };

  const resetForm = () => {
    setOpen(false);
    reset();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5">
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Đổi mật khẩu
                      </Dialog.Title>
                    </div>
                    <InputWithLabel
                      label={'Mật khẩu hiện tại'}
                      type="password"
                      register={register}
                      registerKey={'oldPassword'}
                    />
                    <InputWithLabel
                      label={'Mật khẩu mới'}
                      type="password"
                      register={register}
                      registerKey={'newPassword'}
                      errorMessage={errors?.newPassword?.message}
                    />
                    <InputWithLabel
                      label={'Nhập lại mật khẩu mới'}
                      type="password"
                      register={register}
                      registerKey={'passwordConfirmation'}
                      errorMessage={errors?.passwordConfirmation?.message}
                    />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
