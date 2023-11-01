# Betriebssysteme Vorlesung Klausur Sommersemester 2023

## 1) (5 Punkte) Erklären Sie den Aufbau des Linux/ext4 Dateisystems. Warum sieht der Aufbau der ext Dateisysteme anders aus als bei anderen Dateisystemen und was ist diesbezüglich das Alleinstellungsmerkmal? Begründen Sie Ihre Antwort.

Das ext4-Dateisystem ist ein Journaling-Dateisystem für Linux mit einer Struktur, die aus Superblock, Blockgruppen, Inode-Tabelle, Datenblöcken und Verzeichnisblöcken besteht. Sein Alleinstellungsmerkmal ist die Verwendung von Extents, welche die Dateispeicherung effizienter machen, indem sie zusammenhängende Blöcke statt einzelner Blöcke für die Dateispeicherung nutzen. Dies reduziert Fragmentierung und verbessert die Leistung bei großen Dateien. Im Vergleich zu anderen Dateisystemen wie FAT32 oder NTFS bietet ext4 fortschrittlichere Funktionen wie größere Datei- und Volumesupport, besseres Journaling und Zeitstempel mit höherer Präzision

## 2) (5 Punkte) Erläutern Sie externe Fragmentierung. Wie entsteht diese und welches Problem ergibt sich daraus?

Externe Fragmentierung entsteht in einem Datei- oder Speichersystem, wenn freier Speicherplatz in kleinen, nicht zusammenhängenden Stücken über die Festplatte verteilt ist. Dies geschieht im Laufe der Zeit, wenn Dateien erstellt, vergrößert, verkleinert und gelöscht werden. Das Problem, das sich daraus ergibt, ist, dass es schwierig oder unmöglich sein kann, größere Dateien oder Programme zu speichern, da der verfügbare Speicherplatz nicht zusammenhängend ist, selbst wenn insgesamt genug freier Platz vorhanden wäre. Dies kann zu einer ineffizienten Nutzung des Speicherplatzes und zu einer verminderten Systemleistung führen, da das Betriebssystem zusätzliche Arbeit leisten muss, um passende Speicherorte für neue Dateien oder Erweiterungen zu finden.

## 3) (5 Punkte) Was verstehen Sie unter „Blöcken" im Kontext von Dateisystemen? Welchen Einfluss hat deren Größe sowie die Größe der Adressen (LBAs) auf die Eigenschaften eines Dateisystems?

In Dateisystemen beziehen sich "Blöcke" auf die Grundeinheiten der Datenspeicherung auf einem Datenträger. Sie sind typischerweise eine feste Anzahl von Bytes groß, wie zum Beispiel 4 KB. Jede Datei wird in einem oder mehreren solchen Blöcken gespeichert, wobei die Größe der Blöcke die Effizienz der Speicherplatznutzung und die Leistung des Dateisystems beeinflusst:

- **Kleinere Blöcke** können den Speicherplatz effizienter nutzen, wenn viele kleine Dateien gespeichert sind, da weniger Platz am Ende jedes Blocks ungenutzt bleibt. Allerdings können sie mehr Overhead durch Verwaltungsaufwand verursachen und somit die Leistung bei großen Dateien verringern.
  
- **Größere Blöcke** reduzieren den Overhead, da weniger Blöcke benötigt werden, um die gleiche Menge an Daten zu speichern. Dies kann die Leistung bei großen Dateien verbessern. Jedoch kann es bei vielen kleinen Dateien zu einer Verschwendung von Speicherplatz kommen, da jeder Block möglicherweise nicht vollständig genutzt wird.

Die Größe der Logical Block Addresses (LBAs), also der Adressen, mit denen Blöcke auf der Festplatte identifiziert werden, kann die maximale Größe eines Dateisystems bestimmen. Größere LBAs ermöglichen es, größere Festplatten effizient zu adressieren und damit auch größere Dateisysteme zu unterstützen. Kleinere LBAs können dagegen die maximale Größe eines Dateisystems und die maximal unterstützte Festplattengröße limitieren.

