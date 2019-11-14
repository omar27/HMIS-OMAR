1) go to http://jhipster-registery.herokuapp.com/#/, login with (admin,12345). This is registry server hosted on heroku. You need to hit this to make sure its alive. 
2) In root directory: run 'npm install' (you need to have node and nom installed on your system)
3) set environment for OKTA by running 'source okta.env' (MAC)
4) run "./mvnw" in root directory --> service would be up on localhost:8080
5) Need to login to okta account to check if its working --> go to https://dev-464001.okta.com/ 
Account 1 -> Receptionist (Ali@yahoo.com, Ali@123456)
Account 2 -> Admin (super@admin.com, Password@12345)

You'll be using above accounts to login to the system
