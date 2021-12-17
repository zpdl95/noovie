1. `https://reactnative.dev/docs/environment-setup` 따라하기
2. npx create-react-native-app 으로 앱생성
3. expo install expo-app-loading -> 앱이 실행되기전에 필요한것들을 미리 로딩하는 방법 <AppLoading>컴포넌트를 설치
4. expo install expo-font -> 웹에서 폰트 로딩할때 사용
5. expo install expo-asset -> 이미지등 필요한 로컬데이터를 로딩할때 사용
6. npm install @react-navigation/native -> 리액트네비게이션 설치
7. expo install react-native-screens react-native-safe-area-context -> create-react-native-app으로 생성했기때문에 expo프로젝트에도 리엑트네비게이션을 사용할것이라고 알려줘야한다
8. npx pod-install ios -> 맥북으로 개발중이라면 설치해야한다
9. npm install @react-navigation/bottom-tabs -> 바텀탭네비게이션 설치
10. npm install @react-navigation/native-stack -> 네이티브스택네비게이션 설치
11. npm install styled-components -> css스타일을 사용하기위해 설치. 사용하기 쉽고 prop에 접근가능한 스타일 컴포넌트
12. npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer -> typescript설치 `https://reactnative.dev/docs/typescript` 그리고 tsconfig.json파일 생성
13. npm install @types/styled-components @types/styled-components-react-native -> styled-components에 타입스크립트로 자동완성을 해주기 위해 설치 `https://styled-components.com/docs/api#typescript` 그리고 styled.d.ts파일 생성
14. npm i react-native-web-swiper -> swiper패키지 다운로드. 스크롤 뷰로 만드는 대신 만들어진 패키지 사용`https://reactnative.directory/`에서 swiper로 검색
15. expo install expo-blur -> expo의 블러처리 뷰컴포넌트를 설치(npx pod-install ios 맥사용중이면 해야함)
16. npm i react-native-swiper@next -> 위의 swiper는 웹, android, ios 전부다 가능. 이놈은 android, ios만 가능(ios에서는 웹swiper을 사용하면 움직여서 이놈으로 바꿈)
17. npm i react-query -> Hooks를 통해 fetch데이터에 접근할 수 있게 해줌. loading state도 알려주고, caching, 무한스크롤도 지원함
