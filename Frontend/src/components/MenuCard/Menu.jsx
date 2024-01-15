import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import MenuCard from './MenuCard';

import { Link } from 'react-router-dom';
import { sampleMenu } from 'utils/shared';

const Menu = () => {
  return (
    <Box id="Menu" className="!mt-16">
      <div>
        <Typography className="second-title" variant="h4">
          Các loại phòng
        </Typography>
      </div>
      <Box className="menu-container">
        {sampleMenu.length ? (
          sampleMenu.map((item, index) => <MenuCard key={index} MenuItem={item} />)
        ) : (
          <Typography component="p">Không có</Typography>
        )}
      </Box>
      <Typography sx={{ textAlign: 'center', padding: 5 }}>
        <Link to="/room">
          <Button color="error" variant="outlined">
            Xem thêm
          </Button>
        </Link>
      </Typography>
    </Box>
  );
};

export default Menu;
