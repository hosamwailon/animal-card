export let coins = JSON.parse(localStorage.getItem('coins'))||0;

export function updateCoins(){
   document.querySelector('.js-coin-display').innerHTML = coins; 
   document.querySelector('.js-nav-coin-display').innerHTML = coins; 
   localStorage.setItem('coins',JSON.stringify(coins));
}
export function buySystem(cardPrice){
    coins-=cardPrice;
    updateCoins();
}
export function coinsIncreament(){
       if(coins <10){
        coins++;
    }else if(10<=coins && coins<50){
        coins+=5;
    }else if(50<=coins && coins<100){
        coins+=10;
    }else if(coins>=100) {
        coins+=50;
    }
         
    updateCoins();
}