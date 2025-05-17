let selectedSeats = [];
let remainingSeats = 30;
let totalPrice = 0;
const maxSeats = 3;

// Function to handle seat selection
function selectSeat(seat) {
    if (selectedSeats.includes(seat)) {
        const index = selectedSeats.indexOf(seat);
        if (index > -1) {
            selectedSeats.splice(index, 1);
        }
        document.getElementById(seat).style.backgroundColor = '';
        remainingSeats++;
        totalPrice -= 350;
    } else {
        if (remainingSeats > 0 && selectedSeats.length < maxSeats) {
            selectedSeats.push(seat);
            document.getElementById(seat).style.backgroundColor = '#1DD100';
            remainingSeats--;
            totalPrice += 350;

            updateSeatDetails(seat, 'Economy', 350);
        } else {
            alert('No more seats available or maximum seats reached.');
        }
    }
    document.getElementById('remainingSeats').innerText = remainingSeats;
    document.getElementById('totalPrice').innerText = totalPrice;
    document.getElementById('selectedSeatsCount').innerText = selectedSeats.length;
}

// Function to update seat details
function updateSeatDetails(seat, className, price) {

    const tbody = document.getElementById("seatBody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${seat}</td>
        <td>${className}</td>
        <td>${price}</td>
    `;

    tbody.appendChild(newRow);
}

const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const grandTotal = document.getElementById('grandTotal');

// Function  coupon discount
function applyCoupon() {
    const couponCode = couponInput.value.trim().toUpperCase();
    let discount = 0;
    if (couponCode === 'COUPLE 20') {
        discount = totalPrice * 0.2; 
    } else if (couponCode === 'NEW15') {
        discount = totalPrice * 0.15;
    }
    const discountedTotal = totalPrice - discount;
    grandTotal.textContent = discountedTotal;
    document.getElementById('apply').style.display='noe'
}

// applying the coupon
applyCouponBtn.addEventListener('click', applyCoupon);


function nextButtonClick() {
    const selectedSeatCount = parseInt(document.getElementById('selectedSeatsCount').innerText);
    const passengerName = document.getElementById('passengerName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();

    const nextButton = document.getElementById('nextButton');

    if (selectedSeatCount > 0 && passengerName !== '' && phoneNumber !== '' && email !== '') {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true; 
    }
}

document.getElementById('passengerName').addEventListener('input', nextButtonClick);
document.getElementById('phoneNumber').addEventListener('input', nextButtonClick);
document.getElementById('email').addEventListener('input', nextButtonClick);



document.getElementById('continueButton').addEventListener('click', function() {
    document.getElementById('my_modal_3').close();
});
