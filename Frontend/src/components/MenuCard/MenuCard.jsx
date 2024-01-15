import React, { useState } from 'react';
import './menucard.css';
import { Card, Typography, Box } from '@mui/material';
import RoomMenuDetail from 'pages/Public/RoomMenuDetail';

const MenuCard = ({ MenuItem }) => {
  const [open, setOpen] = useState(false);
  const [roomSelected, setRoomSelected] = useState();
  return (
    <>
      <Card
        variant="outlined"
        className="Menu-Card cursor-pointer"
        onClick={() => {
          setRoomSelected(MenuItem);
          setOpen(true);
        }}
      >
        <Typography sx={{ padding: '30px 0' }} variant="h5" component="p">
          {MenuItem.name}
        </Typography>
        {MenuItem.items &&
          MenuItem.items.map((item, index) => {
            return (
              <div key={index} className="Menu-Item">
                <img src={item.image} srcSet={item.image} alt={item.item_name} />
                <Box sx={{ width: '70%' }}>
                  <Typography variant="h6" className="Menu-Title" component="p">
                    {item.item_name}
                  </Typography>
                  <Typography sx={{ color: 'gray', marginTop: 1, textAlign: 'left' }} component="p">
                    {item.description}
                  </Typography>
                </Box>
              </div>
            );
          })}
      </Card>
      <RoomMenuDetail open={open} setOpen={setOpen} product={roomSelected} />
    </>
  );
};

export default MenuCard;
