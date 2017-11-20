// app.js

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded())
app.set('view engine', 'pug')


app.get('/searchBar', (req, res) =>{
	res.render('searchBar')
})

app.post('/matchedUsers', (req, res) => {
	var name = req.body.name.toLowerCase()
	console.log("The name", name)
	let userMatch = []
	fs.readFile("users.json", function(err, data) {
		if (err) {
			console.log("error + err")
		}
		var users = JSON.parse(data.toString())
            for (var i = 0; i < users.length; i++) {
                if ((name === users[i].firstname.toLowerCase()) || (name === users[i].lastname.toLowerCase())) {
                	console.log('true')
                	userMatch.push(users[i])
        		}
        	}
    	res.render('matchedUsers', {users: userMatch })
	})
})

app.get('/matchedUsers', (req, res) => {
	res.render('matchedUsers')
})

app.get('/addUsers', (req, res) => {
	res.render('addUsers')
})

app.post('/addUsers', (req, res) => {
	var firstname = req.body.firstname
	var lastname = req.body.lastname
	var email = req.body.email
	var newUser = {firstname, lastname, email}
	fs.readFile("users.json", function(err, data) {
	if (err) {
		console.log(err)
	}
	var users = JSON.parse(data.toString())
	console.log(users)
	users.push(newUser)
	var newUsers = JSON.stringify(users)
	fs.writeFile("users.json", newUsers, function(error) {
	if (error) {
		console.log(error)
	}			
		})
	res.redirect('/allUsers')
	})
})	


app.get('/allUsers', (req, res) => {
	fs.readFile("users.json", function(err, data) {
	if (err) {
		console.log("error + err")
		}
		var users = JSON.parse(data.toString())
		res.render('allUsers', { users: users})
	})
})	

app.listen(3000, ()=>{
	console.log('listening')
})