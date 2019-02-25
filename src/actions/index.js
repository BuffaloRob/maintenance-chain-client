


// export const signup = user => async dispatch => {
//   const newUser = user
//   const axiosConfig = {
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({user: user})
//   }
//   const response = await apiURL.post('/users', axiosConfig);
//   dispatch(authenticate({
//     name: newUser.name,
//     email: newUser.email,
//     password: newUser.password,
//     payload: response.data})
//   );
// }

// export const authenticate = credentials => async dispatch => {
//   const axiosConfig = {
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ auth: credentials })
//   }
//   dispatch(authRequest());
//   const response = await apiURL.post('/user_token', axiosConfig);
//   // to be continued

// }
