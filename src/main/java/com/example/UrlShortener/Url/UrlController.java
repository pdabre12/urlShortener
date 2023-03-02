package com.example.UrlShortener.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
            Optional<Url> existing_url = urlService.getExistingUrl(url.getLongUrl(),url.getEmail());
            if(existing_url.isPresent()){
                existing_url.get()
                        .setShortUrl("http://urlshortener.com/"+
                                existing_url.get().getShortUrl());
                return new ResponseEntity<>(existing_url,HttpStatus.OK);
            }
            Url created_url = urlService.createShortenedUrl(url);
            created_url.setShortUrl("http://urlshortener.com/" + created_url.getShortUrl());
            return new ResponseEntity<>(created_url,HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Exception occurred!",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/url")
//    public String getUrlShort(@RequestBody Url url){
//        Optional<Url> existing_url = urlService.getExistingUrl(url.getLongUrl());
//        String ans =  urlGenerator.generateRandomShortUrl(url.getLongUrl());
//        System.out.println(ans);
//        return ans;
//
//    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUrlsByEmail(@PathVariable String email){
        try{
            Optional<List<Url>> urls = urlService.getUrlsByEmail(email);
            if(urls.isPresent() && (urls.get().size()!=0)){
                for (Url url:urls.get()) {
                    url.setShortUrl("http://urlshortener.com/"+url.getShortUrl());
                }
                    return new ResponseEntity<>(urls,HttpStatus.OK);
            }
            throw new Exception();

        }
        catch(Exception e){
            return new ResponseEntity<>("No urls found by the user!",HttpStatus.BAD_REQUEST);
        }
    }



}
