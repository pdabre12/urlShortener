package com.example.UrlShortener.Account;

import com.example.UrlShortener.User.User;
import com.example.UrlShortener.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;
    @GetMapping("/")
    public ResponseEntity<?> getAccounts(){
        try{
            List<Account> accounts = accountService.getAccounts();
            if (accounts.size()>0) {
                return new ResponseEntity<>(accounts, HttpStatus.OK);
            }
            else{
                throw new Exception("Do not have Accounts");
            }
        }
        catch(Exception e){
            return new
                    ResponseEntity<>("Could not find any registered accounts",
                    HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(path = "/")
    public ResponseEntity<?> createAccount(@RequestBody Account account){
        try{
            Optional<Account> existing_account =
                    accountService.getAccountByEmail(account.getEmail());
            if (!existing_account.isPresent()){
                Account new_account =  accountService.createAccount(account);
                User new_user = userService.createUser(new User(account.getEmail()));
                return new ResponseEntity<>(new_account,HttpStatus.CREATED);
            }
            else{
                return new ResponseEntity<>("Email address already used!!",HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
