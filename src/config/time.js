export const timeOfDay = () => {
  let time = new Date();
  time = time.getHours();
  if (time < 11) return "Good Morning";
  else if (time < 16) return "Good Afternoon";
  else if (time < 21) return "Good Evening";
  else return "Good Night";
};
