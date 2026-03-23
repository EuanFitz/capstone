# Capstone Project
`- ClickSafe -`

### Members:
- Euan Fitzpatrick - **Web Developer**
- Rachel Payette - **Web Developer**
- Finn O'Driscoll - **Web Developer**
- Taylor Mathieu - **UX/UI Designer**

## Overview - 
Group project for Capstone class & Showcase in 4th semester at SAIT SADT.
Developing a web app designed to help companies improve internal web security via phishing simulations and gathered campaign data. 
<br> <br>

# Assignment 2-F: Documentation:
If you encounter any issus while following the set-up instructions, please reach out to members of the ClickSafe dev team:
- Euan Fitzpatrick: Euan.fitzpatrick@edu.sait.ca
- Rachel Payette: rachel.payette@edu.sait.ca
- Finn O'Driscoll: Finn.odriscoll@edu.sait.ca

### A) Setting Up Your Repository - 
<br> 

**1.** (**Reccommended**) Download the GitHub Desktop application and sign in to your GitHub account. 

**2.** Navigate to the Capstone repository on GitHub in your web browser
```https://github.com/EuanFitz/capstone```
**3.** From the branch drop-down, select **ServerSide**

**4.** Click the green < > Code button.

**5.** Click **Open with GitHub Desktop.** You may be prompted to allow your browser to open the application.

**6.** In the GitHub Desktop window, choose a local path/directory where you want to clone the repository, then click Clone.

**7.** open VS Code and ensure the files have been added correctly. (**Note: ***You can compare your files to the files showing in the Repo on the browser*)

### B) Setting Up Your Environment - 

**1. Installs** 
<br>In your terminal, navigate to the root of your project directory and run:
```
npm install
```
> This installs all dependencies automatically from `package.json`. The manual installs below are only needed if something is missing.

<br>
<br>


- Argon2 
```npm install argon2```
- body-parse
```npm install body-parser```
- cookie-parser
```npm install cookie-parser```
- dotenv
```npm install dotenv```
- express
```npm install express```
- ejs
````npm install ejs````
- helmet
```npm install helmet```
- mongoose
```npm install mongoose```
- JSON Web Token
```npm install jsonwebtoken```
- Google passport
```npm install passport passport-google-oauth20```
- use a third-party manager like **Chocolatey** or **Brew** to install Open SSL
```    brew install openssl```
<br>
<br>

**2. Keys & Certificates** <br>Next, create both a private **key** and **certificate** by typing the following text into your commandline/terminal:
    - **Key**: ```openssl genrsa -out private-key.pem 2048```
    - **Certificate**: ```openssl req -new -x509 -key private-key.pem -out certificate.pem -days 365```
    <br> <br>
Ensure that the key and certificate are saved in the top of your directory and not within any sub-folders. 
<br>They should be named *"private-key.pem"* and *"certificate.pem"*, respectively.

### C) Configuring Your Environment Variables -

**1**. In the root of your project directory, create a new file named `.env`
**2.** Add the following variables to the file:
```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=3443
GOOGLE_CLIENT_ID= your_google_client_connection_string_here
GOOGLE_CLIENT_SECRET= your_secret_key_here
```

**Notes:**
- `MONGO_URI` — Get this from your MongoDB Atlas dashboard
- `JWT_SECRET` — Choose any long, random string. The longer the better. e.g. `myS3cur3S3cr3tK3y!`
- `GOOGLE_CLIENT_ID` — get from google cloud services
- `GOOGLE_CLIENT_SECRET` — another random string here. 
- `NODE_ENV` — Use `development` locally. Do **not** change this to `production` unless deploying.
- The `.env` file is listed in `.gitignore` and **must never be committed to GitHub.** Contact the dev team for the correct values.

### D) Running the Application -

**1.** In your terminal, navigate to the root of the project directory.
**2.** Start the server with:
```
npm run dev
```
**3.** click the link in your terminal or open your browser and navigate to:
```
https://localhost:3443
```
> **Note:** Because the SSL certificate is self-signed, your browser will show a security warning. This is expected in development. Click **Advanced** and proceed to the site.

### E) Run The Server - 

You are now successfully running the ClickSafe Server. Please publish and/all changes on you own branch and always check with the dev team before merging any branches together. 
<br>
Cheers, 
<br> 
The ClickSafe Dev Team

-----------------
<br>
<br>
<br>

## Notes for Ashlyn:
- Side navigational Menu on Dashboard page:
	- The Side-nav will show different options based on who is logged in, but links are not functional currently.
