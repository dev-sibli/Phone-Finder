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
	// console.log(details);
	const fullView = document.getElementById('full-details');
	const div = document.createElement('div');
	div.innerHTML = `
       <div class="card mb-3">
			<div class="row g-0">
			    <div class="col-lg-6">
					<img class="mx-5 mt-5 w-75" src="${
						details.image
					}" class="img-fluid rounded-start" />
				</div>
					    <div class="col-lg-6">
						    <div class="card-body">
							    <h5 class="card-title">${details.name}</h5>
							    <p class="card-text">${
										details.releaseDate
											? details.releaseDate
											: 'No release date Found'
									}</p>
							    <p class="card-text"><strong>Main Features</strong></p>
							    <p class="card-text">Storage: 
								${details.mainFeatures.storage}
							    </p>
							    <p class="card-text">Display Size: 
								${details.mainFeatures.displaySize}
							    </p>
							    <p class="card-text">ChipSet:
								${details.mainFeatures.chipSet}
							    </p>
							    <p class="card-text">Memory: 
								${details.mainFeatures.memory}
							    </p>
					        </div>
                        <div class="card text-dark bg-warning mb-3" >
                        <div class="card-header">Sensors</div>
                            <div class="card-body">
                                <p class="card-text">${
																	details.mainFeatures.sensors
																}</p>
                            </div>
                            </div>
                            <div class="card text-dark bg-info mb-3">
                            <div class="card-header">Others</div>
                            <div class="card-body">
                            <p class="card-text">WLAN: ${
															details.others.WLAN
														}</p>
                            <p class="card-text">Bluetooth: ${
															details.others.Bluetooth
														}</p>
                            <p class="card-text">GPS: ${details.others.GPS}</p>
                            <p class="card-text">NFC: ${details.others.NFC}</p>
                            <p class="card-text">USB: ${details.others.USB}</p>
                            </div>
                            </div>
                        </div>
                            
		        </div>
	            </div>
    `;
	fullView.appendChild(div);
};
