package com.example.UrlShortener.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3001",methods ={RequestMethod.GET,RequestMethod.DELETE,
        RequestMethod.POST,RequestMethod.PUT,RequestMethod.PATCH})
@RestController
@RequestMapping("/")

public class UrlController {
    @Autowired
    private UrlService urlService;

    @Autowired
    private UrlGenerator urlGenerator;

    @GetMapping("/api/v1/urls/")
    public ResponseEntity<?> getAllUrls(){
        try{
            List<Url> urls = urlService.getAllUrls();
            for (Url url:urls) {
                url.setShortUrl("http://localhost:5050/"+url.getShortUrl());
            }
            return new ResponseEntity<>(urls,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Could not find urls", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/v1/urls/")
    public ResponseEntity<?> createShortenedUrl(@RequestBody Url url){
        try{
            Optional<Url> existing_url = urlService.getExistingUrl(url.getLongUrl(),url.getEmail());
            if(existing_url.isPresent()){
                existing_url.get()
                        .setShortUrl("http://localhost:5050/"+
                                existing_url.get().getShortUrl());
                System.out.println(existing_url.get());
                return new ResponseEntity<>(existing_url,HttpStatus.OK);
            }
            Url created_url = urlService.createShortenedUrl(url);
            System.out.println(created_url);
            created_url.setShortUrl("http://localhost:5050/" + created_url.getShortUrl());
            System.out.println(created_url);
            return new ResponseEntity<>(created_url,HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{shortUrl}")
    public RedirectView redirectShortenedURLtoLongURL(@PathVariable String shortUrl, Model model){
        try {

            Optional<Url> url = urlService.getShortenedUrl(shortUrl);
            if (url.isPresent()) {
                String long_url = url.get().getLongUrl();
                return new RedirectView(long_url);
            }
            return new RedirectView();

        }

        catch(Exception e){
            System.out.println(e);
            return new RedirectView("/api/v1/urls/");
        }
    }

    @GetMapping("/api/v1/urls/all-urls/{email}")
    public ResponseEntity<?> getUrlsByEmail(@PathVariable String email){
        try{
            Optional<List<Url>> urls = urlService.getUrlsByEmail(email);
            if(urls.isPresent() && (urls.get().size()!=0)){
                for (Url url:urls.get()) {
                    url.setShortUrl("http://localhost:5050/"+url.getShortUrl());
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
