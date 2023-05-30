Perfect Pet - Pet Finder 

1. Purpose: 
The purpose of this website is to provide users with their top 3 best 'pet' matches based on their answers to 5 simple questions.
- This will help users decide which breed of cat/dog to get for themselves based on their lifestyle and different breeds temperaments.

2. Main code steps:
The code retrieves data from the dog and cat breed APIs: 
https://api.thedogapi.com/v1/breeds, 
https://api.thecatapi.com/v1/breeds.

It extracts the temperaments of dogs and cats from the retrieved data.
It initialises an empty scoredPets array and assigns a score of 0 to each pet.
The code increments the score of pets that have matching temperaments based on defined arrays of temperaments i.e. 'temperaments good for families' and answers to the questions
The code sorts the scoredPets array based on the scores and selects the top 3 pets.
It generates HTML cards for the top 3 pets and displays a card for each on the page.

3. Credits: 
For this project, we use the following CDNs: 
- Bootstrap
- Font-Awesome




