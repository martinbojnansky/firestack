# ๐ฅ Firestack

## ๐ Getting started

### ๐ฆ Install packages

`npm run install`

### ๐ Start applications

`npm run server`

`npm run client`

### ๐งช Test application

Unit tests:

`npm run test`

E2E tests:

`npm run cypress`

Make sure server and client applications are running. To re-run the application, clear data in the [firestore emulator](http://localhost:4201/firestore/data/).

Select test suite(s).

### ๐คฌ Lint application

`npm run lint`

### ๐ Analyze frontend bundle

`cd client`

`npm run analyze`

### ๐จ Kill port

`netstat -ano | findstr :PORT`

`taskkill /PID **** /F`
