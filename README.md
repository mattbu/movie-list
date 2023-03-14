# ✍🏻 작업하면서 막혔던 부분 기록.

### 🧨 styled-jsx 사용 시 error

Next Js에서 styled-jsx는 따로 노드 모듈을 설치할 필요없이 바로 사용할 수 있다고 한다.

Nest Js + 타입스크립트 환경에서 styled-jsx를 사용하기 위해
```javascript
<style jsx> 태그를 추가하였다.
```
+ 스타일은 적용되지만 아래와 같은 메시지를 뱉으며, 코드에 빨간줄이 들어와 찾아보았다.

`'{ children: string; jsx: true; }' 형식은 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>' 형식에 할당할 수 없습니다.\n  'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>' 형식에 'jsx' 속성이 없습니다."`

아마도 타입 에러인것 같은데 검색 해본 결과, 해결방법을 찾았다.

### 해결방법

타입스크립트 코드의 타입 추론을 돕는 파일인 d.ts 파일을 추가 한다.
처음에는 next-env.d.ts에 추가하면 되는줄 알았지만, 공식문서에서 이 파일은 언제든지 변경될 수 있기 때문에 수정 또는 삭제 할 수 없다고 한다.
next-env.d.ts를 수정하는 대신 새로운 d.ts 파일을 만들어 `tsconfig.json`파일의 include 배열에 추가하여 참조하도록 하라고 한다.

+ 아래 내용으로 custom.d.ts 파일을 하나 만들고,
```javascript
// custom.d.ts
import 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
```
+ tsconfig.json의 "include"에 custom.d.ts을 추가 해주었다.

```javascript
{ include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "custom.d.ts"], }
```

#### 추가 후에 바로 코드 상의 빨간줄이 없어졌다.
