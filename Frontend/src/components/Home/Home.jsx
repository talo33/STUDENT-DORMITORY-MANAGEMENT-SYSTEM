import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './homePage.css';
import { Link } from 'react-router-dom';
import { Authenticate } from 'Validate/AuthContext';

const Home = () => {
  const { isAuth } = useContext(Authenticate);
  return (
    <Box className="content">
      <Typography component="h2" variant="h2">
        Ký túc xá Sinh viên
      </Typography>
      <Typography component="p">Nơi nuôi dưỡng giấc mơ của sinh viên</Typography>
      <Link to="/login">
        {!isAuth && (
          <Button variant="contained" type="button">
            Đăng nhập ngay
          </Button>
        )}
      </Link>
    </Box>
  );
};

export default Home;
