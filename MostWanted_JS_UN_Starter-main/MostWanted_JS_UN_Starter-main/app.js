/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            displayPerson(person[0]);
            
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            findPersonFamily(person[0], people);

            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            findPersonDescendants(person[0], people);
            
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
        else{
            return false;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `id: ${person.id}\n`;
    personInfo += `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `gender: ${person.gender}\n`;
    personInfo += `dob: ${person.dob}\n`;
    personInfo += `height: ${person.height}\n`;
    personInfo += `weight: ${person.weight}\n`;
    personInfo += `eyeColor: ${person.eyeColor}\n`;
    personInfo += `occupation: ${person.occupation}\n`;
    personInfo += `parents: ${person.parents}\n`;
    personInfo += `currentSpouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
  
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


// searh by gender
function searchByGender(people){
    let gender = promptFor("What is the person's gender?", chars);

    let foundGender = people.filter(function(person){
        if (person.gender === gender){
            return true;
        }
        else{
            return false;
        }
    })
    let printToConsole = foundGender.map(function(person){
        return person.firstName;
    }).join(', ')
    alert(`Gender: ${printToConsole}`)
    return foundGender;
}


// search by height
function searchByHeight(people){
    let height = promptFor("What is the person's height?", chars);

    let foundHeight = people.filter(function(person){
        if (person.height == height){
            return true;
        }
        else{
            return false;
        }
    });
    let printToConsole = foundHeight.map(function(person){
        return person.firstName;
    }).join(', ')
    alert(`Height: ${printToConsole}`)
    return foundHeight;
}


// search by weight
function searchByWeight(people) {
    let personWeight = promptFor("What is the person's weight?", chars);

    //The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.weight == personWeight) {
            return true;
        }
        else{
            return false;
        }
    });
    let printToConsole = foundPerson.map(function(person){
        return person.firstName;
    }).join(', ')
    alert(`Weight: ${printToConsole}`)
    return foundPerson;
}


// search by eye color
function searchByEyeColor(people) {
    let eyeColor = promptFor("What is the person's eye color", chars);

    let foundPeople = people.filter(function(person) {
        if (person.eyeColor == eyeColor) {
            return true;
        }
        else{
            return false;
        }
    });
    let printToConsole = foundPeople.map(function(person){
        return person.firstName;
    }).join(', ')
    alert(`Eye color: ${printToConsole}`)
    return foundPeople;
}


// search by occupation
function searchByOccupation(people) {
    let occupation = promptFor("What is the person's occupation", chars);

    let foundPerson = people.filter(function(person) {
        if (person.occupation == occupation) {
            return true;
        }
        else{
            return false;
        }
    })
    let printToConsole = foundPerson.map(function(person){
        return person.firstName;
    }).join(', ')
    alert(`Occupation: ${printToConsole}`)
    return foundPerson;
}


// find person based off multiple traits
function searchByTraits(people){
    let searchReturn = people
    let user_input =""
    while (user_input != "done"){
        user_input = promptFor("height, gender, occupation, eye color, or weight.  Type done for done", chars)
        if (user_input == "height"){
            searchReturn = searchByHeight(searchReturn)
        }
        else if(user_input === "gender"){
            searchReturn = searchByGender(searchReturn)
        }
        else if(user_input == "occupation"){
            searchReturn = searchByOccupation(searchReturn)
        }
        else if(user_input == "eye color"){
            searchReturn = searchByEyeColor(searchReturn)
        }
        else{ 
            searchReturn = searchByWeight(searchReturn)

        }
        console.log(searchReturn)

    }
    let searchType = searchReturn.filter(function(el){
        return (`${el.firstName} ${el.lastName}`);
    }).join(', ')
    alert(`User input ${searchType}`)
    return searchReturn
}

// find parents function
function searchByParent(person, people) {

    let findParent = people.filter(function(el) {
        if(person.parents[0] == el.id || person.parents[1] == el.id) {
            return true;
        }
        else{
            return false;
        }
    })
    let alertToConsle = findParent.map(function(el){
        return (`${el.firstName} ${el.lastName}`);
    }).join(', ')
    alert(`Parents: ${alertToConsle}`)
    return findParent;
}


// find siblings function
function searchForSiblings(person, people){

    let result = people.filter(function(el){
        if(person.parents[0] == el.parents[0] || person.parents[1] == el.parents[1]){
            return true;
        }
        else{
            return false;
        }
    })
    let name = result.map(function(el){
        return (`${el.firstName} ${el.lastName}`);
    }).join(', ')
    alert(`Siblings: ${name}`)
    return result;
}


// find spouse function
function searchForSpouse(person, people){
    let spouse = people.filter(function(el){
        if(person.id == el.currentSpouse){
            return true;
        }
        else{
            return false;
        }
    })
    let printSpouse = spouse.map(function(el){
        return (`${el.firstName} ${el.lastName}`);
    }).join('')
    alert(`${person.firstName}'s current spouse: ${printSpouse}`)
    return spouse;
}

// find family function
function findPersonFamily(person, people){
    let promptOptions = prompt(
        `What type of immediete family members would you like to see?\nWould you like to see ${person.firstName}'s "spouse", "parents", or "siblings"?`
    );
    switch(promptOptions){
        case "spouse":
    if(promptOptions == "spouse"){
        searchReturn = searchForSpouse(person, people);
    }
        break;
    case "parents":
    if(promptOptions == "parents"){
        searchReturn = searchByParent(person, people);
    }
    break;
    case "siblings":
    if(promptOptions == "sibilings"){
        searchReturn = searchForSiblings(person, people);
    }
    else{
        return false
    }
        break;
    }
    alert(promptOptions);
}


// find descendents function
function findPersonDescendants(person, people){
    let findDescendent = people.filter(function(element) {
        if(person.id == element.parents[0] || person.id == element.parents[1]) {
            return true;
        }
        else{
            return false;
        }
    })
    let alertToConsle = findDescendent.map(function(element){
        return (`${element.firstName} ${element.lastName}`);
    }).join(', ')
    alert(`Descendents: ${alertToConsle}`);
    return findDescendent;
}

// find member by trait
function multiplePersonTraits(person, people) {
        
    let multipleTraits = people.filter(function(el) {
        if(person.personInfo == el.parents[0] || person.personInfo == el.parents[1]){
            return true;
        }
        else{
            return false;
        }
    }) 
    let alertToConsle = multipleTraits.map(function(el){
        return (`${el.firstName} ${el.lastName}`);
    }).join(', ')
    alert(`Multiple: ${alertToConsle}`);
    return alertToConsle;
}