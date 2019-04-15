/* Функция для генерирования случайного числа от min до max */
export const getRandomInteger = (minimumNumber, maximumNumber) => {
  let randomNumber = minimumNumber + Math.random() * (maximumNumber - minimumNumber + 1);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomFromArray = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getTimeFromMinutes = (startMinutes) => {
  return {
    hours: Math.trunc(startMinutes / 60),
    minutes: startMinutes % 60,
  };
};
