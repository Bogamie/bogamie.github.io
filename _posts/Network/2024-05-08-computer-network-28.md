---
bigtitle: "제5장 네트워크 계층: 제어 평면"
title: "5.2 라우팅 알고리즘"
excerpt: "5.2 라우팅 알고리즘"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-05-08
last_modified_at: 2024-05-08
---
## 1. 개요

> 💡 `라우팅 알고리즘(routing algorithm)`의 목표 : 송신자부터 수신자까지 라우터의 네트워크를 통과하는 <b>좋은 경로(루트)</b>를 결정하는 것

<br/>

일반적으로 ‘좋은’ 경로란 <b>최소 비용 경로(least-cost path)</b>를 말한다.

그러나 현실적으로는 **네트워크 정책**과 같은 실제 문제가 고려된다.  
(e.g., Y 기관에 속해 있는 라우터 x는 Z 기관이 소유한 네트워크가 보낸 패킷을 전달해서는 안 됨)

<br/>

### 그래프

라우팅 문제를 나타내는 데는 **그래프**가 사용된다.

<br/>

그래프(graph), `G(N, E)`

- `N`
    - 노드(node)의 집합
    - 네트워크 계층 라우팅 상황에서 그래프상의 `노드`는 패킷 전달 결정이 이루어지는 지점인 **라우터**를 나타낸다.


- `E`
    - 에지(edge)의 집합
    - 네트워크 계층 라우팅 상황에서 그래프상의 `에지`는 **라우터들 간의 물리 링크**를 나타낸다.
    - 에지는 그 **비용**을 나타내는 값을 가진다.  
      (일반적으로 해당 링크의 물리적인 거리, 링크 속도, 링크와 관련된 금전 비용 등을 반영)
    - 집합 E에 포함된 어떤 에지 (x, y)에 대해 `c(x, y)`는 노드 x와 y 간의 비용을 의미한다.
    - 에지 (x, y)가 집합 E에 속하면, 노드 y는 노드 x의 <b>이웃(neighbor)</b>이라고 한다.


- 하나의 에지는 집합 N에 속하는 한 쌍의 노드로 표시된다.

<br/>

그래프 G(N, E)에서의 <b>경로(path)</b>는 노드의 연속(`x1, x2, x3, …, xp`)이고,  
노드 쌍 `(x1, x2), (x2, x3), … , (xp-1, xp)`는 집합 E에 속한 에지들이다.

경로 (x1, x2, x3, … , xp)의 비용은 경로상 모든 에지 비용의 단순 합이다.  
`c(x1, x2) + c(x2, x3) + … + c(xp-1, xp)`

<br/>
<br/>

### 라우팅 알고리즘의 분류

<br/>

라우팅 알고리즘을 분류하는 일반적인 방법 한 가지는 알고리즘이 `중앙 집중형`인지 `분산형`인지다.

#### 중앙 집중형 라우팅 알고리즘(centralized routing algorithm)

> 💡 **네트워크 전체에 대한 완전한 정보를 가지고** 출발지와 목적지 사이의 최소 비용 경로를 계산한다.

계산 자체는 한 장소에서 수행되거나 모든 라우터 각각의 라우팅 모듈로 복사될 수 있다.

전체 상태 정보를 갖는 알고리즘을 `링크 상태(link-state, LS) 알고리즘`이라고 하는데,  
이는 이 알고리즘이 네트워크 내 각 링크의 비용을 알고 있어야 하기 때문이다.

<br/>

#### 분산 라우팅 알고리즘(decentralized routing algorithm)

최소 비용 경로의 계산이 라우터들에 의해 반복적이고 분산된 방식으로 수행된다.

> 💡 각 노드는 **자신에게 직접 연결된 링크에 대한 비용 정보만을 가지고** 시작한다.

이후 반복된 계산과 이웃 노드와의 정보 교환을 통해 노드는 점차적으로 목적지 또는 목적지 집합까지의 최소 비용 경로를 계산한다.

분산 라우팅 알고리즘은 `거리 벡터(distance-vector, DV) 알고리즘`이라고도 하는데,  
이는 각 노트가 네트워크 내 다른 모든 노드까지 비용(거리)의 추정값을 벡터 형태로 유지하기 때문이다.


<br/>

---

<br/>


