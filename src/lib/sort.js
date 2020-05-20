import moment from 'moment';

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

export const sortOrderDate = list => {
  list.sort((a, b) => {
    if (a.orderDate > b.orderDate) {
      return 1;
    }
    if (a.orderDate < b.orderDate) {
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

export const getFromNow = dDay => {
  moment.updateLocale('en', {
    relativeTime: {
      future: '%s 남음',
      past: '%s 지남',
      s: '1초',
      ss: '%d초',
      m: '1분',
      mm: '%d분',
      h: '1시간',
      hh: '%d시간',
      d: '1일',
      dd: '%d일',
      M: '1개월',
      MM: '%d개월',
      y: '1년',
      yy: '%d년',
    },
  });

  let fromNow = moment(dDay, 'YYYY-MM-DD').fromNow();

  if (fromNow === 0) {
    fromNow = moment(dDay, 'LTS').fromNow();
  }
  return fromNow;
};
