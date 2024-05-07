---
bigtitle: "제4장 네트워크 계층: 데이터 평면"
title: "4.1 네트워크 계층 개요"
excerpt: "4.1 네트워크 계층 개요"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-05-03
last_modified_at: 2024-05-03
---
![image](https://github.com/Bogamie/bogamie.github.io/assets/162293185/c727c478-dead-48ab-8ed3-605de099ede3){: height="10%" width="10%"}

&nbsp;&nbsp;그림 4.1은 H1과 H2의 경로상에 여러 라우터와 두 호스트 H1과 H2로 이루어진 네트워크를 보여준다. H1 네트워크 계층은 H1의 트랜스포트에게 세그먼트를 얻어 데이터그램으로 캡슐화하고 가장 인접한 라우터 R1으로 보낸다. 각 라우터에서의 네트워크 계층은 데이터그램을 입력 링크에서 출력 링크로 전달하는 역할을 한다.

&nbsp;&nbsp;라우터는 트랜스포트 계층과 애플리케이션 계층을 지원하지 않으므로 프로토콜 스택에서 네트워크 계층의 상위 계층은 존재하지 않는다.

- `데이터 평면 역할` : 입력 링크에서 출력링크로 데이터그램 전달
- `제어 평면 역할` : 데이터 그램이 출발지 호스트에서 목적지 호스트까지 잘 전달되게끔 로컬 포워딩, 라우터별 포워딩을 대응시킴
<br>
<br>

## 1. 포워딩과 라우팅: 데이터 평면과 제어 평면
