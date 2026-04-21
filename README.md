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
- Express-Validator
```npm install express-validator```


<br><br>
 **Note:** <br>We are also utilizing functionality from ***Crypto***, which is native to **node.js**.
<br>
<br>

---
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

### Test and Debug
<br>

Test for vulnerabilities like XSS and SQL injection by attempting to inject malicious inputs. 
<br>
### Note: **Failed** = we were ***NOT*** hacked/hack *failed* to work.

| Breach Type | Snippet | Target | Success/Fail | Reasoning | 
|---|---|---|---|---|
| SQL Injection | ```' OR true-- ```| Login Page > Username Field | Failed | These fields are sanitized where common language tags are changed to their string character counterparts. <br>localhost:3443 says *' OR 1=1 -- not found*. no info/details displayed.  |
| SQL Injection | ```{"$ne": null}``` | Login Page > Username Field | Failed | Trying to find usernames that aren't "null".<br>flagged as *'invalid credentials'*. no info/details displayed. |
| SQL: RegEx | ```?user[$regex]=^a``` | Login Page > Username Field | Failed | Trying to see any usernames that begin with *"a"*. <br> localhost:3443 says *?user[$regex]=^a not found*. no info/details displayed. |
| XSS | ```<script>alert(xss)</script>``` | Profile Page > All form inputs | Failed | Inputs have been sanitized, shows up in both profilecard and db as string. no commands executed.|
| XSS | ```<iframe src="javascript:alert(`xss`)">``` | Profile Page > All form inputs | Failed | Same as above |
| Dev Tool inspection | inspect> source> look for main/important type of .js doc.<br> ctrl+f to find sensitive info.| Entire site, Data exposure | Failed | There are few visible .js documents users can see, and the ones that are visible have no sensative or critical information. No insight/information about users, the database, or login credentials can be found through this method.  |
| Manual URL manipulation | altering URL with ```/``` then adding admin-only/priveledged locations | Entire Site, Access control | Failed | session cookie is added once logged in, and cleared when logged out. Users are redirected to login page if URL is adjusted to go to paths they arent logged in for or have credentials for. If logged in as *"User"* and the URL is adjusted to go to admin-only page (Ex. ```\emailTemplate```) user is given error message page containing *"{"message":"Access Denied"}"* This does let hackers know/suspect the language because of the message format as it currently displays. TO-DO: change later on.

**General Testing Notes:**
- Profile Bio updates on profile card display area, adding it again clears the old one and only shows new.<br><br>
- sign-out puts you back to login page and clears session cookie.<br><br>
- Used the update form on Profile Page to change password and email.<br> Both showed up an enncrypted in the DB, so not at risk of being scraped/read as plain-text. *"Display Name"* shows in plain text, so a warning to users that whatever they put there will eb visible may be warrented, idk.<br><br>


---
### Input Validation Techniques - 

All user input fields have been sanitized and validated by replacing all tag/command characters with their string counterparts.
<br>

---
### Output encoding methods -

Node's *Crypto* has been used to encrupt and decrypt inputs/outputs to further strengthen our security and making sure that little-to-no sensative data is plain-text readible.
<br>
 hex has been used to return affected data as a hexadecimal-encoded string.

---
### Encryption techniques used -

Both Argon2 and Crypto are used to hash and encrypt the user info, so even if (*somehow*) the Databse user credentials are scraped in plain-text, they are useless to the bad actors as the hashing makes the actual credentials indistinguishable from the hash.

---
### Third-party libraries dependency management -
GitHub Action: **audit-for-vulnerabilities**
<br>
    A GitHub action has been set to do the following:
    
- Install Dependancies
<br>
```npm ci```

- Display Vulnerabilities
<br>
```npm audit || true```

- Fix depreciated and/or vulnerable packages/dependencies
<br>
```npm audit fix```

<br><br>

# AI Tool Use
<br>
Which AI tools you used, for which tasks, and how you verified the output.

| Name | AI Tool Used | Purpose | Validation | Notes (optional) | 
|---|---|---|---|---|
| Rachel | Claude | To check and see if having Github actions running on a branch other than **Main** (at the time was on sub-branch: Phase-2) was the reason GitHub was not recognizing the workflow. Read a lot of documentation and did troubleshooting before utilising AI tool | Verified by searching GitHub dumentation (ctrl + F) witht the terms AI tool used. verified that, yes, Github actions are only recognized when on main or default branch.  | *I really just didn't want to wade through all the documentation for such a common platform. Assumed correctly that the AI's dataset would contain such documentation/ info scraped from the documentation* -RP |
| Euan | Claud | Debugging Tool | N/A - AI showed basic coding rules & syntax | (hope this is fine) I used Claude in this as a debugger.  Helping me find spelling mistakes mainly. It showed me that I forgot to use async and await when setting up the /profile route and using  User.findById. It helped me understand why my encryption and decryption wasn't working by showing me that I spelled crypto as "cyrpto".  It showed me where to put console.logs which helped me a lot in the debugging. Never copying code specifically though.  |



