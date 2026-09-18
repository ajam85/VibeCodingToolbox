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
- v Nastavení projektu jde nastavit i typ projektu (Desktop/Electron nebo
  Mobilní/Android) - v záložce se pak zobrazí malá ikona a nad seznamem
  projektů jde podle typu filtrovat
- u projektu je checkbox „Hotovo" - zašktnutý projekt zešedne, přeškrtne
  se a přesune na konec seznamu, ale zůstává plně dostupný pro návrat
- zaškrtnutím poznámky zmizí z hlavní stránky a přesune se do Backlogu
  (tlačítko vedle „Kopírovat vše", otevře samostatné okno); zpětné
  odškrtnutí v Backlogu poznámku vrátí zpátky do aktivního seznamu
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

### CLAUDE.md a AGENTS.md (bez kopírování)

Master prompt se hodí pro chatovou konverzaci, kde Claude nemá přístup k
souborům na disku. Pokud ale pracuješ v nástroji, který v projektu přímo
čte a upravuje soubory (Claude Code, Codex, Cursor, Gemini CLI a další),
existuje ještě lepší cesta: tyhle nástroje si na začátku každé session
samy automaticky načtou soubor `CLAUDE.md` nebo `AGENTS.md` z kořene
projektu, pokud tam existuje – nic se nekopíruje ručně.

V „Nastavení projektu" proto je i tlačítko **„Zapsat do složky
projektu"** (funguje jen když je nastavená zdrojová složka) – zapíše
oba soubory (`CLAUDE.md` i `AGENTS.md`, aby to fungovalo napříč nástroji)
s popisem projektu a stejnou instrukcí ohledně `VIBECODING_CHANGES.txt`
jako master prompt. Stačí to udělat jednou na začátku projektu.

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

## Záloha a export

- V nastavení projektu (ozubené kolo → Zálohování, nebo tlačítko
  „Exportovat projekt" v nastavení konkrétního projektu) si můžeš uložit
  data jako `.json` soubor – buď jeden projekt, nebo úplně všechny najednou.
- Stejný soubor jde zpátky **importovat** (tlačítko „Importovat zálohu")
  – projekty se přidají k těm stávajícím (nic se nepřepíše), takže se dá
  bezpečně použít i pro přenesení projektů na jiný počítač.

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

## Vytvoření přenosné aplikace pro Windows

Předchozí jednosouborové portable `.exe` se ukázalo jako nespolehlivé –
při každém spuštění se muselo nejdřív rozbalit do dočasné složky, což se
občas nepovedlo kompletně (antivirus, oprávnění, síťový disk...) a
projevovalo se to chybou „chybí ffmpeg.dll" nebo špatnou ikonou. Build
proto teď vytváří rovnou **celou hotovou složku** – nic se za běhu
nerozbaluje, takže tenhle problém strukturálně nemůže nastat.

Postup:

```
npm install
npm run dist
```

Sestavení chvíli trvá (electron-builder si napoprvé stáhne potřebné
nástroje). Výsledek najdeš ve složce:

```
dist/win-unpacked/
```

Tuhle celou složku stačí zkopírovat/přesunout kamkoliv (třeba na flash
disk) a spustit `.exe` uvnitř ní – nic se neinstaluje do systému.
`npm install` a Node.js na cílovém počítači nejsou potřeba, jen `git`
musí být nainstalovaný a přihlášený, protože ten aplikace používá pro
samotné nahrávání na GitHub. Je to přenosné jako celek (celá složka), ne
jako jediný soubor – to je záměrná změna kvůli spolehlivosti.

Aplikace i tenhle build mají vlastní ikonu (`build/icon.ico` /
`build/icon.png`) – electron-builder ji použije automaticky. Pokud by se
po sestavení pořád zobrazovala původní ikona Electronu, jde nejspíš o
to, že Windows si starou ikonu uložil do mezipaměti – pomůže smazat
starou `dist` složku před dalším buildem, nebo restartovat Průzkumníka.

⚠️ Sestavení musí proběhnout na Windows (nebo se dá sestavit i na
macOS/Linuxu pro Windows, ale je to složitější kvůli "wine"). Pokud
pracuješ na Windows, výše uvedené dva příkazy stačí.

## Poznámka k bezpečnosti

Tlačítko GitHub dělá `git push --force` – vždy přepíše obsah GitHub
repozitáře tím, co máš lokálně. To je přesně to chování, které jsme
domluvili (pracuješ jen z jednoho místa, žádné konflikty). Pokud by ses v
budoucnu rozhodl pracovat i odjinud, dá se to snadno přepnout na bezpečnější
běžný push.
