# Movie base

### Site created using React.js and Firebase (Cloud Firestore, Storage). Hosted on Firebase Hosting. 

You can test this site by following the link [Movie base](https://movie-dbase.web.app/)

## Available Scripts

To run this project on your local machine in the project directory, you can run:

### Setup process
1. Install [Node.js](https://nodejs.org/en/).
4. Create `.env` file with the next data:

````
REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_DATABASE_URL=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""
REACT_APP_MEASUREMENT_ID=""
````

All this data you can get after creating [Firebase Project](https://firebase.google.com/).

### `npm install`

To get all dependencies needed to run the project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `firebase login`

To login to Firebase. After that follow the instructions in your console.

If you need help look into the official [documentation](https://firebase.google.com/docs/functions/get-started).

### `firebase deploy`

To deploy this project to your Firebase Hosting.
