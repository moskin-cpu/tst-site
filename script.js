document.addEventListener('DOMContentLoaded', () => {
    fetchJetData();
});

async function fetchJetData() {
    // In a real application, you would fetch data from an API here.
    // For example:
    // const response = await fetch('YOUR_ELON_JET_API_ENDPOINT');
    // const data = await response.json();
    // For now, we'll use mock data.

    const mockData = {
        departureAirport: 'Los Angeles International Airport (LAX)',
        arrivalAirport: 'Austin-Bergstrom International Airport (AUS)',
        departureTime: '2025-10-24 10:00 AM PST',
        aircraft: 'Gulfstream G650ER',
        currentLocation: 'Over Arizona'
    };

    updateBoardingPass(mockData);
}

function updateBoardingPass(data) {
    document.getElementById('departure-airport').textContent = data.departureAirport;
    document.getElementById('arrival-airport').textContent = data.arrivalAirport;
    document.getElementById('departure-time').textContent = data.departureTime;
    // You can add more fields to the HTML and update them here if needed,
    // like aircraft type or current location.
}