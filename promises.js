// part 1

let two = document.getElementById('2');

let three = document.getElementById('3');

axios.get('http://www.numbersapi.com/5?json')
    .then(resp => console.log(resp.data.text))
    .catch(err => console.log(err));

axios.get('http://www.numbersapi.com/1..20?json')
    .then(resp => {
        for(let fact in resp.data){
            newLi = document.createElement('li');
            newLi.innerText = resp.data[fact];
            two.append(newLi);
        }
    })
    .catch(err => console.log(err));


let promiseArr = []

for(let i = 0; i < 5; i++){
    promiseArr.push(axios.get('http://www.numbersapi.com/27?json'))
}

Promise.all(promiseArr)
    .then((responses) => {
        for(resp of responses){
            newLi = document.createElement('li');
            newLi.innerText = resp.data.text;
            three.append(newLi);
        }
})

// part 2

let deckID
// //1 
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => deckID = resp.data.deck_id)
    .then(() => axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`))
    .then(resp => console.log(resp.data.cards[0].value, resp.data.cards[0].suit))

// //2
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => deckID = resp.data.deck_id)
    .then(() => axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`))
    .then(resp => console.log(resp.data.cards[0].value, resp.data.cards[0].suit))
    .then(() => axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`))
    .then(resp => console.log(resp.data.cards[0].value, resp.data.cards[0].suit))
//3
let drawBtn = document.getElementById('draw-button')
let cardPile = document.getElementById('cards')
window.addEventListener("load", (evt) => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => deckID = resp.data.deck_id)
    .then(() => drawBtn.addEventListener("click", (evt) => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then(resp => {
            imgURL = resp.data.cards[0].images.png;
            cardImg = document.createElement('img');
            cardImg.setAttribute('src', imgURL);
            cardImg.setAttribute('class', 'card')
            cardPile.append(cardImg)
        })
    }))


})