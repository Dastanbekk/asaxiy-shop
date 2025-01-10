const likedCards = document.getElementById("likedCards");
const notFound = document.getElementById("notFound")
        let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    
        function renderLikedProducts() {
          likedCards.innerHTML = ""; // Kartalarni tozalash
          if (likedProducts.length > 0) {
            likedProducts.forEach(product => {
              let card = document.createElement("div");
              card.classList.add("likeCard");
    
              card.innerHTML = `
              <div class="relative">
                <div class="flex justify-center">
          <img
            class="w-[80%]"
            src="${product.img}"
            alt="${product.title}"
          />
        </div>
        <div class="p-[15px]">
          <h2 class="text-[14px]">${product.title?.slice(0, 60) + "..."}</h2>
          <p><i class="bx bxs-star text-[gold]"></i> ${product.rate}</p>
          <h3>${product.month
            ?.toLocaleString("uz-UZ")
            .replace(/,/g, " ")} so'm/oyiga</h3>
          <div class="flex items-center justify-between">
            <h2>${product.price
              ?.toLocaleString("uz-UZ")
              .replace(/,/g, " ")} so'm</h2>
          </div>
          <div class="flex justify-between gap-[10px] py-[10px]">
            <button class="text-white rounded-lg w-[80%] bg-[dodgerblue]">Купить в один клик</button>
            <button class="btn_shop p-[10px] w-[20%] rounded-lg bg-[#00BFAF]">
              <i class="bx bx-shopping-bag text-2xl text-white"></i>
            </button>
          </div>
          <!-- Like tugmasi -->
          <button class="like-btn absolute hidden top-[15px] left-[15px]   items-center gap-2 mt-2 px-4 py-2 bg-red-500 text-white rounded-lg" data-id="${product.id}">
            <i class="bx bxs-heart"></i> Like
          </button>

          <button class="dislike-btn px-4 absolute  top-[15px] left-[15px] py-2 mt-2 bg-red-500 text-white rounded-lg" data-id="${product.id}">
                    Dislike
                  </button>
        </div>
              </div>







`;
              likedCards.append(card);
            });
    
            // Dislike tugmalariga listener qo'shish
            const dislikeButtons = document.querySelectorAll(".dislike-btn");
            dislikeButtons.forEach(button => {
              button.addEventListener("click", () => {
                const productId = button.getAttribute("data-id");
                removeLikedProduct(productId);
              });
            });
          } else {
            notFound.innerHTML = `<p class="text-center text-red-500 flex justify-center">Hech qanday mahsulot like qilinmagan!</p>`;
          }
        }
    
        function removeLikedProduct(id) {
          // LocalStorage'dan mahsulotni o'chirish
          likedProducts = likedProducts.filter(product => product.id != id);
          localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
          renderLikedProducts(); // Sahifani qayta chizish
        }
    
        // Dastlab liked mahsulotlarni render qilish
        renderLikedProducts();