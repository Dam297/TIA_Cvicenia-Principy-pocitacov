# Info o projekte:
- Meno a priezvisko: Damián Regeš
- Názov projektu: Cvičenia z predmetu Princípy počítačov
- Link na repozitár: https://github.com/Dam297/TIA_Cvicenia-Principy-pocitacov               <!-- Link na Váš GitHub repozitár -->
- Link na verejnú inštanciu projektu: https://proprinc.dcs.fmph.uniba.sk/   

# Info o reportovanej verzii:
- Tag: final  

# Info k testovaniu:     
- Login: hrasko1
- Heslo: hrasko

- Login: ucitel1
- Heslo: hrasko

# Postup, ako rozbehať vývojové prostredie 
<!-- Postup pre lokálne rozbehanie vývojového prostredia (kto si trúfa, kľudne ako Docker file / Docker compose) -->
- Rovnako ako na cvikách
- Nastaviť premenné prostredia (.env file): DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, STATUS=development, SESSION_SECRET
- Nastaviť databázu odporúčam spúštať dotazové súbory z migrations v poradí : tables.sql -> views.sql -> sampledata.sql
- BE: npm install a potom npm run dev
- FE: npm install a potom npm run dev

# Stav implementácie:
<!-- V bodoch spísať, ktoré funcionality sú už implementované, rozpracované, neimplementované vôbec -->
- Prihlásenie a odhlásenie
  - Zatiaľ funguje dočasné riešenie na prihlásenie cez formulár
  - Neskôr sa asi prejde na autentifikáciu pomocou SSO
- Zobrazenie úspešnosti z testov a cvičení pre študenta
  - Implementované
- Zobraziť úspešnost študentov 
  - Implementované 
- Povolenie vyplnenie testu a cvičení
  - Vôbec neimplementované (implemetované iba cez databázu)
- Otvorenie, vyplnenie a odovzdanie testu vrátane zobrazenia úspešnosti
  - Implementované
- Otvorenie, vyplnenie a odovzdanie cvičenia vrátane zobrazenia úspešnosti a správnych odpovedí
  - Implementované okrem niektorých cvičení (viď report week12)

# Retrospektíva:
<!-- Keby ste to robili znovu, čo by ste urobili inak? -->
<!-- Ste hrdý na výsledky svojej práce? Ktorý aspekt projektu je podľa Vás najviac kvalitný? -->
- Ak by som to robil znovu, zamerial by som sa viac na kvalitnejší Frontend s MOCK UP dátami a lepšími (rýchlejšími) dotazmi
- V podstate som hrdý na výsledky, ale nie som úplne spokojný, ešte je toho veľa na vylešpenie
- Za najkvalitnejšiu časť považujem rozhranie testu (vyplnenie, odovzdanie, pozretie výsledku)