<br><br>

# Lessons Learned - 

### YML Syntax and Whitespace: - **Rachel** 
---
YML is easy to read and understand, but quite challenging to write when you're used to languages that are incredibly forgiving when it somes to tabbing over, whitespace, and alignment. 
<br><br>
I found the troubleshooting a bit hard to get the hang of at first because I am not used to looking for accidental whitespace and, ergo, fail repeatedly to recognize the errors in my yml document.
<br><br>
    I also found it difficult to adjust my writing habits for YML and realized several quirks in my code style. When in other languages, I tend to give myself large gaps between distinct lines, add extra blank lines in-between sections,a and use whitespace as an organizational tool. This really came to bite me when debugging the GitHub actions code.
    <br><br>
    It did not help that a lot of the issues I had was due to working on an off-main branch (*lol*), but I can say I now know a lot more about Github's organization and action-launch priorities.
<br><br>
### Sanitization & Encryption Troubleshooting: - **Euan** <br>
---
I started trying to get to the profile page before my decryption/encryption was even working and had it set to rerout to /login if an error occurred. I was stuck here for a couple hours and thought is was something wrong with my routes and couldn't figure it out for the life of me. 
<br><br>
I had to take a step back and figure out what was actually happening so I set a lot of console logs at each step to figure out where things were going wrong and it was my decryption/encryption which I thought I had perfect.
<br><br>
I learned that sanitization is important and is easy to overlook when setting up a quick function. There are three main points to sanitize a form. Through html attributes like "pattern" and "maxlength" then the next level is in the js form handler by escaping potentially malicious characters like ```< >```. And finally in the backend before putting that data into the database it can be sanitized further. 

<br><br>
## Reflection Checkpoint - 

- What types of vulnerabilities can arise from improper input validation? 
- How does output encoding prevent XSS attacks?
- What challenges did you encounter with encryption, and how did you resolve them?

There are a few vulnerabilities that can arise in this section from improper input.<br> 
First the information is sensitive so if someone somehow got access to the database we'd want important information to be encrypted. But encryption also ensures that no malicious code is actually saved to the database because what ever is saved gets encrypted before actually reaching the database.<br><br>
Another vulnerability arises when you print something on the page that a user has input themselves. Such as their bio, or displayName if they had used HTML tags or other XXS it would display regardless of encryption so this needs to be sanitized. <br>
DisplayName doesn’t need to be encrypted because its not sensitive information and its basically a waste of time and resources so this information has to be sanitized for SQL injection before being saved into the database.
<br><br>

# Phase 4 - Security Testing and Ethical/Legal Considerations
Final Assignment of 2026!
## D: Ethical and Legal Considerations in Web Security
 
Our approach when securing ClickSafe was, and continues to be strongly aligned with all ethical and legal guidelines associated with web security professionalism. All threat testing was conducted amongst the three web-developers assigned to this project, and the methods utilized were agreed to by all stakeholders. None of the actions taken could end up causing reputational damage to SAIT, penalties due to non-compliance with data regulations, nor criminal charges for the involved developers.
 
