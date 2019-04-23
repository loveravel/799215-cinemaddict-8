export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const getTimeFromMinutes = (startMinutes) => {
  return {
    hours: Math.trunc(startMinutes / 60),
    minutes: startMinutes % 60,
  };
};
