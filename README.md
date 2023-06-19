# FacePamphlet
      
FacePamphlet is a soft clone of Facebook. With recent events, many people have found themselves living more remotely. FacePamphlet wants to provide a service where people can find cool new people to interact with. 

Check out [FacePamphlet](https://facepamphlet.onrender.com)

## Index

[MVP Feature List](https://github.com/meyermatt22/Capstone-AA/wiki/Feature-List) |
[Database Scheme](https://github.com/meyermatt22/Capstone-AA/wiki/Database-Schema-and-Backend-Routes) |
[User Stories](https://github.com/meyermatt22/Capstone-AA/wiki/User-Stories) |
[Wire Frames](https://github.com/meyermatt22/Capstone-AA/wiki/Wireframes) |

## Technologies Used

* Python
* JS
* PostgreSQL
* Flask
* React
* Redux

## Login / Signup page
![splash](https://i.imgur.com/Fai9VLl.jpg)

## Profiles
![profiles](https://i.imgur.com/bwC5xEK.jpg)

## Posts
![posts](https://i.imgur.com/UumSE9e.jpg)

## Profile Page 
![profile](https://i.imgur.com/L8qfmqj.jpg)


## Getting started
#### How to start project locally:
1. clone the repo into a desired location
2. cd into the react-app folder and npm install all the dependencies
3. run pipenv install -r requirements.txt from the root directory
4. get into the shell with pipenv shell
5. run the following commands in order: flask db init, flask db migrate, flask db upgrade, flask seed all
6. to start the server run flask run
7. cd into the react-app and run npm start

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking

## AWS
Logged-in Users can
* Upload multiple images of their spot to AWS S3


## Future Features
### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api 
