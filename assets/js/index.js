let isActive = true;
let isChecked = false;
let bookmarked = ["Bookmarked", "Bookmark"];
let inputMarked;
let modalsActive = [];
let currentProgress = null;

let currentProgressBrackers = 5001;
const maxProgressValue = 100000;
const defaultProgressValue = 40000;


const circleProps = {
  fillActive: "hsl(176, 50%, 47%)",
  fillDesactive: "#2F2F2F",
};
const pathProps = { fillActive: "white", fillDesactive: "#B1B1B1" };

const onClickBar = () => {
  const navbarItems = document.querySelector(".navbar__items");
  if (isActive) addAndRemoveClass(navbarItems, "d-flex", "d-hidden");
  else addAndRemoveClass(navbarItems, "d-hidden", "d-flex");
  isActive = !isActive;
};

const changeButtonState = (button) => {
  const { lastElementChild, firstElementChild: span } = button;
  const { firstElementChild: circle, lastElementChild: path } =  span.firstElementChild.firstElementChild;
  if (!isChecked) {
    addAndRemoveClass(button, "text-primary", "subtitle");
    circle.setAttribute("fill", circleProps.fillActive);
    path.setAttribute("fill", pathProps.fillActive);
    lastElementChild.innerHTML = bookmarked[0];
  } else {
    addAndRemoveClass(button, "subtitle", "text-primary");
    circle.setAttribute("fill", circleProps.fillDesactive);
    path.setAttribute("fill", pathProps.fillDesactive);
    lastElementChild.innerHTML = bookmarked[1];
  }
  isChecked = !isChecked;
};

const addAndRemoveClass = (item, classToAdd, classToRemove) => {
  if(item != null){    
    if(classToAdd)
    item.classList.add(classToAdd);
    item.classList.remove(classToRemove);
  }
};

const activateCard = (input) => {
  if(inputMarked){
    addAndRemoveClass(inputMarked.parentElement.parentElement.parentElement, null, 'card-active');
    addAndRemoveClass(inputMarked.parentElement.parentElement.parentElement.children[1] || null, "none", "d-block");
  }
  if (input.checked) {
    addAndRemoveClass(input.parentElement.parentElement.parentElement, "card-active", null);
    addAndRemoveClass(input.parentElement.parentElement.parentElement.children[1], "d-block", "none");
  }
  inputMarked = input;
};

const openModal = (nameId) => {
  modalObject = document.getElementById(nameId);
  modalObject.setAttribute('style','display: flex'); 
  modalsActive.push(modalObject);   
  document.querySelector('body').setAttribute('style','overflow: hidden');
}

const closeModal = (nameId) => {  
  modalObject = document.getElementById(nameId);    
  modalObject.setAttribute('style','display: none');  
  modalsActive = modalsActive.filter( m => m != modalObject);
  if(modalsActive.length < 1)
    document.querySelector('body').setAttribute('style','overflow: auto');
}



const setProgressValue = (btn,maxPledgeValue = maxProgressValue) => {
  value = btn.parentElement.children[1].value;
  let sum = parseFloat(currentProgress.value) + parseFloat(value);  
  if(sum <= maxProgressValue && value <= maxPledgeValue){
    progressValues(sum.toString().toLocaleString('en-US'));
    
  }
}
const progressValues = (value) => {
  
  currentProgress.value = value;
  document.getElementById('progressValue').innerHTML = value;
  document.getElementById('progressBrackers').innerHTML = (currentProgressBrackers + 1).toLocaleString('en-US') ;
  currentProgressBrackers++;
}

window.onclick = (event) => {
  if(modalsActive){
    for (const object of modalsActive) {
      if(event.target == object)
        closeModal(object.id)
    }
  }
}

window.onload = () =>{
  currentProgress = document.getElementById('progress');  
  currentProgress.value = defaultProgressValue;  
  document.getElementById('progressBrackers').innerHTML = (currentProgressBrackers).toLocaleString('en-US') ;
  document.getElementById('progressValue').innerHTML = currentProgress.value.toLocaleString('en-US');

}

