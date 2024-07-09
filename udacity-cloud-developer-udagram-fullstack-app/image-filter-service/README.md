# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images.

## Tasks

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint in the server.ts file


### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

> For deploying use :

```terminal
   npm run build
   eb init
   eb create
   eb deploy
```


### Usage
**Base url:** http://localhost:8082
#### filtering an image
| Path | Parameter | Description |
| :--- | :--- | :--- |
| filteredimage | `image_url` | **Required**. The image url to filter |

**Example:** http://localhost:8082/filteredimage?image_url=https://www.gstatic.com/webp/gallery3/1.png

Note: _All API requests __require__ authorization headers_ (click [here](http://localhost:8082/token) to generate a token).

- AWS Elastic Beanstalk deployed application dashboard.
  ![depcruise generated graph](https://github.com/RanjitPatnaik/Udagram-image-filtering-microservice-master/blob/master/deployment_screenshots/Elastic%20Beanstalk.png)

*Postman collection file is [here](https://github.com/RanjitPatnaik/Udagram-image-filtering-microservice-master/blob/master/cloud-cdnd-c2-final.postman_collection.json).*
