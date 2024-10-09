// Function to parse CSV data
function parseCSV(csv) {
    const rows = csv.trim().split('\n');
    const headers = rows[0].split(';');
    return rows.slice(1).map(row => {
        const values = row.split(';');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
}

// Function to fetch the CSV data from a file
function loadCSV() {
    return fetch('DATABASE NEEDED.csv') // Assuming courses.csv is in the same directory
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvContent => {
            const csvData = parseCSV(csvContent);
            localStorage.setItem('csvData', JSON.stringify(csvData)); // Store data in localStorage
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to fetch data based on registration number and redirect
function fetchData() {
    const regId = document.getElementById('regid').value.trim();
    if (regId) {
        loadCSV().then(() => {
            window.location.href = `schedule_view.html?regId=${regId}`; // Redirect to schedule view
        });
    } else {
        alert('Please enter a registration number.');
    }
}
