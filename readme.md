## Listener and logger for chatting on facebook.

#### Config on fb setting
- Turn on 2-Factor Auth

#### Deployment
- Copy .env.example => .env
- Edit mapping port, or environment if need

#### Install packages
```
    $ npm install
```

#### Run run run
```
    $ node app.js
```

#### Login (only once)
- Run getCookie() function to login fb then generate __cookieFile.json__
- Get app code or OTP then fill out in console