export const phone = "+7 (906) 764-14-70";
export const phoneHref = "tel:+79067641470";
export const address = "Москва, ул. Полярная, 1";
export const mapsUrl =
  "https://yandex.ru/maps/?text=" +
  encodeURIComponent("Кофе-брейк Москва ул. Полярная 1");
export const routeUrl =
  "https://yandex.ru/maps/?mode=routes&rtext=~" +
  encodeURIComponent("Москва, улица Полярная, 1") +
  "&rtt=auto";
// Netlify provides URL during production builds.
export const siteOrigin =
  process.env.URL || "https://kofe-break.netlify.app";
