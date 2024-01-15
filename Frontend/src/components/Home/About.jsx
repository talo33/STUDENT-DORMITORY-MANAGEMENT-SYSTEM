import { Container, Typography } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <Container
      id="About"
      className="!bg-none xl:bg-about !flex flex-col items-center w-full justify-center xl:items-start"
    >
      <Typography className="second-title text-center" component="h4" variant="h4">
        Chào mừng đến KTX
      </Typography>
      <Typography component="p">
        Ký túc xá sinh viên là nơi lý tưởng để sinh viên bắt đầu cuộc sống đại học của mình. Với vị trí thuận tiện, cơ
        sở vật chất hiện đại, giá cả phải chăng và môi trường học tập và sinh hoạt lành mạnh, ký túc xá sẽ giúp sinh
        viên yên tâm học tập và rèn luyện, sẵn sàng cho tương lai.
      </Typography>
    </Container>
  );
};

export default About;
