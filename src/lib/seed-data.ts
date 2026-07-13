import type { GalleryItem, MuseumEvent, SiteSettings } from "./types";

export const siteSettingsSeed: SiteSettings = {
  museum_name: "Iron & Chrome Motorcycle Museum",
  tagline: "Where Legends Still Run",
  tagline_hu: "A legendák itt még mindig száguldanak",
  about_text:
    "Founded by a lifelong collector of classic iron, Iron & Chrome Motorcycle Museum houses over sixty fully-restored motorcycles spanning nine decades of two-wheeled history. From pre-war British singles to neon-lit 1980s superbikes, every machine on our floor still runs — because a motorcycle that can't be ridden is just a sculpture. We started this collection in a two-car garage in 1994 and it hasn't stopped growing since. Come see what a century of speed, rebellion, and engineering obsession looks like up close.",
  about_text_hu:
    "Az Iron & Chrome Motorkerékpár Múzeumot egy élethosszig tartó klasszikusgyűjtő alapította, és több mint hatvan teljesen felújított motorkerékpárnak ad otthont, amelyek a kétkerekű történelem kilenc évtizedét ölelik fel. A háború előtti brit egyhengeresektől a neonfényes 1980-as évekbeli szupersportokig minden gépünk működőképes — hiszen egy motor, amit nem lehet vezetni, csupán szobor. Gyűjteményünket 1994-ben egy kétautós garázsban kezdtük, és azóta is folyamatosan bővül. Jöjjön el, és nézze meg közelről, hogyan néz ki egy évszázadnyi sebesség, lázadás és mérnöki megszállottság.",
  address: "128 Foundry Row, Millhaven, OH 44601",
  phone: "(330) 555-0142",
  email: "hello@ironandchromemuseum.example",
  facebook_url: "https://facebook.com/ironandchromemuseum",
  instagram_url: "https://instagram.com/ironandchromemuseum",
  youtube_url: "https://youtube.com/@ironandchromemuseum",
  hero_image_url: "https://picsum.photos/seed/museum-hero/1600/900",
};

export const galleryItemsSeed: GalleryItem[] = [
  {
    id: "seed-1",
    title: "1936 Brough Superior SS100",
    description:
      "The 'Rolls-Royce of Motorcycles.' Hand-built in Nottingham and guaranteed by the factory to hit 100mph — a staggering claim for its era.",
    description_hu:
      "A 'motorkerékpárok Rolls-Royce-a.' Kézzel épült Nottinghamben, és a gyár garantálta, hogy eléri a 160 km/h-s sebességet — a korához képest elképesztő állítás.",
    image_url: "https://picsum.photos/seed/brough-ss100/900/700",
    category: "British",
    era: "1930s",
    sort_order: 1,
    created_at: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "1948 Vincent Black Shadow",
    description:
      "The fastest production motorcycle of its day, with a 998cc V-twin and a black-crackle engine finish that gave it its name.",
    description_hu:
      "Kora leggyorsabb sorozatgyártású motorkerékpárja, 998 köbcentis V-twin motorral és fekete, repedt mintázatú motorházzal, amiről a nevét kapta.",
    image_url: "https://picsum.photos/seed/vincent-black-shadow/900/700",
    category: "British",
    era: "1940s",
    sort_order: 2,
    created_at: "2024-01-12T00:00:00.000Z",
  },
  {
    id: "seed-3",
    title: "1952 Harley-Davidson K Model",
    description:
      "Harley's answer to nimble British twins, and the direct ancestor of the Sportster line that followed it.",
    description_hu:
      "A Harley válasza a fürge brit ikermotoros gépekre, és a később megjelenő Sportster család közvetlen elődje.",
    image_url: "https://picsum.photos/seed/harley-k-model/900/700",
    category: "American",
    era: "1950s",
    sort_order: 3,
    created_at: "2024-01-14T00:00:00.000Z",
  },
  {
    id: "seed-4",
    title: "1965 Ducati 250 Mach 1",
    description:
      "A road-legal cafe racer straight from the factory, and one of the fastest 250cc production bikes ever built.",
    description_hu:
      "Gyárilag közúti forgalomra kész cafe racer, és minden idők egyik leggyorsabb 250 köbcentis sorozatgyártású motorja.",
    image_url: "https://picsum.photos/seed/ducati-mach1/900/700",
    category: "Italian",
    era: "1960s",
    sort_order: 4,
    created_at: "2024-01-16T00:00:00.000Z",
  },
  {
    id: "seed-5",
    title: "1969 Honda CB750",
    description:
      "The original 'superbike.' Four cylinders, a front disc brake, and electric start — it rewrote the rulebook overnight.",
    description_hu:
      "Az eredeti 'szupersport.' Négyhengeres motor, első tárcsafék és elektromos indítás — egyetlen éjszaka alatt írta újra a szabálykönyvet.",
    image_url: "https://picsum.photos/seed/honda-cb750/900/700",
    category: "Japanese",
    era: "1960s",
    sort_order: 5,
    created_at: "2024-01-18T00:00:00.000Z",
  },
  {
    id: "seed-6",
    title: "1972 Triumph Trident T150",
    description:
      "Britain's last great stand against the Japanese invasion — a howling three-cylinder built for the open road.",
    description_hu:
      "Nagy-Britannia utolsó nagy kiállása a japán motorok inváziója ellen — egy üvöltő háromhengeres gép a nyílt útra tervezve.",
    image_url: "https://picsum.photos/seed/triumph-trident/900/700",
    category: "British",
    era: "1970s",
    sort_order: 6,
    created_at: "2024-01-20T00:00:00.000Z",
  },
  {
    id: "seed-7",
    title: "1975 Kawasaki Z1 900",
    description:
      "A double-overhead-cam inline-four that made everything else on the showroom floor look obsolete.",
    description_hu:
      "Kettős vezérműtengelyes soros négyhengeres motor, amitől minden más gép elavultnak tűnt a szalonban.",
    image_url: "https://picsum.photos/seed/kawasaki-z1/900/700",
    category: "Japanese",
    era: "1970s",
    sort_order: 7,
    created_at: "2024-01-22T00:00:00.000Z",
  },
  {
    id: "seed-8",
    title: "1983 Yamaha RZ350",
    description:
      "A screaming two-stroke street bike built for riders who wanted race-track thrills with a license plate.",
    description_hu:
      "Sikoltó kétütemű utcai motor azoknak, akik versenypálya-élményt akartak rendszámtáblával.",
    image_url: "https://picsum.photos/seed/yamaha-rz350/900/700",
    category: "Japanese",
    era: "1980s",
    sort_order: 8,
    created_at: "2024-01-24T00:00:00.000Z",
  },
  {
    id: "seed-9",
    title: "1988 Ducati 851",
    description:
      "The bike that dragged Ducati into the modern era, with fuel injection and four valves per cylinder in a racing-red frame.",
    description_hu:
      "A motor, amely a modern korba rántotta a Ducatit, befecskendezős motorral és hengerenként négy szeleppel, verseny-piros vázban.",
    image_url: "https://picsum.photos/seed/ducati-851/900/700",
    category: "Italian",
    era: "1980s",
    sort_order: 9,
    created_at: "2024-01-26T00:00:00.000Z",
  },
];

