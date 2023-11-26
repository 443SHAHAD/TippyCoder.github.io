
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('enrollmentForm');
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const dob = new Date(document.getElementById('DOB').value);
    const phone = document.getElementById('PN').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const imgFile = document.getElementById('img').files[0];

       // Store first name in local storage
if (fname) {
    localStorage.setItem('childFirstName', fname);
  }

// After retrieving other form data
if (imgFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgData = event.target.result;
      displayChildInfo(imgData);
    };
    reader.readAsDataURL(imgFile);
  } else {
    displayChildInfo(null); // If no image is uploaded
  }
  
     // Check for empty fields
     if (!fname || !lname || !dob || !phone || !email || !gender) {
      alert('Please fill in all fields');
      return;
    }

    // Validate name format
    if (!/^[a-zA-Z]+$/.test(fname) || !/^[a-zA-Z]+$/.test(lname)) {
      alert('First and Last name should only contain letters');
      return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number should have exactly 10 digits');
      return;
    }

    // Validate DOB (no one under 6 years old allowed)
    const currentDate = new Date();
    const maxDOB = new Date(currentDate.getFullYear() - 6, currentDate.getMonth(), currentDate.getDate());
    if (dob > maxDOB) {
      alert('Child should be at least 6 years old');
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Child Information</title>
        <style>
      body {
        font-family: Arial, sans-serif;
      }
      .child-info {
        border: 2px solid #000;
        padding: 20px;
        max-width: 400px;
        margin: 20px auto;
      }
      .child-info h2 {
        margin-top: 0;
      }
    </style>
      </head>
      <body>
        <h2>Child's Information</h2>
        <div>
        
        ${imgFile ? `<img src="${URL.createObjectURL(imgFile)}" style="max-width: 100px; max-height: 100px;">` : 'No photo uploaded'}
      </div>
        <p>First Name: ${fname}</p>
        <p>Last Name: ${lname}</p>
        <p>Date of Birth: ${dob.toDateString()}</p>
        <p>Phone Number: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Gender: ${gender}</p>
       
        <button onclick="window.print()">Print</button>
      </body>
      </html>
    `);
  });
});