## 4) (5 Punkte) I-Nodes: Bei einer Blockgröße von 2 KB und einer Adresslänge von 48 Bit, wie groß können Files hier maximal werden? Geben Sie nur den Rechengang an, Sie müssen das Ergebnis nicht ausrechnen!

1. **Anzahl der adressierbaren Blöcke**: \(2^{48}\) Blöcke.
2. **Größe eines Blocks**: 2 KB pro Block.

Die maximale Dateigröße berechnet sich durch Multiplikation der Anzahl der adressierbaren Blöcke mit der Größe eines Blocks:

\[
\text{Maximale Dateigröße} = 2^{48} \text{ Blöcke} \times 2 \text{ KB/Block}
\]

Sie würden dann \(2^{48}\) mit 2 KB multiplizieren, um die maximale Dateigröße zu erhalten.

## 5) (10 Punkte) Was ist die verkette Speicherung bei Dateisystemen? Welche zwei Varianten gibt es und welche Vor- und Nachteile haben diese im Vergleich?

Verkettete Speicherung in Dateisystemen ist eine Methode zur Speicherung von Daten, bei der Dateien als eine Kette von Blöcken über den Speicherplatz verteilt sind. Jeder Block enthält neben einem Teil der Dateidaten auch Informationen darüber, wo der nächste Block der Datei im Speicher zu finden ist. Es gibt zwei Hauptvarianten der verketteten Speicherung:

### 1. Einfach verkettete Listen (Single-Linked Lists):

**Vorteile**:
- Einfach zu implementieren.
- Gut für sequentiellen Zugriff, da jeder Block direkt auf den nächsten zeigt.

**Nachteile**:
- Langsamer direkter Zugriff (Random Access), da man die Kette von Anfang an durchlaufen muss, um zu einem bestimmten Block zu gelangen.
- Mögliche Datenverluste, wenn eine Verkettung beschädigt wird, da die nachfolgenden Blöcke nicht mehr auffindbar sind.

### 2. Doppelt verkettete Listen (Double-Linked Lists):

**Vorteile**:
- Erlaubt sowohl Vorwärts- als auch Rückwärtsdurchlauf, was die Navigation in Dateien verbessert.
- Erleichtert das Einfügen und Entfernen von Blöcken, da man von jedem Block aus in beide Richtungen gehen kann.

**Nachteile**:
- Mehr Speicherplatz für die zusätzlichen Zeiger erforderlich.
- Höherer Verwaltungsaufwand, da mehr Zeiger aktualisiert werden müssen, wenn Blöcke hinzugefügt oder entfernt werden.

Beide Varianten können unter Fragmentierung leiden, besonders wenn viele Dateien erstellt und gelöscht werden, was zu einer ineffizienten Speichernutzung führen kann. Doppelt verkettete Listen bieten jedoch eine flexiblere und oft robustere Handhabung, insbesondere bei Operationen, die das Einfügen oder Entfernen von Blöcken in der Mitte von Dateien beinhalten.

## 6) (5 Punkte) MLFQ teilen Prozesse in 2 Kategorien ein und behandelt diese unterschiedlich. Von welchen 2 Kategorien ist hier die Rede und wie gehen MLFQ damit um?

Die Multi-Level Feedback Queue (MLFQ) teilt Prozesse in zwei Kategorien ein: 

1. **Interaktive Prozesse**:
   - Interaktive Prozesse oder solche, die auf Benutzereingaben warten, haben kurze Burst-Zeiten und müssen schnell reagieren.
   - MLFQ gibt diesen Prozessen höhere Priorität, um kurze Antwortzeiten zu gewährleisten.

2. **Rechenintensive Prozesse** (Batch-Prozesse):
   - Rechenintensive Prozesse haben längere Burst-Zeiten und benötigen längere CPU-Zyklen.
   - MLFQ ordnet diese Prozesse in niedrigere Prioritätsqueues ein, wobei sie nach und nach absteigen, wenn sie ihre Zeitzuteilung überschreiten, um zu verhindern, dass sie die CPU monopolisieren.

