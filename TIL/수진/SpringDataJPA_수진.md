#### 엔티티 생성

- 실무에서는 `@Setter`을 잘 사용하지 않음.
  - 꼭 변경해야 할 
- 생성자는 `protected`
  - `private`으로 쓰면 안됨.
    - Jpa 구현체(Hibernate)가 프록시를 이용해서 객체를 생성할 때 접근할 수 없음.
- `@Column(name = "member_id")`로 컬럼 매핑

#### 테스트 클래스 생성

- `ctrl+shift+T` : 테스트로 이동
- 기존에는 `Runwith(SpringRunner.class)`를 넣어줘야 했음.
  - JUnit5와 스프링부트 조합을 쓰면 안써도 됨.

- `@Transactional`을 붙여줘야 함.
- 같은 트랜잭션 내에서 jpa 영속성 레포지토리에 객체를 넣으면 넣어진 객체와 넣은 객체가 동일함.



#### 엔티티 변경

- update 쿼리를 따로 날릴 필요 없이, 영속성 컨텍스트에서 객체를 변경하면 자동으로 update 쿼리를 날림.

---

### Spring Data JPA

##### 공통 인터페이스 설정

- `@EnableJpaRepositories(basePackages = "study.datajpa.repository")`
  - 스프링부트를 사용하고 `DataJpaApplication` 파일이 최상위 디렉토리에 존재하면 따로  어노테이션을 안 붙여줘도 자동으로 인식함.

#### 쿼리 메서드

##### 메소드 이름으로 쿼리 생성

복잡한 쿼리가 아닌, 짤막 짤막한 쿼리를 작성할 때 사용

- `find...By`
  - by 뒤에 아무것도 안적으면 전체 조회
  - ...에는 아무거나 들어가도 됨 -> 식별하기 위한(설명)을 넣어도 됨.

- `count...By`
- `exists...By`
- `delete...By`
- `findDinstinct`
- `findFirst3`



##### JPA NamedQuery

- 실무에서 잘 사용되지 않음.
- 강력한 장점은 애플리케이션 로딩 시점에 NamedQuery의 쿼리를 파싱해서 오류가 발생하면 문법오류를 알려줌.
  - `createQuery`는 문자열이 파라미터로 들어가기 때문에 문법 오류를 찾을 수 없고, 사용자가 애플리케이션을 사용할 때 오류가 발생.
  - `NamedQuery`는 애플리케이션 로딩 시점에 버그를 잡을 수 있음.

``` java
@Query(name = "Member.findByUsername")
List<Member> findByUsername(@Param("username") String username);
```



##### 리포지토리 쿼리

- `@Query`를 통해서 리포지토리 메서드에 쿼리를 바로 작성할 수 있음.

```java
@Query("select m from Member m where m.username = :username and m.age = :age")
List<Member> findUser(@Param("username") String username, @Param("age") int age);
```



#### DTO으로 @Query 조회

##### DTO 생성

- `@Data` 어노테이션 붙이기 -> getter, setter 다 포함되어 있는 어노테이션이라서 entity에 안 붙이는게 좋음.

``` java
@Query("select new study.datajpa.dto(m.id, m.username, t.name) from Member m join m.team t")
List<MemberDto> findMemberDto();
```

##### 파라미터 바인딩

- 컬렉션 바인딩

  ```java
  @Query("select m from Member m where m.username in :names")
  List<Member findByNames(@Param("names") List<String> names);
  ```

  

#### 스프링 데이터 JPA 페이징과 정렬

- Pageable 구현체인 PageRequest DTO를 입력하고 Page 객체를 반환하면 됨

  ```java
  PageRequest pageRequest = PageRequest.of(0, 3, Sort.by(Sort.Direction.DESC,"username"));
  Page<Member> page = memberRepository.findByAge(10, pageRequest);
  ```

- 슬라이스는 limit을 n+1 조회 함.
- page는 0부터 시작

- **countQuery를 따로 분리 가능**

  - 실무에서 성능 최적화할 때 중요

  ```java
  @Query(value = "select m from Member m left join m.team t",
        countQuery = "select count(m) from Member m")
  Page<Member> findByAge(int age, Pageable pageable);
  ```

