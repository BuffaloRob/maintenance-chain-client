You can test this out at http://maintenancecha.in or run it locally by running 'npm install' and then 'npm start' and navigating to localhost:3005 in your browser. To be able to sign in and use all functionality you will also need to have the API running locally, you can find that at https://github.com/BuffaloRob/maintenance_chain_api

To show the "Sign in with Google" button, set VITE_GOOGLE_CLIENT_ID in '.env' to the OAuth client ID of the app's Google Cloud project, the same one the API's GOOGLE_CLIENT_ID is set to (the API's README explains how to create it). Without it the login and signup pages only have the email and password form.

To run the end-to-end tests:
- Run 'npx playwright install chromium' once, then 'npm run test:e2e'
- The tests start their own dev server on port 3105 and answer API calls with an in-memory mock (e2e/mockApi.js), so the API doesn't need to be running. Google's sign-in script is replaced by a fake (e2e/fixtures.js) whose button signs in at once

To deploy:
- Run 'npm run deploy'. This will create a new build, when done add 'build/' to the file path that surge provides and hit enter
- Paste in the address you want to deploy to

TODO:
- Sign in with Apple
- Push notifications
- enable HTTPS/HTTP2
