# Udagram Image Filtering Application

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into two parts:
1. Frontend - Angular web application built with Ionic Framework
2. Backend RESTful API - Node-Express application

## Getting Started
> _tip_: it's recommended that you start with getting the backend API running since the frontend web application depends on the API.

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.

2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

**Note** - EKSCTL is a very convenient tool for creating clusters through the CLI interface. If you choose to use eksctl to create your cluster, then you can skip the next three steps.

https://eksctl.io/introduction/#installation


## Feel free to use the same/different flags as you like
eksctl create cluster --name myCluster --region=us-east-1 --nodes-min=2 --nodes-max=3
## Recommended: You can see many more flags using "eksctl create cluster --help" command.
## For example, you can set the node instance type using --node-type flag
The default command above will set the following for you:

An auto-generated name
Two m5.large worker nodes. Recall that the worker nodes are the virtual machines, and the m5.large type defines that each VM will have 2 vCPUs, 8 GiB memory, and up to 10 Gbps network bandwidth.
Use the Linux AMIs as the underlying machine image
An autoscaling group with [2-3] nodes
Importantly, it will write cluster credentials to the default config file locally. Meaning, EKSCTL will set up KUBECTL to communicate with your cluster. If you'd have created the cluster using the web console, you'll have to set up the kubeconfig manually.

## Once you get the success confirmation, run
`kubectl get nodes`

Known issue: Sometimes, the cluster creation may fail in the us-east-1 region. In such a case, use --region=us-east-2 flag.

If you run into issues, either go to your CloudFormation console or run:

`eksctl utils describe-stacks --region=us-east-1 --cluster=myCluster`

You can use other regions


## OTHER METHOD:

Step 1. Create the EKS Cluster
Follow the instructions provided by AWS on [Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html). Make sure that you are following the steps for AWS Management Console and not eksctl or AWS CLI.

During the creation process, the EKS console will provide dropdown menus for selecting options such as IAM roles and VPCs. If none exist for you, follow the documentation that is linked in the EKS console. Here are some tips for you:

For the Cluster Service Role in the creation process, create an [AWS role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) for EKS. Make sure you attach the policies for AmazonEKSClusterPolicy, AmazonEC2ContainerServiceFullAccess, and AmazonEKSServicePolicy.
If you don't have a [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html), create one with the IPv4 CIDR block value 10.0.0.0/16. Make sure you select No IPv6 CIDR block.
Your Cluster endpoint access should be set to Public
Your cluster may take ~20 minutes to be created. Once it's ready, it should be marked with an Active status.

Step 2. Create the EKS Node Groups
Once your cluster is created, we will need to add Node Groups so that the cluster has EC2 instances to process the workloads.

Follow the instructions provided by AWS on [Creating a Managed Node Group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html). Similar to before, make sure you're following the steps for AWS Management Console. Here are some tips for you:

For the Node IAM Role in the creation process, create an [AWS role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) for EKS Node Groups. Make sure you attach the policies for AmazonEKSWorkerNodePolicy, AmazonEC2ContainerRegistryReadOnly, and AmazonEKS_CNI_Policy.
We recommend using m5.large instance types
We recommend setting 2 minimum nodes, 3 maximum nodes

Step 3. Connecting kubectl with EKS
Follow the instructions provided by AWS on [Create a kubeconfig for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html). This will make it such that your kubectl will be running against your newly-created EKS cluster.

Once kubectl is configured to communicate with your EKS cluster, run the following to validate the connection to the cluster

`kubectl get nodes`

This should return information regarding the nodes that were created in your EKS cluster.

# Deployment
In this step, you will deploy the Docker containers for the frontend web application and backend API applications in their respective pods.

Recall that while splitting the monolithic app into microservices, you used the values saved in the environment variables, as well as AWS CLI was configured locally. Similar values are required while instantiating containers from the Dockerhub images.

ConfigMap: Create env-configmap.yaml, and save all your configuration values (non-confidential environments variables) in that file.

Secret: Do not store the PostgreSQL username and passwords in the env-configmap.yaml file. Instead, create env-secret.yaml file to store the confidential values, such as login credentials. Unlike the AWS credentials, these values do not need to be Base64 encoded.

Secret: Create aws-secret.yaml file to store your AWS login credentials. Replace ___INSERT_AWS_CREDENTIALS_FILE__BASE64____ with the Base64 encoded credentials (not the regular username/password).

Mac/Linux users: If you've configured your AWS CLI locally, check the contents of ~/.aws/credentials file using cat ~/.aws/credentials . It will display the aws_access_key_id and aws_secret_access_key for your AWS profile(s). Now, you need to select the applicable pair of aws_access_key from the output of the cat command above and convert that string into base64 . You use commands, such as:
## Use a combination of head/tail command to identify lines you want to convert to base64
## You just need two correct lines: a right pair of aws_access_key_id and aws_secret_access_key
```bash
cat ~/.aws/credentials | tail -n 5 | head -n 2
## Convert 
cat ~/.aws/credentials | tail -n 5 | head -n 2 | base64
```
 * **Windows users:** Copy a pair of *aws_access_key* from the AWS credential file and paste it into the encoding field of this third-party website: https://www.base64encode.org/ (or any other). Encode and copy/paste the result back into the *aws-secret.yaml*  file.

