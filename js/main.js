const cards = document.querySelector(".api");

fetch("https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(item => {
      let card = document.createElement("div");
      card.classList.add("apiCard");
      
      card.innerHTML = `
            <div class="relative w-[100%] flex flex-col justify-between">
                      <div class="flex justify-center">
          <img
            class="w-[100%]"
            src="${item.img}"
            alt="${item.title}"
          />
        </div>
        <div class="p-[15px]">
          <h2 class="text-[14px]">${item.title?.slice(0, 40) + "..."}</h2>
          <p><i class="bx bxs-star text-[gold]"></i> ${item.rate}</p>
          <h3>${item.month
            ?.toLocaleString("uz-UZ")
            .replace(/,/g, " ")} so'm/oyiga</h3>
          <div class="flex items-center justify-between">
            <h2>${item.price
              ?.toLocaleString("uz-UZ")
              .replace(/,/g, " ")} so'm</h2>
          </div>
          <div class="flex justify-between gap-[10px] py-[10px]">
            <button class="text-white rounded-lg w-[80%] bg-[dodgerblue]">Купить в один клик</button>
                <button class="add-to-cart-btn" data-product='${JSON.stringify(item)}'>
                 Savatchaga qo'shish
            </button>
          </div>
          <!-- Like tugmasi -->
          <button class="like-btn absolute top-[15px] left-[15px] flex items-center gap-2 mt-2 px-4 py-2 bg-red-500 text-white rounded-lg" data-id="${item.id}">
            <i class="bx bxs-heart"></i> Like
          </button>
          
        </div>
            </div>
      `;

      cards.append(card);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        const product = JSON.parse(button.getAttribute("data-product"));
        addToCart(product);
      });
    });

    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        likeProduct(productId, data);
      });
    });
  })
  .catch(error => console.error('Error:', error));


  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1; // Miqdorini oshirish
    } else {
      cart.push({ ...product, quantity: 1 }); // Yangi mahsulot qo'shish
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} savatchaga qo'shildi!`);
  }
