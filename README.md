# Presetup

1. Install globaly Typescript `npm install -g typescript`

2. Install Java (`https://java.com/ru/`)

3. Install globaly firebase tool `npm install -g firebase-tools`

4. For MacOs [Uncheck Airplay Receiver](https://medium.com/pythonistas/port-5000-already-in-use-macos-monterey-issue-d86b02edd36c)

# For start development

### Run commands for install packages from folders:

`/` > `npm ci`

`/app` > `npm ci`

`/functions` > `npm ci`

### Setup config

copy file `app/.example.env` to `app/.env`

### Run firebase emulator

`/functions` > `npm run serve`

### For rebuild firebase functions

`/functions` > `npm run build`

### Run frontend application

`/app` > `npm start`

### URLS:

Frontend application
http://localhost:41010/

Firebase emulator admin panel
http://localhost:4000/

# Firebase documentation and helpful links

#### React firebase hooks

💣 [Auth Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/v4.0.2/auth)

💣 [Cloud Firestore Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/v4.0.2#:~:text=Cloud%20Firestore%20Hooks)

💣 [Cloud Storage Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/v4.0.2#:~:text=Cloud%20Firestore%20Hooks-,Cloud%20Storage%20Hooks,-Realtime%20Database%20Hooks)

💣 [Realtime Database Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/v4.0.2#:~:text=Realtime%20Database%20Hooks)

#### Firebase

📹 [YouTube Video tutorial](https://www.youtube.com/watch?v=9zdvmgGsww0&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb)

🔥 [Firebase site (Documentation)](https://firebase.google.com/)
