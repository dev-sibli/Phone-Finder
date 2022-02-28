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
};
const displayPhone = (phone) => {
	phone.forEach((phone) => {
		console.log(phone);
	});
};
