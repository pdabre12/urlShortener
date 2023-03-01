package com.example.UrlShortener.Url;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    public List<Url> getAllUrls(){
        return urlRepository.findAll();
    }

    public Optional<Url> getShortenedUrl(Url url){
        return urlRepository.findByShortUrl(url.getShortUrl());
    }

    public Url createShortenedUrl(Url url){
        url.setCreated_date(new Date());
        System.out.println(url);
        return urlRepository.save(url);
    }
}
