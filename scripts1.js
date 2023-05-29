const temperamentsGoodForFamilies = [
    // dogs
    "Affectionate",
    "Amiable",
    "Benevolent",
    "Cheerful",
    "Companionable",
    "Cooperative",
    "Devoted",
    "Friendly",
    "Fun-loving",
    "Gentle",
    "Good-natured",
    "Good-tempered",
    "Happy",
    "Lively",
    "Lovable",
    "Loving",
    "Merry",
    "Patient",
    "Playful",
    "Responsive",
    "Sociable",
    "Sweet-tempered",
    "Tolerant",
    "Trusting",
    "Trustworthy",
    //cats
    "Affectionate",  
    "Gentle",  
    "Loyal",  
    "Friendly",  
    "Fun-loving",  
    "Playful",  
    "Social",  
    "Loving",  
    "Sweet",  
    "Relaxed",  
    "Patient",  
    "Peaceful",  
    "Devoted",  
    "Sweet-tempered",  
    "Outgoing",  
    "Sociable"
];

const temperamentsGoodForApartments = [
    //dogs
    'Adaptable',
    'Alert',
    'Calm',
    'Cat-like',
    'Composed',
    'Independent',
    'Quiet',
    'Reserved',
    'Self-assured',
    'Self-confidence',
    'Stable',
    'Steady',
    'Unflappable',
    'Watchful',
    //cats
    "Calm", 
    "Quiet", 
    "Relaxed", 
    "Easygoing",
    "Sedate",
    "Easy",
    "Going",
    "Adaptable",
    "Shy"
];

const temperamentsGoodWithOtherPets = [
    //dogs
    'Adaptable',
    'Affectionate',
    'Amiable',
    'Cooperative',
    'Friendly',
    'Gentle',
    'Good-natured',
    'Good-tempered',
    'Loyal',
    'Patient',
    'Playful',
    'Tolerant',
    'Trusting',
    'Trustworthy',
    //cats
    "Social",
    "Friendly",
    "Playful",
    "Loyal",
    "Affectionate",
    "Sociable",
    "Sweet-tempered"
];

const temperamentsNeedsActiveLifestyle = [
    //dogs
    'Active',
    'Adventurous',
    'Agile',
    'Athletic',
    'Energetic',
    'Even',
    'Excitable',
    'Fast',
    'Fearless',
    'Feisty',
    'Lively',
    'Spirited',
    'Spunky',
    'Vigilant',
    'Vocal',
    'Wild',
    'Willed',
    'Willful',
    //cats
    "Active",
    "Energetic",
    "Agile",  
    "Fun-loving",  
    "Lively",  
    "Highly interactive",  
    "Mischievous",  
    "Adventurous",  
    "Tenacious",  
    "Inquisitive"
];

const temperamentsNeedTime = [
    //dogs
    'Affectionate',
    'Attentive',
    'Composed',
    'Devoted',
    'Diligent',
    'Eager',
    'Loving',
    'Mischievous',
    'Obedient',
    'Playful',
    'Responsive',
    'Sociable',
    'Thoughtful',
    'Trainable',
    //cats
    "Interactive",
    "Affectionate",
    "Loving",
    "Highly intelligent",
    "Expressive",
    "Talkative",
    "Trainable",
    "Clever",
    "Inquisitive",
    "Sociable"
];

let answers = {};

// Special handling for first question because it's an image
document.getElementById('q0').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        selectedOption = event.target.getAttribute('value');
        console.log(selectedOption);
        answers['answerq0'] = selectedOption;
    }
});

function handleNextQuestion(answerId, name) {
    const checkedRadioButton = document.querySelector(`input[name="${name}"]:checked`);
    const answer = checkedRadioButton.value;
    answers[answerId] = answer;
    console.log(answer);
    nextQuestion();
}

const questions = document.querySelectorAll('.question');
let currentQuestionIndex = 0;

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        questions[currentQuestionIndex].classList.remove('active');
        currentQuestionIndex++;
        questions[currentQuestionIndex].classList.add('active');
    } else { // Finished answering
        questions[currentQuestionIndex].classList.remove('active');
        scorePets(answers);
    }
}

// ---- Step 0 - Get all data ----
// Get the dogs, cats, the cat tempraments, dog tempraments, question answers, etc. and store them as constants here

