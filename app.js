// app.js

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const queryParser = require('query-parser')


app.use(bodyParser.urlencoded())
app.set('view engine', 'pug')



app.get("/searchBar", (req, res) => {
	res.render("searchBar")	
	})

app.get("/jsonSearch", (req, res)=> {
	let suggest = req.query.name
	console.log(suggest)
	let userMatch = []
	fs.readFile("users.json", function(err, data) {
	if (err) {
		console.log("error + err")
		}
		var users = JSON.parse(data.toString())
			 for (var i = 0; i < users.length; i++) {
			 	if ((users[i].firstname.toLowerCase().startsWith(suggest)) || (users[i].lastname.toLowerCase().startsWith(suggest))) {
                 	userMatch.push(users[i].firstname + " " + users[i].lastname)
			 	}
			}	
		res.send(userMatch)	
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