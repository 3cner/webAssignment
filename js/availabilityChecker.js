document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#checkin-checkout", {
        mode: "range",  
        minDate: "today",  
        dateFormat: "Y-m-d", 
        onClose: function(selectedDates) {
            if (selectedDates.length === 2) {
                // Split dates into check-in and check-out
                const checkinDate = selectedDates[0];
                const checkoutDate = selectedDates[1];
                console.log("Check-in:", checkinDate);
                console.log("Check-out:", checkoutDate);
            }
        }
    });


    // Example of booked dates
    const bookedDates = [
        { checkin: '2024-09-20', checkout: '2024-09-25' },
        { checkin: '2024-10-01', checkout: '2024-10-05' }
    ];

    // Check availability
    document.getElementById('check-availability').addEventListener('click', function() {
        const selectedRange = document.getElementById('checkin-checkout').value;

        if (selectedRange) {
            const dates = selectedRange.split(" to ");
            const checkinDate = new Date(dates[0]);
            const checkoutDate = new Date(dates[1]);

            function isAvailable(checkin, checkout) {
                for (let i = 0; i < bookedDates.length; i++) {
                    const bookedCheckin = new Date(bookedDates[i].checkin);
                    const bookedCheckout = new Date(bookedDates[i].checkout);

                    if (checkin < bookedCheckout && checkout > bookedCheckin) {
                        return false;
                    }
                }
                return true;
            }

            const resultElement = document.getElementById('availability-result');
            if (isAvailable(checkinDate, checkoutDate)) {
                resultElement.textContent = "The dates are available! Please contact us to make a booking.";
                resultElement.style.color = "green";
            } else {
                resultElement.textContent = "Sorry, the dates are not available. Please choose different dates.";
                resultElement.style.color = "red";
            }
        } else {
            alert("Please select your travel dates.");
        }
    });
});

