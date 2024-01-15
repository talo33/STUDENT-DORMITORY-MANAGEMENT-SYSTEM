import PolicyRevenue from 'components/Policy/PolicyRevenue';
import PolicyStudentInfo from 'components/Policy/PolicyStudentInfo';
import React from 'react';

const PolicyPage = () => {
  return (
    <div className="w-full flex justify-center items-start p-8 px-4 gap-8">
      <PolicyStudentInfo />
      <PolicyRevenue />
    </div>
  );
};

export default PolicyPage;
