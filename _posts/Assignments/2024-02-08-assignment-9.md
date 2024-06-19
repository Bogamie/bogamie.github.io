---
title: "소켓 프로그래밍 1"
categories: Assignment
toc: true
toc_sticky: true
---
`sever.py`

```py
import socket

def evaluateExpression(expression):
    try:
        result = eval(expression)
        return str(result)
    except Exception as err:
        return "Error: " + str(err)
    
def handleClient(clientSocket, clientAddress):
    print(f"클라이언트 {clientAddress}가 연결 됨...")

    while True:
        try:
            data = clientSocket.recv(1024)
            if not data:
                break

            data = data.decode()
            print(f"수신한 데이터: {data}")

            if data.lower() == 'exit':
                print(f"클라이언트 {clientAddress}가 연결을 종료함.")
                clientSocket.close()
                break

            result = evaluateExpression(data)
            result = result.encode()
            clientSocket.send(result)
        except Exception as err:
            print(f"오류 발생: {err}")
            clientSocket.close()
            break

def serverProgram():
    # 소켓 객체 생성
    serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # 소켓 정보 세팅
    host = socket.gethostname()
    port = 9999
    serverSocket.bind((host, port))

    # 소켓 실행
    serverSocket.listen()
    print(f"서버가 {host}:{port}에서 클라이언트 연결 대기 중...")

    while True:
        clientSocket, clientAddress = serverSocket.accept()
        handleClient(clientSocket, clientAddress)

if __name__ == "__main__":
    serverProgram()
```

이 코드는 Python을 사용한 간단한 TCP 서버 프로그램입니다. 클라이언트가 연결되면 수식을 전송받아 평가하고 그 결과를 클라이언트에게 반환하는 역할을 합니다. 코드의 각 부분을 설명하면 다음과 같습니다.

### 1. `evaluateExpression` 함수

- 이 함수는 문자열로 된 수식을 받아 `eval` 함수를 사용하여 평가합니다.
- 평가 결과를 문자열로 변환하여 반환합니다.
- 평가 중 오류가 발생하면 오류 메시지를 문자열로 반환합니다.

### 2. `handleClient` 함수

- 이 함수는 클라이언트 소켓과 주소를 받아 클라이언트와 통신을 처리합니다.
- 클라이언트가 연결되었음을 콘솔에 출력합니다.
- 무한 루프를 통해 클라이언트로부터 데이터를 수신하고, 수신한 데이터를 평가하여 결과를 클라이언트에 전송합니다.
- 클라이언트가 "exit"를 보내면 연결을 종료합니다.
- 데이터 수신 또는 전송 중 오류가 발생하면 오류 메시지를 출력하고 소켓을 닫습니다.

### 3. `serverProgram` 함수

- 이 함수는 서버 프로그램의 메인 루프를 정의합니다.
- TCP 소켓을 생성하고, 서버의 호스트 이름과 포트 번호를 설정합니다.
- 소켓을 지정된 호스트와 포트에 바인딩합니다.
- 소켓이 클라이언트 연결을 대기하도록 설정합니다.
- 무한 루프를 통해 클라이언트 연결을 기다리고, 클라이언트가 연결되면 `handleClient` 함수를 호출하여 클라이언트를 처리합니다.

### 4. 메인 실행 부분

- 이 부분은 프로그램이 직접 실행될 때 `serverProgram` 함수를 호출하여 서버 프로그램을 시작합니다.

### 요약
- 서버는 TCP 연결을 통해 클라이언트와 통신합니다.
- 클라이언트가 수식을 보내면 서버는 이를 평가하고 결과를 클라이언트에 반환합니다.
- 클라이언트는 "exit"를 보내 연결을 종료할 수 있습니다.

<br>
<br>

`client.py`

```py
import socket

def clientProgram():
    serverAddress = socket.gethostname()
    serverPost = 9999

    clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    clientSocket.connect((serverAddress, serverPost))

    while True:
        expression = input("수식을 입력하세요(종료하려면 exit 입력): ")

        clientSocket.send(expression.encode())

        if expression.lower() == 'exit':
            print("프로그램을 종료합니다.")
            break

        result = clientSocket.recv(1024).decode()

        if result.startswith("Error:"):
            print("수식이 잘못되었습니다.")
        else:
            print(f"{expression} = {result}")

    clientSocket.close()

if __name__ == "__main__":
    clientProgram()
```
이 코드는 클라이언트 프로그램으로, 서버에 연결하여 수식을 보내고 그 결과를 받아와 출력하는 역할을 합니다. 다음은 코드의 각 부분에 대한 설명입니다.

### 1. `clientProgram` 함수
- `serverAddress`와 `serverPost` 변수에 서버의 주소와 포트 번호를 설정합니다. 여기서는 `socket.gethostname()`을 사용하여 서버 주소를 현재 호스트 이름으로 설정하고, 포트 번호는 9999로 설정합니다.
- `clientSocket` 변수를 통해 클라이언트 소켓을 생성하고, `AF_INET`과 `SOCK_STREAM`을 사용하여 TCP 소켓을 설정합니다.
- `clientSocket.connect` 메서드를 사용하여 설정된 서버 주소와 포트로 연결합니다.

### 2. 무한 루프 (while True)
- 클라이언트가 종료 명령을 입력할 때까지 계속 실행됩니다.
- 사용자로부터 수식을 입력받아 `expression` 변수에 저장합니다.
- 입력받은 수식을 서버로 전송합니다. 이때 문자열을 바이트로 인코딩하여 전송합니다.
- 사용자가 "exit"를 입력하면 프로그램을 종료합니다. 이 경우 서버에도 "exit" 메시지를 보내 연결을 종료합니다.
- 서버로부터 결과를 수신하고, 수신한 바이트 데이터를 문자열로 디코딩합니다.
- 수신한 결과가 "Error:"로 시작하면 수식이 잘못되었음을 사용자에게 알립니다. 그렇지 않으면 수식과 결과를 출력합니다.

### 3. 소켓 닫기
- 프로그램이 종료되기 전에 소켓을 닫아 자원을 해제합니다.

### 요약
- 클라이언트는 서버에 연결하여 사용자가 입력한 수식을 서버에 전송합니다.
- 서버는 수식을 평가한 결과를 클라이언트에 반환합니다.
- 클라이언트는 서버로부터 받은 결과를 출력합니다.
- 사용자가 "exit"를 입력하면 클라이언트는 서버와의 연결을 종료하고 프로그램을 마칩니다.

<br>
<br>

## 실행 화면

![image](https://github.com/Bogamie/bogamie.github.io/assets/162293185/6cac8722-2691-4078-a219-d3821199a718)

<br>

![image](https://github.com/Bogamie/bogamie.github.io/assets/162293185/821d3cca-4ea6-434b-ae71-8ce2a9c0190e)

<br>
<br> 
<br> 
<br> 