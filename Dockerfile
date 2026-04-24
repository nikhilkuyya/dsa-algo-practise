FROM openjdk:8
COPY java-docker-app /var/www/java
WORKDIR /var/www/java
RUN javac Hello.java
CMD ["java", "Hello"]
