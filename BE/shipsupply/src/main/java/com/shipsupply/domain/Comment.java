package com.shipsupply.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num; //num 말고 id 쓰는게 관례
    @Setter
    private String text;
    @Setter
    private Date date;
    @Setter
    private Long hitCount = 0L;

    // 작성한 user의 id
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    // 어느 게시글에서 쓴 건지
    @ManyToOne 
    @JoinColumn(name = "seq")
    private Board board;

}