# HavocAI Project

## Project Outline

MVP: Build a simple react/vite app and have a menu where a user can select avoid zones, geo fences, or terminal areas. When a user is done drawing their shape/s, I would output the coordinates as GeoJSON either in the console.

Extension 1: Add option to menu to name and save zones that are created.
Extension 2: Add saved zones button to menu - clicking it would show their previously saved zones. Selecting a saved zone would apply that zone to the map
Extension 3: When a user switches types of polygon or starts to draw a new one, a modal will pop up, asking the user what they want to do with their previously drawn shape.

Additional Extension: export drawn zones as a CSV

## Deployed App
[https://havocai-project.onrender.com/](https://havocai-project.onrender.com/)
- To start drawing a polygon, select one of the zones on the bottom of the side bar
- To stop drawing a polygon, right click most recent point or hit enter
- To see coordinates, either download a CSV or open your dev console and the information for your polygon will be printed. The CSV only displays the points, while the dev console return has the whole GeoJSON object. 

## To Run
- git clone the repo locally
- Run ```npm i``` in your CLI
- If you want to run locally, you need to add an API token from [Mapbox](https://www.mapbox.com/). Once you have your token, create a .env file in the root directory and create a variable named ```VITE_MAPBOX_KEY``` with the value being your Mapbox API token.
- Run ```npm run dev``` and in the browser, navigate to [http://localhost:5173/](http://localhost:5173/) to interact with the application
- To run unit tests, enter ```npm run test``` in your CLI

## Current Issues
- Currently unable to interact/edit a saved zone when you've clicked on the zone from the saved zones list
- If a zone is saved, but the user moves it & saves again, they’ll keep the same ID, but use the saved name of the zone to differentiate between the two; would prefer for the ID to change
- Unable to change the color of the zones using the built in methods for Mapbox Draw

## Possible Future Iterations
- Solve the issues that exist
- Able to change the map’s viewstate(latitude & longitude)
- Show the latitude and longitude when map is created
- Show the latitude and longitude when saved map is displayed
- Add additional unit tests, and add integration and end to end testing

## Changes with a Backend/API
This app is run completely on the client side, and I would change the handling of the coordinates if I were to use a backend. These changes would be:

- All saved features would be saved on the BE. Wherever we are adding, removing, or accessing Saved Zones would be API calls to retrieve that information
- Retrieving a user's Saved Zones when first going to a page
- Currently the app is saving zones based on the names given to them, not the id. In the future, I would prefer to use ID to do so, bbut this ties into the issue in `Current Issues` where editing a polygon keeps the same ID instead of creating a saved ID.