const dogsPromise = fetch('https://api.thedogapi.com/v1/breeds').then((response) => response.json()).then((data) => { // console.log(data);
    return data;
});

const catsPromise = fetch('https://api.thecatapi.com/v1/breeds').then((response) => response.json()).then((data) => { // console.log(data)
    return data;
    
});

// Output the answers to the console or perform any other operations with them
function scorePets(answers) {
    console.log('answers', answers);
    Promise.all([dogsPromise, catsPromise]).then(([dogs, cats]) => {

        function extractDogTemperaments(dogs) {
            const extractedDogTemperaments = dogs.map(item => item.temperament); // Iterate through and return the temperament for each item
            const extractedDogTemperamentsString = extractedDogTemperaments.join(" "); // Join the temperament array into a single string
            const extractedDogTemperamentsSplitString = extractedDogTemperamentsString.split(/\b(?!-)\W+\b/g); // Split the string into an array of individual words
            return extractedDogTemperamentsSplitString;
        }

        const dogsTemperaments = Array.from(new Set(extractDogTemperaments(dogs))); // to get the unique ones
        console.log(dogsTemperaments);

        function extractCatTemperaments(cats) {
            const extractedCatTemperaments = cats.map(item => item.temperament); // Iterate through and return the temperament for each item
            const extractedCatTemperamentsString = extractedCatTemperaments.join(" "); // Join the temperament array into a single string
            const extractedCatTemperamentsSplitString = extractedCatTemperamentsString.split(/\b(?!-)\W+\b/g); // Split the string into an array of individual words
            return extractedCatTemperamentsSplitString;
        }

        const catsTemperaments = Array.from(new Set(extractCatTemperaments(cats))); // to get the unique ones
        console.log(catsTemperaments);

        // now we have the adjectives that will give dogs points

        // ---- Step 1 - Initialise an empty scored pets table ----
        let scoredPets = [];

        if (answers.answerq0 === "dog") {
            scoredPets = dogs;
        } else if (answers.answerq0 === "cat") {
            scoredPets = cats;
        } else {
            scoredPets = [
                ...dogs,
                ...cats
            ];
        } scoredPets = scoredPets.map((pet) => {
            pet.score = 0;
            return pet;
        })

        console.log("step 1 output", scoredPets)

        // ---- Step 2 ------------------------------------------
        if (answers.answerq1 === "yesFamily") {
            scoredPets = scoredPets.map((pet) => {
                if (!pet.temperament) {
                    return pet;
                };
                const petsTemperaments = pet.temperament.split(", ");
                petsTemperaments.forEach((petTemperament) => {
                    const isGoodForFamily = temperamentsGoodForFamilies.includes(petTemperament);
                    if (isGoodForFamily) {
                        pet.score ++;
                    }
                })
                return pet;
            })
        }

        if (answers.answerq2 === "apartment") {
            scoredPets = scoredPets.map((pet) => {
                if (!pet.temperament) {
                    return pet;
                };
                const petsTemperaments = pet.temperament.split(", ");
                petsTemperaments.forEach((petTemperament) => {
                    const isGoodForApartment = temperamentsGoodForApartments.includes(petTemperament);
                    if (isGoodForApartment) {
                        pet.score ++;
                    }
                })
                return pet;
            })
        }

        if (answers.answerq3 === "otherPetsYes") {
            scoredPets = scoredPets.map((pet) => {
                if (!pet.temperament) {
                    return pet;
                };
                const petsTemperaments = pet.temperament.split(", ");
                petsTemperaments.forEach((petTemperament) => {
                    const isGoodWithOtherPets = temperamentsGoodWithOtherPets.includes(petTemperament);
                    if (isGoodWithOtherPets) {
                        pet.score ++;
                    }
                })
                return pet;
            })
        }

        if (answers.answerq4 === "exerciseYes") {
            scoredPets = scoredPets.map((pet) => {
                if (!pet.temperament) {
                    return pet;
                };
                const petsTemperaments = pet.temperament.split(", ");
                petsTemperaments.forEach((petTemperament) => {
                    const needsActiveLifestyle = temperamentsNeedsActiveLifestyle.includes(petTemperament);
                    if (needsActiveLifestyle) {
                        pet.score ++;
                    }
                })
                return pet;
            })
        }

        if (answers.answerq5 === "mostlyFree") {
            scoredPets = scoredPets.map((pet) => {
                if (!pet.temperament) {
                    return pet;
                };
                const petsTemperaments = pet.temperament.split(", ");
                petsTemperaments.forEach((petTemperament) => {
                    const needsActiveLifestyle = temperamentsNeedsActiveLifestyle.includes(petTemperament);
                    if (needsActiveLifestyle) {
                        pet.score ++;
                    }
                })
                return pet;
            })
        }
        console.log("step 2 output", scoredPets);

// To find the top 3, sort the pets in order of score (look up array sorting), and then take the first 3 (slice)
    
const sortedScoresPetsList = scoredPets.sort(function(a, b) {
    return b.score - a.score;
  });

const top3ScoresPetsList = sortedScoresPetsList.slice(0,3);

console.log(top3ScoresPetsList);

// add this to a new object e.g. const top3Pets
// const top3Pets = scoredPets.sort(...).slice(3);

function createCard (name, image, description, bred_for, temperament) { /*we need to clone the content to create a new instance of the template*/
    const template = document.getElementById('card-template').content.cloneNode(true);
    // we assign the card icon and title elements to a variable we can manipulate
    const cardCategoryIcon = template.querySelector('.card-category-icon');
    const cardTitle = template.querySelector('.card-title');
    // in the line below, we simply define that the text inside of this element is the title.
    cardTitle.innerText = name;
    template.querySelector('.card-img-top').src = image; // we use the template variable to define each element within it and store it in a new variable
    template.querySelector('.card-description').innerText = description || bred_for;
    template.querySelector('.card-origin').innerText = temperament;
    document.querySelector('#card-list').appendChild(template);
    // finally, we create the card by appending the template as a child of the '#card-list' element in the document.

    // and the following section is used to add the icons from "font-awesome". To use those, we need to add the CDN link of the library to the head of the document
    // to do so, we go through each category, using the switch statement
    switch (answers.answerq0) {
        case 'dog': cardCategoryIcon.innerHTML = '<i class="fas fa-dog"></i>';
            break;
        case 'cat': cardCategoryIcon.innerHTML = '<i class="fas fa-cat"></i>';
            break;
        default: cardCategoryIcon.innerHTML = '<i class="fas fa-box"></i>'; // in case there is an issue with the icons above, this icon will display by default
    }
};

top3ScoresPetsList.forEach((pet) => {
    createCard(pet.name, pet.image, pet.description, pet.bred_for, pet.temperament);
});

    });

    };

