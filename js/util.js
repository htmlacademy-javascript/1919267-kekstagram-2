//Функция для проверки длины строки

function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//функция для нахождения шаблома в разметке
const findTemplate = (id) => {
  const template = document.querySelector(`#${id}`);

  if (!template) {
    throw new Error(`Template with id ${id} is not found`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element with id ${id} is not a template`);
  }

  return template.content.firstElementChild;
};

const renderItems = (array, container, createItem) => {
  const fragment = document.createDocumentFragment();
  array.forEach((item) => {
    const newItem = createItem(item);
    fragment.append(newItem);
  });

  container.append(fragment);
};

const getArrayFromString = (string) => string.trim().toLowerCase().split(/\s+/);

export {getRandomPositiveInteger, getRandomArrayElement, findTemplate, renderItems, getArrayFromString};
