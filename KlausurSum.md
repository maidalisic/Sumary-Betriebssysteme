# Betriebssysteme Vorlesung Klausur Sommersemester 2023

## 1) (5 Punkte) Erklären Sie den Aufbau des Linux/ext4 Dateisystems. Warum sieht der Aufbau der ext Dateisysteme anders aus als bei anderen Dateisystemen und was ist diesbezüglich das Alleinstellungsmerkmal? Begründen Sie Ihre Antwort.

- Ext4 ist ein Journaling-Dateisystem für Linux.
- Struktur: Superblock, Blockgruppen, Inode-Tabelle, Datenblöcke, Verzeichnisblöcke.
- Alleinstellungsmerkmal: Nutzung von Extents für eine effizientere Speicherung durch Zusammenfassung von Blöcken.
- Vorteile der Extents: Weniger Fragmentierung, verbesserte Performance bei großen Dateien.
- Fortschritte gegenüber FAT32/NTFS: Größere Dateien und Volumen, verbessertes Journaling, präzisere Zeitstempel.

## 2) (5 Punkte) Erläutern Sie externe Fragmentierung. Wie entsteht diese und welches Problem ergibt sich daraus?

- Externe Fragmentierung: Freier Speicherplatz ist als kleine, nicht zusammenhängende Stücke verteilt.
- Ursache: Normale Dateioperationen wie Erstellen, Ändern, Verkleinern und Löschen von Dateien.
- Problem: Schwierigkeiten beim Speichern größerer Dateien/Programme aufgrund nicht zusammenhängenden Speicherplatzes, auch wenn insgesamt genügend Platz verfügbar ist.
- Folgen: Ineffiziente Speichernutzung und verminderte Systemleistung, da das Betriebssystem zusätzlichen Aufwand betreiben muss, um Speicherplatz zuzuweisen.

## 3) (5 Punkte) Was verstehen Sie unter „Blöcken" im Kontext von Dateisystemen? Welchen Einfluss hat deren Größe sowie die Größe der Adressen (LBAs) auf die Eigenschaften eines Dateisystems?

- Blöcke: Grundlegende Datenspeichereinheiten in Dateisystemen, typischerweise in fester Bytegröße (z.B. 4 KB).
- Kleinere Blöcke erhöhen die Speichereffizienz bei kleinen Dateien, verursachen aber mehr Verwaltungsaufwand.
- Größere Blöcke senken den Verwaltungsaufwand, sind aber bei kleinen Dateien weniger platzsparend.
- Die Größe von LBAs beeinflusst die maximale Dateisystem- und Festplattengröße; größere LBAs unterstützen größere Systeme.

## 4) (5 Punkte) I-Nodes: Bei einer Blockgröße von 2 KB und einer Adresslänge von 48 Bit, wie groß können Files hier maximal werden? Geben Sie nur den Rechengang an, Sie müssen das Ergebnis nicht ausrechnen!

1. **Anzahl der adressierbaren Blöcke**: \(2^{48}\) Blöcke.
2. **Größe eines Blocks**: 2 KB pro Block.

Die maximale Dateigröße berechnet sich durch Multiplikation der Anzahl der adressierbaren Blöcke mit der Größe eines Blocks:

\[
\text{Maximale Dateigröße} = 2^{48} \text{ Blöcke} \times 2 \text{ KB/Block}
\]

Sie würden dann \(2^{48}\) mit 2 KB multiplizieren, um die maximale Dateigröße zu erhalten.

## 5) (10 Punkte) Was ist die verkette Speicherung bei Dateisystemen? Welche zwei Varianten gibt es und welche Vor- und Nachteile haben diese im Vergleich?

- Verkettete Speicherung: Dateien sind als Kette von Blöcken verteilt, jeder Block weist auf den nächsten hin.
- Einfach verkettete Listen:
  - Vorteile: Einfache Implementierung, gut für sequentiellen Zugriff.
  - Nachteile: Langsamer direkter Zugriff, Risiko von Datenverlust bei Beschädigung der Kette.
- Doppelt verkettete Listen:
  - Vorteile: Vor- und Rückwärtsdurchlauf möglich, vereinfachtes Einfügen/Entfernen von Blöcken.
  - Nachteile: Mehr Speicherbedarf für Zeiger, höherer Verwaltungsaufwand.
- Beide leiden unter Fragmentierung, doppelt verkettete Listen bieten jedoch mehr Flexibilität und Robustheit.

## 6) (5 Punkte) MLFQ teilen Prozesse in 2 Kategorien ein und behandelt diese unterschiedlich. Von welchen 2 Kategorien ist hier die Rede und wie gehen MLFQ damit um?

- MLFQ-Kategorien: Interaktive Prozesse und rechenintensive (Batch-)Prozesse.
- Interaktive Prozesse: Kurze Burst-Zeiten, erhalten höhere Priorität für schnelle Antwortzeiten.
- Rechenintensive Prozesse: Längere Burst-Zeiten, werden in niedrigeren Queues eingeordnet, Priorität sinkt mit der CPU-Zeitnutzung.
- Dynamische Prioritätenanpassung: Prozesse können bei Wartezeiten in höhere Queues aufsteigen, um Reaktionsfähigkeit zu verbessern.

## 7) (10 Punkte) Welche Kategorien von Interrupts gibt es? Geben Sie für jede Kategorie ein Beispiel an.

  1. Maskierbare Interrupts: z.B. Hardware-Interrupts von Peripheriegeräten.
  2. Nicht maskierbare Interrupts (NMI): z.B. kritische Hardwarefehler wie Stromausfälle.
  3. Software Interrupts: z.B. Systemaufrufe für Dateizugriff oder Speicherzuweisung.
  4. Externe Interrupts: z.B. Benutzereingaben über Tastatur oder Maus.
  5. Interne Interrupts: z.B. Prozessor-Ausnahmen wie Division durch Null.

