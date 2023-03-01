package com.example.UrlShortener.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/urls")
public class UrlController {
    @Autowired
    private UrlService urlService;

    @Autowired
    private UrlGenerator urlGenerator;

    @GetMapping("/")
    public ResponseEntity<?> getAllUrls(){
        try{
            List<Url> urls = urlService.getAllUrls();
            return new ResponseEntity<>(urls,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Could not find urls", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createShortenedUrl(@RequestBody Url url){
        try{
            Url created_url = urlService.createShortenedUrl(url);
            return new ResponseEntity<>(created_url,HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/url")
    public String getUrlShort(@RequestBody Url url){

        String ans =  urlGenerator.generateRandomShortUrl(url.getLongUrl());
        System.out.println(ans);
        return ans;

    }
}
