This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli), meant to be an easy phone interface for tracking your blood pressure day by day.

<img src="https://github.com/user-attachments/assets/2b5b664f-6c3a-4e2f-b993-bb6cbbc16042" alt="screenshot" width="30%"/><img src="https://github.com/user-attachments/assets/4843afdf-886f-4d58-a034-ae1e8b8f176b" alt="screenshot" width="30%"/><img src="https://github.com/user-attachments/assets/996f2394-3b9b-47ca-aa7a-871290bb50e5" alt="screenshot" width="30%"/>

# Setting Up Firestore

In order to make the app properly work, it is recommended to get an account on [Google's Firebase service](https://firebase.google.com/).

After creating a project there, you need to download the **google-services.json** file - which can be found in the Project Settings - and add it to the *app* folder within your app's directory. Then, copy-and-paste the following code into the "**Rules**" tab of the Firestore Database:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```