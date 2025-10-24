document.addEventListener('DOMContentLoaded', () => {
    showMenu(); // Show the menu when the page loads
});

const celebrityData = {
    'elon': {
        name: 'Elon Musk',
        image: 'https://cdn.cnn.com/cnnnext/dam/assets/220202161405-02-elon-musk-file-full-169.jpg',
        origin: 'Los Angeles, USA',
        destination: 'Austin, USA',
        flightNumber: 'SPX001',
        gate: 'A12',
        seat: '1A',
        departureTime: '14:30 PST',
        arrivalTime: '19:00 CST',
        departureCoordinates: { lat: 34.0522, lng: -118.2437 },
        destinationCoordinates: { lat: 30.2672, lng: -97.7431 }
    },
    'jeff': {
        name: 'Jeff Bezos',
        image: 'https://image.cnbcfm.com/api/v1/image/107064376-1653066986689-gettyimages-1240899071-AFP_32AN8J6.jpeg?v=1653067041&w=1920&h=1080',
        origin: 'Seattle, USA',
        destination: 'New York, USA',
        flightNumber: 'AMZ007',
        gate: 'B03',
        seat: '2C',
        departureTime: '10:00 PST',
        arrivalTime: '18:30 EST',
        departureCoordinates: { lat: 47.6062, lng: -122.3321 },
        destinationCoordinates: { lat: 40.7128, lng: -74.0060 }
    },
    'bill': {
        name: 'Bill Gates',
        image: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY4MzI4MjMxOTU4Mjc1MTk4/bill-gates-jr-with-microsoft-logo-and-tagline-in-background.jpg',
        origin: 'Bimini, Bahamas',
        destination: 'London, UK',
        flightNumber: 'MSF003',
        gate: 'C01',
        seat: '3B',
        departureTime: '08:00 EST',
        arrivalTime: '20:00 GMT',
        departureCoordinates: { lat: 25.7337, lng: -79.2638 },
        destinationCoordinates: { lat: 51.5074, lng: -0.1278 }
    }
};

function showMenu() {
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('jet-tracker-view').style.display = 'none';
}

function showTracker(celebrity) {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('jet-tracker-view').style.display = 'block';

    const data = celebrityData[celebrity];
    if (!data) {
        console.error('Celebrity data not found for:', celebrity);
        return;
    }

    document.getElementById('celeb-image').src = data.image;
    document.getElementById('celeb-name').textContent = data.name;
    document.getElementById('origin').textContent = data.origin;
    document.getElementById('destination').textContent = data.destination;
    document.getElementById('flight-number').textContent = data.flightNumber;
    document.getElementById('gate').textContent = data.gate;
    document.getElementById('seat').textContent = data.seat;
    document.getElementById('departure-time').textContent = data.departureTime;
    document.getElementById('arrival-time').textContent = data.arrivalTime;

    // Update map pins
    const map = document.getElementById('globe-map');
    map.innerHTML = ''; // Clear previous pins

    // Origin pin
    const originPin = document.createElement('div');
    originPin.className = 'map-pin origin-pin';
    originPin.style.setProperty('--lat', data.departureCoordinates.lat);
    originPin.style.setProperty('--lng', data.departureCoordinates.lng);
    originPin.title = `Origin: ${data.origin}`;
    map.appendChild(originPin);

    // Destination pin
    const destPin = document.createElement('div');
    destPin.className = 'map-pin destination-pin';
    destPin.style.setProperty('--lat', data.destinationCoordinates.lat);
    destPin.style.setProperty('--lng', data.destinationCoordinates.lng);
    destPin.title = `Destination: ${data.destination}`;
    map.appendChild(destPin);
}