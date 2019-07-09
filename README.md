# Inventory

#### Installation
1. Install v8.11.1/2
2. Install MongoDB
3. run "$ npm install"
4. Install forever as global only for prod. nodemon is used dev.

##### To run on dev env
On MacOS or Linux:
`$ DEBUG=inventory:* npm start`

On Windows:
`set DEBUG=inventory:* & npm start`

Then load http://localhost:3000/ in your browser to access the app.

##### To run in prod env
> $ forever start bin/www

For more info, https://expressjs.com/en/advanced/pm.html#forever
  

##### Common Issues
1. Port is already in use. -- Stop all forever running with
`$ forever stopall`. root user is different from other user.
2. sudo su
	```
	$ eval "$(ssh-agent -s)"
	Agent pid 59566
	ssh-add /home/ubuntu/.ssh/id_rsa
	git clone <ssh> .
	```