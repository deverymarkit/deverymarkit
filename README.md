# :computer: 개발자를 위한 데브리마킷

🔗 **[배포URL](https://deverymarkit-q7y17lqz4-deverymarkit.vercel.app/)** <br/><br/>
🔒 **서비스 이용을 위한 계정**
<br/>
- ID : deverymarkit@naver.com <br/>
- PW : 123123
<p align="center">
 <img src="https://user-images.githubusercontent.com/58455479/210468104-308fb759-2533-465f-9f00-38e0a85d63d0.jpeg"  width="1000" height="610"/>
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
- FrontEnd : `React`, `React-Router`, `Redux-Toolkit`, `Axios`, `CSS-Module`, 
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
<br>
<img width="1000" alt="역할 분담" src="https://user-images.githubusercontent.com/58455479/211818624-f994c764-efb1-4ceb-a595-4d32b62e0a19.png">

|김태수|이경린|배지현|최수진|
|:---:|:---:|:---:|:---:|
|<img src ="https://user-images.githubusercontent.com/58455479/210469909-89e77bc0-3a99-44de-8b12-b23cd8dd4340.jpeg" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210931416-eea730ee-3ffd-42fc-964c-6be9cf709290.png" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210931530-93db8443-60b1-468c-9698-b645ec768a91.jpeg" width="170px" height="180px"/>|<img src ="https://user-images.githubusercontent.com/58455479/210470017-4a6e3efd-556b-42a9-8e20-78bc2d73b2ad.jpeg" width="170px" height="180px"/>|
|🔗[GitHub](https://github.com/2duckchun)|🔗[GitHub](https://github.com/lgrin-byte)|🔗[GitHub](https://github.com/CocoLeahBae)|🔗[GitHub](https://github.com/ssujinchoi)|
<br>

# 4. <span id = "tree"> 프로젝트 구조 </span> 
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

# 5. <span id = "feel"> 느낀 점 </span>
## 김태수
 - 프로젝트 팀장 역할을 수행하면서 마감 일정에 대한 압박을 느껴보았고, 팀 내 소통에 대한 자아성찰과 효과적인 개발을 위한 기술 도입에 많은 고민을 했던 것 같습니다.
 - 프로젝트 팀의 작업이 중간에 막히지 않도록 컴포넌트 흐름이나 개발 순서를 꾸준히 업데이트 했고, 기술적인 부분에서도 팀 차원에서 효과적인 업무가 가능하도록 유효성 검사, 무한 스크롤, 이미지 업로드 등을 선제적으로 도입해서 팀원들에게 설명해주었습니다. 전체적으로 프로젝트 마무리가 잘 되었다는 것에 뿌듯합니다.
### 개선점
 - 프로젝트의 초반에 팀원들이 컨벤션을 설계하는 것에 과도한 에너지를 쏟는다고 판단하여 다소 일방적인 커뮤니케이션으로 초기 개발을 진행하게 되었습니다. 이로 인해 개발에 속도가 붙긴 했으나, 팀의 사기 진작에는 악영향을 끼치게 되었습니다.
 - 팀원에게 컴포넌트 개발 범위를 할당하고, 배우면서 개발할 수 있도록 시간을 자율로 부여했지만 명확한 데드라인을 정하지 않았습니다. 이로 인해 팀장이 생각했던 타임라인과 팀원이 생각했던 타임라인이 일치하지않아 개발에 장애가 되었습니다. 팀 프로젝트에 있어서 타임라인 설정과 일정 공유가 중요하다는 것을 체감하게 되었습니다.

## 이경린
- 컨벤션을 만들고 git branch와 pull request를 통해 협업을 하는 것은 처음이었기 때문에 굉장히 낯설었습니다. 
서서히 적응하면서 형상관리를 하는데에 효과적이라는 것은 확실히 느끼게 되었습니다.
- 또한, 이미 짠 코드를 재사용할 수 있도록 변경하다 보니 오히려 시간이 지체되는 경우가 있어서 이 부분에 대해서는 먼저 코드를 짜고 리팩토링을 통해 모듈화해야겠다고 생각했습니다.
- 경직성을 완화하고 불필요한 복잡성을 줄이는 방법으로 코드를 짜서 코드 가독성을 높여야 겠다고 생각했습니다.





<br/>

# 6. <span id = "ui"> UI </span>
### 스플래시 화면
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216489965-38c58fd8-495d-4b70-829d-7a0745a3331d.gif" />

### 회원가입
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490385-ace509f4-d03d-4239-915d-e026a107b95a.gif" />
 
### 로그인
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490277-f08f2012-381d-433b-93fb-6f2a048db3b7.gif" />

### 좋아요 버튼 & 댓글
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490479-506d7e57-c954-4a46-b34f-2edd4dc0d46b.gif" />

### 상품 등록
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490662-ef758481-45fc-41d9-8bff-cd1828b0b1fb.gif" />

### 게시글 업로드
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490730-060bde24-e7e7-492f-9791-83f3234b5741.gif" />

### 로그아웃
<img width="25%" src="https://user-images.githubusercontent.com/92588154/216490777-dcf9ab59-eb6a-495f-9dd4-2c3064f91746.gif" />


