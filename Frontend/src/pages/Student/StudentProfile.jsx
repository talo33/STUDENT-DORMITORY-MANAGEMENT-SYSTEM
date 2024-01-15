import { useQuery } from '@tanstack/react-query';
import ProfileForm from 'components/Form/ProfileForm';
import StudentProfileHeader from 'components/SectionHeader/StudentProfileHeader';
import { GlobalContextProvider } from 'context/GlobalContext';
import React, { useContext } from 'react';

const StudentProfile = () => {
  const { profileData } = useContext(GlobalContextProvider);

  return (
    <div className="px-16 py-8">
      <StudentProfileHeader />
      <ProfileForm dataSource={profileData} isStudent={true} />
    </div>
  );
};

export default StudentProfile;
