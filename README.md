# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Backend (PHP API) quick start

1. Import database
   - Open phpMyAdmin (`http://localhost/phpmyadmin`)
   - Create database `note2note`
   - Import your SQL dump (e.g., `e:\dbn2n\note2note.sql`)

2. Deploy the PHP API
   - Copy the folder `server/php-api` to your web root, e.g., `C:\xampp\htdocs\note2note-api`
   - Ensure Apache and MySQL are running (XAMPP/WAMP)
   - Test: open `http://localhost/note2note-api/subjects/list.php`

3. Configure the mobile app
   - Edit `app/lib/api.ts` and set `BASE_URL`:
     - Android emulator: `http://10.0.2.2/note2note-api`
     - iOS simulator: `http://localhost/note2note-api`
     - Physical device: `http://<your-computer-LAN-IP>/note2note-api`

4. Example usage
   - Create a note:
     ```ts
     import { createNote, listNotes } from '@/lib/api';
     await createNote({ user_id: 1, Title: 'Sample', Description: 'Hello', SubjectId: 2 });
     const { data } = await listNotes(1);
     ```

