This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users using a username and
password with [form-based authentication](https://en.wikipedia.org/wiki/HTTP%2BHTML_form-based_authentication).
Use this example as a starting point for your own web applications.

Made based on the example of [express-4.x-local-example](https://github.com/passport/express-4.x-local-example) by Jared Hanson.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone git@github.com:marton-laszlo-attila/express-4.x-local-example-basic-and-react.git
$ cd express-4.x-local-example-basic-and-react
$ go to one of the folder
  > 01-basic
  > 02-fetch
  > 03-fetch_and_bsrypt
  > 04-react
$ cd backend
$ npm install

$ In the 04-react example
$ cd frontend
$ npm install
$ npm run build
```

Start the server.

```bash
$ node server.js
```

Open a web browser and navigate to [http://localhost:8000/](http://127.0.0.1:8000/)
to see the example in action. Log in using username `jack` and password `secret`.