MLFQ passt dynamisch die Prioritäten der Prozesse an, basierend darauf, wie sie sich verhalten: Wenn ein Prozess CPU-Zeit aufbraucht und in niedrigere Queues absteigt, aber dann auf Eingaben wartet, kann er wieder in eine höhere Queue verschoben werden, um die Reaktionsfähigkeit zu verbessern. Dies hilft, eine Balance zwischen Fairness und Effizienz zu finden und die Antwortzeiten für interaktive Prozesse kurz zu halten.

## 7) (10 Punkte) Welche Kategorien von Interrupts gibt es? Geben Sie für jede Kategorie ein Beispiel an.

Interrupts sind Signale an den Prozessor, die eine Unterbrechung der aktuellen Aktivitäten verlangen, um auf Ereignisse oder Bedingungen zu reagieren, die sofortige Aufmerksamkeit erfordern. Interrupts können in verschiedene Kategorien eingeteilt werden:

### 1. Maskierbare Interrupts (Interrupts, die deaktiviert werden können)
- **Beispiel**: Hardware-Interrupts von Peripheriegeräten wie Festplatten oder Netzwerkkarten. Diese können vom Prozessor ignoriert werden, wenn er gerade kritische Aufgaben ausführt, die nicht unterbrochen werden dürfen.

### 2. Nicht maskierbare Interrupts (NMI, nicht deaktivierbar)
- **Beispiel**: Kritische Hardwarefehler wie Stromausfälle oder Hardwarefehler, die sofortige Aufmerksamkeit erfordern und nicht ignoriert werden können.

### 3. Software Interrupts (Ausgelöst durch Softwareinstruktionen)
- **Beispiel**: Systemaufrufe wie eine Anforderung für Dateizugriff oder Speicherzuweisung. Diese werden von Programmen ausgelöst, um dem Betriebssystem mitzuteilen, dass ein Dienst benötigt wird.

### 4. Externe Interrupts (Ausgelöst durch externe Ereignisse)
- **Beispiel**: Unterbrechungen durch externe Ereignisse wie ein Benutzereingriff über eine Tastatur oder eine Maus.

### 5. Interne Interrupts (Ausgelöst durch Ereignisse innerhalb des Prozessors)
- **Beispiel**: Ausnahmen wie Division durch Null oder Zugriffsverletzungen im Speicher, die vom Prozessor selbst erkannt und signalisiert werden.

Diese Kategorien ermöglichen es dem Betriebssystem und der Hardware, auf eine Vielzahl von Ereignissen in einer geordneten und kontrollierbaren Weise zu reagieren, indem sie sicherstellen, dass einige Interrupts Vorrang vor anderen haben und dass das System auch in Ausnahmesituationen stabil bleibt.

## 8) (5 Punkte) Skizzieren Sie den Ablauf eines System Calls.

Ein Systemaufruf (System Call) ist der Prozess, durch den ein Programm Dienste des Betriebssystems anfordern kann. Hier ist eine grobe Skizze des Ablaufs:

1. **Anforderung**: Das Programm führt einen speziellen Befehl aus, der eine Systemaufruf-Anforderung darstellt. Dies geschieht meist durch Setzen von bestimmten Registern mit den Details des gewünschten Systemaufrufs und dem Auslösen einer Software-Unterbrechung, oft über einen speziellen 'trap' oder 'int' Befehl.

2. **Kontextwechsel**: Dieser Befehl signalisiert dem Prozessor, den aktuellen Benutzermodus zu verlassen und in den Kernelmodus (Betriebssystemmodus) zu wechseln, was einen Kontextwechsel verursacht.

3. **Ausführung**: Der Kernel prüft den Systemaufruf und führt die entsprechende Kernelfunktion aus. Dies kann Zugriff auf Hardware, Dateisystemoperationen oder andere Dienste umfassen.

4. **Rückkehr**: Nach Ausführung des Systemaufrufs wird das Ergebnis vorbereitet (z.B. wird der Rückgabewert in einem Register gespeichert) und der Kontext wird wieder in den Benutzermodus zurückgeschaltet, so dass das Programm die Ausführung fortsetzen kann.

5. **Weiterverarbeitung**: Das Programm verarbeitet die vom Systemaufruf zurückgegebenen Informationen oder Ergebnisse.

