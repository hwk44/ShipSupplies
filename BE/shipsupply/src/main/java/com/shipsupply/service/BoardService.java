package com.shipsupply.service;

import com.shipsupply.domain.Board;
import com.shipsupply.domain.User;
import com.shipsupply.persistence.BoardRepository;
import com.shipsupply.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    BoardRepository br;

    @Autowired
    UserRepository ur;

    public List<Board> getList() {
        return br.findAll();
    }

    public Board getBoard(Long id) {
        Optional<Board> findBoard = br.findById(id);
        Board b = new Board();
        if(findBoard.isPresent()) {
            b = findBoard.get();
        }
        return b;
    }

    public Board addBoard(Board board) {
        String id = board.getUser().getId();
        Optional<User> findUser  = ur.findById(id);
        if (findUser.isPresent()) {
            User u = findUser.get();
            board.setUser(u); // user엔티티와 board 엔티티의 관계를 설정해준다.
                                //// db에 저장될 때 Board테이블의 user컬럼에 해당 사용자의 id를 외래키로 저장
            board.setDate(new Date());
            return br.save(board);
        }else {
            throw new RuntimeException("해당하는 사용자 없음");
        }
    }

    public Board updateBoard(Long id, Board board) {
        Board b;
        Optional<Board> findBoard = br.findById(id);
        if(findBoard.isPresent()) {
            b = findBoard.get();
            if(b.getUser().getId().equals(board.getUser().getId())) {
                Optional.ofNullable(b.getTitle()).ifPresent(b::setTitle);
                Optional.ofNullable(b.getText()).ifPresent(b::setText);
                Optional.ofNullable(b.getDate()).ifPresent(b::setDate);
                return br.save(b);
            } else {
                throw new RuntimeException("일치하지 않는 사용자");
            }
        } else {
            throw new RuntimeException("존재하지 않는 게시글");
        }
    }

    public void deleteBoard(Long id, Board board) {
        Optional<Board> findBoard = br.findById(id);
        if(findBoard.isPresent()) {
            Board b = findBoard.get();
            if(b.getUser().getId().equals(board.getUser().getId())) {
                br.deleteById(id);
            } else {
                throw new RuntimeException("일치하지 않는 사용자");
            }
        } else {
            throw new RuntimeException("존재하지 않는 게시글");
        }
    }
}
