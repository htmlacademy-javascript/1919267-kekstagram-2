const PHOTOS_COUNT = 25;

const LikesCount = {
  MIN: 15,
  MAX: 200
};
const AvatarsNumber = {
  MIN: 1,
  MAX: 6
};

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const CommentsIdNumber = {
  MIN: 1,
  MAX: 1000
};

const USERS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const DESCRIPTIONS = [
  'котик',
  'собачка',
  'птичка',
  'закат на море',
  'озеро в лесу',
  'караван в пустыне',
  'у бабушки на даче',
  'город в дожде',
  'зимняя прогулка',
  'поездка на велосипедах',
  'мои друзья',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// вспомогательные функции

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


// создаем комментарий

const createComment = () => {
  const commentsIDs = [];

  return () => {
    let currentID = getRandomPositiveInteger(CommentsIdNumber.MIN, CommentsIdNumber.MAX);
    while (commentsIDs.includes(currentID)) {
      currentID = getRandomPositiveInteger(CommentsIdNumber.MIN, CommentsIdNumber.MAX);
    }
    commentsIDs.push(currentID);

    return {
      id: currentID,
      avatar: `img/avatar-${getRandomPositiveInteger(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(USERS_NAMES),
    };
  };
};


// создаем фотографию

const createPhoto = () => {
  let id = 0;
  return () => ({
    id: id++,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(LikesCount.MIN, LikesCount.MAX),
    comments: Array.from({length: getRandomPositiveInteger(CommentsCount.MIN, CommentsCount.MAX)}, createComment())
  });
};

// генерируем массив фотографий

//const generatedPhotos =
Array.from({length: PHOTOS_COUNT}, createPhoto());
//console.log(generatedPhotos);
