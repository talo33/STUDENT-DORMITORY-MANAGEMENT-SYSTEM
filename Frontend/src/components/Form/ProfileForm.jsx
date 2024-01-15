import React, { useState } from 'react';

import { PhotoIcon } from '@heroicons/react/24/solid';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'components/DatePicker';
import moment from 'moment';
import { inputProfileArray, profileSchema, universities } from 'utils/shared';

const InputProfile = ({
  htmlFor,
  type = 'text',
  placeholder = '',
  register,
  label,
  errors,
  defaultValue,
  isStudent = false
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="profile_form_label">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          defaultValue={defaultValue ? defaultValue[htmlFor] : ''}
          disabled={isStudent}
          className={`custom_input_field ${isStudent && 'bg-slate-100/70 cursor-not-allowed'}`}
          {...register(htmlFor)}
        />
      </div>
      <p className="text-red-500 text-xs pt-1.5">{errors[htmlFor]?.message}</p>
    </>
  );
};

const ProfileForm = ({ dataSource, isStudent, next, isSignUp = false, setInformationData, dob, setDob }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema)
  });

  const [imagePreview, setImagePreview] = useState('');

  const onChangeImage = (event) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const imageURLs = URL.createObjectURL(file);

    setImagePreview(imageURLs);
  };

  const onSubmit = (data) => {
    const postData = { ...data, DateOfBirth: moment(dob, 'DD/MM/YYYY').toDate() };
    setInformationData(postData);

    next();
  };

  return (
    <>
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-8 xl:grid-cols-3">
          <div className="px-4 sm:px-0">
            <img src={imagePreview || process.env.REACT_APP_DEFAULT_AVATAR} alt="" />
          </div>

          <form
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {inputProfileArray.map((item) => (
                  <div
                    className={`sm:col-span-3 ${item?.isFull && 'sm:col-span-full !max-w-full w-full'}`}
                    key={item.label}
                  >
                    <InputProfile
                      htmlFor={item.htmlFor}
                      label={item.label}
                      type={item.type}
                      register={register}
                      errors={errors}
                      defaultValue={dataSource}
                      isStudent={isStudent}
                    />
                  </div>
                ))}

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="profile_form_label">
                    Loại
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('type')}
                      disabled={isStudent}
                      className={`custom_select_field ${isStudent && 'bg-slate-100/70 cursor-not-allowed'}`}
                    >
                      <option>Sinh viên</option>
                    </select>
                  </div>
                </div>

                <div className={`sm:col-span-3`}>
                  <InputProfile
                    htmlFor={'NienKhoa'}
                    label={'Niên khóa'}
                    register={register}
                    errors={errors}
                    placeholder="Vd: 2019-2023"
                    isStudent={!isSignUp && true}
                    defaultValue={dataSource}
                  />
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="country" className="profile_form_label">
                    Trường
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('Truong')}
                      disabled={isStudent}
                      className={`custom_select_field ${
                        isStudent && 'bg-slate-100/70 cursor-not-allowed'
                      } !max-w-full w-full`}
                    >
                      {universities.map((uni) => (
                        <option key={uni.id}>{uni.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="profile_form_label">
                    Giới tính
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('GioiTinh')}
                      disabled={isStudent}
                      className={`custom_select_field disabled:bg-slate-100/70 disabled:cursor-not-allowed`}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="profile_form_label">
                    Ngày sinh
                  </label>
                  <div className="mt-2">
                    <DatePicker
                      register={register}
                      defaultValue={dataSource?.DateOfBirth}
                      setSelectedDate={setDob}
                      isStudent={!isSignUp && true}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="profile_form_label">
                    Ảnh
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label className="relative flex-1 cursor-pointer rounded-md  bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          Tải ảnh lên
                          <input type="file" className="sr-only" onChange={onChangeImage} accept="images/*" />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isSignUp && (
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isStudent}
                  className={`custom_save_button ${isStudent && '!bg-indigo-500'}`}
                >
                  Tiếp tục
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
