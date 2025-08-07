import {cards} from './cards.js';
import { collection,addToCollection } from './collection.js';
import{coins,updateCoins,buySystem,coinsIncreament} from './coins.js'; 


document.addEventListener('DOMContentLoaded',()=>{
    updateCoins();
});



//display cards in page
let summaryHTML = ``;
cards.forEach((card,index) =>{
    if(index === cards.length-1){
        return;
    }
   summaryHTML+=`
        <div class="grid-slot js-grid-slot">
            <div class="price">${card.price}C</div>
            <img class="card-img" src="${card.image}">
            <div class="card-info">
                <div class="name">${card.name}</div>
                <div class="description">${card.discreption}</div>
                <div class="adding-buttons">
                    <button class="add-button js-add-card-btn" data-card-id="${card.id}">Add</button>
                </div>
            </div>
        </div>
   `;
   
});
document.querySelector('.js-grid-container').innerHTML = summaryHTML;

document.querySelectorAll('.js-add-card-btn').forEach(button=>{
    button.addEventListener('click',()=>{
        const cardId = button.dataset.cardId;
        let timeoutId;
        let cardPrice;
        cards.forEach(item=>{
            if(item.id === cardId){
                cardPrice = item.price;
            }
        })
        if(cardPrice<=coins){
             addToCollection(cardId);
             buySystem(cardPrice);
        }else{
            document.querySelector('.js-notE').innerHTML='Not Enough Coins!!!';
             timeoutId = setTimeout(()=>{
              document.querySelector('.js-notE').innerHTML='';  
            },3000);
        }
    })
});


document.querySelector('.js-add-coin').addEventListener('click',()=>{
  coinsIncreament();
    
});
document.querySelector('.js-nav-add-coin').addEventListener('click',()=>{
  coinsIncreament();
    
});
let overlayTimeoutId;
document.querySelectorAll('.js-grid-slot').forEach(card=>{
    
    card.addEventListener('mouseover',()=>{
             clearTimeout(overlayTimeoutId);
            document.querySelector('.js-overlay').style.display='initial';
   });
   card.addEventListener('mouseout',()=>{
           overlayTimeoutId = setTimeout(()=>{document.querySelector('.js-overlay').style.display='none';},500) 
            
   })
});
document.querySelector('.js-nav-button').addEventListener('click',()=>{
  const nav = document.querySelector('.js-nav');
  if(nav.style.transform === ''){
     nav.style.transform = 'translateX(-100%)';
  }else{
    nav.style.transform = '';
  }
  
});


document.querySelector('.js-contact-button').addEventListener('click',()=>{
  const element = document.querySelector('.js-contact-links');
 
  if(element.style.visibility !== 'visible'){
    element.style.visibility = 'visible';
  }else{
    element.style.visibility = 'hidden';
  }

});

document.querySelector('.js-nav-contact-btn').addEventListener('click',()=>{
  const element = document.querySelector('.js-nav-contact-links');
 
  if(element.style.visibility !== 'visible'){
    element.style.visibility = 'visible';
  }else{
    element.style.visibility = 'hidden';
  }

});














           