- dashboard shows different nav options and charts based on role that is logged in
-  profile page is accessible to all users logged in (regardless of role) but cannot be accessed if not logged in. 
- if (profile, FAQ, dummydash) pages are attempted to be access through manually altering the URL, they are instead redirected to the login page, as they don't have a cookie/session. or session via cookie. However, the 404 error page was made accessible in case it needed to be referenced when a user is not logged in. 
- on /profile, the change details and password forms are not functional yet, but will be later on. (A secondary route page has been made for incoming changes)
- footer links and interactions are currently disabled as well and are there for aesthetics only currently.

### Secure Hashing and password authentication - 
We are using argon2, which hashes the passwords and stores them( hashed) in our db. When logging in, the password is hashed again by Argon2 and **must match** the stored password. Else, the user is given the respective error message that either their username or password does not match what is stored in the db. 
<br>
additioanlly, it has been made impossible to register two usernames that are identical. 


<br>

## Authentication & Session Management -

This project uses a **JWT (JSON Web Token) + HttpOnly Cookie** strategy 
for authentication and session management. There is no server-side session 
store as the token itself carries the session.

---

#### How It Works

**1. Registration**
- The user submits a username, password, and role.
- The password is hashed using **Argon2** before being stored in MongoDB.
- Plain-text passwords are never saved.

**2. Login**
- The server looks up the user by username and verifies the submitted 
password against the stored Argon2 hash.
- If credentials are valid, the server signs a **JWT** containing the 
user's ID, username, and role, using the `JWT_SECRET` from your `.env`.
- The token is sent to the browser inside an **HttpOnly cookie**, 
not in the response body.

**3. Authenticated Requests**
- On every protected route, the `authMiddleware` checks for the token 
in the request cookie.
- The token is verified against `JWT_SECRET`. If valid, the decoded 
user data (`id`, `username`, `role`) is attached to `req.user` and 
the request proceeds.
- If the token is missing, invalid, or expired, the user is redirected 
to `/login`.

**4. Authorization**
- After authentication, the `authorize` middleware checks that 
`req.user.role` matches the roles permitted for that route.
- For example, some routes accept both `"admin"` and `"user"` roles, 
while admin routes are restricted to `"admin"` only.

---

#### Security Measures

| Measure | Implementation | Protects Against |
|---|---|---|
| Password hashing | Argon2 | Stolen database credentials |
| HttpOnly cookie | `httpOnly: true` on cookie | XSS (*JS cannot read the token*) |
| HTTPS only | `secure: true` in production | Man-in-the-middle attacks |
| SameSite strict | `sameSite: 'strict'` on cookie | CSRF attacks |
| Token expiry | JWT expires after 1 hour | Stolen token reuse |
| Helmet.js | Applied globally in `server.js` | Various HTTP header attacks |

---

#### Token Lifecycle
```
User logs in
     ↓
Server signs JWT → sends as HttpOnly cookie
     ↓
Browser stores cookie automatically (not accessible to JS)
     ↓
Every request to a protected route sends the cookie automatically
     ↓
authMiddleware verifies token → attaches req.user → route proceeds
     ↓
Token expires after 1 hour → user is redirected to /login
     ↓
Token is cleared when user logs out.
```

---


<br>
<br>

## Role-Based Access & Control - 
A user's role is assigned at registration, 
stored in MongoDB, and embedded in their JWT so it is available on every authenticated request via `req.user.role`.
#### Roles

| Role | Description |
|---|---|
| `admin` | Full access to all routes, pages, and admin tools |
| `user` | Access to standard protected routes only |

---

#### How It Works

Authorization is handled by the `authorize` middleware in 
`middleware/authorization.js`. It runs **after** `authMiddleware` 
(which verifies the JWT), and checks whether the authenticated user's 
role is permitted for that specific route.

If the user's role is not in the allowed list, they are denied access. 
If their role is permitted, the request continues normally.


---

#### Route Access by Role

| Route | `user` | `admin` |
|---|---|---|
| `/` — Home | ✅ | ✅ |
| `/login` | ✅ | ✅ |
| `/register` | ✅ | ✅ |
| `/profile` | ✅ | ✅ |
| `/faq` | ✅ | ✅ |
| `/dummydash` | ✅ with Altered Content | ✅ |
| `/api/admin` | ❌ | ✅ |

---
<br>
<br>

## Lessons Learned - 

**- Defining Routes** <br>
     Having three devs working on the same section/code problem simultaneously through different branches leads to difficulties trying to centralize and align routes. It added extra time in bug-fixing trying to figure out why a route was not working as intended only to find it was being defined (and therefore overwritten) by another route written elsewhere. we had to create a method of organization that allowed all devs to continue coding without sabotaging each other's work. 