- ##### DTO로 쉽게 변환하는 방법

  ```java
  Page<MemberDto> toMap = page.map(member -> new MemberDto(member.getId(), member.getUsername(), null))
  ```

  



#### 벌크성 수정 쿼리

- 수정할 땐, `@Modifying`  어노테이션을 추가해야 함.

```java
@Modifying
@Query("update Member m set m.age = m.age +1 where m.age >= :age")
int bulkAgePlus(@Param("age") int age);
```

- 벌크성 연산을 한 후엔 가급적이면 영속성 컨텍스트를 날려야 함.
  - `em.flush()` 와 `em.clear()`
  - `@Modifying` 어노테이션의 clearAutomatically 속성을 true로 해도 됨.



#### @EntityGraph

- 지연로딩과 즉시로딩의 차이점

  - 지연로딩을 하면, ManyToOne으로 연결되어 있는 객체를 바로 부르지 않고, 필요할 때만 부름

    (ex. Member을 부를 때 Team 정보는 반환하지 않고, 필요할 때만 반환)

  - ##### N+1 문제

    - 즉시로딩을 했을 때, 모든 리스트에서 연관 객체를 부르기 위해 N만큼 쿼리가 더 실행되는 문제를 말함.

    - 이런 문제를 JPA에서는 **FetchJoin**을 통해 해결

      - 연관된 모든 정보를 가져옴.

      ``` java
      @Query("Select m from Member m left join fetch m.team")
      List<Member> findMemberFetchJoin();
      ```

    - 스프링 데이터 JPA에서는 `@EntityGraph`를 붙임으로써 해결

      ```java
      @Override
      @EntityGraph(attributePaths = {"team"})
      List<Member> findAll();
      
      @Query("select m from Member m")
      @EntityGraph(attributePaths = {"team"})
      List<Member> findMemberntityGraph();
      
      @EntityGraph(attributePaths = {"team"})
      List<Member> findEntityGraphByUsername(@Param("username") String username);
      ```

#### JPA Hind & Lock

- 최적화할 수 있는 방법 중 하나이지만 성능이 확 올라가는 걸 기대하면 안됨

- `@QueryHints`

  ```java
  @QueryHints(value = @QueryHint(name = "org.hibernate.readOnly", value = "true"))
  Member findReadOnlyByUsername(String username);
  ```

- `@Lock`

  내용이 복잡하고 어렵기 때문에, 자세히 찾아보는 것을 추천

  - 실시간 트래픽이 많은 경우엔 안쓰는 것을 추천



#### 사용자 정의 리포지토리

- 실무에서 굉장히 많이 사용됨.
- Spring data JPA 쿼리 말고 이외의 것들을 구현하고 싶을 때
  - JDBC 템플릿
  - JPA 직접 사용 (`EntityManager`)
  - MyBatis 사용
  - 데이터베이스 커넥션 직접 사용 등등...
  - QueryDSL

#### Auditing

- 생성일, 수정일, 생성자, 수정자 의 정보를 기록

##### 순수 JPA

```java
@MappedSuperclass
@Getter
public class JpaBaseEntity {
 @Column(updatable = false)
 private LocalDateTime createdDate;
 private LocalDateTime updatedDate;
    
 @PrePersist
 public void prePersist() {
 	LocalDateTime now = LocalDateTime.now();
 	createdDate = now;
 	updatedDate = now;
 }
    
 @PreUpdate
 public void preUpdate() {
 	updatedDate = LocalDateTime.now();
 }
}

```

##### data JPA

```java
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class BaseEntity {
    
 @CreatedDate
 @Column(updatable = false)
 private LocalDateTime createdDate;
    
 @LastModifiedDate
 private LocalDateTime lastModifiedDate;
}
```

##### web 확장 - 페이징과 정렬

- `Pageable pageable`을 받아서 Page 객체 반환

- DTO로 변환해서 반환

  ```java
  @GetMapping("/members")
  public Page<MemberDto> list(Pageable pageable) {
   Page<Member> page = memberRepository.findAll(pageable);
   Page<MemberDto> pageDto = page.map(MemberDto::new);
   return pageDto;
  }
  ```

  
