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

# Assignment Phase 3: Documentation:
If you encounter any issus while following the set-up instructions, please reach out to members of the ClickSafe dev team:
- Euan Fitzpatrick: Euan.fitzpatrick@edu.sait.ca
- Rachel Payette: rachel.payette@edu.sait.ca
- Finn O'Driscoll: Finn.odriscoll@edu.sait.ca

### **A**) Setting Up Your Repository - 
<br> 

**1.** (**Reccommended**) Download the GitHub Desktop application and sign in to your GitHub account. 

**2.** Navigate to the Capstone repository on GitHub in your web browser
```https://github.com/EuanFitz/capstone```
<br><br>
**3.** Ensure you are currently on the *main* branch. If not, from the branch drop-down, select **Main**

**4.** Click the green < > Code button.

**5.** Click **Open with GitHub Desktop.** You may be prompted to allow your browser to open the application.

**6.** In the GitHub Desktop window, choose a local path/directory where you want to clone the repository, then click Clone.

**7.** open VS Code and ensure the files have been added correctly. (**Note: ***You can compare your files to the files showing in the Repo on the browser*)

### **B**) Setting Up Your Environment - 

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

<br><br>
- **Note:** <br>We are also utilizing functionality froom ***Crypto***, which is native to **node.js**.
<br>
<br>

**2. Keys & Certificates** <br>Next, create both a private **key** and **certificate** by typing the following text into your commandline/terminal:
<br>
    - **Key**: ```openssl genrsa -out private-key.pem 2048```
    <br><br>
    - **Certificate**: ```openssl req -new -x509 -key private-key.pem -out certificate.pem -days 365```
    <br> <br>
Ensure that the key and certificate are saved in the top of your directory and not within any sub-folders. 
<br>They should be named *"private-key.pem"* and *"certificate.pem"*, respectively.

### **C**) Configuring Your Environment Variables -

**1**. In the root of your project directory, create a new file named `.env`
**2.** Add the following variables to the file:
```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=3443
GOOGLE_CLIENT_ID= your_google_client_connection_string_here
GOOGLE_CLIENT_SECRET= your_secret_key_here
SECRET_KEY = 8f786872fe215ec7e2dfdb956a5d2f56 
```

**Notes:**
- `MONGO_URI` — Get this from your MongoDB Atlas dashboard
- `JWT_SECRET` — Choose any long, random string. The longer the better. e.g. `myS3cur3S3cr3tK3y!`
- `GOOGLE_CLIENT_ID` — get from google cloud services
- `GOOGLE_CLIENT_SECRET` — another random string here. 
- `NODE_ENV` — Use `development` locally. Do **not** change this to `production` unless deploying.
- The `.env` file is listed in `.gitignore` and **must never be committed to GitHub.** Contact the dev team for the correct values.
- 'Authorized redirect URIs on your google cloud application must be https://localhost:3456/api/auth/google/callback
### **D**) Running the Application -

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

### **E**) Run The Server - 

You are now successfully running the ClickSafe Server. Please publish and/all changes on you own branch and always check with the dev team before merging any branches together. 
<br>
Cheers, 
<br><br> 
**🛡️** - *The ClickSafe Dev Team*
<!-- omg emojis work on MD?! hell yeah! -->

-----------------
<br>
<br>
<br>

# Assignment Explainations
<br>


### Input Validation Techniques - 

### Output encoding methods -

### Encryption techniques used -

### Third-party libraries dependency management -
---

# AI Tool Use
<br>
Which AI tools you used, for which tasks, and how you verified the output.

| Name | AI Tool Used | Purpose | Validation | Notes (optional) | 
|---|---|---|---|---|
| Rachel | Claude | To check and see if having Github actions running on a branch other than **Main** (at the time was on sub-branch: Phase-2) was the reason GitHub was not recognizing the workflow. Read documentation and did troubleshooting before utilising AI tool | Verified by searching GitHub dumentation (ctrl + F) witht the terms AI tool used. verified that, yes, Github actions are only recognized when on main or default branch.  | *I really just didn't want to wade through all the documentation for such a common platform. Assumed correctly that the AI's dataset would contain such documentation* -RP |
| name | tool name | for what purpose | how did you verify it was correct | optional notes if needed. Copy/past this on a new line for another entry btw -RP |



<br><br>

# Lessons Learned - 

**- Title**: Name <br>
    Blurb Here

**- Title**: Name <br>
    Blurb Here 

**- Title**: Name <br>
    Blurb Here




