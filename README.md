You can test this out at http://maintenancecha.in or run it locally by running 'npm install' and then 'npm start' and navigating to localhost:3005 in your browser. To be able to sign in and use all functionality you will also need to have the API running locally, you can find that at https://github.com/BuffaloRob/maintenance_chain_api

To deploy:
- Run 'npm run deploy'. This will create a new build, when done add 'build/' to the file path that surge provides and hit enter
- Paste in the address you want to deploy to

TODO:
- SSO
- Code splitting/ lazy loading
- Ux for Oboarding 
- Push notifications
- enable HTTPS/HTTP2
