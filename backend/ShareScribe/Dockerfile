# ------------ Stage 1: Build ------------
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set work directory
WORKDIR /app

# Copy the Maven files first to leverage layer caching
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# ------------ Stage 2: Run ------------
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
