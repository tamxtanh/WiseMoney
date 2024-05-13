export const generateMonthList = (currentDate) => {
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const monthList = [];
  for (let i = 0; i < 12; i++) {
    const month =
      currentMonth - i > 0 ? currentMonth - i : 12 + (currentMonth - i);
    const year = currentMonth - i > 0 ? currentYear : currentYear - 1;
    const monthYearString = `${month <= 9 ? "0" : ""}${month}/${year}`;

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    // Get the last day of the next month, then subtract 1 day to get the last day of the current month
    const lastDayOfMonth = new Date(year, month, 0);

    // Convert to the desired format (YYYY-MM-DD)
    const startDate = firstDayOfMonth
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    const endDate = lastDayOfMonth
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    monthList.push({
      key: `${i + 1}`,
      title: `${monthYearString}`,
      content: {
        walletId: 1,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  return monthList;
};

export const generateDateList = (currentDate) => {
  const dateList = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000); // Subtracting i days from the current date
    const formattedDate = date.toISOString().slice(0, 10); // Getting the date in YYYY-MM-DD format

    dateList.push({
      key: `${i + 1}`,
      title: formattedDate.split("-").reverse().join("/"),
      content: {
        walletId: 1,
        startDate: formattedDate,
        endDate: formattedDate,
      },
    });
  }

  return dateList;
};

export const generateWeekList = (currentDate) => {
  const weekList = [];

  // Calculate the start of the current week (Monday)
  const currentWeekStart = new Date(currentDate);
  if (currentWeekStart.getDay() === 0) {
    // If current date is Sunday
    currentWeekStart.setDate(currentWeekStart.getDate() - 6); // Subtract one week
  } else {
    currentWeekStart.setDate(
      currentWeekStart.getDate() - currentWeekStart.getDay() + 1
    );
  }

  for (let i = 0; i < 12; i++) {
    // Calculate the start of the week (Monday) for the current iteration
    const weekStart = new Date(
      currentWeekStart.getTime() - i * 7 * 24 * 60 * 60 * 1000
    );

    // Calculate the end of the week (Sunday) for the current iteration
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    // Format the start and end dates
    const formattedStartDate = weekStart.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedEndDate = weekEnd.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // Split the date strings
    const endDateParts = formattedStartDate.split("/");
    const startDateParts = formattedEndDate.split("/");

    // Remove the century part (first two characters) from the year
    const startTitle =
      endDateParts[0] + "/" + endDateParts[1] + "/" + endDateParts[2].slice(2);
    const endTitle =
      startDateParts[0] +
      "/" +
      startDateParts[1] +
      "/" +
      startDateParts[2].slice(2);

    // Push the formatted start and end dates to the weekList array
    weekList.push({
      key: `${i + 1}`,
      title: `${startTitle} - ${endTitle}`,
      content: {
        walletId: 1,
        startDate: formattedStartDate.split("/").reverse().join("-"),
        endDate: formattedEndDate.split("/").reverse().join("-"),
      },
    });
  }

  return weekList;
};

export const generateCustomNestedTabs = (startDate, endDate) => {
  // Format the start and end dates
  const formattedStartDate = startDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Split the date strings
  const endDateParts = formattedStartDate.split("/");
  const startDateParts = formattedEndDate.split("/");

  // Remove the century part (first two characters) from the year
  const startTitle =
    endDateParts[0] + "/" + endDateParts[1] + "/" + endDateParts[2].slice(2);
  const endTitle =
    startDateParts[0] +
    "/" +
    startDateParts[1] +
    "/" +
    startDateParts[2].slice(2);

  // Return the custom tab as a single object
  return {
    key: 1,
    title: `${startTitle} - ${endTitle}`,
    content: {
      walletId: 1,
      startDate: formattedStartDate.split("/").reverse().join("-"),
      endDate: formattedEndDate.split("/").reverse().join("-"),
    },
  };
};
