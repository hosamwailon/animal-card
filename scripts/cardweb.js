import {cards} from './cards.js';
import { collection,addToCollection } from './collection.js';
import{coins,updateCoins,buySystem,coinsIncreament} from './coins.js'; 


document.addEventListener('DOMContentLoaded',()=>{
    updateCoins();
})



//display cards in page
let summaryHTML = ``;
cards.forEach((card,index) =>{
    if(index === cards.length-1){
        return;
    }
   summaryHTML+=`
        <div class="grid-slot">
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











           