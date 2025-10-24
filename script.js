document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const celebrity = urlParams.get('celebrity');

    if (celebrity) {
        showTracker(celebrity);
    }

    const backButton = document.getElementById('back-to-menu');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});

function showTracker(celebrity) {
    const boardingPassContainer = document.getElementById('boarding-pass-container');
    const globeMap = document.getElementById('globe-map');

    if (!boardingPassContainer || !globeMap) {
        console.error("Tracker elements not found.");
        return;
    }

    boardingPassContainer.innerHTML = '';
    globeMap.innerHTML = ''; // Clear previous map content

    // Simulated jet data
    const jetData = {
        'elon': {
            name: 'Elon Musk',
            flight: 'SPACEX001',
            origin: 'Los Angeles (LAX)',
            destination: 'Boca Chica (TXB)',
            departureTime: '10:00 AM',
            arrivalTime: '12:30 PM',
            gate: 'A15',
            seat: '1A',
            originLat: 33.9416, originLon: -118.4005,
            destLat: 25.9968, destLon: -97.4227
        },
        'jeff': {
            name: 'Jeff Bezos',
            flight: 'BLUEORIGIN001',
            origin: 'Seattle (SEA)',
            destination: 'Cape Canaveral (CCAFS)',
            departureTime: '09:00 AM',
            arrivalTime: '05:00 PM',
            gate: 'B22',
            seat: '2B',
            originLat: 47.4433, originLon: -122.3021,
            destLat: 28.4855, destLon: -80.5779
        },
        'bill': {
            name: 'Bill Gates',
            flight: 'GATESFLIGHT01',
            origin: 'Redmond (RDM)',
            destination: 'New York (JFK)',
            departureTime: '11:00 AM',
            arrivalTime: '07:00 PM',
            gate: 'C05',
            seat: '3C',
            originLat: 44.0886, originLon: -121.1578,
            destLat: 40.6413, destLon: -73.7781
        }
    };

    const data = jetData[celebrity];

    if (data) {
        const boardingPassHtml = `
            <div class="boarding-pass">
                <div class="header">
                    <h2>BOARDING PASS</h2>
                </div>
                <div class="body">
                    <div class="row">
                        <div class="field">
                            <span class="label">PASSENGER NAME</span>
                            <span class="value">${data.name}</span>
                        </div>
                        <div class="field">
                            <span class="label">FLIGHT</span>
                            <span class="value">${data.flight}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <span class="label">FROM</span>
                            <span class="value">${data.origin}</span>
                        </div>
                        <div class="field">
                            <span class="label">TO</span>
                            <span class="value">${data.destination}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <span class="label">DEPARTURE</span>
                            <span class="value">${data.departureTime}</span>
                        </div>
                        <div class="field">
                            <span class="label">ARRIVAL</span>
                            <span class="value">${data.arrivalTime}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <span class="label">GATE</span>
                            <span class="value">${data.gate}</span>
                        </div>
                        <div class="field">
                            <span class="label">SEAT</span>
                            <span class="value">${data.seat}</span>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <img src="https://barcode.tec-it.com/barcode.ashx?data=${data.flight}&code=Code128&multiplebarcodes=false&unit=px&dpi=72&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&stretch=true&width=200&height=50" alt="Barcode">
                </div>
            </div>
        `;
        boardingPassContainer.innerHTML = boardingPassHtml;

        // Simulate pins on a globe map
        const mapHtml = `
            <div class="globe-img-container">
                <img src="https://i.pinimg.com/originals/e4/26/12/e42612c68c7b85b4d097a840d48d804c.gif" alt="Globe" class="globe-map-image">
                <div class="pin origin-pin" style="top: ${50 - data.originLat/90 * 50}%; left: ${50 + data.originLon/180 * 50}%;" title="Origin: ${data.origin}"></div>
                <div class="pin destination-pin" style="top: ${50 - data.destLat/90 * 50}%; left: ${50 + data.destLon/180 * 50}%;" title="Destination: ${data.destination}"></div>
            </div>
        `;
        globeMap.innerHTML = mapHtml;

    } else {
        boardingPassContainer.innerHTML = '<p>No jet data found for this celebrity.</p>';
    }
}
