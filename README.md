# Getting Started

To get started, you need put the database information in hidden.json 

## Install and run app locally

1. Install all dependencies using npm ``` npm install ```

2. Run the server ``` npm start ```

3. Finally run the app with npm ``` npm start-front ```

4. That's it! Your app is run on http://localhost:3000

## Deployment
1. Compile the app with ``` npm buld ```
2.  Run the server ``` npm start ```, the server will be in charge of providing the app


## Available Scripts

In the project directory, you can run:

### `npm start`

Launches the server app in the port 8080.

### `npm start-front`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm test`

Launches the test runner in the interactive watch mode.\


## API Documentation

This app is purely based on RESTful API, therefore you should expect JSON response with the request you make.

| API Route | Method | Context                                                                                                                                                                                                          | Output | Example request                                      |
|-------------------------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------------------------------------------------------|
| /weather | GET    | Returning all the weather data | JSON   | https://adidas-weather.herokuapp.com/weather


##Hosting
[Heroku-App](https://adidas-weather.herokuapp.com/)

## Post-Processing CSS
Create React App minifies your CSS and adds vendor prefixes to it automatically through Autoprefixer so you don’t need to worry about it.

Support for new CSS features like the all property, break properties, custom properties, and media query ranges are automatically polyfilled to add support for older browsers.

You can customize your target support browsers by adjusting the browserslist key in package.json according to the Browserslist specification.
https://create-react-app.dev/docs/post-processing-css/


## Testing
React has tools to launch test  ``` npm buld ```.
For testing automation can be integrated with the heroku pipeline,

When a specific branch branch has been pushed, the tests will be launched automatically and if they are successful, the application will be deployed.