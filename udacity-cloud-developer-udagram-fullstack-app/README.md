# Udagram 

Udagram is a simple cloud application developed along side the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. The Simple Frontend
A basic Ionic client web application which consumes the RestAPI Backend. 
2. The RestAPI Backend a Node-Express server which can be deployed to a cloud service.
3. The Image Filtering Microservice the final project for the course. It is a Node-Express application which runs a simple script to process images.
***

# Handling Secrets with Environment Variables

## Environment Variables

1. Shell - Linux/Mac Users
For Unix/Linux/Mac operating systems, a shell is a command-line program that accepts users' commands and executes those commands on the underlying kernel. Each command has a specific job to perform.

There are multiple shells available. The default shell for (most) Linux systems is the bash shell. Other examples are ksh, tcsh, and zsh. The default shell for macOS 10+ is .zsh.

Your default shell boots when you open a terminal, which allows you to execute commands.

2. Environment Variables - Linux/Mac Users
Assume you store the user-specific secrets, such as username, password, or private key, into a simple file. It might not be a safe approach because all the sensitive information may become public if you put that information on Github/any other Version Control System. User-specific secrets, visible publicly, are never a good thing.

Here comes the role of Environment variables in this scenario. Environment variables are pretty much like standard variables, in that they have a name and hold value. The environment variables only belong to your local system and won't be visible when you push your code to a different environment like Github.

a. The .env file
The .env file is one of the hidden files in which you can store your choice of environment variables. The variables stored in this file are your individual working environment variables. Note that the environment variables that are stored in the .env file override the variables set in the /etc/environment file, that is shared by all users of that computer.
You will need to follow the steps below to configure environment variables in a .env file:

```shell
# Install environment variables package -
npm install dotenv --save

# This will allow you to use the environment variables that you'll set in a new file.

# Create a new .env file in the root of your project. Fill the .env file with your new variables, and their corresponding values. For example:

POSTGRES_USERNAME = yourUsername
POSTGRES_PASSWORD = yourpassword
AWS_REGION = yourAWSRegion
AWS_PROFILE=awsProfileName

# Require the package in your server - Add the following code on top of the server.ts file

require('dotenv').config();

# Use your environment variables - If you want to refer the environment variables that you just saved in the .env file, anywhere in the code, try putting a prefix process.env. in front of the variable name. For example, 

process.env.POSTGRES_USERNAME 

# will fetch you the value stored in it.

# Add .env to your .gitignore - You wouldn't want your .env file to be available publicly in the project Github repository. For this reason, go to the .gitignore file in the project root, and add and entry .env to it. It will make sure that you don't push our environment variables to Github!

b. The process.env file
The process.env file is a default file that stores the variables for the current terminal environment. When you run the following command, it will store the POSTGRES_USERNAME to the current terminal environment:

export POSTGRES_USERNAME = yourUsername

# By default, the Node is accessing the same set of variables that are defined in your process.env file.

# c. Bash Profile - .profile file
# You won't want to export the user-specific variables every time you'll log in to your system, and do not want to override the variables set in the root level /etc/environment file. The solution is to store the new variables either in .profile,.bashrc or .zshrc file, depending on your shell. These are the files that the shell executes even before you type your first command to it. Note that every user of the computer has its own .profile file.

# When you put

export AWS_PROFILE=awsProfileName

# inside the .profile file, it will run this command before you start firing commands in your shell.

# Usually, the bash profile is found at ~/.profile, where ~ represents your current logged in user's home directory. Keep in mind the . preceding profile means this file will be hidden.

# If you wish to instruct your Node to execute the .profile file anytime, you can run the following command:

source ~/.profile

# d. Using the Manual Page - man command
# Most Bash commands in the terminal give you instructions on how to use them when you type man <command> where <command> could be any CLI command. For example, typing man bash into the terminal will give you the manual page for bash.

# The INVOCATION section of this man page will give you some hints to where bash looks for profiles when starting.

# 3. Environment Variables - Windows Users
# Windows has the same concept of variable stored at the OS level to use within and across applications. Windows has two types of Environment Variables:

# User Environment Variables which are accessible only to the currently logged in user
# System Environment Variables which are available all users on the machine
# Setting Windows Environment Variables
# Environment variables are set on Windows using a GUI (Graphical User Interface). On Windows 10, this can be found by:

# From the start menu, right-click the Computer icon
# Select Properties
# Select Advanced System Settings on the left
# In the new window, click Environment Variables
# Use the New... and Edit... buttons to set and modify your variables
# You can follow this handy guide(opens in a new tab) for your flavor of Windows.

# 4. Run Linux Environment on Windows
# Windows OS also has a concept of the shell. The default shell in Windows is the command-line tool Cmd.exe. There is another shell available in Windows 7 SP1and above, PowerShell(opens in a new tab). PowerShell is primarily used for Windows system administration. Neither CMD nor PowerShell can run bash, ssh, git, apt, or any Linux commands by default.

# The solution is to use either of the options below:

# Option 1 - Windows Subsystem for Linux
# Windows Subsystem for Linux(opens in a new tab) (WSL) - WSL allows us to run Linux environment, including most command-line tools, utilities, and applications, from the Windows Command Prompt (CMD). You can even mix the Linux and Windows commands after installing WSL. Refer to the installation instructions here(opens in a new tab) to install WSL on Windows.

# The next step is to install and run a Linux distribution parallelly on WSL. There are multiple choices for installing - Ubuntu, OpenSUSE, Debian, and many more. If you have no preference, you can install Ubuntu on Windows(opens in a new tab) App, and proceed as mentioned in the installation instructions above.

# Option 2 - Git Bash on Windows
# Git is an open-source distributed Version Control System (VCS). Github is a repository hosting and version control service, where you can store, share, or download the repository content in collaboration with multiple contributors. Git provides a Unix style command-line tool called Git for Windows(opens in a new tab) to help users work with Github repositories. Once you download and install Git for Windows, it can be run either in CMD or a GUI.

# Git Bash(opens in a new tab) is a command-line tool by default included in Git for Windows. Besides running Git commands, Git Bash allows users to run Linux/Bash commands as well.

```
# Deploying your system

