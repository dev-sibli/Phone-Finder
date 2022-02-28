phoneSearch = () => {
	const inputText = document.getElementById('input-value');
	const searchText = inputText.value;
	console.log(searchText);
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
		console.log(phone);
		const phoneSearch = document.getElementById('phone-search');
		const div = document.createElement('div');
		div.className = 'col g-5';
		div.innerHTML = `
        <div class="card">
				<img class="m-5" src="${phone.image}" class="card-img-top" />
                <hr>
				<div class="card-body">
					<h5 class="card-title">${phone.phone_name}</h5>
					<p class="card-text">${phone.brand}</p>
					<button class="btn btn-primary w-100">Button</button>
				</div>
			</div>
        `;
		phoneSearch.appendChild(div);
	});
};
