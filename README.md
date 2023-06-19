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

## Spots
![ezgif com-gif-maker](https://i.imgur.com/pRLRZwp.mp4)

## One spot page and reviews
![ezgif com-gif-maker](https://user-images.githubusercontent.com/66566925/174562986-bf32d1d3-29f3-4da1-a4a7-0762f259c31e.gif)


## Getting started
1. Clone this repository:

   `
   https://github.com/itsmaica/Remotebnb.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account

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
