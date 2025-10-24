document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const jetTrackerView = document.getElementById('jet-tracker-view');
    const celebrityButtons = document.querySelectorAll('.celebrity-button');
    const backToMenuButton = document.getElementById('back-to-menu');
    const currentCelebritySpan = document.getElementById('current-celebrity');
    const boardingPassContainer = document.getElementById('boarding-pass-container');
    const globeMap = document.getElementById('globe-map');

    const celebrityData = {
        'Elon Musk': {
            jet: 'Gulfstream G650ER',
            registration: 'N628TS',
            airline: 'SpaceX Air',
            origin: { city: 'Austin, TX', latitude: 30.2672, longitude: -97.7431 },
            destination: { city: 'New York, NY', latitude: 40.7128, longitude: -74.0060 },
            departureTime: '10:00 AM PST',
            arrivalTime: '02:30 PM EST',
            gate: 'A12',
            seat: '1A'
        },
        'Jeff Bezos': {
            jet: 'Gulfstream G650ER',
            registration: 'N750BJ',
            airline: 'Blue Origin Air',
            origin: { city: 'Seattle, WA', latitude: 47.6062, longitude: -122.3321 },
            destination: { city: 'London, UK', latitude: 51.5074, longitude: 0.1278 },
            departureTime: '09:00 AM PST',
            arrivalTime: '05:00 PM GMT',
            gate: 'B05',
            seat: '2B'
        },
        'Bill Gates': {
            jet: 'Bombardier Global 6000',
            registration: 'N194WM',
            airline: 'Gates Ventures',
            origin: { city: 'Redmond, WA', latitude: 47.6740, longitude: -122.1215 },
            destination: { city: 'Paris, FR', latitude: 48.8566, longitude: 2.3522 },
            departureTime: '11:30 AM PST',
            arrivalTime: '07:30 PM CET',
            gate: 'C03',
            seat: '3C'
        }
    };

    function showJetTrackerView(celebrityName) {
        mainMenu.classList.add('hidden');
        jetTrackerView.classList.remove('hidden');
        currentCelebritySpan.textContent = celebrityName;
        boardingPassContainer.innerHTML = ''; // Clear previous boarding passes
        globeMap.innerHTML = ''; // Clear previous pins

        const data = celebrityData[celebrityName];
        if (data) {
            createBoardingPass(data);
            addPinsToGlobe(data.origin, data.destination);
        } else {
            boardingPassContainer.innerHTML = '<p>No data available for ' + celebrityName + '</p>';
        }
    }

    function createBoardingPass(data) {
        const boardingPassHtml = `
            <div class="boarding-pass">
                <h3>${data.airline}</h3>
                <p><strong>Passenger:</strong> ${currentCelebritySpan.textContent}</p>
                <p><strong>Jet:</strong> ${data.jet} (${data.registration})</p>
                <p><strong>From:</strong> ${data.origin.city}</p>
                <p><strong>To:</strong> ${data.destination.city}</p>
                <p><strong>Departure:</strong> ${data.departureTime}</p>
                <p><strong>Arrival:</strong> ${data.arrivalTime}</p>
                <p><strong>Gate:</strong> ${data.gate} | <strong>Seat:</strong> ${data.seat}</p>
                <div class="barcode"></div>
            </div>
        `;
        boardingPassContainer.innerHTML = boardingPassHtml;
    }

    // Simple function to map latitude/longitude to a percentage for pin placement on a flat map image
    function getPinPosition(latitude, longitude) {
        // These are very rough approximations for a general globe image
        // A real implementation would require a proper map library (e.g., Leaflet, OpenLayers, Google Maps API)
        const latPercent = ((90 - latitude) / 180) * 100;
        const lonPercent = ((180 + longitude) / 360) * 100;
        return { top: latPercent, left: lonPercent };
    }

    function addPinsToGlobe(origin, destination) {
        // Origin Pin
        const originPos = getPinPosition(origin.latitude, origin.longitude);
        const originPin = document.createElement('div');
        originPin.className = 'map-pin origin';
        originPin.style.top = `${originPos.top}%`;
        originPin.style.left = `${originPos.left}%`;
        originPin.setAttribute('data-location', `Origin: ${origin.city}`);
        globeMap.appendChild(originPin);

        // Destination Pin
        const destPos = getPinPosition(destination.latitude, destination.longitude);
        const destPin = document.createElement('div');
        destPin.className = 'map-pin destination';
        destPin.style.top = `${destPos.top}%`;
        destPin.style.left = `${destPos.left}%`;
        destPin.setAttribute('data-location', `Destination: ${destination.city}`);
        globeMap.appendChild(destPin);
    }

    celebrityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const celebrityName = event.target.dataset.celebrity;
            showJetTrackerView(celebrityName);
        });
    });

    backToMenuButton.addEventListener('click', () => {
        jetTrackerView.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });
});