Dieser Ablauf ermöglicht eine sichere Interaktion zwischen Anwendungssoftware und dem Betriebssystem, wobei die systeminternen Ressourcen geschützt bleiben.

## 9) (5 Punkte) Erläutern Sie die Dateisystem-Erweiterung Journaling. Für was wird diese benötigt und wie funktioniert sie?

Journaling ist eine Funktion in Dateisystemen, die die Integrität der Daten auf der Festplatte sicherstellt, insbesondere im Falle eines Absturzes oder eines unerwarteten Herunterfahrens. Es wird benötigt, um sicherzustellen, dass Dateisysteme nach einem Fehler schnell wieder in einen konsistenten Zustand gebracht werden können, ohne aufwendige Überprüfungen oder Reparaturen durchführen zu müssen.

### Funktionsweise:

1. **Journaling-Vorgang**:
   - Bevor Änderungen am Dateisystem tatsächlich durchgeführt werden, werden sie in einem speziellen Bereich der Festplatte, dem Journal, protokolliert. Dies umfasst Informationen über die beabsichtigten Änderungen, wie das Hinzufügen, Ändern oder Löschen von Dateien.

2. **Schreiben der Änderungen**:
   - Nachdem die Änderungen im Journal festgehalten wurden, führt das Dateisystem die Änderungen in der Hauptdatenstruktur durch.

3. **Überprüfung**:
   - Im Falle eines Systemsabsturzes überprüft das Dateisystem beim Neustart zuerst das Journal, um festzustellen, welche Änderungen vollständig durchgeführt wurden und welche nicht.

4. **Wiederherstellung**:
   - Das Dateisystem wendet dann alle Änderungen an, die im Journal protokolliert, aber noch nicht auf die Hauptdatenstrukturen übertragen wurden. Dies stellt sicher, dass die Aktionen, die vor dem Absturz stattfanden, ordnungsgemäß abgeschlossen werden.

Journaling minimiert so die Notwendigkeit von Dateisystemprüfungen nach Fehlern und ermöglicht eine schnellere Wiederherstellung, indem es den Zustand vor einem Absturz rekonstruiert.

## 10) (5 Punkte) Was ist ein Context Switch? Erklären Sie den Ablauf und wann dieser auftreten kann.

Ein Context Switch ist der Prozess des Betriebssystems, bei dem der Zustand eines laufenden Prozesses (der aktuelle Kontext) gespeichert und der Prozessor einem anderen Prozess zugewiesen wird. 

### Ablauf:

1. **Unterbrechung**: Ein Ereignis (z.B. ein Timer-Interrupt, ein I/O-Request, das Ende eines Prozesses oder eine höhere Priorität eines anderen Prozesses) veranlasst das Betriebssystem, einen Context Switch durchzuführen.

2. **Speichern des Kontexts**: Der aktuelle Zustand des laufenden Prozesses, einschließlich des Programmzählers, der Register und anderer Prozessorzustände, wird gespeichert, damit der Prozess später genau an der Stelle fortgesetzt werden kann, an der er unterbrochen wurde.

3. **Laden des neuen Kontexts**: Der Kontext eines anderen Prozesses, der als nächstes ausgeführt werden soll, wird aus seinem Speicherort geladen und in die CPU-Register geschrieben.

4. **Fortsetzung der Ausführung**: Der neue Prozess beginnt seine Ausführung oder setzt sie fort.

### Wann ein Context Switch auftreten kann:

- **Zeitschlitzauslauf**: Wenn der zugewiesene Zeitschlitz (Zeitquantum) für den aktuellen Prozess abläuft.
- **Warten auf I/O**: Wenn ein Prozess auf den Abschluss einer I/O-Operation wartet.
- **Höhere Priorität**: Wenn ein Prozess mit höherer Priorität bereit wird und den CPU-Kern beansprucht.
- **Multitasking**: Das Betriebssystem schaltet regelmäßig zwischen Prozessen um, um ein reaktives System zu gewährleisten.
- **Interrupt-Behandlung**: Ein Interrupt kann dazu führen, dass das Betriebssystem einen Prozess unterbricht, um einen Interrupt-Handler auszuführen.

