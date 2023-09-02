const apiUrl="http://localhost:4000/sop";

$(document).ready( function () {
    $('a[data-toggle="tab"]').on('click', function (e) {
    e.preventDefault(); 
    const targetTabId = $(this).data('target'); 
    $(targetTabId).tab('show'); 
  });
  // Add event listeners for range inputs
  const listeningRange = document.getElementById("listeningRange");
  const listeningValueSpan = document.getElementById("listeningValueSpan");

  const readingRange = document.getElementById("readingRange");
  const readingValueSpan = document.getElementById("readingValueSpan");

  const speakingRange = document.getElementById("speakingRange");
  const speakingValueSpan = document.getElementById("speakingValueSpan");

  const writingRange = document.getElementById("writingRange");
  const writingValueSpan = document.getElementById("writingValueSpan");

  function updateValue(span, range) {
    span.textContent = range.value;
  }

  listeningRange.addEventListener("input", function () {
    updateValue(listeningValueSpan, listeningRange);
  });

  readingRange.addEventListener("input", function () {
    updateValue(readingValueSpan, readingRange);
  });

  speakingRange.addEventListener("input", function () {
    updateValue(speakingValueSpan, speakingRange);
  });

  writingRange.addEventListener("input", function () {
    updateValue(writingValueSpan, writingRange);
  });

  const form = document.querySelector("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log(form.elements);

    // Reset the result display
    result.style.display = "none";

    // Validation checks (customize this part)
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const education = document.querySelector("select").value;
    const institute = document.getElementById("institute").value;
    const fieldStudied = document.getElementById("fieldStudied").value;
    const country = document.getElementById("country").value;
    const admissionToCollege = document.getElementById("admissionToCollege").value;
    const programInCanada = document.getElementById("progranInCanada").value;
    const futureGoals = document.getElementById("futureGoals").value;
    const tuitionPay = document.getElementById("tution_pay").value;
    const gicPay = document.getElementById("GIC_pay").value;

    if (age < 18) {
      alert("Age must be at least 18 years.");
      return;
    }

    if (
      name === "" ||
      email === "" ||
      age === "" ||
      education === "0" ||
      institute === "" ||
      fieldStudied === "" ||
      country === "" ||
      admissionToCollege === "" ||
      programInCanada === "" ||
      futureGoals === "" ||
      tuitionPay === "" ||
      gicPay === ""
    ) {
      // Display an error message if any required fields are empty
      result.innerHTML =
        '<div class="alert alert-danger">Please fill out all required fields.</div>';
      result.style.display = "block";
      return;
    }

    // Create an object with the form data
    const formData = {
      name,
      email,
      age,
      education,
      admissionToCollege,
      programInCanada,
      countryOfOrigin: country,
      futureGoals,
      englishScores: {
        listening: parseInt(listeningRange.value),
        speaking: parseInt(speakingRange.value),
        writing: parseInt(writingRange.value),
        reading: parseInt(readingRange.value),
      },
      paidFirstYear: document.getElementById("flexSwitchCheckDefault").checked,
      paidGIC: document.getElementById("flexSwitchCheckDefault").checked,
      tuitionFee: tuitionPay,
      paidTowardsGIC: gicPay,
    };

    console.log(formData);
    try {
      // Send a POST request to your Express.js backend with the form data
      const response = await fetch(`${apiUrl}/generate-sop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        result.innerHTML =
          '<div class="alert alert-success">' + data.message + "</div>";
        result.style.display = "block";
      } else {
        result.innerHTML =
          '<div class="alert alert-danger">Error: Failed to generate SOP.</div>';
        result.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      result.innerHTML =
        '<div class="alert alert-danger">An error occurred while sending the request.</div>';
      result.style.display = "block";
    }
  });
});
