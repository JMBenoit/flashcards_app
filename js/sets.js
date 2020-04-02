function $(value)
{
  return document.getElementById(value)
}


let allSavedSets = [];
let tempSavedSets = JSON.parse(localStorage.getItem('savedFlashcardSets'))
if (tempSavedSets != null) {
  allSavedSets = tempSavedSets;
}

//global variables for pointing to current card sets
let currSetIndex = 0;
let currSet = [];

//variables for tracking correct cards
let correctCards = [];
let currStudyIndex;


function showNewCard()
{
  //random number generator to randomize card order
  currStudyIndex = Math.round(Math.random() * (currSet.cards.length - 1));
  //check to see if card already marked as correct. if so, pull a new card and then pull question and answer from object to display
  if (correctCards[currStudyIndex] == true) {
    showNewCard();
  }
  else {
    $('cardQuestion').innerText = currSet.cards[currStudyIndex].question;
    $('cardAnswer').innerText = currSet.cards[currStudyIndex].answer;
  }

}

function studyCardSet()
{
  //search to see if h3 of button matches the saved set name, and if so save those to created global variables
  let flashcardSets = document.getElementsByClassName('cardSet');
  for (var i = 0; i < flashcardSets.length; i++) {
    if (flashcardSets[i].children[0].innerText == this.parentNode.parentNode.children[0].innerText) {
      currSetIndex = i;
      currSet = allSavedSets[i];
    }
  }
  //fade out 1st view and fade in studying view after animation
  $('navbar').classList.toggle('fade-out');
  $('mySavedSetsContainer').classList.toggle('fade-out');
   setTimeout(function(){
     $('navbar').classList.toggle('hide');
     $('mySavedSetsContainer').classList.toggle('hide');
     $('setsBody').classList.toggle('changeBackground');
     $('studyCardSetContainer').classList.toggle('hide');
     $('cardAnswer').classList.toggle('hide');
     $('correctOrWrong').classList.toggle('hide');
     $('studyCardSetContainer').classList.toggle('fade-in');
   }, 800);
   //fills tracking array to size of flashcard set
   for (var i = 0; i < currSet.cards.length; i++) {
     correctCards[i] = false;
   }
   showNewCard();
}

function editCardSet()
{
  //search to see if h3 of button matches the saved set name, and if so save those to created global variables
  let flashcardSets = document.getElementsByClassName('cardSet');
  for (var i = 0; i < flashcardSets.length; i++) {
    if (flashcardSets[i].children[0].innerText == this.parentNode.parentNode.children[0].innerText) {
      currSetIndex = i;
      currSet = allSavedSets[i];
    }
  }
  //change title H2 on next page to show set name
  $('questionsH2').innerHTML = currSet.name + "<br>Current Questions";
  //adds html element for each flashcards info for editing
  for (var i = 0; i < currSet.cards.length; i++) {
    let savedQuestionHTML = '<div id="editQuestion" class="mainView editCard"><input type="text" id="question" placeholder="Question" value="' + currSet.cards[i].question + '"><input type="text" id="answer" placeholder="Answer" value="' + currSet.cards[i].answer + '"></div>';
    $('editQuestionsContainer').insertAdjacentHTML('beforeend', savedQuestionHTML);
  }
  //fade out the 1st view, and then fade in the editing view after animation
  $('mySavedSetsContainer').classList.toggle('fade-out');
   setTimeout(function(){
     $('mySavedSetsContainer').classList.toggle('hide');
     $('editQuestionsContainer').classList.toggle('hide');
     $('editQuestionsContainer').classList.toggle('fade-in');
     $('saveButtonContainer').classList.toggle('hide');
     $('saveButtonContainer').classList.toggle('fade-in');
   }, 800);
}


