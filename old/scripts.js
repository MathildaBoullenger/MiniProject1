// dogs


const dogsTemperaments= fetch('https://api.thedogapi.com/v1/breeds').then((response) => response.json()).then((data) => {
     console.log(data);
    // the output is called data instead of json()

    /* item.bred_for
                function extractPurposeD(data) {
                    return data.map(item => item.bred_for); // we iterate through and return the category for each item
                }
                const uniquePurposeD = Array.from(new Set(extractPurposeD(data)));
                console.log(uniquePurposeD)*/

    // item.temperament
    function extractTemperamentD(data) {
        const extractedTemperamentD = data.map(item => item.temperament); // Iterate through and return the temperament for each item
        const extractedTemperamentDString = extractedTemperamentD.join(" "); // Join the temperament array into a single string
        const extractedTemperamentDSplitString = extractedTemperamentDString.split(/\b(?!-)\W+\b/g); // Split the string into an array of individual words
        return extractedTemperamentDSplitString;
    }

    const uniqueExtractedWordsD = Array.from(new Set(extractTemperamentD(data))); // to get the unique ones
    console.log(uniqueExtractedWordsD)

    return uniqueExtractedWordsD;

});

// cats

const catsTemperaments= fetch('https://api.thecatapi.com/v1/breeds').then((response) => response.json()).then((data1) => {
    // console.log(data1);
    // the output is called data instead of json()

    // item.temperament
    function extractTemperamentC(data1) {
        const extractedTemperamentC = data1.map(item => item.temperament); // Iterate through and return the temperament for each item
        const extractedTemperamentCString = extractedTemperamentC.join(" "); // Join the temperament array into a single string
        const extractedTemperamentCSplitString = extractedTemperamentCString.split(/\b(?!-)\W+\b/g); // Split the string into an array of individual words
        return extractedTemperamentCSplitString;
    }

    const uniqueExtractedWordsC = Array.from(new Set(extractTemperamentC(data1))); // to get the unique ones
    console.log(uniqueExtractedWordsC);

    return uniqueExtractedWordsC;

});

function dogsScoring(uniqueExtractedWordsD, data) {
  const q0Select = document.getElementById('q0');
  const q1Select = document.getElementById('q1');

familyTemperamentsD = [
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
    "Trustworthy"
  ];

  return new Promise((resolve, reject) => {
    if (q0Select && q0Select.value === "dog" && q1Select && q1Select.value === "yesFamily") {
      const scoredDogs = []; // Array to store dogs that meet the criteria

      data.forEach((dog) => {
        const dogTemperaments = dog.temperament.split(", ");
        let score = 0; // Initialize score for each dog

        dogTemperaments.forEach((temperament) => {
            if (dogTemperaments.some((temperament) => familyTemperamentsD.includes(temperament))) {
                score++; // Increment score for each matching temperament adjective
              }
        });

        if (score > 0) {
          scoredDogs.push({ name: dog.name, score }); // Add the dog and its score to the scoredDogs array
        }
      });

      console.log("Scored Dogs:", scoredDogs);
      resolve(scoredDogs);
    } else {
      resolve([]); // Return an empty array if conditions are not met
    }
  });
}
   
// Combining dog and cat temperaments
Promise.all([dogsTemperaments, catsTemperaments])
  .then(([dogsResult, catsResult]) => {
    const combinedTemperaments = [...dogsResult, ...catsResult];
    console.log(combinedTemperaments);

    dogsScoring(dogsResult, dogsResult).then((scoredDogs) => {
      console.log("Scored Dogs:", scoredDogs);
    });

    //dogsScoring(dogsResult, "Dogs API Only");
    //catsScoring(catsResult, "Cats API Only");
    //combined;
});


/**
 */

// ---- Step 0 - Get all data ----
// Get the dogs, cats, the cat tempraments, dog tempraments, question answers, etc. and store them as constants here
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
