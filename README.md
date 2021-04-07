# Histograma 

Procesul a constat în preluarea posturilor și crearea unei histograme bazată pe datele respective.

În primul rand am preluat datele folosind graphql require, am convertit campul created în date, de unde am preluat luna și anul. Am memorat într-o lista numărul postărilor din fiecare luna, iar la final am construit o lista de obiecte de tipul {luna, nrPostări} pe care am trimis-o componentei copil și anume Histogram.

Am creat componenta Histogram, folosindu-mă de anumite pachete precum @vx/group, @visx/shap etc. Utilizand datele din props, primite de la părinte, am construit o histograma care afișează pe axa OX lunile anului, iar pe axa OY numărul postărilor. Am adaugat si axele, unde am afișat datele pentru a putea fi interpretate.

La final, am adaugat putin CSS.

Am intampinat cateva provocări legate de preluarea datelor, avand in vedere ca am lucrat cu tehnologii noi pentru mine, dar am reușit să completez taskul. :)
