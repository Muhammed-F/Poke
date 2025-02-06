// ===================
// Menydata och Cart-funktioner
// ===================

// Menu items data
const menuItems = [
    {
        id: '1',
        name: 'Poke Beff',
        description: 'Asian Style Poke Bowl med sojastekta champinjoner och xx',
        price: 10.90,
        image: 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF191220_R06_W07_SE_V12343639-1_Main_low-c70586d3.jpg',
        category: 'Burgers'
    },
    {
        id: '2',
        name: 'Poke Bowls',
        description: 'Poke bowls med färsk ahi-tonfisk, avokado, gurka, strimlad kål, edamame och ris, toppade med en frisk och smakrik poke-dressing.',
        price: 14.99,
        image: 'https://www.feastingathome.com/wp-content/uploads/2024/01/ahi-poke.jpg',
        category: 'Pizza'
    },
    {
        id: '3',
        name: 'Poke',
        description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
        price: 9.99,
        image: 'https://www.justspices.co.uk/media/recipe/Asia_Bowl_Topping_Poke_Bowl-10_1_.webp',
        category: 'Salads'
    },
    {
        id: '4',
        name: 'Poke',
        description: 'Fresh Atlantic salmon with seasonal vegetables',
        price: 24.99,
        image: 'https://www.thatcutedish.com/wp-content/uploads/2023/06/spicy-salmon-poke-bowl-1.jpg',
        category: 'Mains'
    },
    {
        id: '5',
        name: 'Spice Bowl',
        description: 'Rich chocolate layer cake with chocolate ganache',
        price: 7.99,
        image: 'https://images.deliveryhero.io/image/fd-op/Products/64400882.jpg??width=800',
        category: 'Desserts'
    },
    {
        id: '6',
        name: 'Korean Kimchi',
        description: 'Spaghetti with creamy sauce, pancetta, and parmesan',
        price: 16.99,
        image: 'https://images.deliveryhero.io/image/fd-op/Products/64400885.jpg??width=800',
        category: 'Pasta'
    }
];

// Cart state
let cart = [];

// Ladda cart från localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

// Spara cart till localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Initiera menyn
function initializeMenu() {
    const menuContainer = document.getElementById('menu-items');
    if (!menuContainer) return;
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle">
                        <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
                    </svg>
                    Add to Cart
                </button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Lägg till en vara i cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
    saveCart();
}

// Uppdatera quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCartDisplay();
    saveCart();
}

// Ta bort vara från cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    saveCart();
}

// Uppdatera cart-visning
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartTotal.textContent = '0.00 sek';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">sek${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus">
                        <path d="M5 12h14"/>
                    </svg>
                </button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                    </svg>
                </button>
                <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ===================
// Checkout & Order placement
// ===================

// Visa/Göm checkout-formuläret (kan vara popup)
function showCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (!checkoutForm || !checkoutBtn) return;
    checkoutForm.classList.remove('hidden');
    checkoutBtn.classList.add('hidden');
}

function hideCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (!checkoutForm || !checkoutBtn) return;
    checkoutForm.classList.add('hidden');
    checkoutBtn.classList.remove('hidden');
}

// Vid beställning: skapa order och spara i localStorage
function placeOrder() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const restaurant = document.getElementById('restaurant').value;

    // Validering
    if (!name || !phone || !address || !restaurant) {
        document.getElementById('checkout-error').textContent = 'All fields are required.';
        return;
    }

    const order = {
        id: `#${Math.floor(Math.random() * 10000)}`, // Slumpmässigt order-ID
        customer: name,
        phone: phone,
        address: address,
        restaurant: restaurant,
        items: cart.map(item => `${item.name} x${item.quantity}`).join(', '),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
        status: 'pending'
    };

    // Hämta befintliga orders, lägg till den nya och spara i localStorage
    let ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
    ordersFromStorage.push(order);
    localStorage.setItem('orders', JSON.stringify(ordersFromStorage));

    // Töm carten
    cart = [];
    saveCart();

    alert('Order placed successfully!');
    hideCheckoutForm();

    // Efter beställning, om vi är på admin-sidan, uppdatera orderlistan
    if (window.location.pathname.includes('admin.html')) {
        updateOrdersList();
    } else {
        // Eller eventuellt redirecta användaren, t.ex.
        window.location.href = 'index.html';
    }
}

// Funktion för att hantera "Confirm Order" (om du använder en bekräftelse-popup)
function confirmOrder() {
    var name = document.getElementById("customer-name").value;
    var phone = document.getElementById("customer-phone").value;
    var pickUpOrDelivery = document.getElementById("pickup-or-delivery") ? document.getElementById("pickup-or-delivery").value : '';
    var restaurant = document.getElementById("restaurant").value;

    if (name && phone) {
        alert("Order confirmed! Name: " + name + ", Phone: " + phone + ", Type: " + pickUpOrDelivery + ", Restaurant: " + restaurant);
        hideCheckoutForm();
    } else {
        document.getElementById("checkout-error").innerText = "Please fill in all fields!";
    }
}

// ===================
// Admin Dashboard-funktioner
// ===================

// Denna funktion uppdaterar orderlistan i admin-sidan (förutsätter att det finns ett element med id="orders-list")
function updateOrdersList() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;

    let ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
    if (ordersFromStorage.length === 0) {
        ordersList.innerHTML = '<p>Inga beställningar ännu.</p>';
        return;
    }

    ordersList.innerHTML = ordersFromStorage.map(order => `
        <div class="order-item">
            <h3>Order ${order.id}</h3>
            <p><strong>Kund:</strong> ${order.customer}</p>
            <p><strong>Telefon:</strong> ${order.phone}</p>
            <p><strong>Adress:</strong> ${order.address}</p>
            <p><strong>Restaurang:</strong> ${order.restaurant}</p>
            <p><strong>Beställda varor:</strong> ${order.items}</p>
            <p><strong>Total:</strong> ${order.total} SEK</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <button onclick="markAsCompleted('${order.id}')">Markera som klar</button>
        </div>
    `).join('');
}

// Markera en order som klar
function markAsCompleted(orderId) {
    let ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
    const order = ordersFromStorage.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        localStorage.setItem('orders', JSON.stringify(ordersFromStorage));
        updateOrdersList();
    }
}

// ===================
// Event Listeners och DOMContentLoaded
// ===================

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    loadCart();

    // Om vi är på admin-sidan, kör uppdatering av orderlistan
    if (window.location.pathname.includes('admin.html')) {
        updateOrdersList();

        // Exempel: Om du har ett sökfält med id "search-orders" kan du lägga till en eventlistener här
        const searchInput = document.getElementById('search-orders');
        if (searchInput) {
            searchInput.addEventListener('input', updateOrdersList);
        }
    }
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });
    navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
}

// Exempel på ScrollReveal-konfiguration
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
        origin: "right",
    });
    ScrollReveal().reveal(".header__content h2", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 1000,
    });
    ScrollReveal().reveal(".order__card", {
        ...scrollRevealOption,
        interval: 500,
    });
    ScrollReveal().reveal(".event__content", {
        duration: 1000,
    });
}
