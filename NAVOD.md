# VibeCoding Toolbox – desktopová aplikace

Electron aplikace pro správu více "vibecoding" projektů na jednom místě:

- vlevo záložka pro každý projekt
- nahoře krátký popis, o co v projektu jde
- pod tím poznámkový checklist (zaškrtávání hotového, tlačítko „Kopírovat
  vše" pro rychlé vložení stavu třeba do promptu)
- tlačítko **GitHub**, které nahraje/aktualizuje projekt (`git add`,
  `commit`, `push --force` na hlavní větev – main na GitHubu vždy
  odpovídá tomu, co máš lokálně)
- pod tlačítkem „Nastavení" je i tlačítko s číslem verze – otevře
  **verzreport**, tedy historii verzí aplikace a co se v nich změnilo
- ozubené kolo v pásu s projekty (vlevo nahoře) otevře nastavení aplikace:
  přepínač jazyka (čeština/English) a vzhledu (tmavý/světlý), odtud se dá
  otevřít i verzreport
- aplikace nemá horní panel nabídky (File/Edit/View...)
- tlačítko „Historie" u projektu ukazuje, co se poslalo při každém
  předchozím nahrání (kolik souborů, kolik řádků přibylo/ubylo) – to samé
  shrnutí je zapsané i přímo do zprávy commitu v gitu
- kliknutím na „GitHub" se nejdřív otevře okno „Co se v projektu
  změnilo?" – tam napíšeš vlastními slovy, co se přidalo/opravilo/
  odebralo (každý řádek = jedna změna). Tenhle popis se pak zapíše do
  commitu i do Historie ve stejném stylu jako verzreport appky. Necháš-li
  pole prázdné, nahraje se jen s technickým přehledem souborů

## Automatické předvyplnění popisu změn (VIBECODING_CHANGES.txt)

Pokud v kořeni složky projektu existuje soubor `VIBECODING_CHANGES.txt`
(jeden řádek = jedna změna), appka ho při kliknutí na „GitHub" sama načte
a předvyplní jím okno s popisem změn – nemusíš nic přepisovat ručně, jen
zkontrolovat a případně upravit. Po úspěšném nahrání se soubor sám smaže
a do commitu se vůbec nedostane.

Hodí se to takto: až budeš s Claude (třeba v Claude Code) pracovat přímo
na kódu projektu, na konci mu řekni, ať do složky projektu zapíše soubor
`VIBECODING_CHANGES.txt` se shrnutím, co udělal. Pak stačí otevřít
VibeCoding Toolbox a kliknout na GitHub – popis už tam bude.

### Master prompt

Aby sis to nemusel psát pokaždé znovu, v dialogu „Nastavení projektu" je
připravený „Prompt pro Claude" s tlačítkem **Kopírovat prompt**. Vlož ho
na úplný začátek práce na projektu (do chatu s Claude, nebo do Claude
Code) – Claude pak bude sám průběžně psát/aktualizovat
`VIBECODING_CHANGES.txt`, takže při nahrávání už jen zkontroluješ
předvyplněný popis. Prompt se automaticky přizpůsobí názvu projektu.

## Co potřebuješ mít nainstalované

- [Node.js](https://nodejs.org) (stačí LTS verze)
- `git`, přihlášený ke GitHubu (jak už na svém počítači máš)

## Spuštění (první krok)

V terminálu, ve složce aplikace:

```
npm install
npm start
```

`npm install` stáhne Electron (jen napoprvé, chvíli to trvá). `npm start`
pak aplikaci spustí. Příště už stačí jen `npm start`.

## Používání

1. Klikni na „+" vlevo nahoře a přidej projekt (název, složka na disku,
   GitHub repo – ten musí už existovat, založ ho prázdný, bez README).
2. V záložce projektu nahoře napiš krátký popis, o co jde.
3. Do poznámek si přidávej úkoly/stav (Enter nebo tlačítko „Přidat").
   Zaškrtni je, jakmile jsou hotové. Tlačítkem „Kopírovat vše" zkopíruješ
   celý seznam jako text (hodí se třeba pro vložení do promptu).
4. Tlačítkem **GitHub** nahraješ aktuální stav projektu. Dole v panelu
   „Průběh" uvidíš, co se děje.
5. Tlačítkem „Nastavení" u projektu můžeš kdykoliv opravit název, cestu
   nebo adresu repozitáře.

Vše se ukládá natrvalo (do uživatelských dat aplikace), takže po zavření
a znovuotevření zůstane všechno tak, jak jsi to nechal.

## Verzování

Verze aplikace se bere z `package.json` (pole `version`). Historie verzí
pro verzreport v aplikaci je v souboru `changelog.json` – při každé nové
verzi zvyš číslo v `package.json` a přidej nový záznam na začátek
`changelog.json`:

```json
{
  "version": "1.2.0",
  "date": "2026-09-15",
  "changes": [
    "Popis toho, co se změnilo"
  ]
}
```

## Vytvoření portable aplikace (.exe pro Windows)

Portable verze je jeden `.exe` soubor bez instalace – stačí ho zkopírovat
kamkoliv (třeba na flash disk) a spustit dvojklikem, nic se přitom
neinstaluje do systému.

Postup:

```
npm install
npm run dist
```

Sestavení chvíli trvá (electron-builder si napoprvé stáhne potřebné
nástroje). Výsledek najdeš ve složce `dist`:

```
dist/Nahrat na GitHub-portable.exe
```

Tento soubor už stačí přenášet a spouštět samostatně – `npm install` a
Node.js na cílovém počítači nejsou potřeba, jen `git` musí být
nainstalovaný a přihlášený, protože ten aplikace používá pro samotné
nahrávání na GitHub.

Aplikace i portable `.exe` mají vlastní ikonu (`build/icon.ico` /
`build/icon.png`) – electron-builder ji použije automaticky, není potřeba
nic dalšího nastavovat.

⚠️ Sestavení portable `.exe` musí proběhnout na Windows (nebo se dá
sestavit i na macOS/Linuxu pro Windows, ale je to složitější kvůli
"wine"). Pokud pracuješ na Windows, výše uvedené dva příkazy stačí.

## Poznámka k bezpečnosti

Tlačítko GitHub dělá `git push --force` – vždy přepíše obsah GitHub
repozitáře tím, co máš lokálně. To je přesně to chování, které jsme
domluvili (pracuješ jen z jednoho místa, žádné konflikty). Pokud by ses v
budoucnu rozhodl pracovat i odjinud, dá se to snadno přepnout na bezpečnější
běžný push.
