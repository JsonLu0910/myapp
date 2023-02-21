# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
Testing for Jenkins

## Deploy React Application in Jenkins

Add new item in Jenkins, and choose the type as Pipeline

In the General section, click on the GitHub Project and paste your github url.

In the Build Triggers section, click on the GitHub hook trigger for GITScm polling.

In the Pipeline section add the following scripts to run the action of deployment
###
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git "https://github.com/JsonLu0910/myapp.git"
                bat "npm install"
            }
        }
       
         stage('Deliver') {
            steps {
                bat "npm run start"
            }
        }
    }
}

Save it and apply
## Install Blue Ocean

Go to the manage jenkins and click on the manage jenkins, next search for the node and blue ocean in available plugins.

## Select the node version

Go to the manage jenkins and click on the global tool configuration.

Untick the option of Install automatically.

Go to your pc and search for the file path of nodejs

Next copy the file path and paste it in the field of Installation directory.

Click on apply and save. 



