package com.example.UrlShortener.Account;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class AccountService {

   @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAccounts(){
        System.out.println("its here");
        return accountRepository.findAll();
    }

    public Account createAccount(Account account) {
        int salt = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder = new
                BCryptPasswordEncoder(salt,new SecureRandom());
        account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));

        return accountRepository.save(account);
    }

    public Optional<Account> getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

//    public String loginAccount(Account account) {
//        try{
//            Optional<Account> userDetails =  accountRepository.findByEmail(account.getEmail());
//            return userDetails;
//
//
//        }
//        catch(Exception e){
//            return "User not found";
//        }
//        return null;
//    }
}
