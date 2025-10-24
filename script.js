document.addEventListener('DOMContentLoaded', () => {
    const celebrityJets = [
        { name: 'Elon Musk', apiEndpoint: 'https://api.example.com/elon-jet' }, // Placeholder API
        { name: 'Jeff Bezos', apiEndpoint: 'https://api.example.com/jeff-jet' }, // Placeholder API
        { name: 'Bill Gates', apiEndpoint: 'https://api.example.com/bill-jet' } // Placeholder API
    ];

    async function fetchJetData(celebrity) {
        // In a real application, you would make an HTTP request here.
        // For this example, we'll simulate fetching data.
        console.log(`Fetching data for ${celebrity.name} from ${celebrity.apiEndpoint}`);
        return new Promise(resolve => {
            setTimeout(() => {
                const data = {
                    flightNumber: `FL${Math.floor(Math.random() * 1000)}`,
                    departure: {
                        airport: `Airport ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                        time: new Date().toLocaleTimeString(),
                        city: `City ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                        gate: `G${Math.floor(Math.random() * 20) + 1}`
                    },
                    arrival: {
                        airport: `Airport ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                        time: new Date(Date.now() + Math.random() * 3600000 * 5).toLocaleTimeString(),
                        city: `City ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                        gate: `G${Math.floor(Math.random() * 20) + 1}`
                    },
                    status: Math.random() > 0.5 ? 'On Time' : 'Delayed',
                    aircraft: `Jet ${Math.floor(Math.random() * 10000)}`,
                    passenger: celebrity.name
                };
                resolve(data);
            }, 1000);
        });
    }

    function displayBoardingPass(data) {
        const boardingPassContainer = document.getElementById('boarding-pass-container');
        if (!boardingPassContainer) {
            console.error('Boarding pass container not found.');
            return;
        }

        const passHtml = `
            <div class="boarding-pass">
                <div class="header">
                    <h2>Boarding Pass</h2>
                    <p>Flight ${data.flightNumber}</p>
                </div>
                <div class="body">
                    <div class="section">
                        <span class="label">Passenger</span>
                        <span class="value">${data.passenger}</span>
                    </div>
                    <div class="section">
                        <span class="label">Aircraft</span>
                        <span class="value">${data.aircraft}</span>
                    </div>
                    <div class="section departure-arrival">
                        <div class="location">
                            <span class="label">From</span>
                            <span class="airport-code">${data.departure.airport.replace('Airport ', '')}</span>
                            <span class="city">${data.departure.city}</span>
                            <span class="time">${data.departure.time}</span>
                            <span class="gate">Gate ${data.departure.gate}</span>
                        </div>
                        <div class="arrow">✈</div>
                        <div class="location">
                            <span class="label">To</span>
                            <span class="airport-code">${data.arrival.airport.replace('Airport ', '')}</span>
                            <span class="city">${data.arrival.city}</span>
                            <span class="time">${data.arrival.time}</span>
                            <span class="gate">Gate ${data.arrival.gate}</span>
                        </div>
                    </div>
                    <div class="section status">
                        <span class="label">Status</span>
                        <span class="value">${data.status}</span>
                    </div>
                </div>
                <div class="barcode">
                    <img src="https://barcode.tec-it.com/barcode.ashx?data=${data.flightNumber}&code=Code128&dpi=96" alt="barcode">
                </div>
            </div>
        `;
        boardingPassContainer.innerHTML += passHtml; // Append new boarding passes
    }

    async function initializeJetTracker() {
        for (const celeb of celebrityJets) {
            const data = await fetchJetData(celeb);
            displayBoardingPass(data);
        }
    }

    initializeJetTracker();
});