## 8) (5 Punkte) Skizzieren Sie den Ablauf eines System Calls.

  1. Anforderung: Programm löst Systemaufruf über 'trap' oder 'int' Befehl aus.
  2. Kontextwechsel: Wechsel vom Benutzer- in den Kernelmodus.
  3. Ausführung: Kernel führt den angeforderten Dienst aus.
  4. Rückkehr: Kontextwechsel zurück zum Benutzermodus, Rückgabe des Ergebnisses.
  5. Weiterverarbeitung: Programm verarbeitet Rückgabewerte.

## 9) (5 Punkte) Erläutern Sie die Dateisystem-Erweiterung Journaling. Für was wird diese benötigt und wie funktioniert sie?

- Journaling: Sichert Datenintegrität und ermöglicht schnelle Wiederherstellung nach Abstürzen.
- Vorgang: Änderungen werden vor Durchführung im Journal protokolliert.
- Schreiben: Änderungen werden nach Protokollierung im Dateisystem umgesetzt.
- Überprüfung: Nach Absturz prüft das System das Journal für unvollständige Änderungen.
- Wiederherstellung: Nicht vollzogene Änderungen werden basierend auf dem Journal durchgeführt.

## 10) (5 Punkte) Was ist ein Context Switch? Erklären Sie den Ablauf und wann dieser auftreten kann.

- Context Switch: Wechsel vom Zustand eines Prozesses zum anderen.
- Ablauf:
  1. Unterbrechung durch Ereignisse wie Timer-Interrupt oder I/O-Request.
  2. Speichern des aktuellen Prozesszustands (Programmzähler, Register).
  3. Laden des Kontexts des nächsten auszuführenden Prozesses.
  4. Fortsetzen der Ausführung des neuen Prozesses.
- Auftreten bei:
  - Ablauf des Zeitschlitzes.
  - Warten auf I/O.
  - Prozess mit höherer Priorität wird bereit.
  - Multitasking-Anforderungen.
  - Behandlung von Interrupts.

## 11) (10 Punkte) Erläutern Sie wie Adressräume für die Verwaltung von Arbeitsspeicher funktionieren. Welche Probleme lösen Adressräume verglichen zu fehlender Abstraktion des Arbeitsspeichers?

- Adressräume trennen virtuelle Adressen (genutzt von Prozessen) von physischen Adressen (im RAM).
- MMU übersetzt zwischen virtuellen und physischen Adressen.
- Problemlösungen:
  1. Isolation: Schutz vor unautorisiertem Zugriff zwischen Prozessen.
  2. Sicherheit: Verhindert Manipulationen des Systemgedächtnisses.
  3. Flexibilität: Ermöglicht effiziente Speicherverwaltung durch Swapping.
  4. Vereinfachung: Entwickler können Programme ohne Berücksichtigung der physischen Speicherstruktur schreiben.
  5. Effizienz: Überbucht Speicher, nutzt Paging und Swapping.
  6. Dynamische Speicherzuweisung: Erlaubt Speicherzuweisung zur Laufzeit.

## 12) (10 Punkte) Erläutern Sie das Konzept von Pages in Virtual Memory. Wie sind die Adressen von Pages aufgebaut und wie werden diese verwaltet?

- Pages im virtuellen Speicher: gleich große Speicherblöcke für effizientes Management.
- Adressaufbau: Kombination aus Seitennummer (identifiziert die Page) und Offset (Position innerhalb der Page).
- Verwaltung:
  - Seitentabellen verbinden virtuelle Seitennummern mit physischen Rahmennummern.
  - Page Faults lösen das Laden nicht präsenter Seiten aus dem Sekundärspeicher aus.
  - Paging-Algorithmen bestimmen, welche Pages im Speicher bleiben/ausgelagert werden.
  - Swap-Space dient als physische Erweiterung für auszulagernde Pages.
- Ergebnisse: Ermöglicht Mehrprogrammbetrieb über physische Speichergrenzen hinaus, isoliert Speicher zwischen Prozessen und optimiert die Speichernutzung.

## 13) (10 Punkte) Erklären Sie den Page Replacement Algorithmus "WSClock". Welche Unterschiede sowie Vor- und Nachteile sehen Sie im Vergleich zu „Not recently used"?

- WSClock kombiniert Working Set und Clock-Algorithmus für Page Replacement.
- Funktionsweise: Nutzt eine Clock-Struktur mit Referenz- und Modified-Bits und berücksichtigt die Nutzungshäufigkeit der Pages.
- Vergleich zu NRU:
  - Adaptiver durch Anpassung an Working Set Größen.
  - Vermeidet unnötige I/O durch Altersüberprüfung der Pages.
- WSClock ist komplexer und ressourcenintensiver als NRU, aber oft effizienter, besonders bei variierenden Working Set Größen.

## 14) (10 Punkte) Was ist Slab Allocation? Warum wird es als Verbesserung in Kombination mit dem Buddy Algorithmus verwendet? Begründen Sie Ihre Antwort!

- Slab Allocation verbessert Speichermanagement für häufige Objekte im OS Kernel.
- Reduziert Fragmentierung und Overhead gegenüber Buddy System bei kleinen Objekten.
- Kombiniert die Stärken beider Systeme für effiziente Allokation aller Speichergrößen.