// Utility functions pertaining to dates
const time = new Date();

export function getGreeting() {
  const hour = time.getHours();
  if (hour >= 6 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export const lastGenerated = (date) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const dateFormat = (date) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
};

export const formatFullYear = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
}