Using AWS Elastic Beanstalk
Elastic Beanstalk is a powerful Development Operations tool (Dev Ops) to deploy your code to AWS services and infrastructure with minimal effort.

## EB CLI

We'll be using the Command Line Interface to work with Elastic Beanstalk. This will provide us with a set of commands to create new applications and deploy code to these systems. Before continuing, you must install the EB CLI by reading the [AWS Doc Instructions for Install](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html) for your platform.

***************************************
eb init a new application and eb create a new environment to deploy the image-filter service! Don't forget you can use eb deploy to push changes.

**************************************

After running the eb init command and following the guided setup will create a new directory in our project named .elasticbeanstalk. Within this configuration file, there is a configuration file named config.yml. This is the set of instructions Elastic Beanstalk will follow when provisioning your AWS infrastructure and deploying your code.

# Generating SSH Keypairs
Public-Key Cryptography is a method to encrypt and decrypt authentication information for connecting to your resources in the cloud. The keys you generate replace your password, but they should be treated as sensitive data that would grant anyone who holds them access to your running instance. AWS offers a great guide on [how to create Key Pairs for your EC2 Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html).

Creating Deployable Build Archives and Deploying
Now that you have a running Beanstalk instance, we must package our code into a format that is usable by Elastic Beanstalk. We do this by transpiling our TypeScript into JavaScript and then zipping the contents into a single file which we can upload. NPM allows us to define simple script commands in the package.json file. As described in the video, we've included the build command to perform these steps for us.

# Note for Windows Users

Unlike Unix (Linux and Mac), The Windows Environment does not have a native CLI command for zip. Instead, you must install a utility called UnixUtils to support this functionality. 

After running npm run build to transpile and package our code into a zip, we need to configure Elastic Beanstalk to use this build archive. This is accomplished with the following addition to the .easticbeanstalk/config.yml configuration file:

```javascript
deploy:
	artifact: ./www/Archive.zip
```

Once built, you can deploy changes to the elastic beanstalk instance by running:

`eb deploy`

This will upload the new code and restart the running instances!

## Setting Environment Variables in Elastic Beanstalk
Just like our local code, we'll need to access certain variables from our system within our Node server. We can set these variables through the AWS Console.


##  Clarifying Profiles

When we're working locally, we need to specify which AWS profile to use (a review on named profiles can be found here(opens in a new tab)). When we're deploying to an AWS ElasticBeanstalk instance, the profile will be implicitly set by the instance. We can use the logic control to implicitly not specify these AWS credentials in this deployed state.

```javascript
## ./src/aws.ts
//Configure AWS
if(c.aws_profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
  AWS.config.credentials = credentials;
}

```

**Update Notification:** The AWSElasticBeanstalkFullAccess IAM policy has been retired; so use the new [AdministratorAccess-AWSElasticBeanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.iam.managed-policies.html) managed policy

## Examples of Good Security Policies

[NPM](https://www.npmjs.com/policies/security)
[Nylas](https://www.nylas.com/security/)
[AWS](https://aws.amazon.com/security/)

**Note:** in the config/config.ts file we see commented plaintext variables. It is better practice to store these variables as environment variables accessed by process.env.VARIABLE_NAME. 

JWT secret is a secret. This allows the server to encrypt and decrypt JWTs. If it is compromised, the person with the secret can generate valid JWTs with whatever payload they want. Each environment should have it's own secret and care should be taken to ensure it remains secret.

# Scaling and Fixing
Once the applications are deployed to a cloud platform, you'll quickly run into situations where something isn't working or your users are having a less than optimal experience. 

- Balance the load on your applications in a cloud environment using the AWS Load Balancing Service

- Autoscale with scaling tools

- Use CloudFront CDN on the frontend to deliver content to users fast and efficiently.

Amazon Web Services' Route53 (flavor of DNS) allows you to set up routing profiles for your domain names and direct traffic to services inside of and external to AWS.

[Route53 developer guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)

AWS offers a detailed article on all of the options to scale your elastic beanstalk deployments: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environments-cfg-autoscaling-triggers.html

AWS offers a great resource describing scaling of RDS: https://aws.amazon.com/blogs/database/scaling-your-amazon-rds-instance-vertically-and-horizontally/


# Monitoring, Testing, and Debugging After Deployment

## Automatic Bug Reporting

Use [Sentry](https://sentry.io/) to automatically catch errors and provide a stack trace to developers so we can quickly find and fix bugs!

## Testing Concurrency

Test how your cloud will react and perform under high load. [Siege](https://www.joedog.org/siege-manual/) is a lightweight CLI tool to create a large number of concurrent requests to simulate this kind of situation. It's strongly encouraged to read the manual and, if you're up for it, try issuing some siege tests on your local development RestAPI server.

WARNING! Amazon Web Services isn't really "cool" with load testing or other forms of aggressive testing like penetration testing on their platform. Be cautious before running these kinds of tests on AWS infrastructure to prevent your local IP from being blocked or your services being suspended.


# Monitoring the State of the System

[CloudFlare](https://www.cloudflare.com/) for improved DNS with monitoring and failover capabilities.
[DataDog](https://www.datadoghq.com/product/) for stack performance and health status.
AWS also has native tools to help monitor performance called [CloudWatch](https://aws.amazon.com/cloudwatch/).
