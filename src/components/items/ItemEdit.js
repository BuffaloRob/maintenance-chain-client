import React from "react";
import Typography from "@mui/material/Typography";

import history from '../../history';
import ItemForm from "./ItemForm";
import { useGetItemsQuery, useUpdateItemMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer } from './styles'

const ItemEdit = ({ match }) => {
  const id = match.params.id;
  const { item } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      item: data && data.find(i => String(i.id) === String(id)),
    }),
  });
  const [updateItem] = useUpdateItemMutation();

  const onSubmit = async formValues => {
    try {
      await updateItem({ ...formValues, id }).unwrap();
      history.push('/items');
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
