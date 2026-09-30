import React from "react";
import { useNavigate, useParams } from 'react-router';
import Typography from "@mui/material/Typography";

import ItemForm from "./ItemForm";
import { useGetItemsQuery, useUpdateItemMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer } from './styles'

const ItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      item: data && data.find(i => String(i.id) === String(id)),
    }),
  });
  const [updateItem] = useUpdateItemMutation();

  const onSubmit = async formValues => {
    try {
      await updateItem({ ...formValues, id }).unwrap();
      navigate('/items');
    } catch (err) {
      // stay on the form on failure
    }
  };

  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Edit the Name</Typography>
      {item && <ItemForm onSubmit={onSubmit} initialValues={item} />}
    </StyledGridContainer>
  );
};

export default ItemEdit;
