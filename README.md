# react-native-0815-starter
This repo can be used as a template to build your own react native app

## Starting the app locally 

`cd app`

`yarn start`

## CI/CD Configuration (Github actions)

You need to configure the following environment variables in github actions in order to make deployment on google cloud possible

## Technical stack

### Frontend
- UI kitten as UI Library
- Expo platform to ease react native development processes
- React navigation
- 

### Backend
- Golang
- Gin framework as REST server
- deployed on google cloud platform

### Github actions
- Github actions for CI/CD deployment

### Required env variables

Look into server/template.app.yaml to see which environment variables are required for the deployment. Additionally you need to configure the following environment variables: 

- EXPO_TOKEN (obtain on [expo](https://expo.dev)) 
- GCP_CREDENTIALS (see authorization [over here](https://github.com/google-github-actions/deploy-appengine#authorization))
- GCP_PROJECT the id of your google cloud platform project
