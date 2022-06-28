import './reset.css'
import './style.css'


type storeItem = {
  id: number,
  name: string,
  price: number,
  stock: number,
  inCart: number,
}

type state = {
  storeItem: storeItem[]
}



let state = {
  storeItems: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.45,
      stock: 10,
      inCart: 0,
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.15,
      stock: 2,
      inCart: 0,
    },
    {
      id: 3,
      name: 'apple',
      price: 0.25,
      stock: 1,
      inCart: 0.
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.35,
      stock: 3,
      inCart: 0.
    },
    {
      id: 5,
      name: 'avocado',
      price: 0.55,
      stock: 5,
      inCart: 0.
    },
    {
      id: 6,
      name: 'bananas',
      price: 0.65,
      stock: 7,
      inCart: 0.
    },
    {
      id: 7,
      name: 'bell-pepper',
      price: 0.75,
      stock: 9,
      inCart: 0.
    },
    {
      id: 8,
      name: 'berry',
      price: 0.85,
      stock: 11,
      inCart: 0.
    },
    {
      id: 9,
      name: 'blueberry',
      price: 0.95,
      stock: 13,
      inCart: 0.
    },
    {
      id: 10,
      name: 'eggplant',
      price: 1.05,
      stock: 15,
      inCart: 0.
    }
  ],
}


function getItemImagePath(item) {
  let id = String(item.id).padStart(3, '0')
  return `assets/icons/${id}-${item.name}.svg`
}


function getCartItems() {
  return state.storeItems.filter(item => item.inCart > 0)
}




function increaseQuantity(item) {
  if (item.stock === 0) return

  item.inCart++
  item.stock--
}

function decreaseQuantity(item) {
  if (item.inCart > 0) {
    item.inCart--
    item.stock++
  }
}


function renderStoreItems() {
  let storeUl = document.querySelector('.store--item-list')
  storeUl.textContent = ''

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement('li')

    let iconDiv = document.createElement('div')
    iconDiv.className = '.store--item-icon'

    let iconImg = document.createElement('img')
    iconImg.src = getItemImagePath(item)

    let addBtn = document.createElement('button')
    addBtn.textContent = `Add to cart (${item.stock})`
    addBtn.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    iconDiv.append(iconImg)
    storeItemEl.append(iconDiv, addBtn)
    storeUl.append(storeItemEl)
  }
}

function renderCartItems() {
  let cartUl = document.querySelector('.cart--item-list')
  cartUl.textContent = ''

  let cartItems = getCartItems()

  for (let item of cartItems) {
    let cartLi = document.createElement('li')

    let itemImg = document.createElement('img')
    itemImg.className = 'cart--item-icon'
    itemImg.src = getItemImagePath(item)
    itemImg.alt = item.name

    let itemNameP = document.createElement('p')
    itemNameP.textContent = item.name

    let removeBtn = document.createElement('button')
    removeBtn.className = 'quantity-btn remove-btn center'
    removeBtn.textContent = '-'
    removeBtn.addEventListener('click', function () {
      decreaseQuantity(item)
      render()
    })

    let quantitySpan = document.createElement('span')
    quantitySpan.className = 'quantity-text center'
    quantitySpan.textContent = String(item.inCart)

    let addBtn = document.createElement('button')
    addBtn.className = 'quantity-btn add-btn center'
    addBtn.textContent = '+'
    addBtn.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    cartLi.append(itemImg, itemNameP, removeBtn, quantitySpan, addBtn)
    cartUl.appendChild(cartLi)
  }
}


function getTotal() {
  let total = 0 
  let items = getCartItems()
  for (let item of items) {
    total += item.price * item.inCart
  }
  return total
}

function renderTotal() {
  let total = getTotal().toFixed(2)
  let totalEl = document.querySelector('.total-number')
  totalEl.textContent = `£${total}`
}


function putEverythingInTheCart(){
  let feelingGenerousEl = document.querySelector('.feeling-generous')
  feelingGenerousEl.addEventListener('click', function (){
    for (let item of state.storeItems) {
      if(item.inCart = item.stock)
      item.stock = 0
    }
    render()
  }, {once: true})
}

function render() {
  renderStoreItems()
  renderCartItems()
  renderTotal()
  putEverythingInTheCart()
}

render()