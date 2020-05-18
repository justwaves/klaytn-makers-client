export const sortPopular = list => {
  list.sort((a, b) => {
    const aCount = a.count;
    const aTargetCount = a.targetCount;
    const bCount = b.count;
    const bTargetCount = b.targetCount;
    const aPercentage = aCount / aTargetCount;
    const bPercentage = bCount / bTargetCount;

    if (aPercentage > bPercentage) {
      return -1;
    }
    if (aPercentage < bPercentage) {
      return 1;
    }
    return 0;
  });
  return list;
};

export const sortDeadline = list => {
  list.sort((a, b) => {
    if (a.dDay > b.dDay) {
      return 1;
    }
    if (a.dDay < b.dDay) {
      return -1;
    }
    return 0;
  });
  return list;
};

export const buyerMakerFilter = (buyerMakers, feed) => {
  const newArray = [];
  try {
    buyerMakers.map(makers => {
      feed.map(product => {
        if (makers._id === product.postId) {
          const newMakers = {
            ...makers,
            ...product,
            dDay: makers.dDay,
          };

          newArray.push(newMakers);
        }
        return null;
      });
      return null;
    });
  } catch (e) {
    console.log(e);
  }

  return newArray;
};
