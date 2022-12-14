import React from 'react'

export default function Loginemail() {
    return (
        <section className='cont_section'>
            <h1>로그인</h1>
            <form>
            <label for="emailInput">이메일</label>
            <input type="email" id="emailInput" placeholder="이메일 주소를 적어주세요."></input>
            <label for="passwordInput">비밀번호</label>
            <input type="password" id="passwordInput" placeholder="비밀번호를 입력하세요."></input>
            <button>로그인</button>
            </form>
            <p>이메일로 회원가입</p>
        </section>
    )
}
