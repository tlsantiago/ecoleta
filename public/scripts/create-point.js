function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( (res) => res.json() )
    .then ( states => {
        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiSelect.innerHTML = "";
    citySelect.disabled = true;

    fetch (url)
    .then ( (res) => res.json() )
    .then ( cities => {
        
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);



//items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const conllectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItem(event) {
    // add or remove class
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id;

    //Check if there's selected items;
    //If so, store selected items in an array;

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    })

    //If it was already inside the array, remove it from array;
    if ( alreadySelected >= 0 )  {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems;
    } else {                 //Update field with selected items;
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems

}