function likeProduct(id, data) {
  const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
  
  const product = data.find(item => item.id == id);

  if (!likedProducts.some(p => p.id == id)) {
    likedProducts.push(product);
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    alert("Mahsulot like qilindi!");
  } else {
    alert("Bu mahsulot allaqachon like qilingan!");
  }
}

  



  const inputId = document.getElementById('inputId'); // ID input
  const adminCards = document.getElementById('adminCards'); // Ma'lumotlar joylashadigan div
  const form = document.querySelector('form'); // Forma
  
  async function fetchData(id) {
    try {
      const response = await fetch('https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products');
      const data = await response.json();
      const foundItem = data.find(item => item.id == id); // ID bo'yicha qidirish
  
      adminCards.innerHTML = ''; // Tozalash
  
      if (foundItem) {
        adminCards.innerHTML = `
          <div class="flex flex-col justify-center items-center">
              <div class="w-[100%] flex justify-center">
                  <img
                    class="w-[50%]"
                    src=${foundItem.img}
                    alt=""
                  />
                </div>
                <div class="p-[15px]">
                  <h2 class="text-[14px]">${foundItem.title?.slice(0, 60) + "..."}</h2>
                  <p><i class="bx bxs-star text-[gold]"></i>${foundItem.rate}</p>
                  <h3>${foundItem.month
                    ?.toLocaleString("uz-UZ")
                    .replace(/,/g, " ")} so'm/oyiga</h3>
                  <div class="flex items-center justify-between">
                    <h2>${foundItem.price
                      ?.toLocaleString("uz-UZ")
                      .replace(/,/g, " ")} so'm</h2>
                   <!-- Savat tugmasi -->
                   <button class="btn_shop"><i class="bx bx-shopping-bag text-2xl"></i></button>
                   
                  </div>
                  <div class="flex gap-3 mt-3">
              <button onclick="editItem(${foundItem.id})" class="bg-yellow-500 text-white py-2 px-4 rounded">O'zgartirish</button>
              <button onclick="deleteItem(${foundItem.id})" class="bg-red-500 text-white py-2 px-4 rounded">O'chirish</button>
            </div>
          </div>
          </div>
          
        `;
      } else {
        adminCards.innerHTML = `<p class="text-red-500 font-bold mt-5">Ma'lumot topilmadi!</p>`;
      }
    } catch (error) {
      console.error('Xatolik:', error);
      adminCards.innerHTML = `<p class="text-red-500 font-bold mt-5">Xatolik yuz berdi!</p>`;
    }
  }
  
  // Form yuborilganda ID bo'yicha qidirish
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(inputId.value);
    fetchData(id); // Ma'lumotlarni olish
  });
  
  // O'chirish funksiyasi
  async function deleteItem(id) {
    try {
      await fetch(`https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products/${id}`, {
        method: 'DELETE'
      });
      alert('Ma\'lumot o\'chirildi!');
      adminCards.innerHTML = ''; // O'chirilgandan keyin tozalash
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi!');
    }
  }
  
  async function editItem(id) {
    const newName = prompt('Yangi nom kiriting:');
    const newPrice = prompt('Yangi narx kiriting:');
    const newDescription = prompt('Yangi tavsif kiriting:');
  
    try {
      const response = await fetch(`https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          description: newDescription
        })
      });
      const updatedData = await response.json();
      alert('Ma\'lumot o\'zgartirildi!');
      fetchData(updatedData.id); // Yangilangan ma'lumotni chiqarish
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi!');
    }
  }
  
  async function addItem() {
    const newName = prompt('Nom kiriting:');
    const newPrice = prompt('Narx kiriting:');
    const newDescription = prompt('Tavsif kiriting:');
    const newImage = prompt('Rasm URL kiritng:');
  
    try {
      const response = await fetch('https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          description: newDescription,
          image: newImage
        })
      });
      const newData = await response.json();
      alert('Yangi ma\'lumot qo\'shildi!');
      fetchData(newData.id); // Qo'shilgan ma'lumotni chiqarish
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi!');
    }
  }










//   const inputId = document.getElementById('inputId'); // Input ID
// const adminCards = document.getElementById('adminCards'); // Kartalar joylashgan qism
// const form = document.querySelector('form'); // Forma

// const apiUrl = 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products'; // API manzili

// // Ma'lumotlarni localStorage'ga saqlash
// async function fetchAndSaveData() {
//   try {
//     const response = await fetch(apiUrl); // API-dan ma'lumot olish
//     const data = await response.json(); // JSON formatga o'zgartirish
//     localStorage.setItem('products', JSON.stringify(data)); // LocalStorage'ga saqlash
//   } catch (error) {
//     console.error('API dan malumot olishda xatolik:', error);
//   }
// }

// // LocalStorage-dan ma'lumotlarni olish
// function getLocalData() {
//   return JSON.parse(localStorage.getItem('products')) || [];
// }

// // ID bo'yicha ma'lumotni chiqarish
// function fetchData(id) {
//   const data = getLocalData();
//   const foundItem = data.find(item => item.id == id); // ID bo'yicha qidirish

//   adminCards.innerHTML = ''; // Kartani tozalash

//   if (foundItem) {
//     adminCards.innerHTML = `
//           <div class="flex justify-center">
//                   <img
//                     class="w-[50%]"
//                     src=${foundItem.img}
//                     alt=""
//                   />
//                 </div>
//                 <div class="p-[15px]">
//                   <h2 class="text-[14px]">${foundItem.title?.slice(0, 60) + "..."}</h2>
//                   <p><i class="bx bxs-star text-[gold]"></i>${foundItem.rate}</p>
//                   <h3>${foundItem.month
//                     ?.toLocaleString("uz-UZ")
//                     .replace(/,/g, " ")} so'm/oyiga</h3>
//                   <div class="flex items-center justify-between">
//                     <h2>${foundItem.price
//                       ?.toLocaleString("uz-UZ")
//                       .replace(/,/g, " ")} so'm</h2>
//                    <!-- Savat tugmasi -->
                    
//                   </div>
//                   <div class="flex justify-between gap-[10px] py-[10px] ">
//                       <button class="text-white rounded-lg w-[80%] bg-[dodgerblue] ">Купить в один клик</button>
//                       <button class="btn_shop p-[10px] w-[20%] rounded-lg ${data.id} bg-[#00BFAF]"><i class="bx bx-shopping-bag text-2xl text-white"></i></button>
//                     </div>
//                     <div class="flex gap-3 mt-3">
//                       <button onclick="editItem(${foundItem.id})" class="bg-yellow-500 text-white py-2 px-4 rounded">O'zgartirish</button>
//                       <button onclick="deleteItem(${foundItem.id})" class="bg-red-500 text-white py-2 px-4 rounded">O'chirish</button>
//                     </div>
//                 </div>
//             `  ;
//   } else {
//     adminCards.innerHTML = `<p class="text-red-500 font-bold mt-5">Ma'lumot topilmadi!</p>`;
//   }
// }

// // Forma yuborilganda ma'lumotlarni ko'rsatish
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const id = Number(inputId.value);
//   fetchData(id);
// });

// // O'chirish funksiyasi
// async function deleteItem(id) {
//   try {
//     // API-dan o'chirish
//     await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });

//     // LocalStorage-ni yangilash
//     let data = getLocalData();
//     data = data.filter(item => item.id != id); // O'chirish
//     localStorage.setItem('products', JSON.stringify(data));

//     alert('Ma\'lumot o\'chirildi!');
//     adminCards.innerHTML = ''; // Ekranni yangilash
//   } catch (error) {
//     console.error('Xatolik:', error);
//   }
// }

// // O'zgartirish funksiyasi
// async function editItem(id) {
//   const newName = prompt('Yangi nom kiriting:');
//   const newPrice = prompt('Yangi narx kiriting:');
//   const newDescription = prompt('Yangi tavsif kiriting:');

//   try {
//     // API-ga PUT so'rovi yuborish
//     const response = await fetch(`${apiUrl}/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: newName,
//         price: newPrice,
//         description: newDescription
//       })
//     });
//     const updatedItem = await response.json();

//     // LocalStorage-ni yangilash
//     let data = getLocalData();
//     data = data.map(item => (item.id == id ? updatedItem : item)); // Yangilash
//     localStorage.setItem('products', JSON.stringify(data));

//     alert('Ma\'lumot o\'zgartirildi!');
//     fetchData(updatedItem.id); // Yangilangan ma'lumotni chiqarish
//   } catch (error) {
//     console.error('Xatolik:', error);
//   }
// }

// // Qo'shish funksiyasi
// async function addItem() {
//   const newName = prompt('Nom kiriting:');
//   const newPrice = prompt('Narx kiriting:');
//   const newDescription = prompt('Tavsif kiriting:');
//   const newImage = prompt('Rasm URL kiritng:');

//   try {
//     // API-ga POST so'rovi yuborish
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: newName,
//         price: newPrice,
//         description: newDescription,
//         image: newImage
//       })
//     });
//     const newItem = await response.json();

//     // LocalStorage-ga qo'shish
//     let data = getLocalData();
//     data.push(newItem); // Qo'shish
//     localStorage.setItem('products', JSON.stringify(data));

//     alert('Yangi ma\'lumot qo\'shildi!');
//     fetchData(newItem.id); // Qo'shilgan ma'lumotni chiqarish
//   } catch (error) {
//     console.error('Xatolik:', error);
//   }
// }

// // LocalStorage uchun API-dan dastlabki ma'lumotlarni olish
// fetchAndSaveData();
