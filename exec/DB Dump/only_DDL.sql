create table activity
(
    place_id     bigint auto_increment
        primary key,
    added_cnt    bigint default 0 not null,
    content      varchar(5000)    not null,
    gugun        varchar(20)      not null,
    holiday      varchar(30)      null,
    img_url      varchar(100)     not null,
    lat          float            not null,
    like_cnt     bigint default 0 not null,
    lng          float            not null,
    name         varchar(30)      not null,
    open_time    varchar(30)      null,
    place        varchar(30)      not null,
    review_cnt   bigint default 0 not null,
    subtitle     varchar(100)     null,
    tel          varchar(20)      null,
    transport    varchar(200)     null,
    review_score float            not null
);

create fulltext index plade_id
    on activity (name);

create table culture
(
    place_id     bigint auto_increment
        primary key,
    added_cnt    bigint default 0 not null,
    address      varchar(50)      not null,
    content      varchar(5000)    null,
    day          varchar(30)      not null,
    gugun        varchar(20)      null,
    img_url      varchar(100)     null,
    lat          float            not null,
    like_cnt     bigint default 0 not null,
    lng          float            not null,
    name         varchar(30)      not null,
    review_cnt   bigint default 0 not null,
    review_score float            not null
);

create table hotel
(
    place_id     bigint auto_increment
        primary key,
    added_cnt    bigint default 0 not null,
    gugun        varchar(20)      not null,
    lat          float            not null,
    like_cnt     bigint default 0 not null,
    lng          float            not null,
    name         varchar(30)      not null,
    review_cnt   bigint default 0 not null,
    sido         varchar(20)      not null,
    tel          varchar(20)      null,
    url          varchar(100)     null,
    review_score float            not null
);

create table restaurant
(
    place_id     bigint auto_increment
        primary key,
    added_cnt    bigint default 0 not null,
    address      varchar(100)     not null,
    award        varchar(50)      null,
    category     varchar(20)      null,
    holiday      varchar(20)      null,
    img_url      varchar(100)     null,
    intro        varchar(5000)    not null,
    lat          float            not null,
    like_cnt     bigint default 0 not null,
    lng          float            not null,
    name         varchar(50)      not null,
    naver_score  float            null,
    open_time    varchar(20)      null,
    review_cnt   bigint default 0 not null,
    stg_score    float            not null,
    tel          varchar(20)      null,
    url          varchar(100)     null,
    review_score float            not null
);

create table travel
(
    place_id     bigint auto_increment
        primary key,
    added_cnt    bigint default 0 not null,
    address      varchar(100)     null,
    content      varchar(5000)    not null,
    facilities   varchar(300)     null,
    fee          varchar(100)     null,
    gugun        varchar(20)      null,
    holiday      varchar(100)     null,
    img_url      varchar(100)     not null,
    lat          float            not null,
    like_cnt     bigint default 0 not null,
    lng          float            not null,
    name         varchar(30)      not null,
    open_time    varchar(300)     null,
    review_cnt   bigint default 0 not null,
    subtitle     varchar(100)     null,
    tel          varchar(100)     null,
    title        varchar(100)     not null,
    transport    varchar(300)     null,
    url          varchar(300)     null,
    tag          varchar(300)     null,
    mention      bigint           not null,
    review_score float            not null
);

create table travel_tag
(
    travel_tag_id bigint auto_increment
        primary key,
    tag_content   varchar(255) not null,
    place_id      bigint       null,
    constraint FKrea4wwxgc9tmqwnr6jnn0lixm
        foreign key (place_id) references travel (place_id)
);

create table user
(
    user_id    bigint auto_increment
        primary key,
    age_range  varchar(255) not null,
    email      varchar(50)  not null,
    gender     varchar(10)  not null,
    img_url    varchar(100) null,
    login_type varchar(20)  not null,
    nickname   varchar(255) not null,
    social_id  varchar(255) not null,
    birth      varchar(255) null,
    constraint UK_n4swgcf30j6bmtb4l4cjryuym
        unique (nickname),
    constraint UK_ob8kqyqqgmefl0aco34akdtpe
        unique (email)
);

create table activity_like
(
    like_id  bigint auto_increment
        primary key,
    place_id bigint null,
    user_id  bigint null,
    constraint FK3s96m0br1rppq86js3pg4qt64
        foreign key (place_id) references activity (place_id),
    constraint FKl8r54ewn311reg992ivn2gh5f
        foreign key (user_id) references user (user_id)
);

create table activity_review
(
    review_id  bigint auto_increment
        primary key,
    content    varchar(500) not null,
    like_cnt   bigint       not null,
    review_img varchar(100) null,
    score      float        not null,
    place_id   bigint       null,
    user_id    bigint       null,
    constraint FKd57dnf3eoqaikuttn0jwfjesr
        foreign key (user_id) references user (user_id),
    constraint FKh1ca44afnn2bhgyn0ta95jlts
        foreign key (place_id) references activity (place_id)
);

