# Inventory

#### Installation
1. Install v8.11.1
2. Install MongoDB
3. run "$ npm install"
4. Install forever as global.

##### To run
On MacOS or Linux, run the app with this command:
> $ DEBUG=myapp:* npm start

On Windows, use this command:
> set DEBUG=myapp:* & npm start

Then load http://localhost:3000/ in your browser to access the app.

##### Notes
* I use forever to run the app. For more info, https://expressjs.com/en/advanced/pm.html#forever
  Ran the app with $ forever start bin/www

##### Common Issues
1. Port is already in use. -- Check the forever installed. To stop all use "$ forever stopall".
2. eval "$(ssh-agent -s)"
	Agent pid 59566
3. # ssh-add ssh-add /home/ubuntu/.ssh/id_rsa
