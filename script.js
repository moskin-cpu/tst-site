
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const trackerContainer = document.getElementById('tracker-container');
    const boardingPassContainer = document.getElementById('boarding-pass-container');
    const backButton = document.getElementById('back-to-menu');
    const celebrityButtons = document.querySelectorAll('.celebrity-button');

    function showMenu() {
        menuContainer.style.display = 'flex';
        trackerContainer.style.display = 'none';
        boardingPassContainer.innerHTML = ''; // Clear previous boarding pass
    }

    function showTracker(celebrity) {
        menuContainer.style.display = 'none';
        trackerContainer.style.display = 'flex';
        displayBoardingPass(celebrity);
    }

    function displayBoardingPass(celebrity) {
        let jetData = {};
        let origin = '';
        let destination = '';
        let flightNumber = '';
        let gate = '';
        let seat = '';
        let departureTime = '';
        let arrivalTime = '';
        let date = '2023-10-27'; // Static date for now

        switch (celebrity) {
            case 'Elon Musk':
                jetData = {
                    name: 'Elon Musk',
                    jet: 'Gulfstream G650ER',
                    imageUrl: 'https://i.dailymail.co.uk/1s/2022/02/02/23/53702131-0-image-a-2_1643845899451.jpg',
                    origin: { airport: 'Austin-Bergstrom International Airport', code: 'AUS', lat: 30.1975, lon: -97.6664 },
                    destination: { airport: 'Los Angeles International Airport', code: 'LAX', lat: 33.9416, lon: -118.4005 }
                };
                origin = jetData.origin.airport;
                destination = jetData.destination.airport;
                flightNumber = 'SPCX-001';
                gate = 'E10';
                seat = '1A';
                departureTime = '10:00 AM CST';
                arrivalTime = '12:30 PM PST';
                break;
            case 'Jeff Bezos':
                jetData = {
                    name: 'Jeff Bezos',
                    jet: 'Gulfstream G650ER',
                    imageUrl: 'https://cdn.cnn.com/cnnnext/dam/assets/20090815151527-jeff-bezos-jet-full-169.jpg',
                    origin: { airport: 'Seattle-Tacoma International Airport', code: 'SEA', lat: 47.4480, lon: -122.3100 },
                    destination: { airport: 'Newark Liberty International Airport', code: 'EWR', lat: 40.6895, lon: -74.1745 }
                };
                origin = jetData.origin.airport;
                destination = jetData.destination.airport;
                flightNumber = 'AMZN-002';
                gate = 'B22';
                seat = '2B';
                departureTime = '08:00 AM PST';
                arrivalTime = '04:00 PM EST';
                break;
            case 'Bill Gates':
                jetData = {
                    name: 'Bill Gates',
                    jet: 'Bombardier Global Express',
                    imageUrl: 'https://cdn.planespotters.net/photo/098000/original/n887wm-private-bombardier-bd-700-global-express_planespottersNet_098906.jpg',
                    origin: { airport: 'Boeing Field/King County International Airport', code: 'BFI', lat: 47.4947, lon: -122.2977 },
                    destination: { airport: 'Ronald Reagan Washington National Airport', code: 'DCA', lat: 38.8510, lon: -77.0377 }
                };
                origin = jetData.origin.airport;
                destination = jetData.destination.airport;
                flightNumber = 'MSFT-003';
                gate = 'C05';
                seat = '3C';
                departureTime = '09:00 AM PST';
                arrivalTime = '05:00 PM EST';
                break;
            default:
                break;
        }

        boardingPassContainer.innerHTML = `
            <div class="boarding-pass">
                <div class="header">
                    <h2>BOARDING PASS</h2>
                    <p>Celebrity Jet Tracker</p>
                </div>
                <div class="body">
                    <div class="section">
                        <span class="label">PASSENGER</span>
                        <span class="value">${jetData.name}</span>
                    </div>
                    <div class="section">
                        <span class="label">FLIGHT</span>
                        <span class="value">${flightNumber}</span>
                    </div>
                    <div class="section">
                        <span class="label">JET</span>
                        <span class="value">${jetData.jet}</span>
                    </div>
                    <div class="section">
                        <span class="label">DATE</span>
                        <span class="value">${date}</span>
                    </div>
                    <div class="section">
                        <span class="label">FROM</span>
                        <span class="value-large">${jetData.origin.code}</span>
                        <span class="value">${origin}</span>
                    </div>
                    <div class="section">
                        <span class="label">TO</span>
                        <span class="value-large">${jetData.destination.code}</span>
                        <span class="value">${destination}</span>
                    </div>
                    <div class="section">
                        <span class="label">DEPARTURE</span>
                        <span class="value">${departureTime}</span>
                    </div>
                    <div class="section">
                        <span class="label">ARRIVAL</span>
                        <span class="value">${arrivalTime}</span>
                    </div>
                    <div class="section">
                        <span class="label">GATE</span>
                        <span class="value">${gate}</span>
                    </div>
                    <div class="section">
                        <span class="label">SEAT</span>
                        <span class="value">${seat}</span>
                    </div>
                </div>
            </div>
            <div id="globe-map" class="globe-map">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/World_map_blank_without_borders.svg" alt="World Map" class="world-map">
                <div class="pin origin-pin" style="--lat: ${jetData.origin.lat}; --lon: ${jetData.origin.lon};" data-location="${origin}"></div>
                <div class="pin destination-pin" style="--lat: ${jetData.destination.lat}; --lon: ${jetData.destination.lon};" data-location="${destination}"></div>
            </div>
        `;
    }

    celebrityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            showTracker(event.target.dataset.celebrity);
        });
    });

    backButton.addEventListener('click', showMenu);

    showMenu(); // Show the menu initially
});
