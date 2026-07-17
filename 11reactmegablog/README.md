# 11reactmegablog - MegaBlog

A real, production-shaped blog platform built on Appwrite: authentication,
protected routes, Redux Toolkit for auth state, a rich text editor, image
uploads, custom database queries, and a real deployment path.

## Overview

MegaBlog is the first large project in this React Fundamentals series. It keeps
third-party backend code behind service classes, keeps environment variables in
one config module, and uses Redux Toolkit only for the auth state that genuinely
needs to be global.

## Features

- Sign up, sign in, and sign out with Appwrite Auth.
- Protected pages for creating, editing, and listing posts.
- Login/signup pages redirect away after authentication.
- Create, edit, delete, and view blog posts.
- Rich HTML content with TinyMCE.
- Stored HTML rendered with `html-react-parser`.
- Featured image upload and preview through Appwrite Storage.
- Live slug generation from the post title.
- Redux Toolkit auth slice for app-wide user state.
- Tailwind CSS with the current Vite plugin setup.

## Technologies Used

- React 19, Vite, React Router, Redux Toolkit, react-redux
- Appwrite backend-as-a-service
- React Hook Form
- TinyMCE and html-react-parser
- Tailwind CSS

## Appwrite Setup

Create an Appwrite project first. Copy the endpoint URL and Project ID into the
real `.env` file.

Appwrite's current docs use newer database terminology:

| Older tutorial term | Current Appwrite term |
|---|---|
| Collections | Tables |
| Attributes | Columns |
| Documents | Rows |

This app uses the current `TablesDB` SDK methods such as `createRow`,
`listRows`, `getRow`, `updateRow`, and `deleteRow`. The env variable still uses
`VITE_APPWRITE_COLLECTION_ID` because many Appwrite tutorials and existing
projects still call this value a collection ID.

Console checklist:

1. Create an Appwrite project.
2. Add a Web Platform for `localhost`.
3. Create a database.
4. Create a table for posts with these columns:
   - `title` string
   - `content` string, large enough for TinyMCE HTML
   - `featuredImage` string
   - `status` string, for example `active` or `inactive`
   - `userId` string
5. Configure table permissions. A practical teaching setup is authenticated users can create rows, anyone can read active posts if the blog is public, and only owners should update/delete their own rows. Appwrite permissions should be tightened before production.
6. Create a Storage bucket for post images.
7. In Storage bucket settings, raise the maximum file size limit before testing uploads. A value such as 50 MB is reasonable for this exercise.
8. Create a TinyMCE API key.
9. Add the deployed domain as another Web Platform after deployment.

## Environment Variables

Create a real `.env` file locally. It is git-ignored.

```text
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=
```

Vite only exposes variables that start with `VITE_`. Client code reads these
values only in `src/conf/conf.js`; the rest of the app imports the `conf` object.

## The ref / forwardRef Decision

This project uses React `19.2.7`.

React 19 no longer needs `forwardRef` for normal function components. The
current React docs describe this as passing `ref` as a regular prop. Therefore
`Input.jsx` and `Select.jsx` accept `ref` from props and pass it to the real DOM
element:

```javascript
function Input({ label, ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

For React 18 and earlier, the correct pattern would be `forwardRef`, with props
first and `ref` second inside the render function.

## Architecture Notes

### Appwrite Service Layer

All Appwrite SDK access lives in `src/appwrite/`.

- `auth.js` wraps `Client` and `Account`.
- `config.js` wraps `Client`, `TablesDB`, `Storage`, and `Query`.

Components and pages call these services instead of importing Appwrite SDK
classes directly.

### Centralized Config

`src/conf/conf.js` is the only place that reads `import.meta.env`. This keeps
environment variable names out of the rest of the app.

### Redux Toolkit for Auth State Only

Projects `09reactcontexttodo` and `10reactreduxtodo` compared local state,
Context, and Redux. MegaBlog uses Redux for auth status and current user because
that state affects navigation, protected routes, and many distant components.

Form drafts and editor content stay in React Hook Form until submitted. They do
not belong in Redux.

### AuthLayout

`AuthLayout` is the protected-route wrapper:

- Protected pages require `auth.status === true`.
- Login and signup use `authentication={false}`, so authenticated users are
redirected away.

This keeps route protection in one place instead of scattering auth checks
through every page.

### React Hook Form and Slugs

Login, signup, and post forms use React Hook Form. The post form watches the
title field and generates a slug while creating a new post. Existing posts keep
their slug stable because the slug is the Appwrite row ID.

### Rendering TinyMCE HTML

TinyMCE stores an HTML string. `html-react-parser` turns that string into React
elements, which is cleaner than manually using `dangerouslySetInnerHTML`.

This is acceptable here because the HTML is authored by authenticated users
inside this app's editor. Do not render arbitrary untrusted third-party HTML
without sanitization.

## Project Structure

```text
11reactmegablog/
  src/
    appwrite/
      auth.js
      config.js
    conf/
      conf.js
    store/
      store.js
      authSlice.js
    components/
      Header/
        Header.jsx
        LogoutBtn.jsx
      Footer/
        Footer.jsx
      Container/
        Container.jsx
      Button.jsx
      Input.jsx
      Select.jsx
      Logo.jsx
      RTE.jsx
      Login.jsx
      Signup.jsx
      PostForm/
        PostForm.jsx
      PostCard.jsx
      AuthLayout.jsx
      Loading.jsx
      index.js
    pages/
      Home.jsx
      AllPosts.jsx
      AddPost.jsx
      EditPost.jsx
      Post.jsx
      Login.jsx
      Signup.jsx
      index.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  .env.sample
  .gitignore
  README.md
```

## How To Run Locally

```powershell
git clone https://github.com/fazal305/react-fundamentals-starter-exercises.git
cd react-fundamentals-starter-exercises\11reactmegablog
npm install
```

Create `.env` from `.env.sample`, fill in the real Appwrite and TinyMCE values,
then run:

```powershell
npm run dev
```

## Common Issues (Read Before Filing a Bug)

### CORS Errors

Appwrite CORS errors are usually not JavaScript bugs. Register your app hostname
as a Web Platform in the Appwrite console:

- Use `localhost` for local development.
- Add the real deployed domain after deployment.

### Upload Failures

If image uploads fail even though the code looks correct, check the Storage
bucket's maximum file size. Appwrite buckets can default to a low limit. Raise it
in Storage -> your bucket -> Settings.

### Missing Env Variables

If the app cannot connect to Appwrite, confirm every variable in `.env.sample`
exists in the real `.env`, and that every variable starts with `VITE_`.

## Deployment

Deploy the `11reactmegablog` folder as a Vite React app on Vercel or Netlify.

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

Important deployment steps:

1. Add the same environment variables in the hosting dashboard.
2. Deploy the app.
3. Copy the deployed domain.
4. Add that domain as a Web Platform in Appwrite.
5. Test signup, login, image upload, create post, edit post, and delete post.

## Lessons Learned

- Backend SDK calls should be wrapped in a service layer.
- Vite environment variables must start with `VITE_`.
- Centralized config keeps env access maintainable.
- Redux Toolkit is appropriate for global auth state.
- Form draft state does not belong in Redux.
- Protected routes are cleaner when wrapped by an auth layout component.
- React Hook Form handles validation and field registration without manual state per input.
- React 19 accepts `ref` as a regular prop; React 18 and earlier use `forwardRef`.
- Appwrite currently uses tables, columns, and rows terminology.
- Appwrite Platform registration is the usual fix for CORS errors.
- Storage upload limits are console settings, not React bugs.
- Rendering HTML from a rich text editor requires trust boundaries and care.

## Future Improvements

- Pagination for AllPosts.
- Search and tags.
- Comments.
- Draft and scheduled posts.
- Image optimization on upload.

## License

MIT License