create table activity_review_like
(
    review_like_id bigint auto_increment
        primary key,
    review_id      bigint null,
    user_id        bigint null,
    constraint FK8jfg5wpsoe3wscnmuhjh6am9v
        foreign key (user_id) references user (user_id),
    constraint FK8vr8la96ybmk7hhtxiye3ykyl
        foreign key (review_id) references activity_review (review_id)
);

create table culture_like
(
    like_id  bigint auto_increment
        primary key,
    place_id bigint null,
    user_id  bigint null,
    constraint FK1gfmdw5i7opwybpbnc5howh75
        foreign key (user_id) references user (user_id),
    constraint FKgr7k1i1es11uf6unpgg7on0tf
        foreign key (place_id) references culture (place_id)
);

create table culture_review
(
    review_id  bigint auto_increment
        primary key,
    content    varchar(500) not null,
    like_cnt   bigint       not null,
    review_img varchar(100) null,
    score      float        not null,
    place_id   bigint       null,
    user_id    bigint       null,
    constraint FKbrm2p7rd617ljecw3kts8scy6
        foreign key (user_id) references user (user_id),
    constraint FKkomji27o4dhbv6jyvgfct46m
        foreign key (place_id) references culture (place_id)
);

create table culture_review_like
(
    review_like_id bigint auto_increment
        primary key,
    review_id      bigint null,
    user_id        bigint null,
    constraint FKbe9a7446rp9h82w9hns7u40ml
        foreign key (user_id) references user (user_id),
    constraint FKp4jtpwot9k6kgfl65skbhe28k
        foreign key (review_id) references culture_review (review_id)
);

create table custom
(
    place_id bigint auto_increment
        primary key,
    address  varchar(50)  not null,
    content  varchar(500) not null,
    lat      float        not null,
    lng      float        not null,
    name     varchar(30)  not null,
    user_id  bigint       null,
    constraint FKqtjmrr2bawqldtqsqso2ifipk
        foreign key (user_id) references user (user_id)
);

create table full_course
(
    fc_id      bigint auto_increment
        primary key,
    end_date   datetime(6)  not null,
    reg_date   datetime(6)  not null,
    start_date datetime(6)  not null,
    thumbnail  varchar(100) not null,
    user_id    bigint       null,
    is_shared  bit          not null,
    constraint FK1gjchj55co3eb36bn9y1u0k2c
        foreign key (user_id) references user (user_id)
            on update cascade on delete cascade
);

create table full_course_detail
(
    fc_detail_id bigint auto_increment
        primary key,
    comment      varchar(255) null,
    course_order int          not null,
    day          int          not null,
    img          varchar(255) null,
    is_visited   bit          not null,
    place_id     bigint       not null,
    type         varchar(20)  not null,
    fc_id        bigint       null,
    constraint FK5xro4qf5dhjo9y1g31awipwjv
        foreign key (fc_id) references full_course (fc_id)
);

create table full_course_diary
(
    fc_diary_id  bigint auto_increment
        primary key,
    content      varchar(255) null,
    img          varchar(255) null,
    fc_detail_id bigint       null,
    constraint FKojrdlyuhbscm6f2fmnn8a29r4
        foreign key (fc_detail_id) references full_course_detail (fc_detail_id)
);

create table hotel_like
(
    like_id  bigint auto_increment
        primary key,
    place_id bigint null,
    user_id  bigint null,
    constraint FK5u40828b3n5rokkqlg18v2i7r
        foreign key (place_id) references hotel (place_id),
    constraint FK9abmn0st7qw1t83i7gfvu2hdf
        foreign key (user_id) references user (user_id)
);

create table hotel_review
(
    review_id  bigint auto_increment
        primary key,
    content    varchar(500) not null,
    like_cnt   bigint       not null,
    review_img varchar(100) null,
    score      float        not null,
    place_id   bigint       null,
    user_id    bigint       null,
    constraint FKgtp8qv0feqnwys46h0ug8g49l
        foreign key (user_id) references user (user_id),
    constraint FKtipg314f6n07d61pun61ml816
        foreign key (place_id) references hotel (place_id)
);

create table hotel_review_like
(
    review_like_id bigint auto_increment
        primary key,
    review_id      bigint null,
    user_id        bigint null,
    constraint FK3mhi99cl7b1j468k4ctwtd8hd
        foreign key (review_id) references hotel_review (review_id),
    constraint FK78ukj30pam2t60v1fp12tys66
        foreign key (user_id) references user (user_id)
);

create table restaurant_like
(
    like_id  bigint auto_increment
        primary key,
    place_id bigint null,
    user_id  bigint null,
    constraint FKa9tb56sowaqsr2886vu98m39b
        foreign key (user_id) references user (user_id),
    constraint FKgcvc239ojgjm91h5d6ajnmj3a
        foreign key (place_id) references restaurant (place_id)
);