When executing common attack vectors such as SQL injections and XSS attacks, we ensured that the attacks were carried out in a locally-served environment (HTTPS://localhost:####/). These tests were carried out exclusively on the ClickSafe application (which we had permission to conduct tests on).
 
### Legal frameworks pertaining to ClickSafe:
 
#### Alberta Private-sector Privacy Law
 
##### Personal Information Privacy Act
 
- We operate in Alberta  

- We are a private group  

- We collect personally identifiable user information  
 
This requires us to:
 
- Notify users on what data we are collecting and why we are collecting it  

- Only collect data we actually need  

- Apply reasonable safeguards to protect all user data we are storing  

- Allow users access to their data  
 
If a breach occurs, we are required by law to provide a report on the details of the compromised data.
 
#### Federal Law
 
##### Personal Information Protection and Electronic Documents Act
 
- We use Google OAuth  
 
This requires us to:
 
- Disclose any international data transfer that may occur on Google’s end  

- Disclose in our privacy policy that we use Google’s services processes some of our data  
 
If Google mishandles our data, we are legally responsible to our affected users.
 
## E: Document the Security Process


**Security Testing:** Provide a step-by-step guide how you tested the application for vulnerabilities, including manual and automated testing processes.
<br><br>

**Overview:**
<br>
Security testing was conducted using a combination of automated scanning and manual penetration testing techniques. The goal was to identify common web application vulnerabilities including injection attacks, cross-site scripting, broken access control, and sensitive data exposure.

### Automated Testing:  OWASP ZAP

**Tool**: OWASP ZAP (Zed Attack Proxy) via Docker
<br>
**Target**: https://localhost:3443
<br>
Two scan types were executed:
<br>
- Baseline scan:
<br>performed a passive spider of the application to discover all accessible endpoints and flagged issues without actively attacking the app.

- Full scan:
<br>extended the baseline with active attack payloads across all discovered endpoints, testing for common vulnerabilities including injection, misconfigured headers, and insecure cookies.


Findings addressed from ZAP output:

- CSP style-src unsafe-inline — resolved by migrating inline styles to external CSS files and removing the unsafe-inline allowance from the Helmet configuration

- CSP failure to define directives with no fallback — resolved by explicitly adding form-action, frame-ancestors, object-src, and base-uri to the Content Security Policy.

### Manual Testing: 
All manual tests were performed against the live local instance. The table below documents each test case, the payload used, the target, and the result. "Failed" indicates the attack did not succeed
<br>
**Target**: https://localhost:3443
| Breach Type | Snippet | Target | Success/Fail | Reasoning | 
|---|---|---|---|---|
| SQL Injection | ```' OR true-- ```| Login Page > Username Field | Failed | These fields are sanitized where common language tags are changed to their string character counterparts. <br>localhost:3443 says *' OR 1=1 -- not found*. no info/details displayed.  |
| SQL Injection | ```{"$ne": null}``` | Login Page > Username Field | Failed | Trying to find usernames that aren't "null".<br>flagged as *'invalid credentials'*. no info/details displayed. |
| SQL: RegEx | ```?user[$regex]=^a``` | Login Page > Username Field | Failed | Trying to see any usernames that begin with *"a"*. <br> localhost:3443 says *?user[$regex]=^a not found*. no info/details displayed. |
| XSS | ```<script>alert(xss)</script>``` | Profile Page > All form inputs | Failed | Inputs have been sanitized, shows up in both profilecard and db as string. no commands executed.|
| XSS | ```<iframe src="javascript:alert(`xss`)">``` | Profile Page > All form inputs | Failed | Same as above |
| Dev Tool inspection | inspect> source> look for main/important type of .js doc.<br> ctrl+f to find sensitive info.| Entire site, Data exposure | Failed | There are few visible .js documents users can see, and the ones that are visible have no sensative or critical information. No insight/information about users, the database, or login credentials can be found through this method.  |
| Manual URL manipulation | altering URL with ```/``` then adding admin-only/priveledged locations | Entire Site, Access control | Failed | session cookie is added once logged in, and cleared when logged out. Users are redirected to login page if URL is adjusted to go to paths they arent logged in for or have credentials for. If logged in as *"User"* and the URL is adjusted to go to admin-only page (Ex. ```\emailTemplate```) user is given error message page containing *"{"message":"Access Denied"}"* This does let hackers know/suspect the language because of the message format as it currently displays. TO-DO: change later on.



These were noted during general testing and confirm expected secure behavior:

- **Session management**
<br> logging out clears the session cookie and redirects to the login page; navigating to protected routes without a valid session redirects to login
- **Password and email storage** 
<br>both fields confirmed to be stored encrypted in MongoDB; not readable as plaintext if the database were accessed directly
- **Profile updates** 
<br>submitting the profile update form replaces existing data correctly; no residual data persists from previous entries
- **Display name** 
<br>stored and rendered in plaintext by design; a user-facing notice that this field is publicly visible is recommended

**Testing Tools:** List all the tools you used throughout the security testing process, such as those used for threat modelling, static and dynamic testing, vulnerability scanning and manual testing. Explain the purpose of each tool and how it contributed to the security evaluation and enhancement of the application.
<br><br>
- **Figma**: Creating the threat model and organizing our project
<br> ```https://www.figma.com/board/m9FqkTlecmv9jeicRL13AQ/Capstone-Brainstorm?node-id=653-3373&t=CJiGbHovZsI2Jfu4-1```
- **Claud AI**: Generating the STRIDE Table (though much of it was of poor quality, so we did not use the majority of it)
- **OWASP ZAP**: Running basic and full scans of the application
- **VS Code**: For manual testing
- **Our incredible intellect**: for Manual testing
- **Docker**: for running ZAP (Not all our systems would allow direct installation of OWASP ZAP)
- **csrf-csrf**: for creating csrf tokens.
- **Redbull**: For gettig us through this last week of deadlines.


**Lessons Learned:** Reflect on the key takeaways from the process. Highlight what worked well, challenges faced, and areas for improvement
<br><br>
- On the first try, OWASP ZAP is rather difficult to configure and utilize correctly. That being said, we quickly realized how useful ZAP is as a security vulnerability testing tool. Arguably the most important realization was how easy it might be to use tools like ZAP for the wrong reasons. - FO
<br><br>
- Documentation is a lit easier when large sections are done all at once. revisiting code or tasks from days prior can make it challenging to get back in the flow of things. 
<br> also, Docker isn't stat scary to operate now that we have more cmd line under our belts. I feel more comfortable implimenting Docker into my other projects now due to my novel familiarity! -RP