Deployment configuration: Create deployment.yaml file individually for each service. While defining container specs, make sure to specify the same images you've pushed to the Dockerhub earlier. Ultimately, the frontend web application and backend API applications should run in their respective pods.

Service configuration: Similarly, create the service.yaml file thereby defining the right services/ports mapping.

Once, all deployment and service files are ready, you can use commands like:

```bash
## Apply env variables and secrets
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml
## Deployments - Double check the Dockerhub image name and version in the deployment files
kubectl apply -f backend-feed-deployment.yaml
## Do the same for other three deployment files
## Service
kubectl apply -f backend-feed-service.yaml
## Do the same for other three service files
Make sure to check the image names in the deployment files above.
```

Connect to the Kubernetes Services to Access the Application
If the deployment is successful, and services are created, there are two options to access the application:

**Port Forwarding:** You can forward a local port to a port on the "frontend" pod, as explained [here](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/#forward-a-local-port-to-a-port-on-the-pod).

**Expose External IP:** You can expose the "frontend" deployment using a Load Balancer's External IP.

Expose External IP
Refer to this [tutorial](https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/) to expose an External IP address of the frontend service.
```bash
## Check the deployment names and their pod status
kubectl get deployments
## Create a Service object that exposes the frontend deployment
## The command below will ceates an external load balancer and assigns a fixed, external IP to the Service.
kubectl expose deployment frontend --type=LoadBalancer --name=publicfrontend
## Repeat the process for the *reverseproxy* deployment. 
## Check name, ClusterIP, and External IP of all deployments
kubectl get services 
kubectl get pods # It should show the STATUS as Running

Make sure to repeat the process for the reverseproxy deployment.

Update the Environment Variables and Re-Deploy the Application
Once both the services - frontend and reverseproxy - have an External IP, change the API endpoints in the following places locally.

Update udagram-frontend/src/environments/environment.ts file - Replace the keyword localhost in the http://localhost:8080/api/v0 string with the External-IP of the reverseproxy deployment. For example,
## Assuming http://ae0c61849655c46e581aa91d3c03386d-513419455.us-east-1.elb.amazonaws.com is the External-IP of the *reverseproxy* service.
apiHost: 'http://ae0c61849655c46e581aa91d3c03386d-513419455.us-east-1.elb.amazonaws.com:8080/api/v0'
Here, we are using the External-IP to connect the frontend to the reverseproxy.

Update udagram-frontend/src/environments/environment.prod.ts file in the same way as done for the environment.ts file.

Build a new frontend image, and push it to the Dockerhub. While building a new image, it is recommended to use a different tag each time, as shown in the example below:

## Run these commands from the /udagram-frontend directory
docker build . -t [Dockerhub-username]/udagram-frontend:v6
docker push [Dockerhub-username]/udagram-frontend:v6
Next, re-deploy the new frontend image to the k8s cluster. You will have to update the image tag in the frontend-deployment.yaml file.
## Run these commands from the /udagram-deployment directory
## Rolling update the containers of "frontend" deployment
kubectl set image deployment frontend frontend=[Dockerhub-username]/udagram-frontend:v6
Check your deployed application at the External IP of your publicfrontend service.

Accessing your deployed application
Accessing your deployed application

Note: There can be multiple ways of setting up the deployment in the k8s cluster. As long as your deployment is successful, and fulfills Project Rubric(opens in a new tab), you are good go ahead!

Troubleshoot
Use this command to see the STATUS of your pods:
kubectl get pods
kubectl describe pod [pod-name]
## An example:
## kubectl logs backend-user-5667798847-knvqz
## Error from server (BadRequest): container "backend-user" in pod "backend-user-5667798847-knvqz" is waiting to start: trying and failing to pull image
In case of ImagePullBackOff or ErrImagePull or CrashLoopBackOff, review your deployment.yaml file(s) if they have the correct image path and environment variable names.

Check if the backend pods are experiencing CrashLoopBackOff due to an insufficient memory error. If yes, then you can increase the memory limits as shown in this example(opens in a new tab).
kubectl get pods
kubectl logs [pod-name] -p
## Once you increase the memory, check the updated deployment as:
kubectl get pod [pod-name] --output=yaml
## You can autoscale, if required, as
kubectl autoscale deployment backend-user --cpu-percent=70 --min=3 --max=5
```
Look at what's there inside the running container. Open a Shell to a running container as:

`kubectl get pods`

## Assuming "backend-feed-68d5c9fdd6-dkg8c" is a pod
```bash
kubectl exec --stdin --tty backend-feed-68d5c9fdd6-dkg8c -- /bin/bash
## See what values are set for environment variables in the container
printenv | grep POST
## Or, you can try "curl <cluster-IP-of-backend>:8080/api/v0/feed " to check if services are running.
## This is helpful to see is backend is working by opening a bash into the frontend container
```
When you are sure that all pods are running successfully, then use developer tools in the browser to see the precise reason for the error.
If your frontend is loading properly, and showing Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null,"headers":{}},"status":0,"statusText":"Unknown Error"...., it is possibly because the environment.ts file has incorrectly defined the ‘apiHost’ to whom forward the requests.

