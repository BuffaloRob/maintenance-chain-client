import React from "react";
import { useNavigate } from 'react-router';
import Typography from "@mui/material/Typography";

import ItemForm from './ItemForm';
import { useCreateItemMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer } from "./styles";

const ItemCreate = () => {
  const navigate = useNavigate();
  const [createItem] = useCreateItemMutation();

  // Errors are shown by ItemForm
  const onSubmit = async formValues => {
    await createItem(formValues).unwrap();
    navigate('/items');
  };

  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Make a new item to track</Typography>
      <ItemForm onSubmit={onSubmit} />
    </StyledGridContainer>
  );
};

export default ItemCreate;
