


// 
const loadAllPhone = async (status, searchText) => {
    // console.log(searchText)
    document.getElementById('spinner').style.display = " none"

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
    const data = await response.json();
    console.log(data)
    if (status) {
        displayAllPhon(data.data)
    }
    else {

        displayAllPhon(data.data.slice(0, 6))
    }



};

const displayAllPhon = (phone) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = "";
    phone.forEach(phone => {
        const {brand, phone_name, slug, image} = phone;
        const div = document.createElement("div");
        div.classList =""
        div.innerHTML = `
        
        <div class="card bg-base-100 w-96 shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src=${image}
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p> ${phone_name} </P>
                <p>${slug}</p>
                <div class="card-actions">
                <button onclick="phoneDetailse('${slug}')" class="btn btn-primary">Show Details!</button>
                </div>
            </div>
        </div>

        `
        phonesContainer.append(div)
    });

}

const handleShowAll = () => {
    loadAllPhone(true)
}

const handleSearch = () => {
    document.getElementById('spinner').style.display = " block"

    const searchText = document.getElementById('search-box').value;

    setTimeout(function () {
        loadAllPhone(false, searchText)
    }, 3000)

}


const phoneDetailse = async (slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data)

    const {brand, slug, image} = data.data;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML= `

    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="text-lg font-bold">${brand}</h3>
            <p class="py-4">${slug}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
        </div>
    </dialog>
    `
        my_modal_5.showModal()

} 



loadAllPhone(false, "iphone")