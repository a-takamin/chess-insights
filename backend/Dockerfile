# syntax=docker/dockerfile:1

# --- build stage: Gradle wrapper で bootJar を作る ---
FROM eclipse-temurin:17.0.19_10-jdk@sha256:068a8f9ae4b74d9a20de3ecca771ba1a6437f1d7a8a8ad6deaf9dbdd2274397a AS build
WORKDIR /app

# 依存解決のレイヤーキャッシュ用に、まずビルド定義だけコピーする
COPY gradlew settings.gradle.kts build.gradle.kts ./
COPY gradle ./gradle
RUN chmod +x gradlew

COPY src ./src
RUN ./gradlew --no-daemon clean bootJar

# --- runtime stage: JRE だけの軽量イメージ ---
FROM eclipse-temurin:17.0.19_10-jre@sha256:92999aea37688157a53a40bfcb187c30f317422e028045fd5fc5c548fde9e626 AS runtime
WORKDIR /app

# 非 root ユーザーで実行する
RUN groupadd --system spring && useradd --system --gid spring spring
USER spring

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