Context Switches sind essenziell für Multitasking-Betriebssysteme, um eine faire CPU-Zeitverteilung zwischen den Prozessen zu gewährleisten und die Reaktionsfähigkeit des Systems aufrechtzuerhalten.

## 11) (10 Punkte) Erläutern Sie wie Adressräume für die Verwaltung von Arbeitsspeicher funktionieren. Welche Probleme lösen Adressräume verglichen zu fehlender Abstraktion des Arbeitsspeichers?

Adressräume sind ein Schlüsselkonzept im modernen Betriebssystemdesign und beziehen sich auf die Abstraktion, die die physischen Speicheradressen eines Computers von den Adressen trennt, die ein Prozess verwendet. Diese Abstraktion wird durch die Speicherverwaltungseinheit (MMU) des Systems ermöglicht, die die Adressen bei Bedarf übersetzt.

### Funktionsweise von Adressräumen:

- **Logische (virtuelle) Adressen**: Jeder Prozess operiert mit einem eigenen Satz von Adressen, die als logische oder virtuelle Adressen bezeichnet werden. Diese Adressen beziehen sich nicht direkt auf physische Speicherplätze.
- **Physische Adressen**: Die tatsächlichen Speicherorte im RAM werden als physische Adressen bezeichnet.
- **Adressumsetzung**: Die MMU übersetzt virtuelle Adressen in physische Adressen, meist unter Verwendung einer Seitentabelle, die Teil eines größeren Konzepts namens Paging ist.

### Probleme, die durch Adressräume gelöst werden:

1. **Isolation**: Jeder Prozess operiert in einem eigenen Adressraum, was bedeutet, dass Prozesse nicht in den Speicherbereich anderer Prozesse schreiben oder aus diesem lesen können. Dies verhindert fehlerhafte Zugriffe und potenzielle Sicherheitsverletzungen.

2. **Sicherheit**: Ohne Adressraum-Abstraktion könnten fehlerhafte oder bösartige Prozesse das gesamte System kompromittieren, indem sie den Speicher anderer Prozesse oder des Betriebssystems manipulieren.

3. **Flexibilität**: Adressräume erlauben es dem Betriebssystem, den Speicher effizienter zu verwalten, indem beispielsweise Speicherseiten zwischen dem RAM und der Festplatte (Swapping) verschoben werden, um den verfügbaren RAM optimal zu nutzen.

4. **Vereinfachung der Programmierung**: Entwickler können Programme schreiben, als ob ihr Programm der einzige Prozess auf dem Computer wäre, ohne sich um die physische Speicherorganisation kümmern zu müssen.

5. **Effizienz**: Adressräume ermöglichen es Betriebssystemen, Speicher zu überbuchen (überzuteilen). So können sie mehr Speicher zuweisen, als physisch vorhanden ist, indem sie auf Techniken wie Paging und Swapping zurückgreifen.

6. **Dynamische Speicherzuweisung**: Programme müssen nicht an feste Speicheradressen gebunden werden, was die dynamische Zuweisung von Speicher zur Laufzeit ermöglicht.

Durch diese Abstraktion schaffen Adressräume eine Umgebung, in der Prozesse sicher und effizient ausgeführt werden können, ohne sich direkt um die zugrunde liegende Hardware kümmern zu müssen.

## 12) (10 Punkte) Erläutern Sie das Konzept von Pages in Virtual Memory. Wie sind die Adressen von Pages aufgebaut und wie werden diese verwaltet?

Das Konzept von Seiten (Pages) im virtuellen Speicher ist ein Kernmechanismus in der Speicherverwaltung moderner Betriebssysteme. Es ermöglicht die Abstraktion und das effiziente Management des physischen Arbeitsspeichers (RAM) durch das Einteilen des Speichers in kleine, gleich große Blöcke, die sogenannten Seiten.

### Aufbau der Adressen von Pages:

Virtueller Speicher ist in Pages aufgeteilt, und jede Page hat eine virtuelle Adresse. Eine virtuelle Adresse besteht üblicherweise aus zwei Teilen:

