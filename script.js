
$(document).ready(function() {
  $('.next').click(function() {
      $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
  });
  $('.prev').click(function() {
      $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
  });
});


const apiUrl="http://localhost:4000/sop";

$(document).ready( function () {

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

  const submitBtn = document.querySelector(".submit-sop");
  const result = document.getElementById("result");

  submitBtn.addEventListener("click", async function (event) {

    event.preventDefault();

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
    const programInCanada = document.getElementById("programInCanada").value;
    const futureGoals = document.getElementById("futureGoals").value;
    const tuitionPay = document.getElementById("tutionPay").value;
    const gicPay = document.getElementById("gicPay").value;

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
