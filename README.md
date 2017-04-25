# Epic Redux

A project full of examples on how you can abuse Redux to do things it was never designed to!

## Running the Project

`yarn start`

## Developing

In order to run the app in dev mode you need to run two long-running commands.

`gulp`

and

`nodemon dist/server/index`


What you get: automatic recompiling and server restarts.

What you don't get: module hot swapping or automatic browser refresh. These things weren't easy when I first setup the app this was based from. If you want those things feel free to PR them!


## Libraries/Frameworks Used

* React
* Redux
* Express
* Primus

Its been so long now I forget why I chose Primus, the pattern should work with any web socket implementation (or the node one if you really want to write that) so feel free to replace it.


## Rooms

There is only one model object in this project called a `room`. The room object holds all the important server code. There is only one room right now, but I encapsulated it to make it easy to create multiple rooms. After all, what good is one giant global chat anyhow? (cough Twitter cough).
