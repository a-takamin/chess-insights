# syntax=docker/dockerfile:1

# --- build stage: Gradle wrapper で bootJar を作る ---
FROM eclipse-temurin:25-jdk@sha256:e787e08ef76f4c16866108cd7f9fcd96a68eef3ac6cc76866897d4d02d5a2262 AS build
WORKDIR /app

# 依存解決のレイヤーキャッシュ用に、まずビルド定義だけコピーする
COPY gradlew settings.gradle.kts build.gradle.kts ./
COPY gradle ./gradle
RUN chmod +x gradlew

COPY src ./src
RUN ./gradlew --no-daemon clean bootJar

# --- runtime stage: JRE だけの軽量イメージ ---
FROM eclipse-temurin:25-jre@sha256:f9e65324a37f28209ce7dd0e5149a7aa954520ed936fb87813cf6ded2400a112 AS runtime
WORKDIR /app

# 非 root ユーザーで実行する
RUN groupadd --system spring && useradd --system --gid spring spring
USER spring

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
