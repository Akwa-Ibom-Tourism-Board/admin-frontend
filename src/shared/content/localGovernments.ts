/** The 31 local governments of Akwa Ibom State — must match the backend's
 * `LOCAL_GOVERNMENTS` list in `hotel-management-backend/src/configurations/constants.ts`
 * exactly, since `localGovernment` is validated as an enum there. */
export const LOCAL_GOVERNMENTS = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
] as const;

export type LocalGovernment = (typeof LOCAL_GOVERNMENTS)[number];
