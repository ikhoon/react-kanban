## Chapter 2, DOM 추상화의 내부

### 리액트의 이벤트
리액트가 이벤트 핸들러를 노드 자체에 연결하는 것은 아니다.
실제로는 **단 하나의 이벤트 리스너**가 **문서루트**에 연결되며,
이벤트가 발생하면 리액트가 이를 적절한 컴포넌트요소로 매핑한다.
또한 리액트는 이벤트 리스너가 언마운트될 때 자동으로 이를 제거한다.

### DOM 이벤트 리스너
HTML은 태그 특성을 위한 간단히고 이해하기쉬운 이벤트 처리API(onclick,onfocus등)를 제공한다.
하지만 리액트의 속성에는 낙타 표기법(~~onclick~~이 아닌**onCIick**)이 적용된다.

![dom-event](./docs/dom-events.png)

이벤트 리스너 등록의 예

1. 람다 표현식으로 함수를 바로 적용할수 있다.

```jsx
<div className='card__title'; onClick={
  ()=>this.setState({ showDetails: !this.state.showDetails })
}>
```

2. 함수의 레퍼런스를 넘길수 있다.

```jsx
class Card extends Component {

  toggleDetails(){
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
   return (
     <div className='card__title'; onClick={this.toggleDetails.bind(this)}>
       {thiS.props.title}
     </div>
   )
  }
}
```

### JSX 자세히 살펴보기

다음 코드는
```jsx
<hl>Hello World</hl>
```
다음과 같이 변환된다
```jsx
ReactCreateEIement("hl", null,"HelloWorld");
```

#### JSX와HTML의 차이

JSX로 HTML 구문을 작성할 때는 세 가지 중요한 측면을 기억해야 한다.

1. 태그 특성은 낙타 표기법으로 작성한다. `oOoOoOoOoOo`
2. 모든 요소는 짝이 맞아 한다. `<짝 /> <짝>꿍</짝>`
3. 특성 이름이 HTML언어 사양이 아닌 DOM API에 기반을 둔다. `document.getE1ementById("box").className="some-other-class"`

#### JSX의 특이점

리액트 컴포넌트는 단일 루트 노드만 렌더링할 수 있다.
```jsx
return (
  <h1>Hello World</h1>
)
```

아래 코드는 유효하지 않음.

```jsx
return (
  <h1>Hello World</h1>
  <h2>Have a nice day</h2>
)
```

위 코드는 `<div/>`로 감싸면 다시 유효한 코드가 된다.
```jsx
return(
  <div>
    <hl>HelloWorld</hl>
    <h2>Have a nice day</h2>
  </div>
)
```

이러한 특성은 javascript은 return은 하나의 값만 반환 할수 있기 때문이다.

```jsx
return React.EreateEIement("div", null,
  React.createEIement("h1", null, "HelloWorld"),
  React.createEIement("h2", null, "Have a nice day"),
)
```

#### 만약은 안된다!

JSX안에 if문은 들어갈수 없다. 이런건 자바스크립트 같지만 html같은 느낌이 있음.
```jsx
<div className={if(condition){"salutation"}}>HelloJSX</div>
```

위 코드를 javascript로 compile하면
```jsx
React.createElement("div",{className: if(condition){"salutation"}}, "Hello JSX");
```

객체 리터럴 `{}`안에 if문이 들어가는 기이한 현상이 벌어진다.

#### 근데 왜 삼항 연산은 된댜?

```jsx
render(){
  return(
    <div className={condition ? "salutation" :""}>
      Hello JSX
      </div>
  )
}
```
이건 유효한 javascript 문법으로 변하기 때문이다.

```jsx
React.createElement("div",{className:condition ? "Salutation":""}, "Hello JSX");
```

이걸로 안되겠다 싶으면 return 앞에 jsx문법 바깥쪽에 선언하면 되부러.

```jsx
render(){
  let className;
  if(condition){
    className = "salutation";
  }
  return(
    <div className={className}>Hello JSX</div>
  )
}
```

뭐 늘한던거다. if 없인 못살아.~

#### 공백
기본적으로 공백을 출력하지 않는다. 따로 선언을 줘야한다.
```jsx
return(
  <div>
    <a href="http://google.com">Google</a>{" "}
    <a href="http://facebook.com">Facebook</a>
  </div>
)
```

