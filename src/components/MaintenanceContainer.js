import React from "react";
import { connect } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ItemList from './items/ItemList';
import ItemCreate from './items/ItemCreate';
import ItemEdit from './items/ItemEdit';
import CategoryCreate from './categories/CategoryCreate';
import CategoryEdit from './categories/CategoryEdit';
import CategoryList from './categories/CategoryList';
import LogCreate from './logs/LogCreate';
import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';
import LogList from './logs/LogList';
import PastDue from "../components/PastDue/PastDue";
import Upcoming from '../components/Upcoming/Upcoming';

class MaintenanceContainer extends React.Component {
  render() {

    // false rather than missing: the Rails API doesn't send email_verified.
    // The API turns away unverified users, and the banner above says why.
    if (this.props.isAuthenticated && this.props.emailVerified === false) {
      return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography>You need to verify your email address before you can do that</Typography>
        </Box>
      );
    }

    if (this.props.isAuthenticated) {
      return (
        <div className="ui container">
          <>
            <Routes>
              {/* Past Due */}
              <Route path='/pastdue' element={<PastDue />} />
              {/* Upcoming */}
              <Route path='/upcoming' element={<Upcoming />} />
              {/* LogCreate */}
              <Route path='/item/:itemId/category/:id/log/new' element={<LogCreate />} />
              {/* LogShow */}
              <Route path='/log/:id' element={<LogShow />} />
              {/* LogEdit */}
              <Route path='/item/:itemId/log/:id/edit' element={<LogEdit />} />
              {/* CategoryCreate */}
              <Route path='/item/:itemId/category/new' element={<CategoryCreate />} />
              {/* LogList / Category Show */}
              <Route path='/item/:itemId/category/:id' element={<LogList />} />
              {/* CategoryEdit */}
              <Route path='/item/:itemId/category/:id/edit' element={<CategoryEdit />} />
              {/* ItemList */}
              <Route path="/items" element={<ItemList />} />
              {/* ItemCreate */}
              <Route path="/item/new" element={<ItemCreate />} />
              {/* ItemEdit */}
              <Route path="/item/:id/edit" element={<ItemEdit />} />
              {/* CategoryList / Item Show */}
              <Route path="/item/:id" element={<CategoryList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        </div>
      )
    }
    else {
      return (
        <Box sx={{
          textAlign: "center"
        }}>
          <Typography>You must be logged in to do that</Typography>
        </Box >
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    emailVerified: state.auth.currentUser.email_verified,
  }
}

export default connect(mapStateToProps)(MaintenanceContainer);