라우팅 알고리즘을 분류하는 일반적인 두 번째 방식은 `정적 알고리즘`과 `동적 알고리즘`으로 분류하는 것이다.

#### 정적 라우팅 알고리즘(static routing algorithm)

사람이 직접 링크 비용을 수정하는 경우와 같은 종종 사람이 개입하는 상황 때문에 정적 라우팅 알고리즘에서 경로는 아주 느리게 변한다.

<br/>

#### 동적 라우팅 알고리즘(dynamic routing algorithm)

네트워크 트래픽 부하(load)나 토폴로지 변화에 따라 라우팅 경로를 바꾼다.

동적 알고리즘은 주기적으로, 혹은 토폴로지나 링크 비용의 변경에 직접적으로 응답하는 방식으로 수행된다.

- 장점 : 네트워크 변화에 빠르게 대응한다.
- 단점 : 경로의 루프(loop)나 경로 진동(oscillation) 같은 문제에 취약하다.

<br/>

[참고] 토폴로지(topology, 망구성방식) : 컴퓨터 네트워크의 요소들(링크, 노드 등)을 물리적으로 연결해 놓은 것, 또는 그 연결 방식

<br/>

---

<br/>

라우팅 알고리즘을 분류하는 세 번재 방식은 라우팅 알고리즘이 `부하에 민감한지 아닌지`에 따른다.

#### 부하에 민감한 알고리즘(load-sensitive algorithm)

링크 비용은 **해당 링크의 현재 혼잡 수준을 나타내기 위해** 동적으로 변한다.

현재 혼잡한 링크에 높은 비용을 부과한다면, 라우팅 알고리즘은 혼잡한 링크를 우회하는 경로를 택하는 경향을 보일 것이다.

초기 ARPAnet 라우팅 알고리즘이 부하에 민감해서 많은 어려움이 있었다.

<br/>

#### 부하에 민감하지 않은 알고리즘(load-insensitive algorithm)

오늘날 인터넷 라우팅 알고리즘(RIP, OSPF, BGP 등)은 링크 비용이 현재(또는 가장 최근)의 혼잡을 반영하지 않기 때문에 부하에 민감하지 않다.

<br/>

## 2. 링크 상태(LS) 라우팅 알고리즘

> 링크 상태 알고리즘에서는 **네트워크 토폴로지와 모든 링크 비용이 알려져 있어서** 링크 상태 알고리즘의 입력값으로 사용될 수 있다.


이것은 각 노드가 자신과 직접 연결된 링크의 식별자와 비용 정보를 담은 `링크 상태 패킷`을  
**네트워크상의 다른 모든 노드로 브로드캐스트하게 함**으로써 가능하며,

이는 종종 인터넷 OSPF 라우팅 프로토콜 같은 `링크 상태 브로드캐스트(link-state broadcast) 알고리즘`에 의해 수행된다.

<br/>

### 다익스트라 알고리즘(Dijkstra’s algorithm)

> 💡 다익스트라 알고리즘은 하나의 노드(출발지, `u`라고 지칭)에서 네트워크 내 다른 모든 노드로의 최소 비용 경로를 계산한다.

알고리즘의 **k번째 반복** 이후에는 k개의 목적지 노드에 대해 최소 비용 경로가 알려지며,  
이들은 모든 목적지 노드로의 최소 비용 경로 중에서 가장 낮은 비용을 갖는 k개의 경로다.

<br/>

기호 정의

- `D(v)` : 알고리즘의 현재 반복 시점에서 출발지 노드부터 `목적지 v`까지의 **최소 비용 경로의 비용**
- `p(v)` : 출발지에서 v까지의 현재 최소 비용 경로에서 **v의 직전 노드**
- `N’` : 노드의 집합

출발지에서 v까지의 최소 비용 경로가 명확히 알려져 있다면, v는 N’에 포함된다.

<br/>

### 출발지 노드 u를 위한 링크 상태(LS) 알고리즘

중앙 집중형 라우팅 알고리즘은 2단계로 구성된다.

1. 초기화 단계(Initialization)
2. 반복 부분(Loop) : 수행 횟수는 네트워크의 노드 수와 같다.

<br/>
<br/>

### 포워딩 테이블