create table restaurant_review
(
    review_id  bigint auto_increment
        primary key,
    content    varchar(500) not null,
    like_cnt   bigint       not null,
    review_img varchar(100) null,
    score      float        not null,
    place_id   bigint       null,
    user_id    bigint       null,
    constraint FKg9uycgrt9x3wc1t3liyl8dgm6
        foreign key (place_id) references restaurant (place_id),
    constraint FKskp58rk8vac4rsbr13gxgts4e
        foreign key (user_id) references user (user_id)
);

create table restaurant_review_like
(
    review_like_id bigint auto_increment
        primary key,
    review_id      bigint null,
    user_id        bigint null,
    constraint FK49eqpsosdyqy2ciykgrppgux4
        foreign key (user_id) references user (user_id),
    constraint FKnb8pa05taqaijiciro22knswq
        foreign key (review_id) references restaurant_review (review_id)
);

create table shared_full_course
(
    shared_fc_id bigint auto_increment
        primary key,
    comment_cnt  bigint       not null,
    detail       varchar(500) null,
    like_cnt     bigint       not null,
    reg_date     datetime(6)  not null,
    thumbnail    varchar(100) not null,
    title        varchar(50)  not null,
    view_cnt     bigint       not null,
    fc_id        bigint       null,
    user_id      bigint       null,
    user_email   bigint       null,
    email        bigint       null,
    day          int          not null,
    constraint FK9wds4qr4qsqoa200lk7kjyh0i
        foreign key (user_id) references user (user_id),
    constraint FKa7fvv8a4yyo8fpiviksj26n61
        foreign key (fc_id) references full_course (fc_id),
    constraint FKjs0clet5bg937ry5b8tlbqhb4
        foreign key (user_email) references user (user_id),
    constraint FKol7wtdtytnjpfsd0fnbtxfhj5
        foreign key (email) references user (user_id)
);

create table sharedfccomment
(
    fc_comment_id bigint auto_increment
        primary key,
    comment       varchar(100) not null,
    shared_fc_id  bigint       null,
    user_id       bigint       null,
    constraint FK9vv9vxpi7dtlhmfpc3lfs8pfp
        foreign key (user_id) references user (user_id),
    constraint FKasyooec6l2w290rs2tvk32sna
        foreign key (shared_fc_id) references shared_full_course (shared_fc_id)
);

create table sharedfclike
(
    fc_like_id   bigint auto_increment
        primary key,
    shared_fc_id bigint null,
    user_id      bigint null,
    constraint FK6o5wiaqpbjvr42lgc0whptd77
        foreign key (user_id) references user (user_id),
    constraint FK9m5fk0lsv782ecmungx4h4xra
        foreign key (shared_fc_id) references shared_full_course (shared_fc_id)
);

create table sharedfctag
(
    fc_tag_id    bigint auto_increment
        primary key,
    tag_content  varchar(30) not null,
    shared_fc_id bigint      null,
    constraint FKm6d3j048p0y6txijn0q5iirgb
        foreign key (shared_fc_id) references shared_full_course (shared_fc_id)
);

create table travel_like
(
    like_id  bigint auto_increment
        primary key,
    place_id bigint null,
    user_id  bigint null,
    constraint FKhuli4o5yw7103c332e9xny5de
        foreign key (place_id) references travel (place_id),
    constraint FKq7fk0u2pk6iqhbq8jom84sqre
        foreign key (user_id) references user (user_id)
);

create table travel_review
(
    review_id  bigint auto_increment
        primary key,
    content    varchar(500) not null,
    like_cnt   bigint       not null,
    review_img varchar(100) null,
    score      float        not null,
    place_id   bigint       null,
    user_id    bigint       null,
    constraint FK87xo228jwm2ai37fntt94hxii
        foreign key (user_id) references user (user_id),
    constraint FKpyd55ussywi7jgqf1cbe443y9
        foreign key (place_id) references travel (place_id)
);

create table travel_review_like
(
    review_like_id bigint auto_increment
        primary key,
    review_id      bigint null,
    user_id        bigint null,
    constraint FKgyt4tuhqv0xuyaua9k7eol0ji
        foreign key (user_id) references user (user_id),
    constraint FKomioagic50txlyoml1pb8juel
        foreign key (review_id) references travel_review (review_id)
);

create table travel_tag_cnt
(
    travel_tag_cnt_id bigint auto_increment
        primary key,
    click_cnt         bigint not null,
    travel_tag_id     bigint null,
    user_id           bigint null,
    constraint FK9bwdxiu8kgmpwoy0jd00vgdhs
        foreign key (user_id) references user (user_id),
    constraint FKggl3kaw07iwgug4uokbu2irx0
        foreign key (travel_tag_id) references travel_tag (travel_tag_id)
);

create index idx__email
    on user (email);

