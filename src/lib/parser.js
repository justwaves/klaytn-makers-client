const isArray = obj => obj instanceof Array;

const renameKeys = (obj, newKeys) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [newKeys[key] || key]: obj[key] },
    }),
    {},
  );

export const stateParser = state => {
  const stateKeys = {
    0: 'state',
  };
  if (!isArray(state)) {
    return renameKeys(state, stateKeys);
  }
  const parseState = state.map(_state => renameKeys(_state, state));

  return parseState;
};

export const feedParser = feed => {
  const photoKeys = {
    0: 'makersId',
    1: 'price',
    2: 'targetCount',
    3: 'timestamp',
    4: 'dDay',
    5: 'count',
    6: 'seller',
    7: 'postId',
    8: 'title',
    9: 'state',
  };

  if (!isArray(feed)) {
    return renameKeys(feed, photoKeys);
  }

  const parsedFeed = feed.map(photo => renameKeys(photo, photoKeys));

  return parsedFeed;
};