/*
scoredPets = scoredPets.map((pet) => {
    const isGoodForFaility = tempramentsGoodForFamiles.includes(pet.temrament) && userSelectedFamily;
    if (isGoodForFaility) {
        pet.score++;
    }
    return pet;
})





});

*/


/*
// e.g. const dogs = await getDogsPromise()
//      const dogTempraments = getDogTempraments(dogs)
//      const q1Answer = documents.get...
//      const tempramentsThatAreGoodForFamilies = [];
//      const tempramentsThatAreGoodForAppartments = [];
const dogs = await ... 
const didSelectCasts = ...

// ---- Step 1 - Initialise an empty scored pets table ----

let scoredPets = [];

// ---- Step 2 - For each question/answer, alter the scoredPets array ----
// E.g. for q1Answer, if dogs then add the dogs to the array, if cats then add the cats, if both then add both
// E.g. for q2Answer, if the temprament is good faimilies, then add +1 score the the matching mets in the scoredPets list

// Q1
if (didSelectDogs) {
    scoredPets = dogs;
} else if (didSelectedCats) {
    scoredPets = cats
} else {
    scoredPets = [...dogs, ...cats];
}

// Init scores as 0 to scored pets
scoredPets = scoredPets.map((pet) => {
    pet.score = 0;
    return pet;
})

// Q2
scoredPets = scoredPets.map((pet) => {
    const isGoodForFaility = tempramentsGoodForFamiles.includes(pet.temrament) && userSelectedFamily;
    if (isGoodForFaility) {
        pet.score++;
    }
    return pet;
})




// ---- Step 3 - Finds the top 2 pets ----
// Now you have a list of pets and their score
// To find the top 3, sort the pets in order of score (look up array sorting), and then take the first 3 (slice)
// add this to a new object e.g. const top3Pets
// const top3Pets = scoredPets.sort(...).slice(3);



// ---- Step 4 - Make cards from your top 3 pets and show on the screen ----
// 
*/