&nbsp 안먹더라...

#### JSX의 주석
사실 주석 어떻게 쓰는지 몰라도 된다.
언제나 인텔리J가 나에게 코딩을 가르친다.

인텔리J가 빨간색은 틀린거고 주황색 경고가 있으면 내가 짠 코드보다 그 녀석은 더 좋은걸 알고 있는거다.
내가 모르는걸 알려주는 가장 좋은 1:1 과외 선생님이다.
그냥 OSX 기준으로 주석을 원하는 부분에서 `Cmd + /` 버튼 누르자.

알아서 코멘트가 만들어 질것이다. 그 다음에 인텔리J가 알려준 문법을 배우면 되는것이다.

#### HTML 바로 주입하기
HTML을 바로 주입하는건 위험(danger)하다.
하지만 세상사 위험한 일을 안하고 살기 쉽지 않다.

그 어려운 일을 하기 위해서는 `dangerouslySetInnerHTML`을 사용하면 해낼수 있다.
```jsx
<span dangerouslySetInnerHTML={{__html:this.props.someHtml}}/>
```

#### `React.DOM`에 고급진 돔을 만들수 있는 팩토리가 있다.
```jsx
React.DOM.form({className:"commentForm"}, 
  React.DOM.input({type:"text", placeholder:"Name"}),
  React.DOM.input({type:"text",placeholder:"Comment"}),
  ReaCt.DOM.input({type:"submit",value:"Post")) 
)
```

위에거랑 같다. `React.createElement`보단 간단하지만 그래도 불편하긴하다.
```jsx
<form className="commentForm">
  <input type="text" placeholder="Name" />
  <input type="text" placeholder="Comment" />
  <input type="text" placeholder="Post" />
</form> 
```

#### 인라인 스타일 정의

jsx에 바로 css를 적용할수 있다.
 
```jsx
import React,{Component} from'react'; 
import{render}from'react-dom';

class Hello extends Component{ 
  render(){
    let divStyle={ 
      width:100,
      height:30,
      padding:5, 
      backgroundColor:'#ee9900'
    }; 
    
    return <div style={divstyle}>HelloWorld</div>
  } 
}
```

#### 제어 컴포넌트
사용자의 입력값을 통해서 속성이 바뀌는 애들을 살펴보자.

입력값을 받을수 없다. value가 변하지 않는다.
```jsx
import React,{Component} from 'react'; 
import {render} from 'react-dom'; 

class Search extends Component{
  render(){ 
    return (
      <div>
        Search Term:<input type="search" value="React"/> 
      </div>
    ) 
  }
}
```

변경된 상태를 반영하려면 `state`를 사용하면 된다.

```jsx
import React,{Component} from 'react'; 
import {render} from 'react-dom'; 

class Search extends Component{
  constructor(){
    super(); 
    this.state={
      searchTerm: "React"
    };
  }
  
  render(){ 
    return (
      <div>
        Search Term:<input type="search" value={this.state.searchTerm} /> 
      </div>
    ) 
  }
}
```

사용자 입력 -> onChange -> state -> render 의 순환고리를 통해서 2way binding이 될수 있다.

```jsx
import React,{Component} from 'react'; 
import {render} from 'react-dom'; 

class Search extends Component{
  constructor(){
    super(); 
    this.state={
      searchTerm: "React"
    };
  }
  
  handleChange(event){ 
    thi5.setState({searchTerm: event.target.value});
  }
  
  render(){ 
    return (
      <div>
        Search Term:
        <input type="search" value={this.state.searchTerm} 
          onChange={this.handleChange.bind(this)}
        /> 
      </div>
    ) 
  }
}
```

귀찮다..... 
ng-bind에 비하면 엄청 귀찮음.... 
그러나 이게 맞다하니 믿고 따릅시다. **할렐루야**

### 가상 DOM의 작동 방식

리액트 설계의 핵심적인 측면 중 하나는 업데이트가 수행될 때마다 모든 것을 다시 렌더링히는 것처럼 API가 구성됐디는 점이다.