//inserts HTML elements for all saved flashcard sets
for (var i = 0; i < allSavedSets.length; i++){
  let nextSavedSet = '<div id="cardSet" class="mainView cardSet"><h3>' + allSavedSets[i].name + '</h3><div id="cardSetButtons"><button type="button" id="study">Study</button><button type="button" id="eidt">Edit</button></div></div>';
  $('mySavedSetsContainer').insertAdjacentHTML('beforeend', nextSavedSet);
  //pulls all saved sets, points to the last added set, and then points to the study and edit buttons so that event listeners can be added
  let flashcardSets = document.getElementsByClassName('cardSet');
  let lastSet = flashcardSets[flashcardSets.length - 1];
  let studyBtn = lastSet.getElementsByTagName('button')[0];
  let editBtn = lastSet.getElementsByTagName('button')[1];
  studyBtn.addEventListener('click', studyCardSet);
  editBtn.addEventListener('click', editCardSet);
}

$('saveChanges').addEventListener('click', function(){
  //create a new array to save edited questions
  let newQuestions = [];
  //pull all edited cards
  let editedCards = document.getElementsByClassName('editCard');
  //loop through edited cards. create new card objects and add them to the array
  for (var i = 0; i < editedCards.length; i++) {
     let editedCardObj = {question: editedCards[i].children[0].value, answer: editedCards[i].children[1].value};
     newQuestions.push(editedCardObj);
   }
   //create the full card set with name attached and replace old info in the full saved sets array
   let newCardSet = {name: currSet.name, cards: newQuestions};
   allSavedSets[currSetIndex] = newCardSet;
   //resave to local storage with edited cards
   localStorage.setItem('savedFlashcardSets', JSON.stringify(allSavedSets));
   //fade out the editing view, and then fade in the successful save view after animation
   $('editQuestionsContainer').classList.toggle('fade-out');
   $('saveButtonContainer').classList.toggle('fade-out');
    setTimeout(function(){
      $('editQuestionsContainer').classList.toggle('hide');
      $('saveButtonContainer').classList.toggle('hide');
      $('editedSetSaved').classList.toggle('hide');
      $('editedSetSaved').classList.toggle('fade-in');
    }, 800);
});

$('showAnswer').addEventListener('click', function(){
  //fades out show answer button and fades in answer and correct/wrong buttons
  $('showAnswerContainer').classList.toggle('fade-out');
   setTimeout(function(){
     $('showAnswerContainer').classList.toggle('hide');
     $('cardAnswerContainer').classList.toggle('hide');
     $('cardAnswerContainer').classList.toggle('fade-in');
     $('correctOrWrong').classList.toggle('hide');
     $('correctOrWrong').classList.toggle('fade-in');
   }, 800);
});

$('correct').addEventListener('click', function(){
  //if correct, marks that index in the tracking array as true so question is not repeated
  correctCards[currStudyIndex] = true;
  //checks to see if there are any falses still in the array
  let studyComplete = true;
  for (var i = 0; i < correctCards.length; i++) {
    if (correctCards[i] == false) {
      studyComplete = false;
    }
  }
  //if there are no more falses, studying is complete and changes view
  if (studyComplete) {
    $('studyCardSetContainer').classList.toggle('fade-out');
     setTimeout(function(){
       $('studyCardSetContainer').classList.toggle('hide');
       $('studyDoneContainer').classList.toggle('hide');
       $('studyDoneContainer').classList.toggle('fade-in');
     }, 800);
  }
  //if there are more falses, show another card
  else {
    $('showAnswerContainer').classList.toggle('fade-out');
    $('showAnswerContainer').classList.toggle('fade-in');
    $('cardQuestion').classList.toggle('fade-in');
    $('cardAnswerContainer').classList.toggle('hide');
    $('showAnswerContainer').classList.toggle('hide');
    $('correctOrWrong').classList.toggle('hide');
    showNewCard();
  }
})

$('wrong').addEventListener('click', function(){
  $('showAnswerContainer').classList.toggle('fade-out');
  $('showAnswerContainer').classList.toggle('fade-in');
  $('cardQuestion').classList.toggle('fade-in');
  $('cardAnswerContainer').classList.toggle('hide');
  $('showAnswerContainer').classList.toggle('hide');
  $('correctOrWrong').classList.toggle('hide');
  showNewCard();
})
