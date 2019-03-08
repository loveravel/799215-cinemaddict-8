/* Функция для генерирования случайного числа от min до max */
export const getRandomInteger = (minimumNumber, maximumNumber) => {
  let randomNumber = minimumNumber + Math.random() * (maximumNumber - minimumNumber + 1);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};