1. **Seitennummer (Page Number)**: Dieser Teil der Adresse identifiziert die Seite im virtuellen Adressraum.
2. **Offset**: Dieser Teil gibt die genaue Position innerhalb der Seite an, wo die gewünschten Daten zu finden sind.

Wenn ein Prozess auf eine virtuelle Adresse zugreift, verwendet die Speicherverwaltungseinheit (MMU) eine Seitentabelle, um die entsprechende physische Adresse zu finden.

### Verwaltung der Pages:

- **Seitentabellen**: Die Seitentabelle enthält Einträge, die virtuelle Seitennummern mit physischen Rahmennummern (Frame Numbers) verbinden, wobei jeder Rahmen einem Slot im physischen Speicher entspricht. Diese Tabelle wird verwendet, um die Übersetzung von virtuellen in physische Adressen durchzuführen.
- **Page Faults**: Wenn ein Prozess versucht, auf eine Seite zuzugreifen, die nicht im physischen Speicher ist, wird ein Page Fault ausgelöst. Das Betriebssystem muss dann die entsprechende Seite von der Festplatte (oder einem anderen sekundären Speicher) in den RAM laden.
- **Paging-Algorithmen**: Um zu bestimmen, welche Pages im Speicher bleiben und welche ausgelagert werden, verwenden Betriebssysteme verschiedene Algorithmen wie Least Recently Used (LRU), First-In-First-Out (FIFO) oder Clock-Algorithmen.
- **Swap-Space**: Der Swap-Space auf der Festplatte dient als Erweiterung des physischen Speichers, wo Seiten, die temporär nicht benötigt werden, ausgelagert werden können, um Platz im RAM für andere Seiten zu schaffen.

Durch die Verwendung von Pages im virtuellen Speicher können Betriebssysteme:

- Mehr Programme gleichzeitig ausführen, als es der physische Speicher erlauben würde.
- Den Speicher zwischen Prozessen isolieren, was die Stabilität und Sicherheit erhöht.
- Effizienter mit Speicher umgehen, indem nur die benötigten Teile eines Programms im physischen Speicher gehalten werden.

Dieses Konzept ist ein wesentlicher Bestandteil dessen, wie moderne Betriebssysteme Multitasking und eine effiziente Speichernutzung ermöglichen.

## 13) (10 Punkte) Erklären Sie den Page Replacement Algorithmus "WSClock". Welche Unterschiede sowie Vor- und Nachteile sehen Sie im Vergleich zu „Not recently used"?

Der WSClock-Algorithmus (Working Set Clock) ist eine Erweiterung des Clock-Algorithmus und versucht, die Idee des Working Set und des Clock-Algorithmus zu kombinieren, um Seiten zu ersetzen. 

### Funktionsweise des WSClock-Algorithmus:

1. **Clock-Struktur**: Ähnlich wie beim Clock-Algorithmus wird eine zirkuläre Liste von Seiten (ein Clock) verwendet. Jeder Seite wird ein Referenzbit und ein Modified-Bit (Dirty Bit) zugeordnet.

2. **Working Set**: Der Algorithmus hält den Working Set eines Prozesses – die Menge an Seiten, die der Prozess in einer bestimmten Zeitspanne (dem Working Set Window) aktiv verwendet – im Speicher.

3. **Seitenalterung**: Der WSClock-Algorithmus führt Buch über das Alter jeder Seite. Seiten, die außerhalb des Working Set Windows fallen, sind Kandidaten für das Ersetzen.

4. **Page Replacement**: Wenn eine Seite ersetzt werden muss, bewegt sich der WSClock-Algorithmus durch die Liste, bis er eine Seite findet, deren Referenzbit nicht gesetzt ist und die älter ist als das Working Set Window. Wenn das Modified-Bit gesetzt ist, wird die Seite erst auf den sekundären Speicher geschrieben.

### Unterschiede und Vergleich zu "Not Recently Used" (NRU):

