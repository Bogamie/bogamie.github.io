---
title: "1.2 네트워크의 가장자리"

categories: Assignment
tags:
  - computer
  - network

toc: true
toc_sticky: true

date: 2024-03-12
last_modified_at: 2024-03-12
---

## 인터넷이란?

### 1. 구성요소로 본 인터넷

#### 호스트(host) / 종단 시스템(end system)
* 인터넷에 연결되어 있는 모든 장치
* 종단 시스템을 네트워크에 연결해주는 요소

#### 통신 링크(communication link)
* 통신 링크를 구성하는 여러 물리 매체(physical media)
  1. 동축케이블
  2. 구리선
  3. 광케이블
  4. 라디오 스펙트럼
* **전송률**(transmission rate, 링크 대역폭)
  * 초당 전송되는 비트 수
  * 단위: bps(bit per second)

#### 패킷 스위치 / 교환기(packet switch)
* 하나의 입력 통신 링크로 오는 패킷을 받아서 하나의 출력 통신 링크로 전달한다. 최종 목적지 방향으로 패킷을 보내주는 역할을 한다.
* 종단 시스템 간의 데이터 교환은 쉽게 해주지만 데이터의 시작과 끝인 애플리케이션에는 관심을 갖지 않고 데이터의 효율적인 전달에만 집중한다.
  1. 라우터(router)
     * 네트워크 코어에서 사용된다.
  2. 링크 계층 스위치(link-layer switch) 
     * 접속 네트워크에서 사용된다.

----------
#### 세그먼트(segment: 나누다, 분할하다)
* 한 종단 시스템이 다른 종단 시스템으로 보낼 데이터를 가지고 있을 때, 송신 종단 시스템은 그 데이터를 세그먼트로 나눈다. 여러 조각으로 나눈다.
  
#### 헤더(header)
* 데이터를 세그먼트로 나눈 후 각 세그먼트에 헤더를 붙인다.
  
#### 패킷(packet)
* 세그먼트로 나누고, 헤더를 붙인 정보 패키지를 가리킨다. 이러한 패킷은 목적지 종단 시스템으로 네트워크를 통해 보내지고 목적지에서 원래의 데이터로 다시 조립된다. 
  
---------
#### ISP(Internet Service Provider)
* 인터넷 서비스 제공자
* 종단 시스템이 인터넷에 접속할 때 사용하는 네트워크를 제공한다.

#### 프로토콜(protocol)
* 인터넷에서 정보 송수신을 제어한다.
* TCP(Transmission Control Protocol)/IP(Internet Protocol)
  1. **IP 프로토콜**은 라우터와 종단 시스템 사이에서 송수신되는 패킷 포맷을 기술한다.

#### 인터넷 표준
* IETF(Internet Engineering Task Force): 인터넷 국제 표준화 기구
* ISO: 전세계 표준화 활동
* OSI(Open System interconnection)
* IEEE: 미국 전기전자공학자협회
* ITU-T: 국제전기통신 표준화 기구
* RFC(Request for comments): 기술제안서

-----

### 2. 서비스 측면에서 본 인터넷
* 애플리케이션에 서비스를 제공하는 인프라스트럭처
  (infrastructure: 사회[공공] 기반 시설)
#### 분산(인터넷) 애플리케이션(distributed application)
  * 인터넷 메시징, 음악 스트리밍, SNS, 모바일 스마트폰, 태블릿 애플리케이션을 포함한다.
  * 서로 데이터를 교환하는 많은 종단 시스템을 포함한다.
  * 인터넷 애플리케이션은 **종단 시스템**에서 수행된다.

#### 소켓 인터페이스(socket interface)
* 송신 프로그램이 따라야 하는 규칙의 집합, 인터넷은 이 규칙에 따라 데이터를 전달한다.