If your frontend is not not loading, and showing Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null,"headers":{}},"status":0,"statusText":"Unknown Error", .... , it is possibly because URL variable is not set correctly.

In the case of Failed to load resource: net::ERR_CONNECTION_REFUSED error as well, it is possibly because the URL variable is not set correctly.


## Kubernetes pods are deployed properly
kubectl get pods 
## Kubernetes services are set up properly
kubectl describe services
## You have horizontal scaling set against CPU usage
kubectl describe hpa



## Logging
Use logs to capture metrics. This can help us with debugging.

`kubectl logs <your pod name>`

## Clean up
Remove AWS resources so that yo don't accrue unnecessary charges.

Delete the EKS cluster.
Delete the S3 bucket and RDS PostgreSQL database

#### Environment Script
A file named `set_env.sh` has been prepared as an optional tool to help you configure these variables on your local development environment.
 
We do _not_ want your credentials to be stored in git. After pulling this `starter` project, run the following command to tell git to stop tracking the script in git but keep it stored locally. This way, you can use the script for your convenience and reduce risk of exposing your credentials.
`git rm --cached set_env.sh`

Afterwards, we can prevent the file from being included in your solution by adding the file to our `.gitignore` file.

### 1. Database
Create a PostgreSQL database either locally or on AWS RDS. The database is used to store the application's metadata.

* We will need to use password authentication for this project. This means that a username and password is needed to authenticate and access the database.
* The port number will need to be set as `5432`. This is the typical port that is used by PostgreSQL so it is usually set to this port by default.

Once your database is set up, set the config values for environment variables prefixed with `POSTGRES_` in `set_env.sh`.
* If you set up a local database, your `POSTGRES_HOST` is most likely `localhost`
* If you set up an RDS database, your `POSTGRES_HOST` is most likely in the following format: `***.****.us-west-1.rds.amazonaws.com`. You can find this value in the AWS console's RDS dashboard.


### 2. S3
Create an AWS S3 bucket. The S3 bucket is used to store images that are displayed in Udagram.

Set the config values for environment variables prefixed with `AWS_` in `set_env.sh`.

### 3. Backend API
Launch the backend API locally. The API is the application's interface to S3 and the database.

* To download all the package dependencies, run the command from the directory `udagram-api/`:
    ```bash
    npm install .
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/api/v0/feed` in your web browser to verify that the application is running. You should see a JSON payload. Feel free to play around with Postman to test the API's.

### 4. Frontend App
Launch the frontend app locally.

* To download all the package dependencies, run the command from the directory `udagram-frontend/`:
    ```bash
    npm install .
    ```
* Install Ionic Framework's Command Line tools for us to build and run the application:
    ```bash
    npm install -g ionic
    ```
* Prepare your application by compiling them into static files.
    ```bash
    ionic build
    ```
* Run the application locally using files created from the `ionic build` command.
    ```bash
    ionic serve
    ```
* You can visit `http://localhost:8100` in your web browser to verify that the application is running. You should see a web interface.

## Tips
1. Take a look at `udagram-api` -- does it look like we can divide it into two modules to be deployed as separate microservices?
2. The `.dockerignore` file is included for your convenience to not copy `node_modules`. Copying this over into a Docker container might cause issues if your local environment is a different operating system than the Docker image (ex. Windows or MacOS vs. Linux).
3. It's useful to "lint" your code so that changes in the codebase adhere to a coding standard. This helps alleviate issues when developers use different styles of coding. `eslint` has been set up for TypeScript in the codebase for you. To lint your code, run the following:
    ```bash
    npx eslint --ext .js,.ts src/
    ```
    To have your code fixed automatically, run
    ```bash
    npx eslint --ext .js,.ts src/ --fix
    ```
4. `set_env.sh` is really for your backend application. Frontend applications have a different notion of how to store configurations. Configurations for the application endpoints can be configured inside of the `environments/environment.*ts` files.
5. In `set_env.sh`, environment variables are set with `export $VAR=value`. Setting it this way is not permanent; every time you open a new terminal, you will have to run `set_env.sh` to reconfigure your environment variables. To verify if your environment variable is set, you can check the variable with a command like `echo $POSTGRES_USERNAME`.
