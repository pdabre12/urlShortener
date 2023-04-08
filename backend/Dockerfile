FROM openjdk:17
VOLUME /tmp
CMD [ "./mvnw clean package" ]
COPY  target/Url-Shortener-0.0.1-SNAPSHOT.jar server.jar
ENTRYPOINT ["java","-jar","/server.jar"]