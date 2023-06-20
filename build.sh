#!/bin/bash

case "$1" in
  1)
    docker build -t authservice ./microservice01/userService
    ;;
  2)
  docker build -t echarts ./microservice02/Frontend
    echo 'Here will be the frontend build'
    ;;
  3)
    docker build -t lineservice ./microservice03/Line
    ;;
  4)
    docker build -t networkservice ./microservice04/network
    ;;
  5)
    docker build -t pollarservice ./microservice05/Pollar
    ;;
  6)
    docker build -t depedencywheel ./microservice06/DependencyWheel
    ;;
  7)
    docker build -t collumnservice ./microservice07/column
    ;;
  8)
    docker build -t lineannotationsservice ./microservice08/LinewithAnnotations
    ;;
  9)
    docker build -t upload ./microservice09/upload
    ;;
  10)
    docker build -t mydiagrams ./microservice10/
    ;;
  11)
    docker build -t purchaseservice ./microservice11/PurchaseService
    ;;
  12)
    docker build -t donwloadsvg ./microservice12/donwloadSVG
    ;;
  13)
    docker build -t donwloadpdf ./microservice13/donwloadPdf
    ;;
  14)
    docker build -t donwloadpng ./microservice14/donwloadPng
    ;;
  15)
    docker build -t donwloadhtml ./microservice15/donwloadHtml
    ;;
  *)
   docker build -t echarts ./microservice02/Frontend
 docker  build -t authservice ./microservice01/userService
docker  build -t lineservice ./microservice03/Line
docker  build -t networkservice  ./microservice04/network
docker  build -t pollarservice  ./microservice05/Pollar
docker  build -t depedencywheel  ./microservice06/DependencyWheel
docker  build -t collumnservice  ./microservice07/column
docker  build -t lineannotationsservice  ./microservice08/LinewithAnnotations
docker  build -t upload ./microservice09/upload
docker  build -t mydiagrams ./microservice10/
docker  build -t purchaseservice ./microservice11/PurchaseService
docker  build -t donwloadsvg ./microservice12/donwloadSVG
docker  build -t donwloadpdf ./microservice13/donwloadPdf
docker  build -t donwloadpng ./microservice14/donwloadPng
docker  build -t donwloadhtml  ./microservice15/donwloadHtml
docker  build -t demoservice  ./microservice16/Demos
    ;;
esac


