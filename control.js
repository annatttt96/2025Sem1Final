//Order JS
let selectedProduct = "";
let selectedDate = "";

function goToDateStep() {
  selectedProduct = document.getElementById("product").value;

  if (!selectedProduct) {
    alert("Please select a product first.");
    return;
  }

  document.getElementById("step-product").style.display = "none";
  document.getElementById("step-date").style.display = "block";
}

function goBackToProduct() {
  document.getElementById("step-date").style.display = "none";
  document.getElementById("step-product").style.display = "block";
}

function goToOptionsStep() {
  selectedDate = document.getElementById("order-date").value;
  if (!selectedDate) {
    alert("Please select a date.");
    return;
  }

  document.getElementById("step-date").style.display = "none";
  document.getElementById("step-options").style.display = "block";

  if (selectedProduct === "chocolate") {
    document.getElementById("chocolate-options").style.display = "block";
    document.getElementById("cake-options").style.display = "none";
  } else {
    document.getElementById("chocolate-options").style.display = "none";
    document.getElementById("cake-options").style.display = "block";
    // Check if selected date is Saturday
    const day = new Date(selectedDate).getDay(); // 6 = Saturday
    document.getElementById("opera-option").style.display = (day === 6) ? "block" : "none";
  }
}

function goBackToDate() {
  document.getElementById("step-options").style.display = "none";
  document.getElementById("step-date").style.display = "block";
}

function populateCakeSizes() {
  const type = document.getElementById("cake-type").value;
  const sizeDropdown = document.getElementById("cake-size");

  const cakeSizes = {
    "Japonaise": {
      "X-Small": "$53", "Small": "$60", "Medium": "$70", "Large": "$80"
    },
    "Queen of Sheba": {
      "Small": "$50", "Medium": "$70", "Large": "$85"
    },
    "Blood Orange Mousse": {
      "Small": "$64", "Medium": "$74", "Large": "$84"
    },
    "Raspberry Mousse": {
      "Small": "$75", "Large": "$85"
    },
    "Lemon Mousse": {
      "Small": "$64", "Medium": "$74", "Large": "$84"
    },
    "Dacquoise": {
      "X-Small": "$53", "Small": "$60", "Medium": "$70", "Large": "$80"
    },
    "Opera": {
      "Medium": "$65", "Other": "Please call for other sizes"
    }
  };

  sizeDropdown.innerHTML = "";

  if (cakeSizes[type]) {
    for (const size in cakeSizes[type]) {
      const label = `${size} - ${cakeSizes[type][size]}`;
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
      sizeDropdown.appendChild(option);
    }
  } else {
    sizeDropdown.innerHTML = "<option value=''>--No sizes--</option>";
  }
}

function formatDate(rawDate) {
  const dateObj = new Date(rawDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
}

function goToInfoStep() {
  // Check if chocolate/cake options are selected
  if (selectedProduct === "chocolate") {
    const weight = document.getElementById("choc-weight").value;
    if (!weight) {
      alert("Please select a chocolate weight.");
      return;
    }
  } else {
    const cake = document.getElementById("cake-type").value;
    const size = document.getElementById("cake-size").value;
    if (!cake || !size) {
      alert("Please select a cake and size.");
      return;
    }
  }

  // Build summary
  let summary = `Product: ${selectedProduct.toUpperCase()}<br/>`;
  if (selectedProduct === "chocolate") {
    const weight = document.getElementById("choc-weight").value;
    summary += `Weight: ${weight} gm`;
  } else {
    const cake = document.getElementById("cake-type").value;
    const size = document.getElementById("cake-size").value;
    summary += `Cake: ${cake} <br/>Size: ${size}`;
  }

  document.getElementById("order-summary").innerHTML = summary;

  // Switch steps
  document.getElementById("step-options").style.display = "none";
  document.getElementById("step-info").style.display = "block";
}

function goBackToOptions() {
  document.getElementById("step-info").style.display = "none";
  document.getElementById("step-options").style.display = "block";
}

function goToPayment() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!email || !phone) {
    alert("Please enter both email and phone number.");
    return;
  }

  document.getElementById("step-info").style.display = "none";
  document.getElementById("step-payment").style.display = "block";
}

function goBackToInfo() {
  document.getElementById("step-payment").style.display = "none";
  document.getElementById("step-info").style.display = "block";
}

function completeOrder() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  // Final step
  document.getElementById("step-payment").style.display = "none";
  document.getElementById("step-confirm").style.display = "block";
}
