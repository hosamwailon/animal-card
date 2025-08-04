import {cards} from './cards.js';
import { addToCollection } from './collection.js';
import{coins,updateCoins,buySystem,coinsIncreament} from './coins.js';
//slideer html code generating
    let sliderSummaryHTML = '';
    cards.forEach((card)=>{
        sliderSummaryHTML +=`
        <div class="slides js-slides">
                <div class="slide-card-container">
                    <div class="slide-card"><img src="${card.image}">
                    
                    </div>
                </div>
        
                <div class="slide-card-info">
                    <div class="slide-card-name">${card.name}</div>
                    <div class="slide-card-discription">${card.discreption}</div>
                    <button class="slide-add-button js-slide-add-card-btn" data-card-id="${card.id}">Add card</button>
                </div>
        

        </div>  

    `;
    });


    document.querySelector('.js-wrapper').innerHTML = sliderSummaryHTML ;

    let currentSlide = 0;
    let isAutoPlay = true;
    let sliderInterval;

    function updateSlider(smooth =true){
       const slidesWrapper = document.querySelector('.js-wrapper');
       const translateX = -currentSlide*100;
       if(smooth === true){
          slidesWrapper.style.transition = 'transform 0.5s ease-in-out';
       }else{
               slidesWrapper.style.transition= `none`;
            }
        slidesWrapper.style.transform = `translateX(${translateX}%)`;    
    }

    function nextSlide(){
        
        currentSlide++;
        updateSlider();
            if(currentSlide === cards.length-1){
                currentSlide = 0;
               setTimeout(()=>{
                 updateSlider(false);
               },500)

             }
      //this is when we press next button we reset auto play timer
           if(isAutoPlay ===true){
                stopAutoPlay();
                startAutoPlay();
            }    
    }


function prevSlide() {
    // The +cards.length ensures positive value before modulo
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider();
    
    if (currentSlide === 0) {
        setTimeout(() => {
            currentSlide = cards.length - 1;
            updateSlider(false);  // Reset without animation
        }, 500);  // Wait for slide animation to complete
    }
      if(isAutoPlay ===true){
                stopAutoPlay();
                startAutoPlay();
            }  
}

    function startAutoPlay(){
            
            sliderInterval = setInterval(()=>{
                nextSlide();
            },3000);
            isAutoPlay = true;
            document.querySelector('.js-auto-slide-btn').innerHTML = 'Stop Auto Play';
            document.querySelector('.js-auto-slide-state').innerHTML = 'Auto Play:On';

       
    }
    if(isAutoPlay === true){
        startAutoPlay();
    }

        function stopAutoPlay(){
       
           clearInterval(sliderInterval);
            isAutoPlay = false;
            document.querySelector('.js-auto-slide-btn').innerHTML = 'Auto Play';
            document.querySelector('.js-auto-slide-state').innerHTML = 'Auto Play:Off';

       
    }

    function toggleAutoPlay(){
        if(!isAutoPlay){
            startAutoPlay();
        }else{
            stopAutoPlay();
        }
    }

    document.querySelector('.js-auto-slide-btn').addEventListener('click',()=>{
        toggleAutoPlay();
    });
    document.querySelectorAll('.js-slide-next-btn').forEach(card=>{
        card.addEventListener('click',()=>{
            nextSlide();
        })
    });
       document.querySelectorAll('.js-slide-prev-btn').forEach(card=>{
        card.addEventListener('click',()=>{
            prevSlide();
        })
    });

    document.querySelectorAll('.js-slide-add-card-btn').forEach(button=>{
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