* DOM 트리의 노드튬 비교할 때 노드가 다른 유형일 경우(ex: `div`를 `span`으로 변경)
리액트는 이를 서로 다른 하위 트리로 취급해 첫 번째 향목을버리고 두 번째 항목을 생성/삽입한다.
* 커스팀 컴포넌트에도 동일한 논리룔 적용한다.
컴포넌트가 동일한 유형이 아닌 경우 리액트는 컴포넌트가 렌더링하는 내용을 `비교하지 않고` DOM에서 첫 번째 힝목을 제거한 후 두 번째 향목을 삽입힌다.
* 노드가 같은 유형인 경우
 - DOM요소의 경우(ex: `<div id="before" />`를 `<div id="after" />`로 변경)리액트는 특성과 스타일만 변경한다, 요소트리는 `대체하지 않음`.
 - 커스텀 컴포넌트의 경우(ex: `<Contact details={false}/>`를 `<Contact details={true}/>` 로 변경)
 리액트는 컴포넌트를 `대체하지 않고` 새로운 속성을 현재 마운팅된 컴포넌트로 전달한다.
 그러면 이 컴포넌트에서 새로 `render()`가 트리거되고 새로운 결과를 이용한 프로세스가 다시 시작된다.

#### key
반복되는 항목의 리스트는 특히 처리하기 까다롭다.
한 리스트를 다른 리스트로 변환하는 최상의 방법을 말하기는 쉽지 않다.
노드를 삽입,삭제,대체,이동할 수 있다는 것을 감안하면
하니의 알고리즘으로 모든가능한싱횡메서 최상의 접근법을 가려내기는 어려울 수 있다.

key는 트리 간에 힝목 삽입,삭제,대체,이동이 발생했는지 파악하기 위해 삐른 조회를 가능하게 하는 고유 식별자다.
루프 인에서 컴포넌트를 생성할 때마다 각 자식에 대한 key를 지정하면리액트 라이브러리가 이를 비교해성능 병목 현싱을 예방할 수 있다.

#### ref

리액트는 컴포넌트를 렌더링할 때 항상 가상 DOM을 대상으로 작업한다.
그러나 컴포넌트에 의해 렌더링되는 실제 DOM 마크업에 접근하고 싶은 경우가 생길 수 있다.

컴포넌트에서 문자열 속성으로ref를이용할 수 있다.
```jsx
<input ref="myInput"/>
```

참조된 DOM 마크업은 `this.refs`를 통해 접근할 수 있다.

```jsx
let input = this.refs.myInput; 
let inputValue = input.value;
let inputRect = input.getBoundingClientReCt();
```

#### 끝

