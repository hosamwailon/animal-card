import {cards} from './cards.js';


export let collection = JSON.parse(localStorage.getItem('collection'))|| [];

//DOMContentLoaded for make sure that html code is fully loaded before ally this code
document.addEventListener('DOMContentLoaded',()=>{
  updateTotalCards();
  updateTotalCost();
});

let collectionHTML = ``;


collection.forEach(collectionCard=>{
     let machingitem ={};
     let quantity = 0;
    cards.forEach(card=>{
        
         if(collectionCard.cardId === card.id){
            machingitem = card;
        }
    })
    quantity = collectionCard.quantity;

    if(machingitem){
       
    collectionHTML +=`
         <div class="grid-slot js-grid-slot-${machingitem.id}">
            <div class="quantity js-quantity-${machingitem.id}">${quantity}</div> 
            <div class="price">${machingitem.price}C</div>
            <img class="card-img" src="${machingitem.image}">
            <div class="card-info">
                <div class="name">${machingitem.name}</div>
                <div class="description">${machingitem.discreption}</div>
                <button class="remove-btn js-remove-btn" data-remove-btn-id="${machingitem.id}">Remove</button>
            </div>
        </div>
    `;
    }



});
 document.querySelector('.js-grid-container').innerHTML = collectionHTML;

 document.querySelectorAll('.js-remove-btn').forEach(button=>{
    button.addEventListener('click',()=>{
        const cardId = button.dataset.removeBtnId;
        removeFromCollection(cardId);
        updateTotalCards();
        updateTotalCost();

       
    })
 });

 

 




// functions declare 
 export function addToCollection(cardId){
  let machingCard;
  collection.forEach(card=>{
    if(card.cardId === cardId){
        machingCard = card;
    }
  })

  
  if(machingCard){
    machingCard.quantity++;
  }else{
        collection.push({
            cardId,
            quantity:1
        });
       }
       saveToStorage();   
    
}

function removeFromCollection(cardId){
  let newCollection = [];
  let machingCard;
  collection.forEach(card=>{
    if(card.cardId === cardId){
       machingCard = card;
       return;
    }
  })
  if(machingCard.quantity > 1){
    machingCard.quantity--;
    saveToStorage();
    document.querySelector(`.js-quantity-${cardId}`).innerHTML = machingCard.quantity;
  }else{
        collection.forEach(card=>{
            if(cardId !== card.cardId){
                newCollection.push(card);
            }
        });
        collection = newCollection;
        saveToStorage();
         document.querySelector(`.js-grid-slot-${cardId}`).remove();
       }
}

function calculateTotalCards(){
  let totalCards = 0;
  collection.forEach(card=>{
    totalCards+=card.quantity;
  })
  return totalCards;
}
function updateTotalCards(){
  let totalCards = calculateTotalCards();
    let element = document.querySelector('.js-total-cards');
    if(totalCards === 0){
      element.innerHTML = `No Cards`;
      
    }else if(totalCards === 1){
               element.innerHTML = `${totalCards} Card`;
           }else{
                element.innerHTML = `${totalCards} Cards`;
               }



}

function calculateTotalCost(){
  let totalCost = 0;
  collection.forEach(collectionCard =>{
    let cardTotalCost = 0;
    let machingCard;
    cards.forEach(card=>{
      if(card.id === collectionCard.cardId){
        machingCard = card;
      }
    });
     cardTotalCost = collectionCard.quantity * machingCard.price;
     totalCost+=cardTotalCost;
  })
  return totalCost;
}

function updateTotalCost(){
    document.querySelector('.js-total-cost').innerHTML = `${calculateTotalCost()}C`;
}

function saveToStorage(){
   localStorage.setItem('collection',JSON.stringify(collection));
}




