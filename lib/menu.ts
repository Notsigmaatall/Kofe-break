export const categories = [
  { id: "milk", label: "Кофе с молоком" },
  { id: "signature", label: "Авторский кофе" },
  { id: "cold", label: "Холодный кофе" },
  { id: "black", label: "Черный кофе" },
  { id: "tea", label: "Чай" },
  { id: "lemonade", label: "Лимонады" },
  { id: "not-coffee", label: "Не кофе" },
  { id: "smoothie", label: "Смузи" },
  { id: "iced-tea", label: "Холодный чай" },
  { id: "beans", label: "Кофе зерновой" },
] as const;
export type CategoryId = (typeof categories)[number]["id"];
export type PhotoId =
  | "cappuccino"
  | "latte"
  | "raf"
  | "iced-latte"
  | "bumble"
  | "tonic"
  | "espresso"
  | "tea"
  | "lemonade"
  | "smoothie"
  | "chocolate"
  | "beans";
export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  volume: string;
  price: number;
  description: string;
  photo: PhotoId;
  temperature: "hot" | "cold" | "beans";
}
export const menu: readonly Product[] = [
  {
    id: "raf-classic",
    name: "Раф классический",
    category: "signature",
    volume: "400 мл",
    price: 280,
    description:
      "Знакомство с авторским кофе можно начать с классического рафа. Состав и сладость уточняйте у бариста.",
    photo: "raf",
    temperature: "hot",
  },
  {
    id: "raf-citrus",
    name: "Раф цитрусовый",
    category: "signature",
    volume: "400 мл",
    price: 300,
    description:
      "Цитрусовое настроение в авторской кофейной линейке. Точный состав уточняйте у бариста.",
    photo: "raf",
    temperature: "hot",
  },
  {
    id: "raf-halva",
    name: "Раф с халвой",
    category: "signature",
    volume: "400 мл",
    price: 300,
    description:
      "Кофейная пауза с характером халвы. Состав и наличие уточняйте у бариста перед заказом.",
    photo: "raf",
    temperature: "hot",
  },
  {
    id: "raf-peanut",
    name: "Раф арахисовый",
    category: "signature",
    volume: "400 мл",
    price: 300,
    description:
      "Арахисовый вариант из авторской коллекции. Подробности состава и аллергены уточняйте в кофейне.",
    photo: "raf",
    temperature: "hot",
  },
  {
    id: "raf-cheese",
    name: "Раф сырный",
    category: "signature",
    volume: "400 мл",
    price: 300,
    description:
      "Необычный вариант для знакомства с авторским кофе. Точную рецептуру уточняйте у бариста.",
    photo: "raf",
    temperature: "hot",
  },
  {
    id: "latte-snickers",
    name: "Латте Сникерс",
    category: "signature",
    volume: "400 мл",
    price: 300,
    description:
      "Авторский латте из меню кофейни. Состав, сладость и аллергены уточняйте у бариста.",
    photo: "latte",
    temperature: "hot",
  },
  {
    id: "iced-latte",
    name: "Айс-латте",
    category: "cold",
    volume: "400 мл",
    price: 260,
    description:
      "Холодный вариант латте для неспешной прогулки или паузы в городе.",
    photo: "iced-latte",
    temperature: "cold",
  },
  {
    id: "espresso-tonic",
    name: "Эспрессо-тоник",
    category: "cold",
    volume: "400 мл",
    price: 270,
    description:
      "Холодный кофейный напиток для тех, кто хочет попробовать другой характер кофе.",
    photo: "tonic",
    temperature: "cold",
  },
  {
    id: "bumble",
    name: "Бамбл",
    category: "cold",
    volume: "400 мл",
    price: 370,
    description:
      "Яркая позиция в разделе холодного кофе. Точный состав и подачу уточняйте у бариста.",
    photo: "bumble",
    temperature: "cold",
  },
  {
    id: "cold-brew",
    name: "Колд Брю",
    category: "cold",
    volume: "400 мл",
    price: 210,
    description:
      "Ещё один повод выбрать холодный кофе. Наличие и особенности приготовления уточняйте в кофейне.",
    photo: "tonic",
    temperature: "cold",
  },
  {
    id: "honduras-san-marcos",
    name: "Гондурас Сан-Маркос",
    category: "beans",
    volume: "250 г",
    price: 800,
    description:
      "Зерновой кофе для домашних ритуалов. Дату обжарки, обработку, вкусовой профиль и возможность помола уточняйте в кофейне.",
    photo: "beans",
    temperature: "beans",
  },
  {
    id: "ethiopia-limu",
    name: "Эфиопия Лиму",
    category: "beans",
    volume: "250 г",
    price: 800,
    description:
      "Пачка зерна для вашей кофейной полки. Подробности конкретной партии и рекомендации по приготовлению уточняйте у бариста.",
    photo: "beans",
    temperature: "beans",
  },
  {
    id: "kenya-ruka-chui",
    name: "Кения Рука Чуи",
    category: "beans",
    volume: "250 г",
    price: 850,
    description:
      "Зерновой кофе в упаковке 250 г. Сведения о партии, профиле и обжарке уточняйте перед покупкой.",
    photo: "beans",
    temperature: "beans",
  },
  {
    id: "cappuccino",
    name: "Капучино",
    category: "milk",
    volume: "250 мл",
    price: 200,
    description:
      "Кофейная классика для начала дня и короткой паузы между делами. Всегда уместный выбор.",
    photo: "cappuccino",
    temperature: "hot",
  },
  {
    id: "latte",
    name: "Латте",
    category: "milk",
    volume: "400 мл",
    price: 250,
    description:
      "Большой латте, чтобы продлить кофейную паузу. Возьмите с собой или останьтесь ненадолго.",
    photo: "latte",
    temperature: "hot",
  },
  {
    id: "flat-white",
    name: "Флэт уайт",
    category: "milk",
    volume: "250 мл",
    price: 220,
    description:
      "Для тех, кто выбирает флэт уайт. Состав и особенности приготовления уточняйте в кофейне.",
    photo: "cappuccino",
    temperature: "hot",
  },
  {
    id: "black-tea",
    name: "Чай черный",
    category: "tea",
    volume: "300 мл",
    price: 180,
    description:
      "Чайная пауза в привычном городском ритме. Сорт и наличие уточняйте на месте.",
    photo: "tea",
    temperature: "hot",
  },
  {
    id: "sea-buckthorn-linden",
    name: "Чай облепиха-липа",
    category: "tea",
    volume: "300 мл",
    price: 270,
    description:
      "Тёплый вариант из чайного раздела. Точный состав уточняйте у бариста.",
    photo: "lemonade",
    temperature: "hot",
  },
  {
    id: "raspberry-ginger",
    name: "Малина-имбирь",
    category: "tea",
    volume: "300 мл",
    price: 270,
    description:
      "Вариант для тех дней, когда хочется чая. Подробности рецептуры уточняйте в кофейне.",
    photo: "tea",
    temperature: "hot",
  },
  {
    id: "berry-ginger",
    name: "Ягодно-имбирный",
    category: "lemonade",
    volume: "400 мл",
    price: 240,
    description:
      "Лимонад из меню кофейни для прохладной паузы. Точный состав уточняйте перед заказом.",
    photo: "smoothie",
    temperature: "cold",
  },
  {
    id: "mango-orange",
    name: "Манго-апельсин",
    category: "lemonade",
    volume: "400 мл",
    price: 240,
    description:
      "Яркий вариант из раздела лимонадов. Подача и рецептура могут отличаться от иллюстрации.",
    photo: "lemonade",
    temperature: "cold",
  },
  {
    id: "cocoa",
    name: "Какао",
    category: "not-coffee",
    volume: "400 мл",
    price: 250,
    description:
      "Уютная пауза для тех, кому сегодня хочется обойтись без кофе. Состав уточняйте на месте.",
    photo: "chocolate",
    temperature: "hot",
  },
  {
    id: "hot-chocolate",
    name: "Горячий шоколад",
    category: "not-coffee",
    volume: "400 мл",
    price: 270,
    description:
      "Горячий напиток из шоколадного раздела меню. Рецептуру и аллергены уточняйте у бариста.",
    photo: "chocolate",
    temperature: "hot",
  },
  {
    id: "seasonal-smoothie",
    name: "Сезонный",
    category: "smoothie",
    volume: "400 мл",
    price: 280,
    description:
      "Сезонный смузи. Его состав зависит от предложения кофейни — уточните перед покупкой.",
    photo: "smoothie",
    temperature: "cold",
  },
  {
    id: "coffee-banana",
    name: "Кофейно-банановый",
    category: "smoothie",
    volume: "400 мл",
    price: 280,
    description:
      "Смузи из кофейной части меню. Точный состав и наличие уточняйте у бариста.",
    photo: "iced-latte",
    temperature: "cold",
  },
  {
    id: "espresso",
    name: "Эспрессо",
    category: "black",
    volume: "50 мл",
    price: 170,
    description:
      "Маленькая кофейная пауза. Для тех, кто любит чёрный кофе в его лаконичной форме.",
    photo: "espresso",
    temperature: "hot",
  },
  {
    id: "americano",
    name: "Американо",
    category: "black",
    volume: "200 мл",
    price: 170,
    description:
      "Чёрный кофе для прогулки по району или короткого перерыва в делах.",
    photo: "espresso",
    temperature: "hot",
  },
  {
    id: "black-peach",
    name: "Чёрный персиковый",
    category: "iced-tea",
    volume: "400 мл",
    price: 180,
    description:
      "Холодный чай из меню кофейни. Состав и подачу уточняйте на месте.",
    photo: "tea",
    temperature: "cold",
  },
];
export const featured = ["cappuccino", "raf-halva", "bumble", "iced-latte"].map(
  (id) => menu.find((p) => p.id === id)!,
);
export const beans = menu.filter((p) => p.category === "beans");
export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";
export const categoryName = (id: CategoryId) =>
  categories.find((c) => c.id === id)!.label;
export const menuSource =
  "Цены и объёмы — из предоставленного меню Яндекс Карт с отметкой «обновлено 14 августа»; год и актуальность не подтверждены. Перед покупкой уточняйте цену и наличие.";
