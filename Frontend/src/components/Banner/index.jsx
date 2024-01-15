import { Box, Typography } from '@mui/material';
import React from 'react';
import './banner.css';

const Banner = () => {
  return (
    <Box className="BookingBanner relative">
      <div className=" bg-black/[0.65] w-full h-full flex justify-center items-center flex-col">
        <Typography variant="subtitle1" className="!text-4xl" component="p">
          KTX Sinh viên
        </Typography>
        {/* <Typography variant="h3">Ký túc xá ước mơ</Typography> */}
      </div>
    </Box>
  );
};

export default Banner;