링크 상태 알고리즘이 종료된 후에 우리는 각 노드에 대해 출발지 노드로부터의 최소 비용 경로상의 직전 노드를 알게 된다.

`노드 u의 포워딩 테이블`은 각 목적지에 대해 / 노드 u에서 그 목적지까지의 최소 비용 경로상의 다음 홉 노드 정보를 저장하여 구성한다.

<br/>
<br/>

### 계산 복잡도

`n개의 노드(출발지 노드 제외)`가 있다면 출발지에서 모든 목적지까지 최단 비용 경로를 찾기 위해 최악의 경우 얼마나 많은 계산이 필요한가?

첫 번째 반복에서 최소 비용이 이미 계산된 노드의 집합 N’에 포함되지 않은 노드 w를 결정하기 위해 모든 **n**개의 노드를 검사해야 하며,  
두 번째 반복에서는 **n-1**개의 노드를, 세 번째 반복에서는 **n-1**개의 노드를 검사해야 한다.

따라서 찾아야 하는 노드의 총수는 `n(n+1)/2`가 되며,  
링크 상태 알고리즘은 최악의 경우 `O(n^2)`의 복잡성을 갖는다.

<br/>
<br/>

### 진동(oscillation) 문제

진동 문제는 링크 상태 알고리즘뿐만 아니라 혼잡이나 지연 시간을 기반으로 링크 비용을 산출하는 모든 알고리즘에서 발생할 수 있다.

<br/>

링크의 비용은 통과하는 트래픽 양에 따른다.

<br/>
<br/>


링크 상태 알고리즘이 다시 수행되면 노드 y는 w로 가는 **시계 방향**의 경로 비용이 `1`인 반면,  
지금까지 사용해왔던 **반시계 방향**으로의 경로 비용은 `1+e`임을 알게 된다.

따라서 w로 가는 y의 최소 비용 경로는 시계 방향이며,  
x도 마찬가지로 w로 가는 **시계 방향** 경로를 새로운 최소 비용 경로로 결정한다.

<br/>

링크 상태 알고리즘이 다시 한번 수행되면  
노드 x, y, z 모두 w로 가는 반시계 방향의 경로 비용이 `0`임을 알게 되어 모든 트래픽을 **반시계 방향** 경로로 보낸다.

<br/>

이러한 진동 문제를 방지하기 위한 방법들 중 하나는 모든 라우터가 **동시에 링크 상태 알고리즘을 실행하지 못하도록** 하는 것이다.

라우터들이 동일한 주기 간격으로 링크 상태 알고리즘을 수행한다 하더라도  
각 노드에서의 알고리즘의 실행 시각은 같지 않을 것이기 때문에 합리적인 방법이라고 생각된다.

<br/>

하지만 연구자들은 라우터들이 알고리즘을 처음에는 각기 다른 시작 시각에, 그러나 같은 주기를 갖도록 해서 실행하더라도  
**점진적으로 결국엔 서로 동기화된다**는 것을 발견하였다.

이러한 `자기 동기화`는 각 노드가 링크 상태 정보를 송신하는 시각을 임의로 결정하게 함으로써 회피할 수 있다.

<br/>
<br/>

## 3. 거리 벡터(DV) 라우팅 알고리즘

*오늘날 실제로 사용되는 알고리즘은 거리 벡터(distance-vector, DV) 라우팅 알고리즘이다.*

<br/>

링크 상태 알고리즘이 네트워크 전체 정보를 이용하는 알고리즘인 반면,  
거리 벡터 알고리즘은 **반복적이고 비동기적이며 분산적**이다.

- `분산적(distributed)` : 각 노드는 하나 이상의 직접 연결된 이웃으로부터 정보를 받고, 계산을 수행하며, 계산된 결과를 다시 이웃들에게 배포한다.
- `반복적(iterative)` : 이웃끼리 더 이상 정보를 교환하지 않을 때까지 프로세스가 지속된다.
- `비동기적(asynchronous)` : 모든 노드가 서로 정확히 맞물려 동작할 필요가 없다.

<br/>

### 벨만-포드(Bellman-Ford) 식


