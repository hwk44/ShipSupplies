package com.shipsupply.controller;

import com.shipsupply.domain.WishList;
import com.shipsupply.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wish")
public class WishListController {

    @Autowired
    WishListService wishListService;

    @GetMapping("/get")
    public List<WishList> getList() {
        return wishListService.getList();
    }

    @GetMapping("/get/{id}")
    public Optional<WishList> getDetail(@PathVariable Long id) {
        return wishListService.getDetail(id);
    }

    @PostMapping("/add")
    public WishList addList(@RequestBody WishList wishList) {
        return wishListService.addList(wishList);
    }

    @PutMapping("/update")
    public WishList updateList(@RequestBody WishList wishList) {
        return wishListService.updateList(wishList);
    }

    @DeleteMapping("/delete")
    public void deleteList(@RequestBody WishList wishList) {
        wishListService.deleteList(wishList);
    }

}
