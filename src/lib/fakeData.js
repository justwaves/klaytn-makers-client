import moment from 'moment';
import { uploadMakers } from 'redux/modules/makers';
import * as postsAPI from 'lib/api/posts';
import store from 'redux/store';

const onPublish = async ({
  title,
  body,
  tags,
  description,
  photo,
  price,
  targetCount,
  dDay,
}) => {
  console.log('onPublish!');
  try {
    const response = await postsAPI.writePost({
      title,
      body,
      tags,
      description,
      photo,
      price,
      targetCount,
      dDay,
    });
    console.log(response.data._id);

    const newdate = moment(dDay).unix();
    store.dispatch(
      uploadMakers({
        postId: response.data._id,
        title,
        price,
        targetCount,
        dDay: newdate,
      }),
    );
  } catch (e) {
    console.log(e);
  }
};

export const createFakeData = () => {
  console.log('createFakeData');
  fakeData.map(async makers => {
    await onPublish(makers);
  });
};

const fakeData = [
  {
    tags: ['선크림', '비비크림'],
    title: '선크림과 비비크림을 하나로',
    body:
      '메이크업 과정을 줄여주기 위해 선크림과 비비크림을 하나로 만들었습니다. 다마스크장미꽃수와 서양장미꽃수를 넣어 진정, 보습 효과가 뛰어난 디어마이 선애비비. 미백, 주름 개선, 자외선 차단의 3중 기능성 제품입니다.',
    description:
      '메이크업 과정을 줄여주기 위해 선크림과 비비크림을 하나로 만들었습니다. 다마스크장미꽃수와 서양장미꽃수를 넣어 진정, 보습 효과가 뛰어난 디어마이 선애비비. 미백, 주름 개선, 자외선 차단의 3중 기능성 제품입니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001677/masters/f70a1642bfa345db8568463cd0f6707a.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '11',
    dDay: '2020-06-23T16:22:00+09:00',
  },
  {
    tags: ['클렌징', '메이크업패드'],
    title: '30초에 끝내는 클렌징',
    body:
      '메이크업은 잘 지우지 않으면 피부 트러블과 모공 늘어짐의 원인이 됩니다. 손쉬우면서도 효과적인 클렌징을 위해 세정력을 높인 포인트 메이크업 패드와 일반 메이크업 패드를 하나에 담았습니다.',
    description:
      '메이크업은 잘 지우지 않으면 피부 트러블과 모공 늘어짐의 원인이 됩니다. 손쉬우면서도 효과적인 클렌징을 위해 세정력을 높인 포인트 메이크업 패드와 일반 메이크업 패드를 하나에 담았습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100000747/masters/0abf0e410714421e8cd94ddadd2de356.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '33',
    dDay: '2020-07-17T16:22:00+09:00',
  },
  {
    tags: ['머그컵', '6월'],
    title: '6월에 태어난 당신께',
    body:
      '매달 탄생화를 소개하는 월간 꽃 프로젝트, 6월의 탄생화 머그컵입니다. 푸르른 6월에 태어난 이를 위해, 각 날짜에 맞는 30 종류의 탄생화를 준비했습니다. 1년에 한 번뿐인 생일을 특별하게 기념해보세요.',
    description:
      '매달 탄생화를 소개하는 월간 꽃 프로젝트, 6월의 탄생화 머그컵입니다. 푸르른 6월에 태어난 이를 위해, 각 날짜에 맞는 30 종류의 탄생화를 준비했습니다. 1년에 한 번뿐인 생일을 특별하게 기념해보세요.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001750/masters/a988a10b6b774cfb82d613e5b4f8ab59.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '35',
    dDay: '2020-06-30T16:21:00+09:00',
  },
  {
    tags: ['롤케이크', '쌀', '달롤'],
    title: '글루텐프리 쌀 롤케이크',
    body:
      '밀가루와 합성첨가물을 넣지 않고 국내산 쌀로 만들었습니다. 드시는 분의 건강을 생각해 무항생제 친환경 계란과 당 함량을 낮춘 우유 생크림을 사용했습니다. 달롤의 시그니처롤인 달미롤부터 레몬치즈롤까지 5종입니다.',
    description:
      '밀가루와 합성첨가물을 넣지 않고 국내산 쌀로 만들었습니다. 드시는 분의 건강을 생각해 무항생제 친환경 계란과 당 함량을 낮춘 우유 생크림을 사용했습니다. 달롤의 시그니처롤인 달미롤부터 레몬치즈롤까지 5종입니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001306/masters/ac0de1737a6d4f8cb5e78022b1b8418b.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '15',
    dDay: '2020-07-30T16:20:00+09:00',
  },
  {
    tags: ['아이스크림', '철판아이스크림'],
    title: '철판 아이스크림을 집에서 뚝딱',
    body:
      '냉매가 들어있는 팬 위에 원하는 재료를 올려서 철판 아이스크림을 만들 수 있는 제품입니다. 위생적인 스테인리스 재질로 만들어져 아이가 있는 집에서 사용해도 좋습니다.',
    description:
      '냉매가 들어있는 팬 위에 원하는 재료를 올려서 철판 아이스크림을 만들 수 있는 제품입니다. 위생적인 스테인리스 재질로 만들어져 아이가 있는 집에서 사용해도 좋습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100003479/rounds/ebb1d2283ea44fcda7d13734f8e77754.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '5',
    dDay: '2020-06-02T16:19:00+09:00',
  },
  {
    tags: ['선스틱', '무기자', '아쿠아'],
    title: '언제나 촉촉한 아쿠아 무기자 선스틱',
    body:
      '3가지 히알루론산 성분을 함유해 마르지 않는 수분감을 느낄 수 있는 무기자차 선스틱입니다. 성장인자 복합 성분인 EGF 콤플렉스가 자외선에 자극받은 피부를 효과적으로 케어합니다. 휴대가 간편한 스틱 타입입니다.',
    description:
      '3가지 히알루론산 성분을 함유해 마르지 않는 수분감을 느낄 수 있는 무기자차 선스틱입니다. 성장인자 복합 성분인 EGF 콤플렉스가 자외선에 자극받은 피부를 효과적으로 케어합니다. 휴대가 간편한 스틱 타입입니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001773/masters/57c5bb668f484671a26923b725a4daa0.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '45',
    dDay: '2020-06-25T16:18:00+09:00',
  },
  {
    tags: ['냉장고', '미니냉장고', '저소음'],
    title: '저소음 미니 냉장고',
    body:
      '화장품, 음료, 간식 등을 넣어두기 좋은 미니 냉장고입니다. 거실이나 침실 등 사람 곁에 가까이 두어도 불편하지 않게, 저소음 냉각 방식을 채택했습니다. 서랍형이라 깊숙이 들어가 있는 내용물도 꺼내기 편리합니다.',
    description:
      '화장품, 음료, 간식 등을 넣어두기 좋은 미니 냉장고입니다. 거실이나 침실 등 사람 곁에 가까이 두어도 불편하지 않게, 저소음 냉각 방식을 채택했습니다. 서랍형이라 깊숙이 들어가 있는 내용물도 꺼내기 편리합니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001685/masters/3717f6163f864891bcea73846dc7da9c.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '8',
    dDay: '2020-06-10T16:18:00+09:00',
  },
  {
    tags: ['리프레셔', '데일리'],
    title: '더 커진 데일리 리프레셔',
    body:
      '메이커스에서만 만나볼 수 있는 데일리 리프레셔 300ml 대용량 패키지입니다. 냄새원인물질을 근본적으로 제거하는 방식은 그대로, 향은 3가지 중 선택하실 수 있습니다.',
    description:
      '메이커스에서만 만나볼 수 있는 데일리 리프레셔 300ml 대용량 패키지입니다. 냄새원인물질을 근본적으로 제거하는 방식은 그대로, 향은 3가지 중 선택하실 수 있습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100000496/masters/0248c6d625584b8c92dd758828294368.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '11',
    dDay: '2020-06-23T16:17:00+09:00',
  },
  {
    tags: ['폰케이스', '에곤쉴레'],
    title: '에곤 쉴레 폰케이스',
    body:
      '오스트리아의 표현주의 화가 에곤쉴레의 작품을 휴대폰케이스에 담았습니다. 왜곡된 몸체의 표현, 뛰어난 소묘력으로 유명한 작품을 감상해보세요. 자화상, 무릎을 굽히고 앉아 있는 여자 등 대표작 5개가 있습니다.',
    description:
      '오스트리아의 표현주의 화가 에곤쉴레의 작품을 휴대폰케이스에 담았습니다. 왜곡된 몸체의 표현, 뛰어난 소묘력으로 유명한 작품을 감상해보세요. 자화상, 무릎을 굽히고 앉아 있는 여자 등 대표작 5개가 있습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001780/masters/a904ed6febd04eb6a5e631ba47e467ca.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '35',
    dDay: '2020-06-12T16:16:00+09:00',
  },
  {
    tags: ['자세', '바른자세', '자세교정'],
    title: '하루 15분, 바른자세를 위한 투자',
    body:
      '다리를 꼬거나 비뚤어진 자세를 바른자세로 유지해 밸런스에 도움을 주는 기구 입니다. 특수 크롬 강철로 이음새를 만들어 휘어짐 없이 일정한 강도로 하체를 고정해 골반과 다리, 상체가 곧게 유지될 수 있도록 돕습니다.',
    description:
      '다리를 꼬거나 비뚤어진 자세를 바른자세로 유지해 밸런스에 도움을 주는 기구 입니다. 특수 크롬 강철로 이음새를 만들어 휘어짐 없이 일정한 강도로 하체를 고정해 골반과 다리, 상체가 곧게 유지될 수 있도록 돕습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001412/masters/7988296a54dc4d389aae70ac7b2b847b.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '40',
    dDay: '2020-06-25T16:15:00+09:00',
  },
  {
    tags: ['스킨', '토너'],
    title: '안녕 병풀, 시카 바이바이!',
    body:
      '"제가 써본 스킨 토너로는 최고인거같아요. (중략) 스킨 하나로 피부의 건조느낌이 없어지다니 놀랍네요. 특히 스킨 양이 대용량 1+1 이라 그게 더 좋아요." - 구매후기 중. 구매하신 분들께 화장솜을 함께 드립니다',
    description:
      '"제가 써본 스킨 토너로는 최고인거같아요. (중략) 스킨 하나로 피부의 건조느낌이 없어지다니 놀랍네요. 특히 스킨 양이 대용량 1+1 이라 그게 더 좋아요." - 구매후기 중. 구매하신 분들께 화장솜을 함께 드립니다',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100000292/masters/57dd5e51bbc44519a3372a8bf758736f.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '300',
    dDay: '2020-06-08T16:15:00+09:00',
  },
  {
    tags: ['잡곡밥', '잡곡', '채소'],
    title: '초간단 잡곡밥 짓기',
    body:
      '채소와 잡곡을 따로 불리거나 씻어줄 필요 없어 쉽게 만듭니다. 우수 산지에서 생산한 22곡 외에 대표 주요 잡곡인 표고버섯, 곤드레나물, 다시마를 넣었습니다. 하루 5분으로 맛있고 건강한 밥상을 즐길 수 있습니다.',
    description:
      '채소와 잡곡을 따로 불리거나 씻어줄 필요 없어 쉽게 만듭니다. 우수 산지에서 생산한 22곡 외에 대표 주요 잡곡인 표고버섯, 곤드레나물, 다시마를 넣었습니다. 하루 5분으로 맛있고 건강한 밥상을 즐길 수 있습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001715/masters/07169566c3954285a744f289c94b2830.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '40',
    dDay: '2020-06-01T16:14:00+09:00',
  },
  {
    tags: ['헛개나무', '젤리', '비타민'],
    title: '헛개나무 담은 젤리',
    body:
      '국내 특허 헛개나무과병추출분말 1,007mg을 함유한 젤리 스틱. 배, 대추농축액, 사양벌꿀로, 달콤함을, 밀크씨슬, 표고버섯균사체, 비타민B₂로 건강을 생각했습니다. 무부형제, 무보존료, 무착색료로 만들었습니다.',
    description:
      '국내 특허 헛개나무과병추출분말 1,007mg을 함유한 젤리 스틱. 배, 대추농축액, 사양벌꿀로, 달콤함을, 밀크씨슬, 표고버섯균사체, 비타민B₂로 건강을 생각했습니다. 무부형제, 무보존료, 무착색료로 만들었습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001736/masters/67422a4c9b4c4fdf9931beac314459dd.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '500',
    dDay: '2020-07-30T16:13:00+09:00',
  },
  {
    tags: ['EGF', 'EGF원액'],
    title: '피부에 좋은 EGF 원액',
    body:
      'EGF 원액은 보습과 피부 진정, 탄력 개선에 도움을 줍니다. 기존에 사용하던 토너나 수분 크림 등의 기초 화장품과 섞어 다양하게 활용해보세요. 합리적인 소비는 이렇게 하는 겁니다.',
    description:
      'EGF 원액은 보습과 피부 진정, 탄력 개선에 도움을 줍니다. 기존에 사용하던 토너나 수분 크림 등의 기초 화장품과 섞어 다양하게 활용해보세요. 합리적인 소비는 이렇게 하는 겁니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001772/masters/6de30875dc8e4b0c8d7ca003d4fb10d0.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '6',
    dDay: '2020-07-26T16:12:00+09:00',
  },
  {
    tags: ['파운데이션', '자외선차단제'],
    title: '고객 요청으로 만든 파운데이션',
    body:
      '샘플을 사용해 본 고객의 요청에 본 품을 제작했습니다. 속은 촉촉하고 겉은 보송한 세미매트 타입입니다. 밀착력이 높아 들뜸과 다크닝 없이 오래 유지됩니다. SPA 50+ PA+++이어서 자외선 차단제가 필요 없습니다',
    description:
      '샘플을 사용해 본 고객의 요청에 본 품을 제작했습니다. 속은 촉촉하고 겉은 보송한 세미매트 타입입니다. 밀착력이 높아 들뜸과 다크닝 없이 오래 유지됩니다. SPA 50+ PA+++이어서 자외선 차단제가 필요 없습니다',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001551/masters/d516a56c87b44ffdad82266fc44f3594.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '80',
    dDay: '2020-07-19T16:11:23+09:00',
  },
  {
    tags: ['액정강화', '코팅제'],
    title: '기포 없이 바르는 액정강화 코팅제',
    body:
      '기포 없이 붙이기는 쉽지 않고 필름은 쉽게 깨집니다. 안티크랙은 붙이지 않고 액정 표면에 발라서 코팅하는 간편한 타입의 강화 코팅제입니다. 9H 강도의 필름을 부착했을 때와 동일한 효과는 물론 지문이 덜 묻습니다.',
    description:
      '기포 없이 붙이기는 쉽지 않고 필름은 쉽게 깨집니다. 안티크랙은 붙이지 않고 액정 표면에 발라서 코팅하는 간편한 타입의 강화 코팅제입니다. 9H 강도의 필름을 부착했을 때와 동일한 효과는 물론  지문이 덜 묻습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001716/masters/6f28ae7075794e9dad8d3f14b8d6672f.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '33',
    dDay: '2020-04-08T16:10:00+09:00',
  },
  {
    tags: ['고데기', '헤어스타일링'],
    title: '속 볼륨 채우는 고데기',
    body:
      '와플 판을 닮은 올록볼록한 발열판이 인상적인 고데기입니다. 뿌리 쪽의 속 머리카락을 집어 피라미드 히트 플레이트로 3초 정도 눌러주면, 속 볼륨을 만들 수 있습니다. 풍성한 헤어 스타일링이 가능합니다.',
    description:
      '와플 판을 닮은 올록볼록한 발열판이 인상적인 고데기입니다. 뿌리 쪽의 속 머리카락을 집어 피라미드 히트 플레이트로 3초 정도 눌러주면, 속 볼륨을 만들 수 있습니다. 풍성한 헤어 스타일링이 가능합니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001769/masters/e4e65218b0ff431ea72e0b558f022335.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '15',
    dDay: '2020-07-18T16:09:00+09:00',
  },
  {
    tags: ['옷장정리', '정리', '가방', '옷장'],
    title: '가방, 옷장 정리가 필요할 때',
    body:
      '6칸으로 나뉜 넉넉한 수납공간이 있는 가방 정리대입니다. 가방뿐만 아니라 각종 자잘한 의류와 소품을 정리하기에도 좋습니다. 투명한 창이 있어 보다 편리하게 사용할 수 있습니다.',
    description:
      '6칸으로 나뉜 넉넉한 수납공간이 있는 가방 정리대입니다. 가방뿐만 아니라 각종 자잘한 의류와 소품을 정리하기에도 좋습니다. 투명한 창이 있어 보다 편리하게 사용할 수 있습니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001776/masters/8c6cf9300e39413f9f13fad4c77bd57a.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '45',
    dDay: '2020-07-15T16:08:00+09:00',
  },
  {
    tags: ['샴푸', '제주', '동백나무', '동백샴푸'],
    title: '제주에서 온 동백 샴푸',
    body:
      '제주 동백나무에서 얻은 비정제 동백 오일, 유채꿀, 귤껍질 추출물로 머릿결부터 두피까지 관리합니다. 천연 계면 활성제, 무실리콘, 약산성 헤어 제품을 찾는 사람에게 추천합니다.  ',
    description:
      '제주 동백나무에서 얻은 비정제 동백 오일, 유채꿀, 귤껍질 추출물로 머릿결부터 두피까지 관리합니다. 천연 계면 활성제, 무실리콘, 약산성 헤어 제품을 찾는 사람에게 추천합니다.  ',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001731/masters/cf727267d7744bc8a6fc8aee326557a9.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '30',
    dDay: '2020-07-13T16:07:00+09:00',
  },
  {
    tags: ['모니터', '스탠드'],
    title: '책상이 넓어지는 모니터',
    body:
      '스탠드가 책상 모서리에 고정하는 클립 형태여서 공간을 적게 차지합니다. 높낮이와 위치까지 조절할 수 있어 상황에 따라 다르게 사용합니다. 스탠드 뒷부분에 케이블 고정 홀이 있어 선까지 말끔히 정리합니다.',
    description:
      '스탠드가 책상 모서리에 고정하는 클립 형태여서 공간을 적게 차지합니다. 높낮이와 위치까지 조절할 수 있어 상황에 따라 다르게 사용합니다. 스탠드 뒷부분에 케이블 고정 홀이 있어 선까지 말끔히 정리합니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001185/masters/d41ae216063740e4858e6c23ba4533d9.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '55',
    dDay: '2020-07-07T16:06:00+09:00',
  },
  {
    tags: ['복분자술', '복분자', '술'],
    title: '알코올 도수 7% 탄산 복분자술',
    body:
      '대를 이어 한국 술을 만들어온 배상면주가. 전북 고창의 복분자로 샴페인처럼 즐길 수 있는 탄산 복분자술을 만들었습니다. 알코올 도수 7%로 부담 없이 마실 수 있습니다. 휴대하기 편한 사이즈입니다.',
    description:
      '대를 이어 한국 술을 만들어온 배상면주가. 전북 고창의 복분자로 샴페인처럼 즐길 수 있는 탄산 복분자술을 만들었습니다. 알코올 도수 7%로 부담 없이 마실 수 있습니다. 휴대하기 편한 사이즈입니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001745/masters/ad22df4f68994317a5830734c9fb624b.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '12',
    dDay: '2020-07-06T16:07:00+09:00',
  },
  {
    tags: ['쿠션', '콜라겐', '화장품'],
    title: '콜라겐 담은 완벽 밀착 쿠션',
    body:
      '프랑스산 저분자 콜라겐과 저분자 히알루론산이 들어간 쿠션으로 촉촉하고 빛나는 피부를 완성해줍니다. 가볍게 발라도 색소 침착과 흉터를 깔끔하게 커버하며, 54시간 동안 피부 결을 유지해주는 제품입니다.',
    description:
      '프랑스산 저분자 콜라겐과 저분자 히알루론산이 들어간 쿠션으로 촉촉하고 빛나는 피부를 완성해줍니다. 가볍게 발라도 색소 침착과 흉터를 깔끔하게 커버하며, 54시간 동안 피부 결을 유지해주는 제품입니다.',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001651/masters/744143210382456c99b9c7845fd31563.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '4',
    dDay: '2020-04-08T16:07:00+09:00',
  },
  {
    tags: ['스프레이건', '욕실청소', '샤워'],
    title: '욕실 청소가 쉬워지는 스프레이건',
    body:
      '강력한 수압으로 쉽게 욕실을 청소하는 보조 스프레이건입니다. 욕실 밸브에 연결할 수 있는 T밸브와 호스, 테프론 테이프까지 모두 드립니다. 몽키스패너만 있으면 설치할 수 있습니다.  ',
    description:
      '강력한 수압으로 쉽게 욕실을 청소하는 보조 스프레이건입니다. 욕실 밸브에 연결할 수 있는 T밸브와 호스, 테프론 테이프까지 모두 드립니다. 몽키스패너만 있으면 설치할 수 있습니다.  ',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001737/masters/43a1f2614aae46f2ade2769293411009.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '7',
    dDay: '2020-07-01T16:03:00+09:00',
  },
  {
    tags: ['로봇', '블루투스스피커', '스피커'],
    title: '리듬 타는 블루투스 댄싱 로봇',
    body:
      '일반 블루투스 스피커가 아닌 댄싱 로봇과 연결되는 5W 출력의 스피커입니다. 음악에 따라 139가지의 동작이 나옵니다. 앱을 사용하여 원하는 동작을 프로그래밍할 수도 있습니다. 귀엽고 깜찍한 잇템입니다. ',
    description:
      '일반 블루투스 스피커가 아닌 댄싱 로봇과 연결되는 5W 출력의 스피커입니다. 음악에 따라 139가지의 동작이 나옵니다. 앱을 사용하여 원하는 동작을 프로그래밍할 수도 있습니다. 귀엽고 깜찍한 잇템입니다. ',
    photo:
      'https://t1.daumcdn.net/makers_smith/file/items/100001660/masters/e7869c98a1c64e3b8dadc31d2ea95441.jpg?type=thumb&opt=C640x448.i',
    price: '1',
    targetCount: '20',
    dDay: '2020-04-14T15:59:00+09:00',
  },
];

export default fakeData;
