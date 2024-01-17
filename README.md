# Color Generator React app

Web app that generates light and dark variations of a color. [Live Site](https://color-variations.netlify.app/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How The program works
The program generates 20 different colors of similar hues plus the rgb triplet provided as input for the 
program making 21. It does this by increasing and decreasing the values of each color component in the rgb triplet.

The program first checks for the biggest color in the rgb triplet input. We call this color the dominant color.

If the difference between the dominant color and all the other color components is less than 15 respectively.
We set the increment for the dominant color to 5% of 255 else we set it to 10% of 255. The increment of the
other color components is usually relative to the increment of the dominant color unless the dominant color 
has reached 255 and all the 21 colors haven't been generated.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
