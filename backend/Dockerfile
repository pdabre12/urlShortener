FROM openjdk:17
VOLUME /tmp
COPY  backend/target/Url-Shortener-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT ["java","-jar","/backend.jar"]