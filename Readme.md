# Node Email Verificator

NEV is a simplified method of sending quick verification code to email for verification.

## NEV Functions

+ config  
+ send  
+ verify

### config  

```js
    nev.config(service, user, pass);
```  

The config function takes 3 parameters:

+ **service**: The host for sending mail (e.g  gmail, yahoo)
+ **user**:  Users email (e.g example@gmail.com)
+ **pass**: The users  password (e.g passw0rd)  

### send

When  a  post request for verification is made, the send function   delivers the confirmation code to the  email parameter  

```js
    nev.send(email);
```  

The send function takes a parameters:

+ **email**: The client's email  

### verify

When  a  post request for confirmation is made, the verify function confirms the confirmation code from the client  

```js
    nev.verify(code);
```  

The send function takes a parameters:

+ **code**: The confirmation code from the client

### Example with express

```js
const express = require('express');
const nev = require('node-email-verification');

const server = express();

nev.config('gmail', 'example@gmail.com', 'passw0rde');

server.post('/', (req, res) => {
    nev.send('reciever@yahoo.com'); 
    res.sendFile('./confirm.html');
})

server.post('/confirm', (req, res) => {
    let code = req.body.code;

    if(nev.verify(code)){  //if successful
        res.sendFile('./success.html')
    }else{  // if error
        res.sendFile('./index.html', {message:  'Please Try Again'})
    }
})

server.listen(3000, () => console.log('Using NEV on port 3000'))
```

### Contribution  

Contribute on github [Here](https://github.com/Qudusayo/node-email-verification)
