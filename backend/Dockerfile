FROM openjdk:17
VOLUME /tmp
COPY  target/Url-Shortener-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT ["java","-jar","/backend.jar"]