- min.v는 x의 모든 이웃에 적용된다.
- x에서 v로 이동한 후, v에서 y까지의 최소 비용 경로를 택한다면, 경로 비용은 `c(x, v) + d.v(y)`일 것이다.
- 반드시 하나의 이웃 v로 가는 것부터 시작해야 하므로,
- x에서 y까지의 최소 비용은 모든 이웃 노드 v에 대해 계산된 `c(x, v) + d.v(y) 중 최솟값`이 된다.

<br/>

벨만-포드 식의 해답은 각 노드 포워딩 테이블의 엔트리를 제공한다.

- 위의 식을 최소로 만드는 이웃 노드를 `v*`라고 해보자.
- 만약 **노드 x가 노드 y에게** 최소 비용 경로로 패킷을 보내기 원한다면, 노드 x는 패킷을 노드 v*로 전달해야 한다.

그러므로 **노드 x의 포워딩 테이블**에는 최종 목적지 y로 가기 위한 다음 홉 라우터로 `v*`가 지정되어 있어야 한다.

<br/>

---

<br/>


따라서 거리 벡터 라우팅 알고리즘의 기본 아이디어는 다음과 같다.

> 출발지 노드를 x라고 가정하면, 노드 x는 자신으로부터 집합 N에 속한 다른 모든 노드 y까지의 최소 비용 경로의 비용 D.x(y)를 추정한다.

<br/>

D.x을 노드 x에서부터 N에 속한 모든 다른 노드 y까지의 비용 추정값의 벡터라고 하자.

<br/>

DV 알고리즘으로 각 `노드 x`는 다음과 같은 라우팅 정보를 유지한다.

- 각 이웃 노드 v 중에서 x에 **직접 접속된 이웃 노드까지의 비용** `c(x, v)`
- **노드 x의 거리 벡터**, 즉 x로부터 N에 있는 모든 목적지 y로의 비용 예측값을 포함하는 벡터 `D.x`
- **이웃 노드들의 거리 벡터들**, 즉 v가 x의 이웃이라고 하면 `D.v = [D.v(y): y in N]`

<br/>

> 분산적이고 비동기적으로 동작하는 알고리즘에서는 때때로 각 노드가 **자신의 거리 벡터를 이웃들에게 보낸다.**

노드 x가 이웃 w에게서 새로운 거리 벡터를 수신하면,  
x는 w의 거리 벡터를 저장하고 벨만-포드 식을 사용하여 다음처럼 자신의 거리 벡터를 **갱신**한다.

<br/>
<br/>


만약 이 갱신으로 인해 노드 x의 거리 벡터가 변경된다면

1. 노드 x는 이 수정된 거리 벡터를 자신의 이웃들에게 보내고
2. 그에 따라 이웃들도 자신의 거리 벡터를 갱신한다.

<br/>

> 모든 노드가 자신의 거리 벡터를 비동기적으로 교환하는 동작을 계속하다 보면,  
> 비용 추정값 D.x(y)는 노드 x에서 노드 y까지의 실제 최소 비용 경로의 비용인 d.x(y)로 수렴하게 된다.

<br/>

### 거리 벡터(DV) 알고리즘

특정 목적지 y에 대한 자신의 포워딩 테이블을 갱신하기 위해 노드 x가 알아야 하는 것은 **y로의 최단 경로상의 다음 홉 라우터**인 `이웃 노드 v*(y)`다.

다음 홉 라우터 v*(y)는 위 DV 알고리즘의 14번째 줄에서 최솟값을 갖게 하는 이웃 v이기에,  
13~14번째 줄에서 각 목적지 y에 대해 노드 x는 v*(y)를 결정하고 목적지 y에 대해 포워딩 테이블도 갱신한다.

<br/>

> 💡 DV 알고리즘에서 하나의 노드가 갖는 정보는 단지 자신에게 직접 연결된 **이웃으로의 링크 비용과 그 이웃들로부터 수신하는 정보뿐**이다.

1. 각 노드는 이웃으로부터의 갱신을 기다리고 *(10~11번째 줄)*
2. 업데이터를 수신하면 새로 거리 벡터를 계산하고 *(14번째 줄)*
3. 이 새로운 거리 벡터를 이웃들에게 배포한다. *(16~17번째 줄)*

<br/>

이 과정은 **더 이상의 갱신 메시지가 없을 때까지** 계속된다.

갱신 메시지가 더 이상 없으면 라우팅 테이블 계산도 더 이상 없고 알고리즘은 정지 상태가 된다.
*(10~11번째 줄 대기 명령을 수행)*

