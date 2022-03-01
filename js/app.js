/*--------------------------------
		Search box click handler
		------------------------------*/
phoneSearch = () => {
	const inputText = document.getElementById('input-value');
	const searchText = inputText.value;
	/*--------------------------------
		search box empty error handle
		------------------------------*/
	if (searchText === '') {
		toggleAlert('block');
		document.getElementById('phone-search').textContent = '';
		document.getElementById('full-details').textContent = '';
	} else {
		/*----------------------------
		API Fetch via Link
		------------------------------*/
		toggleSpinner('block');
		const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => displayPhone(data.data.slice(0, 20)));
		inputText.value = '';
		const result = document.getElementById('phone-search');
		result.textContent = '';
		const viewDetails = document.getElementById('full-details');
		viewDetails.textContent = '';
		toggleAlert('none');
	}
};
/*----------------------------
Alert & Spinner 
------------------------------*/
const toggleAlert = (displayStyle) => {
	document.getElementById('alert').style.display = displayStyle;
};
const closeAlert = () => {
	toggleAlert('none');
};
const toggleSpinner = (spin) => {
	document.getElementById('spinner').style.display = spin;
};
/*----------------------------
if Search Input is not found Error handle
------------------------------*/
const displayPhone = (phones) => {
	if (!phones.length) {
		toggleAlert('block');
	}
	phones.forEach((phone) => {
		const phoneSearch = document.getElementById('phone-search');
		const div = document.createElement('div');
		div.className = 'col g-4';
		/*----------------------------
		Card details in Html 
		------------------------------*/
		div.innerHTML = `
        	<div class="card shadow-sm">
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
	toggleSpinner('none');
};
/*----------------------------
Full details function
------------------------------*/
const fullDetails = (id) => {
	toggleSpinner('block');
	const url = `https://openapi.programming-hero.com/api/phone/${id}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => displayDetails(data.data));
	const detailsField = document.getElementById('full-details');
	detailsField.innerHTML = '';
};
/*----------------------------------
Full details Display on Single Card
------------------------------------*/
const displayDetails = (details) => {
	const fullView = document.getElementById('full-details');
	const div = document.createElement('div');
	div.innerHTML = `
       <div class="card mb-3 container">
			<div class="row g-0">
			    <div class="col-lg-6">
					<img class="mx-5 my-5 w-75" src="${
						details.image
					}" class="img-fluid rounded-start" />
				</div>
					    <div class="col-lg-6">
						    <div class="card-body">
							    <h3 class="card-title text-center">${details.name}</h3>
							    <p class="text-center">${
										details.releaseDate
											? details.releaseDate
											: 'No Release Date Found'
									}</p>
							    <p><strong>Main Features:</strong></p>
							    <p>Storage: ${details.mainFeatures.storage}</p>
							    <p>Display Size: ${details.mainFeatures.displaySize}</p>
							    <p>ChipSet: ${details.mainFeatures.chipSet}</p>
							    <p>Memory: ${details.mainFeatures.memory}</p>
					       
                       
                        	<p><strong>Sensors:</strong></p>
							<p>${details.mainFeatures.sensors}</p>
                            <p><strong>Others:</strong></p>
                            <p>WLAN: ${
															details?.others?.WLAN
																? details.others.WLAN
																: 'Not Found'
														}</p>
                            <p>Bluetooth: ${
															details?.others?.Bluetooth
																? details.others.Bluetooth
																: 'Not Found'
														}</p>
            	<p>GPS: ${
								details?.others?.GPS ? details.others.GPS : 'Not Found'
							}</p>
                <p>NFC: ${
									details?.others?.NFC ? details.others.NFC : 'Not Found'
								}</p>
                <p>USB: ${
									details?.others?.USB ? details.others.USB : 'Not Found'
								}</p>
                            </div>
							 </div>
                        
                            
		        </div>
	            </div>
    `;
	fullView.appendChild(div);
	toggleSpinner('none');
};
