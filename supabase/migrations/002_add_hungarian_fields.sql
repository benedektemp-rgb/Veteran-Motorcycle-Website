-- Adds Hungarian translation columns to an already-provisioned database
-- (one that already ran supabase/schema.sql). Run this once in your
-- Supabase project's SQL Editor.

alter table site_settings add column if not exists tagline_hu text;
alter table site_settings add column if not exists about_text_hu text;

alter table gallery_items add column if not exists description_hu text;

alter table events add column if not exists title_hu text;
alter table events add column if not exists description_hu text;

-- Backfill Hungarian translations for the placeholder seed rows inserted by
-- schema.sql. Matches on the English title/museum name, so it's a no-op for
-- rows you've already edited via /admin.
update site_settings
set
  tagline_hu = 'A legendák itt még mindig száguldanak',
  about_text_hu = 'Az Iron & Chrome Motorkerékpár Múzeumot egy élethosszig tartó klasszikusgyűjtő alapította, és több mint hatvan teljesen felújított motorkerékpárnak ad otthont, amelyek a kétkerekű történelem kilenc évtizedét ölelik fel. A háború előtti brit egyhengeresektől a neonfényes 1980-as évekbeli szupersportokig minden gépünk működőképes — hiszen egy motor, amit nem lehet vezetni, csupán szobor. Gyűjteményünket 1994-ben egy kétautós garázsban kezdtük, és azóta is folyamatosan bővül. Jöjjön el, és nézze meg közelről, hogyan néz ki egy évszázadnyi sebesség, lázadás és mérnöki megszállottság.'
where id = 1 and museum_name = 'Iron & Chrome Motorcycle Museum' and (tagline_hu is null or about_text_hu is null);

update gallery_items set description_hu = 'A ''motorkerékpárok Rolls-Royce-a.'' Kézzel épült Nottinghamben, és a gyár garantálta, hogy eléri a 160 km/h-s sebességet — a korához képest elképesztő állítás.' where title = '1936 Brough Superior SS100' and description_hu is null;
update gallery_items set description_hu = 'Kora leggyorsabb sorozatgyártású motorkerékpárja, 998 köbcentis V-twin motorral és fekete, repedt mintázatú motorházzal, amiről a nevét kapta.' where title = '1948 Vincent Black Shadow' and description_hu is null;
update gallery_items set description_hu = 'A Harley válasza a fürge brit ikermotoros gépekre, és a később megjelenő Sportster család közvetlen elődje.' where title = '1952 Harley-Davidson K Model' and description_hu is null;
update gallery_items set description_hu = 'Gyárilag közúti forgalomra kész cafe racer, és minden idők egyik leggyorsabb 250 köbcentis sorozatgyártású motorja.' where title = '1965 Ducati 250 Mach 1' and description_hu is null;
update gallery_items set description_hu = 'Az eredeti ''szupersport.'' Négyhengeres motor, első tárcsafék és elektromos indítás — egyetlen éjszaka alatt írta újra a szabálykönyvet.' where title = '1969 Honda CB750' and description_hu is null;
update gallery_items set description_hu = 'Nagy-Britannia utolsó nagy kiállása a japán motorok inváziója ellen — egy üvöltő háromhengeres gép a nyílt útra tervezve.' where title = '1972 Triumph Trident T150' and description_hu is null;
update gallery_items set description_hu = 'Kettős vezérműtengelyes soros négyhengeres motor, amitől minden más gép elavultnak tűnt a szalonban.' where title = '1975 Kawasaki Z1 900' and description_hu is null;
update gallery_items set description_hu = 'Sikoltó kétütemű utcai motor azoknak, akik versenypálya-élményt akartak rendszámtáblával.' where title = '1983 Yamaha RZ350' and description_hu is null;
update gallery_items set description_hu = 'A motor, amely a modern korba rántotta a Ducatit, befecskendezős motorral és hengerenként négy szeleppel, verseny-piros vázban.' where title = '1988 Ducati 851' and description_hu is null;

update events set title_hu = 'Veterán Vas Cserebörze', description_hu = 'Az év legnagyobb rendezvénye — tucatnyi árus, alkatrészvadász és egy csillogó motorshow a főbejárat előtti gyepen. Hozza el saját projektmotorját, és ingyen kiállíthatja.' where title = 'Vintage Iron Swap Meet' and (title_hu is null or description_hu is null);
update events set title_hu = 'Sötétedés Után: Neon és Kétütemű Est', description_hu = 'Az 1980-as és 1990-es évekbeli kétütemű gyűjteményünk esti kiállítása UV- és neonfényben, 20 órakor kurátori tárlatvezetéssel.' where title = 'After Dark: Neon & Two-Strokes Night' and (title_hu is null or description_hu is null);
update events set title_hu = 'Felújító Workshop: Porlasztó Alapok', description_hu = 'Gyakorlati szombati workshop főszerelőnkkel a klasszikus porlasztók szétszereléséről, tisztításáról és beállításáról. Létszám: 15 fő.' where title = 'Restoration Workshop: Carburetor Basics' and (title_hu is null or description_hu is null);
