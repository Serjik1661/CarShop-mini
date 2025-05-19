

const items = [
    {
        id: 0,
        name: 'Audi',
        price: '20000',
        imageSrc: './img/audi.jpg'
    },
    {
        id: 1,
        name: 'Audisans',
        price: '34000',
        imageSrc: './img/Audisans.webp'
    },
    {
        id: 2,
        name: 'AudiX10',
        price: '330000',
        imageSrc: './img/AudiX10.jpg'
    },
    {
        id: 3,
        name: 'AudiX1032',
        price: '2000000',
        imageSrc: './img/AudiX1032.webp'
    },
    {
        id: 4,
        name: 'BMW',
        price: '240000',
        imageSrc: './img/BMW.jpg'
    },
]

let cart = [];


function showItems () {
    // Функция должна отобразить элементы из массива в окне браузера клиента
    const container = document.getElementById('cards');

    container.innerHTML = '';
    items.forEach((item) => {


        const card = document.createElement('div')
        card.className = 'card';

        const cardName = document.createElement('h2');
        cardName.className = 'card-name';
        cardName.textContent = item.name;

        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.src = item.imageSrc;

        const cardPrice = document.createElement('p');
        cardPrice.className = 'card-price';
        cardPrice.textContent = `${item.price} тыс. рублей.`;

        const cardButton = document.createElement('button');
        cardButton.className = 'btn';
        cardButton.textContent = 'Добавление в корзину'
        cardButton.onclick = () => addToCart(item.id);


        card.appendChild(cardName);
        card.appendChild(cardImage);
        card.appendChild(cardPrice);
        card.appendChild(cardButton);

        container.appendChild(card)
    });


}

function addToCart(id){

        const foundProduct = cart.find(item => item.id === id);

        if(!foundProduct){
            // Если товара ещё нет в корзине - добавляем с quantity: 1
            const productToAdd = items.find(item => item.id === id);
            if(productToAdd){
                cart.push({...productToAdd, quantity: 1});
            }
        } else {
            // Если товар уже есть - увеличиваем quantity на 1
            foundProduct.quantity += 1;
        }
        // Добавляем товар в корзину
            renderCart(); // Обновляем отображение корзины
    }


    function renderCart () {

        const cartContainer = document.getElementById('cart-container');
        const totalElement = document.getElementById('cart-value');

        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'card';

            // Создаём элементы карточки (название, изображение, цена)
            const cardName = document.createElement('h2');
            cardName.className = 'card-name';
            cardName.textContent = item.name;

            const cardImage = document.createElement('img');
            cardImage.className = 'card-image';
            cardImage.src = item.imageSrc;

            const cardPrice = document.createElement('card-price');
            cardPrice.className = 'card-price';
            cardPrice.textContent = `${item.price} руб. * ${item.quantity} кол-во`;

            const cartQuantity = document.createElement('p');
            cartQuantity.className = 'quantity';
            cartQuantity.textContent = `${item.quantity} количество.`;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn';
            deleteButton.textContent = 'Убрать';

            deleteButton.onclick = () => deleteFromCart(item.id);

            // Собираем карточку
            card.appendChild(cardName);
            card.appendChild(cardImage);
            card.appendChild(cardPrice);
            card.appendChild(cartQuantity);
            card.appendChild(deleteButton);

            cartContainer.appendChild(card);
            totalPrice += Number(item.price) * item.quantity;
        });

        totalElement.textContent = `${totalPrice} тыс. рублей`;

    }

    function deleteFromCart(id) {
        //Удаляем товар из корзины по id
        const index = cart.find(item => item.id === id);
        if(index.quantity > 1){
            index.quantity -= 1;
        } else {
            const foundeIndex = cart.findIndex(item => item.id === id);
            cart.splice(foundeIndex, 1);
        }
        renderCart();
    }
showItems();