export const eventsSeed: MuseumEvent[] = [
  {
    id: "seed-event-1",
    title: "Vintage Iron Swap Meet",
    title_hu: "Veterán Vas Cserebörze",
    description:
      "Our biggest event of the year — dozens of vendors, parts hunters, and a show-and-shine on the front lawn. Bring your own project bike for free display space.",
    description_hu:
      "Az év legnagyobb rendezvénye — tucatnyi árus, alkatrészvadász és egy csillogó motorshow a főbejárat előtti gyepen. Hozza el saját projektmotorját, és ingyen kiállíthatja.",
    event_date: "2026-08-16",
    location: "Museum Grounds, 128 Foundry Row",
    image_url: "https://picsum.photos/seed/swap-meet/900/600",
    created_at: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "seed-event-2",
    title: "After Dark: Neon & Two-Strokes Night",
    title_hu: "Sötétedés Után: Neon és Kétütemű Est",
    description:
      "An evening exhibition of our 1980s and 1990s two-stroke collection under UV and neon lighting, with a curator-led talk at 8pm.",
    description_hu:
      "Az 1980-as és 1990-es évekbeli kétütemű gyűjteményünk esti kiállítása UV- és neonfényben, 20 órakor kurátori tárlatvezetéssel.",
    event_date: "2026-09-05",
    location: "Main Exhibition Hall",
    image_url: "https://picsum.photos/seed/neon-night/900/600",
    created_at: "2024-02-03T00:00:00.000Z",
  },
  {
    id: "seed-event-3",
    title: "Restoration Workshop: Carburetor Basics",
    title_hu: "Felújító Workshop: Porlasztó Alapok",
    description:
      "A hands-on Saturday workshop with our head mechanic covering teardown, cleaning, and tuning of classic carburetors. Limited to 15 seats.",
    description_hu:
      "Gyakorlati szombati workshop főszerelőnkkel a klasszikus porlasztók szétszereléséről, tisztításáról és beállításáról. Létszám: 15 fő.",
    event_date: "2026-10-11",
    location: "Museum Workshop Bay",
    image_url: "https://picsum.photos/seed/workshop-carb/900/600",
    created_at: "2024-02-05T00:00:00.000Z",
  },
];