**Not Recently Used**:
- NRU klassifiziert Seiten in vier Kategorien basierend auf den Referenz- und Modified-Bits und wählt eine Seite aus der niedrigsten nicht leeren Kategorie zum Ersetzen aus.
- Es wird bei jedem Interrupt des Uhr-Takts geprüft und ist nicht so sehr auf die Verwendungshäufigkeit ausgerichtet.

**Vorteile von WSClock gegenüber NRU**:
- **Adaptiv**: WSClock passt sich dynamisch den Working Set Größen der Prozesse an.
- **Effizienter**: Es vermeidet unnötige Seitenübertragungen, indem es prüft, ob die Seite tatsächlich veraltet ist (d.h. nicht im aktuellen Working Set).

**Nachteile von WSClock gegenüber NRU**:
- **Komplexer**: Der WSClock-Algorithmus ist komplexer und möglicherweise schwerer zu implementieren.
- **Ressourcenaufwendig**: Es kann mehr CPU-Ressourcen benötigen, da es das Alter jeder Seite verfolgen muss.

Insgesamt ist der WSClock-Algorithmus oft effizienter als NRU, insbesondere in Systemen, wo die Working Set Größe eines Prozesses stark variiert. Er kann jedoch aufgrund seiner Komplexität und Ressourcenanforderungen schwieriger zu implementieren sein.

## 14) (10 Punkte) Was ist Slab Allocation? Warum wird es als Verbesserung in Kombination mit dem Buddy Algorithmus verwendet? Begründen Sie Ihre Antwort!

Slab Allocation ist eine Speicherverwaltungstechnik, die im Kernel eines Betriebssystems verwendet wird, um häufig benötigte Objekte effizient zu allokieren und zu deallokieren. Entwickelt wurde sie zunächst für den Unix-Kernel Solaris, aber sie wird auch in anderen Betriebssystemen wie Linux eingesetzt.

### Funktionsweise von Slab Allocation:

- **Caching von Objekten**: Slab Allocation arbeitet mit einem Cache von Objekten gleicher Größe und Typ, um die Kosten für die ständige Neuinitialisierung und das Löschen von Kernel-Objekten zu reduzieren.
- **Slabs**: Ein Slab ist eine Sammlung von einem oder mehreren zusammenhängenden Pages im Speicher, die in Blöcke gleicher Größe aufgeteilt sind, um bestimmte Objekte zu speichern.
- **Slab Caches**: Der Kernel verwaltet mehrere Slab Caches für verschiedene Objekttypen. Jeder Cache enthält eine Liste von Slabs.

### Kombination mit dem Buddy-System:

Der Buddy-Algorithmus ist ein Speicherallokationsalgorithmus, der Speicher in Blöcke aufteilt, die jeweils eine Potenz von zwei an Speicherseiten sind. Er ist effizient für die Allokation großer Speicherblöcke, kann aber bei kleinen Objekten zu interner Fragmentierung führen, da er nicht gut anpassbar an die Anforderungen kleiner Speicheranfragen ist.

### Warum Slab Allocation eine Verbesserung darstellt:

- **Reduzierung der Fragmentierung**: Slab Allocation verringert die interne Fragmentierung, die beim Buddy-System auftreten kann, indem es Speicher für häufig verwendete kleine Objekte effizient wiederverwendet.
- **Schnellere Allokation**: Da Objekte in einem Slab bereits initialisiert sind, können sie schnell wiederverwendet werden, was die Allokationszeit reduziert.
- **Speichereffizienz**: Slab Allocation erhöht die Speichereffizienz für kleine Objekte, da es Speicherplatz wiederverwendet, der sonst ungenutzt bleiben könnte.
- **Vermindertes Overhead**: Der Overhead für die Speicherverwaltung wird reduziert, da weniger Allokations- und Deallokationsoperationen erforderlich sind.

Die Kombination von Slab Allocation mit dem Buddy-Algorithmus ermöglicht es, die Stärken beider Techniken zu nutzen: Slab Allocation für die effiziente Verwaltung kleiner, häufig benötigter Objekte und Buddy-System für die Allokation größerer Speicherblöcke. Diese Synergie führt zu einer verbesserten Gesamtleistung des Speichermanagements im Kernel.