이 알고리즘은 링크 비용이 변할 때까지 정지 상태로 있는다.

<br/>
<br/>

아래 그림은 세 노드로 이루어진 단순한 네트워크에서의 거리 벡터 알고리즘의 동작을 보여준다.

여기서는 모든 노드가 동기적 방식으로 동작하지만, 비동기적 방식으로도 알고리즘은 올바르게 동작한다.


<br/>
<br/>

### 거리 벡터(DV) 알고리즘: 링크 비용 변경과 링크 고장

거리 벡터 알고리즘을 수행하는 노드가

1. 자신과 이웃 사이 링크의 비용이 변경된 것을 알게 되면
2. 자신의 거리 벡터를 갱신한 후
3. **최소 비용 경로의 비용에 변화가 있는 경우**에는 이웃에게 새로운 거리 벡터를 보낸다.

<br/>

이때 최소 비용 경로의 비용이 감소한 상황과 증가한 상황 두 가지를 전부 살펴보자.

<br/>

#### a. 비용이 감소한 상황

이 상황에서의 DV 알고리즘은 다음과 같은 일련의 사건을 발생시킨다.

1. 시각 t0 : `y`가 링크 비용의 변화를 감지하고, 자신의 거리 벡터를 갱신한 후 이 변경값을 이웃에게 알린다.


2. 시각 t1 : `z`는 y로부터 갱신 정보를 받고 자신의 테이블을 갱신한다.
    - z는 x까지의 새로운 최소 비용을 계산한다.
    - 이웃에게 자신의 새로운 거리 벡터를 전송한다.


3. 시각 t2 : `y`는 z로부터 갱신 정보를 받고 자신의 테이블을 갱신한다.
    - **y의 최소 비용은 변화가 없으므로 y는 z에게 아무런 메시지를 보내지 않는다.**
    - 이에 알고리즘은 정지 상태가 된다.

<br/>

따라서 거리 벡터 알고리즘은 정지 상태가 될 때까지 두 번만 반복하면 된다.

<br/>

#### b. 비용이 증가한 상황

아래는 y에서 x로의 링크 비용이 4에서 60로 변한 상황을 나타낸 것이다.

<br/>

이 상황에서의 DV 알고리즘은 다음과 같은 일련의 사건을 발생시킨다.

1. 시각 t0 : `y`가 링크 비용 변화를 감지하고 노드 x까지 다음의 비용을 갖는 새로운 최소 비용 경로를 계산한다.

   <br/>

    - 이때 우리는 네트워크 전체를 한눈에 볼 수 있기 때문에 z를 경유하는 이 새로운 비용이 **잘못되었다**는 사실을 알 수 있지만,  
      노드 y의 입장에서는 아니다.


2. 시각 t1
    - x로 가기 위해 y는 z로 경로 설정을 하고, z는 y로 경로 설정을 하는 `라우팅 루프(routing loop)`가 발생한다.

      > t1에 x를 목적지로 하는 패킷이 y나 z에 도착하면 포워딩 테이블이 변할 때까지 이 두 노드 사이에서 왔다 갔다 순환할 것이다.

    - 노드 y는 x까지의 새로운 최소 비용을 계산했으므로 z에게 새로운 거리 벡터를 알린다.


3. 시각 t2 : z는 y로부터 갱신 정보를 받고 새로운 최소 비용을 계산한다.
    - D.z(x) = min{50+0, 1+6} = 7
    - x까지의 z의 최소 비용이 증가했으므로, 새로운 거리 벡터를 y에 알린다.


4. 시각 t3 : y는 z로부터 새로운 거리 벡터를 수신하고 새로운 최소 비용을 계산한다.
    - Dy(x) = min{60+0, 1+7} = 8
    - x까지의 y의 최소 비용이 증가했으므로, 새로운 거리 벡터를 z에 알린다.


5. …

<br/>

이렇게 계속 반복되는 문제를 `무한 계수 문제(count-to-infinity)`라고 한다.

<br/>

### 거리 벡터 알고리즘: 포이즌 리버스 추가

방금 설명한 특정한 라우팅 루프 시나리오는 `포이즌 리버스(poisoned reverse)`라는 방법을 통해 방지할 수 있다.

