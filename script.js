let finalResult = "";

function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const futureDateInput = document.getElementById("futureDate").value;
  const result = document.getElementById("result");
  let futureAgeDiv = document.getElementById("futureAge");
  const countdown = document.getElementById("countdown");
  const zodiac = document.getElementById("zodiac");
  const downloadBtn = document.getElementById("downloadBtn");

  // If futureAgeDiv doesn't exist in HTML yet, create and append it
  if (!futureAgeDiv) {
    futureAgeDiv = document.createElement("div");
    futureAgeDiv.id = "futureAge";
    const container = document.querySelector(".container");
    container.appendChild(futureAgeDiv);
  }

  if (!dobInput) {
    result.textContent = "Please enter your birthdate.";
    futureAgeDiv.textContent = "";
    countdown.textContent = "";
    zodiac.textContent = "";
    if(downloadBtn) downloadBtn.style.display = "none";
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  // Calculate current age
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.textContent = `🎉 You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;

  // Calculate future age on a specific date if given
  if (futureDateInput) {
    const futureDate = new Date(futureDateInput);
    if (futureDate < dob) {
      futureAgeDiv.textContent = "The future date cannot be before your birthdate.";
    } else {
      // Calculate age on future date
      let fYears = futureDate.getFullYear() - dob.getFullYear();
      let fMonths = futureDate.getMonth() - dob.getMonth();
      let fDays = futureDate.getDate() - dob.getDate();

      if (fDays < 0) {
        fMonths--;
        fDays += new Date(futureDate.getFullYear(), futureDate.getMonth(), 0).getDate();
      }
      if (fMonths < 0) {
        fYears--;
        fMonths += 12;
      }

      futureAgeDiv.textContent = `🔮 On ${futureDate.toDateString()}, you will be ${fYears} years, ${fMonths} months, and ${fDays} days old.`;
    }
  } else {
    futureAgeDiv.textContent = "";
  }

  // Next birthday countdown
  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffTime = nextBirthday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  countdown.textContent = `🎂 ${diffDays} days left until your next birthday.`;

  // Zodiac sign
  zodiac.textContent = `♈ Your Zodiac Sign is: ${getZodiacSign(dob.getDate(), dob.getMonth() + 1)}`;

  // Show download button if exists
  if(downloadBtn) downloadBtn.style.display = "inline-block";

  // Store result for download
  finalResult = `${result.textContent}\n${futureAgeDiv.textContent}\n${countdown.textContent}\n${zodiac.textContent}`;
}

function getZodiacSign(day, month) {
  const zodiacSigns = [
    { sign: "Capricorn", startDate: { month: 1, day: 1 }, endDate: { month: 1, day: 19 } },
    { sign: "Aquarius",  startDate: { month: 1, day: 20 }, endDate: { month: 2, day: 18 } },
    { sign: "Pisces",    startDate: { month: 2, day: 19 }, endDate: { month: 3, day: 20 } },
    { sign: "Aries",     startDate: { month: 3, day: 21 }, endDate: { month: 4, day: 19 } },
    { sign: "Taurus",    startDate: { month: 4, day: 20 }, endDate: { month: 5, day: 20 } },
    { sign: "Gemini",    startDate: { month: 5, day: 21 }, endDate: { month: 6, day: 20 } },
    { sign: "Cancer",    startDate: { month: 6, day: 21 }, endDate: { month: 7, day: 22 } },
    { sign: "Leo",       startDate: { month: 7, day: 23 }, endDate: { month: 8, day: 22 } },
    { sign: "Virgo",     startDate: { month: 8, day: 23 }, endDate: { month: 9, day: 22 } },
    { sign: "Libra",     startDate: { month: 9, day: 23 }, endDate: { month: 10, day: 22 } },
    { sign: "Scorpio",   startDate: { month: 10, day: 23 }, endDate: { month: 11, day: 21 } },
    { sign: "Sagittarius",startDate: { month: 11, day: 22 }, endDate: { month: 12, day: 21 } },
    { sign: "Capricorn", startDate: { month: 12, day: 22 }, endDate: { month: 12, day: 31 } },
  ];

  for (let z of zodiacSigns) {
    const start = z.startDate;
    const end = z.endDate;
    if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day)
    ) {
      return z.sign;
    }
  }
  return "Unknown";
}

function downloadResult() {
    const blob = new Blob([finalResult], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "age_info.txt";  // file name you want
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadResult() {
    const now = new Date();
    const formattedDate = now.toLocaleString();
  
    const lines = finalResult.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
    let currentAgeLine = "";
    let futureAgeLine = "";
    let countdownLine = "";
    let zodiacLine = "";
  
    for (const line of lines) {
      if (line.includes("You are")) {
        currentAgeLine = line.replace(/[^\x00-\x7F]/g, "").trim();
      } else if (line.includes("On") && line.includes("you will be")) {
        futureAgeLine = line.replace(/[^\x00-\x7F]/g, "").trim();
      } else if (line.includes("days left until your next birthday")) {
        countdownLine = line.replace(/[^\x00-\x7F]/g, "").trim();
      } else if (line.includes("Your Zodiac Sign is")) {
        zodiacLine = line.replace(/[^\x00-\x7F]/g, "").trim();
      }
    }
  
    // Helper to pad or trim string to fixed width
    function padRight(str, length) {
      if (str.length > length) return str.slice(0, length-3) + "...";
      return str + " ".repeat(length - str.length);
    }
  
    // Prepare rows of table
    const rows = [
      ["Field", "Details"],
      ["Date & Time of Calculation", formattedDate],
      ["Current Age", currentAgeLine],
    ];
  
    if (futureAgeLine) {
      rows.push(["Predicted Age on Future Date", futureAgeLine]);
    }
  
    rows.push(
      ["Next Birthday Countdown", countdownLine],
      ["Zodiac Sign", zodiacLine]
    );
  
    // Calculate column widths
    const colWidths = [0, 0];
    for (const row of rows) {
      colWidths[0] = Math.max(colWidths[0], row[0].length);
      colWidths[1] = Math.max(colWidths[1], row[1].length);
    }
  
    // Create table line separator
    const separator = `+${"-".repeat(colWidths[0]+2)}+${"-".repeat(colWidths[1]+2)}+`;
  
    // Build the table as string
    let table = separator + "\n";
    for (let i = 0; i < rows.length; i++) {
      const [field, detail] = rows[i];
      table += `| ${padRight(field, colWidths[0])} | ${padRight(detail, colWidths[1])} |\n`;
      if (i === 0) {
        table += separator + "\n"; // Header separator
      }
    }
    table += separator;
  
    // Final content with header and footer
    const content = `
  AGE CALCULATION REPORT
  
  ${table}
  
  Thank you for using the Age Calculator.
  `.trim();
  
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Age_Calculation_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
  
  