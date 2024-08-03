$(document).ready(function() {
    // Get request to API
    $("#form").submit(function(event) {
        event.preventDefault();
        var ip = $("#ip").val();

        if (ip === "") {
            alert("Please enter an IP address");
            return; // Exit the function if no IP is entered
        }

        var API_KEY = "28dd503ea1644af09450ac492428db6c";
        var url = "https://api.ipgeolocation.io/ipgeo?apiKey=" + API_KEY + "&ip=" + ip;

        $.get(url, function(data) {
            var country_name = data.country_name;
            var city = data.city;
            var country_flag = data.country_flag;
            var lat = parseFloat(data.latitude);
            var lng = parseFloat(data.longitude);

            // Make an object
            var position = {
                lat: lat,
                lng: lng
            }

            displayDetails(country_name, city, country_flag);
            displayMap(position);
        });
    });

    function displayDetails(country_name, city, country_flag) {
        var details = `
            <h1>${country_name}</h1>
            <h2>${city}</h2>
            <img src="${country_flag}" alt="Country Flag">
        `;

        $("#details").html(details); // Use html() to set the content
    }

    function displayMap(position) {
        var link = `<a href="https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}" target="_blank">Link to map</a>`;
        $("#map").html(link); // Use html() to set the content
    }
});
