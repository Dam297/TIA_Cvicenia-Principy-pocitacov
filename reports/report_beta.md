# Info o projekte:
- Meno a priezvisko: Damián Regeš
- Názov projektu: Cvičenia z predmetu Princípy počítačov
- Link na repozitár: https://github.com/Dam297/TIA_Cvicenia-Principy-pocitacov               <!-- Link na Váš GitHub repozitár -->
- Link na verejnú inštanciu projektu: https://proprinc.dcs.fmph.uniba.sk/   

# Info o reportovanej verzii:
- Tag: beta    <!-- Uviesť beta_cisloSubverzie, ak ste robili v bete zmeny pred termínom odovzdania -->

# Info k testovaniu:     
<!-- Uveďte credentials testovacích používateľov, ak sú potrebné na otestovanie Vašej bety. Uveďte aj akékoľvek iné relevantné informácie k testovaniu. Tieto informácie môžete alternatívne poslať aj e-mailom spolu s odovzdaním bety (napr. ak nechcete testovacie credentials zverejňovať). -->
- Login: hrasko1
- Heslo: hrasko

- Login: ucitel1
- Heslo: hrasko

# Postup, ako rozbehať vývojové prostredie 
<!-- Postup pre lokálne rozbehanie vývojového prostredia (kto si trúfa, kľudne ako Docker file / Docker compose) -->
- Rovnako ako na cvikách
- Nastaviť premenné prostredia (.env file): DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, STATUS=development, SESSION_SECRET
- Nastaviť databázu odporúčam spúštať dotazové súbory v poradí z migrations: tables.sql -> views.sql -> sampledata.sql
- BE: npm install a potom npm run dev
- FE: npm install a potom npm run dev


# Stav implementácie:
<!-- V bodoch spísať, ktoré funcionality sú už implementované, rozpracované, neimplementované vôbec -->
- Prihlásenie a odhlásenie
  - Zatiaľ funguje dočasné riešenie na prihlásenie cez formulár
  - Neskôr sa prejde na autentifikáciu pomocou SSO
- Zobrazenie úspešnosti z testov a cvičení pre študenta
  - Implementované
- Zobraziť úspešnost študentov 
  - Čiastočne implementované (niekde je ešte chyba)
- Povolenie vyplnenie testu a cvičení
  - Vôbec neimplementované
  - Táto funkcionalita sa bude pravdepodobne ešte prehodnocovať
- Otvorenie, vyplnenie a odovzdanie testu vrátane zobrazenia úspešnosti
  - Implementované
- Otvorenie, vyplnenie a odovzdanie cvičenia vrátane zobrazenia úspešnosti a správnych odpovedí
  - Rozpracované ako Mock Up


# Časový plán:
<!-- Akutalizovaný časový plán na zvyšné obodobie do odovzdania finálnej verzie -->
- 10. týždeň
  - Riešenie trvalej autentifikácie 
  - Naplnenie známych dát do databázy
  - Dokončenie backendu pre jednotlivé typy cvičení (generovanie príkladov a kontrola odpovedí)

- 11. týždeň
  - Zapracovanie spätnej väzby od študentov a učiteľov 
  - Testovanie a oprava chýb

- 12. týždeň
  - Refactoring, testovanie 
  - Nasadenie konečnej verzie


# Problémy:
<!-- Popísať akékoľvek problémy, s ktorými ste sa stretli. Ak neboli žiadne, explicitne to uveďte. -->
- Problémy s tvorbou zložitých dotazov
- Problémy s tvorbou API volaní pre naplnenie tabuľky úspešnosti študentov


