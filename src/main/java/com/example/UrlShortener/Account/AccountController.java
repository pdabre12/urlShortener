package com.example.UrlShortener.Account;

import com.example.UrlShortener.User.User;
import com.example.UrlShortener.User.UserService;
import com.example.UrlShortener.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtService jwtService;

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

    @PostMapping(path = "/auth/register")
    public ResponseEntity<?> createAccount(@RequestBody Account account){
        try{
            Optional<Account> existing_account =
                    accountService.getAccountByEmail(account.getEmail());
            System.out.println(existing_account);
            if (!existing_account.isPresent()){
                String token =  accountService.createAccount(account);
                System.out.println(token);
                User new_user = userService.createUser(new User(account.getEmail()));
                return new ResponseEntity<>(token,HttpStatus.CREATED);
            }
            else{
                return new ResponseEntity<>("Email address already used!!",HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/auth/login")
    public ResponseEntity<?> loginAccount(@RequestBody Account account){
        try {
            Optional<Account> existing_account = accountService.getAccountByEmail(account.getEmail());
            if(!existing_account.isPresent()){
                throw new  UsernameNotFoundException("Username not found");

            }
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            boolean isPasswordMatches = encoder.matches(account.getPassword(),
                    existing_account.get().getPassword());
            if(isPasswordMatches){
                String jwtToken = jwtService.generateToken(existing_account.get());
                return new ResponseEntity<>(jwtToken,HttpStatus.OK);
            }
            throw new Exception();
        }
        catch(Exception e){
            return new ResponseEntity<>("Login unsuccessful",HttpStatus.BAD_REQUEST);
    }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getAccountByEmail(@PathVariable String email){
        try{
            Optional<Account> account = accountService.getAccountByEmail(email);
            if(account.isPresent()){
                return new ResponseEntity<>(account,HttpStatus.OK);
            }
            throw new Exception();
        }
        catch(Exception e){
            return new ResponseEntity<>("No email address registered",HttpStatus.BAD_REQUEST);
        }

    }




}