**- PHP to Node**
    <br> this was a steep learning curve for all of us, as we learned all of our back-end knowledge through php last semester and had not integrated much (if any) server-relevant JS, so learning Node was new for us. Additionally, we would know how to do something in php, and then having to translate that over to node.js and express took a lot of time to get the hang of. We were able to trudge through the challenging parts and come up with some creative solutions. 

**- Rachel's past experience with MERN**
    <br> I had the opportunity to code with a back-end Dev in a MERN stack project over the summer, so once we got to defining routes, I was able to enter a *"flowstate"* where the layout and code was familiar to me and I was able to lean heavily on my past experience. This was not something that directly applies to "*lessons Learned*" but does prove that taking on new opportunities as they present themselves can have unexpected and **hugely useful** outcomes! very grateful to have some knowledge going in! -RP

**- JWT & Cookie-Based Authentication**
    <br> Coming from PHP sessions, implementing stateless authentication using  JWTs was a new concept. Learning how to sign a token, embed user data 
    inside it, and deliver it securely via an HttpOnly cookie, rather than  storing it in localStorage or a server-side session, required understanding several security concepts at once (XSS, CSRF, SameSite 
    policy, and token expiry). Getting these pieces to work together correctly was a significant challenge to say the least.

**- The Difference Between Authentication and Authorization**
    <br> Early on, these two concepts were being handled as one. Through  implementation we learned to treat them as separate concerns.
    authentication was then handled by one middleware, and 
    authorization by another. Separating them made the code cleaner and easier to read, understand, and add to.

**- Frontend/Backend Contact Consistency**
    <br> Several bugs came from the frontend and backend making different assumptions. For instance, fetch requests pointed at the wrong URL, the frontend expecting a token in the response body while the backend was sending it as a cookie, and EJS templates referencing variables that were never passed from the route. This taught us the importance of keeping the frontend and backend in sync, and checking both ends when something isn't working as expected.

**- EJS Templating Syntax**
    <br> A small but memorable lesson: <% %> has JavaScript  die silently, while <%= %> outputs a value to the page. Mixing these up caused template variables to appear blank with no error thrown, which was initially difficult to diagnose (mostly for Rachel and her dyslexic butt!) -RP.

**- OAuth**
    <br> Setting up Oatuth was a big challenge. There are a lot of steps where things can go wrong from our code setup -> google  -> callback -> token -> cookie. Spelling mistakes result in cryptic errors and can make it hard to pinpoint what went wrong.  It is important to be organized with the file setup. This made it easier to find my spelling mistakes and bugs.  I updated the User model and learned what "sparse" meant,. Basically when MongoDB goes through users it will only include this row IF it is set. Otherwise it will ignore the  null values so we don’t get duplicate null errors because the id also has to be unique. -EF





<br>
<br>
<br>
<br>
<br>

-------------

# Internal Dev Team: Content & Rules
The following content is for the ClickSafe Dev team. If you are trying to set up your environment, this section is not relevent to you. Please see the above ***Assignment 2-F: Documentation*** section.

## Styling Rules - 

## Includes Folder
The includes folder Contains:

- Side Nav Menu
- Head Links
- Footer

---
### Nav
The Side Nav Menu is located in the ***includes*** folder
<br>
The Nav is styled globally in the Global.css sheet and uses `Display: Grid;`.
<br>
The Nav can be added to pages via php include, and is compatible with both `display grid` and `display flex`. 
<br>
however, you must target the nav in the page-specific style sheet and disctate where on the page it must go. 

---

### Head Links
The html/php head links are included in the ***include*** folder.
<br>
There is currently a placeholder in the title:
<br>
 `<title><?php echo variable?> || ClickSafe.com  </title>`
 <br>
 This will need to be adjusted for PHP use, but will be nicely scalable. 


## Envirnoment Requirements:

to run and operate within Rachel's server branch/most recent branch, esure you have installed the following modules:

```├── argon2@0.44.0
├── body-parser@2.2.2
├── cookie-parser@1.4.7
├── dotenv@17.3.1
├── ejs-lint@2.0.1
├── ejs@4.0.1
├── express-session@1.19.0
├── express@5.2.1
├── fs@0.0.1-security
├── helmet@8.1.0
├── https@1.0.0
├── jsonwebtoken@9.0.3
├── mongoose@9.3.1
├── passport-google-oauth20@2.0.0
└── passport@0.7.0
```


## Notes:
<br>
Notes Here 

<br>
More Notes


Thank you for your time!
<br>
Cheers, 

- Rachel P.
- Euan F.
- Finn O.
