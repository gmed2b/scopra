const liste_monument = document.querySelector('#liste-monument');

fetch(
	'https://www.data.corsica/api/records/1.0/search/?dataset=liste-des-monuments-historiques-en-corse&rows=9999'
) // récupérer donnnée l'API
	.then((res) => res.json()) // met les donnée en json
	.then((data) => {
		const add_element = (element, parent, textContent) => {
			const new_element = document.createElement(element);
			parent.appendChild(new_element);
			new_element.setAttribute('class', 'parent_projet');
			new_element.textContent = textContent;
		};

		// liste les monuments
		data.records.forEach((element) => {
			textContent = element.fields.appelation;
			add_element('div', liste_monument, textContent);
		});
	});

// il y a 330 monuments dans l'API de l'université
