# Imdb But Based
Imdb But Based is a website that serves as an alternative frontend to the popular movie site IMDB. It uses the IMDB and OMDB APIs to provide users with movie search and details.

# Installation
To run the project locally, you will need to have Node.js and NPM installed on your machine.

Clone this repository using `git clone https://github.com/S1monlol/Imdb-but-based.git`  
Change into the project directory using `cd imdb-but-based`  
Install dependencies using `npm install`  
Set the API_KEY environment variable with your OMDB API key  
Start the server using `npm start`  
Open http://localhost:8080 in your web browser to access the site  

# Docker Install
To run the project using Docker, you will need to have Docker installed on your machine.

Clone this repository using `git clone https://github.com/S1monlol/Imdb-but-based.git`  
Change into the project directory using `cd imdb-but-based`  
Build the Docker image using `docker build -t imdb-but-based .`  
Set the API_KEY environment variable with your OMDB API key in .env    
Run the Docker container using `docker run -p {PORT}:8080 --env-file .env imdb-but-based`  
Open http://localhost:{PORT} in your web browser to access the site  

# Usage  
Once you have the website running, you can use the search bar on the homepage to search for movies. The search results will be displayed on the same page. Clicking on a movie title will take you to a details page with more information about the movie  

# Contributing
If you find any issues or have any suggestions for the project, feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.
