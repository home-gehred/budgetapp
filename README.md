# budgetapp

Revision two, budget app is going through a change, I am now using create-react-app from npx. I am going to do my best to not eject the app and stick with what is chosen in that template.

https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61

## Starting the budget application
Use two iTerm windows and run the following commands...

In the first iTerm cd to the root of the project window start up the server...

```
nvm use v24.11.1
```

```
node server.js
```

In the second iTerm cd to the ./budgetapp/client and run

```
npm run start 
```

Open up a browser (chrome) and browse to http://localhost:5000