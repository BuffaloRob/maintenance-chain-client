import React from "react";
import { useNavigate, useParams } from 'react-router';
import Typography from "@mui/material/Typography";

import ItemForm from "./ItemForm";
import RecordStatus from '../common/RecordStatus';
import { useUpdateItemMutation } from '../../store/api/maintenanceApi';
import { useItem } from '../../store/api/lookups';
import { StyledGridContainer } from './styles'

const ItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, isLoading, error } = useItem(id);
  const [updateItem] = useUpdateItemMutation();

  // Errors are shown by ItemForm
  const onSubmit = async formValues => {
    await updateItem({ ...formValues, id }).unwrap();
    navigate('/items');
  };

  if (!item) {
    return <RecordStatus isLoading={isLoading} error={error} what="item" backTo="/items" backLabel="Back to items" />;
  }
  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Edit the Name</Typography>
      <ItemForm onSubmit={onSubmit} initialValues={item} />
    </StyledGridContainer>
  );
};

export default ItemEdit;
