const form = document.querySelector("form");
const inputId = document.querySelector("#inputId");
const adminCards = document.querySelector("#adminCards");
const apiURL = "https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products";

// Formni yuborilganda ishlash
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Formni qayta yuklashni oldini olish

  let id = inputId.value.trim(); // Inputdan qiymat olish
  id = Number(id); // ID ni son (number) formatiga o'tkazish

  if (!id || isNaN(id)) {
    alert("Iltimos, ID kiriting (raqam bo'lishi kerak)!");
    return;
  }

  try {
    // API orqali IDga tegishli ma'lumotni olish
    const response = await fetch(`${apiURL}/${id}`);

    if (!response.ok) {
      throw new Error("IDga tegishli ma'lumot topilmadi!");
    }

    const data = await response.json();
    displayCard(data); // Ma'lumotni ko'rsatish
  } catch (error) {
    console.error("Xatolik:", error.message);
    alert(error.message);
  }
});

// Ma'lumotni ko'rsatish funksiyasi
function displayCard(data) {
  adminCards.innerHTML = `
    <div class="p-[20px] border rounded-lg shadow-md">
      <img src="${data.img}" alt="Mahsulot rasmi" class="w-[100px] h-[100px] m-auto rounded-md">
      <h2 class="text-lg font-bold text-center mt-2">${data.title}</h2>
      <p class="text-center text-gray-600">${data.price.toLocaleString()} so'm</p>
      <div class="flex justify-between mt-4">
        <button id="editBtn" class="bg-[dodgerblue] text-white px-[20px] py-[10px] rounded-md">O'zgartirish</button>
        <button id="deleteBtn" class="bg-[crimson] text-white px-[20px] py-[10px] rounded-md">O'chirish</button>
      </div>
    </div>
  `;

  // O'zgartirish va o'chirish tugmalariga event listener qo'shish
  document.querySelector("#editBtn").addEventListener("click", () => editProduct(data));
  document.querySelector("#deleteBtn").addEventListener("click", () => deleteProduct(data.id));
}

// Mahsulotni o'zgartirish funksiyasi
function editProduct(product) {
  const newTitle = prompt("Yangi mahsulot nomini kiriting:", product.title);
  if (!newTitle) return;

  const updatedProduct = { ...product, title: newTitle };

  fetch(`${apiURL}/${product.id}`, {
    method: "PUT", // PUT metodi o'zgartirish uchun
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ma'lumotni o'zgartirishda xatolik yuz berdi!");
      }
      return response.json();
    })
    .then((updatedData) => {
      alert("Ma'lumot muvaffaqiyatli o'zgartirildi!");
      displayCard(updatedData); // Yangilangan ma'lumotni ko'rsatish
    })
    .catch((error) => {
      console.error("Xatolik:", error.message);
      alert(error.message);
    });
}

// Mahsulotni o'chirish funksiyasi
function deleteProduct(id) {
  if (!confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) return;

  fetch(`${apiURL}/${id}`, {
    method: "DELETE", // DELETE metodi o'chirish uchun
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ma'lumotni o'chirishda xatolik yuz berdi!");
      }
      alert("Mahsulot muvaffaqiyatli o'chirildi!");
      adminCards.innerHTML = ""; // Ma'lumotlarni tozalash
    })
    .catch((error) => {
      console.error("Xatolik:", error.message);
      alert(error.message);
    });
}

// Yangi mahsulot qo'shish funksiyasi
function addProduct() {
  const title = prompt("Mahsulot nomini kiriting:");
  const price = Number(prompt("Mahsulot narxini kiriting (so'm):"));
  const img = prompt("Mahsulot rasmi uchun URL kiriting:");

  if (!title || !price || !img) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  const newProduct = { title, price, img };

  fetch(apiURL, {
    method: "POST", // POST metodi qo'shish uchun
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Yangi mahsulotni qo'shishda xatolik yuz berdi!");
      }
      return response.json();
    })
    .then((addedProduct) => {
      alert("Yangi mahsulot muvaffaqiyatli qo'shildi!");
      console.log("Qo'shilgan mahsulot:", addedProduct);
    })
    .catch((error) => {
      console.error("Xatolik:", error.message);
      alert(error.message);
    });
}

// Qo'shish tugmasiga event listener qo'shish (agar kerak bo'lsa)
document.querySelector(".addProductBtn")?.addEventListener("click", addProduct);



// let formFile = document.querySelector("#formFile")
// let imgs = document.querySelector(".imgs")
// fetch("https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products").then((data)=>data.json()).then((res)=>getData(res))

// function getData(data){
//     data.forEach((value) => {
//         let img = document.createElement("img");
//         img.src = value.img;
//         imgs.append(img);
//     });
// }

// formFile.addEventListener("submit",(e)=>{
//     e.preventDefault()

//     let img = formFile.img.files[0];
//     let baseImg = "";


//     let reader = new FileReader();
//     reader.onload = function(e){
//         baseImg = e.target.result;
//         fetch("https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/products",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body: JSON.stringify({
//                 ID:17,
//                 text:"text 1",
//                 img:baseImg,
//             }),
//         })
//         .then((data)=>data.json())
//         .then((res)=>{alert("Malumot qoshildi")})
//     };
//     reader.readAsDataURL(img)
// })