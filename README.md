# EverestMinds Elearning System

![](https://media-exp1.licdn.com/dms/image/C4E0BAQEK-HHLHPTVmA/company-logo_200_200/0/1519898879396?e=1669852800&v=beta&t=D8J-KGyprdoibs7Nov1lQ_BNqvEAwlQJRpbvLezetmE)

### Features

- Login
- Register
- Roles
- Hashed Password
- Courses 
- Categories
- Admin Dashboard

### Technologies Used
- MongoDB
- Express
- ReactJS
- NodeJS

### Deploying
- Docker
- Heroku


### Postman API
[API Collection](https://documenter.getpostman.com/view/10930876/VUxKSUAv)


#Installation In Local Environment
- Create .env file after editing this example
```
NODE_ENV = "production"
PORT = "5000"
MONGO_URI = "mongodb+srv://username:pass@cluster.mongodb.net/"
JWT_SECRET = "abc123"
```

- Building & running the application 

```
npm install
cd everestminds && npm install && npm build
cd ..  && npm start
```

##Demo App
[https://everstminds.herokuapp.com/](https://everstminds.herokuapp.com/)

##Admin Demo Account
- **Username:** everest@gmail.com
- **Password:** 123456


##Building Through Docker
```
docker build -t everestminds .
docker run --publish 5000:5000 everestminds
```
