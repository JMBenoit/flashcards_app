function $(value)
{
  return document.getElementById(value)
}

let allSavedSets = [];
let tempSavedSets = JSON.parse(localStorage.getItem('savedFlashcardSets'))
if (tempSavedSets != null) {
  allSavedSets = tempSavedSets;
}

//inserts HTML elements for all saved flashcard sets
for (var i = 0; i < allSavedSets.length; i++){
  let nextSavedSet = '<div id="cardSet" class="mainView"><h3>' + allSavedSets[i].name + '</h3><div id="cardSetButtons"><button type="button" id="study">Study</button><button type="button" id="eidt">Edit</button></div></div>';
  $('mySavedSetsContainer').insertAdjacentHTML('beforeend', nextSavedSet);
  //TODO: add ELs for inserted buttons

}
