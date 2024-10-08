import { getRandomPositiveInteger, getRandomArrayElement } from './util.js';
import { MinMaxValues, COMMENTS, USERS_NAMES, DESCRIPTIONS } from './const.js';

const createComment = () => {
  const commentsIDs = [];

  return () => {
    let currentID = getRandomPositiveInteger(MinMaxValues.COMMENTS_ID_MIN, MinMaxValues.COMMENTS_ID_MAX);
    while (commentsIDs.includes(currentID)) {
      currentID = getRandomPositiveInteger(MinMaxValues.COMMENTS_ID_MIN, MinMaxValues.COMMENTS_ID_MIN);
    }
    commentsIDs.push(currentID);

    return {
      id: currentID,
      avatar: `img/avatar-${getRandomPositiveInteger(MinMaxValues.AVATAR_MIN, MinMaxValues.AVATAR_MAX)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(USERS_NAMES),
    };
  };
};

const createPhoto = () => {
  let id = 0;
  return () => ({
    id: id++,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(MinMaxValues.LIKES_MIN, MinMaxValues.LIKES_MAX),
    comments: Array.from({length: getRandomPositiveInteger(MinMaxValues.COMMENTS_COUNT_MIN, MinMaxValues.COMMENTS_COUNT_MAX)}, createComment())
  });
};

// генерируем массив фотографий
const generatePhotos = (count) => Array.from({length: count}, createPhoto());

export {generatePhotos};
