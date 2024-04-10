---
bigtitle: "제3장 트랜스포트 계층"
title: "3.5 연결지향형 트랜스포트: TCP"
excerpt: "3.5 연결지향형 트랜스포트: TCP"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-04-11
last_modified_at: 2024-04-11
---
## 1. TCP 연결

### 연결지향형(connected-oriented)

* 애플리케이션 프로세스가 데이터를 다른 프로세스에게 보내기 전에 두 프로세스가 서로 핸드셰이크를 해야한다.
* TCP **연결**은 물리적인 연결이 아닌 서로의 TCP에 존재하는 상태를 공유하는 논리적인 연결이다. 따라서 중간 라우터들은 TCP 연결을 전혀 감지하지 못한다.

### 전이중 서비스(full-duplex service)

* TCP 연결은 동시에 양방향으로 데이터 전송을 가능하게 한다.

### 점대점(point-to-point)

* TCP 연결은 두 컴퓨터를 직접 연결하는 방식으로 항상 단일 송신자와 단일 수신자 사이의 점대점이다.

### 세 방향 핸드셰이크(three-way handshake)

* 두 호스트가 통신하기 전 연결 설정을 하기 위한 절차


## 2. TCP 세그먼트 구조
### 순서 번호와 확인응답 번호

## 3. 왕복 시간(RTT) 예측과 타임아웃

### 왕복 시간 예측

### 재전송 타임아웃 주기의 설정과 관리