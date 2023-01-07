# :computer: 개발자를 위한 데브리마킷

🔗 **[배포URL](https://deverymarkit.vercel.app/)** <br/><br/>
🔒 **서비스 이용을 위한 계정**
<br/>
- ID : deverymarkit@naver.com <br/>
- PW : 123123
<p align="center">
 <img src="https://user-images.githubusercontent.com/58455479/210468104-308fb759-2533-465f-9f00-38e0a85d63d0.jpeg"  width="1000" height="650"/>
</p>

<details>
<summary>목차</summary>
<div markdown="1">

1. [프로젝트 소개](#intro)
2. [사용기술 및 개발환경](#environments)
3. [역할 분담](#roles)
4. [트러블 슈팅](#trouble)
5. [핵심 코드](#code)
6. [프로젝트 구조](#tree)
7. [느낀 점](#feel)
8. [UI](#ui)

</div>

</details>
<br/>

# 1. <span id="intro"> 프로젝트 소개 </span>

```jsx
👉🏻 개발자의, 개발자에 의한, 개발자를 위한 SNS 데브리마킷입니다.

👉🏻 데브리마킷은 개발자에게 초점을 맞추어 필요한 아이템을 찾을 수 있게 도와주는 어플리케이션입니다.

👉🏻 판매자와 소비자 사이의 경계가 없습니다. 직접 소통하며 당신에게 최적인 제품을 찾을 수 있습니다.

👉🏻 개발과 관련된 나의 일상을 다른 유저에게 공유하고 공감대를 가진 친구를 만들 수 있습니다.
```
<br/>

# 2. <span id="environments"> 개발환경 및 사용기술 </span>
## 1) 개발기간 : 2022.12.09 ~ 2023.01.05

## 2) 기술
- FrontEnd : React, React-router, Hooks, css-module, Redux-Toolkit
- BackEnd : 제공된 API 사용

## 3) 협업 도구
<div align=left>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<div/>
<br/>

- 🔗 [Notion](https://likelion.notion.site/24-3acfedb74b414bf28029e7f734475d50)
- 🔗 [회의록](https://likelion.notion.site/abeb3ff76c44463ea7684800316c2fa3)
- 🔗 [컨벤션]()
- 🔗 [디자인 시안](https://www.figma.com/file/d4CsFRGIALPvJNecvFilVu/%EC%A0%84%EC%9E%90%EC%A0%9C%ED%92%88-%EB%A7%88%EC%BC%93?node-id=39%3A1814&t=3lV2qDvsFR3EXipx-0)

## 4) 이슈 관리
- 🔗 [GitHub Issues](https://github.com/deverymarkit/deverymarkit/issues) 와 🔗 [GitHub Project](https://github.com/deverymarkit/deverymarkit/projects?query=is%3Aopen) 를 사용하여 버전 관리 및 진행 상황을 공유
<img src="https://user-images.githubusercontent.com/58455479/210469515-4714e13e-6791-4142-acd0-7acf311ab8af.png"  width="370" height="360"/>
<img src="https://user-images.githubusercontent.com/58455479/210469320-3e9742ad-df41-4a79-b0f8-67fd99908235.png"  width="370" height="360"/>


## 5) GitHub Flow
![gitflow](https://user-images.githubusercontent.com/92588154/211146883-0ce5b0b4-df55-4101-ac75-af4635362a92.png)
- main, develop, 개인 작업 브랜치로 환경 구성
- main 브랜치에서 최종 배포 실행
- develop 브랜치에서 통합 개발 진행
<br/>

# 3. <span id = "roles"> 역할 분담 </span>
<img width="6752" alt="role" src="">
<br>

|김태수|이경린|배지현|최수진|
|:---:|:---:|:---:|:---:|
|<img src ="https://user-images.githubusercontent.com/58455479/210469909-89e77bc0-3a99-44de-8b12-b23cd8dd4340.jpeg" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210931416-eea730ee-3ffd-42fc-964c-6be9cf709290.png" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210931530-93db8443-60b1-468c-9698-b645ec768a91.jpeg" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210470017-4a6e3efd-556b-42a9-8e20-78bc2d73b2ad.jpeg" width="170px" height="180px"/>|
|🔗[GitHub](https://github.com/2duckchun)|🔗[GitHub](https://github.com/lgrin-byte)|🔗[GitHub](https://github.com/CocoLeahBae)|🔗[GitHub](https://github.com/ssujinchoi)|
<br>

# 4. <span id = "code"> 핵심 코드 </span>

### 1) customAxios
<br/>

# 5. <span id = "trouble"> 트러블 슈팅 </span>
<br/>

# 6. <span id = "tree"> 프로젝트 구조 </span> 
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂blankComponent
 ┃ ┣ 📂button
 ┃ ┣ 📂comment
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂card
 ┃ ┃ ┃ ┗ 📂slick
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂modification
 ┃ ┃ ┗ 📂navbar
 ┃ ┣ 📂post
 ┃ ┣ 📂product
 ┃ ┣ 📂profile
 ┃ ┣ 📂search
 ┃ ┗ 📂uploadPhoto
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂chatPage
 ┃ ┣ 📂followListPage
 ┃ ┣ 📂homePage
 ┃ ┣ 📂loginPage
 ┃ ┣ 📂postPage
 ┃ ┣ 📂productPage
 ┃ ┣ 📂profilePage
 ┃ ┣ 📂searchPage
 ┃ ┣ 📂splashPage
 ┃ ┗ 📂uploadPage
 ┣ 📂routes
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reset.css
 ┗ 📜store.js
 ```
<br/>

# 7. <span id = "feel"> 느낀 점 </span>
## 태수
 - 가나다라
<br/>

# 8. <span id = "ui"> UI </span>
![splash-login](https://user-images.githubusercontent.com/92588154/211147070-cba85367-dc6a-49b9-afed-989baac64a18.gif)



