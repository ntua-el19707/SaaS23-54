# NTUA ECE SAAS 2023 PROJECT
  
## TEAM (54)
  
  
Περιγραφή - οδηγίες
  
Περιέχονται φάκελοι για 15 microservices. Ο αριθμός είναι εντελώς ενδεικτικός. Δημιουργήστε ακριβώς όσα απαιτούνται από τη λύση σας.
  
  
Το Project  Αποτελειται απο 16 microservice

1 - auth # microservice  isssue JWT for clients ,managment User DB , Forward http:request (Diagram Builder microservice, Purchase Services ,My diagram microservice ) node express  ts
2 - eCharts # Frontend Created  with  Angula Frameworl 
 ** important Note  if the  ip of Machine IP 147.102.1.169 which is the request for this project CHANGE src/proxy.conf.json to the  ip of  the machine  that the  project will run
3 - Line # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
4 - Network # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
5 - Polar # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
6 - Dependency Wheel # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
7 - Column # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
8 - Line Annottion # Diagram Builder microservice ? consume csv for upload  build  Chart (pdf,png,svg,html) publish(Purchase , Diagrams to  Download Service ) node  express js 
9 - Upload Service # microservice - recieve csv file  =>  publish  to  Diagram Builder that wants it  and respond the filename to frontend
10 - myDiagrams Service # microservice conect o Atlas and find the  charts  a user owns consume from  Diagram Builders (charts: full json and chart id) 
11 - Purchase Service # Handdles the purchase and offer   of our SaaS ('purchase does not work with real credit does not charge just put  a fake credit card  in  FrontEnd such as 1111 1111 1111 1111 2 2222 111 and you can add  more cerdits in a user  ') this  Service  publish credits to auth  service (1) => to append  in  clients credits in DB consume( {chartd id and owner} and {packets  form auth for gift puroces etc {'Registation gift' ,credits:10}} ) 
12 - download Svg # Download Service  consume Svg Files  from Diagram Builder and store  and send  them if there requested by their owner
13 - download Pdf # Download Service  consume Pdf Files  from Diagram Builder and store  and send  them if there requested by their owner
14 - download Png # Download Service  consume Png Files  from Diagram Builder and store  and send  them if there requested by their owner
15 - download Html # Download Service  consume Html Files  from Diagram Builder and store  and send  them if there requested by their owner
16 - demo # Service that hold demo csv  File
Also the are some  extra Services that we are using  containers 
17 - RabbitMq # Bus for  communicate all the  microservices execpt(16 - demo that thereis no need  to comunicate with the other services)
18 - Redis # Ram to hold user credits  in  order to await constant connection with atlas  to get  his credits uses (auth(put them ) , Diagram Builder (read and  charge)  ,Purchage service (increase))

# Notes  for Building
# All the DBMS  Are  in Atlas  Machine  Must Have  ip 147.102.1.169 *each microservice  has diferent DB
# if  you have not that ip  append  Mongo DMMS (auth , Purchase  ,My Diagrams , Download  Svg,  Download  Pdf,  Download  Png, Download  Html) and set the envirmonet variable  mongo_url 
# Run 
chmod -x ./build.sh 
./build.sh 
docker-compose  -f PackApp.yaml up
# ./build.sh has  also the options  ./build.sh 1 for  auth  #1-15 folders
# There  is  A Danger that  The Rabbit-Mq  will exited 
# if  it exited stop the project stop and use
docker start some-rabbit # wait 1 minute
docker-compose  -f PackApp.yaml up
# The Project will function corectly when wvry microservice log in Terminal wiating for Messages...
# if  one microservice  is down or its  consumer failed "due to try listening Rabbit-mq when it was not ready " when you restart the service will get the messages