<br/>

즉, 만약 z가 y를 통해 목적지 x로 가는 경로 설정을 했다면, **z는 y에게 x까지의 거리가 무한대라고 알린다.**

*z는 y를 통과해서 x로 가는 동안은 이러한 거짓말을 계속한다.*

이에 y는 z에서 x로 가는 경로가 없다고 믿으므로,  
z가 계속해서 y를 통해 x로 가는 경로를 사용하는 동안은 y는 z를 통해 x로 가는 경로를 시도하지 않을 것이다.

<br/>

**하지만 포이즌 리버스는 모든 무한 계수 문제를 해결할 수는 없다.**

단순히 직접 이웃한 2개의 노드가 아닌, 3개 이상의 노드를 포함한 루프는 포이즌 리버스로는 감지할 수 없다.

<br/>
<br/>

## 4. 링크 상태 알고리즘과 거리 벡터 라우팅 알고리즘의 비교

### ✅ 경로 계산 방법

LS와 DV 알고리즘은 경로를 계산할 때 서로 대비되는 방법을 취한다.

<br/>

#### LS 알고리즘

- 전체 정보를 필요로 한다.
- 각 노드는 다른 **모든** 노드와 (브로드캐스트를 통해) 통신한다.
- **오직** 자신에게 직접 연결된 링크의 비용만 알린다.

<br/>

#### DV 알고리즘

- 각 노드는 **오직** 직접 연결된 이웃과만 메시지를 교환한다.
- 자신으로부터 네트워크 내 (자신이 알고 있는) **모든** 노드로의 최소 비용 추정값을 이웃들에게 제공한다.

<br/>

### ✅ 메시지 복잡성

#### LS 알고리즘

- 각 노드는 네트워크 내 각 링크 비용을 알아야 하며, 이를 위해서는 `O(|N| |E|)`개의 메시지가 전송되어야 한다.
- 링크 비용이 변할 때마다 새로운 링크 비용이 모든 노드에게 전달되어야 한다.

<br/>

#### DV 알고리즘

- 매번 반복마다 직접 연결된 이웃끼리 메시지를 교환한다.
- 알고리즘의 결과가 수렴하는 데 걸리는 시간은 많은 요소에 좌우된다.
- 링크 비용이 변하고, 이 새로운 링크 비용이 이 링크에 연결된 어떤 노드의 최소 비용 경로에 변화를 준 경우에만  
  DV 알고리즘은 수정된 링크 비용을 전파한다.

<br/>

### ✅ 견고성

라우터가 고장나거나 오동작하거나 파손된다면 어떤 일이 발생할까?

<br/>

#### LS 알고리즘

- 라우터는 연결된 링크에 대해 잘못된 비용 정보를 브로드캐스트할 수 있다.
- 노드는 링크 상태 브로드캐스트를 통해 받은 패킷을 변질시키거나 폐기할 수 있다.

그러나 **하나의 링크 상태 노드는 자신의 포워딩 테이블만 계산하기 때문에**
링크 상태 알고리즘에서 경로 계산은 어느 정도 분산되어 수행된다.

따라서 링크 상태 알고리즘은 어느 정도의 견고성을 제공한다.

<br/>

#### DS 알고리즘

- 노드는 잘못된 최소 비용 경로를 일부 혹은 모든 목적지에 알릴 수 있다.

각 반복마다 한 노드의 거리 벡터 계산이 이웃에게 전달되고 다음 반복에서 이웃의 이웃에게 간접적으로 전달된다.

따라서 거리 벡터 알고리즘을 사용하는 네트워크에서 한 노드의 잘못된 계산은 **전체로 확산될 수 있다.**

<br/>

실제로 1997년에 작은 ISP에서 오작동한 라우터가 잘못된 라우팅 정보를 전국망의 백본 라우터에 제공한 적이 있었다.

이는 다른 라우터들이 오작동한 라우터에게 대규모 트래픽을 보내게 만들었고,  
인터넷의 상당 부분이 여러 시간 동안 단절되었다고 한다.

<br/>

---

<br/>

결국 어떤 알고리즘이 다른 알고리즘보다 명백히 낫다고 말할 수는 없으며,  
실제로 두 알고리즘 모두는 인터넷에서 사용되고 있다.