package com.shipsupply.controller;

import com.shipsupply.domain.Board;
import com.shipsupply.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    BoardService bs;

    @GetMapping("/view")
    public List<Board> getList() {
        return bs.getList();
    }

    @GetMapping("/view/{seq}")
    public Board getBoard(@PathVariable Long seq) {
        return bs.getBoard(seq);
    }

    @PostMapping("/add")
    public Board addBoard(@RequestBody Board board) {
        System.out.println("받은 게시글 정보 : " + board);
        return bs.addBoard(board);
    }

    @PutMapping("/update/{seq}")
    public Board updateBoard(@PathVariable Long seq, @RequestBody Board board) {
        return bs.updateBoard(seq, board);
    }

    @DeleteMapping("/delete/{seq}")
    public void deleteBoard(@PathVariable Long seq, @RequestBody Board board) {
        bs.deleteBoard(seq, board);
    }
}
