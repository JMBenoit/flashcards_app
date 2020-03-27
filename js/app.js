function $(value)
{
  return document.getElementById(value)
}

let allSavedSets = [];
let tempSavedSets = JSON.parse(localStorage.getItem('savedFlashcardSets'))
if (tempSavedSets != null) {
  allSavedSets = tempSavedSets;
}

let newSetName;
let newSetQuestions = [];

$('createSetButton').addEventListener('click', function(){
  //grab value from setName input and save to var
  newSetName = $('setName').value;
  //sets new set name to label
  $('questionsH2').innerHTML = newSetName + "<br>Current Questions";
  //fade out createSet div. hide the createSet div after animation plus unhide and fade-in the adding questions div after 800 ms pause
  $('createSet').classList.toggle('fade-out');
  setTimeout(function(){
    $('createSet').classList.toggle('hide');
    $('newCardContainer').classList.toggle('hide');
    $('newCardContainer').classList.toggle('fade-in');
    $('questionsContainer').classList.toggle('hide');
    $('questionsContainer').classList.toggle('fade-in');
    $('saveSetContainer').classList.toggle('hide');
    $('saveSetContainer').classList.toggle('fade-in');
  }, 800);
});

$('add').addEventListener('click', function(){
  //creates a new object with the question and answer input
  let newCardObject = {question: $('question').value, answer: $('answer').value};
  //checks to see each input has value. if so, pushes object to the saved array, adds questions and answer to the current questions section, and resets the ipnuts
  if (newCardObject.question.length > 0 && newCardObject.answer.length > 0) {
    newSetQuestions.push(newCardObject);
    let newQuestionHTML = '<div class="setQuestionContainer fade-in"><p>Q: ' + newCardObject.question + '</p><p>A: ' + newCardObject.answer + '</p></div>';
    $('questionsContainer').insertAdjacentHTML('beforeend', newQuestionHTML);
    $('question').value = '';
    $('answer').value = '';
  }
});

$('saveSet').addEventListener('click', function(){
  //creates a new object combining all questions with set name
  let newCardSet = {name: newSetName, cards: newSetQuestions};
  //pushes new object to array with all saved sets and then sets that updated array to local storage
  allSavedSets.push(newCardSet);
  localStorage.setItem('savedFlashcardSets', JSON.stringify(allSavedSets));
  //fade-out the 2nd view containers. after 800 ms pause, hide the 2nd view containers, unhide and fade-in the setSaved container
  $('newCardContainer').classList.toggle('fade-out');
  $('questionsContainer').classList.toggle('fade-out');
  $('saveSetContainer').classList.toggle('fade-out');
  setTimeout(function(){
    $('newCardContainer').classList.toggle('hide');
    $('questionsContainer').classList.toggle('hide');
    $('saveSetContainer').classList.toggle('hide');
    $('setSaved').classList.toggle('hide');
    $('setSaved').classList.toggle('fade-in');
  }, 800);
});