```

         /\_/\
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)




 ((      /|_/|
  \\.._.'  , ,\
  /\ | '.__ v / 
 (_ .   /   "         
  ) _)._  _ /
 '.\ \|( / ( mrf
   '' ''\\ \\

    _  _
    )`|;.\--..
    /   "'   ;
    ) /) ,   '
    `7_.',)/`-   Felix Lee <flee@cse.psu.edu>
        ``'

            _,'|             _.-''``-...___..--';)
           /_ \'.      __..-' ,      ,--...--'''
          <\    .`--'''       `     /'
           `-';'               ;   ; ;
     __...--''     ___...--_..'  .;.'
    (,__....----'''       (,..--''   Felix Lee <flee@cse.psu.edu>


              __..--''``---....___   _..._    __
    /// //_.-'    .-/";  `        ``<._  ``.''_ `. / // /
   ///_.-' _..--.'_    \                    `( ) ) // //
   / (_..-' // (< _     ;_..__               ; `' / ///
    / // // //  `-._,_)' // / ``--...____..-' /// / //  
Felix Lee <flee@cse.psu.edu>


   )\._.,--....,'``.
  /,   _.. \   _\  (`._ ,.
 `._.-(,_..'--(,_..'`-.;.'  Felix Lee <flee@cse.psu.edu>


   |\      _,,,---,,_
   /,`.-'`'    -.  ;-;;,_
  |,4-  ) )-,_..;\ (  `'-'
 '---''(_/--'  `-'\_)  Felix Lee <flee@cse.psu.edu>

~ a little cat ~  9/96

          .       .         
          \`-"'"-'/
           } 6 6 {       
          =.  Y  ,=   
        (""-'***`-"")  
         `-/     \-'            
     jgs  (  )-(  )===' 
           ""   ""   



~ another little cat ~  9/96
         .       .         
         \`-"'"-'/
          } 6 6 {    
         =.  Y  ,=   
           /^^^\  .
          /     \  )           
     jgs (  )-(  )/ 
          ""   ""     
        


>> cats<<  10/96

       _
      ( \
       \ \
       / /                |\\
      / /     .-`````-.   / ^`-.
      \ \    /         \_/  {|} `o
       \ \  /   .---.   \\ _  ,--'
        \ \/   /     \,  \( `^^^
         \   \/\      (\  )
          \   ) \     ) \ \
      jgs  ) /__ \__  ) (\ \___
          (___)))__))(__))(__)))

       _ 
      / ) 
     / /  
    / /               /\ 
   / /     .-```-.   / ^`-.  
   \ \    /       \_/  (|) `o 
    \ \  /   .-.   \\ _  ,--' 
     \ \/   /   )   \( `^^^  
      \   \/    (    )  
       \   )     )  /     
  jgs   ) /__    | (__  
       (___)))   (__)))
  



@@ cat @@ 11/96

      \    /\
       )  ( ')
      (  /  )
 jgs   \(__)|



[small cat]

    /| 
   ( o>
 )/ |--
((__)\       VK





* sleeping cat 
 aka "Chessie" of the Chesapeake and Ohio Railroad *  11/96
                       ,
                      /|
                 ___,/'\
             ,-"`    ~ `;
            .`\  /     `\.
          ,/_ _ |\       `\   ,--,__,-"
    ,_,-'"`   \`\ `- ,     \ /     /   _/
      `"~-\    \    /  .-' |/         /
           `\ __, .-; '.-' /
             `\_. `-'__, _/   _/
               `\`  /`__/    /
              _,-`--'/
           .-"     _/   /    /
          /   _,-"`/  /'    /
          \__/ jgs


                             _       _
    __ ___ _ __ _  _ __ __ _| |_   _| |_ __ __ _  _ __ _ ___ __
   / _/ _ \ '_ \ || / _/ _` |  _| |_  | '_ \_ \ || / _` / _ \_ \
   \__\___/ .__/\_, \__\__,_|\__| |__/|_,__/__/ ,_/\__. \___/__/
          |_|   |__/                           \__|   |_|
             _                 _, ,_                 _
             \\`'. .-'``'-. .'`// \\`'. .-'``'-. .'`//
              ;   `        `   ;   ;   '        '   ;
              /                |   |                \
            /;,      _     _    \ /    _     _      ,;\
           |;;'     (()__ (()    |    ()) __())     ';;|
           \  -.__     \_/ __.-  \  -.__ \_/     __.-  /
            `, .-'/ ;'  7 \'-. ,' `, .-'/ 7  '; \'-. .'
              `-,'         `,-'     `-.'         `.-'
                  |`''--''`|           |`' --''`|
                ,'       ';;          ,;;'       '.
             , '           ;;       ,;'            `.
           ,;,               \     /                ,;,
         ,;;;'`              ,;   /                `';;;,
       ,'                  ,;;;\;';;.                    \
      /            \   |      ';|;'      |   /            ;
     /             |   |  |     |     |  |   |             \
    .;;            |   |  |     |     |  |   |            ;;.
   ,;'             |;, |  |     ;     |  | ,;|             ';,
  /|               |;' |  |     |     |  | ';|               |\
 '  '.             |   |  |     ;\    |  |   |             .'  '
 | ,;;`-._        .'   |   '.   / '-.'   |   `.        _.-';;, |
  \;;'    `'-.--'(_,   ,) , ,)-`   (, , (,   ,_)`--.-'`    `';/
   `-._       _,-' '-`-'`-'-'       '-`-'`-'-' `-,_       mx-'
       ``~~~~`                                     `~~~~``

- -- .-.
- - /  |                - - /|_/|      .-------------------.
   /   |  - _______________| @.@|     /    Toeung Family    )
- |    |-- (______         >\_C/< ---/                     /
  |    |  -  -   / ______  _/____)  ( toeung@rconnect.com /
-- \   | -  -   / /\ \   \ \         `-------------------'
 -  \  |     - (_/  \_) - \_)
- -  | |

```
