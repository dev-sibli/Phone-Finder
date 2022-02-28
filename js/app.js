phoneSearch = () => {
	const inputText = document.getElementById('input-value');
	const searchText = inputText.value;
	// console.log(searchText);
	// API Fetch via Link
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => displayPhone(data.data));
	inputText.value = '';
	const result = document.getElementById('phone-search');
	result.textContent = '';
};
const displayPhone = (phone) => {
	phone.forEach((phone) => {
		// console.log(phone);
		const phoneSearch = document.getElementById('phone-search');
		const div = document.createElement('div');
		div.className = 'col g-5';
		div.innerHTML = `
        <div class="card">
				<img class="mx-5 my-3" src="${phone.image}" class="card-img-top" />
                <hr>
				<div class="card-body">
					<h5 class="card-title">${phone.phone_name}</h5>
					<p class="card-text">${phone.brand}</p>
					<button onClick="fullDetails('${phone.slug}')" class="btn btn-primary w-100">Full Details</button>
				</div>
			</div>
        `;
		phoneSearch.appendChild(div);
	});
};
// Full details OnClick
const fullDetails = (id) => {
	console.log(id);
	const url = `https://openapi.programming-hero.com/api/phone/${id}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => displayDetails(data.data));
	const detailsField = document.getElementById('full-details');
	detailsField.innerHTML = '';
};
// Full details
const displayDetails = (details) => {
	console.log(details);
	const fullView = document.getElementById('full-details');
	const div = document.createElement('div');
	div.innerHTML = `
    <div class="card">
				<div class="col-6">
                <img class="mx-5 my-3" src="${details.image}" class="card-img-top" />
                </div>
				<div class="card-body col-6">
					<h5 class="card-title">${details.name}</h5>
					<p class="card-text">${details.releaseDate}</p>
					<p class="card-text">${details.mainFeatures.storage}</p>
					<p class="card-text">${details.mainFeatures.displaySize}</p>
				</div>
			</div>
    `;
	fullView.appendChild(div);
};
