import React from "react";
import { useNavigate } from 'react-router';
import Typography from "@mui/material/Typography";

import ItemForm from './ItemForm';
import { useCreateItemMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer } from "./styles";

const ItemCreate = () => {
  const navigate = useNavigate();
  const [createItem] = useCreateItemMutation();

  const onSubmit = async formValues => {
    try {
      await createItem(formValues).unwrap();
      navigate('/items');
    } catch (err) {
      // stay on the form on failure
    }
  };

  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Make a new item to track</Typography>
      <ItemForm onSubmit={onSubmit} />
    </StyledGridContainer>
  );
};

export default ItemCreate;
