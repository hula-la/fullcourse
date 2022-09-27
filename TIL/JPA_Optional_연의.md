### Optional

[참고블로그](https://velog.io/@aidenshin/Optional-%EA%B4%80%EB%A0%A8..)

- Spring Data JPA 의 Repository 에서 리턴타입을 Optional로 바로 받을 수 있도록 지원하고 있다.
- 반복적인 null 체크를 줄일 수 있다.
- `orElseThrow`, `orElse` , `orElseGet`  
  ⇒ null 이 아닐 경우 객체를 반환하고 null 일 경우 에러처리를 하거나 다른 return 값을 지정한다.  
  ⇒ [참고블로그](https://dbbymoon.tistory.com/3)
  - `orElseThrow` : null 이라면 인자로 넘겨준 함수형 인자를 통해 생성된 예외를 발생시킨다.
  - `orElse` : null 이라면 인자로 넘겨준 객체를 반환한다.
  - `orElseGet` : null이라면 인자로 넘져준 데이터를 통해 객체를 생성하여 반환한다.
- optional 사용시, 주의할 점  
  [참고](https://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/)
  - isPresent() - get() 대신 orElse()/orElseGet()/orElseThrow()
  - orElse(new ... ) 대신 orElseGet(()-> new ... )
  - 단지 값을 얻을 목적이라면 Optional 대신 null 비교
  - Optional 대신 비어있는 컬렉션 반환
  - Optional 을 필드로 사용 금지
  - Optional 을 생성자나 메서드 인자로 사용 금지
  - Optional을 컬렉션의 원소로 사용 금지
  - of(), ofNullable() 혼동 주의
  - Optional<T> 대신 OptionalInt, OptionalLong, OptionalDouble
