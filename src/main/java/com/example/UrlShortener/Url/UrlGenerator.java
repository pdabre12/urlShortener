package com.example.UrlShortener.Url;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UrlGenerator {
    private static int SHORT_URL_CHAR_SIZE=7;
    public static String convert(String longURL) {
        try {
            // Create MD5 Hash
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(longURL.getBytes());
            byte messageDigest[] = digest.digest();
            // Create Hex String
            StringBuilder hexString = new StringBuilder();
            for (byte b : messageDigest) {
                hexString.append(Integer.toHexString(0xFF & b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    public static String generateRandomShortUrl(String longURL) {
        String hash=UrlGenerator.convert(longURL);
        int numberOfCharsInHash=hash.length();
        int counter=0;
        while(counter < numberOfCharsInHash-SHORT_URL_CHAR_SIZE){
//            if(!DB.exists(hash.substring(counter, counter+SHORT_URL_CHAR_SIZE))){
//            if (!hash.substring(counter, counter+SHORT_URL_CHAR_SIZE).equals("c9f31d8")){
            if (1==1){
            return "http://urlshortener.com/" + hash.substring(counter, counter+SHORT_URL_CHAR_SIZE);

            }
            counter++;
        }
        return hash;
    }

}